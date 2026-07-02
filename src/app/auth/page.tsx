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
import { Input } from '../../components/design-system';
import { AuroraTitle } from '../../components/cinematic/AuroraTitle';

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

  const [emailLinkState, setEmailLinkState] = useState<
    'none' | 'completing' | 'need-email' | 'link-sent'
  >('none');
  const [linkSentToEmail, setLinkSentToEmail] = useState<string | null>(null);
  const [showEmailLinkForm, setShowEmailLinkForm] = useState(false);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    getRedirectResult(auth).then(async (result) => {
      if (!result) return;
      const user = result.user;
      showToast('Successfully signed in with Google!', 'success');

      const { doc, getDoc } = await import('firebase/firestore');
      const { getClientDb } = await import('@/lib/firebase/client');
      const db = getClientDb();

      const creatorDoc = await getDoc(doc(db, 'creators', user.uid));
      if (creatorDoc.exists()) { router.push('/creator-dashboard'); return; }

      const brandDoc = await getDoc(doc(db, 'brands', user.uid));
      if (brandDoc.exists()) { router.push('/brand-dashboard'); return; }

      router.push('/onboarding/role-selection');
    }).catch((err: any) => {
      const msg = getAuthErrorMessage(err?.code ?? '');
      setSubmitError(msg);
      showToast(msg, 'error');
    });
  }, [router]);

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const { doc, getDoc, getFirestore } = await import('firebase/firestore/lite');
          const { getApp } = await import('firebase/app');
          const db = getFirestore(getApp(), 'verolinkr-native');

          const getDocWithTimeout = (ref: any, ms = 5000) => {
            return Promise.race([
              getDoc(ref),
              new Promise((_, reject) => setTimeout(() => reject(new Error(`Firestore request timed out after ${ms}ms`)), ms))
            ]);
          };

          try {
            const creatorDoc: any = await getDocWithTimeout(doc(db, 'creators', user.uid));
            if (creatorDoc.exists()) {
              router.push('/creator-dashboard');
              return;
            }
          } catch (e) {
            console.error("Creator Profile Check Failed:", e);
          }

          try {
            const brandDoc: any = await getDocWithTimeout(doc(db, 'brands', user.uid));
            if (brandDoc.exists()) {
              router.push('/brand-dashboard');
              return;
            }
          } catch (e) {
            console.error("Brand Profile Check Failed:", e);
          }

          showToast('Account created! Redirecting to setup...', 'success');
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
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        router.push('/onboarding/role-selection');
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        router.push(redirectTo());
      }
    } catch (err: unknown) {
      const code = err && typeof err === 'object' && 'code' in err ? String((err as { code: string }).code) : '';
      setSubmitError(getAuthErrorMessage(code));
    }
  };

  const handleGoogleSignIn = async () => {
    setSubmitError(null);
    setIsRedirecting(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (err: unknown) {
      setIsRedirecting(false);
      const code = err && typeof err === 'object' && 'code' in err ? String((err as { code: string }).code) : '';
      const msg = getAuthErrorMessage(code);
      setSubmitError(msg);
      showToast(msg, 'error');
    }
  };

  return (
    <div suppressHydrationWarning className="cine-wrap min-h-screen flex flex-col lg:flex-row">

      {/* ── Left branding panel (desktop only) ──────────────────────── */}
      <div
        className="hidden lg:flex lg:w-[44%] flex-col justify-between p-14 xl:p-20"
        style={{ borderRight: '1px solid rgba(11,11,18,0.08)' }}
      >
        <Link
          href="/"
          className="cine-eyebrow hover:opacity-60 transition-opacity"
          style={{ color: '#6b6a7b' }}
        >
          ← verolinkr.com
        </Link>

        <div>
          <p className="cine-eyebrow mb-8">Verified reach · Receipt #VL·001</p>

          <h1 style={{ fontSize: 'clamp(2.8rem, 5vw, 5.5rem)', lineHeight: 0.9, letterSpacing: '-0.045em', fontWeight: 700 }}>
            <AuroraTitle text="Vero" start="load" />
            <AuroraTitle text="Linkr" accent={['Linkr']} start="load" />
          </h1>

          <p className="cine-body mt-8 max-w-xs leading-relaxed" style={{ color: '#6b6a7b' }}>
            Get paid for proof, not promises. Connect your platforms, verify real reach, and earn on every genuine view.
          </p>

          <div className="vl-proof mt-10 mb-7 opacity-20" style={{ width: '100%' }} />

          <p className="cine-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: '#8a899a' }}>
            Instagram · YouTube · Facebook
          </p>
        </div>

        <p style={{ fontSize: '11px', color: '#8a899a' }}>
          © 2025 VeroLinkr — All rights reserved
        </p>
      </div>

      {/* ── Right form panel ─────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-5 py-16 lg:px-12 xl:px-20">
        <motion.div
          suppressHydrationWarning
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[420px]"
        >
          {/* Mobile wordmark */}
          <div className="lg:hidden text-center mb-10">
            <p className="cine-eyebrow mb-3" style={{ color: '#6b6a7b' }}>Verified Platform</p>
            <Link href="/">
              <span
                className="lp-chrome"
                style={{ fontSize: 'clamp(2.4rem, 10vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.95, display: 'inline-block' }}
              >
                VeroLinkr
              </span>
            </Link>
          </div>

          {/* Auth Card */}
          <div className="lp-card px-7 py-9 sm:px-9 sm:py-10">

            {/* ── Email link: completing ── */}
            {emailLinkState === 'completing' && (
              <div className="py-14 text-center">
                <div className="spinner mx-auto mb-5" />
                <p style={{ color: '#6b6a7b', fontSize: '0.875rem' }}>Completing sign-in…</p>
              </div>
            )}

            {/* ── Email link: need email ── */}
            {emailLinkState === 'need-email' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <p className="cine-eyebrow mb-3">Email confirmation needed</p>
                <h2
                  className="mb-2"
                  style={{ fontSize: '1.45rem', fontWeight: 700, letterSpacing: '-0.03em', color: '#08080c' }}
                >
                  Confirm your email
                </h2>
                <p className="mb-7" style={{ color: '#6b6a7b', fontSize: '0.85rem', lineHeight: 1.55 }}>
                  You opened this link on a different device. Enter the email you used to request the sign-in link.
                </p>
                <form onSubmit={handleCompleteEmailLinkSubmit} className="space-y-5">
                  {submitError && (
                    <p className="text-[13px] text-red-600 rounded-xl px-3 py-2 bg-red-50">{submitError}</p>
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
                  <button type="submit" className="cine-btn w-full">Complete sign-in</button>
                </form>
              </motion.div>
            )}

            {/* ── Email link: link sent ── */}
            {emailLinkState === 'link-sent' && linkSentToEmail && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-6"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ border: '1px solid rgba(11,11,18,0.14)' }}
                >
                  <EnvelopeIcon className="w-7 h-7" style={{ color: '#08080c' }} />
                </div>
                <p className="cine-eyebrow mb-3">Email sent</p>
                <h2
                  className="mb-3"
                  style={{ fontSize: '1.45rem', fontWeight: 700, letterSpacing: '-0.03em', color: '#08080c' }}
                >
                  Check your inbox
                </h2>
                <p className="mb-7" style={{ color: '#6b6a7b', fontSize: '0.85rem', lineHeight: 1.55 }}>
                  We sent a sign-in link to <strong style={{ color: '#08080c' }}>{linkSentToEmail}</strong>. Click it to sign in.
                </p>
                <button
                  suppressHydrationWarning
                  type="button"
                  onClick={() => { setEmailLinkState('none'); setLinkSentToEmail(null); }}
                  className="text-[13px] font-semibold underline underline-offset-2 hover:opacity-60 transition-opacity"
                  style={{ color: '#08080c' }}
                >
                  Use a different method
                </button>
              </motion.div>
            )}

            {/* ── Main auth form ── */}
            {emailLinkState === 'none' && !linkSentToEmail && (
              <>
                {/* Tab switcher */}
                <div
                  className="flex mb-7 p-1 rounded-xl"
                  style={{ background: 'rgba(11,11,18,0.05)' }}
                >
                  {(['login', 'signup'] as const).map((tab) => (
                    <button
                      key={tab}
                      suppressHydrationWarning
                      type="button"
                      onClick={() => handleTabChange(tab)}
                      className="flex-1 py-2.5 px-4 rounded-lg text-[13.5px] font-semibold transition-all duration-200"
                      style={{
                        background: activeTab === tab ? '#ffffff' : 'transparent',
                        color: activeTab === tab ? '#08080c' : '#6b6a7b',
                        boxShadow: activeTab === tab ? '0 1px 4px rgba(11,11,18,0.1)' : 'none',
                      }}
                    >
                      {tab === 'login' ? 'Sign in' : 'Create account'}
                    </button>
                  ))}
                </div>

                {/* Tab heading */}
                <div className="mb-7">
                  <p className="cine-eyebrow mb-2">
                    {activeTab === 'login' ? 'Welcome back' : 'Join the platform'}
                  </p>
                  <h2
                    style={{ fontSize: '1.45rem', fontWeight: 700, letterSpacing: '-0.03em', color: '#08080c', lineHeight: 1.15 }}
                  >
                    {activeTab === 'login' ? 'Sign in to VeroLinkr' : 'Start earning today'}
                  </h2>
                </div>

                {/* Google */}
                <div className="mb-5">
                  <button
                    type="button"
                    className="cine-btn-ghost w-full flex items-center justify-center gap-3"
                    onClick={handleGoogleSignIn}
                    disabled={isRedirecting}
                  >
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" aria-hidden>
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </button>
                </div>

                {/* Divider */}
                <div className="relative mb-5">
                  <div className="lp-hair" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="px-3 text-[11px] font-medium"
                      style={{ background: 'rgba(255,255,255,0.92)', color: '#8a899a' }}
                    >
                      or continue with email
                    </span>
                  </div>
                </div>

                {/* Forms */}
                <AnimatePresence mode="wait">
                  {activeTab === 'login' ? (
                    <motion.div
                      key="login"
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 14 }}
                      transition={{ duration: 0.22 }}
                    >
                      {!showEmailLinkForm ? (
                        <form onSubmit={handleSubmit} className="space-y-5">
                          {submitError && (
                            <p className="text-[13px] text-red-600 rounded-xl px-3 py-2 bg-red-50">{submitError}</p>
                          )}
                          <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="you@example.com"
                            error={errors.email}
                            required
                          />
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
                              className="absolute right-4 top-11 hover:opacity-60 transition-opacity"
                              style={{ color: '#6b6a7b' }}
                            >
                              {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                suppressHydrationWarning
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300"
                                style={{ accentColor: '#08080c' }}
                              />
                              <span className="text-[13px] font-medium" style={{ color: '#6b6a7b' }}>Remember me</span>
                            </label>
                            <Link
                              href="/forgot-password"
                              className="text-[13px] font-semibold hover:opacity-60 transition-opacity"
                              style={{ color: '#08080c' }}
                            >
                              Forgot password?
                            </Link>
                          </div>

                          <button type="submit" className="cine-btn w-full">
                            Sign in
                          </button>

                          <div className="text-center">
                            <button
                              suppressHydrationWarning
                              type="button"
                              onClick={() => setShowEmailLinkForm(true)}
                              className="text-[12px] font-medium underline underline-offset-2 hover:opacity-60 transition-opacity"
                              style={{ color: '#6b6a7b' }}
                            >
                              Sign in with email link instead
                            </button>
                          </div>
                        </form>
                      ) : (
                        <form onSubmit={handleSendEmailLink} className="space-y-5">
                          {submitError && (
                            <p className="text-[13px] text-red-600 rounded-xl px-3 py-2 bg-red-50">{submitError}</p>
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
                          <button type="submit" className="cine-btn-ghost w-full">
                            Send sign-in link
                          </button>
                          <div className="text-center">
                            <button
                              suppressHydrationWarning
                              type="button"
                              onClick={() => setShowEmailLinkForm(false)}
                              className="text-[12px] font-medium underline underline-offset-2 hover:opacity-60 transition-opacity"
                              style={{ color: '#6b6a7b' }}
                            >
                              ← Back to password
                            </button>
                          </div>
                        </form>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="signup"
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -14 }}
                      transition={{ duration: 0.22 }}
                    >
                      <form onSubmit={handleSubmit} className="space-y-5">
                        {submitError && (
                          <p className="text-[13px] text-red-600 rounded-xl px-3 py-2 bg-red-50">{submitError}</p>
                        )}
                        <Input
                          label="Email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="you@example.com"
                          error={errors.email}
                          required
                        />
                        <div className="relative">
                          <Input
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Create a strong password"
                            error={errors.password}
                            hint="At least 8 characters"
                            required
                          />
                          <button
                            suppressHydrationWarning
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-11 hover:opacity-60 transition-opacity"
                            style={{ color: '#6b6a7b' }}
                          >
                            {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                          </button>
                        </div>
                        <div className="relative">
                          <Input
                            label="Confirm password"
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
                            className="absolute right-4 top-11 hover:opacity-60 transition-opacity"
                            style={{ color: '#6b6a7b' }}
                          >
                            {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                          </button>
                        </div>

                        <div className="flex items-start gap-3">
                          <input
                            suppressHydrationWarning
                            type="checkbox"
                            id="terms"
                            className="mt-0.5 h-4 w-4 rounded border-gray-300 flex-shrink-0"
                            style={{ accentColor: '#08080c' }}
                            required
                          />
                          <label htmlFor="terms" className="text-[13px] leading-relaxed" style={{ color: '#6b6a7b' }}>
                            I agree to the{' '}
                            <Link href="/terms" className="font-semibold hover:opacity-60 transition-opacity" style={{ color: '#08080c' }}>
                              Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link href="/privacy" className="font-semibold hover:opacity-60 transition-opacity" style={{ color: '#08080c' }}>
                              Privacy Policy
                            </Link>
                          </label>
                        </div>

                        <button type="submit" className="cine-btn w-full">
                          Create account
                        </button>

                        <div className="text-center">
                          <p className="text-[13px]" style={{ color: '#6b6a7b' }}>
                            Already have an account?{' '}
                            <button
                              suppressHydrationWarning
                              onClick={() => setActiveTab('login')}
                              className="font-semibold underline underline-offset-2 hover:opacity-60 transition-opacity"
                              style={{ color: '#08080c' }}
                            >
                              Sign in
                            </button>
                          </p>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-5">
            <Link
              href="/contact"
              className="text-[12px] hover:opacity-60 transition-opacity"
              style={{ color: '#8a899a' }}
            >
              Need help? Contact support
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.94 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-full shadow-2xl"
            style={{ background: toast.type === 'error' ? '#ef4444' : '#08080c', color: '#fff' }}
          >
            {toast.type === 'success' && (
              <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            <span className="text-[13px] font-medium whitespace-nowrap">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="cine-wrap min-h-screen flex items-center justify-center">
          <div className="spinner" />
        </div>
      }
    >
      <AuthContent />
    </Suspense>
  );
}
