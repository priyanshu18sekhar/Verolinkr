'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, ArrowLeftIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreatorRegistrationStep3() {
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
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, profilePhoto: 'Please select a valid image file' }));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, profilePhoto: 'File size must be less than 5MB' }));
        return;
      }

      setFormData(prev => ({ ...prev, profilePhoto: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Clear error
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Store form data and proceed to next step
      const existingData = JSON.parse(localStorage.getItem('creatorRegistrationData') || '{}');
      const updatedData = { ...existingData, ...formData };
      localStorage.setItem('creatorRegistrationData', JSON.stringify(updatedData));
      router.push('/creator-registration/step4');
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
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
                3
              </div>
              <span className="font-medium text-gray-900">Profile Setup (Identity)</span>
            </div>
            <span className="text-sm text-gray-500">Step 3 of 7</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '42.9%' }}></div>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-8"
          {...fadeInUp}
        >
          <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Tell Us About Yourself
          </h1>
          <p className="text-gray-600">
            Help brands understand who you are and what makes you unique as a creator.
          </p>
        </motion.div>

        {/* Profile Form */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8"
          {...fadeInUp}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                  >
                    <PhotoIcon className="w-4 h-4 mr-2" />
                    {formData.profilePhoto ? 'Change Photo' : 'Upload Photo'}
                  </label>
                  <input
                    id="profilePhoto"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePhotoChange}
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG up to 5MB. Recommended: 400x400px
                  </p>
                </div>
              </div>
              {errors.profilePhoto && (
                <p className="mt-1 text-sm text-red-600">{errors.profilePhoto}</p>
              )}
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
                required
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            {/* Professional Handle */}
            <div>
              <label htmlFor="professionalHandle" className="block text-sm font-medium text-gray-700 mb-2">
                Professional Handle *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm">@</span>
                </div>
                <input
                  type="text"
                  id="professionalHandle"
                  name="professionalHandle"
                  value={formData.professionalHandle}
                  onChange={handleInputChange}
                  className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.professionalHandle ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="yourhandle"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                This will be your unique identifier on the platform (letters, numbers, and underscores only)
              </p>
              {errors.professionalHandle && (
                <p className="mt-1 text-sm text-red-600">{errors.professionalHandle}</p>
              )}
            </div>

            {/* Short Bio */}
            <div>
              <label htmlFor="shortBio" className="block text-sm font-medium text-gray-700 mb-2">
                Short Bio *
              </label>
              <textarea
                id="shortBio"
                name="shortBio"
                value={formData.shortBio}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none ${
                  errors.shortBio ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Tell brands about yourself, your content style, and what makes you unique as a creator..."
                maxLength={300}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.shortBio.length}/300 characters (minimum 20)
              </p>
              {errors.shortBio && (
                <p className="mt-1 text-sm text-red-600">{errors.shortBio}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Continue to Niche & Influence</span>
              <ArrowRightIcon className="w-5 h-5" />
            </motion.button>
          </form>

          {/* Back Button */}
          <div className="mt-6 text-center">
            <Link
              href="/creator-registration/step2"
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
                <li>• Use a clear, professional profile photo that represents your brand</li>
                <li>• Choose a memorable handle that's easy to find and remember</li>
                <li>• Write a compelling bio that highlights your unique value proposition</li>
                <li>• Be authentic and let your personality shine through</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}






