'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';

/**
 * Redirects users based on their onboarding completion status.
 * 
 * Use in:
 * - Dashboard layouts: to redirect users who haven't completed onboarding
 * - Onboarding pages: to redirect users who have already completed onboarding
 */
export function useOnboardingGuard(options: {
    /** If true, redirect users who have NOT completed onboarding to the onboarding flow */
    requireOnboarding?: boolean;
    /** If true, redirect users who HAVE completed onboarding away from onboarding pages */
    preventOnboarding?: boolean;
    /** Dashboard path to redirect to after onboarding */
    dashboardPath?: string;
    /** Onboarding path to redirect to if not completed */
    onboardingPath?: string;
} = {}) {
    const {
        requireOnboarding = false,
        preventOnboarding = false,
        dashboardPath = '/creator-dashboard',
        onboardingPath = '/onboarding/role-selection',
    } = options;

    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, loading, userType, onboardingCompleted } = useUser();

    useEffect(() => {
        if (loading) return;
        if (!isAuthenticated) return; // Let useRequireAuth handle this

        // Redirect away from onboarding if already completed
        if (preventOnboarding && onboardingCompleted && userType) {
            const targetDashboard = userType === 'creator' ? '/creator-dashboard' : '/brand-dashboard';
            router.replace(targetDashboard);
            return;
        }

        // Redirect to onboarding if not completed
        if (requireOnboarding && !onboardingCompleted && userType) {
            router.replace(onboardingPath);
            return;
        }
    }, [
        loading,
        isAuthenticated,
        userType,
        onboardingCompleted,
        requireOnboarding,
        preventOnboarding,
        dashboardPath,
        onboardingPath,
        router,
        pathname,
    ]);

    return {
        isAuthenticated,
        loading,
        userType,
        onboardingCompleted,
        shouldShowContent: !loading && isAuthenticated && (
            (preventOnboarding && !onboardingCompleted) ||
            (requireOnboarding && onboardingCompleted) ||
            (!preventOnboarding && !requireOnboarding)
        )
    };
}
