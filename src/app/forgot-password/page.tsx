'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { Input } from '@/components/design-system';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setIsSubmitted(true);
  };

  return (
    <div className="cine-wrap min-h-screen flex items-center justify-center px-5 py-16">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[420px]"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <p className="cine-eyebrow mb-3" style={{ color: '#6b6a7b' }}>Verified Platform</p>
          <Link href="/">
            <span
              className="lp-chrome"
              style={{
                fontSize: 'clamp(2.2rem, 8vw, 3rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                display: 'inline-block',
              }}
            >
              VeroLinkr
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="lp-card px-7 py-9 sm:px-9 sm:py-10">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <p className="cine-eyebrow mb-3">Account recovery</p>
                <h1
                  className="mb-2"
                  style={{
                    fontSize: '1.45rem',
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    color: '#08080c',
                    lineHeight: 1.15,
                  }}
                >
                  Reset your password
                </h1>
                <p className="mb-8" style={{ color: '#6b6a7b', fontSize: '0.85rem', lineHeight: 1.55 }}>
                  Enter your email address and we'll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <p className="text-[13px] text-red-600 rounded-xl px-3 py-2 bg-red-50">{error}</p>
                  )}
                  <Input
                    label="Email address"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    icon={<EnvelopeIcon className="h-5 w-5" style={{ color: '#8a899a' }} />}
                    placeholder="you@example.com"
                    required
                  />
                  <button type="submit" className="cine-btn w-full">
                    Send reset link
                  </button>
                </form>

                <div className="mt-7 text-center">
                  <Link
                    href="/auth"
                    className="text-[13px] font-semibold hover:opacity-60 transition-opacity"
                    style={{ color: '#08080c' }}
                  >
                    ← Back to sign in
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-4"
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
                  style={{
                    fontSize: '1.45rem',
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    color: '#08080c',
                    lineHeight: 1.15,
                  }}
                >
                  Check your inbox
                </h2>
                <p className="mb-7" style={{ color: '#6b6a7b', fontSize: '0.85rem', lineHeight: 1.55 }}>
                  We've sent a password reset link to{' '}
                  <strong style={{ color: '#08080c' }}>{email}</strong>. Check your inbox and follow the instructions.
                </p>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-[13px] font-semibold underline underline-offset-2 hover:opacity-60 transition-opacity"
                  style={{ color: '#08080c' }}
                >
                  Try a different email
                </button>

                <div className="mt-7 pt-6" style={{ borderTop: '1px solid rgba(11,11,18,0.08)' }}>
                  <Link
                    href="/auth"
                    className="text-[13px] font-semibold hover:opacity-60 transition-opacity"
                    style={{ color: '#6b6a7b' }}
                  >
                    ← Back to sign in
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
  );
}
