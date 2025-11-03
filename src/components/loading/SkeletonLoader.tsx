'use client';

import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  variant?: 'card' | 'list' | 'table' | 'text' | 'circle' | 'custom';
  count?: number;
  width?: string;
  height?: string;
  className?: string;
  children?: React.ReactNode;
}

const shimmerAnimation = {
  x: ['-100%', '100%'],
  transition: {
    x: {
      repeat: Infinity,
      repeatType: 'loop' as const,
      duration: 1.5,
      ease: 'linear',
    },
  },
};

export default function SkeletonLoader({
  variant = 'card',
  count = 1,
  width,
  height,
  className = '',
  children,
}: SkeletonLoaderProps) {
  const renderSkeleton = () => {
    if (variant === 'custom' && children) {
      return children;
    }

    switch (variant) {
      case 'circle':
        return (
          <motion.div
            className={`rounded-full bg-white/20 backdrop-blur-sm border border-white/30 relative overflow-hidden ${
              width || 'w-16'
            } ${height || 'h-16'} ${className}`}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={shimmerAnimation}
            />
          </motion.div>
        );

      case 'text':
        return Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            className={`rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 relative overflow-hidden ${height || 'h-4'} ${className}`}
            style={{
              width: width || (i === count - 1 ? '60%' : '100%'),
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={shimmerAnimation}
            />
          </motion.div>
        ));

      case 'list':
        return Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-4 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={shimmerAnimation}
              />
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-4 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 relative overflow-hidden w-3/4">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={shimmerAnimation}
                />
              </div>
              <div className="h-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 relative overflow-hidden w-1/2">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={shimmerAnimation}
                />
              </div>
            </div>
          </motion.div>
        ));

      case 'table':
        return (
          <div className="space-y-3">
            {Array.from({ length: count }).map((_, i) => (
              <motion.div
                key={i}
                className="flex gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                {Array.from({ length: 4 }).map((_, j) => (
                  <div
                    key={j}
                    className="flex-1 h-6 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={shimmerAnimation}
                    />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        );

      case 'card':
      default:
        return Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            className={`rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 p-6 relative overflow-hidden ${
              width || 'w-full'
            } ${height || 'h-48'} ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={shimmerAnimation}
            />
            {/* Content placeholders */}
            <div className="relative z-10 space-y-3">
              <div className="h-6 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 w-3/4 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={shimmerAnimation}
                />
              </div>
              <div className="h-4 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 w-full relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={shimmerAnimation}
                />
              </div>
              <div className="h-4 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 w-5/6 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={shimmerAnimation}
                />
              </div>
            </div>
          </motion.div>
        ));
    }
  };

  return <div className="w-full">{renderSkeleton()}</div>;
}


