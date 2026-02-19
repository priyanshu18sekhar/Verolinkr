'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import GlassCard from '../design-system/GlassCard';
import ProgressBar from '../loading/ProgressBar';
import { useEffect, useState } from 'react';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  id: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  onClose: (id: string) => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const variantStyles = {
  success: {
    icon: CheckCircleIcon,
    bg: 'bg-green-500/20 border-green-500/30',
    iconColor: 'text-green-600',
    textColor: 'text-green-700',
  },
  error: {
    icon: XCircleIcon,
    bg: 'bg-red-500/20 border-red-500/30',
    iconColor: 'text-red-600',
    textColor: 'text-red-700',
  },
  warning: {
    icon: ExclamationTriangleIcon,
    bg: 'bg-yellow-500/20 border-yellow-500/30',
    iconColor: 'text-yellow-600',
    textColor: 'text-yellow-700',
  },
  info: {
    icon: InformationCircleIcon,
    bg: 'bg-blue-500/20 border-blue-500/30',
    iconColor: 'text-blue-600',
    textColor: 'text-blue-700',
  },
};

export default function Toast({ id, message, variant = 'info', duration = 5000, onClose, action }: ToastProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) return 0;
        return prev - (100 / (duration / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration]);

  useEffect(() => {
    if (progress <= 0) {
      onClose(id);
    }
  }, [progress, id, onClose]);

  const styles = variantStyles[variant];
  const Icon = styles.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ duration: 0.3, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="relative"
    >
      <GlassCard variant="elevated" className={`p-4 min-w-[320px] max-w-md ${styles.bg} border-2`}>
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm border-2 ${styles.bg}`}>
            <Icon className={`w-6 h-6 ${styles.iconColor}`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium ${styles.textColor}`}>{message}</p>
            {action && (
              <motion.button
                onClick={action.onClick}
                className={`mt-2 text-xs font-bold ${styles.textColor} hover:underline`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {action.label}
              </motion.button>
            )}
          </div>

          <motion.button
            onClick={() => onClose(id)}
            className="p-1 rounded-lg hover:bg-white/20 transition-colors duration-200"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <XMarkIcon className="w-4 h-4 text-gray-600" />
          </motion.button>
        </div>

        {/* Progress bar */}
        <div className="mt-3">
          <ProgressBar progress={progress} variant="linear" color={variant === 'success' ? 'success' : variant === 'error' ? 'danger' : 'primary'} size="sm" showLabel={false} />
        </div>
      </GlassCard>
    </motion.div>
  );
}





