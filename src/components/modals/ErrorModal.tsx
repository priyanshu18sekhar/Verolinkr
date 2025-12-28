'use client';

import { motion } from 'framer-motion';
import { XCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import BaseModal from './BaseModal';
import GlassButton from '../design-system/GlassButton';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  buttonText?: string;
  retryText?: string;
  onRetry?: () => void;
  onButtonClick?: () => void;
  showRetry?: boolean;
}

export default function ErrorModal({
  isOpen,
  onClose,
  title = 'Error',
  message,
  buttonText = 'Close',
  retryText = 'Retry',
  onRetry,
  onButtonClick,
  showRetry = false,
}: ErrorModalProps) {
  const handleButtonClick = () => {
    onButtonClick?.();
    onClose();
  };

  const handleRetry = () => {
    onRetry?.();
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title} size="sm" showCloseButton={false}>
      <div className="p-8">
        {/* Error icon with shake animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.6, -0.05, 0.01, 0.99],
          }}
          className="w-24 h-24 rounded-full bg-red-500/20 border-2 border-red-500/30 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm"
        >
          <motion.div
            animate={{
              rotate: [0, -10, 10, -10, 10, 0],
            }}
            transition={{
              duration: 0.5,
              delay: 0.3,
            }}
          >
            <XCircleIcon className="w-16 h-16 text-red-500" />
          </motion.div>
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
          {showRetry && onRetry && (
            <GlassButton variant="secondary" size="md" onClick={handleRetry} className="min-w-[120px]">
              {retryText}
            </GlassButton>
          )}
          <GlassButton variant="danger" size="md" onClick={handleButtonClick} className="min-w-[120px]">
            {buttonText}
          </GlassButton>
        </motion.div>
      </div>
    </BaseModal>
  );
}




