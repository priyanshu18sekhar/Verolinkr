'use client';

import { motion } from 'framer-motion';
import { Container, Typography } from '../design-system';
import ProgressIndicator from './ProgressIndicator';
import AnimatedParticles from './AnimatedParticles';
import { fadeInUp } from '../../utils/animations';

interface StepLayoutProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onNext?: () => void;
  onBack?: () => void;
  nextLabel?: string;
  showBack?: boolean;
}

export default function StepLayout({
  currentStep,
  totalSteps,
  stepTitle,
  title,
  subtitle,
  icon,
  children,
  onNext,
  onBack,
  nextLabel = 'Continue',
  showBack = true,
}: StepLayoutProps) {
  return (
    <div className="min-h-screen bg-white py-20 px-4 relative overflow-hidden">
      {/* Subtle background elements matching Hero */}
      <AnimatedParticles count={50} />

      <Container size="md">
        {/* Progress Indicator */}
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          stepTitle={stepTitle}
        />

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          {icon && (
            <motion.div
              className="mb-8 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              {icon}
            </motion.div>
          )}
          <Typography variant="h2" className="mb-6 font-black">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="lead" className="text-gray-600 font-light max-w-2xl mx-auto">
              {subtitle}
            </Typography>
          )}
        </motion.div>

        {/* Content */}
        <motion.div
          className="bg-white border-2 border-gray-200 rounded-3xl p-12 max-w-2xl mx-auto relative z-10"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          {children}

          {/* Navigation Buttons */}
          {(onNext || onBack) && (
            <div className={`flex gap-4 mt-12 ${showBack ? 'justify-between' : 'justify-end'}`}>
              {showBack && onBack && (
                <motion.button
                  type="button"
                  onClick={onBack}
                  className="px-8 py-4 text-lg font-bold text-gray-600 hover:text-black transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ← Back
                </motion.button>
              )}
              {onNext && (
                <motion.button
                  type="button"
                  onClick={onNext}
                  className="px-12 py-5 bg-black text-white rounded-full font-black text-xl hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl ml-auto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {nextLabel} →
                </motion.button>
              )}
            </div>
          )}
        </motion.div>
      </Container>
    </div>
  );
}

