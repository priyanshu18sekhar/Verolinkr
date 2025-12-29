'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fadeInUp } from '@/utils/animations';

export default function CreatorRegistrationStep4() {
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
    setFormData(prev => ({
      ...prev,
      primaryCategories: prev.primaryCategories.includes(category)
        ? prev.primaryCategories.filter(c => c !== category)
        : [...prev.primaryCategories, category]
    }));
    
    // Clear error when user makes selection
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
    
    // Clear error when user makes selection
    if (errors.languages) {
      setErrors(prev => ({ ...prev, languages: '' }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.primaryCategories.length === 0) {
      newErrors.primaryCategories = 'Please select at least one content category';
    } else if (formData.primaryCategories.length > 5) {
      newErrors.primaryCategories = 'Please select maximum 5 categories';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Store form data and proceed to next step
      const existingData = JSON.parse(localStorage.getItem('creatorRegistrationData') || '{}');
      const updatedData = { ...existingData, ...formData };
      localStorage.setItem('creatorRegistrationData', JSON.stringify(updatedData));
      router.push('/creator-registration/step5');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Indicator */}
        <motion.div
          className="mb-8"
          {...fadeInUp}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                4
              </div>
              <span className="font-medium text-gray-900">Niche & Influence</span>
            </div>
            <span className="text-sm text-gray-500">Step 4 of 7</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '57.1%' }}></div>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-8"
          {...fadeInUp}
        >
          <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Define Your Niche & Influence
          </h1>
          <p className="text-gray-600">
            Help brands understand your content focus and reach the right audience for their campaigns.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8"
          {...fadeInUp}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Content Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Primary Content Categories * (Select up to 5)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {contentCategories.map((category) => (
                  <motion.button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryToggle(category)}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                      formData.primaryCategories.includes(category)
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Selected: {formData.primaryCategories.length}/5
              </p>
              {errors.primaryCategories && (
                <p className="mt-1 text-sm text-red-600">{errors.primaryCategories}</p>
              )}
            </div>

            {/* Languages */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Languages You Create Content In *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {languages.map((language) => (
                  <motion.button
                    key={language}
                    type="button"
                    onClick={() => handleLanguageToggle(language)}
                    className={`p-2 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                      formData.languages.includes(language)
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {language}
                  </motion.button>
                ))}
              </div>
              {errors.languages && (
                <p className="mt-1 text-sm text-red-600">{errors.languages}</p>
              )}
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="primaryCity" className="block text-sm font-medium text-gray-700 mb-2">
                  Primary City *
                </label>
                <input
                  type="text"
                  id="primaryCity"
                  name="primaryCity"
                  value={formData.primaryCity}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.primaryCity ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your primary city"
                />
                {errors.primaryCity && (
                  <p className="mt-1 text-sm text-red-600">{errors.primaryCity}</p>
                )}
              </div>
              <div>
                <label htmlFor="primaryState" className="block text-sm font-medium text-gray-700 mb-2">
                  Primary State *
                </label>
                <select
                  id="primaryState"
                  name="primaryState"
                  value={formData.primaryState}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.primaryState ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select State</option>
                  {indianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                {errors.primaryState && (
                  <p className="mt-1 text-sm text-red-600">{errors.primaryState}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Continue to Social Media</span>
              <ArrowRightIcon className="w-5 h-5" />
            </motion.button>
          </form>

          {/* Back Button */}
          <div className="mt-6 text-center">
            <Link
              href="/creator-registration/step3"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-1" />
              Back to Profile Setup
            </Link>
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200"
          {...fadeInUp}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-purple-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-purple-900">Selection Tips</h4>
              <ul className="text-sm text-purple-700 mt-1 space-y-1">
                <li>• Choose categories that best represent your content and expertise</li>
                <li>• Select languages you&apos;re comfortable creating content in</li>
                <li>• Your location helps brands find creators in specific regions</li>
                <li>• Be specific to attract the right brand partnerships</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}








