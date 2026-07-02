'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { LayoutProvider, useLayout } from '@/contexts/LayoutContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { UserProvider, useUser } from '@/contexts/UserContext';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import { ModalProvider } from '@/contexts/ModalContext';
import { PaymentProvider } from '@/contexts/PaymentContext';
import { NotificationProvider, useNotification } from '@/contexts/NotificationContext';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import ToastContainer from '@/components/notifications/ToastContainer';
import RightSidebar from './RightSidebar';
import FloatingNav from '@/components/ui/FloatingNav';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

interface DashboardLayoutProps {
  children: ReactNode;
  userType: 'brand' | 'creator';
  userName?: string;
  userEmail?: string;
  userId?: string;
}

/** Floating identity chip — wordmark + role, links home. */
function IdentityChip() {
  const { userType, profile } = useUser();
  const name = profile?.displayName || profile?.companyName || profile?.fullName;

  return (
    <Link
      href={userType === 'brand' ? '/brand-dashboard' : '/creator-dashboard'}
      className="glass-nav fixed top-4 left-4 lg:top-5 lg:left-6 z-30 flex items-center gap-3 rounded-full pl-4 pr-5 h-11"
      aria-label="Dashboard home"
    >
      <span
        className="cine-mono text-[0.72rem] font-semibold tracking-[0.06em] text-[#08080c]"
        aria-hidden
      >
        Vero·Linkr
      </span>
      <span className="w-px h-4 bg-[rgba(11,11,18,0.14)]" aria-hidden />
      <span className="dash-receipt !text-[0.58rem] text-[#6b6a7b] max-w-[9rem] truncate">
        {name || userType}
      </span>
    </Link>
  );
}

function DashboardLayoutContent({ children }: { children: ReactNode }) {
  const { setRightSidebarOpen } = useLayout();
  const { toasts, removeToast } = useNotification();
  const { userType } = useUser();

  return (
    <div className="min-h-screen">
      {/* Soften the aurora behind dashboard content — the ledger needs a
          calmer surface than the landing hero. */}
      <div
        className="pointer-events-none fixed inset-0 z-[-1]"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.6) 34%, rgba(255,255,255,0.35) 100%)',
        }}
        aria-hidden
      />
      <IdentityChip />

      {/* Quick settings drawer trigger */}
      <button
        onClick={() => setRightSidebarOpen(true)}
        className="glass-nav fixed top-4 right-4 lg:top-5 lg:right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full text-[#08080c] transition-transform hover:-translate-y-0.5"
        aria-label="Open quick settings"
      >
        <Cog6ToothIcon className="h-5 w-5" />
      </button>

      {/* Main Content */}
      <main className="w-full">{children}</main>

      {/* Persistent bottom navigation — rendered here (not per-page) so it stays
          static and visible through every page's loading state. */}
      {userType && <FloatingNav userType={userType} />}

      <RightSidebar />

      <ToastContainer toasts={toasts} onRemove={removeToast} position="top-right" />
    </div>
  );
}

export default function DashboardLayout({ children, userType, userName, userEmail, userId }: DashboardLayoutProps) {
  const { isAuthenticated, loading } = useRequireAuth('/auth', true);

  if (loading || !isAuthenticated) {
    return (
      <div className="cine-wrap min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="spinner" />
        <p className="cine-eyebrow" style={{ color: '#8a899a' }}>Loading</p>
      </div>
    );
  }

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
