'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ExclamationTriangleIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import BaseModal from './BaseModal';
import GlassButton from '../design-system/GlassButton';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'warning' | 'danger' | 'info';
  icon?: ReactNode;
  isLoading?: boolean;
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'warning',
  icon,
  isLoading = false,
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  const variantStyles = {
    warning: {
      iconColor: 'text-yellow-500',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-500/30',
    },
    danger: {
      iconColor: 'text-red-500',
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-500/30',
    },
    info: {
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/30',
    },
  };

  const currentVariant = variantStyles[variant];

  const defaultIcon =
    variant === 'danger' ? (
      <ExclamationTriangleIcon className={`w-12 h-12 ${currentVariant.iconColor}`} />
    ) : variant === 'info' ? (
      <QuestionMarkCircleIcon className={`w-12 h-12 ${currentVariant.iconColor}`} />
    ) : (
      <ExclamationTriangleIcon className={`w-12 h-12 ${currentVariant.iconColor}`} />
    );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      showCloseButton={false}
    >
      <div className="p-8">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }}
          className={`w-20 h-20 rounded-full ${currentVariant.bgColor} border-2 ${currentVariant.borderColor} flex items-center justify-center mx-auto mb-6 backdrop-blur-sm`}
        >
          {icon || defaultIcon}
        </motion.div>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-700 text-lg mb-8 font-medium"
        >
          {message}
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4 justify-center"
        >
          <GlassButton
            variant="tertiary"
            size="md"
            onClick={onClose}
            disabled={isLoading}
            className="min-w-[120px]"
          >
            {cancelText}
          </GlassButton>
          <GlassButton
            variant={variant === 'danger' ? 'danger' : 'primary'}
            size="md"
            onClick={handleConfirm}
            disabled={isLoading}
            className="min-w-[120px]"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <motion.span
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                Processing...
              </span>
            ) : (
              confirmText
            )}
          </GlassButton>
        </motion.div>
      </div>
    </BaseModal>
  );
}

