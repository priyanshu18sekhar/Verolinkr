'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { ToastItem } from '@/components/notifications/ToastContainer';

interface NotificationContextType {
  showToast: (message: string, variant?: 'success' | 'error' | 'warning' | 'info', duration?: number, action?: { label: string; onClick: () => void }) => void;
  toasts: ToastItem[];
  removeToast: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((
    message: string,
    variant: 'success' | 'error' | 'warning' | 'info' = 'info',
    duration = 5000,
    action?: { label: string; onClick: () => void }
  ) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, variant, duration, action }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        showToast,
        toasts,
        removeToast,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}





