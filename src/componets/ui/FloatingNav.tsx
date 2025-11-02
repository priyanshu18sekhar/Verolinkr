'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { 
  HomeIcon,
  UserIcon,
  ChartBarIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  GiftIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  CogIcon,
  BellIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  IdentificationIcon
} from '@heroicons/react/24/outline';
import { 
  HomeIcon as HomeIconSolid,
  UserIcon as UserIconSolid,
  ChartBarIcon as ChartBarIconSolid,
  BriefcaseIcon as BriefcaseIconSolid,
  ChatBubbleLeftRightIcon as ChatBubbleLeftRightIconSolid,
  GiftIcon as GiftIconSolid,
  ArrowTrendingUpIcon as ArrowTrendingUpIconSolid,
  BanknotesIcon as BanknotesIconSolid,
  CogIcon as CogIconSolid,
  BellIcon as BellIconSolid,
  ShieldCheckIcon as ShieldCheckIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
  IdentificationIcon as IdentificationIconSolid
} from '@heroicons/react/24/solid';

interface FloatingNavProps {
  userType: 'brand' | 'creator';
}

const FloatingNav: React.FC<FloatingNavProps> = ({ userType }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show at the top
      if (currentScrollY < 10) {
        setIsVisible(true);
      } 
      // Hide when scrolling down (after 100px), show when scrolling up
      else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } 
      // Show when scrolling up
      else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const brandNavItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/brand-dashboard',
      icon: HomeIcon,
      activeIcon: HomeIconSolid,
      tooltip: 'Overview & Stats'
    },
    {
      id: 'campaigns',
      label: 'Campaigns',
      path: '/brand-dashboard/campaigns',
      icon: BriefcaseIcon,
      activeIcon: BriefcaseIconSolid,
      tooltip: 'Manage Campaigns'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      path: '/brand-dashboard/analytics',
      icon: ChartBarIcon,
      activeIcon: ChartBarIconSolid,
      tooltip: 'Performance Analytics'
    },
    {
      id: 'creators',
      label: 'Creators',
      path: '/brand-dashboard/creators',
      icon: UserIcon,
      activeIcon: UserIconSolid,
      tooltip: 'Discover Creators'
    },
    {
      id: 'profile',
      label: 'Profile',
      path: '/brand-dashboard/profile',
      icon: IdentificationIcon,
      activeIcon: IdentificationIconSolid,
      tooltip: 'Brand Profile'
    }
  ];

  const creatorNavItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/creator-dashboard',
      icon: HomeIcon,
      activeIcon: HomeIconSolid,
      tooltip: 'Overview & Earnings'
    },
    {
      id: 'campaigns',
      label: 'Campaigns',
      path: '/creator-dashboard/campaigns',
      icon: BriefcaseIcon,
      activeIcon: BriefcaseIconSolid,
      tooltip: 'Available Campaigns'
    },
    {
      id: 'gigs',
      label: 'Gigs',
      path: '/creator-dashboard/gigs',
      icon: GiftIcon,
      activeIcon: GiftIconSolid,
      tooltip: 'Gigs Marketplace'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      path: '/creator-dashboard/analytics',
      icon: ChartBarIcon,
      activeIcon: ChartBarIconSolid,
      tooltip: 'Performance Stats'
    },
    {
      id: 'profile',
      label: 'Profile',
      path: '/creator-dashboard/profile',
      icon: UserIcon,
      activeIcon: UserIconSolid,
      tooltip: 'Edit Profile'
    }
  ];

  const navItems = userType === 'brand' ? brandNavItems : creatorNavItems;

  const handleNavClick = (path: string) => {
    router.push(path);
  };

  const isActive = (path: string) => {
    if (path === '/brand-dashboard' || path === '/creator-dashboard') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav 
          className="fixed bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 z-50"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
      <div className="relative">
        {/* Background with glassmorphism effect */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-full border border-white/20 shadow-2xl" />
        
        {/* Navigation items */}
        <div className="relative flex justify-between items-center h-16 px-6">
          {navItems.map((item, index) => {
            const active = isActive(item.path);
            const IconComponent = active ? item.activeIcon : item.icon;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.path)}
                className={`relative group flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                  active 
                    ? 'bg-black text-white shadow-lg' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {/* Active indicator */}
                {active && (
                  <motion.div
                    className="absolute inset-0 bg-black rounded-full"
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Icon */}
                <div className="relative z-10">
                  <IconComponent className={`w-6 h-6 transition-colors duration-300 ${
                    active ? 'text-white' : 'text-gray-600 group-hover:text-gray-900'
                  }`} />
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-black text-white text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap">
                    {item.tooltip}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black" />
                  </div>
                </div>

                {/* Ripple effect on click */}
                <motion.div
                  className="absolute inset-0 bg-white/30 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  whileTap={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            );
          })}
        </div>
      </div>
      </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default FloatingNav;
