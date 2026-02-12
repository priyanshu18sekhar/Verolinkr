'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BellIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  UsersIcon,
  CodeBracketIcon,
  GlobeAltIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import FloatingNav from '../../../components/ui/FloatingNav';
import DashboardLayout from '../../../components/layout/DashboardLayout';

function BrandSettingsContent() {
  const [activeTab, setActiveTab] = useState('notifications');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Settings State
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    campaignUpdates: true,
    creatorMessages: true,
    paymentAlerts: true,
    reportReady: true,
    weeklyDigest: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showStats: true,
    showCampaigns: true,
    allowMessages: true
  });

  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'Asia/Kolkata',
    currency: 'INR',
    dashboardView: 'grid'
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'privacy', label: 'Privacy', icon: ShieldCheckIcon },
    { id: 'billing', label: 'Billing', icon: CreditCardIcon },
    { id: 'team', label: 'Team Access', icon: UsersIcon },
    { id: 'api', label: 'API & Integrations', icon: CodeBracketIcon },
    { id: 'preferences', label: 'Preferences', icon: GlobeAltIcon }
  ];

  const handleSave = () => {
    // Here you would call the API to save settings
    setSuccessMessage('Settings saved successfully!');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="bg-white border-b border-gray-200"
        {...fadeInUp}
      >
        <div className="w-full px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto">
          <div className="flex justify-between items-start py-8">
            <div className="flex-1">
              <h1 className="text-[48px] md:text-[56px] font-black text-black tracking-tighter leading-none mb-3">
                Settings
              </h1>
              <p className="text-[14px] text-gray-600 font-normal max-w-lg">
                Manage your account preferences, notifications, and integrations
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="w-full px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto py-8">
        {/* Success Message */}
        {showSuccess && (
          <motion.div
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CheckCircleIcon className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">{successMessage}</span>
          </motion.div>
        )}

        {/* Settings Container */}
        <motion.div
          className="bg-white border border-gray-200 rounded-lg"
          {...fadeInUp}
        >
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-semibold text-[13px] flex items-center space-x-2 transition-all duration-200 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-black text-black'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-[20px] font-bold text-black mb-6">Notification Preferences</h3>
                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-black transition-colors">
                        <div>
                          <p className="text-[14px] font-semibold text-black capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </p>
                          <p className="text-[12px] text-gray-600 mt-1">
                            Receive notifications about {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => {
                              setNotifications({
                                ...notifications,
                                [key]: e.target.checked
                              });
                            }}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black peer-focus:ring-opacity-20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-[20px] font-bold text-black mb-6">Privacy Settings</h3>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <label className="block text-[14px] font-semibold text-black mb-2">
                        Profile Visibility
                      </label>
                      <select
                        value={privacy.profileVisibility}
                        onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-[13px]"
                      >
                        <option value="public">Public - Visible to all creators</option>
                        <option value="verified">Verified Only - Only verified creators</option>
                        <option value="private">Private - Hidden from search</option>
                      </select>
                    </div>

                    {Object.entries(privacy).filter(([key]) => key !== 'profileVisibility').map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-black transition-colors">
                        <div>
                          <p className="text-[14px] font-semibold text-black capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value as boolean}
                            onChange={(e) => {
                              setPrivacy({
                                ...privacy,
                                [key]: e.target.checked
                              });
                            }}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black peer-focus:ring-opacity-20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Billing Tab */}
            {activeTab === 'billing' && (
              <div className="space-y-6">
                <h3 className="text-[20px] font-bold text-black">Billing & Payments</h3>
                <p className="text-gray-600">Payment method management will be available here.</p>
                <div className="p-6 border border-gray-200 rounded-lg">
                  <p className="text-[14px] text-gray-600">Coming soon: Manage payment methods, view invoices, and billing history.</p>
                </div>
              </div>
            )}

            {/* Team Tab */}
            {activeTab === 'team' && (
              <div className="space-y-6">
                <h3 className="text-[20px] font-bold text-black">Team Access Control</h3>
                <p className="text-gray-600">Manage team member permissions and access levels.</p>
                <div className="p-6 border border-gray-200 rounded-lg">
                  <p className="text-[14px] text-gray-600">Team management features are available in the Profile section.</p>
                </div>
              </div>
            )}

            {/* API Tab */}
            {activeTab === 'api' && (
              <div className="space-y-6">
                <h3 className="text-[20px] font-bold text-black">API & Integrations</h3>
                <p className="text-gray-600">API keys and webhook management for integrations.</p>
                <div className="p-6 border border-gray-200 rounded-lg">
                  <p className="text-[14px] text-gray-600">Coming soon: Generate API keys and configure webhooks.</p>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-[20px] font-bold text-black mb-6">App Preferences</h3>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <label className="block text-[14px] font-semibold text-black mb-2">
                        Language
                      </label>
                      <select
                        value={preferences.language}
                        onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-[13px]"
                      >
                        <option value="en">English</option>
                        <option value="hi">हिन्दी (Hindi)</option>
                      </select>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                      <label className="block text-[14px] font-semibold text-black mb-2">
                        Timezone
                      </label>
                      <select
                        value={preferences.timezone}
                        onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-[13px]"
                      >
                        <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                        <option value="America/New_York">America/New_York (EST)</option>
                        <option value="Europe/London">Europe/London (GMT)</option>
                      </select>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                      <label className="block text-[14px] font-semibold text-black mb-2">
                        Currency
                      </label>
                      <select
                        value={preferences.currency}
                        onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-[13px]"
                      >
                        <option value="INR">₹ INR (Indian Rupee)</option>
                        <option value="USD">$ USD (US Dollar)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <motion.button
                onClick={handleSave}
                className="bg-black text-white px-8 py-3 rounded-lg font-bold text-[13px] hover:bg-gray-900 transition-all duration-200 premium-glow-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Save Changes
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .premium-glow-button {
          position: relative;
          overflow: hidden;
        }
        .premium-glow-button:hover::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          animation: glow-pulse 1.5s ease-in-out infinite;
        }
        @keyframes glow-pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </motion.div>
  );
}

export default function BrandSettings() {
  return (
    <DashboardLayout userType="brand">
      <BrandSettingsContent />
      <FloatingNav userType="brand" />
    </DashboardLayout>
  );
}
