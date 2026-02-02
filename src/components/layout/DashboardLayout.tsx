'use client';

import { ReactNode, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { Cog6ToothIcon, PlusIcon, UserGroupIcon, BuildingOfficeIcon, ArrowRightOnRectangleIcon, CogIcon, HomeIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

interface DashboardLayoutProps {
  children: ReactNode;
  userType: 'brand' | 'creator';
  userName?: string;
  userEmail?: string;
  userId?: string;
}

function WorkspaceMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>('1');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const workspaces = [
    { id: '1', name: 'Main Workspace', type: 'brand', icon: BuildingOfficeIcon },
    { id: '2', name: 'Personal', type: 'brand', icon: HomeIcon },
    { id: '3', name: 'Team Alpha', type: 'brand', icon: UserGroupIcon },
    { id: '4', name: 'Business', type: 'brand', icon: BriefcaseIcon },
  ];

  const activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId) || workspaces[0];

  const menuItems = [
    { label: 'Workspace Settings', icon: CogIcon },
    { label: 'Create Workspace', icon: PlusIcon },
    { label: 'Switch Account', icon: ArrowRightOnRectangleIcon },
  ];

  const ActiveIcon = activeWorkspace.icon;

  const handleWorkspaceSwitch = (workspaceId: string) => {
    setActiveWorkspaceId(workspaceId);
    setIsOpen(false);
    // Here you could add logic to reload data or notify other components
    // For now, just updating the UI state
  };

  return (
    <div ref={menuRef} className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 w-12 h-12 bg-white border border-gray-200 rounded-lg shadow-lg hover:border-black hover:shadow-xl transition-all duration-200 z-30 flex items-center justify-center group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label={`Workspace: ${activeWorkspace.name}`}
      >
        <ActiveIcon className="w-6 h-6 text-black group-hover:text-gray-700 transition-colors" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/10 backdrop-blur-sm z-20"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 left-4 w-72 bg-white border border-gray-200 rounded-lg shadow-2xl z-30 overflow-hidden"
            >
              {/* Workspaces List */}
              <div className="p-2 border-b border-gray-200">
                <p className="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Workspaces</p>
                <div className="space-y-1">
                  {workspaces.map((workspace) => {
                    const Icon = workspace.icon;
                    const isActive = workspace.id === activeWorkspaceId;
                    return (
                      <motion.button
                        key={workspace.id}
                        onClick={() => handleWorkspaceSwitch(workspace.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                          isActive
                            ? 'bg-black text-white'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                        whileHover={{ x: 2 }}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                        <div className="flex-1">
                          <p className={`text-[13px] font-semibold ${isActive ? 'text-white' : 'text-black'}`}>
                            {workspace.name}
                          </p>
                          {isActive && (
                            <p className="text-[10px] text-gray-300">Current workspace</p>
                          )}
                        </div>
                        {isActive && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
                <motion.button
                  className="w-full mt-2 flex items-center space-x-2 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                  whileHover={{ x: 2 }}
                >
                  <PlusIcon className="w-4 h-4" />
                  <span className="text-[13px] font-semibold">Create New Workspace</span>
                </motion.button>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={index}
                      className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      whileHover={{ x: 2 }}
                    >
                      <Icon className="w-4 h-4 text-gray-600" />
                      <span className="text-[13px] font-semibold">{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function DashboardLayoutContent({ children }: { children: ReactNode }) {
  const { rightSidebarOpen, setRightSidebarOpen } = useLayout();
  const { toasts, removeToast } = useNotification();

  return (
    <div className="min-h-screen bg-white">
      {/* Workspace Management Button - Top Left */}
      <WorkspaceMenu />

      {/* Settings Button - Top Right */}
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
  const { isAuthenticated, loading } = useRequireAuth('/auth', true);

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse text-gray-500">Loading...</div>
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

