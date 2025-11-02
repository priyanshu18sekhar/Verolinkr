'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { StepLayout } from '../../../../components/onboarding';
import { LinkIcon } from '@heroicons/react/24/outline';

export default function CreatorOnboardingStep5() {
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
    { id: 'instagram', name: 'Instagram', icon: '📷', color: 'from-purple-500 to-pink-500' },
    { id: 'youtube', name: 'YouTube', icon: '📺', color: 'from-red-500 to-red-600' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', color: 'from-black to-gray-800' },
    { id: 'twitter', name: 'Twitter/X', icon: '🐦', color: 'from-blue-400 to-blue-500' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'from-blue-600 to-blue-700' }
  ];

  const otherPlatformOptions = [
    'Facebook', 'Snapchat', 'Pinterest', 'Twitch', 'Clubhouse', 'Spotify', 'Medium', 'Blog'
  ];

  const handleSocialConnect = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      [`${platform}Connected`]: !prev[`${platform}Connected` as keyof typeof prev] as boolean
    }));
  };

  const handleAddOtherPlatform = () => {
    if (newPlatform.platform && newPlatform.url) {
      try {
        new URL(newPlatform.url);
        setFormData(prev => ({
          ...prev,
          otherPlatforms: [...prev.otherPlatforms, newPlatform]
        }));
        setNewPlatform({ platform: '', url: '' });
        if (errors.socialMedia) setErrors(prev => ({ ...prev, socialMedia: '' }));
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
      router.push('/onboarding/creator/step6');
    }
  };

  const handleBack = () => {
    router.push('/onboarding/creator/step4');
  };

  const icon = (
    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
      <LinkIcon className="w-10 h-10 text-white" />
    </div>
  );

  return (
    <StepLayout
      currentStep={5}
      totalSteps={7}
      stepTitle="Social Media Connection"
      title="Connect Your Social Media"
      subtitle="Link your social media accounts to showcase your reach and help brands discover you."
      icon={icon}
      onNext={handleNext}
      onBack={handleBack}
    >
      <div className="space-y-8">
        {/* Major Social Platforms */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-4">
            Connect Major Platforms
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socialPlatforms.map((platform) => {
              const isConnected = formData[`${platform.id}Connected` as keyof typeof formData] as boolean;
              return (
                <motion.button
                  key={platform.id}
                  type="button"
                  onClick={() => handleSocialConnect(platform.id)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-200 text-left ${
                    isConnected
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 bg-white hover:border-black'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${platform.color} flex items-center justify-center text-white text-2xl`}>
                      {platform.icon}
                    </div>
                    <div>
                      <p className="font-black text-lg">{platform.name}</p>
                      <p className={`text-sm ${isConnected ? 'text-gray-300' : 'text-gray-500'}`}>
                        {isConnected ? 'Connected ✓' : 'Click to connect'}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Other Platforms */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-4">
            Add Other Platforms
          </label>
          
          {formData.otherPlatforms.length > 0 && (
            <div className="space-y-3 mb-4">
              {formData.otherPlatforms.map((platform, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                  <div>
                    <p className="font-bold text-gray-900">{platform.platform}</p>
                    <p className="text-sm text-gray-600">{platform.url}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveOtherPlatform(index)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Platform Name
              </label>
              <select
                value={newPlatform.platform}
                onChange={(e) => setNewPlatform(prev => ({ ...prev, platform: e.target.value }))}
                className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-black transition-all duration-200"
              >
                <option value="">Select Platform</option>
                {otherPlatformOptions.map(platform => (
                  <option key={platform} value={platform}>{platform}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Profile URL
              </label>
              <input
                type="url"
                value={newPlatform.url}
                onChange={(e) => setNewPlatform(prev => ({ ...prev, url: e.target.value }))}
                className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-black transition-all duration-200"
                placeholder="https://..."
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddOtherPlatform}
            disabled={!newPlatform.platform || !newPlatform.url}
            className="w-full mt-4 px-6 py-4 bg-gray-100 text-gray-900 rounded-xl font-bold hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Platform
          </button>
        </div>

        {errors.socialMedia && (
          <p className="text-sm font-medium text-red-600">{errors.socialMedia}</p>
        )}
      </div>
    </StepLayout>
  );
}

