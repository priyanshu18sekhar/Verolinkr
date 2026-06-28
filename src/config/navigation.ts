import {
  HomeIcon,
  UserIcon,
  ChartBarIcon,
  BriefcaseIcon,
  GiftIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  CogIcon,
  BellIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';

export type NavItem = {
  id: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  path: string;
  children?: NavItem[];
  badge?: number;
};

export type NavigationConfig = {
  brand: NavItem[];
  creator: NavItem[];
};

export const navigationConfig: NavigationConfig = {
  brand: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: HomeIcon,
      path: '/brand-dashboard',
    },
    {
      id: 'campaigns',
      label: 'Campaigns',
      icon: BriefcaseIcon,
      path: '/brand-dashboard/campaigns',
    },
    {
      id: 'creators',
      label: 'Creators',
      icon: UserIcon,
      path: '/brand-dashboard/creators',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: ChartBarIcon,
      path: '/brand-dashboard/analytics',
    },
    {
      id: 'kyc',
      label: 'KYC',
      icon: ShieldCheckIcon,
      path: '/brand-registration/kyc',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: CogIcon,
      path: '/brand-dashboard/settings',
    },
  ],
  creator: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: HomeIcon,
      path: '/creator-dashboard',
    },
    {
      id: 'campaigns',
      label: 'Campaigns',
      icon: BriefcaseIcon,
      path: '/creator-dashboard/campaigns',
    },
    {
      id: 'connections',
      label: 'Connections',
      icon: LinkIcon,
      path: '/creator-dashboard/connections',
    },
    {
      id: 'gigs',
      label: 'Gigs',
      icon: GiftIcon,
      path: '/creator-dashboard/gigs',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: ChartBarIcon,
      path: '/creator-dashboard/analytics',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: UserIcon,
      path: '/creator-dashboard/profile',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: CogIcon,
      path: '/creator-dashboard/settings',
    },
  ],
};

