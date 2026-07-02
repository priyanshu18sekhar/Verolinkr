'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RoleSelectionPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<'creator' | 'brand' | null>(null);

  const handleRoleSelect = (role: 'creator' | 'brand') => {
    setSelectedRole(role);

    const authData = localStorage.getItem('authData');
    if (authData) {
      const data = JSON.parse(authData);
      data.userType = role;
      localStorage.setItem('authData', JSON.stringify(data));
    }

    setTimeout(() => {
      router.push(role === 'creator' ? '/onboarding/creator/step1' : '/onboarding/brand/step1');
    }, 320);
  };

  const cards = [
    {
      role: 'creator' as const,
      eyebrow: 'Content creators',
      title: "I'm a Creator",
      description:
        'Find brand partnerships, monetize your content, and get paid for every genuine view — no fake metrics.',
      features: ['Connect with verified brands', 'Secure escrow payments', 'Real-time analytics'],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
    },
    {
      role: 'brand' as const,
      eyebrow: 'Advertisers & brands',
      title: "I'm a Brand",
      description:
        'Connect with authentic creators, launch campaigns, and measure real performance — not vanity numbers.',
      features: ['Find verified creators', 'Launch targeted campaigns', 'Track ROI and performance'],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
      ),
    },
  ];

  return (
    <div className="cine-wrap min-h-screen flex items-center justify-center px-5 py-16">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-3xl"
      >
        {/* Header */}
        <div className="text-center mb-14">
          <p className="cine-eyebrow mb-4" style={{ color: '#6b6a7b' }}>
            Account setup · Step 0 of 1
          </p>
          <h1
            style={{
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: '#08080c',
            }}
          >
            Choose your path
          </h1>
          <p className="mt-4 max-w-md mx-auto" style={{ color: '#6b6a7b', fontSize: '0.9rem', lineHeight: 1.55 }}>
            Select how you'd like to use VeroLinkr. You can always update this later.
          </p>
        </div>

        {/* Role cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {cards.map((card, i) => {
            const isSelected = selectedRole === card.role;
            return (
              <motion.button
                key={card.role}
                onClick={() => handleRoleSelect(card.role)}
                className="text-left p-8 rounded-[22px] transition-all duration-300 relative overflow-hidden"
                style={{
                  background: isSelected
                    ? 'rgba(255,255,255,0.85)'
                    : 'rgba(255,255,255,0.55)',
                  border: `1px solid ${isSelected ? '#08080c' : 'rgba(11,11,18,0.1)'}`,
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  boxShadow: isSelected
                    ? '0 20px 48px -20px rgba(11,11,18,0.28), 0 0 0 1px rgba(11,11,18,0.06)'
                    : '0 1px 0 rgba(11,11,18,0.04), 0 8px 24px -12px rgba(11,11,18,0.1)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.99 }}
              >
                {/* Selection indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-5 right-5 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: '#08080c' }}
                  >
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </motion.div>
                )}

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: 'rgba(11,11,18,0.06)', color: '#08080c' }}
                >
                  {card.icon}
                </div>

                {/* Text */}
                <p className="cine-eyebrow mb-2">{card.eyebrow}</p>
                <h2
                  className="mb-3"
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    letterSpacing: '-0.025em',
                    color: '#08080c',
                    lineHeight: 1.2,
                  }}
                >
                  {card.title}
                </h2>
                <p className="mb-6" style={{ color: '#6b6a7b', fontSize: '0.85rem', lineHeight: 1.55 }}>
                  {card.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {card.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(11,11,18,0.08)' }}
                      >
                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} style={{ color: '#08080c' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <span style={{ fontSize: '0.82rem', color: '#46455a', fontWeight: 500 }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.button>
            );
          })}
        </div>

        {/* Back link */}
        <div className="text-center">
          <Link
            href="/auth"
            className="text-[13px] font-semibold hover:opacity-60 transition-opacity"
            style={{ color: '#6b6a7b' }}
          >
            ← Back to sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
