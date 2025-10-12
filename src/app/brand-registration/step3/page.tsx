'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, ArrowLeftIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BrandRegistrationStep3() {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, logo: 'Please select a valid image file' }));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, logo: 'File size must be less than 5MB' }));
        return;
      }

      setFormData(prev => ({ ...prev, logo: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Clear error
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Store form data and proceed to next step
      const existingData = JSON.parse(localStorage.getItem('brandRegistrationData') || '{}');
      const updatedData = { ...existingData, ...formData };
      localStorage.setItem('brandRegistrationData', JSON.stringify(updatedData));
      router.push('/brand-registration/step4');
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Puducherry', 'Chandigarh', 'Jammu and Kashmir', 'Ladakh'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Indicator */}
        <motion.div
          className="mb-8"
          {...fadeInUp}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <span className="font-medium text-gray-900">Brand Profile Setup</span>
            </div>
            <span className="text-sm text-gray-500">Step 3 of 5</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-8"
          {...fadeInUp}
        >
          <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Tell Us About Your Brand
          </h1>
          <p className="text-gray-600">
            Help creators understand your brand better by sharing your story and values.
          </p>
        </motion.div>

        {/* Profile Form */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8"
          {...fadeInUp}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand Logo
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="w-20 h-20 rounded-lg object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                      <PhotoIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="logo"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                  >
                    <PhotoIcon className="w-4 h-4 mr-2" />
                    {formData.logo ? 'Change Logo' : 'Upload Logo'}
                  </label>
                  <input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG up to 5MB. Recommended: 200x200px
                  </p>
                </div>
              </div>
              {errors.logo && (
                <p className="mt-1 text-sm text-red-600">{errors.logo}</p>
              )}
            </div>

            {/* Brand Tagline */}
            <div>
              <label htmlFor="brandTagline" className="block text-sm font-medium text-gray-700 mb-2">
                Brand Tagline *
              </label>
              <input
                type="text"
                id="brandTagline"
                name="brandTagline"
                value={formData.brandTagline}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.brandTagline ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="A short, memorable tagline for your brand"
                maxLength={100}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.brandTagline.length}/100 characters
              </p>
              {errors.brandTagline && (
                <p className="mt-1 text-sm text-red-600">{errors.brandTagline}</p>
              )}
            </div>

            {/* About Us */}
            <div>
              <label htmlFor="aboutUs" className="block text-sm font-medium text-gray-700 mb-2">
                About Your Brand *
              </label>
              <textarea
                id="aboutUs"
                name="aboutUs"
                value={formData.aboutUs}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                  errors.aboutUs ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Tell creators about your brand, mission, values, and what makes you unique..."
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.aboutUs.length}/500 characters (minimum 50)
              </p>
              {errors.aboutUs && (
                <p className="mt-1 text-sm text-red-600">{errors.aboutUs}</p>
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
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
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
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
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
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Continue to Business Verification</span>
              <ArrowRightIcon className="w-5 h-5" />
            </motion.button>
          </form>

          {/* Back Button */}
          <div className="mt-6 text-center">
            <Link
              href="/brand-registration/step2"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-1" />
              Back to Mobile Verification
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
              <h4 className="text-sm font-medium text-purple-900">Profile Tips</h4>
              <ul className="text-sm text-purple-700 mt-1 space-y-1">
                <li>• Use a clear, high-quality logo that represents your brand</li>
                <li>• Write a compelling tagline that creators will remember</li>
                <li>• Be authentic in your "About Us" section to attract the right creators</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
