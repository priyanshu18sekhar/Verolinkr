'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { apiGet, apiPost } from '@/lib/api/client';
import {
  DashHeader,
  Serif,
  StatStrip,
  StatusPill,
  ProofBar,
  SectionTitle,
  Empty,
  LedgerLoading,
  formatINR,
  formatCompact,
  formatDate,
  platformName,
} from '@/components/dashboard/Ledger';
import { InkBars } from '@/components/dashboard/Charts';
import { XMarkIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';

interface Stats {
  totalEarnings: number;
  thisMonthEarnings: number;
  pendingEarnings: number;
  activeCampaigns: number;
  completedCampaigns: number;
  totalFollowers: number;
  avgEngagement: number;
  bankDetailsCompleted: boolean;
}

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Morning';
  if (h < 17) return 'Afternoon';
  return 'Evening';
}

function WithdrawModal({
  available,
  onClose,
  onDone,
}: {
  available: number;
  onClose: () => void;
  onDone: () => void;
}) {
  const [amount, setAmount] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = async () => {
    const v = Number(amount);
    if (!v || v <= 0) {
      setError('Enter an amount above zero.');
      return;
    }
    if (v > available) {
      setError(`That's more than your available ${formatINR(available)}.`);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await apiPost('/api/creators/me/withdraw', { amount: v });
      setSuccess(true);
      onDone();
    } catch (e: any) {
      setError(e.message || 'The withdrawal request failed. Try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(8,8,12,0.3)] p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 16, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 16, scale: 0.98 }}
        className="dash-card w-full max-w-md !bg-white/95 p-7"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Withdraw funds"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="dash-receipt mb-1.5">Payout request</p>
            <h3 className="dash-title !text-2xl">
              Withdraw <Serif>funds</Serif>
            </h3>
          </div>
          <button onClick={onClose} className="dash-icon-btn" aria-label="Close">
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>

        {success ? (
          <div className="py-4 text-center">
            <p className="dash-num mb-1 text-xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
              Request received
            </p>
            <p className="cine-body text-sm">
              {formatINR(Number(amount))} is on its way to your bank account. Track it in the payouts list.
            </p>
            <button onClick={onClose} className="cine-btn mt-6 w-full">
              Done
            </button>
          </div>
        ) : (
          <>
            <p className="dash-label mb-2">Amount · available {formatINR(available)}</p>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              max={available}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="₹ 0"
              className="dash-input dash-num !text-xl"
              autoFocus
            />
            <div className="mt-3 flex gap-2">
              {[0.25, 0.5, 1].map((f) => (
                <button
                  key={f}
                  onClick={() => setAmount(String(Math.floor(available * f)))}
                  className="dash-pill cursor-pointer hover:border-[#08080c]"
                >
                  {f === 1 ? 'All' : `${f * 100}%`}
                </button>
              ))}
            </div>
            {error && <p className="mt-3 text-sm text-[#08080c] font-medium">{error}</p>}
            <button onClick={submit} disabled={busy} className="cine-btn mt-6 w-full disabled:opacity-50">
              {busy ? 'Requesting…' : 'Request payout'}
            </button>
            <p className="mt-3 text-center text-xs text-[#8a899a]">
              Payouts land in your linked bank account in 2–3 business days.
            </p>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

function CreatorHomeContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [monthly, setMonthly] = useState<{ month: string; amount: number }[]>([]);
  const [payouts, setPayouts] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [platforms, setPlatforms] = useState<any[]>([]);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const refreshPayouts = useCallback(async () => {
    try {
      const [p, me] = await Promise.all([
        apiGet<{ payouts: any[] }>('/api/creators/me/withdraw'),
        apiGet<{ creator: any }>('/api/creators/me'),
      ]);
      setPayouts(p.payouts ?? []);
      setProfile(me.creator ?? null);
    } catch {
      // non-fatal: the page keeps its previous data
    }
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      const results = await Promise.allSettled([
        apiGet<{ creator: any }>('/api/creators/me'),
        apiGet<{ stats: Stats }>('/api/creators/me/stats'),
        apiGet<any>('/api/creators/analytics'),
        apiGet<{ payouts: any[] }>('/api/creators/me/withdraw'),
        apiGet<{ campaigns: any[] }>('/api/creators/me/campaigns'),
        apiGet<{ platforms: any[] }>('/api/creators/me/platforms'),
      ]);
      if (!alive) return;
      const [me, st, an, po, ca, pl] = results;
      if (me.status === 'fulfilled') setProfile(me.value.creator ?? null);
      if (st.status === 'fulfilled') setStats(st.value.stats ?? null);
      if (an.status === 'fulfilled') setMonthly(an.value.monthlyEarnings ?? []);
      if (po.status === 'fulfilled') setPayouts(po.value.payouts ?? []);
      if (ca.status === 'fulfilled') setCampaigns(ca.value.campaigns ?? []);
      if (pl.status === 'fulfilled') setPlatforms(pl.value.platforms ?? []);
      if (results.every((r) => r.status === 'rejected')) setLoadError(true);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <LedgerLoading />;

  if (loadError) {
    return (
      <div className="dash-shell">
        <Empty
          title="The ledger didn't load"
          body="We couldn't reach your data. Check your connection and reload the page."
          action={
            <button onClick={() => location.reload()} className="cine-btn-ghost">
              Reload
            </button>
          }
        />
      </div>
    );
  }

  const firstName = (profile?.displayName || profile?.fullName || 'Creator').split(' ')[0];
  const available = Number(profile?.availableBalance ?? 0);
  const active = campaigns.filter((c) => c.status === 'active');
  const verifiedPlatforms = platforms.filter((p) => p.verified).length;

  return (
    <div className="dash-shell">
      <DashHeader
        receipt={`Ledger · Creator · ${verifiedPlatforms}/${platforms.length || 0} platforms verified`}
        title={
          <>
            {greeting()}, <Serif>{firstName}</Serif>.
          </>
        }
        sub="Every figure below is verified — views, engagement, payouts. Nothing here is a promise."
        aside={
          <div className="text-right">
            <p className="dash-label mb-1">Available balance</p>
            <p className="dash-num text-3xl font-semibold leading-none">{formatINR(available)}</p>
            <button
              onClick={() => setShowWithdraw(true)}
              className="cine-btn mt-3 !px-5 !py-2.5 !text-[0.85rem]"
              disabled={!stats?.bankDetailsCompleted && !profile?.bankDetailsCompleted}
            >
              Withdraw
            </button>
          </div>
        }
      />

      {/* Bank details nudge */}
      {profile && !profile.bankDetailsCompleted && (
        <div className="dash-card mb-8 flex flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="dash-label mb-1">Action needed</p>
            <p className="text-sm text-[#08080c]">
              Add your bank details to withdraw earnings.
            </p>
          </div>
          <button
            onClick={() => router.push('/creator-dashboard/profile')}
            className="cine-btn-ghost !px-4 !py-2 !text-[0.82rem]"
          >
            Add bank details
          </button>
        </div>
      )}

      <StatStrip
        cells={[
          { label: 'Total earned', value: formatINR(stats?.totalEarnings) },
          { label: 'Pending', value: formatINR(stats?.pendingEarnings), hint: `${stats?.activeCampaigns ?? 0} active campaigns` },
          { label: 'Verified reach', value: formatCompact(stats?.totalFollowers) },
          { label: 'Avg engagement', value: `${stats?.avgEngagement ?? 0}%` },
          { label: 'Completed', value: String(stats?.completedCampaigns ?? 0), hint: 'campaigns delivered' },
        ]}
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        {/* Earnings chart */}
        <section className="dash-card p-6 lg:col-span-3">
          <SectionTitle>Earnings · last 6 months</SectionTitle>
          {monthly.some((m) => m.amount > 0) ? (
            <InkBars data={monthly.map((m) => ({ label: m.month, value: m.amount }))} format={(v) => formatINR(v)} />
          ) : (
            <Empty
              title="No earnings yet"
              body="Apply to a campaign and your first verified rupee lands here."
              action={
                <button onClick={() => router.push('/creator-dashboard/campaigns')} className="cine-btn-ghost !text-[0.85rem]">
                  Browse campaigns
                </button>
              }
            />
          )}
        </section>

        {/* Payout receipts */}
        <section className="dash-card p-6 lg:col-span-2">
          <SectionTitle
            aside={
              <button onClick={() => setShowWithdraw(true)} className="dash-label cursor-pointer hover:text-[#08080c] transition-colors">
                Withdraw →
              </button>
            }
          >
            Payouts
          </SectionTitle>
          {payouts.length ? (
            <ul>
              {payouts.slice(0, 5).map((p, i) => (
                <li key={p.id ?? i} className="flex items-center justify-between border-b border-[rgba(11,11,18,0.06)] py-3.5 last:border-b-0">
                  <div>
                    <p className="dash-num text-[0.95rem] font-semibold">{formatINR(p.amount)}</p>
                    <p className="dash-receipt mt-0.5 !text-[0.56rem]">
                      RCPT №{String(i + 1).padStart(3, '0')} · {formatDate(p.createdAt)}
                    </p>
                  </div>
                  <StatusPill status={p.status} />
                </li>
              ))}
            </ul>
          ) : (
            <Empty title="No payouts yet" body="Requested withdrawals appear here as receipts." />
          )}
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        {/* Active campaigns */}
        <section className="dash-card p-6 lg:col-span-3">
          <SectionTitle
            aside={
              <button onClick={() => router.push('/creator-dashboard/campaigns')} className="dash-label cursor-pointer hover:text-[#08080c] transition-colors">
                Discover more →
              </button>
            }
          >
            Active campaigns
          </SectionTitle>
          {active.length ? (
            <ul className="space-y-5">
              {active.map((c) => (
                <li key={c.id}>
                  <div className="mb-2 flex items-baseline justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-[0.95rem] font-semibold text-[#08080c]">{c.title}</p>
                      <p className="mt-0.5 text-xs text-[#8a899a]">
                        {c.brand} · ₹{c.cpv}/view
                      </p>
                    </div>
                    <p className="dash-num whitespace-nowrap text-[0.95rem] font-semibold">{formatINR(c.earnings)}</p>
                  </div>
                  <ProofBar value={c.currentViews ?? 0} max={c.targetViews ?? 1} />
                  <p className="dash-receipt mt-1.5 !text-[0.56rem]">
                    {formatCompact(c.currentViews)} of {formatCompact(c.targetViews)} verified views
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <Empty
              title="Nothing running"
              body="Your live brand campaigns will track their verified views here."
              action={
                <button onClick={() => router.push('/creator-dashboard/campaigns')} className="cine-btn-ghost !text-[0.85rem]">
                  Find a campaign
                </button>
              }
            />
          )}
        </section>

        {/* Platforms */}
        <section className="dash-card p-6 lg:col-span-2">
          <SectionTitle
            aside={
              <button onClick={() => router.push('/creator-dashboard/connections')} className="dash-label cursor-pointer hover:text-[#08080c] transition-colors">
                Manage →
              </button>
            }
          >
            Platforms
          </SectionTitle>
          {platforms.length ? (
            <ul>
              {platforms.map((p) => (
                <li key={p.id} className="flex items-center justify-between border-b border-[rgba(11,11,18,0.06)] py-3.5 last:border-b-0">
                  <div>
                    <p className="text-[0.92rem] font-semibold text-[#08080c]">
                      {platformName(p.platformType || p.name)}
                    </p>
                    <p className="mt-0.5 text-xs text-[#8a899a]">
                      {formatCompact(p.followers)} followers · {p.engagement ?? 0}% eng
                    </p>
                  </div>
                  <StatusPill status={p.verified ? 'verified' : 'linked'} />
                </li>
              ))}
            </ul>
          ) : (
            <Empty
              title="No platforms linked"
              body="Connect Instagram or YouTube so brands can see verified reach."
              action={
                <button onClick={() => router.push('/creator-dashboard/connections')} className="cine-btn-ghost !text-[0.85rem]">
                  Connect <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </button>
              }
            />
          )}
        </section>
      </div>

      <AnimatePresence>
        {showWithdraw && (
          <WithdrawModal
            available={available}
            onClose={() => setShowWithdraw(false)}
            onDone={refreshPayouts}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CreatorDashboardPage() {
  return (
    <DashboardLayout userType="creator">
      <CreatorHomeContent />
    </DashboardLayout>
  );
}
