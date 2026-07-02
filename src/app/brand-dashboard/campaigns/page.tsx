'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { apiGet, apiPost, apiPatch, apiDelete } from '@/lib/api/client';
import { fundCampaignWithRazorpay } from '@/lib/payments/checkout';
import { useUser } from '@/contexts/UserContext';
import {
  DashHeader,
  Serif,
  StatusPill,
  ProofBar,
  Empty,
  LedgerLoading,
  formatINR,
  formatCompact,
  formatDate,
} from '@/components/dashboard/Ledger';
import { XMarkIcon, PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Campaign {
  id: string;
  title: string;
  description?: string;
  status?: string;
  budget?: number;
  cpv?: number;
  views?: number;
  creatorsJoined?: number;
  startDate?: any;
  endDate?: any;
  funded?: boolean;
}

const STATUS_FILTERS = ['all', 'active', 'draft', 'completed'] as const;

function estimatedSpend(c: Campaign): number {
  const byViews = Number(c.views ?? 0) * Number(c.cpv ?? 0);
  return Math.min(byViews, Number(c.budget ?? byViews));
}

function CreateCampaignModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [cpv, setCpv] = useState('0.40');
  const [endDate, setEndDate] = useState('');
  const [launch, setLaunch] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!title.trim() || !Number(budget)) {
      setError('A title and a budget are required.');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await apiPost('/api/campaigns', {
        title: title.trim(),
        description: description.trim(),
        budget: Number(budget),
        cpv: Number(cpv) || 0,
        status: launch ? 'active' : 'draft',
        startDate: new Date().toISOString(),
        endDate: endDate ? new Date(endDate).toISOString() : undefined,
      });
      onCreated();
      onClose();
    } catch (e: any) {
      setError(e.message || 'Could not create the campaign. Try again.');
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
        className="dash-card max-h-[90vh] w-full max-w-lg overflow-y-auto !bg-white/95 p-7"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Create campaign"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="dash-receipt mb-1.5">New campaign</p>
            <h3 className="dash-title !text-2xl">
              Buy <Serif>verified</Serif> views
            </h3>
          </div>
          <button onClick={onClose} className="dash-icon-btn" aria-label="Close">
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="dash-label mb-2">Title</p>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Wave Buds launch — CPV"
              className="dash-input"
              autoFocus
            />
          </div>
          <div>
            <p className="dash-label mb-2">Brief for creators</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="What should the content do? Hook, tone, must-mentions."
              className="dash-input resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="dash-label mb-2">Budget (₹)</p>
              <input
                type="number"
                min={1}
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="50000"
                className="dash-input dash-num"
              />
            </div>
            <div>
              <p className="dash-label mb-2">CPV (₹ per view)</p>
              <input
                type="number"
                step="0.05"
                min={0}
                value={cpv}
                onChange={(e) => setCpv(e.target.value)}
                className="dash-input dash-num"
              />
            </div>
          </div>
          <div>
            <p className="dash-label mb-2">Runs till</p>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="dash-input dash-num"
            />
          </div>
          {Number(budget) > 0 && Number(cpv) > 0 && (
            <p className="dash-receipt">
              ≈ {formatCompact(Math.round(Number(budget) / Number(cpv)))} verified views at this CPV
            </p>
          )}
          <div className="flex items-center justify-between border-t border-[rgba(11,11,18,0.07)] pt-4">
            <div>
              <p className="text-sm font-semibold text-[#08080c]">Launch immediately</p>
              <p className="text-xs text-[#8a899a]">Off saves it as a draft.</p>
            </div>
            <button
              onClick={() => setLaunch(!launch)}
              className="dash-switch"
              data-on={launch}
              role="switch"
              aria-checked={launch}
              aria-label="Launch immediately"
            />
          </div>
        </div>

        {error && <p className="mt-4 text-sm font-medium text-[#08080c]">{error}</p>}

        <button onClick={submit} disabled={busy} className="cine-btn mt-6 w-full disabled:opacity-50">
          {busy ? 'Creating…' : launch ? 'Launch campaign' : 'Save draft'}
        </button>
      </motion.div>
    </motion.div>
  );
}

