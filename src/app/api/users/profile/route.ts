import { NextRequest } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { requireAuth } from '@/lib/api/auth-middleware';
import { getAdminFirestore } from '@/lib/firebase/admin';

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.ok) return auth.response;

  const db = getAdminFirestore();
  const profileSnap = await db.collection('profiles').doc(auth.uid).get();

  if (!profileSnap.exists) {
    return Response.json(
      { error: 'Profile not found' },
      { status: 404 }
    );
  }

  const data = profileSnap.data();
  return Response.json({
    uid: auth.uid,
    ...data,
  });
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.ok) return auth.response;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: 'Invalid JSON' },
      { status: 400 }
    );
  }

  const allowed = ['userType', 'displayName', 'bio', 'avatarUrl'];
  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body && body[key] !== undefined) {
      updates[key] = body[key];
    }
  }
  updates.updatedAt = FieldValue.serverTimestamp();

  const db = getAdminFirestore();
  await db.collection('profiles').doc(auth.uid).set(updates, { merge: true });

  const profileSnap = await db.collection('profiles').doc(auth.uid).get();
  const data = profileSnap.exists ? profileSnap.data() : {};
  return Response.json({ uid: auth.uid, ...data });
}
