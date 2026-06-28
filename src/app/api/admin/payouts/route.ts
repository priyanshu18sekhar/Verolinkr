import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { requireAdmin } from '@/lib/api/admin-middleware';
import { getAdminFirestore } from '@/lib/firebase/admin';

/** List all payout requests across creators (newest first). */
export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  const db = getAdminFirestore();
  // collectionGroup spans every creator's `payouts` subcollection.
  const snap = await db
    .collectionGroup('payouts')
    .orderBy('createdAt', 'desc')
    .limit(200)
    .get()
    .catch(() => null);

  const payouts = (snap?.docs ?? []).map((d) => ({ id: d.id, ...d.data() }));
  return NextResponse.json({ payouts, count: payouts.length });
}

/** Update a payout. Body: { creatorId, payoutId, status }. */
export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  let body: { creatorId?: string; payoutId?: string; status?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { creatorId, payoutId, status } = body;
  const allowed = ['requested', 'processing', 'paid', 'rejected'];
  if (!creatorId || !payoutId || !status || !allowed.includes(status)) {
    return NextResponse.json(
      { error: 'creatorId, payoutId and a valid status are required' },
      { status: 400 }
    );
  }

  const db = getAdminFirestore();
  const ref = db.collection('creators').doc(creatorId).collection('payouts').doc(payoutId);

  // Refund the balance if a tracked payout is rejected.
  if (status === 'rejected') {
    const snap = await ref.get();
    const amount = Number(snap.data()?.amount ?? 0);
    if (snap.exists && snap.data()?.status !== 'rejected' && amount > 0) {
      await db
        .collection('creators')
        .doc(creatorId)
        .set({ availableBalance: FieldValue.increment(amount) }, { merge: true });
    }
  }

  await ref.set(
    { status, reviewedAt: FieldValue.serverTimestamp(), reviewedBy: auth.uid },
    { merge: true }
  );
  return NextResponse.json({ success: true });
}
