'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';

export default function ConditionalNavigation() {
  const pathname = usePathname();
  
  // Hide navigation on dashboard pages
  const isDashboardPage = pathname?.startsWith('/brand-dashboard') || 
                          pathname?.startsWith('/creator-dashboard');
  
  if (isDashboardPage) {
    return null;
  }
  
  return <Navigation />;
}

