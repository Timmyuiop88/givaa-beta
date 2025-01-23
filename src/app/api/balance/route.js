import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "../../lib/db";
import { authOptions } from '../../lib/nextAuth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = parseInt(session.user.id);

    // Get user's balance
    const balance = await db.balance.findUnique({
      where: { userId }
    });

    // Calculate pending balance from recent donations (last 14 days)
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    const recentDonations = await db.donation.aggregate({
      where: {
        Campaign: {
          userId,
          status: 'ACTIVE'
        },
        donation_date: {
          gte: fourteenDaysAgo
        },
        status: 'COMPLETED'
      },
      _sum: {
        amount: true
      }
    });

    // Get recent transactions
    const recentTransactions = await db.transaction.findMany({
      where: {
        userId,
        timestamp: {
          gte: fourteenDaysAgo
        }
      },
      orderBy: {
        timestamp: 'desc'
      },
      take: 5
    });

    return NextResponse.json({
      balance: {
        available: balance?.balance_amount || 0,
        pending: recentDonations._sum.amount || 0
      },
      recentTransactions
    });
  } catch (error) {
    console.error('Balance fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch balance' }, { status: 500 });
  }
} 