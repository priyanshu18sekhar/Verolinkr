'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
  CreditCardIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

export default function KYCVerification() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Business Information
    businessName: '',
    businessType: '',
    registrationNumber: '',
    gstin: '',
    pan: '',
    businessAddress: '',
    city: '',
    state: '',
    pincode: '',
    
    // Contact Information
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    
    // Bank Details
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountHolderName: '',
    
    // Documents
    panDocument: null as File | null,
    gstinDocument: null as File | null,
    bankStatement: null as File | null,
    businessRegistration: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const steps = [
    { id: 1, title: 'Business Information', description: 'Basic company details' },
    { id: 2, title: 'Contact Details', description: 'Primary contact information' },
    { id: 3, title: 'Bank Details', description: 'Payment information' },
    { id: 4, title: 'Document Upload', description: 'Verification documents' },
    { id: 5, title: 'Verification', description: 'Review and submit' }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  };

  const handleInputChange = (field: string, value: string | File) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (field: string, file: File) => {
    handleInputChange(field, file);
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
    setIsVerified(true);
    setIsSubmitting(false);
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          {...fadeInUp}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircleIcon className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-6">Verification Complete!</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Your brand has been successfully verified. You can now create campaigns and start working with creators.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-green-800 mb-4">What&apos;s Next?</h3>
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
                <span className="text-green-700">Create your first campaign</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
                <span className="text-green-700">Browse verified creators</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
                <span className="text-green-700">Start your influencer marketing journey</span>
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
            <ShieldCheckIcon className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-4xl font-black text-gray-900">Brand Verification</h1>
              <p className="text-lg text-gray-600">Complete your KYC to start creating campaigns</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  currentStep >= step.id 
                    ? 'bg-black text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.id}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`font-bold text-sm ${
                    currentStep >= step.id ? 'text-black' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-black' : 'bg-gray-200'
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
          {/* Step 1: Business Information */}
          {currentStep === 1 && (
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <BuildingOfficeIcon className="w-6 h-6 text-blue-600" />
                <h2 className="text-3xl font-black text-gray-900">Business Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your business name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Business Type *
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => handleInputChange('businessType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select business type</option>
                    <option value="private_limited">Private Limited</option>
                    <option value="public_limited">Public Limited</option>
                    <option value="llp">Limited Liability Partnership</option>
                    <option value="partnership">Partnership</option>
                    <option value="sole_proprietorship">Sole Proprietorship</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Registration Number *
                  </label>
                  <input
                    type="text"
                    value={formData.registrationNumber}
                    onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="CIN/Registration number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    GSTIN *
                  </label>
                  <input
                    type="text"
                    value={formData.gstin}
                    onChange={(e) => handleInputChange('gstin', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="15-digit GSTIN"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    PAN Number *
                  </label>
                  <input
                    type="text"
                    value={formData.pan}
                    onChange={(e) => handleInputChange('pan', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10-character PAN"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Business Address *
                  </label>
                  <input
                    type="text"
                    value={formData.businessAddress}
                    onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Complete business address"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contact Details */}
          {currentStep === 2 && (
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <DocumentTextIcon className="w-6 h-6 text-blue-600" />
                <h2 className="text-3xl font-black text-gray-900">Contact Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Primary contact person"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="business@company.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+91 98765 43210"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://www.company.com"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Bank Details */}
          {currentStep === 3 && (
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <CreditCardIcon className="w-6 h-6 text-blue-600" />
                <h2 className="text-3xl font-black text-gray-900">Bank Details</h2>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                <div className="flex items-center space-x-3">
                  <ExclamationTriangleIcon className="w-5 h-5 text-blue-600" />
                  <p className="text-blue-800 font-medium">
                    Bank details are required for secure payments and payouts. All information is encrypted and secure.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Bank Name *
                  </label>
                  <input
                    type="text"
                    value={formData.bankName}
                    onChange={(e) => handleInputChange('bankName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Bank name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Account Number *
                  </label>
                  <input
                    type="text"
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Account number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    IFSC Code *
                  </label>
                  <input
                    type="text"
                    value={formData.ifscCode}
                    onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="IFSC code"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Account Holder Name *
                  </label>
                  <input
                    type="text"
                    value={formData.accountHolderName}
                    onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Account holder name"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Document Upload */}
          {currentStep === 4 && (
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <DocumentTextIcon className="w-6 h-6 text-blue-600" />
                <h2 className="text-3xl font-black text-gray-900">Document Upload</h2>
              </div>
              
              <div className="space-y-6">
                {[
                  { key: 'panDocument', label: 'PAN Document', required: true },
                  { key: 'gstinDocument', label: 'GSTIN Certificate', required: true },
                  { key: 'bankStatement', label: 'Bank Statement (Last 3 months)', required: true },
                  { key: 'businessRegistration', label: 'Business Registration Certificate', required: true }
                ].map((doc) => (
                  <div key={doc.key} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{doc.label}</h3>
                        {doc.required && <span className="text-red-500 text-sm">* Required</span>}
                      </div>
                      {formData[doc.key as keyof typeof formData] && (
                        <CheckCircleIcon className="w-6 h-6 text-green-600" />
                      )}
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(doc.key, file);
                        }}
                        className="hidden"
                        id={doc.key}
                      />
                      <label htmlFor={doc.key} className="cursor-pointer">
                        <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 font-medium">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-gray-500 text-sm">PDF, JPG, PNG up to 10MB</p>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Verification */}
          {currentStep === 5 && (
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <ShieldCheckIcon className="w-6 h-6 text-blue-600" />
                <h2 className="text-3xl font-black text-gray-900">Review & Submit</h2>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Review Your Information</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Business Information</h4>
                    <div className="bg-white rounded-lg p-4 space-y-2 text-sm">
                      <p><span className="font-medium">Name:</span> {formData.businessName}</p>
                      <p><span className="font-medium">Type:</span> {formData.businessType}</p>
                      <p><span className="font-medium">GSTIN:</span> {formData.gstin}</p>
                      <p><span className="font-medium">PAN:</span> {formData.pan}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Contact Details</h4>
                    <div className="bg-white rounded-lg p-4 space-y-2 text-sm">
                      <p><span className="font-medium">Contact Person:</span> {formData.contactPerson}</p>
                      <p><span className="font-medium">Email:</span> {formData.email}</p>
                      <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Documents Uploaded</h4>
                    <div className="bg-white rounded-lg p-4 space-y-2 text-sm">
                      {Object.entries(formData).filter(([key, value]) => 
                        key.includes('Document') || key.includes('Statement') || key.includes('Registration')
                      ).map(([key, value]) => (
                        <p key={key}>
                          <span className="font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span> 
                          {value ? ' ✓ Uploaded' : ' ✗ Not uploaded'}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center space-x-3">
                  <ExclamationTriangleIcon className="w-5 h-5 text-blue-600" />
                  <p className="text-blue-800 font-medium">
                    By submitting this form, you agree to our Terms of Service and Privacy Policy. 
                    Verification typically takes 1-2 business days.
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
                className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all duration-200 flex items-center space-x-2"
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
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheckIcon className="w-5 h-5" />
                    <span>Submit for Verification</span>
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
