import { NextRequest } from 'next/server';
import { verifyIdToken, DecodedToken } from '@/lib/firebase/auth';

export interface AuthResult {
  ok: true;
  uid: string;
  email?: string;
  decoded: DecodedToken;
}

export interface AuthFailure {
  ok: false;
  response: Response;
}

/**
 * Extracts Bearer token from request and verifies with Firebase Admin.
 * Use at the start of protected API route handlers.
 * Returns { ok: true, uid, decoded } or { ok: false, response } (401).
 */
export async function requireAuth(
  request: NextRequest
): Promise<AuthResult | AuthFailure> {
  const authHeader = request.headers.get('authorization');
  const token =
    authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;

  const decoded = await verifyIdToken(token);
  if (!decoded) {
    return {
      ok: false,
      response: new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }),
    };
  }

  return {
    ok: true,
    uid: decoded.uid,
    email: decoded.email,
    decoded,
  };
}
