'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreatorRegistrationStep7() {
  const router = useRouter();
  const [creatorData, setCreatorData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Retrieve stored creator data
    const storedData = localStorage.getItem('creatorRegistrationData');
    if (storedData) {
      setCreatorData(JSON.parse(storedData));
    }
    setIsLoading(false);
  }, []);

  const handleCompleteRegistration = () => {
    // Clear stored data
    localStorage.removeItem('creatorRegistrationData');
    // Redirect to login or dashboard
    router.push('/auth');
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                ✓
              </div>
              <span className="font-medium text-gray-900">Registration Complete</span>
            </div>
            <span className="text-sm text-gray-500">Step 7 of 7</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
          {...fadeInUp}
        >
          <motion.div
            className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircleIcon className="w-12 h-12 text-green-600" />
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to VeroLinkr!
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Your creator profile has been submitted for review. You're one step closer to 
            connecting with amazing brands and monetizing your content.
          </p>

          <motion.div
            className="bg-purple-50 rounded-xl p-6 mb-8 text-left"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <h3 className="font-semibold text-purple-900 mb-4">What happens next?</h3>
            <motion.div variants={fadeInUp} className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-900">Profile Review</p>
                  <p className="text-sm text-purple-700">Our team will review your profile and verify your social media accounts.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-900">Account Activation</p>
                  <p className="text-sm text-purple-700">Once approved, your profile will be live and visible to brands.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-900">Start Earning</p>
                  <p className="text-sm text-purple-700">You'll receive notifications when brands want to collaborate with you.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Review Timeline */}
          <motion.div
            className="bg-gray-50 rounded-xl p-6 mb-8"
            {...fadeInUp}
          >
            <h3 className="font-semibold text-gray-900 mb-3">Review Timeline</h3>
            <div className="flex items-center justify-between text-sm">
              <div className="text-center">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-semibold mx-auto mb-2">
                  ✓
                </div>
                <p className="text-gray-600">Submitted</p>
                <p className="text-xs text-gray-500">Now</p>
              </div>
              <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>
              <div className="text-center">
                <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-semibold mx-auto mb-2">
                  24h
                </div>
                <p className="text-gray-600">Under Review</p>
                <p className="text-xs text-gray-500">24 hours</p>
              </div>
              <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>
              <div className="text-center">
                <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-semibold mx-auto mb-2">
                  ✓
                </div>
                <p className="text-gray-600">Live</p>
                <p className="text-xs text-gray-500">Ready to earn</p>
              </div>
            </div>
          </motion.div>

          {/* Account Summary */}
          {creatorData && (
            <motion.div
              className="bg-white border border-gray-200 rounded-xl p-6 mb-8 text-left"
              {...fadeInUp}
            >
              <h3 className="font-semibold text-gray-900 mb-4">Profile Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium text-gray-900">{creatorData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Handle:</span>
                  <span className="font-medium text-gray-900">@{creatorData.professionalHandle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Categories:</span>
                  <span className="font-medium text-gray-900">
                    {creatorData.primaryCategories?.slice(0, 2).join(', ')}
                    {creatorData.primaryCategories?.length > 2 && '...'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium text-gray-900">{creatorData.primaryCity}, {creatorData.primaryState}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-purple-600">Under Review</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            className="space-y-4"
            {...fadeInUp}
          >
            <motion.button
              onClick={handleCompleteRegistration}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Continue to Login</span>
              <ArrowRightIcon className="w-5 h-5" />
            </motion.button>

            <div className="flex space-x-4">
              <Link
                href="/contact"
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200 text-center"
              >
                Contact Support
              </Link>
              <Link
                href="/"
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200 text-center"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Creator Benefits */}
        <motion.div
          className="mt-8 p-6 bg-purple-50 rounded-xl border border-purple-200"
          {...fadeInUp}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-purple-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-purple-900">Your Creator Journey Starts Now!</h4>
              <ul className="text-sm text-purple-700 mt-1 space-y-1">
                <li>• Get matched with brands that align with your content and values</li>
                <li>• Receive secure payments through our escrow system</li>
                <li>• Access detailed analytics to track your campaign performance</li>
                <li>• Join a community of authentic creators building meaningful partnerships</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Support Information */}
        <motion.div
          className="mt-6 p-6 bg-blue-50 rounded-xl border border-blue-200"
          {...fadeInUp}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-900">Need Help?</h4>
              <p className="text-sm text-blue-700 mt-1">
                If you have any questions about your registration or need to make changes, 
                please contact our support team. We're here to help you succeed!
              </p>
              <div className="mt-3 flex space-x-4 text-sm">
                <a href="mailto:support@verolinkr.com" className="text-blue-600 hover:text-blue-500 font-medium">
                  support@verolinkr.com
                </a>
                <a href="tel:+15551234567" className="text-blue-600 hover:text-blue-500 font-medium">
                  +1 (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}





