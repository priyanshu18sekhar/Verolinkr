import { getAdminAuth } from './admin';

export interface DecodedToken {
  uid: string;
  email?: string;
}

/**
 * Verifies the Firebase ID token from Authorization: Bearer <token>.
 * Returns decoded token with uid; throws or returns null on failure.
 */
export async function verifyIdToken(
  idToken: string | null | undefined
): Promise<DecodedToken | null> {
  if (!idToken || typeof idToken !== 'string') {
    return null;
  }

  try {
    const auth = getAdminAuth();
    const decoded = await auth.verifyIdToken(idToken);
    return {
      uid: decoded.uid,
      email: decoded.email,
    };
  } catch (error) {
    console.error('verifyIdToken failed:', error);
    return null;
  }
}

/**
 * Extracts uid from a valid token. Use in API routes after verifying the request has a token.
 */
export async function getUserIdFromToken(
  idToken: string | null | undefined
): Promise<string | null> {
  const decoded = await verifyIdToken(idToken);
  return decoded?.uid ?? null;
}
