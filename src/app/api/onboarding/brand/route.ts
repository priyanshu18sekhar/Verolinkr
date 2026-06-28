import { NextRequest } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { requireAuth } from '@/lib/api/auth-middleware';
import { getAdminFirestore } from '@/lib/firebase/admin';

/**
 * Completes brand onboarding.
 *
 * Mirrors /api/onboarding/creator: writes the canonical `profiles/{uid}` doc
 * (the source of truth the session route reads for userType + routing) AND the
 * full `brands/{uid}` profile with `onboardingCompleted: true`. Without the
 * profiles write, a finished brand would still resolve to userType: null.
 *
 * Accepts either { brand: {...} } or a flat body.
 */
export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.ok) return auth.response;

  let body: Record<string, any>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const brandData = body.brand || body;

  const companyName = brandData.companyName || brandData.legalName || null;
  if (!companyName) {
    return Response.json({ error: 'Company name is required' }, { status: 400 });
  }

  const db = getAdminFirestore();
  const batch = db.batch();

  // 1. Brand profile
  const brandRef = db.collection('brands').doc(auth.uid);
  batch.set(
    brandRef,
    {
      ...brandData,
      uid: auth.uid,
      businessEmail: brandData.businessEmail || auth.email || null,
      kycStatus: brandData.kycStatus || 'pending',
      verified: false,
      active: true,
      onboardingCompleted: true,
      updatedAt: FieldValue.serverTimestamp(),
      createdAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  // 2. Canonical profile mapping (used by the session route for userType lookups)
  const profileRef = db.collection('profiles').doc(auth.uid);
  batch.set(
    profileRef,
    {
      uid: auth.uid,
      userType: 'brand',
      displayName: companyName,
      photoURL: brandData.logo || null,
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  try {
    await batch.commit();
    return Response.json({ success: true, uid: auth.uid });
  } catch (error: any) {
    console.error('Error completing brand onboarding:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
