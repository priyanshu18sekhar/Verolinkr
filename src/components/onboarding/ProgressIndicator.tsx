'use client';

import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
}

export default function ProgressIndicator({
  currentStep,
  totalSteps,
  stepTitle,
}: ProgressIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Step counter + label */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span
            className="cine-mono text-[11px] font-semibold tabular-nums"
            style={{ color: '#6b6a7b' }}
          >
            {String(currentStep).padStart(2, '0')}
            <span style={{ color: '#d1d0d8', margin: '0 4px' }}>/</span>
            {String(totalSteps).padStart(2, '0')}
          </span>
          <div style={{ width: '1px', height: '12px', background: 'rgba(11,11,18,0.15)' }} />
          <p className="cine-eyebrow" style={{ color: '#6b6a7b' }}>{stepTitle}</p>
        </div>
        <span
          className="cine-mono text-[11px]"
          style={{ color: '#8a899a' }}
        >
          {Math.round(progress)}%
        </span>
      </div>

      {/* Progress track */}
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ height: '2px', background: 'rgba(11,11,18,0.08)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: '#08080c' }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}
