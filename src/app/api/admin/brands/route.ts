import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { requireAdmin } from '@/lib/api/admin-middleware';
import { getAdminFirestore } from '@/lib/firebase/admin';

/** List brands for the admin console. */
export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  const db = getAdminFirestore();
  const snap = await db.collection('brands').limit(200).get();
  const brands = snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      companyName: data.companyName ?? '—',
      businessEmail: data.businessEmail ?? '—',
      city: data.city ?? '',
      industry: data.industry ?? '',
      kycStatus: data.kycStatus ?? 'pending',
      verified: data.verified ?? false,
      onboardingCompleted: data.onboardingCompleted ?? false,
    };
  });
  return NextResponse.json({ brands, count: brands.length });
}

/** Update KYC status / verification. Body: { id, kycStatus?, verified? }. */
export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  let body: { id?: string; kycStatus?: string; verified?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { id, kycStatus, verified } = body;
  if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

  const update: Record<string, unknown> = {
    reviewedAt: FieldValue.serverTimestamp(),
    reviewedBy: auth.uid,
  };
  if (kycStatus && ['approved', 'rejected', 'pending'].includes(kycStatus)) {
    update.kycStatus = kycStatus;
  }
  if (typeof verified === 'boolean') update.verified = verified;

  const db = getAdminFirestore();
  await db.collection('brands').doc(id).set(update, { merge: true });
  return NextResponse.json({ success: true });
}
