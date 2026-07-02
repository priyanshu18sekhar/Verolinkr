'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { apiGet, apiPost } from '@/lib/api/client';
import {
  DashHeader,
  Serif,
  StatusPill,
  Empty,
  LedgerLoading,
  formatINR,
} from '@/components/dashboard/Ledger';
import { XMarkIcon, PlusIcon, StarIcon } from '@heroicons/react/24/outline';
import type { Gig, GigPackage } from '@/types/gig';

const CATEGORIES = ['Instagram', 'YouTube', 'Facebook', 'UGC', 'Review', 'Other'];

/** Lowest package price, tolerant of partial/legacy package shapes. */
function fromPrice(gig: Gig): number {
  const packagePrices = Object.values(gig.packages ?? {})
    .map((p) => Number((p as Partial<GigPackage>)?.price))
    .filter((n) => !isNaN(n) && n > 0);
  if (packagePrices.length) return Math.min(...packagePrices);
  return Number(gig.price) || 0;
}

function GigCard({ gig, mine }: { gig: Gig; mine: boolean }) {
  const packages = (
    Object.entries(gig.packages ?? {}).filter(
      ([, p]) => p && typeof p === 'object'
    ) as [string, Partial<GigPackage>][]
  ).sort(([, a], [, b]) => (Number(a.price) || 0) - (Number(b.price) || 0));

  return (
    <article className="dash-card flex flex-col p-6">
      <div className="mb-3 flex items-start justify-between gap-3">
        <p className="dash-label">{gig.category || 'Gig'}</p>
        {mine ? (
          <StatusPill status={gig.status || 'active'} />
        ) : (
          <span className="dash-pill">
            <StarIcon className="h-3 w-3" /> {gig.rating || '—'} · {gig.orders || 0} orders
          </span>
        )}
      </div>

      <h3
        className="dash-num mb-2 text-xl font-semibold leading-snug"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {gig.title}
      </h3>
      {!mine && <p className="mb-1 text-xs text-[#8a899a]">by {gig.creator || 'Verified creator'}</p>}
      {gig.description && (
        <p className="cine-body mb-5 line-clamp-2 text-[0.86rem]">{gig.description}</p>
      )}

      {packages.length > 0 && (
        <ul className="mb-5 space-y-2">
          {packages.slice(0, 3).map(([key, p]) => (
            <li
              key={key}
              className="flex items-baseline justify-between border-b border-[rgba(11,11,18,0.05)] pb-2 last:border-b-0"
            >
              <span className="text-[0.82rem] text-[#46455a]">
                {p.name || key}
                {p.delivery ? <span className="text-[#8a899a]"> · {p.delivery}d</span> : null}
              </span>
              <span className="dash-num text-[0.85rem] font-semibold">{formatINR(Number(p.price) || 0)}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex items-baseline justify-between border-t border-[rgba(11,11,18,0.07)] pt-4">
        <p className="dash-label">From</p>
        <p className="dash-num text-lg font-semibold">{formatINR(fromPrice(gig))}</p>
      </div>
    </article>
  );
}

function CreateGigModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [delivery, setDelivery] = useState('5');
  const [features, setFeatures] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!title.trim() || !Number(price)) {
      setError('A title and a price are required.');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const pkg = {
        name: 'Standard',
        price: Number(price),
        delivery: Number(delivery) || 5,
        revisions: 1,
        features: features
          .split('\n')
          .map((f) => f.trim())
          .filter(Boolean),
      };
      await apiPost('/api/gigs', {
        title: title.trim(),
        category,
        description: description.trim(),
        price: Number(price),
        packages: { basic: pkg, standard: pkg, premium: pkg },
        status: 'active',
        images: [],
        faqs: [],
      });
      onCreated();
      onClose();
    } catch (e: any) {
      setError(e.message || 'Could not publish the gig. Try again.');
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
        aria-label="Publish a gig"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="dash-receipt mb-1.5">New listing</p>
            <h3 className="dash-title !text-2xl">
              Publish a <Serif>gig</Serif>
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
              placeholder="Dedicated Instagram reel review"
              className="dash-input"
            />
          </div>
          <div>
            <p className="dash-label mb-2">Category</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={category === c ? 'dash-pill-solid' : 'dash-pill cursor-pointer hover:border-[#08080c]'}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="dash-label mb-2">Description</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="What does the buyer get?"
              className="dash-input resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="dash-label mb-2">Price (₹)</p>
              <input
                type="number"
                min={1}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="8000"
                className="dash-input dash-num"
              />
            </div>
            <div>
              <p className="dash-label mb-2">Delivery (days)</p>
              <input
                type="number"
                min={1}
                value={delivery}
                onChange={(e) => setDelivery(e.target.value)}
                className="dash-input dash-num"
              />
            </div>
          </div>
          <div>
            <p className="dash-label mb-2">What's included · one per line</p>
            <textarea
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              rows={3}
              placeholder={'1 reel\n1 revision\nusage rights'}
              className="dash-input resize-none"
            />
          </div>
        </div>

        {error && <p className="mt-4 text-sm font-medium text-[#08080c]">{error}</p>}

        <button onClick={submit} disabled={busy} className="cine-btn mt-6 w-full disabled:opacity-50">
          {busy ? 'Publishing…' : 'Publish gig'}
        </button>
      </motion.div>
    </motion.div>
  );
}

function GigsContent() {
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'mine' | 'marketplace'>('mine');
  const [mine, setMine] = useState<Gig[]>([]);
  const [marketplace, setMarketplace] = useState<Gig[]>([]);
  const [showCreate, setShowCreate] = useState(false);

  const load = async () => {
    const [my, mp] = await Promise.allSettled([
      apiGet<{ gigs: Gig[] }>('/api/gigs'),
      apiGet<{ gigs: Gig[] }>('/api/gigs?type=marketplace'),
    ]);
    if (my.status === 'fulfilled') setMine(my.value.gigs ?? []);
    if (mp.status === 'fulfilled') setMarketplace(mp.value.gigs ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <LedgerLoading label="Opening the gig board" />;

  const shown = tab === 'mine' ? mine : marketplace;

  return (
    <div className="dash-shell">
      <DashHeader
        receipt={`Ledger · Gigs · ${mine.length} listed`}
        title={
          <>
            Fixed-price work, <Serif>listed</Serif>.
          </>
        }
        sub="Package your content as gigs with set prices — brands buy directly, you deliver on your terms."
        aside={
          <button onClick={() => setShowCreate(true)} className="cine-btn !px-5 !py-2.5 !text-[0.85rem]">
            <PlusIcon className="h-4 w-4" /> New gig
          </button>
        }
      />

      <div className="dash-tabs mb-6">
        <button className="dash-tab" data-active={tab === 'mine'} onClick={() => setTab('mine')}>
          My gigs · {mine.length}
        </button>
        <button className="dash-tab" data-active={tab === 'marketplace'} onClick={() => setTab('marketplace')}>
          Marketplace · {marketplace.length}
        </button>
      </div>

      {shown.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {shown.map((g) => (
            <GigCard key={g.id} gig={g} mine={tab === 'mine'} />
          ))}
        </div>
      ) : (
        <div className="dash-card">
          <Empty
            title={tab === 'mine' ? 'No gigs listed yet' : 'The marketplace is quiet'}
            body={
              tab === 'mine'
                ? 'Publish your first gig — a fixed-price package brands can buy in one click.'
                : 'Gigs from verified creators appear here as they publish.'
            }
            action={
              tab === 'mine' ? (
                <button onClick={() => setShowCreate(true)} className="cine-btn-ghost !text-[0.85rem]">
                  <PlusIcon className="h-4 w-4" /> Publish a gig
                </button>
              ) : undefined
            }
          />
        </div>
      )}

      <AnimatePresence>
        {showCreate && <CreateGigModal onClose={() => setShowCreate(false)} onCreated={load} />}
      </AnimatePresence>
    </div>
  );
}

export default function CreatorGigsPage() {
  return (
    <DashboardLayout userType="creator">
      <GigsContent />
    </DashboardLayout>
  );
}
