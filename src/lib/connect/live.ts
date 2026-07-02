import { metaCreds, googleCreds, type ProviderId } from './providers';

/**
 * Live platform API helpers — token exchange and metric fetching for the
 * Meta Graph API (Instagram + Facebook) and the YouTube Data API. Shared by
 * the OAuth callback and the stats sync endpoint so reconnect and refresh
 * read the same numbers.
 */

const GRAPH = 'https://graph.facebook.com/v19.0';

export interface LiveTokens {
  accessToken: string;
  refreshToken?: string;
  /** epoch ms when the access token expires, if known */
  expiresAt?: number;
}

export interface LiveMetrics {
  username: string;
  followers: number;
  engagement: number;
  profileUrl: string;
  providerUserId?: string;
  /** lifetime views where the platform exposes it (YouTube) */
  totalViews?: number;
  mediaCount?: number;
}

/* ── Meta ───────────────────────────────────────────────────── */

/** Exchange an OAuth code, then upgrade to a ~60 day long-lived token. */
export async function exchangeMetaCode(code: string, redirectUri: string): Promise<LiveTokens> {
  const { clientId, clientSecret } = metaCreds();

  const shortRes = await fetch(
    `${GRAPH}/oauth/access_token?` +
      new URLSearchParams({
        client_id: clientId ?? '',
        client_secret: clientSecret ?? '',
        redirect_uri: redirectUri,
        code,
      }).toString()
  );
  const short = await shortRes.json();
  if (!short.access_token) throw new Error('No Meta access token');

  // Long-lived exchange is best-effort; the short token still works today.
  try {
    const longRes = await fetch(
      `${GRAPH}/oauth/access_token?` +
        new URLSearchParams({
          grant_type: 'fb_exchange_token',
          client_id: clientId ?? '',
          client_secret: clientSecret ?? '',
          fb_exchange_token: short.access_token,
        }).toString()
    );
    const long = await longRes.json();
    if (long.access_token) {
      return {
        accessToken: long.access_token,
        expiresAt: long.expires_in ? Date.now() + long.expires_in * 1000 : undefined,
      };
    }
  } catch {
    /* fall through to the short-lived token */
  }
  return {
    accessToken: short.access_token,
    expiresAt: short.expires_in ? Date.now() + short.expires_in * 1000 : undefined,
  };
}

async function graphGet(path: string, accessToken: string, params: Record<string, string> = {}) {
  const qs = new URLSearchParams({ ...params, access_token: accessToken }).toString();
  const res = await fetch(`${GRAPH}/${path}?${qs}`);
  const json = await res.json();
  if (json.error) throw new Error(`Meta Graph: ${json.error.message}`);
  return json;
}

/**
 * Instagram metrics via the professional-account path:
 * managed Page → instagram_business_account → IG user fields + recent media
 * engagement (avg interactions per post / followers).
 */
async function fetchInstagramMetrics(accessToken: string): Promise<LiveMetrics> {
  const pages = await graphGet('me/accounts', accessToken, {
    fields: 'id,name,instagram_business_account',
  });
  const withIg = (pages.data ?? []).find((p: any) => p.instagram_business_account?.id);
  if (!withIg) {
    throw new Error('No Instagram professional account linked to a Facebook Page');
  }
  const igId = withIg.instagram_business_account.id;

  const ig = await graphGet(igId, accessToken, {
    fields: 'username,followers_count,media_count,profile_picture_url',
  });

  let engagement = 0;
  try {
    const media = await graphGet(`${igId}/media`, accessToken, {
      fields: 'like_count,comments_count',
      limit: '12',
    });
    const posts: any[] = media.data ?? [];
    if (posts.length && ig.followers_count > 0) {
      const avg =
        posts.reduce((s, m) => s + (m.like_count ?? 0) + (m.comments_count ?? 0), 0) /
        posts.length;
      engagement = Number(((avg / ig.followers_count) * 100).toFixed(2));
    }
  } catch {
    /* engagement enrichment is best-effort */
  }

  return {
    username: ig.username ?? 'instagram',
    followers: Number(ig.followers_count ?? 0),
    engagement,
    mediaCount: Number(ig.media_count ?? 0),
    profileUrl: `https://instagram.com/${ig.username ?? ''}`,
    providerUserId: igId,
  };
}

async function fetchFacebookMetrics(accessToken: string): Promise<LiveMetrics> {
  const me = await graphGet('me', accessToken, { fields: 'id,name' });
  let followers = 0;
  let pageName: string | undefined;
  try {
    const pages = await graphGet('me/accounts', accessToken, {
      fields: 'name,fan_count,followers_count',
    });
    const page = pages?.data?.[0];
    followers = page?.followers_count ?? page?.fan_count ?? 0;
    pageName = page?.name;
  } catch {
    /* page metrics are best-effort */
  }
  return {
    username: pageName ?? me.name ?? 'facebook',
    followers,
    engagement: 0,
    profileUrl: `https://facebook.com/${me.id ?? ''}`,
    providerUserId: me.id,
  };
}

export async function fetchMetaMetrics(
  provider: ProviderId,
  accessToken: string
): Promise<LiveMetrics> {
  return provider === 'instagram'
    ? fetchInstagramMetrics(accessToken)
    : fetchFacebookMetrics(accessToken);
}

/* ── Google / YouTube ───────────────────────────────────────── */

export async function exchangeGoogleCode(code: string, redirectUri: string): Promise<LiveTokens> {
  const { clientId, clientSecret } = googleCreds();
  const res = await fetch('https://oauth2.googleapis.com/token', {
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
  const json = await res.json();
  if (!json.access_token) throw new Error('No Google access token');
  return {
    accessToken: json.access_token,
    refreshToken: json.refresh_token,
    expiresAt: json.expires_in ? Date.now() + json.expires_in * 1000 : undefined,
  };
}

export async function refreshGoogleToken(refreshToken: string): Promise<LiveTokens> {
  const { clientId, clientSecret } = googleCreds();
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId ?? '',
      client_secret: clientSecret ?? '',
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }).toString(),
  });
  const json = await res.json();
  if (!json.access_token) throw new Error('Could not refresh the Google token');
  return {
    accessToken: json.access_token,
    refreshToken,
    expiresAt: json.expires_in ? Date.now() + json.expires_in * 1000 : undefined,
  };
}

export async function fetchYouTubeMetrics(accessToken: string): Promise<LiveMetrics> {
  const res = await fetch(
    'https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true',
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  const json = await res.json();
  if (json.error) throw new Error(`YouTube API: ${json.error.message}`);
  const item = json?.items?.[0];
  if (!item) throw new Error('No YouTube channel on this account');

  const subs = Number(item.statistics?.subscriberCount ?? 0);
  const views = Number(item.statistics?.viewCount ?? 0);
  const videos = Number(item.statistics?.videoCount ?? 0);
  const customUrl = item.snippet?.customUrl;

  return {
    username: item.snippet?.title ?? 'YouTube',
    followers: subs,
    // views-per-video relative to audience — a stable proxy the Data API allows
    engagement: subs > 0 && videos > 0 ? Number(((views / videos / subs) * 100).toFixed(2)) : 0,
    totalViews: views,
    mediaCount: videos,
    profileUrl: customUrl
      ? `https://youtube.com/${customUrl}`
      : `https://youtube.com/channel/${item.id ?? ''}`,
    providerUserId: item.id,
  };
}
