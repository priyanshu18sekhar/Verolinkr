import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { requireAuth } from '@/lib/api/auth-middleware';
import { getAdminFirestore } from '@/lib/firebase/admin';
import { PROVIDERS, isValidProvider } from '@/lib/connect/providers';
import {
  fetchMetaMetrics,
  fetchYouTubeMetrics,
  refreshGoogleToken,
} from '@/lib/connect/live';

/**
 * POST /api/creators/me/platforms/sync — re-fetch follower/engagement stats
 * for every live-connected platform using its stored token (refreshing the
 * Google token when expired). Demo connections are left untouched.
 */
export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.ok) return auth.response;

  const db = getAdminFirestore();
  const platformsRef = db.collection('creators').doc(auth.uid).collection('platforms');
  const snap = await platformsRef.get();

  const results: { platform: string; status: 'synced' | 'skipped' | 'failed'; reason?: string }[] = [];

  for (const doc of snap.docs) {
    const p = doc.data();
    const provider = doc.id;

    if (!isValidProvider(provider) || p.connectionType !== 'live' || !p.accessToken) {
      results.push({ platform: provider, status: 'skipped', reason: 'demo connection' });
      continue;
    }

    try {
      let accessToken: string = p.accessToken;

      // Refresh an expired Google token when we hold a refresh token.
      if (
        PROVIDERS[provider].network === 'google' &&
        p.refreshToken &&
        p.tokenExpiresAt &&
        Date.now() > Number(p.tokenExpiresAt) - 60_000
      ) {
        const refreshed = await refreshGoogleToken(p.refreshToken);
        accessToken = refreshed.accessToken;
        await doc.ref.set(
          { accessToken, tokenExpiresAt: refreshed.expiresAt ?? null },
          { merge: true }
        );
      }

      const metrics =
        PROVIDERS[provider].network === 'meta'
          ? await fetchMetaMetrics(provider, accessToken)
          : await fetchYouTubeMetrics(accessToken);

      await doc.ref.set(
        {
          username: metrics.username,
          followers: metrics.followers,
          engagement: metrics.engagement,
          totalViews: metrics.totalViews ?? null,
          mediaCount: metrics.mediaCount ?? null,
          profileUrl: metrics.profileUrl,
          lastSyncedAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
      results.push({ platform: provider, status: 'synced' });
    } catch (err: any) {
      console.error(`[sync:${provider}]`, err);
      results.push({ platform: provider, status: 'failed', reason: err?.message });
    }
  }

  return NextResponse.json({
    results,
    synced: results.filter((r) => r.status === 'synced').length,
  });
}
