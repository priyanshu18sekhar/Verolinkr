'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Input } from '../../../../components/design-system';
import { StepLayout } from '../../../../components/onboarding';
import { UserGroupIcon } from '@heroicons/react/24/outline';

export default function CreatorOnboardingStep6() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    audienceAgeRange: '',
    audienceGender: '',
    audienceLocations: [] as string[],
    followerCount: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const ageRanges = ['13-17', '18-24', '25-34', '35-44', '45-54', '55+'];
  const genderOptions = ['Male', 'Female', 'Non-binary', 'Mixed'];
  const locations = ['India', 'USA', 'UK', 'Canada', 'Australia', 'Global'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleLocationToggle = (location: string) => {
    setFormData(prev => ({
      ...prev,
      audienceLocations: prev.audienceLocations.includes(location)
        ? prev.audienceLocations.filter(l => l !== location)
        : [...prev.audienceLocations, location]
    }));
    
    if (errors.audienceLocations) {
      setErrors(prev => ({ ...prev, audienceLocations: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.audienceAgeRange) {
      newErrors.audienceAgeRange = 'Age range is required';
    }

    if (!formData.audienceGender) {
      newErrors.audienceGender = 'Gender distribution is required';
    }

    if (formData.audienceLocations.length === 0) {
      newErrors.audienceLocations = 'Please select at least one location';
    }

    if (!formData.followerCount) {
      newErrors.followerCount = 'Follower count is required';
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
      router.push('/onboarding/creator/step7');
    }
  };

  const handleBack = () => {
    router.push('/onboarding/creator/step5');
  };

  const icon = (
    <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-[#08080c]">
      <UserGroupIcon className="w-10 h-10 text-white" />
    </div>
  );

  return (
    <StepLayout
      currentStep={6}
      totalSteps={7}
      stepTitle="Audience Demographics"
      title="Tell Us About Your Audience"
      subtitle="Help brands understand who engages with your content to find the perfect match."
      icon={icon}
      onNext={handleNext}
      onBack={handleBack}
    >
      <div className="space-y-8">
        {/* Age Range */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-4">
            Primary Audience Age Range *
          </label>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {ageRanges.map((range) => (
              <motion.button
                key={range}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, audienceAgeRange: range }))}
                className={`p-3 rounded-xl border-2 text-sm font-bold transition-all duration-200 ${
                  formData.audienceAgeRange === range
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 bg-white text-gray-900 hover:border-black'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {range}
              </motion.button>
            ))}
          </div>
          {errors.audienceAgeRange && (
            <p className="mt-2 text-sm font-medium text-red-600">{errors.audienceAgeRange}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-4">
            Audience Gender Distribution *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {genderOptions.map((gender) => (
              <motion.button
                key={gender}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, audienceGender: gender }))}
                className={`p-4 rounded-xl border-2 font-bold transition-all duration-200 ${
                  formData.audienceGender === gender
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 bg-white text-gray-900 hover:border-black'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {gender}
              </motion.button>
            ))}
          </div>
          {errors.audienceGender && (
            <p className="mt-2 text-sm font-medium text-red-600">{errors.audienceGender}</p>
          )}
        </div>

        {/* Locations */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-4">
            Primary Audience Locations * (Select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {locations.map((location) => (
              <motion.button
                key={location}
                type="button"
                onClick={() => handleLocationToggle(location)}
                className={`p-4 rounded-xl border-2 font-bold transition-all duration-200 ${
                  formData.audienceLocations.includes(location)
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 bg-white text-gray-900 hover:border-black'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {location}
              </motion.button>
            ))}
          </div>
          {errors.audienceLocations && (
            <p className="mt-2 text-sm font-medium text-red-600">{errors.audienceLocations}</p>
          )}
        </div>

        {/* Follower Count */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">
            Total Follower Count *
          </label>
          <select
            name="followerCount"
            value={formData.followerCount}
            onChange={handleInputChange}
            className={`w-full px-6 py-4 text-lg border-2 rounded-xl transition-all duration-200 focus:outline-none focus:border-black ${
              errors.followerCount ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          >
            <option value="">Select Range</option>
            <option value="0-1K">0 - 1,000</option>
            <option value="1K-10K">1,000 - 10,000</option>
            <option value="10K-50K">10,000 - 50,000</option>
            <option value="50K-100K">50,000 - 100,000</option>
            <option value="100K-500K">100,000 - 500,000</option>
            <option value="500K-1M">500,000 - 1,000,000</option>
            <option value="1M+">1,000,000+</option>
          </select>
          {errors.followerCount && (
            <p className="mt-2 text-sm font-medium text-red-600">{errors.followerCount}</p>
          )}
        </div>
      </div>
    </StepLayout>
  );
}

