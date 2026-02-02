import * as admin from 'firebase-admin';

function getAdminApp(): admin.app.App {
  if (admin.apps.length > 0) {
    return admin.apps[0] as admin.app.App;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Missing Firebase Admin env: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY'
    );
  }

  // Handle private key processing more robustly
  let decodedKey = privateKey;

  // Remove surrounding quotes if present (sometimes added by env vars)
  if (decodedKey.startsWith('"') && decodedKey.endsWith('"')) {
    decodedKey = decodedKey.slice(1, -1);
  }

  // Handle escaped newlines
  decodedKey = decodedKey.replace(/\\n/g, '\n');

  console.log(`[AdminSDK] Initializing with Project ID: ${projectId}`);
  console.log(`[AdminSDK] Initializing with Client Email: ${clientEmail}`);
  console.log(`[AdminSDK] Private Key Length: ${decodedKey?.length} chars`);

  try {
    return admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey: decodedKey,
      }),
      // Validate Database ID if present
      ...(process.env.FIREBASE_DATABASE_ID && !process.env.FIREBASE_DATABASE_ID.includes('://') ? {
        databaseURL: `https://${process.env.FIREBASE_DATABASE_ID}.firebaseio.com`
      } : {})
    });
  } catch (error) {
    console.error('Firebase Admin Initialization Error:', error);
    throw error;
  }
}

export function getAdminAuth(): admin.auth.Auth {
  return getAdminApp().auth();
}

import { getFirestore } from 'firebase-admin/firestore';

export function getAdminFirestore(): admin.firestore.Firestore {
  const app = getAdminApp();
  const databaseId = process.env.FIREBASE_DATABASE_ID;

  if (databaseId && !databaseId.includes('://')) {
    return getFirestore(app, databaseId);
  }
  return getFirestore(app);
}
