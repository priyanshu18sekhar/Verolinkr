'use client';

import { useState, useCallback, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeIcon, EyeSlashIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import {
  isEmailLinkSignIn,
  getStoredEmailForSignIn,
  completeEmailLinkSignIn,
  sendSignInLink,
} from '@/lib/firebase/emailLinkAuth';
import { Input, Button, Container, Typography } from '../../components/design-system';
import { AnimatedParticles } from '../../components/onboarding';
import { fadeInUp } from '../../utils/animations';

function getAuthErrorMessage(code: string): string {
  const messages: Record<string, string> = {
    'auth/email-already-in-use': 'This email is already registered.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/operation-not-allowed': 'Email/password sign-in is not enabled.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/invalid-credential': 'Invalid email or password.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Invalid password.',
    'auth/popup-closed-by-user': 'Sign-in was cancelled.',
    'auth/cancelled-popup-request': 'Sign-in was cancelled.',
    'auth/account-exists-with-different-credential':
      'An account already exists with the same email. Try signing in with your password or link accounts in settings.',
    'auth/invalid-action-code': 'This sign-in link is invalid or has expired. Request a new one.',
    'auth/expired-action-code': 'This sign-in link has expired. Request a new one.',
  };
  return messages[code] ?? 'An error occurred. Please try again.';
}

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = useCallback(() => {
    const redirect = searchParams.get('redirect');
    if (redirect && redirect.startsWith('/')) return redirect;
    return '/creator-dashboard';
  }, [searchParams]);

  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Email link (passwordless) flow
  const [emailLinkState, setEmailLinkState] = useState<
    'none' | 'completing' | 'need-email' | 'link-sent'
  >('none');
  const [linkSentToEmail, setLinkSentToEmail] = useState<string | null>(null);
  const [showEmailLinkForm, setShowEmailLinkForm] = useState(false);

  // Toast State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Handle Redirect Result (Google Sign In)
  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;
          showToast('Successfully signed in with Google!', 'success');

          // Dynamically import db
          const { doc, getDoc } = await import('firebase/firestore');
          const { getClientDb } = await import('@/lib/firebase/client');
          const db = getClientDb();

          // Check Creator Profile
          const creatorDoc = await getDoc(doc(db, 'creators', user.uid));
          if (creatorDoc.exists()) {
            showToast('Welcome back, Creator!', 'success');
            router.push('/creator-dashboard');
            return;
          }

          // Check Brand Profile
          const brandDoc = await getDoc(doc(db, 'brands', user.uid));
          if (brandDoc.exists()) {
            showToast('Welcome back, Brand!', 'success');
            router.push('/brand-dashboard');
            return;
          }

          // No profile found -> New User -> Onboarding
          showToast('Account created! Redirecting to setup...', 'success');
          router.push('/onboarding/role-selection');
        }
      } catch (error: any) {
        console.error("Redirect auth error:", error);
        setSubmitError(getAuthErrorMessage(error?.code || 'auth/unknown'));
        showToast('Authentication failed. Please try again.', 'error');
      }
    };
    
    handleRedirect();
  }, [router]);

  // On mount: detect if we're opening an email sign-in link and complete or ask for email
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const href = window.location.href;
    if (!isEmailLinkSignIn(href)) return;

    const storedEmail = getStoredEmailForSignIn();
    if (storedEmail) {
      setEmailLinkState('completing');
      setSubmitError(null);
      completeEmailLinkSignIn(href, storedEmail)
        .then(() => {
          router.replace(redirectTo());
        })
        .catch((err: unknown) => {
          const code = err && typeof err === 'object' && 'code' in err ? String((err as { code: string }).code) : '';
          setSubmitError(getAuthErrorMessage(code));
          setEmailLinkState('none');
        });
    } else {
      setEmailLinkState('need-email');
    }
  }, [router, redirectTo]);

  // Monitor Auth State & Redirect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth State Changed:", user ? `User ${user.uid}` : "No User");
      if (user) {
        try {
          // Use Firestore Lite to minimize connection/WebSocket issues
          const { doc, getDoc, getFirestore } = await import('firebase/firestore/lite');
          const { getApp } = await import('firebase/app');
          // Explicitly use the database ID found via CLI
          const db = getFirestore(getApp(), 'verolinkr-native');

          console.log("Checking Creator Profile for:", user.uid);
          
          // Helper for basic timeout if fetch takes too long
          const getDocWithTimeout = (ref: any, ms = 5000) => {
            return Promise.race([
              getDoc(ref),
              new Promise((_, reject) => setTimeout(() => reject(new Error(`Firestore request timed out after ${ms}ms`)), ms))
            ]);
          };

          // Check Creator Profile
          try {
            const creatorDoc: any = await getDocWithTimeout(doc(db, 'creators', user.uid));
            if (creatorDoc.exists()) {
              console.log("Creator Profile Found!");
              router.push('/creator-dashboard');
              return;
            }
          } catch (e) {
             console.error("Creator Profile Check Failed:", e);
             // Fallback: proceed to Brand check if timed out? Or stop?
             // Usually if timed out, Brand check will also timeout.
             // But let's try Brand check anyway.
          }

          console.log("Checking Brand Profile for:", user.uid);
          // Check Brand Profile
          try {
            const brandDoc: any = await getDocWithTimeout(doc(db, 'brands', user.uid));
            if (brandDoc.exists()) {
              console.log("Brand Profile Found!");
              router.push('/brand-dashboard');
              return;
            }
          } catch (e) {
             console.error("Brand Profile Check Failed:", e);
          }

          console.log("No profile found (or check failed). Redirecting to Onboarding...");
          // No profile -> Onboarding
          router.push('/onboarding/role-selection');
        } catch (error) {
           console.error("Auth state logic error:", error);
        }
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleCompleteEmailLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window === 'undefined' || emailLinkState !== 'need-email') return;
    const email = formData.email.trim();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setSubmitError('Please enter a valid email address.');
      return;
    }
    setSubmitError(null);
    setEmailLinkState('completing');
    try {
      await completeEmailLinkSignIn(window.location.href, email);
      router.replace(redirectTo());
    } catch (err: unknown) {
      const code = err && typeof err === 'object' && 'code' in err ? String((err as { code: string }).code) : '';
      setSubmitError(getAuthErrorMessage(code));
      setEmailLinkState('need-email');
    }
  };

  const handleSendEmailLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = formData.email.trim();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setSubmitError('Please enter a valid email address.');
      return;
    }
    setSubmitError(null);
    try {
      await sendSignInLink(email);
      setLinkSentToEmail(email);
      setEmailLinkState('link-sent');
    } catch (err: unknown) {
      const code = err && typeof err === 'object' && 'code' in err ? String((err as { code: string }).code) : '';
      setSubmitError(getAuthErrorMessage(code));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSubmitError(null);
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleTabChange = (tab: 'login' | 'signup') => {
    setActiveTab(tab);
    setSubmitError(null);
    setShowEmailLinkForm(false);
  };

  const validateForm = (isSignup: boolean = false) => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (isSignup) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isSignup = activeTab === 'signup';
    setSubmitError(null);

    if (!validateForm(isSignup)) return;

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        router.push('/onboarding/role-selection');
      } else {
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        router.push(redirectTo());
      }
    } catch (err: unknown) {
      const code = err && typeof err === 'object' && 'code' in err ? String((err as { code: string }).code) : '';
      setSubmitError(getAuthErrorMessage(code));
    }
  };

  const handleGoogleSignIn = async () => {
    setSubmitError(null);
    setIsRedirecting(true); // Show loading state if needed
    const provider = new GoogleAuthProvider();
    
    try {
      await signInWithRedirect(auth, provider);
      // execution ends here as page redirects
    } catch (err: unknown) {
      setIsRedirecting(false);
      const code = err && typeof err === 'object' && 'code' in err ? String((err as { code: string }).code) : '';
      const msg = getAuthErrorMessage(code);
      setSubmitError(msg);
      showToast(msg, 'error');
    }
  };

  return (
    <div suppressHydrationWarning className="min-h-screen bg-white flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Subtle background elements matching Hero */}
      <AnimatedParticles count={40} />

      <Container size="sm">
        <motion.div
          suppressHydrationWarning
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="w-full relative z-10"
        >
          {/* Header - Matching Hero style */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography variant="h2" className="mb-6 font-black">
              Welcome to VeroLinkr
            </Typography>
              <Typography variant="lead" className="text-gray-600 font-light">
                The Premium Platform for Authentic Influencer Marketing
            </Typography>
            </motion.div>
          </div>

          {/* Auth Card */}
          <motion.div
            className="bg-white border-2 border-gray-200 rounded-3xl p-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Email link: completing or need email */}
            {emailLinkState === 'completing' && (
              <div className="mb-8 py-8 text-center">
                <div className="animate-pulse text-gray-600">Completing sign-in...</div>
              </div>
            )}

            {emailLinkState === 'need-email' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <Typography variant="h3" className="mb-4 font-bold">
                  Confirm your email
                </Typography>
                <p className="text-gray-600 mb-6 text-sm">
                  You opened this link on a different device. Enter the email address you used to request the sign-in link.
                </p>
                <form onSubmit={handleCompleteEmailLinkSubmit} className="space-y-4">
                  {submitError && (
                    <p className="text-sm font-medium text-red-600">{submitError}</p>
                  )}
                  <Input
                    label="Email address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    error={errors.email}
                    required
                  />
                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    Complete sign-in
                  </Button>
                </form>
              </motion.div>
            )}

            {emailLinkState === 'link-sent' && linkSentToEmail && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 rounded-2xl border-2 border-gray-200 bg-gray-50 p-6 text-center"
              >
                <EnvelopeIcon className="w-12 h-12 mx-auto text-gray-700 mb-4" />
                <Typography variant="h3" className="mb-2 font-bold">
                  Check your email
                </Typography>
                <p className="text-gray-600 text-sm mb-4">
                  We sent a sign-in link to <strong>{linkSentToEmail}</strong>. Click the link in that email to sign in.
                </p>
                <button
                  suppressHydrationWarning
                  type="button"
                  onClick={() => {
                    setEmailLinkState('none');
                    setLinkSentToEmail(null);
                  }}
                  className="text-sm font-bold text-black hover:underline"
                >
                  Use a different method
                </button>
              </motion.div>
            )}

            {/* Tab Navigation – hide when in email-link flow */}
            {emailLinkState === 'none' && !linkSentToEmail && (
            <>
            <div className="flex mb-8 bg-gray-50 rounded-2xl p-1">
              <button
                suppressHydrationWarning
                type="button"
                onClick={() => handleTabChange('login')}
                className={`flex-1 py-4 px-6 rounded-xl text-lg font-black transition-all duration-200 ${
                  activeTab === 'login'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                Login
              </button>
              <button
                suppressHydrationWarning
                type="button"
                onClick={() => handleTabChange('signup')}
                className={`flex-1 py-4 px-6 rounded-xl text-lg font-black transition-all duration-200 ${
                  activeTab === 'signup'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Google Sign-In */}
            <div className="mb-8">
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="w-full flex items-center justify-center gap-3"
                onClick={handleGoogleSignIn}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>
            </div>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">Or continue with email</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'login' ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {!showEmailLinkForm ? (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      {submitError && (
                        <p className="text-sm font-medium text-red-600">{submitError}</p>
                      )}
                      <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@example.com"
                        error={errors.email}
                        required
                      />

                      <div>
                        <div className="relative">
                        <Input
                          label="Password"
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Enter your password"
                            error={errors.password}
                          required
                        />
                          <button
                            suppressHydrationWarning
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-12 text-gray-500 hover:text-black"
                          >
                            {showPassword ? (
                              <EyeSlashIcon className="w-6 h-6" />
                            ) : (
                              <EyeIcon className="w-6 h-6" />
                            )}
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              suppressHydrationWarning
                              type="checkbox"
                              className="h-5 w-5 rounded border-gray-300 text-black focus:ring-black"
                            />
                            <span className="text-sm font-medium text-gray-700">Remember me</span>
                          </label>
                          <Link href="/forgot-password" className="text-sm font-bold text-black hover:underline">
                            Forgot password?
                          </Link>
                        </div>
                      </div>

                      <Button
                        variant="primary"
                        size="lg"
                        type="submit"
                        className="w-full"
                      >
                        Sign In
                      </Button>
                      <div className="text-center">
                        <button
                          suppressHydrationWarning
                          type="button"
                          onClick={() => setShowEmailLinkForm(true)}
                          className="text-sm font-bold text-black hover:underline"
                        >
                          Sign in with email link instead
                        </button>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={handleSendEmailLink} className="space-y-6">
                      {submitError && (
                        <p className="text-sm font-medium text-red-600">{submitError}</p>
                      )}
                      <Input
                        label="Email address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@example.com"
                        error={errors.email}
                        required
                      />
                      <Button
                        type="submit"
                        variant="secondary"
                        size="lg"
                        className="w-full"
                      >
                        Send sign-in link
                      </Button>
                      <div className="text-center">
                        <button
                          suppressHydrationWarning
                          type="button"
                          onClick={() => setShowEmailLinkForm(false)}
                          className="text-sm font-bold text-black hover:underline"
                        >
                          Back to password
                        </button>
                      </div>
                    </form>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {submitError && (
                      <p className="text-sm font-medium text-red-600">{submitError}</p>
                    )}
                    <Input
                      label="Email Address"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      error={errors.email}
                      required
                    />

                    <div>
                      <div className="relative">
                        <Input
                          label="Password"
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Create a strong password"
                          error={errors.password}
                          hint="Must be at least 8 characters long"
                          required
                        />
                        <button
                          suppressHydrationWarning
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-12 text-gray-500 hover:text-black"
                        >
                          {showPassword ? (
                            <EyeSlashIcon className="w-6 h-6" />
                          ) : (
                            <EyeIcon className="w-6 h-6" />
                          )}
                        </button>
                          </div>
                        </div>

                    <div>
                      <div className="relative">
                        <Input
                          label="Confirm Password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="Confirm your password"
                          error={errors.confirmPassword}
                          required
                        />
                        <button
                          suppressHydrationWarning
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-12 text-gray-500 hover:text-black"
                        >
                          {showConfirmPassword ? (
                            <EyeSlashIcon className="w-6 h-6" />
                          ) : (
                            <EyeIcon className="w-6 h-6" />
                          )}
                        </button>
                          </div>
                        </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-start space-x-4">
                      <input
                        suppressHydrationWarning
                        type="checkbox"
                        id="terms"
                        className="mt-2 h-5 w-5 rounded border-gray-300 text-black focus:ring-black"
                        required
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600">
                        I agree to the{' '}
                        <Link href="/terms" className="text-black font-bold hover:underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-black font-bold hover:underline">
                          Privacy Policy
                    </Link>
                      </label>
                  </div>

                    <Button
                      variant="primary"
                      size="lg"
                      type="submit"
                      className="w-full"
                    >
                      Create Account
                    </Button>
                  </form>

                  <div className="text-center pt-4">
                    <Typography variant="caption" className="text-gray-600">
                      Already have an account?{' '}
                      <button
                        suppressHydrationWarning
                        onClick={() => setActiveTab('login')}
                        className="text-black font-bold hover:underline"
                      >
                        Sign in here
                      </button>
                    </Typography>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            </>
            )}

          </motion.div>

          {/* Footer Links */}
          <div className="text-center mt-12 space-y-4">
            <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-black block">
              Contact Support
            </Link>

          </div>
        </motion.div>
      {/* Aesthetic Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-2xl flex items-center space-x-3 ${
              toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-black text-white'
            }`}
          >
            {toast.type === 'success' && (
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            <span className="font-medium text-sm">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
      </Container>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div></div>}>
      <AuthContent />
    </Suspense>
  );
}
