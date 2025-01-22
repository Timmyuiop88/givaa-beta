// pages/api/stats.js
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "../../lib/db";
import { authOptions } from '../../lib/nextAuth';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const minAmount = parseFloat(searchParams.get('minAmount')) || 0;
    const maxAmount = parseFloat(searchParams.get('maxAmount')) || Number.MAX_SAFE_INTEGER;
    const sortBy = searchParams.get('sortBy') || 'newest';

    console.log('Search params:', { search, category, status, minAmount, maxAmount, sortBy }); // Debug log

    // Build where clause
    const whereClause = {
     // status: "ACTIVE",
      visibility: "PUBLIC",
      //is_verified: false,
      goal_amount: {
        gte: minAmount,
        lte: maxAmount,
      },
      OR: [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ],
    };

    if (category && category !== 'all') {
      whereClause.Category = {
        name: { equals: category, mode: 'insensitive' }
      };
    }

    console.log('Where clause:', JSON.stringify(whereClause, null, 2)); // Debug log

    // Build order by clause
    let orderBy = {};
    switch (sortBy) {
      case 'oldest':
        orderBy = { created_at: 'asc' };
        break;
      case 'goal_high':
        orderBy = { goal_amount: 'desc' };
        break;
      case 'goal_low':
        orderBy = { goal_amount: 'asc' };
        break;
      case 'progress':
        orderBy = { current_amount: 'desc' };
        break;
      default: // newest
        orderBy = { created_at: 'desc' };
    }

    const campaigns = await db.campaign.findMany({
      where: whereClause,
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
      orderBy,
    });

    console.log(`Found ${campaigns.length} campaigns`); // Debug log

    return NextResponse.json({ campaigns });
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json({ error: 'Failed to fetch campaigns', details: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await req.json();

    // Validate required fields
    const requiredFields = ['title', 'description', 'goal_amount', 'start_date', 'end_date'];
    const missingFields = requiredFields.filter(field => !body[field]);
    if (missingFields.length > 0) {
      return NextResponse.json({
        error: `Missing required fields: ${missingFields.join(', ')}`
      }, { status: 400 });
    }

    // Validate dates
    const startDate = new Date(body.start_date);
    const endDate = new Date(body.end_date);
    if (endDate <= startDate) {
      return NextResponse.json({
        error: 'End date must be after start date'
      }, { status: 400 });
    }

    // Create campaign
    const campaign = await db.campaign.create({
      data: {
        userId: parseInt(userId),
        title: body.title,
        description: body.description,
        goal_amount: parseFloat(body.goal_amount),
        current_amount: 0,
        start_date: startDate,
        end_date: endDate,
        status: body.status || 'DRAFT',
        visibility: body.visibility || 'PUBLIC',
        category_id: parseInt(body.category_id),
        cover_image: body.cover_image,
        gallery: body.gallery || [],
      },
    });

    return NextResponse.json({ campaign }, { status: 201 });

  } catch (error) {
    console.error('Campaign creation error:', error);
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    // Verify campaign ownership
    const campaign = await db.campaign.findFirst({
      where: {
        campaign_id: id,
        userId: session.user.id,
      },
    });

    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    // Update campaign
    const updatedCampaign = await db.campaign.update({
      where: { campaign_id: id },
      data: updateData,
    });

    const campaignWithStats = {
      ...updatedCampaign,
      donation_count: 0, // This will be updated when donations are implemented
      progress_percentage: Math.round(
        (updatedCampaign.current_amount / updatedCampaign.goal_amount) * 100
      ),
    };

    return NextResponse.json({ campaign: campaignWithStats });
  } catch (error) {
    console.error('Campaign update error:', error);
    return NextResponse.json({ error: 'Failed to update campaign' }, { status: 500 });
  }
}
