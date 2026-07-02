'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { StepLayout } from '../../../../components/onboarding';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function CreatorOnboardingStep2() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1 || !/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    if (error) setError('');
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }
    
    setOtp(newOtp);
    const nextEmptyIndex = newOtp.findIndex(digit => digit === '');
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    document.getElementById(`otp-${focusIndex}`)?.focus();
  };

  const handleNext = async () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (otpString.length === 6) {
        router.push('/onboarding/creator/step3');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    setCanResend(false);
    setResendTimer(60);
    setOtp(['', '', '', '', '', '']);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/onboarding/creator/step1');
  };

  const icon = (
    <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-[#08080c]">
      <ShieldCheckIcon className="w-10 h-10 text-white" />
    </div>
  );

  return (
    <StepLayout
      currentStep={2}
      totalSteps={7}
      stepTitle="OTP Verification"
      title="Enter Verification Code"
      subtitle="We've sent a 6-digit verification code to your mobile number. Please enter it below."
      icon={icon}
      onNext={handleNext}
      onBack={handleBack}
      nextLabel={isLoading ? "Verifying..." : "Verify & Continue"}
    >
      <div className="space-y-8">
        {/* OTP Input Fields */}
        <div className="space-y-4">
          <label className="block text-sm font-bold text-gray-900 text-center">
            Enter 6-Digit Code
          </label>
          <div className="flex justify-center space-x-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`w-14 h-14 text-center text-2xl font-black border-2 rounded-xl focus:outline-none focus:border-black transition-all duration-200 ${
                  error ? 'border-red-500' : 'border-gray-300'
                }`}
                autoComplete="one-time-code"
                disabled={isLoading}
              />
            ))}
          </div>
          
          {error && (
            <motion.p
              className="text-sm font-medium text-red-600 text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.p>
          )}
        </div>

        {/* Resend OTP */}
        <div className="text-center">
          {canResend ? (
            <button
              onClick={handleResendOtp}
              disabled={isLoading}
              className="text-black font-bold hover:underline text-sm disabled:opacity-50"
            >
              Resend OTP
            </button>
          ) : (
            <p className="text-sm text-gray-500">
              Resend OTP in {resendTimer} seconds
            </p>
          )}
        </div>
      </div>
    </StepLayout>
  );
}

