'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

export default function ThemeSelector() {
  const { theme, setTheme, currentTheme } = useTheme();

  const themes = [
    { value: 'light' as const, label: 'Light', icon: SunIcon },
    { value: 'dark' as const, label: 'Dark', icon: MoonIcon },
    { value: 'auto' as const, label: 'Auto', icon: ComputerDesktopIcon },
  ];

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-bold text-gray-900">Theme</h4>
      <div className="space-y-2">
        {themes.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              theme === value
                ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-2 border-blue-500/20'
                : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
            }`}
          >
            <Icon className={`w-5 h-5 ${theme === value ? 'text-blue-600' : 'text-gray-500'}`} />
            <span className={`flex-1 text-left text-sm font-medium ${theme === value ? 'text-black' : 'text-gray-600'}`}>
              {label}
            </span>
            {theme === value && (
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

