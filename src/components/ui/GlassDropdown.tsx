'use client';

import { ReactNode, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import GlassCard from '../design-system/GlassCard';
import { glassFadeIn } from '@/utils/glassAnimations';

interface DropdownOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

interface GlassDropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function GlassDropdown({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  className = '',
}: GlassDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-xl border-2 border-white/30 text-left font-medium text-gray-700 hover:bg-white/30 transition-all duration-200 flex items-center justify-between"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="flex items-center gap-2">
          {selectedOption?.icon}
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDownIcon className="w-5 h-5 text-gray-600" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={glassFadeIn}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <GlassCard variant="elevated" className="p-2 max-h-60 overflow-auto">
              {options.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 rounded-xl text-left font-medium transition-all duration-200 flex items-center gap-2 ${
                    value === option.value
                      ? 'bg-blue-500/20 text-blue-700 border-2 border-blue-500/30'
                      : 'text-gray-700 hover:bg-white/20 border-2 border-transparent'
                  }`}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option.icon}
                  {option.label}
                </motion.button>
              ))}
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}





