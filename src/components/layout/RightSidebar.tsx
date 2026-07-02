'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useLayout } from '@/contexts/LayoutContext';
import ThemeSelector from '@/components/settings/ThemeSelector';
import CurrencySelector from '@/components/settings/CurrencySelector';
import NotificationSettings from '@/components/settings/NotificationSettings';
import AccountPanel from '@/components/settings/AccountPanel';

export default function RightSidebar() {
  const { rightSidebarOpen, setRightSidebarOpen } = useLayout();

  return (
    <AnimatePresence>
      {rightSidebarOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setRightSidebarOpen(false)}
            className="fixed inset-0 bg-[rgba(8,8,12,0.25)] backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: 360 }}
            animate={{ x: 0 }}
            exit={{ x: 360 }}
            transition={{ type: 'tween', duration: 0.28, ease: [0.22, 0.9, 0.3, 1] }}
            className="fixed right-0 top-0 z-50 h-full w-[22rem] overflow-hidden border-l border-[rgba(11,11,18,0.1)] bg-white/90 backdrop-blur-xl"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-[rgba(11,11,18,0.08)] px-6 py-5">
                <div>
                  <p className="dash-receipt mb-1">Quick settings</p>
                  <h2 className="dash-num text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                    Preferences
                  </h2>
                </div>
                <button
                  onClick={() => setRightSidebarOpen(false)}
                  className="dash-icon-btn"
                  aria-label="Close settings"
                >
                  <XMarkIcon className="h-[1.1rem] w-[1.1rem]" />
                </button>
              </div>

              <div className="flex-1 space-y-8 overflow-y-auto px-6 py-6">
                <ThemeSelector />
                <CurrencySelector />
                <NotificationSettings />
              </div>

              <div className="border-t border-[rgba(11,11,18,0.08)] px-6 py-4">
                <AccountPanel />
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
