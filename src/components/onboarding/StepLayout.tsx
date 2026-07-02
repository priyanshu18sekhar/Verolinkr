'use client';

import { motion } from 'framer-motion';
import ProgressIndicator from './ProgressIndicator';

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
  onSkip?: () => void;
  nextLabel?: string;
  skipLabel?: string;
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
  onSkip,
  nextLabel = 'Continue',
  skipLabel = 'Skip',
  showBack = true,
}: StepLayoutProps) {
  return (
    <div className="cine-wrap min-h-screen py-16 px-5">
      <div className="w-full max-w-xl mx-auto">

        {/* Progress */}
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          stepTitle={stepTitle}
        />

        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        >
          {icon && (
            <motion.div
              className="mb-6 flex justify-center"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {icon}
            </motion.div>
          )}
          <h1
            style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
              fontWeight: 700,
              letterSpacing: '-0.035em',
              lineHeight: 1.1,
              color: '#08080c',
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="mt-3 max-w-md mx-auto"
              style={{ color: '#6b6a7b', fontSize: '0.875rem', lineHeight: 1.6 }}
            >
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Form card */}
        <motion.div
          className="lp-card px-7 py-8 sm:px-9 sm:py-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {children}

          {/* Navigation */}
          {(onNext || onBack || onSkip) && (
            <div
              className={`flex gap-3 mt-10 items-center pt-8 ${showBack && onBack ? 'justify-between' : 'justify-end'}`}
              style={{ borderTop: '1px solid rgba(11,11,18,0.08)' }}
            >
              {showBack && onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="text-[13px] font-semibold hover:opacity-60 transition-opacity"
                  style={{ color: '#6b6a7b' }}
                >
                  ← Back
                </button>
              )}

              <div className="flex items-center gap-3 ml-auto">
                {onSkip && (
                  <button
                    type="button"
                    onClick={onSkip}
                    className="text-[13px] font-semibold hover:opacity-60 transition-opacity"
                    style={{ color: '#8a899a' }}
                  >
                    {skipLabel}
                  </button>
                )}

                {onNext && (
                  <button
                    type="button"
                    onClick={onNext}
                    className="cine-btn"
                  >
                    {nextLabel}
                    <span className="ml-1">→</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
