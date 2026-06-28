import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminFirestore } from '@/lib/firebase/admin';
import {
  isValidProvider,
  PROVIDERS,
  metaCreds,
  googleCreds,
  demoMetrics,
  type ProviderId,
} from '@/lib/connect/providers';

interface PlatformMetrics {
  username: string;
  followers: number;
  engagement: number;
  profileUrl: string;
  providerUserId?: string;
  accessToken?: string;
}

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

  let metrics: PlatformMetrics;
  let connectionType: 'live' | 'demo' = mode;

  try {
    if (mode === 'live' && code) {
      metrics =
        PROVIDERS[provider].network === 'meta'
          ? await fetchMeta(provider, code, redirectUri)
          : await fetchYouTube(code, redirectUri);
    } else {
      metrics = demoMetrics(provider, `${uid}:${provider}`);
      connectionType = 'demo';
    }
  } catch (err) {
    console.error(`[connect:${provider}] live fetch failed, falling back to demo`, err);
    metrics = demoMetrics(provider, `${uid}:${provider}`);
    connectionType = 'demo';
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
        providerUserId: metrics.providerUserId ?? null,
        accessToken: metrics.accessToken ?? null,
        verified: true,
        connectionType,
        updatedAt: FieldValue.serverTimestamp(),
        createdAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

  return NextResponse.redirect(
    `${origin}${back}?connected=${provider}&mode=${connectionType}`
  );
}

async function fetchMeta(
  provider: ProviderId,
  code: string,
  redirectUri: string
): Promise<PlatformMetrics> {
  const { clientId, clientSecret } = metaCreds();
  const tokenRes = await fetch(
    `https://graph.facebook.com/v19.0/oauth/access_token?` +
      new URLSearchParams({
        client_id: clientId ?? '',
        client_secret: clientSecret ?? '',
        redirect_uri: redirectUri,
        code,
      }).toString()
  );
  const tokenJson = await tokenRes.json();
  const accessToken: string = tokenJson.access_token;
  if (!accessToken) throw new Error('No Meta access token');

  const me = await (
    await fetch(
      `https://graph.facebook.com/v19.0/me?fields=id,name&access_token=${accessToken}`
    )
  ).json();

  // Best-effort follower count from the first managed Page.
  let followers = 0;
  try {
    const pages = await (
      await fetch(
        `https://graph.facebook.com/v19.0/me/accounts?fields=fan_count,followers_count&access_token=${accessToken}`
      )
    ).json();
    const page = pages?.data?.[0];
    followers = page?.followers_count ?? page?.fan_count ?? 0;
  } catch {
    /* metric enrichment is best-effort */
  }

  return {
    username: me.name ?? PROVIDERS[provider].label,
    followers,
    engagement: 0,
    profileUrl: `https://facebook.com/${me.id ?? ''}`,
    providerUserId: me.id,
    accessToken,
  };
}

async function fetchYouTube(code: string, redirectUri: string): Promise<PlatformMetrics> {
  const { clientId, clientSecret } = googleCreds();
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId ?? '',
      client_secret: clientSecret ?? '',
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
      code,
    }).toString(),
  });
  const tokenJson = await tokenRes.json();
  const accessToken: string = tokenJson.access_token;
  if (!accessToken) throw new Error('No Google access token');

  const channel = await (
    await fetch(
      'https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true',
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
  ).json();

  const item = channel?.items?.[0];
  const followers = Number(item?.statistics?.subscriberCount ?? 0);
  const title = item?.snippet?.title ?? 'YouTube';
  const customUrl = item?.snippet?.customUrl;

  return {
    username: title,
    followers,
    engagement: 0,
    profileUrl: customUrl
      ? `https://youtube.com/${customUrl}`
      : `https://youtube.com/channel/${item?.id ?? ''}`,
    providerUserId: item?.id,
    accessToken,
  };
}
