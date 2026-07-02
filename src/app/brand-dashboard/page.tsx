'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { apiGet } from '@/lib/api/client';
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
} from '@/components/dashboard/Ledger';
import { InkBars } from '@/components/dashboard/Charts';
import { PlusIcon } from '@heroicons/react/24/outline';

interface Campaign {
  id: string;
  title: string;
  status?: string;
  budget?: number;
  cpv?: number;
  views?: number;
  creatorsJoined?: number;
  startDate?: any;
  endDate?: any;
}

function estimatedSpend(c: Campaign): number {
  const byViews = Number(c.views ?? 0) * Number(c.cpv ?? 0);
  return Math.min(byViews, Number(c.budget ?? byViews));
}

function BrandHomeContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [brand, setBrand] = useState<any>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      const [me, ca] = await Promise.allSettled([
        apiGet<{ brand: any }>('/api/brands/me'),
        apiGet<{ campaigns: Campaign[] }>('/api/campaigns'),
      ]);
      if (!alive) return;
      if (me.status === 'fulfilled') setBrand(me.value.brand ?? null);
      if (ca.status === 'fulfilled') setCampaigns(ca.value.campaigns ?? []);
      if (me.status === 'rejected' && ca.status === 'rejected') setLoadError(true);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <LedgerLoading label="Opening the spend ledger" />;

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

  const active = campaigns.filter((c) => c.status === 'active');
  const totalViews = campaigns.reduce((s, c) => s + Number(c.views ?? 0), 0);
  const totalSpend = campaigns.reduce((s, c) => s + estimatedSpend(c), 0);
  const totalCreators = campaigns.reduce((s, c) => s + Number(c.creatorsJoined ?? 0), 0);
  const activeBudget = active.reduce((s, c) => s + Number(c.budget ?? 0), 0);
  const companyName = brand?.companyName ?? 'your brand';

  const viewsByCampaign = campaigns
    .filter((c) => Number(c.views ?? 0) > 0)
    .slice(0, 6)
    .map((c) => ({
      label: c.title.length > 10 ? c.title.slice(0, 9) + '…' : c.title,
      value: Number(c.views ?? 0),
    }));

  return (
    <div className="dash-shell">
      <DashHeader
        receipt={`Ledger · Brand · ${active.length} live campaigns`}
        title={
          <>
            Spend on <Serif>proof</Serif>, {companyName.split(' ')[0]}.
          </>
        }
        sub="Verified views only — every rupee below maps to a real person who watched."
        aside={
          <div className="text-right">
            <p className="dash-label mb-1">Live budget</p>
            <p className="dash-num text-3xl font-semibold leading-none">{formatINR(activeBudget)}</p>
            <button
              onClick={() => router.push('/brand-dashboard/campaigns?create=1')}
              className="cine-btn mt-3 !px-5 !py-2.5 !text-[0.85rem]"
            >
              <PlusIcon className="h-4 w-4" /> New campaign
            </button>
          </div>
        }
      />

      {/* KYC nudge */}
      {brand && brand.kycStatus !== 'verified' && (
        <div className="dash-card mb-8 flex flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="dash-label mb-1">Action needed</p>
            <p className="text-sm text-[#08080c]">Complete KYC to unlock payouts to creators.</p>
          </div>
          <button
            onClick={() => router.push('/brand-registration/kyc')}
            className="cine-btn-ghost !px-4 !py-2 !text-[0.82rem]"
          >
            Complete KYC
          </button>
        </div>
      )}

      <StatStrip
        cells={[
          { label: 'Verified views bought', value: formatCompact(totalViews) },
          { label: 'Est. spend', value: formatINR(totalSpend), hint: 'views × CPV, capped at budget' },
          { label: 'Live campaigns', value: String(active.length) },
          { label: 'Creators engaged', value: String(totalCreators) },
          {
            label: 'Avg CPV',
            value: totalViews > 0 ? `₹${(totalSpend / totalViews).toFixed(2)}` : '—',
          },
        ]}
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        {/* Campaign delivery */}
        <section className="dash-card p-6 lg:col-span-3">
          <SectionTitle
            aside={
              <button
                onClick={() => router.push('/brand-dashboard/campaigns')}
                className="dash-label cursor-pointer transition-colors hover:text-[#08080c]"
              >
                All campaigns →
              </button>
            }
          >
            Live delivery
          </SectionTitle>
          {active.length ? (
            <ul className="space-y-5">
              {active.map((c) => {
                const spent = estimatedSpend(c);
                return (
                  <li key={c.id}>
                    <div className="mb-2 flex items-baseline justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate text-[0.95rem] font-semibold text-[#08080c]">{c.title}</p>
                        <p className="mt-0.5 text-xs text-[#8a899a]">
                          {formatCompact(c.views)} verified views · {c.creatorsJoined ?? 0} creators
                          {c.endDate ? ` · till ${formatDate(c.endDate)}` : ''}
                        </p>
                      </div>
                      <p className="dash-num whitespace-nowrap text-[0.95rem] font-semibold">
                        {formatINR(spent)}{' '}
                        <span className="text-xs font-normal text-[#8a899a]">/ {formatINR(c.budget)}</span>
                      </p>
                    </div>
                    <ProofBar value={spent} max={Number(c.budget ?? 1)} />
                  </li>
                );
              })}
            </ul>
          ) : (
            <Empty
              title="Nothing live"
              body="Launch a campaign and watch verified views arrive here."
              action={
                <button
                  onClick={() => router.push('/brand-dashboard/campaigns?create=1')}
                  className="cine-btn-ghost !text-[0.85rem]"
                >
                  <PlusIcon className="h-4 w-4" /> Create campaign
                </button>
              }
            />
          )}
        </section>

        {/* Views by campaign */}
        <section className="dash-card p-6 lg:col-span-2">
          <SectionTitle>Verified views · by campaign</SectionTitle>
          {viewsByCampaign.length ? (
            <InkBars data={viewsByCampaign} format={(v) => formatCompact(v)} height={200} />
          ) : (
            <Empty title="No views yet" body="Once a campaign is live, its verified views chart here." />
          )}
        </section>
      </div>

      {/* Recent campaigns table */}
      <section className="dash-card mt-6 overflow-hidden">
        <div className="px-6 pt-5">
          <SectionTitle>Recent campaigns</SectionTitle>
        </div>
        {campaigns.length ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="dash-th">Campaign</th>
                  <th className="dash-th text-right">Budget</th>
                  <th className="dash-th text-right">Verified views</th>
                  <th className="dash-th text-right">Creators</th>
                  <th className="dash-th text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.slice(0, 6).map((c) => (
                  <tr
                    key={c.id}
                    className="dash-row-link"
                    onClick={() => router.push('/brand-dashboard/campaigns')}
                  >
                    <td className="dash-td font-semibold">{c.title}</td>
                    <td className="dash-td dash-num text-right">{formatINR(c.budget)}</td>
                    <td className="dash-td dash-num text-right">{formatCompact(c.views)}</td>
                    <td className="dash-td dash-num text-right">{c.creatorsJoined ?? 0}</td>
                    <td className="dash-td text-right">
                      <StatusPill status={c.status || 'draft'} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty title="No campaigns yet" body="Your campaign history builds here as you launch." />
        )}
      </section>
    </div>
  );
}

export default function BrandDashboardPage() {
  return (
    <DashboardLayout userType="brand">
      <BrandHomeContent />
    </DashboardLayout>
  );
}
