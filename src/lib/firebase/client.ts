'use client';

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  ...(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID && {
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  }),
};

// Debugging: Check if config is loaded
if (typeof window !== 'undefined') {
  console.log('[Firebase] Config check:', {
    hasApiKey: !!firebaseConfig.apiKey,
    hasAuthDomain: !!firebaseConfig.authDomain,
    hasProjectId: !!firebaseConfig.projectId,
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
    envCheck: {
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    }
  });
}


// Lazy initialization to avoid SSR issues
let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;

function getFirebaseApp(): FirebaseApp {
  // Skip initialization on server during prerender
  if (typeof window === 'undefined') {
    throw new Error('Firebase client cannot be used on the server');
  }

  if (!_app) {
    _app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  }
  return _app;
}

// Auth getter with lazy initialization
export function getClientAuth(): Auth {
  if (!_auth) {
    _auth = getAuth(getFirebaseApp());
  }
  return _auth;
}

// For backward compatibility - use getter to lazily init
export const auth: Auth = new Proxy({} as Auth, {
  get(_, prop) {
    return (getClientAuth() as any)[prop];
  },
});

// Lazy firebaseApp getter
export const firebaseApp = new Proxy({} as FirebaseApp, {
  get(_, prop) {
    return (getFirebaseApp() as any)[prop];
  },
});

/** Initialize Analytics in the browser when supported. Call once from a client component. */
export async function initAnalytics(): Promise<Analytics | null> {
  if (typeof window === 'undefined') return null;
  if (!(await isSupported())) return null;
  return getAnalytics(getFirebaseApp());
}

