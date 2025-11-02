'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
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
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            exit={{ x: 320 }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-80 bg-white border-l border-gray-200 z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Cog6ToothIcon className="w-6 h-6 text-gray-600" />
                  <h2 className="text-xl font-black text-black">Settings</h2>
                </div>
                <button
                  onClick={() => setRightSidebarOpen(false)}
                  className="p-2 text-gray-500 hover:text-black transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-8">
                <ThemeSelector />
                <CurrencySelector />
                <NotificationSettings />
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 p-4">
                <AccountPanel />
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

