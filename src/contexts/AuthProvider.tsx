'use client';

import { useEffect, useState, useCallback, ReactNode } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { apiFetch } from '@/lib/api/client';
import { UserContext, UserType } from './UserContext';

interface SessionData {
  uid: string;
  email: string | null;
  userType: UserType | null;
  displayName: string | null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
  const [userName, setUserName] = useState<string | undefined>(undefined);

  const signOut = useCallback(async () => {
    await firebaseSignOut(auth);
    setUserType(null);
    setUserId(undefined);
    setUserEmail(undefined);
    setUserName(undefined);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUserType(null);
        setUserId(undefined);
        setUserEmail(undefined);
        setUserName(undefined);
        setLoading(false);
        return;
      }
      setUserId(user.uid);
      setUserEmail(user.email ?? undefined);
      setUserName(user.displayName ?? undefined);
      try {
        const res = await apiFetch('/api/auth/session', { authenticated: true });
        if (res.ok) {
          const data = (await res.json()) as SessionData;
          setUserType(data.userType ?? null);
          if (data.displayName) setUserName(data.displayName);
        } else {
          setUserType(null);
        }
      } catch {
        setUserType(null);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userType,
        isAuthenticated: !!userId,
        userName,
        userEmail,
        userId,
        loading,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
