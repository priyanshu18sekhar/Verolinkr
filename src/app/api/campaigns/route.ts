import { NextRequest } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { requireAuth } from '@/lib/api/auth-middleware';
import { getAdminFirestore } from '@/lib/firebase/admin';

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.ok) return auth.response;

  const db = getAdminFirestore();
  const snapshot = await db
    .collection('campaigns')
    .where('ownerId', '==', auth.uid)
    .get();

  const campaigns = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return Response.json({ campaigns });
}

export async function POST(request: NextRequest) {
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

  const allowed = ['title', 'description', 'budget', 'startDate', 'endDate', 'status'];
  const data: Record<string, unknown> = {
    ownerId: auth.uid,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };
  for (const key of allowed) {
    if (key in body && body[key] !== undefined) {
      data[key] = body[key];
    }
  }

  const db = getAdminFirestore();
  const ref = await db.collection('campaigns').add(data);

  const doc = await ref.get();
  const created = doc.exists ? { id: doc.id, ...doc.data() } : null;
  return Response.json(created, { status: 201 });
}
