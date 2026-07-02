'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ConnectPlatforms from '@/components/connect/ConnectPlatforms';
import { apiGet, apiPost, apiPatch } from '@/lib/api/client';
import { useUser } from '@/contexts/UserContext';
import {
  DashHeader,
  Serif,
  SectionTitle,
  LedgerLoading,
} from '@/components/dashboard/Ledger';

type Tab = 'platforms' | 'payout' | 'account';

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
  readOnly,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  error?: string;
  readOnly?: boolean;
}) {
  return (
    <div>
      <p className="dash-label mb-2">{label}</p>
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`dash-input ${readOnly ? 'opacity-60' : ''}`}
      />
      {error && <p className="mt-1.5 text-xs font-medium text-[#08080c]">{error}</p>}
    </div>
  );
}

function PayoutTab({ profile, onSaved }: { profile: any; onSaved: () => void }) {
  const [bankName, setBankName] = useState(profile?.bankName ?? '');
  const [accountNumber, setAccountNumber] = useState(profile?.accountNumber ?? '');
  const [ifscCode, setIfscCode] = useState(profile?.ifscCode ?? '');
  const [pan, setPan] = useState(profile?.pan ?? '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  const submit = async () => {
    setBusy(true);
    setErrors({});
    setSaved(false);
    try {
      await apiPost('/api/creators/me/bank-details', { bankName, accountNumber, ifscCode, pan });
      setSaved(true);
      onSaved();
    } catch (e: any) {
      setErrors({ form: e.message || 'Could not save bank details.' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="dash-card max-w-2xl p-7">
      <SectionTitle>Payout account</SectionTitle>
      <p className="cine-body mb-6 text-[0.88rem]">
        Withdrawals land in this account. Details are stored encrypted and used only for payouts.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Bank name" value={bankName} onChange={setBankName} placeholder="HDFC Bank" />
        <Field label="Account number" value={accountNumber} onChange={setAccountNumber} placeholder="50100…" />
        <Field label="IFSC code" value={ifscCode} onChange={(v) => setIfscCode(v.toUpperCase())} placeholder="HDFC0001234" />
        <Field label="PAN" value={pan} onChange={(v) => setPan(v.toUpperCase())} placeholder="ABCDE1234F" />
      </div>
      {errors.form && <p className="mt-4 text-sm font-medium text-[#08080c]">{errors.form}</p>}
      {saved && <p className="mt-4 text-sm font-medium text-[#08080c]">Saved — you can withdraw to this account.</p>}
      <button onClick={submit} disabled={busy} className="cine-btn mt-6 disabled:opacity-50">
        {busy ? 'Saving…' : 'Save payout details'}
      </button>
    </section>
  );
}

function AccountTab({ profile, onSaved }: { profile: any; onSaved: () => void }) {
  const router = useRouter();
  const { signOut } = useUser();
  const [displayName, setDisplayName] = useState(profile?.displayName ?? '');
  const [phone, setPhone] = useState(profile?.phone ?? '');
  const [city, setCity] = useState(profile?.city ?? '');
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setBusy(true);
    setError(null);
    setSaved(false);
    try {
      await apiPatch('/api/creators/me', { displayName, phone, city });
      setSaved(true);
      onSaved();
    } catch (e: any) {
      setError(e.message || 'Could not save changes.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <section className="dash-card p-7">
        <SectionTitle>Account</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Display name" value={displayName} onChange={setDisplayName} />
          <Field label="Email" value={profile?.email ?? ''} readOnly />
          <Field label="Phone" value={phone} onChange={setPhone} placeholder="+91 …" />
          <Field label="City" value={city} onChange={setCity} placeholder="Mumbai" />
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

function SettingsContent() {
  const [tab, setTab] = useState<Tab>('platforms');
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const data = await apiGet<{ creator: any }>('/api/creators/me');
      setProfile(data.creator ?? null);
    } catch {
      setProfile(null);
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
        sub="Platforms, payout account and profile details — everything that keeps the ledger accurate."
      />

      <div className="dash-tabs mb-8">
        <button className="dash-tab" data-active={tab === 'platforms'} onClick={() => setTab('platforms')}>
          Platforms
        </button>
        <button className="dash-tab" data-active={tab === 'payout'} onClick={() => setTab('payout')}>
          Payout
        </button>
        <button className="dash-tab" data-active={tab === 'account'} onClick={() => setTab('account')}>
          Account
        </button>
      </div>

      {tab === 'platforms' && (
        <section className="dash-card max-w-2xl p-7">
          <SectionTitle>Connected platforms</SectionTitle>
          <p className="cine-body mb-4 text-[0.88rem]">
            Connections are read-only. Disconnecting removes the verified badge from your reach.
          </p>
          <ConnectPlatforms returnTo="/creator-dashboard/settings" />
        </section>
      )}
      {tab === 'payout' && <PayoutTab profile={profile} onSaved={load} />}
      {tab === 'account' && <AccountTab profile={profile} onSaved={load} />}
    </div>
  );
}

export default function CreatorSettingsPage() {
  return (
    <DashboardLayout userType="creator">
      <SettingsContent />
    </DashboardLayout>
  );
}
