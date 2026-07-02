'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Input } from '../../../../components/design-system';
import { StepLayout } from '../../../../components/onboarding';
import { TagIcon } from '@heroicons/react/24/outline';

export default function CreatorOnboardingStep4() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    primaryCategories: [] as string[],
    languages: [] as string[],
    primaryCity: '',
    primaryState: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const contentCategories = [
    'Fashion & Beauty', 'Lifestyle', 'Food & Cooking', 'Travel', 'Fitness & Wellness',
    'Technology', 'Gaming', 'Education', 'Business & Finance', 'Entertainment',
    'Sports', 'Art & Design', 'Music', 'Photography', 'Parenting',
    'Home & Garden', 'Automotive', 'Health', 'DIY & Crafts', 'Pet Care'
  ];

  const languages = [
    'English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Gujarati',
    'Urdu', 'Kannada', 'Odia', 'Malayalam', 'Punjabi', 'Assamese', 'Nepali',
    'Sanskrit', 'French', 'Spanish', 'German', 'Chinese', 'Japanese'
  ];

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Puducherry', 'Chandigarh', 'Jammu and Kashmir', 'Ladakh'
  ];

  const handleCategoryToggle = (category: string) => {
    if (formData.primaryCategories.includes(category)) {
      setFormData(prev => ({
        ...prev,
        primaryCategories: prev.primaryCategories.filter(c => c !== category)
      }));
    } else if (formData.primaryCategories.length < 5) {
      setFormData(prev => ({
        ...prev,
        primaryCategories: [...prev.primaryCategories, category]
      }));
    }
    
    if (errors.primaryCategories) {
      setErrors(prev => ({ ...prev, primaryCategories: '' }));
    }
  };

  const handleLanguageToggle = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
    
    if (errors.languages) {
      setErrors(prev => ({ ...prev, languages: '' }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.primaryCategories.length === 0) {
      newErrors.primaryCategories = 'Please select at least one content category';
    }

    if (formData.languages.length === 0) {
      newErrors.languages = 'Please select at least one language';
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
        creator: {
          ...existingData.creator,
          ...formData
        }
      }));
      router.push('/onboarding/creator/step5');
    }
  };

  const handleBack = () => {
    router.push('/onboarding/creator/step3');
  };

  const icon = (
    <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-[#08080c]">
      <TagIcon className="w-10 h-10 text-white" />
    </div>
  );

  return (
    <StepLayout
      currentStep={4}
      totalSteps={7}
      stepTitle="Niche & Influence"
      title="Define Your Niche & Influence"
      subtitle="Help brands understand your content focus and reach the right audience."
      icon={icon}
      onNext={handleNext}
      onBack={handleBack}
    >
      <div className="space-y-8">
        {/* Content Categories */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-4">
            Primary Content Categories * (Select up to 5)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {contentCategories.map((category) => (
              <motion.button
                key={category}
                type="button"
                onClick={() => handleCategoryToggle(category)}
                className={`p-3 rounded-xl border-2 text-sm font-bold transition-all duration-200 ${
                  formData.primaryCategories.includes(category)
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 bg-white text-gray-900 hover:border-black'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Selected: {formData.primaryCategories.length}/5
          </p>
          {errors.primaryCategories && (
            <p className="mt-2 text-sm font-medium text-red-600">{errors.primaryCategories}</p>
          )}
        </div>

        {/* Languages */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-4">
            Languages You Create Content In *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {languages.map((language) => (
              <motion.button
                key={language}
                type="button"
                onClick={() => handleLanguageToggle(language)}
                className={`p-2 rounded-xl border-2 text-sm font-bold transition-all duration-200 ${
                  formData.languages.includes(language)
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 bg-white text-gray-900 hover:border-black'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {language}
              </motion.button>
            ))}
          </div>
          {errors.languages && (
            <p className="mt-2 text-sm font-medium text-red-600">{errors.languages}</p>
          )}
        </div>

        {/* Location */}
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
      </div>
    </StepLayout>
  );
}

