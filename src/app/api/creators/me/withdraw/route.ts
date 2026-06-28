import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { requireAuth } from '@/lib/api/auth-middleware';
import { getAdminFirestore } from '@/lib/firebase/admin';

/** List a creator's payout requests, most recent first. */
export async function GET(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.ok) return auth.response;

  const db = getAdminFirestore();
  const snap = await db
    .collection('creators')
    .doc(auth.uid)
    .collection('payouts')
    .orderBy('createdAt', 'desc')
    .limit(50)
    .get();

  const payouts = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  return NextResponse.json({ payouts });
}

/** Request a withdrawal. Body: { amount, accountId? }. */
export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.ok) return auth.response;

  let body: { amount?: number; accountId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const amount = Number(body.amount);
  if (!amount || amount <= 0) {
    return NextResponse.json({ error: 'A valid amount is required' }, { status: 400 });
  }

  const db = getAdminFirestore();
  const creatorRef = db.collection('creators').doc(auth.uid);
  const creatorSnap = await creatorRef.get();
  if (!creatorSnap.exists) {
    return NextResponse.json({ error: 'Creator profile not found' }, { status: 404 });
  }
  const creator = creatorSnap.data() as Record<string, any>;

  if (!creator.bankDetailsCompleted) {
    return NextResponse.json(
      { error: 'Add your bank details before requesting a payout.' },
      { status: 400 }
    );
  }

  const available = Number(creator.availableBalance ?? 0);
  // Only enforce the cap when a balance is actually being tracked.
  if (available > 0 && amount > available) {
    return NextResponse.json(
      { error: `Insufficient balance. Available: ${available}` },
      { status: 400 }
    );
  }

  const payoutRef = creatorRef.collection('payouts').doc();
  await payoutRef.set({
    creatorId: auth.uid,
    creatorName: creator.fullName ?? null,
    amount,
    accountId: body.accountId ?? null,
    status: 'requested',
    createdAt: FieldValue.serverTimestamp(),
  });

  if (available > 0) {
    await creatorRef.set(
      { availableBalance: FieldValue.increment(-amount) },
      { merge: true }
    );
  }

  return NextResponse.json({ success: true, payoutId: payoutRef.id, status: 'requested' });
}
