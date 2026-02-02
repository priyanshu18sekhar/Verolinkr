import { NextRequest } from 'next/server';
import { requireAuth } from '@/lib/api/auth-middleware';
import { getAdminFirestore } from '@/lib/firebase/admin';

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.ok) return auth.response;

  const db = getAdminFirestore();
  const profileSnap = await db.collection('profiles').doc(auth.uid).get();
  const profile = profileSnap.exists ? profileSnap.data() : null;

  return Response.json({
    uid: auth.uid,
    email: auth.email ?? null,
    userType: profile?.userType ?? null,
    displayName: profile?.displayName ?? null,
  });
}
