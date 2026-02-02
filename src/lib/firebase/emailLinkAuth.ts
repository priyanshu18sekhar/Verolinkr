'use client';

import {
  isSignInWithEmailLink,
  signInWithEmailLink,
  sendSignInLinkToEmail,
  type ActionCodeSettings,
} from 'firebase/auth';
import { auth } from './client';

const EMAIL_FOR_SIGN_IN_KEY = 'emailForSignIn';

/**
 * Returns true if the current or given URL is a sign-in with email link.
 */
export function isEmailLinkSignIn(href: string): boolean {
  return isSignInWithEmailLink(auth, href);
}

/**
 * Get the email stored when the user requested the sign-in link (same device).
 * Returns null if opened on a different device.
 */
export function getStoredEmailForSignIn(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(EMAIL_FOR_SIGN_IN_KEY);
}

/**
 * Complete sign-in with email link. Call when isEmailLinkSignIn(href) is true.
 * Removes the stored email from localStorage on success.
 */
export async function completeEmailLinkSignIn(
  href: string,
  email: string
): Promise<ReturnType<typeof signInWithEmailLink>> {
  const result = await signInWithEmailLink(auth, email, href);
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(EMAIL_FOR_SIGN_IN_KEY);
  }
  return result;
}

/**
 * Send a sign-in link to the given email. The link will open the app at /auth.
 * Stores the email in localStorage so completion on the same device doesn't need re-entry.
 */
export async function sendSignInLink(email: string): Promise<void> {
  if (typeof window === 'undefined') {
    throw new Error('sendSignInLink must be called in the browser');
  }
  const actionCodeSettings: ActionCodeSettings = {
    url: `${window.location.origin}/auth`,
    handleCodeInApp: true,
  };
  await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  window.localStorage.setItem(EMAIL_FOR_SIGN_IN_KEY, email);
}
