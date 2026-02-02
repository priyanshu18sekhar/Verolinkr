'use client';

import { ReactNode } from 'react';
import { useOnboardingGuard } from '@/hooks/useOnboardingGuard';

export default function CreatorOnboardingLayout({ children }: { children: ReactNode }) {
  // Redirect users who have already completed onboarding to their dashboard
  const { loading, onboardingCompleted, userType } = useOnboardingGuard({
    preventOnboarding: true, // Redirect away if onboarding is complete
  });

  // Show loading state while checking
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  // If onboarding is completed and userType is set, the guard will redirect
  // We still render children in case the redirect hasn't happened yet
  if (onboardingCompleted && userType) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Redirecting to dashboard...</div>
      </div>
    );
  }

  return <>{children}</>;
}
