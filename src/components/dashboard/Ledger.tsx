'use client';

/**
 * Ledger primitives — the shared vocabulary of every dashboard page.
 * Receipt header, hairline stat strip, status pills, proof-thread
 * progress, empty states. Monochrome by rule; the aurora is the only
 * colour in the room.
 */

import { ReactNode } from 'react';

/* ── formatting ─────────────────────────────────────────────── */

export function formatINR(n: number | undefined | null): string {
  const v = Number(n ?? 0);
  return '₹' + v.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

export function formatCompact(n: number | undefined | null): string {
  const v = Number(n ?? 0);
  if (v >= 10000000) return (v / 10000000).toFixed(1).replace(/\.0$/, '') + 'Cr';
  if (v >= 100000) return (v / 100000).toFixed(1).replace(/\.0$/, '') + 'L';
  if (v >= 1000) return (v / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return String(v);
}

export function toDate(x: any): Date | null {
  if (!x) return null;
  if (typeof x?.toDate === 'function') return x.toDate();
  if (typeof x?._seconds === 'number') return new Date(x._seconds * 1000);
  const d = new Date(x);
  return isNaN(d.getTime()) ? null : d;
}

export function formatDate(x: any): string {
  const d = toDate(x);
  if (!d) return '—';
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

const PLATFORM_NAMES: Record<string, string> = {
  instagram: 'Instagram',
  youtube: 'YouTube',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  twitter: 'Twitter / X',
  linkedin: 'LinkedIn',
  snapchat: 'Snapchat',
  pinterest: 'Pinterest',
};

export function platformName(key: string | undefined | null): string {
  if (!key) return 'Platform';
  return PLATFORM_NAMES[key.toLowerCase()] ?? key.charAt(0).toUpperCase() + key.slice(1);
}

export function receiptStamp(): string {
  return new Date()
    .toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    .toUpperCase();
}

/* ── header ─────────────────────────────────────────────────── */

interface DashHeaderProps {
  /** e.g. "LEDGER · CREATOR" — the receipt line gets the date appended */
  receipt: string;
  /** Title words; wrap the accent word with <Serif> */
  title: ReactNode;
  sub?: ReactNode;
  /** Right-hand slot: key figure or primary action */
  aside?: ReactNode;
}

export function DashHeader({ receipt, title, sub, aside }: DashHeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
        <div className="min-w-0">
          <p className="dash-receipt mb-3">
            {receipt} — {receiptStamp()}
          </p>
          <h1 className="dash-title">{title}</h1>
          {sub && <p className="cine-body mt-2.5 max-w-xl text-[0.94rem]">{sub}</p>}
        </div>
        {aside && <div className="flex items-center gap-3 pb-1">{aside}</div>}
      </div>
      <div className="dash-thread mt-7" aria-hidden />
    </header>
  );
}

/** Instrument Serif italic accent — one word per title. */
export function Serif({ children }: { children: ReactNode }) {
  return <span className="cine-serif">{children}</span>;
}

/* ── stat strip ─────────────────────────────────────────────── */

export interface StatCell {
  label: string;
  value: ReactNode;
  hint?: string;
}

export function StatStrip({ cells }: { cells: StatCell[] }) {
  return (
    <div
      className="dash-card dash-strip overflow-hidden"
      style={{ ['--strip-cols' as string]: cells.length }}
    >
      {cells.map((c) => (
        <div key={c.label}>
          <p className="dash-label mb-2">{c.label}</p>
          <p className="dash-num text-[1.55rem] font-semibold leading-none">{c.value}</p>
          {c.hint && <p className="mt-1.5 text-[0.72rem] text-[#8a899a]">{c.hint}</p>}
        </div>
      ))}
    </div>
  );
}

/* ── status pill ────────────────────────────────────────────── */

const SOLID_STATUSES = new Set(['active', 'live', 'connected', 'verified', 'paid']);

export function StatusPill({ status }: { status: string }) {
  const s = (status || 'unknown').toLowerCase();
  const solid = SOLID_STATUSES.has(s);
  return <span className={solid ? 'dash-pill-solid' : 'dash-pill'}>{s}</span>;
}

/* ── proof progress ─────────────────────────────────────────── */

export function ProofBar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div className="dash-bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className="dash-bar-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

/* ── section title ──────────────────────────────────────────── */

export function SectionTitle({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 mb-4">
      <h2 className="cine-eyebrow">{children}</h2>
      {aside}
    </div>
  );
}

/* ── empty state ────────────────────────────────────────────── */

export function Empty({ title, body, action }: { title: string; body?: string; action?: ReactNode }) {
  return (
    <div className="py-14 px-6 text-center">
      <p
        className="dash-num text-lg font-semibold mb-1.5"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </p>
      {body && <p className="cine-body text-[0.88rem] max-w-sm mx-auto">{body}</p>}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}

/* ── loading state ──────────────────────────────────────────── */

export function LedgerLoading({ label = 'Fetching the ledger' }: { label?: string }) {
  return (
    <div className="min-h-[55vh] flex flex-col items-center justify-center gap-4">
      <div className="spinner" />
      <p className="dash-receipt">{label}</p>
    </div>
  );
}
