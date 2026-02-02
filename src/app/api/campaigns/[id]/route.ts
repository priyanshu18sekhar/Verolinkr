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
  const db = getAdminFirestore();
  const doc = await db.collection('campaigns').doc(id).get();

  if (!doc.exists) {
    return Response.json(
      { error: 'Campaign not found' },
      { status: 404 }
    );
  }

  const data = doc.data();
  if (data?.ownerId !== auth.uid) {
    return Response.json(
      { error: 'Forbidden' },
      { status: 403 }
    );
  }

  return Response.json({ id: doc.id, ...data });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request);
  if (!auth.ok) return auth.response;

  const { id } = await params;
  const db = getAdminFirestore();
  const docRef = db.collection('campaigns').doc(id);
  const doc = await docRef.get();

  if (!doc.exists) {
    return Response.json(
      { error: 'Campaign not found' },
      { status: 404 }
    );
  }

  if (doc.data()?.ownerId !== auth.uid) {
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

  const allowed = ['title', 'description', 'budget', 'startDate', 'endDate', 'status'];
  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body && body[key] !== undefined) {
      updates[key] = body[key];
    }
  }
  updates.updatedAt = FieldValue.serverTimestamp();

  await docRef.update(updates);

  const updated = await docRef.get();
  const data = updated.exists ? updated.data() : {};
  return Response.json({ id: updated.id, ...data });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request);
  if (!auth.ok) return auth.response;

  const { id } = await params;
  const db = getAdminFirestore();
  const docRef = db.collection('campaigns').doc(id);
  const doc = await docRef.get();

  if (!doc.exists) {
    return Response.json(
      { error: 'Campaign not found' },
      { status: 404 }
    );
  }

  if (doc.data()?.ownerId !== auth.uid) {
    return Response.json(
      { error: 'Forbidden' },
      { status: 403 }
    );
  }

  await docRef.delete();
  return new Response(null, { status: 204 });
}
