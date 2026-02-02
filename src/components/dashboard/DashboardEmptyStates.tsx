'use client';

import { useRouter } from 'next/navigation';
import { EmptyState } from '../ui/EmptyState';
import {
  BriefcaseIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  LinkIcon,
  PhotoIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

interface DashboardEmptyStateProps {
  type: 'campaigns' | 'earnings' | 'bank' | 'platforms' | 'portfolio' | 'analytics';
  size?: 'sm' | 'md' | 'lg';
  onAction?: () => void;
}

export function DashboardEmptyState({ type, size = 'md', onAction }: DashboardEmptyStateProps) {
  const router = useRouter();

  const emptyStates = {
    campaigns: {
      icon: <BriefcaseIcon className="w-full h-full" />,
      title: 'No Active Campaigns',
      description: 'Browse available campaigns and start collaborating with brands.',
      actionText: 'Find Campaigns',
      onAction: onAction || (() => router.push('/creator-dashboard/campaigns')),
    },
    earnings: {
      icon: <CurrencyDollarIcon className="w-full h-full" />,
      title: 'No Earnings Yet',
      description: 'Complete campaigns to start earning. Your earnings will appear here.',
      actionText: 'Browse Campaigns',
      onAction: onAction || (() => router.push('/creator-dashboard/campaigns')),
    },
    bank: {
      icon: <BanknotesIcon className="w-full h-full" />,
      title: 'Bank Details Not Linked',
      description: 'Add your bank details to receive payments for completed campaigns.',
      actionText: 'Add Bank Details',
      onAction: onAction,
    },
    platforms: {
      icon: <LinkIcon className="w-full h-full" />,
      title: 'No Platforms Linked',
      description: 'Connect your social media accounts to showcase your reach to brands.',
      actionText: 'Connect Platform',
      onAction: onAction,
    },
    portfolio: {
      icon: <PhotoIcon className="w-full h-full" />,
      title: 'Portfolio Empty',
      description: 'Add your best work to attract brands and showcase your creativity.',
      actionText: 'Add Content',
      onAction: onAction,
    },
    analytics: {
      icon: <ChartBarIcon className="w-full h-full" />,
      title: 'No Analytics Data',
      description: 'Analytics will appear once you complete campaigns and gain engagement.',
      actionText: 'View Campaigns',
      onAction: onAction || (() => router.push('/creator-dashboard/campaigns')),
    },
  };

  const state = emptyStates[type];

  return (
    <EmptyState
      icon={state.icon}
      title={state.title}
      description={state.description}
      actionText={state.actionText}
      onAction={state.onAction}
      size={size}
    />
  );
}

export default DashboardEmptyState;
