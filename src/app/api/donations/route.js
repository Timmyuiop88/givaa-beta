import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "../../lib/db";
import { authOptions } from '../../lib/nextAuth';

export async function POST(req) {
  try {
    const body = await req.json();
    const { campaign_id, donor_name, donor_email, amount, message, is_anonymous } = body;

    // Get user session if available (optional for donations)
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    // Create the donation
    const donation = await db.donation.create({
      data: {
        campaign_id: parseInt(campaign_id),
        userId: userId ? parseInt(userId) : null,
        donor_name,
        donor_email,
        amount: parseFloat(amount),
        message,
        is_anonymous,
        status: 'COMPLETED', // Since we're not implementing payment yet
      },
    });

    // Update campaign's current amount
    await db.campaign.update({
      where: { campaign_id: parseInt(campaign_id) },
      data: {
        current_amount: {
          increment: parseFloat(amount)
        }
      }
    });

    // If user is logged in, update their balance
    if (userId) {
      await db.balance.upsert({
        where: { userId: parseInt(userId) },
        update: {
          balance_amount: {
            increment: parseFloat(amount)
          },
          last_updated_at: new Date()
        },
        create: {
          userId: parseInt(userId),
          balance_amount: parseFloat(amount),
          last_updated_at: new Date()
        }
      });

      // Create a transaction record
      await db.transaction.create({
        data: {
          userId: parseInt(userId),
          transaction_type: 'DONATION',
          amount: parseFloat(amount),
          status: 'COMPLETED',
          timestamp: new Date()
        }
      });
    }

    return NextResponse.json({ donation }, { status: 201 });
  } catch (error) {
    console.error('Donation error:', error);
    return NextResponse.json({ error: 'Failed to process donation' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const campaign_id = searchParams.get('campaign_id');

    const whereClause = campaign_id 
      ? { campaign_id: parseInt(campaign_id) }
      : {
          Campaign: {
            userId: parseInt(session.user.id)
          }
        };

    const donations = await db.donation.findMany({
      where: whereClause,
      include: {
        Campaign: {
          select: {
            title: true,
            cover_image: true
          }
        }
      },
      orderBy: {
        donation_date: 'desc'
      }
    });

    return NextResponse.json({ donations });
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json({ error: 'Failed to fetch donations' }, { status: 500 });
  }
} 