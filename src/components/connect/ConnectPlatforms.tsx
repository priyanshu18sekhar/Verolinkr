'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { apiFetch, apiGet } from '@/lib/api/client';
import { StatusPill, formatCompact } from '@/components/dashboard/Ledger';

type ProviderId = 'instagram' | 'facebook' | 'youtube';

interface Platform {
  id: string;
  platformType: string;
  username?: string;
  followers?: number;
  engagement?: number;
  connectionType?: 'live' | 'demo';
  verified?: boolean;
}

const PROVIDERS: { id: ProviderId; label: string }[] = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'facebook', label: 'Facebook' },
];

interface Props {
  /** Where the OAuth round-trip should return to (defaults to current path). */
  returnTo?: string;
  /** Called whenever the connected set changes (e.g. to advance onboarding). */
  onChange?: (count: number) => void;
}

export default function ConnectPlatforms({ returnTo, onChange }: Props) {
  const pathname = usePathname();
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState<ProviderId | null>(null);

  const load = useCallback(async () => {
    try {
      const data = await apiGet<{ platforms: Platform[] }>('/api/creators/me/platforms');
      setPlatforms(data.platforms || []);
      onChange?.(data.platforms?.length || 0);
    } catch {
      setPlatforms([]);
    } finally {
      setLoading(false);
    }
  }, [onChange]);

  useEffect(() => {
    load();
  }, [load]);

  const connect = async (provider: ProviderId) => {
    setConnecting(provider);
    try {
      const res = await apiFetch(`/api/connect/${provider}/start`, {
        method: 'POST',
        body: JSON.stringify({ returnTo: returnTo || pathname || '/creator-dashboard' }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      throw new Error(data.error || 'Could not start connection');
    } catch {
      setConnecting(null);
    }
  };

  const disconnect = async (provider: ProviderId) => {
    const existing = platforms.find((p) => p.platformType === provider);
    if (!existing) return;
    await apiFetch(`/api/creators/me/platforms?platformId=${existing.id}`, { method: 'DELETE' });
    load();
  };

  const byType = (id: ProviderId) => platforms.find((p) => p.platformType === id);

  return (
    <ul>
      {PROVIDERS.map(({ id, label }) => {
        const linked = byType(id);
        const isConnecting = connecting === id;
        return (
          <li
            key={id}
            className="flex items-center justify-between gap-4 border-b border-[rgba(11,11,18,0.06)] py-4 last:border-b-0"
          >
            <div className="flex items-center gap-4 min-w-0">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#08080c] font-mono text-sm font-semibold text-white">
                {label[0]}
              </span>
              <div className="min-w-0 leading-tight">
                <p className="text-[0.95rem] font-semibold text-[#08080c]">{label}</p>
                {linked ? (
                  <p className="mt-0.5 truncate text-xs text-[#8a899a]">
                    {linked.username || 'Connected'} · {formatCompact(linked.followers)} followers
                    {linked.engagement ? ` · ${linked.engagement}% eng` : ''}
                  </p>
                ) : (
                  <p className="mt-0.5 text-xs text-[#8a899a]">Not connected</p>
                )}
              </div>
            </div>

            {loading ? (
              <span className="dash-receipt">…</span>
            ) : linked ? (
              <div className="flex flex-shrink-0 items-center gap-3">
                <StatusPill status={linked.connectionType === 'demo' ? 'demo' : 'connected'} />
                <button
                  onClick={() => disconnect(id)}
                  className="dash-label cursor-pointer transition-colors hover:text-[#08080c]"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={() => connect(id)}
                disabled={isConnecting}
                className="cine-btn flex-shrink-0 !px-4 !py-2 !text-[0.82rem] disabled:opacity-60"
              >
                {isConnecting ? 'Connecting…' : 'Connect'}
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
