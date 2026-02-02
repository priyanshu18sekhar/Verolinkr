import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/api/auth-middleware';
import { getAdminFirestore } from '@/lib/firebase/admin';

// GET - Get aggregated creator statistics
export async function GET(request: NextRequest) {
    const auth = await requireAuth(request);
    if (!auth.ok) return auth.response;

    try {
        const db = getAdminFirestore();

        // Fetch creator profile
        const creatorDoc = await db.collection('creators').doc(auth.uid).get();
        if (!creatorDoc.exists) {
            return NextResponse.json({ error: 'Creator profile not found' }, { status: 404 });
        }

        const creatorData = creatorDoc.data();

        // Fetch platforms for aggregate stats
        const platformsSnap = await db
            .collection('creators')
            .doc(auth.uid)
            .collection('platforms')
            .get();

        let totalFollowers = 0;
        let avgEngagement = 0;
        let platformCount = 0;

        platformsSnap.forEach((doc) => {
            const platform = doc.data();
            totalFollowers += platform.followers || 0;
            avgEngagement += platform.engagement || 0;
            platformCount++;
        });

        if (platformCount > 0) {
            avgEngagement = avgEngagement / platformCount;
        }

        // Fetch campaign statistics (these would come from a campaigns subcollection)
        const campaignsSnap = await db
            .collection('creators')
            .doc(auth.uid)
            .collection('campaigns')
            .get();

        let activeCampaigns = 0;
        let completedCampaigns = 0;
        let totalEarnings = 0;
        let pendingEarnings = 0;
        let thisMonthEarnings = 0;

        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        campaignsSnap.forEach((doc) => {
            const campaign = doc.data();
            if (campaign.status === 'active') {
                activeCampaigns++;
                pendingEarnings += campaign.earnings || 0;
            } else if (campaign.status === 'completed') {
                completedCampaigns++;
                totalEarnings += campaign.earnings || 0;

                // Check if completed this month
                if (campaign.completedAt?.toDate && campaign.completedAt.toDate() >= startOfMonth) {
                    thisMonthEarnings += campaign.earnings || 0;
                }
            }
        });

        const stats = {
            // Earnings
            totalEarnings,
            thisMonthEarnings,
            pendingEarnings,

            // Campaigns
            activeCampaigns,
            completedCampaigns,

            // Audience
            totalFollowers,
            avgEngagement: parseFloat(avgEngagement.toFixed(2)),
            platformCount,

            // Profile scores (from profile or calculated)
            authenticityScore: creatorData?.authenticityScore || 0,
            trustworthinessRating: creatorData?.trustworthinessRating || 0,

            // Performance metrics
            totalViews: creatorData?.totalViews || 0,
            responseRate: creatorData?.responseRate || 0,
            completionRate: completedCampaigns > 0
                ? Math.round((completedCampaigns / (completedCampaigns + activeCampaigns)) * 100)
                : 0,
            averageRating: creatorData?.averageRating || 0,

            // Profile completion
            profileCompleted: creatorData?.onboardingCompleted || false,
            bankDetailsCompleted: creatorData?.bankDetailsCompleted || false,
        };

        return NextResponse.json({ stats });
    } catch (error) {
        console.error('Error fetching creator stats:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
