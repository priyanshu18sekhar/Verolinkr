'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';

/**
 * Redirects to /auth when the user is not authenticated (after loading).
 * Use in dashboard layouts or any protected route.
 */
export function useRequireAuth(redirectTo = '/auth', requireProfile = false) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, loading, userType } = useUser();

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      router.replace(`${redirectTo}?redirect=${encodeURIComponent(pathname ?? '/')}`);
    } else if (requireProfile && !userType) {
      router.replace('/onboarding/role-selection');
    }
  }, [loading, isAuthenticated, userType, redirectTo, requireProfile, router, pathname]);

  return { isAuthenticated, loading };
}
