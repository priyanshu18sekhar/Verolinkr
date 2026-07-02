'use client';

import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react';
import { signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { apiGet } from '@/lib/api/client';

export type UserType = 'brand' | 'creator';

export interface UserContextType {
  userType: UserType | null;
  isAuthenticated: boolean;
  userName?: string;
  userEmail?: string;
  userId?: string;
  loading: boolean;
  onboardingCompleted: boolean;
  bankDetailsCompleted: boolean;
  platformsLinked: number;
  profile: any | null;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
  userType: UserType;
  userName?: string;
  userEmail?: string;
  userId?: string;
}

/** Legacy: use when you need to inject user props (e.g. in a route that has already resolved user). */
export function UserProvider({
  children,
  userType,
  userName,
  userEmail,
  userId,
}: UserProviderProps) {
  const [profile, setProfile] = useState<any>(null);
  
  const fetchProfile = useCallback(async () => {
    if (!userType) return;
    const endpoint = userType === 'creator' ? '/api/creators/me' : '/api/brands/me';
    // one retry: the first call can race token propagation right after login
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const data = await apiGet<{ creator?: any; brand?: any }>(endpoint);
        setProfile(data.creator || data.brand);
        return;
      } catch (error: any) {
        // a missing profile just means onboarding is pending
        if (error.message === 'Brand profile not found' || error.message === 'Creator profile not found') {
          setProfile(null);
          return;
        }
        if (attempt === 1) {
          console.warn('Could not fetch user profile:', error?.message ?? error);
        } else {
          await new Promise((r) => setTimeout(r, 800));
        }
      }
    }
  }, [userType]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <UserContext.Provider
      value={{
        userType,
        isAuthenticated: true,
        userName,
        userEmail,
        userId,
        loading: false,
        onboardingCompleted: true, // Assume completed in legacy provider
        bankDetailsCompleted: true,
        platformsLinked: 0,
        profile,
        refreshProfile: fetchProfile,
        signOut: async () => {
          await firebaseSignOut(auth);
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider or AuthProvider');
  }
  return context;
}

export { UserContext };
