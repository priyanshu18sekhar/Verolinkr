'use client';

import { useState, useEffect } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';

interface NotificationPreference {
  id: string;
  label: string;
  enabled: boolean;
  category: 'campaign' | 'payment' | 'opportunity' | 'system';
}

export default function NotificationSettings() {
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    { id: 'campaign_updates', label: 'Campaign Updates', enabled: true, category: 'campaign' },
    { id: 'payment_notifications', label: 'Payment Notifications', enabled: true, category: 'payment' },
    { id: 'new_opportunities', label: 'New Opportunities', enabled: true, category: 'opportunity' },
    { id: 'system_announcements', label: 'System Announcements', enabled: true, category: 'system' },
    { id: 'email_notifications', label: 'Email Notifications', enabled: false, category: 'system' },
    { id: 'push_notifications', label: 'Push Notifications', enabled: false, category: 'system' },
  ]);

  useEffect(() => {
    // Load preferences from localStorage
    const saved = localStorage.getItem('notificationPreferences');
    if (saved) {
      try {
        setPreferences(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse notification preferences');
      }
    }
  }, []);

  const togglePreference = (id: string) => {
    const updated = preferences.map((pref) =>
      pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
    );
    setPreferences(updated);
    localStorage.setItem('notificationPreferences', JSON.stringify(updated));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <BellIcon className="w-5 h-5 text-gray-500" />
        <h4 className="text-sm font-bold text-gray-900">Notifications</h4>
      </div>
      <div className="space-y-2">
        {preferences.map((pref) => (
          <div
            key={pref.id}
            className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <span className="text-sm font-medium text-gray-700">{pref.label}</span>
            <button
              onClick={() => togglePreference(pref.id)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                pref.enabled ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                  pref.enabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

