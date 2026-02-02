import { NextRequest } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { requireAuth } from '@/lib/api/auth-middleware';
import { getAdminFirestore } from '@/lib/firebase/admin';

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.ok) return auth.response;

  let body: Record<string, any>;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: 'Invalid JSON' },
      { status: 400 }
    );
  }

  // Basic validation - check for essential fields from various steps
  // Note: Detailed validation can be added here or in a separate schema validator

  // Extract data sections (assuming the frontend sends the structure { creator: { ... } })
  // Adjusting based on how we plan to send data from Step 7
  const creatorData = body.creator || body;
  const skippedBankDetails = body.skippedBankDetails === true;

  const db = getAdminFirestore();
  const batch = db.batch();

  // 1. Create/Update Creator Document
  const creatorRef = db.collection('creators').doc(auth.uid);

  // Determine bankDetailsCompleted based on whether bank details were provided
  const hasBankDetails = !skippedBankDetails &&
    creatorData.bankName &&
    creatorData.accountNumber &&
    creatorData.ifscCode &&
    creatorData.pan;

  const creatorProfile = {
    ...creatorData,
    uid: auth.uid,
    email: auth.email,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    onboardingCompleted: true,
    bankDetailsCompleted: hasBankDetails,
  };

  batch.set(creatorRef, creatorProfile, { merge: true });

  // 2. Update Public Profile Mapping (used for session & user type lookups)
  const profileRef = db.collection('profiles').doc(auth.uid);
  batch.set(profileRef, {
    uid: auth.uid,
    userType: 'creator',
    displayName: creatorData.displayName || creatorData.fullName || null,
    photoURL: creatorData.avatarUrl || null,
    updatedAt: FieldValue.serverTimestamp(),
  }, { merge: true });

  try {
    console.log(`[API] Attempting to save profile for uid: ${auth.uid}`);
    console.log(`[API] Using project ID: ${process.env.FIREBASE_PROJECT_ID}`);
    await batch.commit();
    console.log('[API] Profile saved successfully');
    return Response.json({ success: true, uid: auth.uid });
  } catch (error: any) {
    console.error('Error creating creator profile:', error);
    // Log specific details if available
    if (error.code) console.error('Error Code:', error.code);
    if (error.details) console.error('Error Details:', error.details);

    return Response.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
