'use client';

import { motion } from 'framer-motion';
import { Typography } from '../design-system';

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
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-lg font-black">
            {currentStep}
          </div>
          <Typography variant="h6" className="font-black">
            {stepTitle}
          </Typography>
        </div>
        <span className="text-sm font-medium text-gray-500">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          className="bg-black h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
}

