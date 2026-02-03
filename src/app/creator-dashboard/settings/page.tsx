'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  UserCircleIcon, 
  ShieldCheckIcon, 
  CreditCardIcon, 
  BellIcon, 
  LinkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { apiGet } from '@/lib/api/client';

function SettingsContent() {
  const [activeTab, setActiveTab] = useState('platforms');
  const [creatorProfile, setCreatorProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await apiGet<{ creator: any }>('/api/creators/me');
        setCreatorProfile(data.creator);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const connectedPlatforms = creatorProfile?.platforms || [];
  
  const allPlatforms = [
    { id: 'instagram', name: 'Instagram', icon: '📸', color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500' },
    { id: 'youtube', name: 'YouTube', icon: '▶️', color: 'bg-red-600' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', color: 'bg-black' },
    { id: 'twitter', name: 'Twitter / X', icon: '❌', color: 'bg-black' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'bg-blue-600' }
  ];

  const isConnected = (platformId: string) => {
    return connectedPlatforms.some((p: any) => p.id === platformId || p.platform === platformId);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  if (loading) return <div className="p-8">Loading settings...</div>;

  return (
    <motion.div 
      className="p-8 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-black text-black mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account, connections, and preferences.</p>
      </div>

      <div className="flex space-x-2 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { id: 'platforms', label: 'Social Platforms', icon: LinkIcon },
          { id: 'profile', label: 'Profile', icon: UserCircleIcon },
          { id: 'notifications', label: 'Notifications', icon: BellIcon },
          { id: 'billing', label: 'Billing', icon: CreditCardIcon },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-bold transition-all ${
              activeTab === tab.id ? 'bg-white shadow text-black' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'platforms' && (
        <motion.div {...fadeInUp} className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-black mb-1">Connected Platforms</h2>
            <p className="text-sm text-gray-500 mb-6">Link your social media accounts to verify your stats and get more deals.</p>

            <div className="space-y-4">
              {allPlatforms.map((platform) => {
                const connected = isConnected(platform.id);
                return (
                  <div key={platform.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-gray-300 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-lg ${platform.color}`}>
                        {platform.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-black">{platform.name}</h3>
                        {connected ? (
                          <div className="flex items-center text-xs text-green-600 font-medium mt-0.5">
                            <CheckCircleIcon className="w-3 h-3 mr-1" />
                            Connected
                          </div>
                        ) : (
                          <p className="text-xs text-gray-400 mt-0.5">Not connected</p>
                        )}
                      </div>
                    </div>
                    
                    {connected ? (
                      <button className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-red-600 border border-gray-200 hover:border-red-200 rounded-lg transition-colors">
                        Disconnect
                      </button>
                    ) : (
                      <button className="px-4 py-2 text-sm font-bold text-white bg-black hover:bg-gray-800 rounded-lg transition-colors">
                        Connect
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'profile' && (
        <motion.div {...fadeInUp} className="bg-white border border-gray-200 rounded-xl p-6">
           <h2 className="text-lg font-bold text-black mb-6">Profile Information</h2>
           <div className="space-y-4">
             <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Display Name</label>
               <input 
                 type="text" 
                 value={creatorProfile?.displayName || ''} 
                 readOnly 
                 className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50" 
               />
             </div>
             <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
               <input 
                 type="email" 
                 value={creatorProfile?.email || ''} 
                 readOnly 
                 className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50" 
               />
             </div>
             <div className="pt-4">
               <span className="text-xs text-gray-500">To edit your profile, please contact support.</span>
             </div>
           </div>
        </motion.div>
      )}

      {activeTab === 'notifications' && (
        <motion.div {...fadeInUp} className="bg-white border border-gray-200 rounded-xl p-6 text-center text-gray-500 py-12">
            <BellIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="font-medium">Notification settings coming soon</p>
        </motion.div>
      )}

      {activeTab === 'billing' && (
        <motion.div {...fadeInUp} className="bg-white border border-gray-200 rounded-xl p-6 text-center text-gray-500 py-12">
            <CreditCardIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="font-medium">Billing & Payout settings coming soon</p>
        </motion.div>
      )}

    </motion.div>
  );
}

export default function SettingsPage() {
  return (
    <DashboardLayout userType="creator" userName="Creator" userEmail="creator@example.com">
      <SettingsContent />
    </DashboardLayout>
  );
}
