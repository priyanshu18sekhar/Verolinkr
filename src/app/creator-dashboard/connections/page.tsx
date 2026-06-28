'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import FloatingNav from '../../../components/ui/FloatingNav';
import ConnectPlatforms from '@/components/connect/ConnectPlatforms';

function ConnectionsContent() {
  const searchParams = useSearchParams();
  const [count, setCount] = useState(0);
  const connected = searchParams.get('connected');
  const mode = searchParams.get('mode');
  const [banner, setBanner] = useState<string | null>(null);

  useEffect(() => {
    if (connected) {
      setBanner(
        `${connected[0].toUpperCase()}${connected.slice(1)} connected${
          mode === 'demo' ? ' in demo mode' : ''
        }.`
      );
      const t = setTimeout(() => setBanner(null), 6000);
      return () => clearTimeout(t);
    }
  }, [connected, mode]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <div className="mx-auto w-full max-w-[1100px] px-6 py-12 lg:px-10">
        <span className="vl-eyebrow">Your platforms</span>
        <h1 className="vl-display mt-3 text-4xl text-[var(--vl-ink)] md:text-5xl">
          Connect once, earn everywhere
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--vl-muted)]">
          Link Instagram, YouTube and Facebook so VeroLinkr can verify your real
          reach. Brands discover you by verified audience — connection is
          read-only and we never post on your behalf.
        </p>

        {banner && (
          <div
            className="vl-tag mt-6"
            style={{ background: 'var(--vl-mint-soft)', color: 'var(--vl-mint-ink)' }}
          >
            {banner}
          </div>
        )}

        <div className="vl-card mt-8 p-6 md:p-8">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="vl-display text-xl text-[var(--vl-ink)]">Connected accounts</h2>
            <span className="text-sm text-[var(--vl-muted)]">{count} linked</span>
          </div>
          <ConnectPlatforms returnTo="/creator-dashboard/connections" onChange={setCount} />
        </div>

        <div className="vl-card mt-6 p-6 md:p-8">
          <h2 className="vl-display text-xl text-[var(--vl-ink)]">How verification works</h2>
          <ol className="mt-4 space-y-3 text-sm text-[var(--vl-muted)]">
            <li>
              <span className="vl-mono text-[var(--vl-indigo)]">01</span> &nbsp;Connect a
              platform — we read your public profile and audience stats.
            </li>
            <li>
              <span className="vl-mono text-[var(--vl-indigo)]">02</span> &nbsp;Your reach is
              sealed as <strong>verified</strong> and shown to matched brands.
            </li>
            <li>
              <span className="vl-mono text-[var(--vl-indigo)]">03</span> &nbsp;You earn per
              verified view, paid into your connected bank account.
            </li>
          </ol>
        </div>
      </div>

      <FloatingNav userType="creator" />
    </motion.div>
  );
}

export default function CreatorConnections() {
  return (
    <DashboardLayout userType="creator" userName="Creator" userEmail="">
      <ConnectionsContent />
    </DashboardLayout>
  );
}
