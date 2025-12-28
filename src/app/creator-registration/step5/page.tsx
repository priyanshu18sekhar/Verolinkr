'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreatorRegistrationStep5() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    instagramConnected: false,
    youtubeConnected: false,
    tiktokConnected: false,
    twitterConnected: false,
    linkedinConnected: false,
    otherPlatforms: [] as { platform: string; url: string }[]
  });
  const [newPlatform, setNewPlatform] = useState({ platform: '', url: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const socialPlatforms = [
    { id: 'instagram', name: 'Instagram', icon: '📷', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'youtube', name: 'YouTube', icon: '📺', color: 'bg-gradient-to-r from-red-500 to-red-600' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', color: 'bg-gradient-to-r from-black to-gray-800' },
    { id: 'twitter', name: 'Twitter/X', icon: '🐦', color: 'bg-gradient-to-r from-blue-400 to-blue-500' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'bg-gradient-to-r from-blue-600 to-blue-700' }
  ];

  const otherPlatformOptions = [
    'Facebook', 'Snapchat', 'Pinterest', 'Twitch', 'Clubhouse', 'Spotify', 'Medium', 'Blog'
  ];

  const handleSocialConnect = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      [`${platform}Connected`]: !prev[`${platform}Connected` as keyof typeof prev]
    }));
  };

  const handleAddOtherPlatform = () => {
    if (newPlatform.platform && newPlatform.url) {
      // Basic URL validation
      try {
        new URL(newPlatform.url);
        setFormData(prev => ({
          ...prev,
          otherPlatforms: [...prev.otherPlatforms, newPlatform]
        }));
        setNewPlatform({ platform: '', url: '' });
      } catch {
        setErrors({ url: 'Please enter a valid URL' });
      }
    }
  };

  const handleRemoveOtherPlatform = (index: number) => {
    setFormData(prev => ({
      ...prev,
      otherPlatforms: prev.otherPlatforms.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const hasAnyConnection = socialPlatforms.some(platform => 
      formData[`${platform.id}Connected` as keyof typeof formData]
    ) || formData.otherPlatforms.length > 0;

    if (!hasAnyConnection) {
      newErrors.socialMedia = 'Please connect at least one social media platform';
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
      router.push('/creator-registration/step6');
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
                5
              </div>
              <span className="font-medium text-gray-900">Social Media Connection</span>
            </div>
            <span className="text-sm text-gray-500">Step 5 of 7</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '71.4%' }}></div>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-8"
          {...fadeInUp}
        >
          <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Connect Your Social Media
          </h1>
          <p className="text-gray-600">
            Link your social media accounts to showcase your reach and help brands discover you.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8"
          {...fadeInUp}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Major Social Platforms */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Connect Major Platforms
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {socialPlatforms.map((platform) => (
                  <motion.button
                    key={platform.id}
                    type="button"
                    onClick={() => handleSocialConnect(platform.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData[`${platform.id}Connected` as keyof typeof formData]
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 bg-white hover:border-purple-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${platform.color}`}>
                        <span className="text-lg">{platform.icon}</span>
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-gray-900">{platform.name}</p>
                        <p className="text-sm text-gray-500">
                          {formData[`${platform.id}Connected` as keyof typeof formData]
                            ? 'Connected ✓'
                            : 'Click to connect'
                          }
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Other Platforms */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Add Other Platforms
              </h3>
              
              {/* Existing Other Platforms */}
              {formData.otherPlatforms.length > 0 && (
                <div className="space-y-3 mb-4">
                  {formData.otherPlatforms.map((platform, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{platform.platform}</p>
                        <p className="text-sm text-gray-500">{platform.url}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveOtherPlatform(index)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Platform */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-2">
                      Platform Name
                    </label>
                    <select
                      id="platform"
                      value={newPlatform.platform}
                      onChange={(e) => setNewPlatform(prev => ({ ...prev, platform: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select Platform</option>
                      {otherPlatformOptions.map(platform => (
                        <option key={platform} value={platform}>{platform}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                      Profile URL
                    </label>
                    <input
                      type="url"
                      id="url"
                      value={newPlatform.url}
                      onChange={(e) => setNewPlatform(prev => ({ ...prev, url: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddOtherPlatform}
                  disabled={!newPlatform.platform || !newPlatform.url}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Platform
                </button>
                {errors.url && (
                  <p className="text-sm text-red-600">{errors.url}</p>
                )}
              </div>
            </div>

            {errors.socialMedia && (
              <motion.div
                className="p-4 bg-red-50 border border-red-200 rounded-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-sm text-red-600">{errors.socialMedia}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Continue to Compliance</span>
              <ArrowRightIcon className="w-5 h-5" />
            </motion.button>
          </form>

          {/* Back Button */}
          <div className="mt-6 text-center">
            <Link
              href="/creator-registration/step4"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-1" />
              Back to Niche & Influence
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
              <h4 className="text-sm font-medium text-purple-900">Social Media Tips</h4>
              <ul className="text-sm text-purple-700 mt-1 space-y-1">
                <li>• Connect platforms where you&apos;re most active and have the best engagement</li>
                <li>• Ensure your profiles are public so brands can review your content</li>
                <li>• You can always add or remove platforms later in your dashboard</li>
                <li>• This helps brands understand your reach and content style</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}








