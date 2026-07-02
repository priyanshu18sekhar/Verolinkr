'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ConnectPlatforms from '@/components/connect/ConnectPlatforms';
import { DashHeader, Serif, SectionTitle } from '@/components/dashboard/Ledger';

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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
      <div className="dash-shell">
        <DashHeader
          receipt={`Ledger · Connections · ${count} linked`}
          title={
            <>
              Connect once, earn <Serif>everywhere</Serif>.
            </>
          }
          sub="Link Instagram, YouTube and Facebook so VeroLinkr can verify your real reach. Connection is read-only — we never post on your behalf."
        />

        {banner && (
          <div className="dash-card mb-6 px-6 py-4">
            <p className="text-sm font-medium text-[#08080c]">{banner}</p>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-5">
          <section className="dash-card p-6 lg:col-span-3">
            <SectionTitle aside={<span className="dash-receipt">{count} linked</span>}>
              Connected accounts
            </SectionTitle>
            <ConnectPlatforms returnTo="/creator-dashboard/connections" onChange={setCount} />
          </section>

          <section className="dash-card p-6 lg:col-span-2">
            <SectionTitle>How verification works</SectionTitle>
            <ol className="space-y-5 pt-1">
              {[
                'Connect a platform — we read your public profile and audience stats.',
                'Your reach is sealed as verified and shown to matched brands.',
                'You earn per verified view, paid into your connected bank account.',
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="dash-num flex-shrink-0 text-lg font-semibold text-[#c9c8d4]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="cine-body pt-0.5 text-[0.88rem]">{step}</p>
                </li>
              ))}
            </ol>
            <div className="dash-thread mt-7" aria-hidden />
            <p className="dash-receipt mt-4">Read-only · revocable anytime</p>
          </section>
        </div>
      </div>
    </motion.div>
  );
}

export default function CreatorConnections() {
  return (
    <DashboardLayout userType="creator">
      <Suspense fallback={null}>
        <ConnectionsContent />
      </Suspense>
    </DashboardLayout>
  );
}
