'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';

// Routes that render their own chrome (or want a focused, distraction-free view).
const HIDDEN_PREFIXES = [
  '/brand-dashboard',
  '/creator-dashboard',
  '/admin',
  '/auth',
  '/onboarding',
  '/creator-registration',
  '/brand-registration',
  '/forgot-password',
];

export default function ConditionalNavigation() {
  const pathname = usePathname();
  const hide = HIDDEN_PREFIXES.some((p) => pathname?.startsWith(p));
  if (hide) return null;
  return <Navigation />;
}
