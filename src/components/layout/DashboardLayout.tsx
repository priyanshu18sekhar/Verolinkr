'use client';

import { ReactNode } from 'react';
import { LayoutProvider, useLayout } from '@/contexts/LayoutContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { UserProvider, useUser } from '@/contexts/UserContext';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import { ModalProvider } from '@/contexts/ModalContext';
import { PaymentProvider } from '@/contexts/PaymentContext';
import { NotificationProvider, useNotification } from '@/contexts/NotificationContext';
import ToastContainer from '@/components/notifications/ToastContainer';
import RightSidebar from './RightSidebar';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

interface DashboardLayoutProps {
  children: ReactNode;
  userType: 'brand' | 'creator';
  userName?: string;
  userEmail?: string;
  userId?: string;
}

function DashboardLayoutContent({ children }: { children: ReactNode }) {
  const { rightSidebarOpen, setRightSidebarOpen } = useLayout();
  const { toasts, removeToast } = useNotification();

  return (
    <div className="min-h-screen bg-white">
      {/* Settings Button */}
      <button
        onClick={() => setRightSidebarOpen(true)}
        className="fixed top-4 right-4 w-12 h-12 bg-black text-white rounded-full shadow-xl flex items-center justify-center z-30 hover:bg-gray-800 transition-colors backdrop-blur-sm border-2 border-white/20"
        aria-label="Open settings"
      >
        <Cog6ToothIcon className="w-6 h-6" />
      </button>

      {/* Main Content */}
      <main className="w-full">{children}</main>

      {/* Right Sidebar */}
      <RightSidebar />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} position="top-right" />
    </div>
  );
}

export default function DashboardLayout({ children, userType, userName, userEmail, userId }: DashboardLayoutProps) {
  return (
    <LayoutProvider>
      <ThemeProvider>
        <UserProvider userType={userType} userName={userName} userEmail={userEmail} userId={userId}>
          <CurrencyProvider>
            <ModalProvider>
              <PaymentProvider>
                <NotificationProvider>
                  <DashboardLayoutContent>{children}</DashboardLayoutContent>
                </NotificationProvider>
              </PaymentProvider>
            </ModalProvider>
          </CurrencyProvider>
        </UserProvider>
      </ThemeProvider>
    </LayoutProvider>
  );
}

