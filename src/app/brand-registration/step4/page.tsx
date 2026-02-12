'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, ArrowLeftIcon, DocumentIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fadeInUp } from '@/utils/animations';

export default function BrandRegistrationStep4() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    gstin: '',
    businessPan: '',
    authorizedSignatoryName: '',
    authorizedSignatoryEmail: '',
    authorizedSignatoryPhone: '',
    authorizedSignatoryDesignation: '',
    // Bank Details
    bankAccountHolder: '',
    bankAccountNumber: '',
    bankIfscCode: '',
    bankName: '',
    bankUpiId: '',
    bankProof: null as File | null
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('brandRegistrationData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData(prev => ({
        ...prev,
        gstin: parsed.gstin || '',
        businessPan: parsed.businessPan || '',
        authorizedSignatoryName: parsed.authorizedSignatoryName || '',
        authorizedSignatoryEmail: parsed.authorizedSignatoryEmail || '',
        authorizedSignatoryPhone: parsed.authorizedSignatoryPhone || '',
        authorizedSignatoryDesignation: parsed.authorizedSignatoryDesignation || '',
        bankAccountHolder: parsed.bankAccountHolder || '',
        bankAccountNumber: parsed.bankAccountNumber || '',
        bankIfscCode: parsed.bankIfscCode || '',
        bankName: parsed.bankName || '',
        bankUpiId: parsed.bankUpiId || ''
      }));
    }
  }, []);

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

    // GSTIN validation (optional but if provided, should be valid format)
    if (formData.gstin && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstin)) {
      newErrors.gstin = 'Please enter a valid GSTIN format';
    }

    // PAN validation
    if (!formData.businessPan) {
      newErrors.businessPan = 'Business PAN is required';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.businessPan)) {
      newErrors.businessPan = 'Please enter a valid PAN format (e.g., ABCDE1234F)';
    }

    // Company proof is optional for now as storage is pending
    // if (!formData.companyRegistrationProof) {
    //   newErrors.companyRegistrationProof = 'Company registration proof is required';
    // }

    if (!formData.authorizedSignatoryName.trim()) {
      newErrors.authorizedSignatoryName = 'Authorized signatory name is required';
    }

    if (!formData.authorizedSignatoryEmail.trim()) {
      newErrors.authorizedSignatoryEmail = 'Authorized signatory email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.authorizedSignatoryEmail)) {
      newErrors.authorizedSignatoryEmail = 'Please enter a valid email address';
    }

    if (!formData.authorizedSignatoryPhone.trim()) {
      newErrors.authorizedSignatoryPhone = 'Authorized signatory phone is required';
    } else if (!/^\d{10}$/.test(formData.authorizedSignatoryPhone.replace(/\D/g, ''))) {
      newErrors.authorizedSignatoryPhone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.authorizedSignatoryDesignation.trim()) {
      newErrors.authorizedSignatoryDesignation = 'Designation is required';
    }

    // Bank Details validation
    if (!formData.bankAccountHolder.trim()) {
      newErrors.bankAccountHolder = 'Account holder name is required';
    }

    if (!formData.bankAccountNumber.trim()) {
      newErrors.bankAccountNumber = 'Account number is required';
    } else if (!/^\d{9,18}$/.test(formData.bankAccountNumber.replace(/\D/g, ''))) {
      newErrors.bankAccountNumber = 'Please enter a valid account number (9-18 digits)';
    }

    if (!formData.bankIfscCode.trim()) {
      newErrors.bankIfscCode = 'IFSC code is required';
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.bankIfscCode.toUpperCase())) {
      newErrors.bankIfscCode = 'Please enter a valid IFSC code (e.g., HDFC0001234)';
    }

    if (!formData.bankName.trim()) {
      newErrors.bankName = 'Bank name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Store form data
        const existingData = JSON.parse(localStorage.getItem('brandRegistrationData') || '{}');
        const completeData = {
          ...existingData,
          gstin: formData.gstin,
          businessPan: formData.businessPan,
          authorizedSignatoryName: formData.authorizedSignatoryName,
          authorizedSignatoryEmail: formData.authorizedSignatoryEmail,
          authorizedSignatoryPhone: formData.authorizedSignatoryPhone,
          authorizedSignatoryDesignation: formData.authorizedSignatoryDesignation,
          bankAccountHolder: formData.bankAccountHolder,
          bankAccountNumber: formData.bankAccountNumber,
          bankIfscCode: formData.bankIfscCode,
          bankName: formData.bankName,
          bankUpiId: formData.bankUpiId,
          profileComplete: true,
          // Explicitly set these to null to avoid serialization issues with File objects
          // In the future, these should be uploaded to storage and URLs reserved here
          bankProof: null,
          logo: null // From step 3
        };
        
        localStorage.setItem('brandRegistrationData', JSON.stringify(completeData));
        
        // Call registration API
        const response = await fetch('/api/brands/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(completeData)
        });
        
        const result = await response.json();
        
        if (result.success) {
          localStorage.setItem('brandId', result.brandId);
          router.push('/brand-registration/step5');
        } else {
          console.error('Registration failed:', result.error);
          setErrors({ submit: result.error || 'Registration failed. Please try again.' });
        }
      } catch (error) {
        console.error('Registration error:', error);
        setErrors({ submit: 'An unexpected error occurred. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSkipRegistration = async () => {
      setIsSubmitting(true);
      try {
        const existingData = JSON.parse(localStorage.getItem('brandRegistrationData') || '{}');
        // Merge with current (potentially empty) form data
        const completeData = {
          ...existingData,
          gstin: formData.gstin || '',
          businessPan: formData.businessPan || '',
          authorizedSignatoryName: formData.authorizedSignatoryName || '',
          authorizedSignatoryEmail: formData.authorizedSignatoryEmail || '',
          authorizedSignatoryPhone: formData.authorizedSignatoryPhone || '',
          authorizedSignatoryDesignation: formData.authorizedSignatoryDesignation || '',
          bankAccountHolder: formData.bankAccountHolder || '',
          bankAccountNumber: formData.bankAccountNumber || '',
          bankIfscCode: formData.bankIfscCode || '',
          bankName: formData.bankName || '',
          bankUpiId: formData.bankUpiId || '',
          profileComplete: true, // It is technically complete registration, just missing verification
          documentsVerified: false,
          bankProof: null,
          logo: null 
        };
        
        localStorage.setItem('brandRegistrationData', JSON.stringify(completeData));
        
        const response = await fetch('/api/brands/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(completeData)
        });
        
        const result = await response.json();
        
        if (result.success) {
          localStorage.setItem('brandId', result.brandId);
          router.push('/brand-registration/step5');
        } else {
          console.error('Registration failed:', result.error);
          setErrors({ submit: result.error || 'Registration failed. Please try again.' });
        }
      } catch (error) {
        console.error('Registration error:', error);
        setErrors({ submit: 'An unexpected error occurred. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
  };

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
                4
              </div>
              <span className="font-medium text-gray-900">Business Verification (KYC)</span>
            </div>
            <span className="text-sm text-gray-500">Step 4 of 5</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-8"
          {...fadeInUp}
        >
          <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Business Verification
          </h1>
          <p className="text-gray-600">
            We need to verify your business details to ensure compliance and security. 
            This information is encrypted and secure.
          </p>
        </motion.div>

        {/* KYC Form */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8"
          {...fadeInUp}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* GSTIN */}
            <div>
              <label htmlFor="gstin" className="block text-sm font-medium text-gray-700 mb-2">
                GSTIN (Optional)
              </label>
              <input
                type="text"
                id="gstin"
                name="gstin"
                value={formData.gstin}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.gstin ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="22AAAAA0000A1Z5 (15 characters)"
                maxLength={15}
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: 2 digits + 5 letters + 4 digits + 1 letter + 1 letter + 1 letter + 1 letter
              </p>
              {errors.gstin && (
                <p className="mt-1 text-sm text-red-600">{errors.gstin}</p>
              )}
            </div>

            {/* Business PAN */}
            <div>
              <label htmlFor="businessPan" className="block text-sm font-medium text-gray-700 mb-2">
                Business PAN *
              </label>
              <input
                type="text"
                id="businessPan"
                name="businessPan"
                value={formData.businessPan}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.businessPan ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="ABCDE1234F"
                maxLength={10}
                style={{ textTransform: 'uppercase' }}
              />
              {errors.businessPan && (
                <p className="mt-1 text-sm text-red-600">{errors.businessPan}</p>
              )}
            </div>

            {/* Authorized Signatory Details */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Authorized Signatory Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="authorizedSignatoryName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="authorizedSignatoryName"
                    name="authorizedSignatoryName"
                    value={formData.authorizedSignatoryName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.authorizedSignatoryName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter full name"
                  />
                  {errors.authorizedSignatoryName && (
                    <p className="mt-1 text-sm text-red-600">{errors.authorizedSignatoryName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="authorizedSignatoryDesignation" className="block text-sm font-medium text-gray-700 mb-2">
                    Designation *
                  </label>
                  <select
                    id="authorizedSignatoryDesignation"
                    name="authorizedSignatoryDesignation"
                    value={formData.authorizedSignatoryDesignation}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.authorizedSignatoryDesignation ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Designation</option>
                    <option value="CEO">CEO</option>
                    <option value="CTO">CTO</option>
                    <option value="CMO">CMO</option>
                    <option value="Director">Director</option>
                    <option value="Founder">Founder</option>
                    <option value="Co-Founder">Co-Founder</option>
                    <option value="Marketing Manager">Marketing Manager</option>
                    <option value="Brand Manager">Brand Manager</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.authorizedSignatoryDesignation && (
                    <p className="mt-1 text-sm text-red-600">{errors.authorizedSignatoryDesignation}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="authorizedSignatoryEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="authorizedSignatoryEmail"
                    name="authorizedSignatoryEmail"
                    value={formData.authorizedSignatoryEmail}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.authorizedSignatoryEmail ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="signatory@company.com"
                  />
                  {errors.authorizedSignatoryEmail && (
                    <p className="mt-1 text-sm text-red-600">{errors.authorizedSignatoryEmail}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="authorizedSignatoryPhone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="authorizedSignatoryPhone"
                    name="authorizedSignatoryPhone"
                    value={formData.authorizedSignatoryPhone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.authorizedSignatoryPhone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter 10-digit phone number"
                  />
                  {errors.authorizedSignatoryPhone && (
                    <p className="mt-1 text-sm text-red-600">{errors.authorizedSignatoryPhone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Bank Details Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Bank Account Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="bankAccountHolder" className="block text-sm font-medium text-gray-700 mb-2">
                    Account Holder Name *
                  </label>
                  <input
                    type="text"
                    id="bankAccountHolder"
                    name="bankAccountHolder"
                    value={formData.bankAccountHolder}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.bankAccountHolder ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter account holder name"
                  />
                  {errors.bankAccountHolder && (
                    <p className="mt-1 text-sm text-red-600">{errors.bankAccountHolder}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="bankAccountNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Account Number *
                  </label>
                  <input
                    type="text"
                    id="bankAccountNumber"
                    name="bankAccountNumber"
                    value={formData.bankAccountNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.bankAccountNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter account number"
                  />
                  {errors.bankAccountNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.bankAccountNumber}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="bankIfscCode" className="block text-sm font-medium text-gray-700 mb-2">
                    IFSC Code *
                  </label>
                  <input
                    type="text"
                    id="bankIfscCode"
                    name="bankIfscCode"
                    value={formData.bankIfscCode}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.bankIfscCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="HDFC0001234"
                    maxLength={11}
                    style={{ textTransform: 'uppercase' }}
                  />
                  {errors.bankIfscCode && (
                    <p className="mt-1 text-sm text-red-600">{errors.bankIfscCode}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Name *
                  </label>
                  <input
                    type="text"
                    id="bankName"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.bankName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter bank name"
                  />
                  {errors.bankName && (
                    <p className="mt-1 text-sm text-red-600">{errors.bankName}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="bankUpiId" className="block text-sm font-medium text-gray-700 mb-2">
                    UPI ID (Optional)
                  </label>
                  <input
                    type="text"
                    id="bankUpiId"
                    name="bankUpiId"
                    value={formData.bankUpiId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="yourcompany@bank"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Provide UPI ID for faster payments
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4">
              <motion.button
                type="button"
                onClick={() => {
                   // Save what we have so far, marking partial completion potentially
                   const existingData = JSON.parse(localStorage.getItem('brandRegistrationData') || '{}');
                   localStorage.setItem('brandRegistrationData', JSON.stringify({
                     ...existingData,
                     verificationSkipped: true
                   }));
                   // Move to next step (Completion/Review)
                   // We skip the API call here because that happens on "Submit" 
                   // But if Step 5 is just a success screen, we might need to register NOW with partial data?
                   // User said "whole step should be skipable", implying we skip entering data.
                   // If we skip, we probably need to trigger registration OR just move to next step if registration happens there.
                   // In this flow, registration happens in handleSubmit of Step 4.
                   // So if we skip, we must REGISTER now with empty verification data.
                   
                   // Let's trigger registration with empty verification fields
                   const event = { preventDefault: () => {} } as React.FormEvent;
                   // We need to bypass validation.
                   // Let's create a dedicated skip handler.
                   handleSkipRegistration();
                }}
                className="flex-1 bg-white border-2 border-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                Skip Verification
              </motion.button>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Verification</span>
                    <ArrowRightIcon className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>
          </form>

          {/* Back Button */}
          <div className="mt-6 text-center">
            <Link
              href="/brand-registration/step3"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-1" />
              Back to Profile Setup
            </Link>
          </div>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200"
          {...fadeInUp}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-green-900">Secure & Confidential</h4>
              <p className="text-sm text-green-700 mt-1">
                All your business documents and information are encrypted and stored securely. 
                We comply with data protection regulations and will only use this information 
                for verification purposes.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
