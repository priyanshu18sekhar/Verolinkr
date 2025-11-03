'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassLoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  variant?: 'default' | 'dots' | 'spinner' | 'ring';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
};

export default function GlassLoader({
  size = 'md',
  text,
  variant = 'default',
  className = '',
}: GlassLoaderProps) {
  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-white/30 backdrop-blur-sm"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        );

      case 'spinner':
        return (
          <div className={`${sizeClasses[size]} relative`}>
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-white/20 backdrop-blur-sm"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-white/60 backdrop-blur-sm"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>
        );

      case 'ring':
        return (
          <div className={`${sizeClasses[size]} relative`}>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-white/30 backdrop-blur-sm"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>
        );

      default:
        return (
          <div className={`${sizeClasses[size]} relative`}>
            <motion.div
              className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-xl border border-white/30"
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                },
                scale: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
            />
            <motion.div
              className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 backdrop-blur-sm"
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>
        );
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      {renderLoader()}
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm font-medium text-gray-600"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}


