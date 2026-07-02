'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../../../../components/design-system';
import { StepLayout } from '../../../../components/onboarding';
import { PhoneIcon } from '@heroicons/react/24/outline';

export default function BrandOnboardingStep1() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: '',
    businessEmail: '',
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

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.businessEmail) {
      newErrors.businessEmail = 'Business email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.businessEmail)) {
      newErrors.businessEmail = 'Please enter a valid email address';
    }

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
      const existingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
      localStorage.setItem('onboardingData', JSON.stringify({
        ...existingData,
        brand: {
          ...existingData.brand,
          ...formData
        }
      }));
      router.push('/onboarding/brand/step2');
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
      totalSteps={5}
      stepTitle="Basic Information"
      title="Welcome, Brand!"
      subtitle="Let's get started by collecting some basic information about your company."
      icon={icon}
      onNext={handleNext}
      showBack={false}
      nextLabel="Continue"
    >
      <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-8">
        <Input
          label="Company Name"
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          placeholder="Enter your company name"
          error={errors.companyName}
          required
        />

        <Input
          label="Business Email"
          type="email"
          name="businessEmail"
          value={formData.businessEmail}
          onChange={handleInputChange}
          placeholder="you@company.com"
          error={errors.businessEmail}
          required
        />

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

