'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Input } from '../../../../components/design-system';
import { StepLayout, AnimatedParticles } from '../../../../components/onboarding';
import { CheckCircleIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { apiPost } from '@/lib/api/client';

export default function CreatorOnboardingStep7() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    asciGuidelines: false,
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    pan: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [skippedBankDetails, setSkippedBankDetails] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (skipBankDetails = false) => {
    const newErrors: Record<string, string> = {};

    if (!formData.asciGuidelines) {
      newErrors.asciGuidelines = 'You must acknowledge the ASCI guidelines';
    }

    // Only validate bank details if not skipping
    if (!skipBankDetails) {
      if (!formData.bankName.trim()) {
        newErrors.bankName = 'Bank name is required';
      }

      if (!formData.accountNumber.trim()) {
        newErrors.accountNumber = 'Account number is required';
      } else if (!/^\d{9,18}$/.test(formData.accountNumber.replace(/\D/g, ''))) {
        newErrors.accountNumber = 'Please enter a valid account number (9-18 digits)';
      }

      if (!formData.ifscCode.trim()) {
        newErrors.ifscCode = 'IFSC code is required';
      } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode.toUpperCase())) {
        newErrors.ifscCode = 'Please enter a valid IFSC code (e.g., SBIN0001234)';
      }

      if (!formData.pan.trim()) {
        newErrors.pan = 'PAN is required';
      } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan.toUpperCase())) {
        newErrors.pan = 'Please enter a valid PAN (e.g., ABCDE1234F)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitOnboarding = async (skipBankDetails: boolean) => {
    try {
      const existingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
      
      // Build creator data based on whether we're skipping bank details
      const creatorData = {
        ...existingData.creator,
        asciGuidelines: formData.asciGuidelines,
        bankDetailsCompleted: !skipBankDetails,
        ...(skipBankDetails ? {} : {
          bankName: formData.bankName,
          accountNumber: formData.accountNumber,
          ifscCode: formData.ifscCode.toUpperCase(),
          pan: formData.pan.toUpperCase()
        })
      };

      await apiPost('/api/onboarding/creator', {
        creator: creatorData,
        skippedBankDetails: skipBankDetails
      });

      localStorage.removeItem('onboardingData'); // Cleanup
      setSkippedBankDetails(skipBankDetails);
      setIsComplete(true);
      
      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        router.push('/creator-dashboard');
      }, 3000);
    } catch (error) {
      setErrors({ submit: 'Submission failed. Please try again.' });
    }
  };

  const handleNext = async () => {
    if (validateForm(false)) {
      setIsSubmitting(true);
      await submitOnboarding(false);
      setIsSubmitting(false);
    }
  };

  const handleSkip = async () => {
    if (validateForm(true)) {
      setIsSkipping(true);
      await submitOnboarding(true);
      setIsSkipping(false);
    }
  };

  const handleBack = () => {
    router.push('/onboarding/creator/step6');
  };

  const icon = (
    <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-[#08080c]">
      <BanknotesIcon className="w-10 h-10 text-white" />
    </div>
  );

  if (isComplete) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-20 relative overflow-hidden">
        <AnimatedParticles count={60} />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center bg-[#08080c]"
          >
            <CheckCircleIcon className="w-14 h-14 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black mb-6"
          >
            Welcome to VeroLinkr!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 font-light"
          >
            {skippedBankDetails 
              ? "Your creator profile has been created! You can add your bank details later from your dashboard to receive payments."
              : "Your creator profile has been submitted for review. You're one step closer to connecting with amazing brands and monetizing your content."
            }
          </motion.p>

          {skippedBankDetails && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-4 bg-amber-50 border border-amber-200 rounded-xl mb-6"
            >
              <p className="text-sm text-amber-800">
                <strong>Reminder:</strong> You&apos;ll need to add your bank details before you can withdraw earnings.
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-gray-500"
          >
            Redirecting to your dashboard...
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <StepLayout
      currentStep={7}
      totalSteps={7}
      stepTitle="Bank Details & Final Steps"
      title="Complete Your Profile"
      subtitle="Add your payment details and acknowledge our guidelines. You can also skip bank details for now and add them later."
      icon={icon}
      onNext={handleNext}
      onBack={handleBack}
      nextLabel={isSubmitting ? "Submitting..." : "Complete Registration"}
    >
      <div className="space-y-8">
        {/* ASCI Guidelines */}
        <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
          <input
            type="checkbox"
            id="asciGuidelines"
            name="asciGuidelines"
            checked={formData.asciGuidelines}
            onChange={handleCheckboxChange}
            className="mt-1 h-5 w-5 rounded border-gray-300 text-black focus:ring-black"
            required
          />
          <label htmlFor="asciGuidelines" className="text-sm text-gray-700">
            I acknowledge and agree to comply with the{' '}
            <Link href="/terms" className="text-black font-bold hover:underline">
              ASCI Guidelines
            </Link>{' '}
            for influencer marketing and advertising.
          </label>
        </div>
        {errors.asciGuidelines && (
          <p className="text-sm font-medium text-red-600">{errors.asciGuidelines}</p>
        )}

        {/* Bank Details */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-gray-900">Bank Account Details</h3>
            <span className="text-sm text-gray-500">(Optional - can be added later)</span>
          </div>
          
          <Input
            label="Bank Name"
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleInputChange}
            placeholder="Enter bank name"
            error={errors.bankName}
          />

          <Input
            label="Account Number"
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleInputChange}
            placeholder="Enter account number"
            error={errors.accountNumber}
          />

          <Input
            label="IFSC Code"
            type="text"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase();
              handleInputChange(e);
            }}
            placeholder="SBIN0001234"
            error={errors.ifscCode}
            hint="Format: 4 letters, 0, 6 alphanumeric (e.g., SBIN0001234)"
          />

          <Input
            label="PAN Number"
            type="text"
            name="pan"
            value={formData.pan}
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase();
              handleInputChange(e);
            }}
            placeholder="ABCDE1234F"
            error={errors.pan}
            hint="Format: 5 letters, 4 numbers, 1 letter (e.g., ABCDE1234F)"
          />
        </div>

        {/* Security Notice */}
        <div className="p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
          <div className="flex items-start space-x-3">
            <svg className="w-6 h-6 text-purple-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="text-sm font-black text-purple-900 mb-1">Secure Payment Information</h4>
              <p className="text-sm text-purple-700">
                Your bank details are encrypted and securely stored. We use industry-standard security measures to protect your financial information.
              </p>
            </div>
          </div>
        </div>

        {/* Skip Button */}
        <div className="pt-4 border-t border-gray-200">
          <motion.button
            type="button"
            onClick={handleSkip}
            disabled={isSkipping || isSubmitting}
            className="w-full py-4 px-6 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {isSkipping ? "Setting up your profile..." : "Skip for Now — Add Bank Details Later"}
          </motion.button>
          <p className="text-center text-xs text-gray-500 mt-2">
            You can complete your bank details anytime from your dashboard settings.
          </p>
        </div>

        {errors.submit && (
          <p className="text-sm font-medium text-red-600">{errors.submit}</p>
        )}
      </div>
    </StepLayout>
  );
}


