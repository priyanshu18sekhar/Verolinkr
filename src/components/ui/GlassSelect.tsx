'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../design-system/GlassCard';

interface SelectOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

interface GlassSelectProps {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export default function GlassSelect({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  className = '',
  disabled = false,
}: GlassSelectProps) {
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <GlassCard variant="floating" className={`p-0 ${className}`}>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full px-4 py-3 bg-transparent border-none focus:ring-0 focus:outline-none font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {placeholder && !value && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </GlassCard>
  );
}


