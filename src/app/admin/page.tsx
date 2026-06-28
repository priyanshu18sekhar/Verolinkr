'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';
import { apiGet, apiPatch } from '@/lib/api/client';

type Tab = 'overview' | 'creators' | 'brands' | 'campaigns' | 'payouts';

interface Counts {
  creators: number;
  brands: number;
  campaigns: number;
  pendingCreators: number;
  pendingKyc: number;
  verifiedBrands: number;
  connectedPlatforms: number;
}

const statusTint: Record<string, { bg: string; fg: string }> = {
  approved: { bg: 'var(--vl-mint-soft)', fg: 'var(--vl-mint-ink)' },
  verified: { bg: 'var(--vl-mint-soft)', fg: 'var(--vl-mint-ink)' },
  paid: { bg: 'var(--vl-mint-soft)', fg: 'var(--vl-mint-ink)' },
  pending: { bg: 'var(--vl-indigo-soft)', fg: 'var(--vl-indigo-ink)' },
  rejected: { bg: '#ffe2dc', fg: '#b5341c' },
  suspended: { bg: '#ffe2dc', fg: '#b5341c' },
};

function Pill({ value }: { value: string }) {
  const t = statusTint[value] ?? statusTint.pending;
  return (
    <span className="vl-tag" style={{ background: t.bg, color: t.fg }}>
      {value}
    </span>
  );
}

