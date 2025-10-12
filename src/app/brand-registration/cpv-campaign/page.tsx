'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowTrendingUpIcon,
  EyeIcon,
  ClockIcon,
  MapPinIcon,
  UsersIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

export default function CPVCampaignCreation() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Campaign Basics
    campaignName: '',
    description: '',
    category: '',
    
    // Content Requirements
    platform: '',
    contentType: '',
    contentRequirements: '',
    targetAudience: '',
    
    // Budget & Performance
    budget: '',
    cpvRate: '',
    targetViews: '',
    campaignDuration: '',
    
    // Location & Timing
    targetLocation: '',
    startDate: '',
    endDate: '',
    
    // Creator Requirements
    minFollowers: '',
    maxFollowers: '',
    engagementRate: '',
    niche: '',
    
    // Additional Settings
    brandGuidelines: '',
    hashtags: '',
    mentions: '',
    exclusivity: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  const steps = [
    { id: 1, title: 'Campaign Basics', description: 'Name and description' },
    { id: 2, title: 'Content Requirements', description: 'Platform and content type' },
    { id: 3, title: 'Budget & Performance', description: 'CPV rate and targets' },
    { id: 4, title: 'Creator Criteria', description: 'Influencer requirements' },
    { id: 5, title: 'Review & Launch', description: 'Final review and launch' }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsCreated(true);
    setIsSubmitting(false);
  };

  const calculateEstimatedCost = () => {
    const budget = parseFloat(formData.budget) || 0;
    const cpvRate = parseFloat(formData.cpvRate) || 0;
    if (budget && cpvRate) {
      return Math.floor(budget / cpvRate);
    }
    return 0;
  };

  if (isCreated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          {...fadeInUp}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircleIcon className="w-12 h-12 text-purple-600" />
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-6">Campaign Created!</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Your CPV campaign is now live and attracting creator applications. 
            Our AI will automatically vet and match creators based on your criteria.
          </p>
          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-purple-800 mb-4">What Happens Next?</h3>
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="w-5 h-5 text-purple-600" />
                <span className="text-purple-700">Creators are being matched to your campaign</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="w-5 h-5 text-purple-600" />
                <span className="text-purple-700">AI verifies creator authenticity</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="w-5 h-5 text-purple-600" />
                <span className="text-purple-700">Content gets approved before going live</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="w-5 h-5 text-purple-600" />
                <span className="text-purple-700">Pay only for verified, authentic views</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => window.location.href = '/brand-dashboard'}
            className="bg-black text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Go to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.div
        className="bg-white border-b border-gray-100"
        {...fadeInUp}
        transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex items-center space-x-4 mb-6">
            <ArrowTrendingUpIcon className="w-8 h-8 text-purple-600" />
            <div>
              <h1 className="text-4xl font-black text-gray-900">Create CPV Campaign</h1>
              <p className="text-lg text-gray-600">Pay only for verified views with guaranteed ROI</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  currentStep >= step.id 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.id}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`font-bold text-sm ${
                    currentStep >= step.id ? 'text-purple-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-purple-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <motion.div
          className="bg-white rounded-2xl border border-gray-100 p-8"
          {...fadeInUp}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          {/* Step 1: Campaign Basics */}
          {currentStep === 1 && (
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <DocumentTextIcon className="w-6 h-6 text-purple-600" />
                <h2 className="text-3xl font-black text-gray-900">Campaign Basics</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Campaign Name *
                  </label>
                  <input
                    type="text"
                    value={formData.campaignName}
                    onChange={(e) => handleInputChange('campaignName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Summer Fashion Launch 2024"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Campaign Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Describe your campaign goals, target audience, and key messaging..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    <option value="fashion">Fashion & Beauty</option>
                    <option value="technology">Technology</option>
                    <option value="food">Food & Beverage</option>
                    <option value="fitness">Fitness & Wellness</option>
                    <option value="travel">Travel & Lifestyle</option>
                    <option value="gaming">Gaming</option>
                    <option value="education">Education</option>
                    <option value="finance">Finance</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Content Requirements */}
          {currentStep === 2 && (
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <EyeIcon className="w-6 h-6 text-purple-600" />
                <h2 className="text-3xl font-black text-gray-900">Content Requirements</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Platform *
                  </label>
                  <select
                    value={formData.platform}
                    onChange={(e) => handleInputChange('platform', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select platform</option>
                    <option value="instagram">Instagram</option>
                    <option value="youtube">YouTube</option>
                    <option value="tiktok">TikTok</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">Twitter</option>
                    <option value="facebook">Facebook</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Content Type *
                  </label>
                  <select
                    value={formData.contentType}
                    onChange={(e) => handleInputChange('contentType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select content type</option>
                    <option value="reels">Reels/Shorts</option>
                    <option value="posts">Posts</option>
                    <option value="stories">Stories</option>
                    <option value="videos">Long-form Videos</option>
                    <option value="live">Live Streams</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Content Requirements *
                  </label>
                  <textarea
                    value={formData.contentRequirements}
                    onChange={(e) => handleInputChange('contentRequirements', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Specify what you want creators to include in their content..."
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Target Audience *
                  </label>
                  <input
                    type="text"
                    value={formData.targetAudience}
                    onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., 18-35 years old, fashion enthusiasts, urban professionals"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Budget & Performance */}
          {currentStep === 3 && (
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <CurrencyDollarIcon className="w-6 h-6 text-purple-600" />
                <h2 className="text-3xl font-black text-gray-900">Budget & Performance</h2>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-8">
                <div className="flex items-center space-x-3">
                  <ExclamationTriangleIcon className="w-5 h-5 text-purple-600" />
                  <p className="text-purple-800 font-medium">
                    CPV campaigns ensure you only pay for verified, authentic views. Our AI filters out bot traffic.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Total Budget (₹) *
                  </label>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="50000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    CPV Rate (₹) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.cpvRate}
                    onChange={(e) => handleInputChange('cpvRate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0.25"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Target Views *
                  </label>
                  <input
                    type="number"
                    value={formData.targetViews}
                    onChange={(e) => handleInputChange('targetViews', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="200000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Campaign Duration (days) *
                  </label>
                  <input
                    type="number"
                    value={formData.campaignDuration}
                    onChange={(e) => handleInputChange('campaignDuration', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="14"
                  />
                </div>
              </div>
              
              {formData.budget && formData.cpvRate && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-6">
                  <h3 className="text-lg font-bold text-green-800 mb-2">Estimated Performance</h3>
                  <p className="text-green-700">
                    With a budget of ₹{formData.budget} and CPV rate of ₹{formData.cpvRate}, 
                    you can expect approximately <strong>{calculateEstimatedCost().toLocaleString()} verified views</strong>.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Creator Criteria */}
          {currentStep === 4 && (
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <UsersIcon className="w-6 h-6 text-purple-600" />
                <h2 className="text-3xl font-black text-gray-900">Creator Criteria</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Minimum Followers *
                  </label>
                  <input
                    type="number"
                    value={formData.minFollowers}
                    onChange={(e) => handleInputChange('minFollowers', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="10000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Maximum Followers
                  </label>
                  <input
                    type="number"
                    value={formData.maxFollowers}
                    onChange={(e) => handleInputChange('maxFollowers', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="1000000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Minimum Engagement Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.engagementRate}
                    onChange={(e) => handleInputChange('engagementRate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="3.0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Target Location *
                  </label>
                  <input
                    type="text"
                    value={formData.targetLocation}
                    onChange={(e) => handleInputChange('targetLocation', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="India, Mumbai, Delhi, Bangalore"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.exclusivity}
                    onChange={(e) => handleInputChange('exclusivity', e.target.checked)}
                    className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-gray-700 font-medium">
                    Require creator exclusivity (no competing brand content during campaign period)
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Step 5: Review & Launch */}
          {currentStep === 5 && (
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <CheckCircleIcon className="w-6 h-6 text-purple-600" />
                <h2 className="text-3xl font-black text-gray-900">Review & Launch</h2>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Campaign Summary</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Campaign Details</h4>
                    <div className="bg-white rounded-lg p-4 space-y-2 text-sm">
                      <p><span className="font-medium">Name:</span> {formData.campaignName}</p>
                      <p><span className="font-medium">Category:</span> {formData.category}</p>
                      <p><span className="font-medium">Platform:</span> {formData.platform}</p>
                      <p><span className="font-medium">Content Type:</span> {formData.contentType}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Budget & Performance</h4>
                    <div className="bg-white rounded-lg p-4 space-y-2 text-sm">
                      <p><span className="font-medium">Total Budget:</span> ₹{formData.budget}</p>
                      <p><span className="font-medium">CPV Rate:</span> ₹{formData.cpvRate}</p>
                      <p><span className="font-medium">Target Views:</span> {formData.targetViews?.toLocaleString()}</p>
                      <p><span className="font-medium">Duration:</span> {formData.campaignDuration} days</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Creator Requirements</h4>
                    <div className="bg-white rounded-lg p-4 space-y-2 text-sm">
                      <p><span className="font-medium">Follower Range:</span> {formData.minFollowers} - {formData.maxFollowers || 'No limit'}</p>
                      <p><span className="font-medium">Min Engagement:</span> {formData.engagementRate}%</p>
                      <p><span className="font-medium">Location:</span> {formData.targetLocation}</p>
                      <p><span className="font-medium">Exclusivity:</span> {formData.exclusivity ? 'Required' : 'Not required'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <div className="flex items-center space-x-3">
                  <ExclamationTriangleIcon className="w-5 h-5 text-purple-600" />
                  <p className="text-purple-800 font-medium">
                    By launching this campaign, you agree to our Terms of Service. 
                    Your budget will be held in escrow until views are verified.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all duration-200 ${
                currentStep === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Previous</span>
            </button>
            
            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                className="bg-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-700 transition-all duration-200 flex items-center space-x-2"
              >
                <span>Next</span>
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating Campaign...</span>
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="w-5 h-5" />
                    <span>Launch Campaign</span>
                  </>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
