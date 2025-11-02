'use client';

import { useCurrency } from '@/contexts/CurrencyContext';
import { BanknotesIcon } from '@heroicons/react/24/outline';

export default function CurrencySelector() {
  const { currency, setCurrency, symbol } = useCurrency();

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-bold text-gray-900">Currency</h4>
      <button
        onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl border-2 border-transparent hover:bg-gray-100 hover:border-blue-500/20 transition-all duration-200 group"
      >
        <div className="flex items-center gap-3">
          <BanknotesIcon className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
          <div className="text-left">
            <div className="text-sm font-bold text-black">{currency}</div>
            <div className="text-xs text-gray-500">
              {currency === 'INR' ? 'Indian Rupee' : 'US Dollar'}
            </div>
          </div>
        </div>
        <div className="text-2xl font-black text-gray-600 group-hover:text-blue-600">
          {symbol}
        </div>
      </button>
      <p className="text-xs text-gray-500">
        All amounts will be displayed in {currency}
      </p>
    </div>
  );
}

