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
  SectionTitle,
  Empty,
  LedgerLoading,
  formatINR,
  formatCompact,
} from '@/components/dashboard/Ledger';
import { InkBars, MeterList } from '@/components/dashboard/Charts';

interface Campaign {
  id: string;
  title: string;
  status?: string;
  budget?: number;
  cpv?: number;
  views?: number;
  creatorsJoined?: number;
}

function estimatedSpend(c: Campaign): number {
  const byViews = Number(c.views ?? 0) * Number(c.cpv ?? 0);
  return Math.min(byViews, Number(c.budget ?? byViews));
}

function shortTitle(t: string, n = 12): string {
  return t.length > n ? t.slice(0, n - 1) + '…' : t;
}

function BrandAnalyticsContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await apiGet<{ campaigns: Campaign[] }>('/api/campaigns');
        if (alive) setCampaigns(data.campaigns ?? []);
      } catch {
        if (alive) setCampaigns([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <LedgerLoading label="Auditing your spend" />;

  const withViews = campaigns.filter((c) => Number(c.views ?? 0) > 0);
  const totalViews = campaigns.reduce((s, c) => s + Number(c.views ?? 0), 0);
  const totalSpend = campaigns.reduce((s, c) => s + estimatedSpend(c), 0);
  const totalBudget = campaigns.reduce((s, c) => s + Number(c.budget ?? 0), 0);
  const totalCreators = campaigns.reduce((s, c) => s + Number(c.creatorsJoined ?? 0), 0);

  const budgetUse = campaigns
    .filter((c) => Number(c.budget ?? 0) > 0)
    .map((c) => ({
      label: shortTitle(c.title, 22),
      value: Math.min(100, Math.round((estimatedSpend(c) / Number(c.budget!)) * 100)),
    }));

  return (
    <div className="dash-shell">
      <DashHeader
        receipt={`Ledger · Analytics · ${campaigns.length} campaigns`}
        title={
          <>
            Every view, <Serif>audited</Serif>.
          </>
        }
        sub="Delivery across your campaigns — verified views, effective CPV and budget burn, computed from the ledger."
      />

      {campaigns.length === 0 ? (
        <div className="dash-card">
          <Empty
            title="Nothing to audit yet"
            body="Launch a campaign and its verified delivery lands here."
            action={
              <button
                onClick={() => router.push('/brand-dashboard/campaigns?create=1')}
                className="cine-btn-ghost !text-[0.85rem]"
              >
                Create campaign
              </button>
            }
          />
        </div>
      ) : (
        <>
          <StatStrip
            cells={[
              { label: 'Verified views', value: formatCompact(totalViews) },
              { label: 'Est. spend', value: formatINR(totalSpend) },
              {
                label: 'Budget committed',
                value: formatINR(totalBudget),
                hint: `${totalBudget > 0 ? Math.round((totalSpend / totalBudget) * 100) : 0}% consumed`,
              },
              {
                label: 'Effective CPV',
                value: totalViews > 0 ? `₹${(totalSpend / totalViews).toFixed(2)}` : '—',
              },
              { label: 'Creators engaged', value: String(totalCreators) },
            ]}
          />

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <section className="dash-card p-6">
              <SectionTitle>Verified views · by campaign</SectionTitle>
              {withViews.length ? (
                <InkBars
                  data={withViews.slice(0, 6).map((c) => ({
                    label: shortTitle(c.title, 9),
                    value: Number(c.views ?? 0),
                  }))}
                  format={(v) => formatCompact(v)}
                  height={210}
                />
              ) : (
                <Empty title="No views yet" body="Live campaigns chart their verified views here." />
              )}
            </section>

            <section className="dash-card p-6">
              <SectionTitle>Budget burn · % of budget delivered</SectionTitle>
              {budgetUse.length ? (
                <MeterList data={budgetUse} />
              ) : (
                <Empty title="No budgets set" />
              )}
            </section>
          </div>

          <section className="dash-card mt-6 overflow-hidden">
            <div className="px-6 pt-5">
              <SectionTitle>Campaign performance</SectionTitle>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="dash-th">Campaign</th>
                    <th className="dash-th text-right">Verified views</th>
                    <th className="dash-th text-right">CPV</th>
                    <th className="dash-th text-right">Est. spend</th>
                    <th className="dash-th text-right">Budget</th>
                    <th className="dash-th text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((c) => (
                    <tr key={c.id}>
                      <td className="dash-td font-semibold">{c.title}</td>
                      <td className="dash-td dash-num text-right">{formatCompact(c.views)}</td>
                      <td className="dash-td dash-num text-right">{c.cpv ? `₹${c.cpv}` : '—'}</td>
                      <td className="dash-td dash-num text-right">{formatINR(estimatedSpend(c))}</td>
                      <td className="dash-td dash-num text-right">{formatINR(c.budget)}</td>
                      <td className="dash-td text-right">
                        <StatusPill status={c.status || 'draft'} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <p className="dash-receipt mt-8 text-center">
            Spend estimated as verified views × CPV, capped at budget
          </p>
        </>
      )}
    </div>
  );
}

export default function BrandAnalyticsPage() {
  return (
    <DashboardLayout userType="brand">
      <BrandAnalyticsContent />
    </DashboardLayout>
  );
}
