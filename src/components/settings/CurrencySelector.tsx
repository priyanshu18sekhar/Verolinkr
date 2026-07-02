'use client';

import { useCurrency } from '@/contexts/CurrencyContext';

export default function CurrencySelector() {
  const { currency, setCurrency, symbol } = useCurrency();

  return (
    <div>
      <p className="dash-label mb-3">Currency</p>
      <button
        onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
        className="flex w-full items-center justify-between rounded-2xl border border-[rgba(11,11,18,0.12)] bg-white/60 px-4 py-3.5 transition-colors hover:border-[rgba(11,11,18,0.4)]"
      >
        <div className="text-left">
          <p className="dash-num text-sm font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
            {currency}
          </p>
          <p className="text-xs text-[#8a899a]">
            {currency === 'INR' ? 'Indian rupee' : 'US dollar'} · tap to switch
          </p>
        </div>
        <span className="dash-num text-2xl font-semibold">{symbol}</span>
      </button>
    </div>
  );
}
