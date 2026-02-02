
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/api/auth-middleware';
import { getAdminFirestore } from '@/lib/firebase/admin';

export async function GET(request: NextRequest) {
    const auth = await requireAuth(request);
    if (!auth.ok) return auth.response;

    try {
        const db = getAdminFirestore();
        const creatorId = auth.uid;

        // Fetch monthly earnings (last 6 months)
        // In a real app, this would query an 'earnings' collection.
        // For now, we'll try to fetch from a subcollection or defaults.
        const earningsSnap = await db
            .collection('creators')
            .doc(creatorId)
            .collection('earnings_history')
            .orderBy('date', 'desc')
            .limit(6)
            .get();

        const monthlyEarnings = earningsSnap.docs.map(doc => ({
            month: doc.data().month, // e.g., 'Jan'
            amount: doc.data().amount || 0
        })).reverse(); // Reverse to correct order

        // If no data, return empty array implies empty graph
        // Or better, return last 6 months with 0s if specific requirement
        // But the prompt says "empty screens", so maybe just return empty if truly empty.
        // However, graphs usually look better with axes. Let's return 0-filled data for last 6 months if empty.
        const filledEarnings = monthlyEarnings.length > 0 ? monthlyEarnings : generateEmptyMonths(6);

        // Fetch Performance Data
        const performanceDoc = await db
            .collection('creators')
            .doc(creatorId)
            .collection('analytics')
            .doc('performance')
            .get();

        const performanceData = performanceDoc.exists ? performanceDoc.data()?.history || [] : generateEmptyPerformance(7);

        // Fetch Audience Demographics
        const demographicsDoc = await db
            .collection('creators')
            .doc(creatorId)
            .collection('analytics')
            .doc('demographics')
            .get();

        const audienceMetrics = demographicsDoc.exists ? demographicsDoc.data() : {
            ageGroups: [],
            topLocations: [],
            gender: []
        };

        return NextResponse.json({
            monthlyEarnings: filledEarnings,
            performanceData: performanceData,
            audienceMetrics: audienceMetrics,
            // Add other needed aggregations
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

function generateEmptyMonths(count: number) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    const result = [];
    for (let i = count - 1; i >= 0; i--) {
        const mIndex = (currentMonth - i + 12) % 12;
        result.push({ month: months[mIndex], amount: 0 });
    }
    return result;
}

function generateEmptyPerformance(count: number) {
    // Generate last 7 months/days logic or just return empty structure with keys 0
    // Simplify for now, let's assume monthly trends.
    const result = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();

    for (let i = count - 1; i >= 0; i--) {
        const mIndex = (currentMonth - i + 12) % 12;
        result.push({
            month: months[mIndex],
            earnings: 0,
            views: 0,
            engagement: 0,
            conversions: 0,
            clicks: 0
        });
    }
    return result;
}
