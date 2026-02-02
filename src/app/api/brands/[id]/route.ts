import { NextRequest } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { requireAuth } from '@/lib/api/auth-middleware';
import { getAdminFirestore } from '@/lib/firebase/admin';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request);
  if (!auth.ok) return auth.response;

  const { id } = await params;
  if (id !== auth.uid) {
    return Response.json(
      { error: 'Forbidden' },
      { status: 403 }
    );
  }

  const db = getAdminFirestore();
  const doc = await db.collection('brands').doc(id).get();
  if (!doc.exists) {
    return Response.json(
      { error: 'Brand not found' },
      { status: 404 }
    );
  }

  return Response.json({ id: doc.id, ...doc.data() });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request);
  if (!auth.ok) return auth.response;

  const { id } = await params;
  if (id !== auth.uid) {
    return Response.json(
      { error: 'Forbidden' },
      { status: 403 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: 'Invalid JSON' },
      { status: 400 }
    );
  }

  const allowed = ['companyName', 'industry', 'website', 'bio', 'logoUrl'];
  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body && body[key] !== undefined) {
      updates[key] = body[key];
    }
  }
  updates.updatedAt = FieldValue.serverTimestamp();

  const db = getAdminFirestore();
  await db.collection('brands').doc(id).set(updates, { merge: true });

  const doc = await db.collection('brands').doc(id).get();
  const data = doc.exists ? doc.data() : {};
  return Response.json({ id: doc.id, ...data });
}
