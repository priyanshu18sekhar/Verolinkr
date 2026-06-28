'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { apiFetch, apiGet } from '@/lib/api/client';

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

const PROVIDERS: { id: ProviderId; label: string; tint: string }[] = [
  { id: 'instagram', label: 'Instagram', tint: '#ff5436' },
  { id: 'youtube', label: 'YouTube', tint: '#ff2f2f' },
  { id: 'facebook', label: 'Facebook', tint: '#4f2bff' },
];

function fmt(n?: number) {
  if (!n) return '0';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${n}`;
}

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
    <div className="space-y-3">
      {PROVIDERS.map(({ id, label, tint }) => {
        const linked = byType(id);
        const isConnecting = connecting === id;
        return (
          <div
            key={id}
            className="flex items-center justify-between rounded-xl border border-[var(--vl-line)] bg-[var(--vl-paper)] px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold text-white"
                style={{ background: tint }}
              >
                {label[0]}
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-[var(--vl-ink)]">{label}</p>
                {linked ? (
                  <p className="text-xs text-[var(--vl-muted)]">
                    {linked.username || 'Connected'} · {fmt(linked.followers)} followers
                  </p>
                ) : (
                  <p className="text-xs text-[var(--vl-muted)]">Not connected</p>
                )}
              </div>
            </div>

            {loading ? (
              <span className="text-xs text-[var(--vl-muted)]">…</span>
            ) : linked ? (
              <div className="flex items-center gap-2">
                <span
                  className="vl-tag"
                  style={
                    linked.connectionType === 'demo'
                      ? { background: 'var(--vl-indigo-soft)', color: 'var(--vl-indigo-ink)' }
                      : undefined
                  }
                >
                  {linked.connectionType === 'demo' ? 'Demo' : 'Live'}
                </span>
                <button
                  onClick={() => disconnect(id)}
                  className="text-xs font-medium text-[var(--vl-muted)] hover:text-[var(--vl-coral)]"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={() => connect(id)}
                disabled={isConnecting}
                className="vl-btn vl-btn-primary !px-4 !py-2 !text-sm disabled:opacity-60"
              >
                {isConnecting ? 'Connecting…' : 'Connect'}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
