'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/utils/animations';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreatorRegistrationStep6() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    asciGuidelines: false,
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    pan: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
    
    // Clear error when user checks
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.asciGuidelines) {
      newErrors.asciGuidelines = 'You must acknowledge the ASCI guidelines';
    }

    if (!formData.bankName.trim()) {
      newErrors.bankName = 'Bank name is required';
    }

    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required';
    } else if (!/^\d{9,18}$/.test(formData.accountNumber.replace(/\D/g, ''))) {
      newErrors.accountNumber = 'Please enter a valid account number (9-18 digits)';
    }

    if (!formData.ifscCode.trim()) {
      newErrors.ifscCode = 'IFSC code is required';
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode.toUpperCase())) {
      newErrors.ifscCode = 'Please enter a valid IFSC code (e.g., SBIN0001234)';
    }

    if (!formData.pan.trim()) {
      newErrors.pan = 'PAN is required';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan.toUpperCase())) {
      newErrors.pan = 'Please enter a valid PAN (e.g., ABCDE1234F)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Get existing data
        const existingData = JSON.parse(localStorage.getItem('creatorRegistrationData') || '{}');
        
        // Combine with current form data
        const completeData = {
          ...existingData,
          ...formData,
          // Explicitly set profilePhoto to empty string/null to avoid serialization issues
          // In a real app, this would be a URL from a previous upload step
          profilePhoto: null
        };

        // Call registration API
        const response = await fetch('/api/creators/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(completeData),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          // Update local storage with combined data for the final step display
          localStorage.setItem('creatorRegistrationData', JSON.stringify({
            ...completeData,
            creatorId: result.creatorId
          }));
          
          router.push('/creator-registration/step7');
        } else {
          throw new Error(result.error || 'Registration failed');
        }
      } catch (error: any) {
        console.error('Registration error:', error);
        setErrors({ submit: error.message || 'Submission failed. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const popularBanks = [
    'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank',
    'Punjab National Bank', 'Bank of Baroda', 'Canara Bank', 'Union Bank of India',
    'Indian Bank', 'Bank of India', 'Central Bank of India', 'IDBI Bank', 'Yes Bank'
  ];

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
                6
              </div>
              <span className="font-medium text-gray-900">Compliance & Payment Setup</span>
            </div>
            <span className="text-sm text-gray-500">Step 6 of 7</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85.7%' }}></div>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-8"
          {...fadeInUp}
        >
          <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Compliance & Payment Setup
          </h1>
          <p className="text-gray-600">
            Complete your registration by acknowledging guidelines and setting up your payment details.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8"
          {...fadeInUp}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* ASCI Guidelines */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Advertising Standards Council of India (ASCI) Guidelines
              </h3>
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800">
                  By acknowledging these guidelines, you agree to comply with ASCI&apos;s Code for Self-Regulation 
                  in Advertising, ensuring that all sponsored content is honest, truthful, and not misleading.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="asciGuidelines"
                  name="asciGuidelines"
                  checked={formData.asciGuidelines}
                  onChange={handleCheckboxChange}
                  className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="asciGuidelines" className="text-sm text-gray-700">
                  I acknowledge and agree to comply with the ASCI guidelines for sponsored content. 
                  I understand that all brand collaborations must be clearly disclosed and follow 
                  ethical advertising practices.{' '}
                  <Link href="/asci-guidelines" className="text-purple-600 hover:text-purple-500 underline">
                    Read full guidelines
                  </Link>
                </label>
              </div>
              {errors.asciGuidelines && (
                <p className="mt-1 text-sm text-red-600">{errors.asciGuidelines}</p>
              )}
            </div>

            {/* Payment Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Payment Details
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Provide your bank account details for receiving payments. This information is encrypted and secure.
              </p>

              <div className="space-y-6">
                {/* Bank Name */}
                <div>
                  <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Name *
                  </label>
                  <select
                    id="bankName"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                      errors.bankName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Bank</option>
                    {popularBanks.map(bank => (
                      <option key={bank} value={bank}>{bank}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                  {errors.bankName && (
                    <p className="mt-1 text-sm text-red-600">{errors.bankName}</p>
                  )}
                </div>

                {/* Account Number */}
                <div>
                  <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Account Number *
                  </label>
                  <input
                    type="text"
                    id="accountNumber"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                      errors.accountNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your account number"
                  />
                  {errors.accountNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.accountNumber}</p>
                  )}
                </div>

                {/* IFSC Code */}
                <div>
                  <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700 mb-2">
                    IFSC Code *
                  </label>
                  <input
                    type="text"
                    id="ifscCode"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 uppercase ${
                      errors.ifscCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="SBIN0001234"
                    style={{ textTransform: 'uppercase' }}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Format: 4 letters + 0 + 6 alphanumeric characters
                  </p>
                  {errors.ifscCode && (
                    <p className="mt-1 text-sm text-red-600">{errors.ifscCode}</p>
                  )}
                </div>

                {/* PAN */}
                <div>
                  <label htmlFor="pan" className="block text-sm font-medium text-gray-700 mb-2">
                    PAN Number *
                  </label>
                  <input
                    type="text"
                    id="pan"
                    name="pan"
                    value={formData.pan}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 uppercase ${
                      errors.pan ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="ABCDE1234F"
                    style={{ textTransform: 'uppercase' }}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Format: 5 letters + 4 digits + 1 letter
                  </p>
                  {errors.pan && (
                    <p className="mt-1 text-sm text-red-600">{errors.pan}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Completing Registration...</span>
                </>
              ) : (
                <>
                  <span>Complete Registration</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Back Button */}
          <div className="mt-6 text-center">
            <Link
              href="/creator-registration/step5"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-1" />
              Back to Social Media
            </Link>
          </div>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200"
          {...fadeInUp}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-purple-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-purple-900">Secure & Encrypted</h4>
              <p className="text-sm text-purple-700 mt-1">
                All your payment information is encrypted and stored securely. We comply with 
                PCI DSS standards and will only use this information for processing your payments.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}








