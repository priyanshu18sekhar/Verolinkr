'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { apiGet } from '@/lib/api/client';
import {
  DashHeader,
  Serif,
  StatStrip,
  SectionTitle,
  Empty,
  LedgerLoading,
  formatINR,
  formatCompact,
} from '@/components/dashboard/Ledger';
import { InkBars, InkLine, MeterList } from '@/components/dashboard/Charts';

interface AnalyticsData {
  monthlyEarnings: { month: string; amount: number }[];
  performanceData: { day: string; views: number; engagement: number }[];
  audienceMetrics: {
    ageGroups: { label: string; value: number }[];
    topLocations: { label: string; value: number }[];
    gender: { label: string; value: number }[];
  };
}

function AnalyticsContent() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const [an, st] = await Promise.allSettled([
        apiGet<AnalyticsData>('/api/creators/analytics'),
        apiGet<{ stats: any }>('/api/creators/me/stats'),
      ]);
      if (!alive) return;
      if (an.status === 'fulfilled') setData(an.value);
      if (st.status === 'fulfilled') setStats(st.value.stats);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <LedgerLoading label="Tallying verified views" />;

  const perf = data?.performanceData ?? [];
  const monthly = data?.monthlyEarnings ?? [];
  const audience = data?.audienceMetrics;
  const weekViews = perf.reduce((s, d) => s + (d.views || 0), 0);
  const weekEngagement = perf.length
    ? (perf.reduce((s, d) => s + (d.engagement || 0), 0) / perf.length).toFixed(1)
    : '0';

  return (
    <div className="dash-shell">
      <DashHeader
        receipt="Ledger · Analytics"
        title={
          <>
            Reach, <Serif>receipted</Serif>.
          </>
        }
        sub="Verified views and engagement across your linked platforms — the numbers brands see."
      />

      <StatStrip
        cells={[
          { label: 'Views · 7 days', value: formatCompact(weekViews) },
          { label: 'Engagement · 7 days', value: `${weekEngagement}%` },
          { label: 'Lifetime views', value: formatCompact(stats?.totalViews) },
          { label: 'Followers', value: formatCompact(stats?.totalFollowers) },
          { label: 'Authenticity', value: `${stats?.authenticityScore ?? 0}`, hint: 'of 100 · AI verified' },
        ]}
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="dash-card p-6">
          <SectionTitle>Verified views · this week</SectionTitle>
          {perf.some((d) => d.views > 0) ? (
            <InkLine
              data={perf.map((d) => ({ label: d.day.slice(0, 3), value: d.views }))}
              format={(v) => formatCompact(v)}
            />
          ) : (
            <Empty title="No views tracked yet" body="Once a platform is connected, verified views land here daily." />
          )}
        </section>

        <section className="dash-card p-6">
          <SectionTitle>Earnings · last 6 months</SectionTitle>
          {monthly.some((m) => m.amount > 0) ? (
            <InkBars
              data={monthly.map((m) => ({ label: m.month, value: m.amount }))}
              format={(v) => formatINR(v)}
            />
          ) : (
            <Empty title="No earnings yet" body="Complete a campaign and this chart starts moving." />
          )}
        </section>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <section className="dash-card p-6">
          <SectionTitle>Audience · age</SectionTitle>
          {audience?.ageGroups?.length ? (
            <MeterList data={audience.ageGroups} />
          ) : (
            <Empty title="No data yet" />
          )}
        </section>
        <section className="dash-card p-6">
          <SectionTitle>Audience · location</SectionTitle>
          {audience?.topLocations?.length ? (
            <MeterList data={audience.topLocations} />
          ) : (
            <Empty title="No data yet" />
          )}
        </section>
        <section className="dash-card p-6">
          <SectionTitle>Audience · gender</SectionTitle>
          {audience?.gender?.length ? (
            <MeterList data={audience.gender} />
          ) : (
            <Empty title="No data yet" />
          )}
        </section>
      </div>

      <p className="dash-receipt mt-8 text-center">
        Figures verified by VeroLinkr · updated daily
      </p>
    </div>
  );
}

export default function CreatorAnalyticsPage() {
  return (
    <DashboardLayout userType="creator">
      <AnalyticsContent />
    </DashboardLayout>
  );
}
