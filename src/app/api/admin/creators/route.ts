import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { requireAdmin } from '@/lib/api/admin-middleware';
import { getAdminFirestore } from '@/lib/firebase/admin';

/** List creators for the admin console. */
export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  const db = getAdminFirestore();
  const snap = await db.collection('creators').limit(200).get();
  const creators = snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      fullName: data.fullName ?? data.displayName ?? '—',
      email: data.email ?? '—',
      handle: data.handle ?? '',
      city: data.city ?? '',
      categories: data.categories ?? [],
      status: data.status ?? 'pending',
      platformsLinked: data.platformsLinked ?? 0,
      onboardingCompleted: data.onboardingCompleted ?? false,
      bankDetailsCompleted: data.bankDetailsCompleted ?? false,
    };
  });
  return NextResponse.json({ creators, count: creators.length });
}

/** Approve / reject / suspend a creator. Body: { id, status }. */
export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  let body: { id?: string; status?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { id, status } = body;
  const allowed = ['approved', 'rejected', 'suspended', 'pending'];
  if (!id || !status || !allowed.includes(status)) {
    return NextResponse.json({ error: 'id and a valid status are required' }, { status: 400 });
  }

  const db = getAdminFirestore();
  await db.collection('creators').doc(id).set(
    { status, reviewedAt: FieldValue.serverTimestamp(), reviewedBy: auth.uid },
    { merge: true }
  );
  return NextResponse.json({ success: true });
}