export default function AdminConsole() {
  const { isAuthenticated, loading } = useUser();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [tab, setTab] = useState<Tab>('overview');

  const [counts, setCounts] = useState<Counts | null>(null);
  const [creators, setCreators] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [payouts, setPayouts] = useState<any[]>([]);

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      setChecking(false);
      return;
    }
    apiGet<{ isAdmin: boolean }>('/api/admin/me')
      .then((r) => setIsAdmin(r.isAdmin))
      .catch(() => setIsAdmin(false))
      .finally(() => setChecking(false));
  }, [loading, isAuthenticated]);

  const loadOverview = useCallback(async () => {
    const r = await apiGet<{ counts: Counts }>('/api/admin/overview');
    setCounts(r.counts);
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    loadOverview().catch(() => {});
  }, [isAdmin, loadOverview]);

  useEffect(() => {
    if (!isAdmin) return;
    if (tab === 'creators') apiGet<{ creators: any[] }>('/api/admin/creators').then((r) => setCreators(r.creators)).catch(() => {});
    if (tab === 'brands') apiGet<{ brands: any[] }>('/api/admin/brands').then((r) => setBrands(r.brands)).catch(() => {});
    if (tab === 'campaigns') apiGet<{ campaigns: any[] }>('/api/admin/campaigns').then((r) => setCampaigns(r.campaigns)).catch(() => {});
    if (tab === 'payouts') apiGet<{ payouts: any[] }>('/api/admin/payouts').then((r) => setPayouts(r.payouts)).catch(() => {});
  }, [tab, isAdmin]);

  const setPayoutStatus = async (creatorId: string, payoutId: string, status: string) => {
    await apiPatch('/api/admin/payouts', { creatorId, payoutId, status });
    setPayouts((ps) => ps.map((p) => (p.id === payoutId ? { ...p, status } : p)));
  };

  const setCreatorStatus = async (id: string, status: string) => {
    await apiPatch('/api/admin/creators', { id, status });
    setCreators((cs) => cs.map((c) => (c.id === id ? { ...c, status } : c)));
    loadOverview().catch(() => {});
  };
  const setBrandKyc = async (id: string, kycStatus: string) => {
    await apiPatch('/api/admin/brands', { id, kycStatus, verified: kycStatus === 'approved' });
    setBrands((bs) => bs.map((b) => (b.id === id ? { ...b, kycStatus, verified: kycStatus === 'approved' } : b)));
    loadOverview().catch(() => {});
  };

  if (loading || checking) {
    return <Centered>Checking access…</Centered>;
  }
  if (!isAuthenticated) {
    return (
      <Centered>
        <p className="mb-4 text-[var(--vl-muted)]">Please sign in to continue.</p>
        <Link href="/auth?redirect=/admin" className="vl-btn vl-btn-primary">Sign in</Link>
      </Centered>
    );
  }
  if (!isAdmin) {
    return (
      <Centered>
        <h1 className="vl-display text-3xl text-[var(--vl-ink)]">Access restricted</h1>
        <p className="mt-3 max-w-md text-[var(--vl-muted)]">
          This area is for VeroLinkr administrators. Add your email to{' '}
          <code className="vl-mono">ADMIN_EMAILS</code> or set your profile role to{' '}
          <code className="vl-mono">admin</code> to get in.
        </p>
        <Link href="/" className="vl-btn vl-btn-ghost mt-6">Back to site</Link>
      </Centered>
    );
  }

  const tabs: Tab[] = ['overview', 'creators', 'brands', 'campaigns', 'payouts'];

  return (
    <div className="min-h-screen bg-[var(--vl-mist)]">
      {/* top bar */}
      <header className="sticky top-0 z-20 border-b border-[var(--vl-line)] bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <span className="vl-display text-lg text-[var(--vl-ink)]">
              Vero<span className="text-[var(--vl-indigo)]">Linkr</span>
            </span>
            <span className="vl-tag">Admin</span>
          </div>
          <Link href="/" className="text-sm text-[var(--vl-muted)] hover:text-[var(--vl-ink)]">
            Exit console
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="vl-display text-4xl text-[var(--vl-ink)]">Control center</h1>
        <p className="mt-2 text-[var(--vl-muted)]">Manage creators, brands, campaigns and approvals.</p>

        {/* tabs */}
        <div className="mt-8 flex gap-1 rounded-full border border-[var(--vl-line)] bg-white p-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${
                tab === t ? 'bg-[var(--vl-ink)] text-white' : 'text-[var(--vl-muted)] hover:text-[var(--vl-ink)]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === 'overview' && <Overview counts={counts} />}
          {tab === 'creators' && (
            <Table
              head={['Creator', 'Handle', 'Platforms', 'Status', 'Actions']}
              rows={creators.map((c) => (
                <tr key={c.id} className="border-t border-[var(--vl-line)]">
                  <Td>
                    <p className="font-semibold text-[var(--vl-ink)]">{c.fullName}</p>
                    <p className="text-xs text-[var(--vl-muted)]">{c.email}</p>
                  </Td>
                  <Td>{c.handle || '—'}</Td>
                  <Td>{c.platformsLinked}</Td>
                  <Td><Pill value={c.status} /></Td>
                  <Td>
                    <div className="flex gap-2">
                      <Action onClick={() => setCreatorStatus(c.id, 'approved')} tone="mint">Approve</Action>
                      <Action onClick={() => setCreatorStatus(c.id, 'suspended')} tone="coral">Suspend</Action>
                    </div>
                  </Td>
                </tr>
              ))}
              empty="No creators yet."
            />
          )}
          {tab === 'brands' && (
            <Table
              head={['Brand', 'Industry', 'KYC', 'Verified', 'Actions']}
              rows={brands.map((b) => (
                <tr key={b.id} className="border-t border-[var(--vl-line)]">
                  <Td>
                    <p className="font-semibold text-[var(--vl-ink)]">{b.companyName}</p>
                    <p className="text-xs text-[var(--vl-muted)]">{b.businessEmail}</p>
                  </Td>
                  <Td>{b.industry || '—'}</Td>
                  <Td><Pill value={b.kycStatus} /></Td>
                  <Td>{b.verified ? <Pill value="verified" /> : <span className="text-[var(--vl-muted)]">—</span>}</Td>
                  <Td>
                    <div className="flex gap-2">
                      <Action onClick={() => setBrandKyc(b.id, 'approved')} tone="mint">Approve KYC</Action>
                      <Action onClick={() => setBrandKyc(b.id, 'rejected')} tone="coral">Reject</Action>
                    </div>
                  </Td>
                </tr>
              ))}
              empty="No brands yet."
            />
          )}
          {tab === 'campaigns' && (
            <Table
              head={['Campaign', 'Brand', 'Budget', 'Status']}
              rows={campaigns.map((c) => (
                <tr key={c.id} className="border-t border-[var(--vl-line)]">
                  <Td><span className="font-semibold text-[var(--vl-ink)]">{c.title}</span></Td>
                  <Td>{c.brandName}</Td>
                  <Td>{c.budget ? `$${Number(c.budget).toLocaleString()}` : '—'}</Td>
                  <Td><Pill value={c.status} /></Td>
                </tr>
              ))}
              empty="No campaigns yet."
            />
          )}
          {tab === 'payouts' && (
            <Table
              head={['Creator', 'Amount', 'Status', 'Actions']}
              rows={payouts.map((p) => (
                <tr key={p.id} className="border-t border-[var(--vl-line)]">
                  <Td>
                    <p className="font-semibold text-[var(--vl-ink)]">{p.creatorName || p.creatorId}</p>
                  </Td>
                  <Td><span className="vl-mono">${Number(p.amount || 0).toLocaleString()}</span></Td>
                  <Td><Pill value={p.status} /></Td>
                  <Td>
                    <div className="flex gap-2">
                      <Action onClick={() => setPayoutStatus(p.creatorId, p.id, 'paid')} tone="mint">Mark paid</Action>
                      <Action onClick={() => setPayoutStatus(p.creatorId, p.id, 'rejected')} tone="coral">Reject</Action>
                    </div>
                  </Td>
                </tr>
              ))}
              empty="No payout requests yet."
            />
          )}
        </div>
      </div>
    </div>
  );
}

