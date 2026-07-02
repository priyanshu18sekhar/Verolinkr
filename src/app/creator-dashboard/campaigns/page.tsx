'use client';

import { useState, useEffect, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { apiGet, apiPost } from '@/lib/api/client';
import {
  DashHeader,
  Serif,
  StatusPill,
  SectionTitle,
  Empty,
  LedgerLoading,
  formatINR,
  formatCompact,
  formatDate,
} from '@/components/dashboard/Ledger';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Campaign {
  id: string;
  title: string;
  description?: string;
  budget?: number;
  cpv?: number;
  status?: string;
  brandName?: string;
  startDate?: any;
  endDate?: any;
  creatorsJoined?: number;
  views?: number;
}

interface Engagement {
  id: string;
  campaignId?: string;
  title: string;
  brand?: string;
  status?: string;
  earnings?: number;
  currentViews?: number;
  targetViews?: number;
}

function CampaignCard({
  c,
  applied,
  onApply,
  busy,
}: {
  c: Campaign;
  applied: boolean;
  onApply: (id: string) => void;
  busy: boolean;
}) {
  return (
    <article className="dash-card flex flex-col p-6">
      <div className="mb-3 flex items-start justify-between gap-3">
        <p className="dash-label">{c.brandName || 'Brand'}</p>
        {c.cpv ? <span className="dash-pill">₹{c.cpv}/view</span> : null}
      </div>
      <h3
        className="dash-num mb-2 text-xl font-semibold leading-snug"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {c.title}
      </h3>
      {c.description && (
        <p className="cine-body mb-5 line-clamp-2 text-[0.86rem]">{c.description}</p>
      )}

      <div className="mt-auto">
        <div className="mb-4 flex items-baseline justify-between border-t border-[rgba(11,11,18,0.07)] pt-4">
          <div>
            <p className="dash-label mb-1">Budget</p>
            <p className="dash-num text-lg font-semibold leading-none">{formatINR(c.budget)}</p>
          </div>
          <div className="text-right">
            <p className="dash-label mb-1">Runs till</p>
            <p className="dash-num text-[0.9rem] font-medium">{formatDate(c.endDate)}</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <p className="dash-receipt !text-[0.56rem]">
            {c.creatorsJoined || 0} creators joined
          </p>
          {applied ? (
            <span className="dash-pill-solid">Applied</span>
          ) : (
            <button
              onClick={() => onApply(c.id)}
              disabled={busy}
              className="cine-btn !px-5 !py-2 !text-[0.82rem] disabled:opacity-50"
            >
              {busy ? 'Applying…' : 'Apply'}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function CampaignsContent() {
  const [loading, setLoading] = useState(true);
  const [marketplace, setMarketplace] = useState<Campaign[]>([]);
  const [mine, setMine] = useState<Engagement[]>([]);
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<'discover' | 'mine'>('discover');
  const [applying, setApplying] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const [mp, my] = await Promise.allSettled([
        apiGet<{ campaigns: Campaign[] }>('/api/campaigns?type=marketplace'),
        apiGet<{ campaigns: Engagement[] }>('/api/creators/me/campaigns'),
      ]);
      if (!alive) return;
      if (mp.status === 'fulfilled') setMarketplace(mp.value.campaigns ?? []);
      if (my.status === 'fulfilled') setMine(my.value.campaigns ?? []);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, []);

  const appliedIds = useMemo(
    () => new Set(mine.map((m) => m.campaignId ?? m.id)),
    [mine]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return marketplace;
    return marketplace.filter(
      (c) =>
        c.title?.toLowerCase().includes(q) ||
        c.brandName?.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q)
    );
  }, [marketplace, query]);

  const apply = async (campaignId: string) => {
    setApplying(campaignId);
    setNotice(null);
    try {
      await apiPost('/api/creators/me/campaigns', { campaignId });
      const my = await apiGet<{ campaigns: Engagement[] }>('/api/creators/me/campaigns');
      setMine(my.campaigns ?? []);
      setNotice('Applied — the campaign now tracks on your dashboard.');
    } catch (e: any) {
      setNotice(e.message || 'The application failed. Try again.');
    } finally {
      setApplying(null);
    }
  };

  if (loading) return <LedgerLoading label="Opening the marketplace" />;

  return (
    <div className="dash-shell">
      <DashHeader
        receipt={`Ledger · Campaigns · ${marketplace.length} open`}
        title={
          <>
            Work that <Serif>pays per view</Serif>.
          </>
        }
        sub="Live brand campaigns matched to verified creators. Apply once — earnings track automatically."
      />

      <div className="dash-tabs mb-6">
        <button className="dash-tab" data-active={tab === 'discover'} onClick={() => setTab('discover')}>
          Discover · {marketplace.length}
        </button>
        <button className="dash-tab" data-active={tab === 'mine'} onClick={() => setTab('mine')}>
          My campaigns · {mine.length}
        </button>
      </div>

      {notice && (
        <div className="dash-card mb-6 px-6 py-4">
          <p className="text-sm font-medium text-[#08080c]">{notice}</p>
        </div>
      )}

      {tab === 'discover' ? (
        <>
          <div className="relative mb-6 max-w-md">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a899a]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search campaigns or brands…"
              className="dash-input !pl-11"
              aria-label="Search campaigns"
            />
          </div>

          {filtered.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((c) => (
                <CampaignCard
                  key={c.id}
                  c={c}
                  applied={appliedIds.has(c.id)}
                  onApply={apply}
                  busy={applying === c.id}
                />
              ))}
            </div>
          ) : (
            <div className="dash-card">
              <Empty
                title={query ? 'No matches' : 'No open campaigns'}
                body={
                  query
                    ? 'Try a different search — or clear it to see everything open.'
                    : 'New campaigns from verified brands appear here as they launch.'
                }
              />
            </div>
          )}
        </>
      ) : (
        <div className="dash-card overflow-hidden">
          <SectionTitle aside={<span className="dash-receipt px-6 pt-5">{mine.length} total</span>}>
            <span className="block px-6 pt-5">Your engagements</span>
          </SectionTitle>
          {mine.length ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="dash-th">Campaign</th>
                    <th className="dash-th">Brand</th>
                    <th className="dash-th text-right">Verified views</th>
                    <th className="dash-th text-right">Earned</th>
                    <th className="dash-th text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mine.map((m) => (
                    <tr key={m.id}>
                      <td className="dash-td font-semibold">{m.title}</td>
                      <td className="dash-td text-[#6b6a7b]">{m.brand || '—'}</td>
                      <td className="dash-td dash-num text-right">
                        {formatCompact(m.currentViews)} / {formatCompact(m.targetViews)}
                      </td>
                      <td className="dash-td dash-num text-right font-semibold">{formatINR(m.earnings)}</td>
                      <td className="dash-td text-right">
                        <StatusPill status={m.status || 'active'} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty
              title="Nothing here yet"
              body="Apply to a campaign from the Discover tab and it starts tracking here."
            />
          )}
        </div>
      )}
    </div>
  );
}

export default function CreatorCampaignsPage() {
  return (
    <DashboardLayout userType="creator">
      <CampaignsContent />
    </DashboardLayout>
  );
}
