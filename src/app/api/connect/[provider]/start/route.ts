import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { FieldValue } from 'firebase-admin/firestore';
import { requireAuth } from '@/lib/api/auth-middleware';
import { getAdminFirestore } from '@/lib/firebase/admin';
import { isValidProvider, isLive, buildAuthorizeUrl } from '@/lib/connect/providers';

/**
 * Begins a platform connection. Authenticated (Bearer token).
 * Stores a short-lived state mapping (state -> uid) that the public callback
 * consumes, then returns the URL the browser should navigate to.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params;
  if (!isValidProvider(provider)) {
    return NextResponse.json({ error: 'Unknown provider' }, { status: 400 });
  }

  const auth = await requireAuth(request);
  if (!auth.ok) return auth.response;

  let returnTo = '/creator-dashboard';
  try {
    const body = await request.json();
    if (typeof body?.returnTo === 'string' && body.returnTo.startsWith('/')) {
      returnTo = body.returnTo;
    }
  } catch {
    /* body is optional */
  }

  const live = isLive(provider);
  const state = randomUUID();
  const origin = new URL(request.url).origin;
  const redirectUri = `${origin}/api/connect/${provider}/callback`;

  const db = getAdminFirestore();
  await db.collection('oauthStates').doc(state).set({
    uid: auth.uid,
    provider,
    mode: live ? 'live' : 'demo',
    redirectUri,
    returnTo,
    createdAt: FieldValue.serverTimestamp(),
  });

  const url = live
    ? buildAuthorizeUrl(provider, redirectUri, state)
    : `${redirectUri}?state=${state}&demo=1`;

  return NextResponse.json({ url, mode: live ? 'live' : 'demo' });
}
