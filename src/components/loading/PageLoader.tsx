'use client';

import { motion, AnimatePresence } from 'framer-motion';
import GlassLoader from './GlassLoader';

interface PageLoaderProps {
  isLoading: boolean;
  text?: string;
  progress?: number; // 0-100, optional
  showProgress?: boolean;
}

export default function PageLoader({
  isLoading,
  text = 'Loading...',
  progress,
  showProgress = false,
}: PageLoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Glass backdrop */}
          <motion.div
            initial={{ backdropFilter: 'blur(0px)' }}
            animate={{ backdropFilter: 'blur(20px)' }}
            exit={{ backdropFilter: 'blur(0px)' }}
            className="absolute inset-0 bg-black/20 backdrop-blur-xl"
          />

          {/* Loader content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative z-10 bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl p-8 shadow-2xl"
          >
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

            <div className="relative z-10 flex flex-col items-center gap-6">
              <GlassLoader size="xl" variant="default" />
              {text && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg font-medium text-gray-700"
                >
                  {text}
                </motion.p>
              )}
              {showProgress && progress !== undefined && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: '100%' }}
                  className="w-64"
                >
                  <div className="h-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 backdrop-blur-sm"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <motion.span
                    key={progress}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="block text-center text-sm font-bold text-gray-700 mt-2"
                  >
                    {Math.round(progress)}%
                  </motion.span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
