import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { requireAuth } from '@/lib/api/auth-middleware';
import { getAdminFirestore } from '@/lib/firebase/admin';
import { verifyPaymentSignature } from '@/lib/payments/razorpay';

/**
 * POST /api/payments/razorpay/verify — verify a Standard Checkout payment.
 * Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }.
 * On a valid signature, marks the payment captured and the linked campaign
 * funded. A signature mismatch never marks anything paid.
 */
export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.ok) return auth.response;

  let body: {
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ error: 'Missing payment fields' }, { status: 400 });
  }

  const valid = verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
  if (!valid) {
    return NextResponse.json({ error: 'Payment signature mismatch' }, { status: 400 });
  }

  const db = getAdminFirestore();
  const paymentRef = db.collection('payments').doc(razorpay_order_id);
  const paymentSnap = await paymentRef.get();
  if (!paymentSnap.exists) {
    return NextResponse.json({ error: 'Unknown order' }, { status: 404 });
  }
  const payment = paymentSnap.data() as Record<string, any>;
  if (payment.uid !== auth.uid) {
    return NextResponse.json({ error: 'This order belongs to another account' }, { status: 403 });
  }

  await paymentRef.set(
    {
      status: 'captured',
      paymentId: razorpay_payment_id,
      capturedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  if (payment.campaignId) {
    await db.collection('campaigns').doc(payment.campaignId).set(
      {
        funded: true,
        fundedAt: FieldValue.serverTimestamp(),
        paymentOrderId: razorpay_order_id,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  }

  return NextResponse.json({ success: true, campaignId: payment.campaignId ?? null });
}
