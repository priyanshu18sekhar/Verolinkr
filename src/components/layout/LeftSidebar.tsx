'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useLayout } from '@/contexts/LayoutContext';
import NavItem from './NavItem';
import { NavItem as NavItemType } from '@/config/navigation';

interface LeftSidebarProps {
  navItems: NavItemType[];
  user?: {
    displayName?: string;
    email?: string;
    photoURL?: string;
  };
}

export default function LeftSidebar({ navItems, user }: LeftSidebarProps) {
  const { leftSidebarOpen, toggleLeftSidebar, isMobile, setLeftSidebarOpen } = useLayout();

  // On mobile, show as drawer overlay
  if (isMobile) {
    return (
      <AnimatePresence>
        {leftSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLeftSidebarOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 z-50 overflow-hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h2 className="text-xl font-black text-black">Menu</h2>
                  <button
                    onClick={() => setLeftSidebarOpen(false)}
                    className="p-2 text-gray-500 hover:text-black transition-colors"
                  >
                    <ChevronLeftIcon className="w-6 h-6" />
                  </button>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                  {navItems.map((item) => (
                    <NavItem
                      key={item.id}
                      id={item.id}
                      label={item.label}
                      icon={item.icon}
                      path={item.path}
                      badge={item.badge}
                      isCollapsed={false}
                    />
                  ))}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Desktop/Tablet: Show as collapsible sidebar
  return (
    <motion.aside
      animate={{ width: leftSidebarOpen ? 280 : 80 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative bg-gray-50 border-r border-gray-200 overflow-hidden flex-shrink-0"
    >
      <div className="h-full flex flex-col">
        {/* Toggle Button */}
        <div className="flex items-center justify-end p-4 border-b border-gray-200">
          <button
            onClick={toggleLeftSidebar}
            className="p-2 text-gray-500 hover:text-black rounded-lg hover:bg-gray-100 transition-colors"
          >
            {leftSidebarOpen ? (
              <ChevronLeftIcon className="w-5 h-5" />
            ) : (
              <ChevronRightIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              id={item.id}
              label={item.label}
              icon={item.icon}
              path={item.path}
              badge={item.badge}
              isCollapsed={!leftSidebarOpen}
            />
          ))}
        </nav>

        {/* User Profile Section */}
        {user && (
           <div className={`p-4 border-t border-gray-200 ${!leftSidebarOpen ? 'flex justify-center' : ''}`}>
             <a 
               href="/creator-dashboard/settings" 
               className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors ${!leftSidebarOpen ? 'justify-center' : ''}`}
             >
               <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                 {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName} className="w-full h-full rounded-full object-cover" />
                 ) : (
                    (user.displayName?.[0] || user.email?.[0] || 'U').toUpperCase()
                 )}
               </div>
               
               {leftSidebarOpen && (
                 <div className="flex-1 min-w-0">
                   <p className="text-sm font-bold text-gray-900 truncate">{user.displayName || 'User'}</p>
                   <p className="text-xs text-gray-500 truncate">{user.email}</p>
                 </div>
               )}
             </a>
           </div>
        )}
      </div>
    </motion.aside>
  );
}

