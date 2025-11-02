'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input, Button, Container, Typography } from '../../../components/design-system';
import { fadeInUp } from '../../../utils/animations';

export default function CreatorRegistrationStep1() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNumber.replace(/\D/g, ''))) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem('creatorRegistrationData', JSON.stringify(formData));
      router.push('/creator-registration/step2');
    }
  };

  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <Container size="md">
        {/* Progress Indicator */}
        <motion.div
          className="mb-16"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-lg font-black">
                1
              </div>
              <Typography variant="h6" className="font-black">
                Basic Information
              </Typography>
            </div>
            <span className="text-sm font-medium text-gray-500">Step 1 of 7</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-black h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '14.3%' }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <div className="w-20 h-20 bg-purple-100 rounded-full mx-auto mb-8 flex items-center justify-center">
            <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <Typography variant="h2" className="mb-6">
            Welcome, Creator!
          </Typography>
          <Typography variant="lead" className="text-gray-600 max-w-2xl mx-auto">
            Let's get you started on VeroLinkr. This process will help you connect with amazing brands and monetize your content.
          </Typography>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          className="bg-white border-2 border-gray-200 rounded-3xl p-12 max-w-2xl mx-auto"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              error={errors.email}
              required
            />

            <Input
              label="Mobile Number"
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              placeholder="1234567890"
              error={errors.mobileNumber}
              hint="Enter your 10-digit mobile number"
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a strong password"
              error={errors.password}
              hint="Must be at least 8 characters long"
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              error={errors.confirmPassword}
              required
            />

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-4">
              <input
                type="checkbox"
                id="terms"
                className="mt-2 h-5 w-5 rounded border-gray-300 text-black focus:ring-black"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{' '}
                <Link href="/terms" className="text-black font-bold hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-black font-bold hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="secondary"
              gradient="creator"
              size="lg"
              className="w-full"
            >
              <span>Continue to Verification</span>
              <ArrowRightIcon className="w-6 h-6 ml-2" />
            </Button>
          </form>

          {/* Back to Auth */}
          <div className="mt-8 text-center">
            <Link
              href="/auth"
              className="text-sm font-medium text-gray-600 hover:text-black"
            >
              ← Back to Login
            </Link>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          className="mt-12 p-8 bg-purple-50 rounded-2xl border border-purple-200 max-w-2xl mx-auto"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-purple-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <Typography variant="h6" className="font-black mb-3 text-purple-900">
                Why Join VeroLinkr?
              </Typography>
              <ul className="text-sm text-purple-700 space-y-2">
                <li>• Connect with verified brands and secure partnerships</li>
                <li>• Get paid through our secure escrow system</li>
                <li>• Access real-time analytics and performance insights</li>
                <li>• Join a community of authentic creators</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
