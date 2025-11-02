'use client';

import { createContext, useContext, ReactNode } from 'react';

type UserType = 'brand' | 'creator';

interface UserContextType {
  userType: UserType;
  isAuthenticated: boolean;
  userName?: string;
  userEmail?: string;
  userId?: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
  userType: UserType;
  userName?: string;
  userEmail?: string;
  userId?: string;
}

export function UserProvider({ 
  children, 
  userType, 
  userName, 
  userEmail, 
  userId 
}: UserProviderProps) {
  return (
    <UserContext.Provider
      value={{
        userType,
        isAuthenticated: true,
        userName,
        userEmail,
        userId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

