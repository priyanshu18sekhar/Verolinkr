'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../../../../components/design-system';
import { StepLayout } from '../../../../components/onboarding';
import { BuildingOfficeIcon, PhotoIcon } from '@heroicons/react/24/outline';

export default function BrandOnboardingStep3() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    logo: null as File | null,
    brandTagline: '',
    aboutUs: '',
    primaryCity: '',
    primaryState: ''
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Puducherry', 'Chandigarh', 'Jammu and Kashmir', 'Ladakh'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, logo: 'Please select a valid image file' }));
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, logo: 'File size must be less than 5MB' }));
        return;
      }

      setFormData(prev => ({ ...prev, logo: file }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      if (errors.logo) {
        setErrors(prev => ({ ...prev, logo: '' }));
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.brandTagline.trim()) {
      newErrors.brandTagline = 'Brand tagline is required';
    }

    if (!formData.aboutUs.trim()) {
      newErrors.aboutUs = 'About us section is required';
    } else if (formData.aboutUs.trim().length < 50) {
      newErrors.aboutUs = 'About us must be at least 50 characters';
    }

    if (!formData.primaryCity.trim()) {
      newErrors.primaryCity = 'Primary city is required';
    }

    if (!formData.primaryState.trim()) {
      newErrors.primaryState = 'Primary state is required';
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
      router.push('/onboarding/brand/step4');
    }
  };

  const handleBack = () => {
    router.push('/onboarding/brand/step2');
  };

  const icon = (
    <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-[#08080c]">
      <BuildingOfficeIcon className="w-10 h-10 text-white" />
    </div>
  );

  return (
    <StepLayout
      currentStep={3}
      totalSteps={5}
      stepTitle="Company Details"
      title="Tell Us About Your Brand"
      subtitle="Help creators understand your brand and what you're looking for in partnerships."
      icon={icon}
      onNext={handleNext}
      onBack={handleBack}
    >
      <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-8">
        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">
            Company Logo
          </label>
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300">
                  <PhotoIcon className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <label
                htmlFor="logo"
                className="cursor-pointer inline-flex items-center px-6 py-3 border-2 border-gray-300 rounded-xl text-sm font-bold text-gray-700 bg-white hover:border-black transition-colors duration-200"
              >
                <PhotoIcon className="w-5 h-5 mr-2" />
                {formData.logo ? 'Change Logo' : 'Upload Logo'}
              </label>
              <input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
              <p className="text-xs text-gray-500 mt-2">
                PNG, JPG up to 5MB. Recommended: 400x400px
              </p>
            </div>
          </div>
          {errors.logo && (
            <p className="mt-2 text-sm font-medium text-red-600">{errors.logo}</p>
          )}
        </div>

        <Input
          label="Brand Tagline"
          type="text"
          name="brandTagline"
          value={formData.brandTagline}
          onChange={handleInputChange}
          placeholder="Your brand's mission in one line"
          error={errors.brandTagline}
          required
        />

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">
            About Us *
          </label>
          <textarea
            name="aboutUs"
            value={formData.aboutUs}
            onChange={handleInputChange}
            rows={6}
            className={`w-full px-6 py-4 text-lg border-2 rounded-xl focus:outline-none focus:border-black transition-all duration-200 resize-none ${
              errors.aboutUs ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Tell creators about your brand, values, and what you're looking for in partnerships..."
            maxLength={500}
            required
          />
          <p className="text-xs text-gray-500 mt-2">
            {formData.aboutUs.length}/500 characters (minimum 50)
          </p>
          {errors.aboutUs && (
            <p className="mt-2 text-sm font-medium text-red-600">{errors.aboutUs}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input
              label="Primary City"
              type="text"
              name="primaryCity"
              value={formData.primaryCity}
              onChange={handleInputChange}
              placeholder="Enter your primary city"
              error={errors.primaryCity}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Primary State *
            </label>
            <select
              name="primaryState"
              value={formData.primaryState}
              onChange={handleInputChange}
              className={`w-full px-6 py-4 text-lg border-2 rounded-xl transition-all duration-200 focus:outline-none focus:border-black ${
                errors.primaryState ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            >
              <option value="">Select State</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            {errors.primaryState && (
              <p className="mt-2 text-sm font-medium text-red-600">{errors.primaryState}</p>
            )}
          </div>
        </div>
      </form>
    </StepLayout>
  );
}

