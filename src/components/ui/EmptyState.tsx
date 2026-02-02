'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  /** Icon element to display */
  icon: ReactNode;
  /** Title text */
  title: string;
  /** Description text */
  description: string;
  /** Primary action button text */
  actionText?: string;
  /** Primary action callback */
  onAction?: () => void;
  /** Secondary action text */
  secondaryActionText?: string;
  /** Secondary action callback */
  onSecondaryAction?: () => void;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Custom className */
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionText,
  onAction,
  secondaryActionText,
  onSecondaryAction,
  size = 'md',
  className = '',
}: EmptyStateProps) {
  const sizeClasses = {
    sm: {
      container: 'p-4',
      icon: 'w-10 h-10',
      title: 'text-sm font-bold',
      description: 'text-xs',
      button: 'px-3 py-1.5 text-xs',
    },
    md: {
      container: 'p-6',
      icon: 'w-12 h-12',
      title: 'text-base font-bold',
      description: 'text-sm',
      button: 'px-4 py-2 text-sm',
    },
    lg: {
      container: 'p-8',
      icon: 'w-16 h-16',
      title: 'text-lg font-bold',
      description: 'text-base',
      button: 'px-6 py-3 text-sm',
    },
  };

  const styles = sizeClasses[size];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center text-center ${styles.container} ${className}`}
    >
      <div className={`${styles.icon} mb-4 text-gray-300`}>
        {icon}
      </div>
      <h4 className={`${styles.title} text-gray-900 mb-2`}>{title}</h4>
      <p className={`${styles.description} text-gray-500 mb-4 max-w-xs`}>{description}</p>
      
      <div className="flex items-center gap-3">
        {actionText && onAction && (
          <motion.button
            onClick={onAction}
            className={`${styles.button} bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {actionText}
          </motion.button>
        )}
        {secondaryActionText && onSecondaryAction && (
          <motion.button
            onClick={onSecondaryAction}
            className={`${styles.button} border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {secondaryActionText}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

export default EmptyState;
