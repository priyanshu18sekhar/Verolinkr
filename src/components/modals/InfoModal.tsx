'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import BaseModal from './BaseModal';
import GlassButton from '../design-system/GlassButton';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  children?: ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  icon?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function InfoModal({
  isOpen,
  onClose,
  title,
  message,
  children,
  buttonText = 'Got it',
  onButtonClick,
  icon,
  size = 'md',
}: InfoModalProps) {
  const handleButtonClick = () => {
    onButtonClick?.();
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title} size={size}>
      <div className="p-8">
        {/* Icon */}
        {!children && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.6, -0.05, 0.01, 0.99],
            }}
            className="w-20 h-20 rounded-full bg-blue-500/20 border-2 border-blue-500/30 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm"
          >
            {icon || <InformationCircleIcon className="w-12 h-12 text-blue-500" />}
          </motion.div>
        )}

        {/* Message or children */}
        {message && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center text-gray-700 text-lg mb-8 font-medium"
          >
            {message}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            {children}
          </motion.div>
        )}

        {/* Button */}
        {buttonText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <GlassButton variant="primary" size="md" onClick={handleButtonClick} className="min-w-[120px]">
              {buttonText}
            </GlassButton>
          </motion.div>
        )}
      </div>
    </BaseModal>
  );
}

