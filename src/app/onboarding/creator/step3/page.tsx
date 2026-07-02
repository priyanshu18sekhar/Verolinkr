'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button } from '../../../../components/design-system';
import { StepLayout } from '../../../../components/onboarding';
import { UserCircleIcon, PhotoIcon } from '@heroicons/react/24/outline';

export default function CreatorOnboardingStep3() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    professionalHandle: '',
    profilePhoto: null as File | null,
    shortBio: ''
  });
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, profilePhoto: 'Please select a valid image file' }));
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, profilePhoto: 'File size must be less than 5MB' }));
        return;
      }

      setFormData(prev => ({ ...prev, profilePhoto: file }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      if (errors.profilePhoto) {
        setErrors(prev => ({ ...prev, profilePhoto: '' }));
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.professionalHandle.trim()) {
      newErrors.professionalHandle = 'Professional handle is required';
    } else if (formData.professionalHandle.length < 3) {
      newErrors.professionalHandle = 'Handle must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.professionalHandle)) {
      newErrors.professionalHandle = 'Handle can only contain letters, numbers, and underscores';
    }

    if (!formData.shortBio.trim()) {
      newErrors.shortBio = 'Short bio is required';
    } else if (formData.shortBio.trim().length < 20) {
      newErrors.shortBio = 'Bio must be at least 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      const existingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
      localStorage.setItem('onboardingData', JSON.stringify({
        ...existingData,
        creator: {
          ...existingData.creator,
          ...formData
        }
      }));
      router.push('/onboarding/creator/step4');
    }
  };

  const handleBack = () => {
    router.push('/onboarding/creator/step2');
  };

  const icon = (
    <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-[#08080c]">
      <UserCircleIcon className="w-10 h-10 text-white" />
    </div>
  );

  return (
    <StepLayout
      currentStep={3}
      totalSteps={7}
      stepTitle="Profile Setup"
      title="Tell Us About Yourself"
      subtitle="Help brands understand who you are and what makes you unique as a creator."
      icon={icon}
      onNext={handleNext}
      onBack={handleBack}
      nextLabel="Continue"
    >
      <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-8">
        {/* Profile Photo Upload */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">
            Profile Photo
          </label>
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              {profilePreview ? (
                <img
                  src={profilePreview}
                  alt="Profile preview"
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
                htmlFor="profilePhoto"
                className="cursor-pointer inline-flex items-center px-6 py-3 border-2 border-gray-300 rounded-xl text-sm font-bold text-gray-700 bg-white hover:border-black transition-colors duration-200"
              >
                <PhotoIcon className="w-5 h-5 mr-2" />
                {formData.profilePhoto ? 'Change Photo' : 'Upload Photo'}
              </label>
              <input
                id="profilePhoto"
                type="file"
                accept="image/*"
                onChange={handleProfilePhotoChange}
                className="hidden"
              />
              <p className="text-xs text-gray-500 mt-2">
                PNG, JPG up to 5MB. Recommended: 400x400px
              </p>
            </div>
          </div>
          {errors.profilePhoto && (
            <p className="mt-2 text-sm font-medium text-red-600">{errors.profilePhoto}</p>
          )}
        </div>

        <Input
          label="Full Name"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="Enter your full name"
          error={errors.fullName}
          required
        />

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">
            Professional Handle
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-500 text-lg">@</span>
            </div>
            <input
              type="text"
              name="professionalHandle"
              value={formData.professionalHandle}
              onChange={handleInputChange}
              className={`w-full pl-8 pr-6 py-4 text-lg border-2 rounded-xl transition-all duration-200 focus:outline-none focus:border-black ${
                errors.professionalHandle ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="yourhandle"
              required
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            This will be your unique identifier on the platform
          </p>
          {errors.professionalHandle && (
            <p className="mt-2 text-sm font-medium text-red-600">{errors.professionalHandle}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">
            Short Bio
          </label>
          <textarea
            name="shortBio"
            value={formData.shortBio}
            onChange={handleInputChange}
            rows={4}
            className={`w-full px-6 py-4 text-lg border-2 rounded-xl focus:outline-none focus:border-black transition-all duration-200 resize-none ${
              errors.shortBio ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Tell brands about yourself, your content style, and what makes you unique..."
            maxLength={300}
            required
          />
          <p className="text-xs text-gray-500 mt-2">
            {formData.shortBio.length}/300 characters (minimum 20)
          </p>
          {errors.shortBio && (
            <p className="mt-2 text-sm font-medium text-red-600">{errors.shortBio}</p>
          )}
        </div>
      </form>
    </StepLayout>
  );
}