function Overview({ counts }: { counts: Counts | null }) {
  const cards = [
    { label: 'Creators', value: counts?.creators, sub: `${counts?.pendingCreators ?? 0} pending review` },
    { label: 'Brands', value: counts?.brands, sub: `${counts?.verifiedBrands ?? 0} verified` },
    { label: 'Campaigns', value: counts?.campaigns, sub: 'across all brands' },
    { label: 'Pending KYC', value: counts?.pendingKyc, sub: 'awaiting approval' },
    { label: 'Connected platforms', value: counts?.connectedPlatforms, sub: 'IG · YT · FB' },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c) => (
        <div key={c.label} className="vl-card p-6">
          <p className="text-sm text-[var(--vl-muted)]">{c.label}</p>
          <p className="vl-display mt-2 text-4xl text-[var(--vl-ink)]">
            {c.value ?? '—'}
          </p>
          <p className="mt-1 text-xs text-[var(--vl-muted)]">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}

function Table({ head, rows, empty }: { head: string[]; rows: React.ReactNode[]; empty: string }) {
  return (
    <div className="vl-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-[var(--vl-mist)]">
              {head.map((h) => (
                <th key={h} className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--vl-muted)]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <tr>
                <td colSpan={head.length} className="px-5 py-10 text-center text-[var(--vl-muted)]">
                  {empty}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-5 py-4 align-middle text-[var(--vl-ink)]">{children}</td>;
}

function Action({ children, onClick, tone }: { children: React.ReactNode; onClick: () => void; tone: 'mint' | 'coral' }) {
  const styles =
    tone === 'mint'
      ? { background: 'var(--vl-mint-soft)', color: 'var(--vl-mint-ink)' }
      : { background: '#ffe2dc', color: '#b5341c' };
  return (
    <button
      onClick={onClick}
      className="rounded-full px-3 py-1.5 text-xs font-semibold transition-transform hover:-translate-y-0.5"
      style={styles}
    >
      {children}
    </button>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--vl-mist)] px-6 text-center">
      {children}
    </div>
  );
}
