'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'light' as const, label: 'Light', icon: SunIcon },
    { value: 'dark' as const, label: 'Dark', icon: MoonIcon },
    { value: 'auto' as const, label: 'Auto', icon: ComputerDesktopIcon },
  ];

  return (
    <div>
      <p className="dash-label mb-3">Theme</p>
      <div className="grid grid-cols-3 gap-2">
        {themes.map(({ value, label, icon: Icon }) => {
          const active = theme === value;
          return (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className={`flex flex-col items-center gap-1.5 rounded-2xl border px-3 py-3 transition-colors ${
                active
                  ? 'border-[#08080c] bg-[#08080c] text-white'
                  : 'border-[rgba(11,11,18,0.12)] bg-white/60 text-[#6b6a7b] hover:border-[rgba(11,11,18,0.35)]'
              }`}
              aria-pressed={active}
            >
              <Icon className="h-[1.1rem] w-[1.1rem]" />
              <span className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.14em]">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
