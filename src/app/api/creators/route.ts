import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/api/auth-middleware';
import { getAdminFirestore } from '@/lib/firebase/admin';

/**
 * GET /api/creators — creator discovery for brands.
 * Returns onboarded creators with the public fields a brand needs to
 * evaluate them (no bank/PII fields).
 */
export async function GET(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.ok) return auth.response;

  const { searchParams } = new URL(request.url);
  const limit = Math.min(Number(searchParams.get('limit') ?? 24), 60);

  try {
    const db = getAdminFirestore();
    const snap = await db
      .collection('creators')
      .where('onboardingCompleted', '==', true)
      .limit(limit)
      .get();

    const creators = await Promise.all(
      snap.docs.map(async (doc) => {
        const d = doc.data();
        const platformsSnap = await doc.ref.collection('platforms').get();
        let followers = 0;
        let engagement = 0;
        let verified = false;
        const platforms: string[] = [];
        platformsSnap.forEach((p) => {
          const pd = p.data();
          followers += Number(pd.followers ?? 0);
          engagement += Number(pd.engagement ?? 0);
          if (pd.verified) verified = true;
          platforms.push(pd.platformType ?? p.id);
        });
        if (platformsSnap.size > 0) engagement = engagement / platformsSnap.size;

        return {
          id: doc.id,
          displayName: d.displayName ?? d.fullName ?? 'Creator',
          username: d.username ?? null,
          bio: d.bio ?? null,
          niche: d.niche ?? null,
          categories: d.categories ?? [],
          city: d.city ?? null,
          country: d.country ?? null,
          followers,
          engagement: Number(engagement.toFixed(1)),
          platforms,
          verified,
          averageRating: d.averageRating ?? null,
          authenticityScore: d.authenticityScore ?? null,
          completedCampaigns: d.completedCampaigns ?? null,
        };
      })
    );

    // most reach first
    creators.sort((a, b) => b.followers - a.followers);

    return NextResponse.json({ creators });
  } catch (error) {
    console.error('Error listing creators:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
