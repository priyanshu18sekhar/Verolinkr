'use client';

import { useState } from 'react';
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
    companyRegistrationProof: null as File | null,
    authorizedSignatoryName: '',
    authorizedSignatoryEmail: '',
    authorizedSignatoryPhone: '',
    authorizedSignatoryDesignation: ''
  });
  const [docPreview, setDocPreview] = useState<string | null>(null);
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

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.includes('pdf') && !file.type.includes('image/')) {
        setErrors(prev => ({ ...prev, companyRegistrationProof: 'Please select a PDF or image file' }));
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, companyRegistrationProof: 'File size must be less than 10MB' }));
        return;
      }

      setFormData(prev => ({ ...prev, companyRegistrationProof: file }));
      
      // Create preview for images
      if (file.type.includes('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setDocPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setDocPreview(null);
      }
      
      // Clear error
      if (errors.companyRegistrationProof) {
        setErrors(prev => ({ ...prev, companyRegistrationProof: '' }));
      }
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

    if (!formData.companyRegistrationProof) {
      newErrors.companyRegistrationProof = 'Company registration proof is required';
    }

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Store form data and proceed to final step
        const existingData = JSON.parse(localStorage.getItem('brandRegistrationData') || '{}');
        const updatedData = { ...existingData, ...formData };
        localStorage.setItem('brandRegistrationData', JSON.stringify(updatedData));
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        router.push('/brand-registration/step5');
      } catch (error) {
        setErrors({ submit: 'Submission failed. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
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

            {/* Company Registration Proof */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Registration Proof *
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {docPreview ? (
                    <img
                      src={docPreview}
                      alt="Document preview"
                      className="w-20 h-20 rounded-lg object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                      <DocumentIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="companyRegistrationProof"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                  >
                    <DocumentIcon className="w-4 h-4 mr-2" />
                    {formData.companyRegistrationProof ? 'Change Document' : 'Upload Document'}
                  </label>
                  <input
                    id="companyRegistrationProof"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleDocumentChange}
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, JPG, PNG up to 10MB
                  </p>
                </div>
              </div>
              {errors.companyRegistrationProof && (
                <p className="mt-1 text-sm text-red-600">{errors.companyRegistrationProof}</p>
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

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Submitting for Review...</span>
                </>
              ) : (
                <>
                  <span>Submit for Verification</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </>
              )}
            </motion.button>
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
