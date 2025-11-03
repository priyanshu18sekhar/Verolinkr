'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ProgressBarProps {
  progress: number; // 0-100
  variant?: 'linear' | 'circular' | 'step';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'gradient';
  steps?: Array<{ label: string; completed: boolean }>;
  className?: string;
}

const sizeClasses = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

const colorClasses = {
  primary: 'from-blue-500 to-purple-500',
  success: 'from-green-500 to-emerald-500',
  warning: 'from-yellow-500 to-orange-500',
  danger: 'from-red-500 to-pink-500',
  gradient: 'from-blue-500 via-purple-500 to-pink-500',
};

export default function ProgressBar({
  progress,
  variant = 'linear',
  size = 'md',
  showLabel = true,
  label,
  color = 'gradient',
  steps,
  className = '',
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  if (variant === 'circular') {
    const circumference = 2 * Math.PI * 45; // radius = 45
    const offset = circumference - (clampedProgress / 100) * circumference;

    return (
      <div className={`relative w-24 h-24 ${className}`}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="8"
            className="backdrop-blur-sm"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={`url(#gradient-${color})`}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="backdrop-blur-sm"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color === 'primary' ? '#3b82f6' : color === 'success' ? '#10b981' : color === 'warning' ? '#f59e0b' : color === 'danger' ? '#ef4444' : '#3b82f6'} />
              <stop offset="100%" stopColor={color === 'primary' ? '#8b5cf6' : color === 'success' ? '#059669' : color === 'warning' ? '#f97316' : color === 'danger' ? '#ec4899' : '#ec4899'} />
            </linearGradient>
          </defs>
        </svg>
        {/* Percentage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            key={clampedProgress}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-sm font-bold text-gray-700"
          >
            {Math.round(clampedProgress)}%
          </motion.span>
        </div>
      </div>
    );
  }

  if (variant === 'step' && steps) {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold backdrop-blur-sm border-2 ${
                    step.completed
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-400 text-white'
                      : 'bg-white/20 border-white/30 text-gray-600'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {step.completed ? '✓' : index + 1}
                </motion.div>
                <span className="text-xs text-gray-600 mt-2 text-center">{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <motion.div
                  className={`flex-1 h-1 mx-2 rounded-full ${
                    step.completed ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-white/20'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Linear variant (default)
  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">{label || 'Progress'}</span>
          <motion.span
            key={clampedProgress}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-sm font-bold text-gray-700"
          >
            {Math.round(clampedProgress)}%
          </motion.span>
        </div>
      )}
      <div className={`w-full ${sizeClasses[size]} rounded-full bg-white/20 backdrop-blur-sm border border-white/30 overflow-hidden`}>
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${colorClasses[color]} backdrop-blur-sm relative overflow-hidden`}
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 2,
                ease: 'linear',
              },
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

