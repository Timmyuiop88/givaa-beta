import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/nextAuth";

export async function GET(request, { params }) {
  try {
    const { searchParams } = new URL(request.url);
    const includeDonors = searchParams.get('include_donors') === 'true';
    const { id } = params;

    const campaign = await db.campaign.findFirst({
      where: {
        campaign_id: parseInt(id),
      },
      include: {
        Category: {
          select: {
            category_id: true,
            name: true,
            slug: true
          }
        },
        updates: {
          orderBy: {
            created_at: 'desc'
          }
        },
        ...(includeDonors && {
          Donation: {
            orderBy: {
              donation_date: 'desc'
            },
            select: {
              donation_id: true,
              donor_name: true,
              amount: true,
              message: true,
              is_anonymous: true,
              donation_date: true,
              status: true,
              User: {
                select: {
                  profileImage: true
                }
              }
            }
          }
        })
      }
    });

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }

    // Format the campaign data
    const campaignWithStats = {
      ...campaign,
      progress_percentage: Math.round(
        (campaign.current_amount / campaign.goal_amount) * 100
      ),
      donations: includeDonors ? campaign.Donation.map(donation => ({
        ...donation,
        donor_avatar: donation.User?.profileImage,
        // Remove sensitive or unnecessary fields
        User: undefined
      })) : undefined
    };

    return NextResponse.json(campaignWithStats);
  } catch (error) {
    console.error('Campaign fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch campaign' }, 
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const data = await request.json();
    console.log('Received data:', data); // Debug log

    // Verify campaign ownership
    const campaign = await db.campaign.findFirst({
      where: {
        campaign_id: parseInt(id),
        userId: parseInt(session.user.id),
      },
    });

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }

    // Create update data with validation
    const updateData = {
      // Only include fields if they exist in the incoming data
      ...(data.title && { title: data.title }),
      ...(data.description && { description: data.description }),
      ...(data.goal_amount && { goal_amount: data.goal_amount }),
      ...(data.status && { status: data.status }),
      ...(data.visibility && { visibility: data.visibility }),
      ...(data.cover_image && { cover_image: data.cover_image }),
      // Always include gallery even if empty
      gallery: data.gallery_images || [],
    };

    // Handle dates separately with validation
    if (data.start_date) {
      const startDate = new Date(data.start_date);
      if (startDate.toString() !== 'Invalid Date') {
        updateData.start_date = startDate;
      }
    }

    if (data.end_date) {
      const endDate = new Date(data.end_date);
      if (endDate.toString() !== 'Invalid Date') {
        updateData.end_date = endDate;
      }
    }

    // Only include category update if category_id is valid
    if (data.category_id && !isNaN(parseInt(data.category_id))) {
      updateData.Category = {
        connect: {
          category_id: parseInt(data.category_id)
        }
      };
    }

    console.log('Update data after validation:', updateData); // Debug log

    const updatedCampaign = await db.campaign.update({
      where: { campaign_id: parseInt(id) },
      data: updateData,
      include: {
        Category: {
          select: {
            category_id: true,
            name: true,
            slug: true
          }
        }
      }
    });

    const campaignWithStats = {
      ...updatedCampaign,
      gallery_images: updatedCampaign.gallery || [],
      progress_percentage: Math.round(
        (updatedCampaign.current_amount / updatedCampaign.goal_amount) * 100
      ),
    };

    return NextResponse.json(campaignWithStats);
  } catch (error) {
    console.error('Campaign update error:', error);
    return NextResponse.json({ 
      error: 'Failed to update campaign', 
      details: error.message 
    }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    const campaign = await db.campaign.findFirst({
      where: {
        campaign_id: parseInt(id),
        userId: parseInt(session.user.id),
      },
    });

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }

    await db.campaign.delete({
      where: { campaign_id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Campaign delete error:', error);
    return NextResponse.json({ error: 'Failed to delete campaign' }, { status: 500 });
  }
} 