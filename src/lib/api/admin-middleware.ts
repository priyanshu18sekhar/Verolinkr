import { NextRequest } from 'next/server';
import { requireAuth, type AuthResult, type AuthFailure } from '@/lib/api/auth-middleware';
import { getAdminFirestore } from '@/lib/firebase/admin';

/**
 * Admin gate for API routes. A user is an admin if EITHER:
 *  - their email is listed in the ADMIN_EMAILS env var (comma-separated), or
 *  - their profiles/{uid} doc has role === 'admin'.
 *
 * Returns the same shape as requireAuth so handlers can early-return on failure.
 */
export async function requireAdmin(
  request: NextRequest
): Promise<AuthResult | AuthFailure> {
  const auth = await requireAuth(request);
  if (!auth.ok) return auth;

  const adminEmails = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  const email = auth.email?.toLowerCase();
  if (email && adminEmails.includes(email)) return auth;

  try {
    const db = getAdminFirestore();
    const snap = await db.collection('profiles').doc(auth.uid).get();
    if (snap.exists && snap.data()?.role === 'admin') return auth;
  } catch {
    /* fall through to forbidden */
  }

  return {
    ok: false,
    response: new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    }),
  };
}

/** Lightweight check used by the /api/admin/me endpoint. */
export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const adminEmails = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return adminEmails.includes(email.toLowerCase());
}
