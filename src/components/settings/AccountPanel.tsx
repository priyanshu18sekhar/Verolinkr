'use client';

import { useUser } from '@/contexts/UserContext';
import { Cog6ToothIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function AccountPanel() {
  const { userType, profile, userEmail, signOut } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  const displayName =
    profile?.displayName || profile?.companyName || profile?.fullName || 'Account';
  const displayEmail = profile?.email || profile?.businessEmail || userEmail || '';
  const initials = displayName
    .split(/\s+/)
    .map((w: string) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#08080c]">
          <span className="font-mono text-[0.7rem] font-semibold text-white">{initials}</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[#08080c]">{displayName}</p>
          <p className="truncate text-xs text-[#8a899a]">{displayEmail}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() =>
            router.push(userType === 'brand' ? '/brand-dashboard/settings' : '/creator-dashboard/settings')
          }
          className="cine-btn-ghost flex-1 !px-3 !py-2.5 !text-[0.8rem]"
        >
          <Cog6ToothIcon className="h-4 w-4" />
          Settings
        </button>
        <button onClick={handleLogout} className="cine-btn flex-1 !px-3 !py-2.5 !text-[0.8rem]">
          <ArrowRightOnRectangleIcon className="h-4 w-4" />
          Log out
        </button>
      </div>
    </div>
  );
}
