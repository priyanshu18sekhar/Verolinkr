'use client';

import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { ReactElement } from 'react';

interface NavItemProps {
  id: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  path: string;
  badge?: number;
  isCollapsed?: boolean;
}

export default function NavItem({ id, label, icon: Icon, path, badge, isCollapsed = false }: NavItemProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = pathname === path || pathname?.startsWith(`${path}/`);

  const handleClick = () => {
    router.push(path);
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        isActive
          ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-black font-bold'
          : 'text-gray-600 hover:bg-gray-100 hover:text-black'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="activeNavItem"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}

      {/* Icon */}
      <div className="relative">
        <Icon className={`w-6 h-6 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-900'}`} />
      </div>

      {/* Label - hidden when collapsed */}
      {!isCollapsed && (
        <motion.span
          className="flex-1 text-left text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.span>
      )}

      {/* Badge */}
      {badge !== undefined && badge > 0 && (
        <motion.span
          className="min-w-[24px] h-6 px-2 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          {badge}
        </motion.span>
      )}

      {/* Tooltip for collapsed mode */}
      {isCollapsed && (
        <div className="absolute left-full ml-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50">
          <div className="bg-black text-white text-sm font-medium px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
            {label}
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-r-4 border-l-0 border-t-4 border-b-4 border-transparent border-r-black" />
          </div>
        </div>
      )}
    </motion.button>
  );
}

