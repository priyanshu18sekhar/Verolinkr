'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Input } from '../../../../components/design-system';
import { StepLayout, AnimatedParticles } from '../../../../components/onboarding';
import { CheckCircleIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function BrandOnboardingStep5() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    paymentMethod: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingPincode: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const paymentMethods = ['Credit Card', 'Debit Card', 'Net Banking', 'UPI', 'Bank Transfer'];

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Puducherry', 'Chandigarh', 'Jammu and Kashmir', 'Ladakh'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Payment method is required';
    }

    if (!formData.billingAddress.trim()) {
      newErrors.billingAddress = 'Billing address is required';
    }

    if (!formData.billingCity.trim()) {
      newErrors.billingCity = 'Billing city is required';
    }

    if (!formData.billingState.trim()) {
      newErrors.billingState = 'Billing state is required';
    }

    if (!formData.billingPincode.trim()) {
      newErrors.billingPincode = 'Billing pincode is required';
    } else if (!/^\d{6}$/.test(formData.billingPincode)) {
      newErrors.billingPincode = 'Please enter a valid 6-digit pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const existingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
        const completeData = {
          ...existingData.brand,
          ...formData,
          profileComplete: true
        };
        
        // Save locally just in case
        localStorage.setItem('onboardingData', JSON.stringify({
          ...existingData,
          brand: completeData
        }));

        // Call Registration API using shared client
        const { apiPost } = await import('@/lib/api/client');
        await apiPost('/api/brands/register', completeData);
        
        setIsComplete(true);
        setIsSubmitting(false);
        
        // Clear onboarding data on success
        localStorage.removeItem('onboardingData');
        
        setTimeout(() => {
          router.push('/brand-dashboard');
        }, 3000);
      } catch (error) {
        console.error('Registration error:', error);
        setErrors({ submit: error instanceof Error ? error.message : 'Submission failed. Please try again.' });
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    router.push('/onboarding/brand/step4');
  };

  const icon = (
    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
      <CreditCardIcon className="w-10 h-10 text-white" />
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
            className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-8 flex items-center justify-center"
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
            Your brand profile has been submitted for review. You&apos;re one step closer to connecting with authentic creators and launching successful campaigns.
          </motion.p>

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
      currentStep={5}
      totalSteps={5}
      stepTitle="Payment Setup"
      title="Complete Your Setup"
      subtitle="Set up your payment preferences and billing information to complete registration."
      icon={icon}
      onNext={handleNext}
      onBack={handleBack}
      nextLabel={isSubmitting ? "Submitting..." : "Complete Registration"}
    >
      <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-8">
        {/* Payment Method */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-4">
            Preferred Payment Method *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {paymentMethods.map((method) => (
              <motion.button
                key={method}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method }))}
                className={`p-4 rounded-xl border-2 font-bold transition-all duration-200 ${
                  formData.paymentMethod === method
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 bg-white text-gray-900 hover:border-black'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {method}
              </motion.button>
            ))}
          </div>
          {errors.paymentMethod && (
            <p className="mt-2 text-sm font-medium text-red-600">{errors.paymentMethod}</p>
          )}
        </div>

        {/* Billing Address */}
        <div className="border-t-2 border-gray-200 pt-8 space-y-6">
          <h3 className="text-lg font-black text-gray-900">Billing Address</h3>
          
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Address *
            </label>
            <textarea
              name="billingAddress"
              value={formData.billingAddress}
              onChange={(e) => handleInputChange(e)}
              rows={3}
              className={`w-full px-6 py-4 text-lg border-2 rounded-xl focus:outline-none focus:border-black transition-all duration-200 resize-none ${
                errors.billingAddress ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your billing address"
              required
            />
            {errors.billingAddress && (
              <p className="mt-2 text-sm font-medium text-red-600">{errors.billingAddress}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input
                label="City *"
                type="text"
                name="billingCity"
                value={formData.billingCity}
                onChange={handleInputChange}
                placeholder="Enter city"
                error={errors.billingCity}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                State *
              </label>
              <select
                name="billingState"
                value={formData.billingState}
                onChange={handleInputChange}
                className={`w-full px-6 py-4 text-lg border-2 rounded-xl transition-all duration-200 focus:outline-none focus:border-black ${
                  errors.billingState ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              >
                <option value="">Select State</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {errors.billingState && (
                <p className="mt-2 text-sm font-medium text-red-600">{errors.billingState}</p>
              )}
            </div>
          </div>

          <Input
            label="Pincode *"
            type="text"
            name="billingPincode"
            value={formData.billingPincode}
            onChange={handleInputChange}
            placeholder="123456"
            error={errors.billingPincode}
            hint="6-digit pincode"
            required
          />
        </div>

        {/* Security Notice */}
        <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
          <div className="flex items-start space-x-3">
            <svg className="w-6 h-6 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="text-sm font-black text-blue-900 mb-1">Secure Payment Information</h4>
              <p className="text-sm text-blue-700">
                Your payment details are encrypted and securely stored. We use industry-standard security measures to protect your financial information.
              </p>
            </div>
          </div>
        </div>

        {errors.submit && (
          <p className="text-sm font-medium text-red-600">{errors.submit}</p>
        )}
      </form>
    </StepLayout>
  );
}

