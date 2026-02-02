'use client';

import { createContext, useContext, ReactNode } from 'react';

export type UserType = 'brand' | 'creator';

export interface UserContextType {
  userType: UserType | null;
  isAuthenticated: boolean;
  userName?: string;
  userEmail?: string;
  userId?: string;
  loading: boolean;
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
  return (
    <UserContext.Provider
      value={{
        userType,
        isAuthenticated: true,
        userName,
        userEmail,
        userId,
        loading: false,
        signOut: async () => {},
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
