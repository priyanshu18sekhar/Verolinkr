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
  formatINR,
  formatCompact,
  platformName,
} from '@/components/dashboard/Ledger';
import { MapPinIcon, StarIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

type Tab = 'about' | 'platforms' | 'verification';

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function AboutTab({ profile, onSaved }: { profile: any; onSaved: () => void }) {
  const [form, setForm] = useState({
    fullName: profile?.fullName ?? '',
    displayName: profile?.displayName ?? '',
    bio: profile?.bio ?? '',
    niche: profile?.niche ?? '',
    city: profile?.city ?? '',
    country: profile?.country ?? '',
    phone: profile?.phone ?? '',
    website: profile?.website ?? '',
  });
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    setBusy(true);
    setError(null);
    setSaved(false);
    try {
      await apiPatch('/api/creators/me', form);
      setSaved(true);
      onSaved();
    } catch (e: any) {
      setError(e.message || 'Could not save your profile.');
    } finally {
      setBusy(false);
    }
  };

  const fields: { key: keyof typeof form; label: string; placeholder?: string; wide?: boolean; textarea?: boolean }[] = [
    { key: 'fullName', label: 'Full name' },
    { key: 'displayName', label: 'Display name' },
    { key: 'bio', label: 'Bio', wide: true, textarea: true, placeholder: 'What do you make, for whom?' },
    { key: 'niche', label: 'Niche', placeholder: 'Tech & Lifestyle' },
    { key: 'phone', label: 'Phone' },
    { key: 'city', label: 'City' },
    { key: 'country', label: 'Country' },
    { key: 'website', label: 'Website', placeholder: 'https://…' },
  ];

  return (
    <section className="dash-card p-7">
      <SectionTitle>About you</SectionTitle>
      <p className="cine-body mb-6 text-[0.88rem]">
        This is what brands see next to your verified reach. Keep it sharp.
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
      {saved && <p className="mt-4 text-sm font-medium text-[#08080c]">Saved — brands see the update immediately.</p>}
      <button onClick={submit} disabled={busy} className="cine-btn mt-6 disabled:opacity-50">
        {busy ? 'Saving…' : 'Save profile'}
      </button>
    </section>
  );
}

function ProfileContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [platforms, setPlatforms] = useState<any[]>([]);
  const [tab, setTab] = useState<Tab>('about');

  const load = async () => {
    const [me, st, pl] = await Promise.allSettled([
      apiGet<{ creator: any }>('/api/creators/me'),
      apiGet<{ stats: any }>('/api/creators/me/stats'),
      apiGet<{ platforms: any[] }>('/api/creators/me/platforms'),
    ]);
    if (me.status === 'fulfilled') setProfile(me.value.creator ?? null);
    if (st.status === 'fulfilled') setStats(st.value.stats ?? null);
    if (pl.status === 'fulfilled') setPlatforms(pl.value.platforms ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <LedgerLoading label="Opening your profile" />;

  const name = profile?.displayName || profile?.fullName || 'Creator';
  const verifiedCount = platforms.filter((p) => p.verified).length;

  return (
    <div className="dash-shell">
      <DashHeader
        receipt={`Ledger · Profile · ${verifiedCount} verified platforms`}
        title={
          <>
            The face on the <Serif>receipt</Serif>.
          </>
        }
        sub="Your profile travels with every verified number — this is how brands meet you."
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
              {verifiedCount > 0 && (
                <span className="dash-pill-solid">
                  <CheckBadgeIcon className="h-3 w-3" /> Verified
                </span>
              )}
            </div>
            {profile?.username && <p className="mt-0.5 text-sm text-[#8a899a]">@{profile.username}</p>}
            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-[#6b6a7b]">
              {(profile?.city || profile?.country) && (
                <span className="flex items-center gap-1.5">
                  <MapPinIcon className="h-4 w-4" />
                  {[profile?.city, profile?.country].filter(Boolean).join(', ')}
                </span>
              )}
              {stats?.averageRating ? (
                <span className="flex items-center gap-1.5">
                  <StarIcon className="h-4 w-4" />
                  {stats.averageRating} / 5
                </span>
              ) : null}
              {profile?.niche && <span>{profile.niche}</span>}
            </div>
            {profile?.bio && <p className="cine-body mt-3 max-w-2xl text-[0.9rem]">{profile.bio}</p>}
          </div>
          <div className="grid flex-shrink-0 grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
            {[
              { label: 'Followers', value: formatCompact(stats?.totalFollowers) },
              { label: 'Engagement', value: `${stats?.avgEngagement ?? 0}%` },
              { label: 'Authenticity', value: String(stats?.authenticityScore ?? 0) },
              { label: 'Earned', value: formatINR(stats?.totalEarnings) },
            ].map((s) => (
              <div key={s.label}>
                <p className="dash-label mb-1">{s.label}</p>
                <p className="dash-num text-lg font-semibold leading-none">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="dash-tabs mb-8">
        <button className="dash-tab" data-active={tab === 'about'} onClick={() => setTab('about')}>
          About
        </button>
        <button className="dash-tab" data-active={tab === 'platforms'} onClick={() => setTab('platforms')}>
          Platforms · {platforms.length}
        </button>
        <button className="dash-tab" data-active={tab === 'verification'} onClick={() => setTab('verification')}>
          Verification
        </button>
      </div>

      {tab === 'about' && <AboutTab profile={profile} onSaved={load} />}

      {tab === 'platforms' && (
        <section className="dash-card p-7">
          <SectionTitle
            aside={
              <button
                onClick={() => router.push('/creator-dashboard/connections')}
                className="dash-label cursor-pointer transition-colors hover:text-[#08080c]"
              >
                Manage →
              </button>
            }
          >
            Linked platforms
          </SectionTitle>
          {platforms.length ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="dash-th">Platform</th>
                    <th className="dash-th">Handle</th>
                    <th className="dash-th text-right">Followers</th>
                    <th className="dash-th text-right">Engagement</th>
                    <th className="dash-th text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {platforms.map((p) => (
                    <tr key={p.id}>
                      <td className="dash-td font-semibold">{platformName(p.platformType || p.name)}</td>
                      <td className="dash-td text-[#6b6a7b]">{p.username || p.handle || '—'}</td>
                      <td className="dash-td dash-num text-right">{formatCompact(p.followers)}</td>
                      <td className="dash-td dash-num text-right">{p.engagement ?? 0}%</td>
                      <td className="dash-td text-right">
                        <StatusPill status={p.verified ? 'verified' : 'linked'} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty
              title="No platforms linked"
              body="Connect a platform so your reach can be verified."
              action={
                <button
                  onClick={() => router.push('/creator-dashboard/connections')}
                  className="cine-btn-ghost !text-[0.85rem]"
                >
                  Connect a platform
                </button>
              }
            />
          )}
        </section>
      )}

      {tab === 'verification' && (
        <div className="grid max-w-3xl gap-6 sm:grid-cols-2">
          <section className="dash-card p-7">
            <SectionTitle>Authenticity score</SectionTitle>
            <p className="dash-num text-5xl font-semibold">{stats?.authenticityScore ?? 0}</p>
            <p className="cine-body mt-2 text-[0.85rem]">
              Out of 100. Computed from audience quality and engagement patterns across your linked platforms.
            </p>
          </section>
          <section className="dash-card p-7">
            <SectionTitle>Checks</SectionTitle>
            <ul className="space-y-3.5 pt-1">
              {[
                { label: 'Platform reach verified', done: verifiedCount > 0 },
                { label: 'Profile completed', done: !!stats?.profileCompleted },
                { label: 'Payout account linked', done: !!stats?.bankDetailsCompleted },
              ].map((c) => (
                <li key={c.label} className="flex items-center justify-between">
                  <span className="text-sm text-[#46455a]">{c.label}</span>
                  <StatusPill status={c.done ? 'verified' : 'pending'} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}

export default function CreatorProfilePage() {
  return (
    <DashboardLayout userType="creator">
      <ProfileContent />
    </DashboardLayout>
  );
}