function CampaignRow({
  c,
  onChanged,
}: {
  c: Campaign;
  onChanged: () => void;
}) {
  const { profile, userEmail } = useUser();
  const [busy, setBusy] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const spent = estimatedSpend(c);

  const fund = async () => {
    setBusy(true);
    setPayError(null);
    await fundCampaignWithRazorpay({
      campaignId: c.id,
      campaignTitle: c.title,
      brandName: profile?.companyName,
      email: profile?.businessEmail ?? userEmail,
      onSuccess: () => {
        setBusy(false);
        onChanged();
      },
      onError: (message) => {
        setBusy(false);
        setPayError(message);
      },
      onDismiss: () => setBusy(false),
    });
  };

  const setStatus = async (status: string) => {
    setBusy(true);
    try {
      await apiPatch(`/api/campaigns/${c.id}`, { status });
      onChanged();
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    setBusy(true);
    try {
      await apiDelete(`/api/campaigns/${c.id}`);
      onChanged();
    } finally {
      setBusy(false);
    }
  };

  return (
    <article className="dash-card p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-3">
            <h3 className="dash-num text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
              {c.title}
            </h3>
            <StatusPill status={c.status || 'draft'} />
            {c.funded && <span className="dash-pill-solid">funded</span>}
          </div>
          {c.description && <p className="cine-body mb-3 line-clamp-1 text-[0.85rem]">{c.description}</p>}
          <p className="dash-receipt !text-[0.56rem]">
            {c.startDate ? `${formatDate(c.startDate)} — ${formatDate(c.endDate)}` : 'Not scheduled'}
            {c.cpv ? ` · ₹${c.cpv}/view` : ''} · {c.creatorsJoined ?? 0} creators
          </p>
        </div>

        <div className="grid grid-cols-3 gap-x-8 text-right">
          <div>
            <p className="dash-label mb-1">Budget</p>
            <p className="dash-num text-[1.05rem] font-semibold">{formatINR(c.budget)}</p>
          </div>
          <div>
            <p className="dash-label mb-1">Est. spend</p>
            <p className="dash-num text-[1.05rem] font-semibold">{formatINR(spent)}</p>
          </div>
          <div>
            <p className="dash-label mb-1">Views</p>
            <p className="dash-num text-[1.05rem] font-semibold">{formatCompact(c.views)}</p>
          </div>
        </div>
      </div>

      {c.status === 'active' && (
        <div className="mt-4">
          <ProofBar value={spent} max={Number(c.budget ?? 1)} />
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[rgba(11,11,18,0.06)] pt-4">
        {!c.funded && (c.status === 'active' || c.status === 'draft') && Number(c.budget) > 0 && (
          <button onClick={fund} disabled={busy} className="dash-pill-solid cursor-pointer disabled:opacity-50">
            {busy ? 'Opening payment…' : `Fund ${formatINR(c.budget)}`}
          </button>
        )}
        {c.status === 'active' && (
          <button onClick={() => setStatus('paused')} disabled={busy} className="dash-pill cursor-pointer hover:border-[#08080c] disabled:opacity-50">
            Pause
          </button>
        )}
        {(c.status === 'draft' || c.status === 'paused') && (
          <button onClick={() => setStatus('active')} disabled={busy} className="dash-pill-solid cursor-pointer disabled:opacity-50">
            {c.status === 'draft' ? 'Launch' : 'Resume'}
          </button>
        )}
        {c.status === 'active' && (
          <button onClick={() => setStatus('completed')} disabled={busy} className="dash-pill cursor-pointer hover:border-[#08080c] disabled:opacity-50">
            Mark complete
          </button>
        )}
        {c.status === 'draft' && (
          <button onClick={remove} disabled={busy} className="dash-label ml-auto cursor-pointer transition-colors hover:text-[#08080c] disabled:opacity-50">
            Delete draft
          </button>
        )}
      </div>
      {payError && <p className="mt-3 text-sm font-medium text-[#08080c]">{payError}</p>}
    </article>
  );
}

function CampaignsContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filter, setFilter] = useState<(typeof STATUS_FILTERS)[number]>('all');
  const [query, setQuery] = useState('');
  const [showCreate, setShowCreate] = useState(searchParams.get('create') === '1');

  const load = async () => {
    try {
      const data = await apiGet<{ campaigns: Campaign[] }>('/api/campaigns');
      setCampaigns(data.campaigns ?? []);
    } catch {
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const shown = useMemo(() => {
    let list = campaigns;
    if (filter !== 'all') list = list.filter((c) => (c.status ?? 'draft') === filter);
    const q = query.trim().toLowerCase();
    if (q) list = list.filter((c) => c.title?.toLowerCase().includes(q));
    return list;
  }, [campaigns, filter, query]);

  if (loading) return <LedgerLoading label="Fetching your campaigns" />;

  const liveBudget = campaigns
    .filter((c) => c.status === 'active')
    .reduce((s, c) => s + Number(c.budget ?? 0), 0);

  return (
    <div className="dash-shell">
      <DashHeader
        receipt={`Ledger · Campaigns · ${campaigns.length} total`}
        title={
          <>
            Campaigns, <Serif>accounted</Serif>.
          </>
        }
        sub="Create, launch and settle campaigns — spend maps to verified views, never impressions."
        aside={
          <div className="text-right">
            <p className="dash-label mb-1">Live budget</p>
            <p className="dash-num text-3xl font-semibold leading-none">{formatINR(liveBudget)}</p>
            <button onClick={() => setShowCreate(true)} className="cine-btn mt-3 !px-5 !py-2.5 !text-[0.85rem]">
              <PlusIcon className="h-4 w-4" /> New campaign
            </button>
          </div>
        }
      />

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="dash-tabs !border-b-0">
          {STATUS_FILTERS.map((f) => (
            <button key={f} className="dash-tab" data-active={filter === f} onClick={() => setFilter(f)}>
              {f}
              {f !== 'all' ? ` · ${campaigns.filter((c) => (c.status ?? 'draft') === f).length}` : ''}
            </button>
          ))}
        </div>
        <div className="relative ml-auto w-full max-w-xs">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a899a]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search campaigns…"
            className="dash-input !pl-11"
            aria-label="Search campaigns"
          />
        </div>
      </div>

      {shown.length ? (
        <div className="space-y-4">
          {shown.map((c) => (
            <CampaignRow key={c.id} c={c} onChanged={load} />
          ))}
        </div>
      ) : (
        <div className="dash-card">
          <Empty
            title={campaigns.length ? 'No matches' : 'No campaigns yet'}
            body={
              campaigns.length
                ? 'Adjust the filter or search.'
                : 'Launch your first campaign — set a budget and a CPV, creators do the rest.'
            }
            action={
              !campaigns.length ? (
                <button onClick={() => setShowCreate(true)} className="cine-btn-ghost !text-[0.85rem]">
                  <PlusIcon className="h-4 w-4" /> Create campaign
                </button>
              ) : undefined
            }
          />
        </div>
      )}

      <AnimatePresence>
        {showCreate && <CreateCampaignModal onClose={() => setShowCreate(false)} onCreated={load} />}
      </AnimatePresence>
    </div>
  );
}

export default function BrandCampaignsPage() {
  return (
    <DashboardLayout userType="brand">
      <Suspense fallback={null}>
        <CampaignsContent />
      </Suspense>
    </DashboardLayout>
  );
}
