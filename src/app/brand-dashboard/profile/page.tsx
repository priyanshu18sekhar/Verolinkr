'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { apiGet, apiPatch } from '@/lib/api/client';
import {
  DashHeader,
  Serif,
  StatusPill,
  SectionTitle,
  Empty,
  LedgerLoading,
  formatDate,
} from '@/components/dashboard/Ledger';
import { MapPinIcon, GlobeAltIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

type Tab = 'company' | 'verification';

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function CompanyTab({ brand, onSaved }: { brand: any; onSaved: () => void }) {
  const [form, setForm] = useState({
    companyName: brand?.companyName ?? '',
    legalName: brand?.legalName ?? '',
    website: brand?.website ?? '',
    industry: brand?.industry ?? '',
    description: brand?.description ?? '',
    city: brand?.city ?? '',
    country: brand?.country ?? '',
    phone: brand?.phone ?? '',
  });
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.companyName.trim()) {
      setError('Company name is required.');
      return;
    }
    setBusy(true);
    setError(null);
    setSaved(false);
    try {
      await apiPatch('/api/brands/me', form);
      setSaved(true);
      onSaved();
    } catch (e: any) {
      setError(e.message || 'Could not save the profile.');
    } finally {
      setBusy(false);
    }
  };

  const fields: { key: keyof typeof form; label: string; placeholder?: string; wide?: boolean; textarea?: boolean }[] = [
    { key: 'companyName', label: 'Brand name' },
    { key: 'legalName', label: 'Legal name' },
    { key: 'description', label: 'About the brand', wide: true, textarea: true, placeholder: 'What do you make, for whom?' },
    { key: 'industry', label: 'Industry' },
    { key: 'website', label: 'Website', placeholder: 'https://…' },
    { key: 'phone', label: 'Phone' },
    { key: 'city', label: 'City' },
    { key: 'country', label: 'Country' },
  ];

  return (
    <section className="dash-card p-7">
      <SectionTitle>Company details</SectionTitle>
      <p className="cine-body mb-6 text-[0.88rem]">
        Creators see this next to your campaigns — a clear profile gets better applications.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.key} className={f.wide ? 'sm:col-span-2' : undefined}>
            <p className="dash-label mb-2">{f.label}</p>
            {f.textarea ? (
              <textarea
                value={form[f.key]}
                onChange={(e) => set(f.key)(e.target.value)}
                placeholder={f.placeholder}
                rows={3}
                className="dash-input resize-none"
              />
            ) : (
              <input
                value={form[f.key]}
                onChange={(e) => set(f.key)(e.target.value)}
                placeholder={f.placeholder}
                className="dash-input"
              />
            )}
          </div>
        ))}
      </div>
      {error && <p className="mt-4 text-sm font-medium text-[#08080c]">{error}</p>}
      {saved && <p className="mt-4 text-sm font-medium text-[#08080c]">Saved — creators see the update immediately.</p>}
      <button onClick={submit} disabled={busy} className="cine-btn mt-6 disabled:opacity-50">
        {busy ? 'Saving…' : 'Save profile'}
      </button>
    </section>
  );
}

function BrandProfileContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [brand, setBrand] = useState<any>(null);
  const [tab, setTab] = useState<Tab>('company');
  const [notFound, setNotFound] = useState(false);

  const load = async () => {
    try {
      const data = await apiGet<{ brand: any }>('/api/brands/me');
      setBrand(data.brand ?? null);
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <LedgerLoading label="Opening your brand profile" />;

  if (notFound || !brand) {
    return (
      <div className="dash-shell">
        <Empty
          title="No brand profile yet"
          body="Finish brand onboarding to create your profile — it takes two minutes."
          action={
            <button onClick={() => router.push('/onboarding/brand/step1')} className="cine-btn-ghost">
              Complete onboarding
            </button>
          }
        />
      </div>
    );
  }

  const name = brand.companyName ?? 'Brand';
  const kycVerified = brand.kycStatus === 'verified';

  return (
    <div className="dash-shell">
      <DashHeader
        receipt={`Ledger · Brand profile · KYC ${brand.kycStatus ?? 'pending'}`}
        title={
          <>
            The name on the <Serif>ledger</Serif>.
          </>
        }
        sub="Your brand identity — what creators see before they apply."
      />

      {/* Identity card */}
      <section className="dash-card mb-8 p-7">
        <div className="flex flex-wrap items-start gap-6">
          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-[1.6rem] bg-[#08080c]">
            <span className="font-mono text-xl font-semibold text-white">{initialsOf(name)}</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="dash-num text-2xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                {name}
              </h2>
              {kycVerified && (
                <span className="dash-pill-solid">
                  <CheckBadgeIcon className="h-3 w-3" /> KYC verified
                </span>
              )}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-[#6b6a7b]">
              {brand.industry && <span>{brand.industry}</span>}
              {(brand.city || brand.country) && (
                <span className="flex items-center gap-1.5">
                  <MapPinIcon className="h-4 w-4" />
                  {[brand.city, brand.country].filter(Boolean).join(', ')}
                </span>
              )}
              {brand.website && (
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 underline-offset-2 hover:underline"
                >
                  <GlobeAltIcon className="h-4 w-4" />
                  {brand.website.replace(/^https?:\/\//, '')}
                </a>
              )}
            </div>
            {brand.description && <p className="cine-body mt-3 max-w-2xl text-[0.9rem]">{brand.description}</p>}
          </div>
          <div className="flex-shrink-0 text-right">
            <p className="dash-label mb-1">Member since</p>
            <p className="dash-num text-[0.95rem] font-medium">{formatDate(brand.createdAt)}</p>
          </div>
        </div>
      </section>

      <div className="dash-tabs mb-8">
        <button className="dash-tab" data-active={tab === 'company'} onClick={() => setTab('company')}>
          Company
        </button>
        <button className="dash-tab" data-active={tab === 'verification'} onClick={() => setTab('verification')}>
          Verification
        </button>
      </div>

      {tab === 'company' && <CompanyTab brand={brand} onSaved={load} />}

      {tab === 'verification' && (
        <div className="grid max-w-3xl gap-6 sm:grid-cols-2">
          <section className="dash-card p-7">
            <SectionTitle>KYC status</SectionTitle>
            <div className="flex items-center gap-3 pt-1">
              <StatusPill status={brand.kycStatus ?? 'pending'} />
              <p className="text-sm text-[#46455a]">
                {kycVerified
                  ? 'Your brand is fully verified — campaigns carry the verified badge.'
                  : 'Complete KYC to unlock creator payouts and the verified badge.'}
              </p>
            </div>
            {!kycVerified && (
              <button
                onClick={() => router.push('/brand-registration/kyc')}
                className="cine-btn-ghost mt-5 !text-[0.85rem]"
              >
                Complete KYC
              </button>
            )}
          </section>
          <section className="dash-card p-7">
            <SectionTitle>Account records</SectionTitle>
            <ul className="space-y-3.5 pt-1">
              {[
                { label: 'Business email', value: brand.businessEmail ?? '—' },
                { label: 'Legal name', value: brand.legalName ?? '—' },
                { label: 'Account status', value: brand.active ? 'Active' : 'Inactive' },
              ].map((r) => (
                <li key={r.label} className="flex items-center justify-between gap-4">
                  <span className="dash-label">{r.label}</span>
                  <span className="truncate text-sm font-medium text-[#08080c]">{r.value}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}

export default function BrandProfilePage() {
  return (
    <DashboardLayout userType="brand">
      <BrandProfileContent />
    </DashboardLayout>
  );
}
