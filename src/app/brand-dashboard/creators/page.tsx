'use client';

import { useState, useEffect, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { apiGet } from '@/lib/api/client';
import {
  DashHeader,
  Serif,
  StatStrip,
  SectionTitle,
  Empty,
  LedgerLoading,
  formatCompact,
  platformName,
} from '@/components/dashboard/Ledger';
import { MagnifyingGlassIcon, CheckBadgeIcon, MapPinIcon, StarIcon } from '@heroicons/react/24/outline';

interface Creator {
  id: string;
  displayName: string;
  username?: string | null;
  bio?: string | null;
  niche?: string | null;
  categories?: string[];
  city?: string | null;
  country?: string | null;
  followers: number;
  engagement: number;
  platforms: string[];
  verified: boolean;
  averageRating?: number | null;
  authenticityScore?: number | null;
}

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function CreatorCard({ c }: { c: Creator }) {
  return (
    <article className="dash-card flex flex-col p-6">
      <div className="mb-4 flex items-start gap-4">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-[#08080c]">
          <span className="font-mono text-sm font-semibold text-white">{initialsOf(c.displayName)}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="dash-num truncate text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
              {c.displayName}
            </h3>
            {c.verified && <CheckBadgeIcon className="h-4.5 w-4.5 flex-shrink-0 text-[#08080c]" />}
          </div>
          {c.username && <p className="truncate text-xs text-[#8a899a]">@{c.username}</p>}
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-[#6b6a7b]">
            {c.niche && <span>{c.niche}</span>}
            {(c.city || c.country) && (
              <span className="flex items-center gap-1">
                <MapPinIcon className="h-3 w-3" />
                {[c.city, c.country].filter(Boolean).join(', ')}
              </span>
            )}
          </div>
        </div>
      </div>

      {c.bio && <p className="cine-body mb-5 line-clamp-2 text-[0.85rem]">{c.bio}</p>}

      <div className="mt-auto">
        <div className="grid grid-cols-3 gap-4 border-t border-[rgba(11,11,18,0.07)] pt-4">
          <div>
            <p className="dash-label mb-1">Reach</p>
            <p className="dash-num text-[1.05rem] font-semibold leading-none">{formatCompact(c.followers)}</p>
          </div>
          <div>
            <p className="dash-label mb-1">Engagement</p>
            <p className="dash-num text-[1.05rem] font-semibold leading-none">{c.engagement}%</p>
          </div>
          <div>
            <p className="dash-label mb-1">Rating</p>
            <p className="dash-num flex items-center gap-1 text-[1.05rem] font-semibold leading-none">
              <StarIcon className="h-3.5 w-3.5" />
              {c.averageRating ?? '—'}
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {c.platforms.map((p) => (
            <span key={p} className="dash-pill">
              {platformName(p)}
            </span>
          ))}
          {c.verified && <span className="dash-pill-solid">verified reach</span>}
        </div>
      </div>
    </article>
  );
}

function CreatorsContent() {
  const [loading, setLoading] = useState(true);
  const [creators, setCreators] = useState<Creator[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await apiGet<{ creators: Creator[] }>('/api/creators?limit=48');
        if (alive) setCreators(data.creators ?? []);
      } catch {
        if (alive) setCreators([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return creators;
    return creators.filter(
      (c) =>
        c.displayName?.toLowerCase().includes(q) ||
        c.username?.toLowerCase().includes(q) ||
        c.niche?.toLowerCase().includes(q) ||
        c.categories?.some((cat) => cat.toLowerCase().includes(q))
    );
  }, [creators, query]);

  if (loading) return <LedgerLoading label="Finding verified creators" />;

  const verified = creators.filter((c) => c.verified).length;
  const totalReach = creators.reduce((s, c) => s + c.followers, 0);
  const avgEngagement = creators.length
    ? (creators.reduce((s, c) => s + c.engagement, 0) / creators.length).toFixed(1)
    : '0';

  return (
    <div className="dash-shell">
      <DashHeader
        receipt={`Ledger · Creators · ${verified} verified`}
        title={
          <>
            Reach you can <Serif>audit</Serif>.
          </>
        }
        sub="Every creator below linked their platforms for read-only verification — the reach you see is the reach you get."
      />

      <StatStrip
        cells={[
          { label: 'Creators', value: String(creators.length) },
          { label: 'Verified', value: String(verified) },
          { label: 'Combined reach', value: formatCompact(totalReach) },
          { label: 'Avg engagement', value: `${avgEngagement}%` },
        ]}
      />

      <div className="mt-8 mb-6 flex items-center justify-between gap-4">
        <SectionTitle>Directory</SectionTitle>
        <div className="relative w-full max-w-xs">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a899a]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or niche…"
            className="dash-input !pl-11"
            aria-label="Search creators"
          />
        </div>
      </div>

      {shown.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {shown.map((c) => (
            <CreatorCard key={c.id} c={c} />
          ))}
        </div>
      ) : (
        <div className="dash-card">
          <Empty
            title={creators.length ? 'No matches' : 'No creators yet'}
            body={
              creators.length
                ? 'Try a different name or niche.'
                : 'Verified creators appear here as they join VeroLinkr.'
            }
          />
        </div>
      )}
    </div>
  );
}

export default function BrandCreatorsPage() {
  return (
    <DashboardLayout userType="brand">
      <CreatorsContent />
    </DashboardLayout>
  );
}
