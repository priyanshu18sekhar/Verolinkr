'use client';

import { useUser } from '@/contexts/UserContext';
import { UserIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function AccountPanel() {
  const { userType, userName, userEmail } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      // TODO: Implement logout logic
      router.push('/');
    }
  };

  return (
    <div className="space-y-4 border-t border-gray-200 pt-4">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
          <UserIcon className="w-6 h-6 text-gray-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-black truncate">{userName || 'User'}</div>
          <div className="text-xs text-gray-500 truncate">{userEmail || 'user@example.com'}</div>
        </div>
      </div>

      <div className="space-y-1">
        <button
          onClick={() => router.push(userType === 'brand' ? '/brand-settings' : '/creator-dashboard/profile')}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <Cog6ToothIcon className="w-5 h-5" />
          Settings
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}

