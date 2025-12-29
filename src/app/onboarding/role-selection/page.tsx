'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container, Typography, Button } from '../../../components/design-system';
import { AnimatedParticles } from '../../../components/onboarding';
import { fadeInUp } from '../../../utils/animations';

export default function RoleSelectionPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<'creator' | 'brand' | null>(null);

  const handleRoleSelect = (role: 'creator' | 'brand') => {
    setSelectedRole(role);
    
    // Store role selection
    const authData = localStorage.getItem('authData');
    if (authData) {
      const data = JSON.parse(authData);
      data.userType = role;
      localStorage.setItem('authData', JSON.stringify(data));
    }

    // Redirect to appropriate onboarding flow
    setTimeout(() => {
      if (role === 'creator') {
        router.push('/onboarding/creator/step1');
      } else {
        router.push('/onboarding/brand/step1');
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Subtle background elements matching Hero */}
      <AnimatedParticles count={60} />

      <Container size="lg">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="w-full relative z-10"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography variant="h2" className="mb-6 font-black">
                Choose Your Path
              </Typography>
              <Typography variant="lead" className="text-gray-600 font-light max-w-2xl mx-auto">
                Select how you&apos;d like to use VeroLinkr. You can always update this later.
              </Typography>
            </motion.div>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* Creator Card */}
            <motion.div
              className={`p-12 border-2 rounded-3xl cursor-pointer transition-all duration-300 ${
                selectedRole === 'creator'
                  ? 'border-black bg-gray-50'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
              onClick={() => handleRoleSelect('creator')}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto mb-8 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <Typography variant="h4" className="font-black mb-4 text-center">
                I&apos;m a Creator
              </Typography>
              <p className="text-gray-600 text-center mb-6 leading-relaxed">
                Find brand partnerships, monetize your content, and grow your audience with authentic campaigns.
              </p>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Connect with verified brands</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Secure escrow payments</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Real-time analytics</span>
                </li>
              </ul>
            </motion.div>

            {/* Brand Card */}
            <motion.div
              className={`p-12 border-2 rounded-3xl cursor-pointer transition-all duration-300 ${
                selectedRole === 'brand'
                  ? 'border-black bg-gray-50'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
              onClick={() => handleRoleSelect('brand')}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mx-auto mb-8 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <Typography variant="h4" className="font-black mb-4 text-center">
                I&apos;m a Brand
              </Typography>
              <p className="text-gray-600 text-center mb-6 leading-relaxed">
                Connect with authentic creators, launch campaigns, and track performance with detailed analytics.
              </p>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Find verified creators</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Launch targeted campaigns</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Track ROI and performance</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <Link
              href="/auth"
              className="text-sm font-medium text-gray-600 hover:text-black"
            >
              ← Back to Login
            </Link>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}

