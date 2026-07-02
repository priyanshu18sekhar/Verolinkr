'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button } from '../../../../components/design-system';
import { StepLayout } from '../../../../components/onboarding';
import { PhoneIcon } from '@heroicons/react/24/outline';

export default function CreatorOnboardingStep1() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    mobileNumber: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNumber.replace(/\D/g, ''))) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      // Store form data
      const existingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
      localStorage.setItem('onboardingData', JSON.stringify({
        ...existingData,
        creator: {
          ...existingData.creator,
          mobileNumber: formData.mobileNumber
        }
      }));
      router.push('/onboarding/creator/step2');
    }
  };

  const icon = (
    <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-[#08080c]">
      <PhoneIcon className="w-10 h-10 text-white" />
    </div>
  );

  return (
    <StepLayout
      currentStep={1}
      totalSteps={7}
      stepTitle="Mobile Verification"
      title="Verify Your Mobile Number"
      subtitle="We'll send a verification code to your mobile number to ensure account security."
      icon={icon}
      onNext={handleNext}
      showBack={false}
      nextLabel="Send Code"
    >
      <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-8">
        <Input
          label="Mobile Number"
          type="tel"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleInputChange}
          placeholder="1234567890"
          error={errors.mobileNumber}
          hint="Enter your 10-digit mobile number"
          required
        />
      </form>
    </StepLayout>
  );
}

