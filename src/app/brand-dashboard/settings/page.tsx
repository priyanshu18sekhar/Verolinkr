'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { apiGet, apiPatch } from '@/lib/api/client';
import { useUser } from '@/contexts/UserContext';
import {
  DashHeader,
  Serif,
  SectionTitle,
  LedgerLoading,
} from '@/components/dashboard/Ledger';

type Tab = 'notifications' | 'account';

const NOTIFICATION_PREFS: { key: string; label: string; hint: string }[] = [
  { key: 'campaignUpdates', label: 'Campaign updates', hint: 'Creator joins, delivery milestones' },
  { key: 'creatorMessages', label: 'Creator messages', hint: 'When a creator writes to you' },
  { key: 'paymentAlerts', label: 'Payment alerts', hint: 'Invoices and payout confirmations' },
  { key: 'weeklyDigest', label: 'Weekly digest', hint: 'A Monday summary of your ledger' },
];

function NotificationsTab({ brand, onSaved }: { brand: any; onSaved: () => void }) {
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    campaignUpdates: true,
    creatorMessages: true,
    paymentAlerts: true,
    weeklyDigest: false,
    ...(brand?.notifications ?? {}),
  });
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = (key: string) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const submit = async () => {
    setBusy(true);
    setError(null);
    setSaved(false);
    try {
      await apiPatch('/api/brands/me', { notifications: prefs });
      setSaved(true);
      onSaved();
    } catch (e: any) {
      setError(e.message || 'Could not save preferences.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="dash-card max-w-2xl p-7">
      <SectionTitle>Notifications</SectionTitle>
      <p className="cine-body mb-4 text-[0.88rem]">Choose what lands in your inbox.</p>
      <div>
        {NOTIFICATION_PREFS.map((n) => (
          <div
            key={n.key}
            className="flex items-center justify-between gap-4 border-b border-[rgba(11,11,18,0.06)] py-4 last:border-b-0"
          >
            <div>
              <p className="text-sm font-semibold text-[#08080c]">{n.label}</p>
              <p className="text-xs text-[#8a899a]">{n.hint}</p>
            </div>
            <button
              onClick={() => toggle(n.key)}
              className="dash-switch"
              data-on={!!prefs[n.key]}
              role="switch"
              aria-checked={!!prefs[n.key]}
              aria-label={n.label}
            />
          </div>
        ))}
      </div>
      {error && <p className="mt-4 text-sm font-medium text-[#08080c]">{error}</p>}
      {saved && <p className="mt-4 text-sm font-medium text-[#08080c]">Saved.</p>}
      <button onClick={submit} disabled={busy} className="cine-btn mt-6 disabled:opacity-50">
        {busy ? 'Saving…' : 'Save preferences'}
      </button>
    </section>
  );
}

function AccountTab({ brand }: { brand: any }) {
  const router = useRouter();
  const { signOut } = useUser();
  const [businessEmail, setBusinessEmail] = useState(brand?.businessEmail ?? '');
  const [phone, setPhone] = useState(brand?.phone ?? '');
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setBusy(true);
    setError(null);
    setSaved(false);
    try {
      await apiPatch('/api/brands/me', { businessEmail, phone });
      setSaved(true);
    } catch (e: any) {
      setError(e.message || 'Could not save changes.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <section className="dash-card p-7">
        <SectionTitle>Contact</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="dash-label mb-2">Business email</p>
            <input value={businessEmail} onChange={(e) => setBusinessEmail(e.target.value)} className="dash-input" />
          </div>
          <div>
            <p className="dash-label mb-2">Phone</p>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 …" className="dash-input" />
          </div>
        </div>
        {error && <p className="mt-4 text-sm font-medium text-[#08080c]">{error}</p>}
        {saved && <p className="mt-4 text-sm font-medium text-[#08080c]">Saved.</p>}
        <button onClick={submit} disabled={busy} className="cine-btn mt-6 disabled:opacity-50">
          {busy ? 'Saving…' : 'Save changes'}
        </button>
      </section>

      <section className="dash-card p-7">
        <SectionTitle>Session</SectionTitle>
        <p className="cine-body mb-5 text-[0.88rem]">Sign out of VeroLinkr on this device.</p>
        <button
          onClick={async () => {
            await signOut();
            router.push('/');
          }}
          className="cine-btn-ghost"
        >
          Log out
        </button>
      </section>
    </div>
  );
}

function BrandSettingsContent() {
  const [loading, setLoading] = useState(true);
  const [brand, setBrand] = useState<any>(null);
  const [tab, setTab] = useState<Tab>('notifications');

  const load = async () => {
    try {
      const data = await apiGet<{ brand: any }>('/api/brands/me');
      setBrand(data.brand ?? null);
    } catch {
      setBrand(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <LedgerLoading label="Opening settings" />;

  return (
    <div className="dash-shell">
      <DashHeader
        receipt="Ledger · Settings"
        title={
          <>
            Your terms, <Serif>settled</Serif>.
          </>
        }
        sub="Notifications and account details — everything that keeps the ledger accurate."
      />

      <div className="dash-tabs mb-8">
        <button className="dash-tab" data-active={tab === 'notifications'} onClick={() => setTab('notifications')}>
          Notifications
        </button>
        <button className="dash-tab" data-active={tab === 'account'} onClick={() => setTab('account')}>
          Account
        </button>
      </div>

      {tab === 'notifications' && <NotificationsTab brand={brand} onSaved={load} />}
      {tab === 'account' && <AccountTab brand={brand} />}
    </div>
  );
}

export default function BrandSettingsPage() {
  return (
    <DashboardLayout userType="brand">
      <BrandSettingsContent />
    </DashboardLayout>
  );
}
