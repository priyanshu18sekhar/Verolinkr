import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminFirestore } from '@/lib/firebase/admin';
import {
  isValidProvider,
  PROVIDERS,
  demoMetrics,
} from '@/lib/connect/providers';
import {
  exchangeMetaCode,
  exchangeGoogleCode,
  fetchMetaMetrics,
  fetchYouTubeMetrics,
  type LiveMetrics,
  type LiveTokens,
} from '@/lib/connect/live';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params;
  const url = new URL(request.url);
  const origin = url.origin;

  if (!isValidProvider(provider)) {
    return NextResponse.redirect(`${origin}/creator-dashboard?error=unknown_provider`);
  }

  const state = url.searchParams.get('state');
  const code = url.searchParams.get('code');
  const oauthError = url.searchParams.get('error');

  const db = getAdminFirestore();

  // Resolve the user from state.
  if (!state) {
    return NextResponse.redirect(`${origin}/creator-dashboard?error=missing_state`);
  }
  const stateSnap = await db.collection('oauthStates').doc(state).get();
  if (!stateSnap.exists) {
    return NextResponse.redirect(`${origin}/creator-dashboard?error=invalid_state`);
  }
  const { uid, mode, redirectUri, returnTo } = stateSnap.data() as {
    uid: string;
    mode: 'live' | 'demo';
    redirectUri: string;
    returnTo?: string;
  };
  // One-time use.
  await db.collection('oauthStates').doc(state).delete();

  const back = (returnTo && returnTo.startsWith('/') ? returnTo : '/creator-dashboard') as string;

  if (oauthError) {
    return NextResponse.redirect(`${origin}${back}?error=denied&provider=${provider}`);
  }

  let metrics: LiveMetrics;
  let tokens: LiveTokens | null = null;
  let connectionType: 'live' | 'demo' = mode;

  try {
    if (mode === 'live' && code) {
      if (PROVIDERS[provider].network === 'meta') {
        tokens = await exchangeMetaCode(code, redirectUri);
        metrics = await fetchMetaMetrics(provider, tokens.accessToken);
      } else {
        tokens = await exchangeGoogleCode(code, redirectUri);
        metrics = await fetchYouTubeMetrics(tokens.accessToken);
      }
    } else {
      metrics = demoMetrics(provider, `${uid}:${provider}`);
      connectionType = 'demo';
    }
  } catch (err) {
    console.error(`[connect:${provider}] live fetch failed, falling back to demo`, err);
    metrics = demoMetrics(provider, `${uid}:${provider}`);
    connectionType = 'demo';
    tokens = null;
  }

  // Store one document per platform (doc id = provider) so reconnects update in place.
  await db
    .collection('creators')
    .doc(uid)
    .collection('platforms')
    .doc(provider)
    .set(
      {
        platformType: provider,
        username: metrics.username,
        profileUrl: metrics.profileUrl,
        followers: metrics.followers,
        engagement: metrics.engagement,
        totalViews: metrics.totalViews ?? null,
        mediaCount: metrics.mediaCount ?? null,
        providerUserId: metrics.providerUserId ?? null,
        accessToken: tokens?.accessToken ?? null,
        refreshToken: tokens?.refreshToken ?? null,
        tokenExpiresAt: tokens?.expiresAt ?? null,
        verified: true,
        connectionType,
        lastSyncedAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
        createdAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

  return NextResponse.redirect(
    `${origin}${back}?connected=${provider}&mode=${connectionType}`
  );
}
