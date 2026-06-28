/**
 * Social platform connection providers.
 *
 * Each provider can run in two modes:
 *  - "live": real OAuth against the platform. Active automatically when the
 *    provider's client id/secret are present in the environment.
 *  - "demo": no credentials configured — we simulate a realistic connection so
 *    the whole product is usable end-to-end. Flips to live the moment you add
 *    keys; no code change required.
 */

export type ProviderId = 'instagram' | 'facebook' | 'youtube';

export interface ProviderConfig {
  id: ProviderId;
  label: string;
  /** Brand tint for UI chips. */
  tint: string;
  /** OAuth network: Meta covers Instagram + Facebook; Google covers YouTube. */
  network: 'meta' | 'google';
}

export const PROVIDERS: Record<ProviderId, ProviderConfig> = {
  instagram: { id: 'instagram', label: 'Instagram', tint: '#ff5436', network: 'meta' },
  facebook: { id: 'facebook', label: 'Facebook', tint: '#4f2bff', network: 'meta' },
  youtube: { id: 'youtube', label: 'YouTube', tint: '#ff2f2f', network: 'google' },
};

export function isValidProvider(p: string): p is ProviderId {
  return p === 'instagram' || p === 'facebook' || p === 'youtube';
}

interface NetworkCreds {
  clientId?: string;
  clientSecret?: string;
}

export function metaCreds(): NetworkCreds {
  return {
    clientId: process.env.META_CLIENT_ID,
    clientSecret: process.env.META_CLIENT_SECRET,
  };
}

export function googleCreds(): NetworkCreds {
  return {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}

/** Whether a given provider can do real OAuth right now. */
export function isLive(provider: ProviderId): boolean {
  const creds = PROVIDERS[provider].network === 'meta' ? metaCreds() : googleCreds();
  return Boolean(creds.clientId && creds.clientSecret);
}

/** Builds the provider's OAuth authorize URL for the live flow. */
export function buildAuthorizeUrl(provider: ProviderId, redirectUri: string, state: string): string {
  if (PROVIDERS[provider].network === 'meta') {
    const { clientId } = metaCreds();
    const scope =
      provider === 'instagram'
        ? 'instagram_basic,instagram_manage_insights,pages_show_list,business_management'
        : 'public_profile,pages_show_list,read_insights';
    const params = new URLSearchParams({
      client_id: clientId ?? '',
      redirect_uri: redirectUri,
      state,
      response_type: 'code',
      scope,
    });
    return `https://www.facebook.com/v19.0/dialog/oauth?${params.toString()}`;
  }
  // Google / YouTube
  const { clientId } = googleCreds();
  const params = new URLSearchParams({
    client_id: clientId ?? '',
    redirect_uri: redirectUri,
    state,
    response_type: 'code',
    access_type: 'offline',
    include_granted_scopes: 'true',
    prompt: 'consent',
    scope: 'https://www.googleapis.com/auth/youtube.readonly',
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

/** A deterministic-ish realistic metric set for demo connections. */
export function demoMetrics(provider: ProviderId, seed: string) {
  // Simple stable hash so the same user gets stable demo numbers.
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const rand = (min: number, max: number, salt = 0) =>
    min + (((h + salt * 2654435761) >>> 0) % (max - min));

  const base = {
    instagram: { followers: rand(8000, 240000, 1), engagement: 2.4 + (rand(0, 40, 2) / 10) },
    facebook: { followers: rand(2000, 90000, 3), engagement: 1.1 + (rand(0, 30, 4) / 10) },
    youtube: { followers: rand(1500, 320000, 5), engagement: 3.0 + (rand(0, 50, 6) / 10) },
  }[provider];

  const handles = ['@maya.creates', '@studio.lumen', '@thedailyframe', '@northbound', '@nova.makes'];
  const username = handles[rand(0, handles.length, 7)];

  return {
    username,
    followers: base.followers,
    engagement: Number(base.engagement.toFixed(1)),
    profileUrl:
      provider === 'youtube'
        ? `https://youtube.com/${username.replace('@', '@')}`
        : `https://${provider}.com/${username.replace('@', '')}`,
  };
}
