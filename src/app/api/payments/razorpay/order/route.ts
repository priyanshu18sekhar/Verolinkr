import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { requireAuth } from '@/lib/api/auth-middleware';
import { getAdminFirestore } from '@/lib/firebase/admin';
import { getRazorpay, razorpayConfigured } from '@/lib/payments/razorpay';

/**
 * POST /api/payments/razorpay/order — create a Razorpay order to fund a
 * campaign. Body: { campaignId } (amount = campaign budget) or a raw
 * { amount } in rupees. Amounts are converted to paise; minimum ₹1.
 */
export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.ok) return auth.response;

  if (!razorpayConfigured()) {
    return NextResponse.json(
      { error: 'Payments are not configured yet. Add the Razorpay keys to the environment.' },
      { status: 503 }
    );
  }

  let body: { campaignId?: string; amount?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const db = getAdminFirestore();
  let amountRupees = Number(body.amount ?? 0);
  let campaignId: string | null = null;

  if (body.campaignId) {
    const snap = await db.collection('campaigns').doc(body.campaignId).get();
    if (!snap.exists) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }
    const campaign = snap.data() as Record<string, any>;
    if (campaign.ownerId !== auth.uid) {
      return NextResponse.json({ error: 'You can only fund your own campaigns' }, { status: 403 });
    }
    if (campaign.funded) {
      return NextResponse.json({ error: 'This campaign is already funded' }, { status: 400 });
    }
    amountRupees = Number(campaign.budget ?? 0);
    campaignId = snap.id;
  }

  const amountPaise = Math.round(amountRupees * 100);
  if (!amountPaise || amountPaise < 100) {
    return NextResponse.json({ error: 'Amount must be at least ₹1' }, { status: 400 });
  }

  try {
    const receipt = campaignId ? `cmp_${campaignId}`.slice(0, 40) : `usr_${auth.uid}`.slice(0, 40);
    const order = await getRazorpay().orders.create({
      amount: amountPaise,
      currency: 'INR',
      receipt,
      notes: {
        uid: auth.uid,
        campaignId: campaignId ?? '',
      },
    });

    await db.collection('payments').doc(order.id).set({
      orderId: order.id,
      uid: auth.uid,
      campaignId,
      amount: amountPaise,
      currency: 'INR',
      status: 'created',
      createdAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({
      order_id: order.id,
      amount: amountPaise,
      currency: 'INR',
    });
  } catch (error: any) {
    console.error('Razorpay order creation failed:', error?.error ?? error);
    return NextResponse.json({ error: 'Could not create the payment order' }, { status: 500 });
  }
}
