'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import BaseModal from './BaseModal';
import GlassButton from '../design-system/GlassButton';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  buttonText?: string;
  autoClose?: boolean;
  autoCloseDelay?: number;
  onButtonClick?: () => void;
}

export default function SuccessModal({
  isOpen,
  onClose,
  title = 'Success!',
  message,
  buttonText = 'Got it',
  autoClose = false,
  autoCloseDelay = 3000,
  onButtonClick,
}: SuccessModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 2000);

      if (autoClose) {
        const closeTimer = setTimeout(() => {
          onClose();
        }, autoCloseDelay);

        return () => {
          clearTimeout(timer);
          clearTimeout(closeTimer);
        };
      }

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDelay, onClose]);

  const handleButtonClick = () => {
    onButtonClick?.();
    onClose();
  };

  // Confetti particles
  const confetti = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 1 + Math.random() * 1,
  }));

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title} size="sm" showCloseButton={false}>
      <div className="relative p-8 overflow-hidden">
        {/* Confetti effect */}
        <AnimatePresence>
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none">
              {confetti.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                    background: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'][
                      Math.floor(Math.random() * 5)
                    ],
                  }}
                  initial={{ opacity: 0, scale: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1.2, 1, 0.8],
                    y: [0, -100, -150],
                    x: [(Math.random() - 0.5) * 200],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: particle.duration,
                    delay: particle.delay,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Success icon with animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.6, -0.05, 0.01, 0.99],
            type: 'spring',
            stiffness: 200,
          }}
          className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500/30 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <CheckCircleIcon className="w-16 h-16 text-green-500" />
          </motion.div>
          
          {/* Checkmark animation */}
          <motion.svg
            className="absolute w-16 h-16 text-green-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
          </motion.svg>
        </motion.div>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-700 text-lg mb-8 font-medium"
        >
          {message}
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <GlassButton variant="primary" size="md" onClick={handleButtonClick} className="min-w-[120px]">
            {buttonText}
          </GlassButton>
        </motion.div>
      </div>
    </BaseModal>
  );
}

