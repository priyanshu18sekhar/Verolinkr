'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { createPortal } from 'react-dom';
import { glassFadeIn, glassSlideUp } from '@/utils/glassAnimations';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full mx-4',
};

export default function BaseModal({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  showCloseButton = true,
  closeOnBackdropClick = true,
  className = '',
}: BaseModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.target === backdropRef.current) {
      onClose();
    }
  };

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          ref={backdropRef}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Glass backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/20 backdrop-blur-xl"
          />

          {/* Modal content */}
          <motion.div
            ref={modalRef}
            variants={glassSlideUp}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`relative z-10 w-full ${sizeClasses[size]} ${className}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-3xl bg-white/20 backdrop-blur-2xl border border-white/30 shadow-2xl overflow-hidden">
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0"
                animate={{
                  x: ['-100%', '100%'],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 3,
                    ease: 'linear',
                  },
                  opacity: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'loop',
                  },
                }}
              />

              {/* Header */}
              {(title || showCloseButton) && (
                <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/20">
                  {title && (
                    <h2 className="text-2xl font-black text-gray-900">{title}</h2>
                  )}
                  {showCloseButton && (
                    <motion.button
                      onClick={onClose}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-200"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Close modal"
                    >
                      <XMarkIcon className="w-5 h-5 text-gray-700" />
                    </motion.button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="relative z-10">{children}</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}


