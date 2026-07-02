'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import {
  HomeIcon,
  UserIcon,
  ChartBarIcon,
  BriefcaseIcon,
  GiftIcon,
  LinkIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  UserIcon as UserIconSolid,
  ChartBarIcon as ChartBarIconSolid,
  BriefcaseIcon as BriefcaseIconSolid,
  GiftIcon as GiftIconSolid,
  LinkIcon as LinkIconSolid,
  IdentificationIcon as IdentificationIconSolid,
} from '@heroicons/react/24/solid';

interface FloatingNavProps {
  userType: 'brand' | 'creator';
}

interface NavEntry {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  activeIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const BRAND_ITEMS: NavEntry[] = [
  { id: 'dashboard', label: 'Dashboard', path: '/brand-dashboard', icon: HomeIcon, activeIcon: HomeIconSolid },
  { id: 'campaigns', label: 'Campaigns', path: '/brand-dashboard/campaigns', icon: BriefcaseIcon, activeIcon: BriefcaseIconSolid },
  { id: 'creators', label: 'Creators', path: '/brand-dashboard/creators', icon: UserIcon, activeIcon: UserIconSolid },
  { id: 'analytics', label: 'Analytics', path: '/brand-dashboard/analytics', icon: ChartBarIcon, activeIcon: ChartBarIconSolid },
  { id: 'profile', label: 'Profile', path: '/brand-dashboard/profile', icon: IdentificationIcon, activeIcon: IdentificationIconSolid },
];

const CREATOR_ITEMS: NavEntry[] = [
  { id: 'dashboard', label: 'Dashboard', path: '/creator-dashboard', icon: HomeIcon, activeIcon: HomeIconSolid },
  { id: 'campaigns', label: 'Campaigns', path: '/creator-dashboard/campaigns', icon: BriefcaseIcon, activeIcon: BriefcaseIconSolid },
  { id: 'gigs', label: 'Gigs', path: '/creator-dashboard/gigs', icon: GiftIcon, activeIcon: GiftIconSolid },
  { id: 'connections', label: 'Connections', path: '/creator-dashboard/connections', icon: LinkIcon, activeIcon: LinkIconSolid },
  { id: 'analytics', label: 'Analytics', path: '/creator-dashboard/analytics', icon: ChartBarIcon, activeIcon: ChartBarIconSolid },
  { id: 'profile', label: 'Profile', path: '/creator-dashboard/profile', icon: UserIcon, activeIcon: UserIconSolid },
];

const FloatingNav: React.FC<FloatingNavProps> = ({ userType }) => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = userType === 'brand' ? BRAND_ITEMS : CREATOR_ITEMS;

  const isActive = (path: string) => {
    if (path === '/brand-dashboard' || path === '/creator-dashboard') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <motion.nav
      className="fixed bottom-4 lg:bottom-7 left-1/2 -translate-x-1/2 z-50 px-4"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 0.9, 0.3, 1] }}
      aria-label="Dashboard navigation"
    >
      <div className="glass-nav flex items-center gap-1 rounded-full px-2.5 h-14">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const IconComponent = active ? item.activeIcon : item.icon;

          return (
            <button
              key={item.id}
              onClick={() => router.push(item.path)}
              className="group relative flex h-11 w-11 items-center justify-center rounded-full"
              aria-label={item.label}
              aria-current={active ? 'page' : undefined}
            >
              {active && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-[#08080c]"
                  layoutId="dash-nav-active"
                  transition={{ type: 'spring', bounce: 0.18, duration: 0.5 }}
                />
              )}
              <IconComponent
                className={`relative z-10 h-[1.35rem] w-[1.35rem] transition-colors duration-200 ${
                  active ? 'text-white' : 'text-[#6b6a7b] group-hover:text-[#08080c]'
                }`}
              />

              {/* label tooltip */}
              <span className="pointer-events-none absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#08080c] px-3 py-1.5 font-mono text-[0.58rem] font-medium uppercase tracking-[0.16em] text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default FloatingNav;
