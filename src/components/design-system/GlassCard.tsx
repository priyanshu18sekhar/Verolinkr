'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  variant?: 'elevated' | 'floating' | 'borderless';
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export default function GlassCard({
  children,
  variant = 'elevated',
  className = '',
  onClick,
  hover = true,
}: GlassCardProps) {
  const baseStyles = 'rounded-3xl transition-all duration-500 relative overflow-hidden';
  
  const variantStyles = {
    elevated: 'bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl shadow-black/10',
    floating: 'bg-white/10 backdrop-blur-2xl border border-white/20 shadow-lg',
    borderless: 'bg-white/15 backdrop-blur-xl shadow-xl',
  };

  const hoverEffect = hover
    ? {
        whileHover: { scale: 1.02, y: -4 },
        whileTap: { scale: 0.98 },
      }
    : {};

  return (
    <motion.div
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      {...hoverEffect}
      style={{
        background: variant === 'elevated' 
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15))'
          : undefined,
      }}
    >
      {/* Shimmer effect overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 3,
            ease: 'linear',
          },
        }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

