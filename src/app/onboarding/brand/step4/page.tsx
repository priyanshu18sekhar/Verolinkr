'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../../../../components/design-system';
import { StepLayout } from '../../../../components/onboarding';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

export default function BrandOnboardingStep4() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    gstin: '',
    businessPan: '',
    authorizedSignatoryName: '',
    authorizedSignatoryEmail: '',
    authorizedSignatoryPhone: '',
    authorizedSignatoryDesignation: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Force re-render
    console.log('Input changed:', name);
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };



  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.gstin && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstin.toUpperCase())) {
      newErrors.gstin = 'Please enter a valid GSTIN format';
    }

    if (!formData.businessPan) {
      newErrors.businessPan = 'Business PAN is required';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.businessPan.toUpperCase())) {
      newErrors.businessPan = 'Please enter a valid PAN format (e.g., ABCDE1234F)';
    }



    if (!formData.authorizedSignatoryName.trim()) {
      newErrors.authorizedSignatoryName = 'Authorized signatory name is required';
    }

    if (!formData.authorizedSignatoryEmail.trim()) {
      newErrors.authorizedSignatoryEmail = 'Authorized signatory email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.authorizedSignatoryEmail)) {
      newErrors.authorizedSignatoryEmail = 'Please enter a valid email address';
    }

    if (!formData.authorizedSignatoryPhone.trim()) {
      newErrors.authorizedSignatoryPhone = 'Authorized signatory phone is required';
    } else if (!/^\d{10}$/.test(formData.authorizedSignatoryPhone.replace(/\D/g, ''))) {
      newErrors.authorizedSignatoryPhone = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.authorizedSignatoryDesignation.trim()) {
      newErrors.authorizedSignatoryDesignation = 'Designation is required';
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
      router.push('/onboarding/brand/step5');
    }
  };

  const handleBack = () => {
    router.push('/onboarding/brand/step3');
  };

  const icon = (
    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
      <DocumentTextIcon className="w-10 h-10 text-white" />
    </div>
  );

  return (
    <StepLayout
      currentStep={4}
      totalSteps={5}
      stepTitle="KYC Verification"
      title="Complete KYC Verification"
      subtitle="Please provide your business documentation for verification."
      icon={icon}
      onNext={handleNext}
      onBack={handleBack}
      onSkip={() => router.push('/onboarding/brand/step5')}
      skipLabel="Skip Verification"
    >
      <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-8">
        {/* GSTIN (Optional) */}
        <Input
          label="GSTIN (Optional)"
          type="text"
          name="gstin"
          value={formData.gstin}
          onChange={(e) => {
            e.target.value = e.target.value.toUpperCase();
            handleInputChange(e);
          }}
          placeholder="22AAAAA0000A1Z5"
          error={errors.gstin}
          hint="15-character GSTIN (optional)"
        />

        {/* Business PAN */}
        <Input
          label="Business PAN *"
          type="text"
          name="businessPan"
          value={formData.businessPan}
          onChange={(e) => {
            e.target.value = e.target.value.toUpperCase();
            handleInputChange(e);
          }}
          placeholder="ABCDE1234F"
          error={errors.businessPan}
          hint="10-character PAN (e.g., ABCDE1234F)"
          required
        />



        {/* Authorized Signatory */}
        <div className="space-y-6 border-t-2 border-gray-200 pt-8">
          <h3 className="text-lg font-black text-gray-900">Authorized Signatory Details</h3>
          
          <Input
            label="Full Name *"
            type="text"
            name="authorizedSignatoryName"
            value={formData.authorizedSignatoryName}
            onChange={handleInputChange}
            placeholder="Enter full name"
            error={errors.authorizedSignatoryName}
            required
          />

          <Input
            label="Email Address *"
            type="email"
            name="authorizedSignatoryEmail"
            value={formData.authorizedSignatoryEmail}
            onChange={handleInputChange}
            placeholder="signatory@company.com"
            error={errors.authorizedSignatoryEmail}
            required
          />

          <Input
            label="Mobile Number *"
            type="tel"
            name="authorizedSignatoryPhone"
            value={formData.authorizedSignatoryPhone}
            onChange={handleInputChange}
            placeholder="1234567890"
            error={errors.authorizedSignatoryPhone}
            hint="10-digit mobile number"
            required
          />

          <Input
            label="Designation *"
            type="text"
            name="authorizedSignatoryDesignation"
            value={formData.authorizedSignatoryDesignation}
            onChange={handleInputChange}
            placeholder="e.g., CEO, Director, Manager"
            error={errors.authorizedSignatoryDesignation}
            required
          />
        </div>
      </form>
    </StepLayout>
  );
}

