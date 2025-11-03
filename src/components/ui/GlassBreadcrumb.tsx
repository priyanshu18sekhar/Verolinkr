'use client';

import { motion } from 'framer-motion';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import GlassCard from '../design-system/GlassCard';

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface GlassBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function GlassBreadcrumb({ items, className = '' }: GlassBreadcrumbProps) {
  return (
    <nav className={`flex items-center gap-2 ${className}`}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-2 rounded-xl bg-white/20 backdrop-blur-xl border-2 border-white/30 hover:bg-white/30 transition-all duration-200"
      >
        <HomeIcon className="w-5 h-5 text-gray-700" />
      </motion.button>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRightIcon className="w-4 h-4 text-gray-400" />
          {item.href || item.onClick ? (
            <motion.button
              onClick={item.onClick}
              className="px-3 py-1 rounded-lg bg-white/20 backdrop-blur-xl border-2 border-white/30 hover:bg-white/30 transition-all duration-200 font-medium text-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </motion.button>
          ) : (
            <span className="px-3 py-1 rounded-lg bg-white/30 backdrop-blur-xl border-2 border-blue-500/30 font-bold text-blue-700">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}



