import { NextRequest } from 'next/server';
import { requireAuth } from '@/lib/api/auth-middleware';
import { getAdminFirestore } from '@/lib/firebase/admin';

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.ok) return auth.response;

  const db = getAdminFirestore();
  const profileSnap = await db.collection('profiles').doc(auth.uid).get();
  const profile = profileSnap.exists ? profileSnap.data() : null;

  // Fetch additional data based on user type
  let onboardingCompleted = false;
  let bankDetailsCompleted = false;
  let platformsLinked = 0;

  if (profile?.userType === 'creator') {
    const creatorSnap = await db.collection('creators').doc(auth.uid).get();
    if (creatorSnap.exists) {
      const creatorData = creatorSnap.data();
      onboardingCompleted = creatorData?.onboardingCompleted ?? false;
      bankDetailsCompleted = creatorData?.bankDetailsCompleted ?? false;

      // Count linked platforms
      const platformsSnap = await db.collection('creators').doc(auth.uid)
        .collection('platforms').get();
      platformsLinked = platformsSnap.size;
    }
  } else if (profile?.userType === 'brand') {
    const brandSnap = await db.collection('brands').doc(auth.uid).get();
    if (brandSnap.exists) {
      const brandData = brandSnap.data();
      onboardingCompleted = brandData?.onboardingCompleted ?? false;
      bankDetailsCompleted = true; // Brands don't need bank details during onboarding
    }
  }

  return Response.json({
    uid: auth.uid,
    email: auth.email ?? null,
    userType: profile?.userType ?? null,
    displayName: profile?.displayName ?? null,
    onboardingCompleted,
    bankDetailsCompleted,
    platformsLinked,
  });
}
