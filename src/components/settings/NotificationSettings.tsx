'use client';

import { useState, useEffect } from 'react';

interface NotificationPreference {
  id: string;
  label: string;
  enabled: boolean;
}

const DEFAULTS: NotificationPreference[] = [
  { id: 'campaign_updates', label: 'Campaign updates', enabled: true },
  { id: 'payment_notifications', label: 'Payment alerts', enabled: true },
  { id: 'new_opportunities', label: 'New opportunities', enabled: true },
  { id: 'system_announcements', label: 'Announcements', enabled: true },
  { id: 'email_notifications', label: 'Email', enabled: false },
  { id: 'push_notifications', label: 'Push', enabled: false },
];

export default function NotificationSettings() {
  const [preferences, setPreferences] = useState<NotificationPreference[]>(DEFAULTS);

  useEffect(() => {
    const saved = localStorage.getItem('notificationPreferences');
    if (saved) {
      try {
        setPreferences(JSON.parse(saved));
      } catch {
        // keep defaults when the stored value is unreadable
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
    <div>
      <p className="dash-label mb-3">Notifications</p>
      <div className="space-y-1">
        {preferences.map((pref) => (
          <div key={pref.id} className="flex items-center justify-between py-2.5 border-b border-[rgba(11,11,18,0.05)] last:border-b-0">
            <span className="text-sm text-[#46455a]">{pref.label}</span>
            <button
              onClick={() => togglePreference(pref.id)}
              className="dash-switch"
              data-on={pref.enabled}
              role="switch"
              aria-checked={pref.enabled}
              aria-label={pref.label}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
