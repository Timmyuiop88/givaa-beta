import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export async function GET() {
  try {
    // Fetch only active and public campaigns
    const campaigns = await db.campaign.findMany({
      where: {
        status: "ACTIVE",
        visibility: "PUBLIC",
        is_verified: true, // Only show verified campaigns
      },
      include: {
        Category: {
          select: {
            name: true,
            slug: true,
          },
        },
        User: {
          select: {
            firstname: true,
            lastname: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc', // Show newest first
      },
      take: 5, // Limit to 5 featured campaigns
    });

    // Calculate additional stats and format response
    const formattedCampaigns = campaigns.map(campaign => ({
      id: campaign.campaign_id,
      title: campaign.title,
      description: campaign.description,
      createdBy: campaign.User ? `${campaign.User.firstname || ''} ${campaign.User.lastname || ''}`.trim() : 'Anonymous',
      category: campaign.Category?.name || 'General',
      coverImage: campaign.cover_image,
      goalAmount: campaign.goal_amount,
      currentAmount: campaign.current_amount || 0,
      progressPercentage: Math.round((campaign.current_amount || 0) / campaign.goal_amount * 100),
      daysRemaining: Math.ceil((new Date(campaign.end_date) - new Date()) / (1000 * 60 * 60 * 24)),
    }));

    return NextResponse.json(formattedCampaigns);
  } catch (error) {
    console.error('Error fetching featured campaigns:', error);
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 });
  }
} 