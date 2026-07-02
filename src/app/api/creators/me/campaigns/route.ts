import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { requireAuth } from '@/lib/api/auth-middleware';
import { getAdminFirestore } from '@/lib/firebase/admin';

/**
 * POST — apply to a marketplace campaign. Body: { campaignId }.
 * Creates an engagement doc under the creator so the campaign starts
 * tracking on their dashboard. Idempotent per campaign.
 */
export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.ok) return auth.response;

  let body: { campaignId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const campaignId = body.campaignId?.trim();
  if (!campaignId) {
    return NextResponse.json({ error: 'campaignId is required' }, { status: 400 });
  }

  const db = getAdminFirestore();
  const campaignSnap = await db.collection('campaigns').doc(campaignId).get();
  if (!campaignSnap.exists) {
    return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
  }
  const campaign = campaignSnap.data() as Record<string, any>;
  if (campaign.status !== 'active') {
    return NextResponse.json({ error: 'This campaign is not accepting creators right now.' }, { status: 400 });
  }

  const engagementRef = db
    .collection('creators')
    .doc(auth.uid)
    .collection('campaigns')
    .doc(campaignId);

  const existing = await engagementRef.get();
  if (existing.exists) {
    return NextResponse.json({ error: 'You have already applied to this campaign.' }, { status: 409 });
  }

  const cpv = Number(campaign.cpv ?? 0);
  const budget = Number(campaign.budget ?? 0);
  const targetViews = cpv > 0 ? Math.round(budget / cpv / Math.max(1, Number(campaign.creatorsJoined ?? 0) + 1)) : 10000;

  await engagementRef.set({
    campaignId,
    title: campaign.title ?? 'Campaign',
    brand: campaign.brandName ?? 'Brand',
    status: 'active',
    cpv,
    earnings: 0,
    currentViews: 0,
    targetViews,
    startedAt: FieldValue.serverTimestamp(),
  });

  await campaignSnap.ref.set(
    { creatorsJoined: FieldValue.increment(1), updatedAt: FieldValue.serverTimestamp() },
    { merge: true }
  );

  return NextResponse.json({ success: true, campaignId });
}

/** List the signed-in creator's own campaign engagements, newest first. */
export async function GET(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.ok) return auth.response;

  try {
    const db = getAdminFirestore();
    const snap = await db
      .collection('creators')
      .doc(auth.uid)
      .collection('campaigns')
      .orderBy('startedAt', 'desc')
      .limit(50)
      .get();

    const campaigns = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return NextResponse.json({ campaigns });
  } catch (error) {
    console.error('Error fetching creator campaigns:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
