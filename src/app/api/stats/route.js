// pages/api/stats.js
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "../../lib/db";
import { authOptions } from '../../lib/nextAuth';

export async function GET(req, res) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = parseInt(session.user.id);
    const now = new Date();
    
    // Current period (last 30 days)
    const currentPeriodStart = new Date(now.setDate(now.getDate() - 30));
    
    // Previous period (30-60 days ago)
    const previousPeriodStart = new Date(now.setDate(now.getDate() - 30));

    const [currentStats, previousStats, recentActivity, campaignStats, donorStats] = await Promise.all([
      // Current period stats
      db.donation.aggregate({
        where: {
          Campaign: { 
            userId,
            status: 'ACTIVE'
          },
          donation_date: {
            gte: currentPeriodStart
          }
        },
        _count: true,
        _sum: {
          amount: true
        },
        _avg: {
          amount: true
        }
      }),

      // Previous period stats
      db.donation.aggregate({
        where: {
          Campaign: { 
            userId,
            status: 'ACTIVE'
          },
          donation_date: {
            gte: previousPeriodStart,
            lt: currentPeriodStart
          }
        },
        _count: true,
        _sum: {
          amount: true
        },
        _avg: {
          amount: true
        }
      }),

      // Recent activity
      db.donation.findMany({
        where: { 
          Campaign: { 
            userId,
            status: 'ACTIVE'
          } 
        },
        orderBy: { donation_date: 'desc' },
        take: 5,
        include: {
          Campaign: {
            select: {
              title: true,
              cover_image: true
            }
          }
        }
      }),

      // Campaign statistics
      db.campaign.groupBy({
        by: ['status'],
        where: { userId },
        _count: true,
        _sum: {
          current_amount: true,
          goal_amount: true
        }
      }),

      // Donor statistics
      db.donation.groupBy({
        by: ['is_anonymous'],
        where: { 
          Campaign: { 
            userId,
            status: 'ACTIVE'
          } 
        },
        _count: true
      })
    ]);

    return NextResponse.json({
      overview: {
        totalDonations: currentStats._sum.amount || 0,
        totalDonors: currentStats._count || 0,
        monthlyGrowth: currentStats._sum.amount || 0,
        averageDonation: currentStats._avg.amount || 0
      },
      previousPeriod: {
        totalDonations: previousStats._sum.amount || 0,
        totalDonors: previousStats._count || 0,
        monthlyGrowth: previousStats._sum.amount || 0,
        averageDonation: previousStats._avg.amount || 0
      },
      campaigns: {
        active: campaignStats.find(stat => stat.status === 'ACTIVE')?._count || 0,
        completed: campaignStats.find(stat => stat.status === 'COMPLETED')?._count || 0,
        draft: campaignStats.find(stat => stat.status === 'DRAFT')?._count || 0,
        totalRaised: campaignStats.reduce((acc, stat) => acc + (stat._sum.current_amount || 0), 0),
        totalGoal: campaignStats.reduce((acc, stat) => acc + (stat._sum.goal_amount || 0), 0)
      },
      donors: {
        total: donorStats.reduce((acc, stat) => acc + stat._count, 0),
        anonymous: donorStats.find(stat => stat.is_anonymous)?._count || 0,
        identified: donorStats.find(stat => !stat.is_anonymous)?._count || 0
      },
      recentActivity
    }, { status: 200 });

  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
