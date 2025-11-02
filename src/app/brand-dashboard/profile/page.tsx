'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserIcon,
  CameraIcon,
  PencilIcon,
  CheckCircleIcon,
  StarIcon,
  MapPinIcon,
  GlobeAltIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  TagIcon,
  PlusIcon,
  XMarkIcon,
  ShieldCheckIcon,
  LinkIcon,
  PhotoIcon,
  VideoCameraIcon,
  ChartBarIcon,
  TrophyIcon,
  SparklesIcon,
  EyeIcon,
  ShareIcon,
  DocumentTextIcon,
  PlayIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  ArrowUpIcon,
  ClockIcon,
  BoltIcon,
  FireIcon,
  CreditCardIcon,
  BuildingLibraryIcon,
  ArrowUpTrayIcon,
  DocumentCheckIcon,
  BuildingOfficeIcon,
  UsersIcon,
  IdentificationIcon,
  FileTextIcon
} from '@heroicons/react/24/outline';
import FloatingNav from '../../../componets/ui/FloatingNav';
import DashboardLayout from '../../../components/layout/DashboardLayout';

function BrandProfileContent() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('company');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [kycStatus, setKycStatus] = useState<'pending' | 'verified' | 'rejected'>('pending');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    campaignUpdates: true,
    creatorMessages: true,
    paymentAlerts: true,
    reportReady: true
  });
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showStats: true,
    showCampaigns: true
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const brandData = {
    company: {
      name: 'TechGiant India',
      legalName: 'TechGiant India Private Limited',
      email: 'contact@techgiant.in',
      phone: '+91 98765 43210',
      website: 'https://techgiant.in',
      description: 'Leading technology brand specializing in consumer electronics and smart devices. Established in 2018 with a mission to make technology accessible to everyone.',
      founded: '2018',
      industry: 'Technology',
      size: '100-500 employees',
      location: 'Bangalore, India',
      address: '123 Tech Park, Whitefield, Bangalore - 560066',
      taxId: 'GSTIN123456789',
      panCard: 'ABCDE1234F',
      cin: 'U12345KA2018PTC123456'
    },
    verification: {
      status: kycStatus,
      identityVerified: false,
      businessVerified: false,
      documentsSubmitted: false,
      requiredDocuments: [
        { id: 1, name: 'PAN Card', submitted: false, verified: false },
        { id: 2, name: 'GST Certificate', submitted: false, verified: false },
        { id: 3, name: 'Company Registration Certificate', submitted: false, verified: false },
        { id: 4, name: 'Bank Statement', submitted: false, verified: false },
        { id: 5, name: 'Address Proof', submitted: false, verified: false }
      ],
      verificationDate: null,
      reviewTime: '2-3 business days'
    },
    payment: {
      accountHolder: 'TechGiant India Private Limited',
      accountNumber: '****7890',
      ifscCode: 'HDFC0001234',
      bankName: 'HDFC Bank',
      upiId: 'pay@techgiant',
      gstNumber: 'GSTIN123456789',
      panCard: 'ABCDE1234F',
      paymentMethod: 'bank',
      billingAddress: '123 Tech Park, Whitefield, Bangalore - 560066'
    },
    stats: {
      totalSpent: 1250000,
      totalCampaigns: 48,
      activeCampaigns: 8,
      totalReach: 2400000,
      avgROI: 340,
      totalCreators: 156
    },
    team: {
      members: [
        { id: 1, name: 'Rajesh Kumar', role: 'CEO', email: 'rajesh@techgiant.in', access: 'full' },
        { id: 2, name: 'Priya Sharma', role: 'Marketing Manager', email: 'priya@techgiant.in', access: 'campaigns' },
        { id: 3, name: 'Amit Patel', role: 'Campaign Manager', email: 'amit@techgiant.in', access: 'campaigns' }
      ]
    },
    settings: {
      notifications: notifications,
      privacy: privacySettings
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  const tabs = [
    { id: 'company', label: 'Company Info', icon: BuildingOfficeIcon },
    { id: 'verification', label: 'KYC & Verification', icon: ShieldCheckIcon },
    { id: 'payment', label: 'Payment', icon: CreditCardIcon },
    { id: 'team', label: 'Team', icon: UsersIcon },
    { id: 'settings', label: 'Settings', icon: BoltIcon },
    { id: 'stats', label: 'Statistics', icon: ChartBarIcon }
  ];

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setSuccessMessage('❌ Image size should be less than 5MB');
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 3000);
      return;
    }

    setUploadingImage(true);
    setTimeout(() => {
      setUploadingImage(false);
      setSuccessMessage('✓ Brand logo updated successfully');
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 3000);
    }, 1500);
  };

  const handleSave = async () => {
    setIsEditing(false);
    setSuccessMessage('✓ Profile updated successfully');
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 3000);
  };

  const handleKYCSubmit = () => {
    setKycStatus('pending');
    setShowKYCModal(false);
    setSuccessMessage('✓ KYC documents submitted successfully. Review in 2-3 business days.');
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 3000);
  };

  // Skeleton Loading Component
  const SkeletonLoader = () => (
    <div className="w-full px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto py-8 animate-pulse">
      <div className="bg-white border-b border-gray-200 -mx-8 md:-mx-16 lg:-mx-24 px-8 md:px-16 lg:px-24 mb-8">
        <div className="py-8">
          <div className="h-12 bg-gray-200 rounded w-96 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-64"></div>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
        <div className="flex items-center space-x-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="bg-white border-b border-gray-200"
        {...fadeInUp}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto">
          <div className="flex justify-between items-start py-8">
            <div className="flex-1">
              <h1 className="text-[48px] md:text-[56px] font-black text-black tracking-tighter leading-none mb-3">
                Brand Profile
              </h1>
              <p className="text-[14px] text-gray-600 font-normal max-w-lg">
                Manage your brand information, verification, and settings
              </p>
            </div>
            {!isEditing && (
              <motion.button
                className="bg-black text-white px-6 py-3 rounded-full text-[13px] font-bold hover:bg-gray-900 transition-all duration-200 flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsEditing(true)}
              >
                <PencilIcon className="w-4 h-4" />
                <span>Edit Profile</span>
              </motion.button>
            )}
            {isEditing && (
              <div className="flex items-center space-x-3">
                <motion.button
                  className="bg-white border border-gray-300 text-black px-6 py-3 rounded-full text-[13px] font-bold hover:border-black transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="bg-black text-white px-6 py-3 rounded-full text-[13px] font-bold hover:bg-gray-900 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                >
                  Save Changes
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <div className="w-full px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto py-8">
        {/* Profile Header */}
        <motion.div
          className="bg-white border border-gray-200 rounded-lg p-6 mb-8"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-start space-x-6">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-black to-gray-700 rounded-full flex items-center justify-center text-white text-[48px] font-black">
                {brandData.company.name.substring(0, 2).toUpperCase()}
              </div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-900 transition-colors">
                  <CameraIcon className="w-5 h-5 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-[32px] font-black text-black mb-2">{brandData.company.name}</h2>
              <p className="text-[14px] text-gray-600 mb-4">{brandData.company.description}</p>
              <div className="flex items-center space-x-4 text-[12px] text-gray-600">
                <div className="flex items-center space-x-1">
                  <MapPinIcon className="w-4 h-4" />
                  <span>{brandData.company.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <GlobeAltIcon className="w-4 h-4" />
                  <span>{brandData.company.website}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TagIcon className="w-4 h-4" />
                  <span>{brandData.company.industry}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="bg-white border border-gray-200 rounded-lg mb-8"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-semibold text-[13px] flex items-center space-x-2 transition-all duration-200 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-black text-black'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Company Info Tab */}
            {activeTab === 'company' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-2">Brand Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        defaultValue={brandData.company.name}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-[13px]"
                      />
                    ) : (
                      <p className="text-[16px] font-bold text-black">{brandData.company.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-2">Legal Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        defaultValue={brandData.company.legalName}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-[13px]"
                      />
                    ) : (
                      <p className="text-[16px] font-bold text-black">{brandData.company.legalName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-2">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        defaultValue={brandData.company.email}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-[13px]"
                      />
                    ) : (
                      <p className="text-[16px] font-bold text-black">{brandData.company.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-2">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        defaultValue={brandData.company.phone}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-[13px]"
                      />
                    ) : (
                      <p className="text-[16px] font-bold text-black">{brandData.company.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-2">Website</label>
                    {isEditing ? (
                      <input
                        type="url"
                        defaultValue={brandData.company.website}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-[13px]"
                      />
                    ) : (
                      <p className="text-[16px] font-bold text-black">{brandData.company.website}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-2">Industry</label>
                    {isEditing ? (
                      <select
                        defaultValue={brandData.company.industry}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-[13px]"
                      >
                        <option>Technology</option>
                        <option>Fashion</option>
                        <option>Beauty</option>
                        <option>Food & Beverage</option>
                        <option>Health & Fitness</option>
                        <option>Other</option>
                      </select>
                    ) : (
                      <p className="text-[16px] font-bold text-black">{brandData.company.industry}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-2">Company Size</label>
                    {isEditing ? (
                      <select
                        defaultValue={brandData.company.size}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-[13px]"
                      >
                        <option>1-10 employees</option>
                        <option>11-50 employees</option>
                        <option>51-100 employees</option>
                        <option>100-500 employees</option>
                        <option>500+ employees</option>
                      </select>
                    ) : (
                      <p className="text-[16px] font-bold text-black">{brandData.company.size}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-2">Founded</label>
                    {isEditing ? (
                      <input
                        type="text"
                        defaultValue={brandData.company.founded}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-[13px]"
                      />
                    ) : (
                      <p className="text-[16px] font-bold text-black">{brandData.company.founded}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-2">Description</label>
                  {isEditing ? (
                    <textarea
                      defaultValue={brandData.company.description}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-[13px]"
                    />
                  ) : (
                    <p className="text-[14px] text-gray-700 leading-relaxed">{brandData.company.description}</p>
                  )}
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-2">Address</label>
                  {isEditing ? (
                    <textarea
                      defaultValue={brandData.company.address}
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-[13px]"
                    />
                  ) : (
                    <p className="text-[14px] text-gray-700">{brandData.company.address}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-2">PAN Card</label>
                    <p className="text-[14px] font-semibold text-black">{brandData.company.panCard}</p>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-2">GST Number</label>
                    <p className="text-[14px] font-semibold text-black">{brandData.company.taxId}</p>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-2">CIN</label>
                    <p className="text-[14px] font-semibold text-black">{brandData.company.cin}</p>
                  </div>
                </div>
              </div>
            )}

            {/* KYC & Verification Tab */}
            {activeTab === 'verification' && (
              <div className="space-y-6">
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-[20px] font-bold text-black mb-2">Verification Status</h3>
                      <div className="flex items-center space-x-2">
                        {kycStatus === 'verified' && (
                          <>
                            <CheckCircleIcon className="w-5 h-5 text-black" />
                            <span className="text-[14px] font-semibold text-black">Verified</span>
                          </>
                        )}
                        {kycStatus === 'pending' && (
                          <>
                            <ClockIcon className="w-5 h-5 text-gray-600" />
                            <span className="text-[14px] font-semibold text-gray-600">Pending Review</span>
                          </>
                        )}
                        {kycStatus === 'rejected' && (
                          <>
                            <XMarkIcon className="w-5 h-5 text-red-600" />
                            <span className="text-[14px] font-semibold text-red-600">Rejected</span>
                          </>
                        )}
                      </div>
                    </div>
                    {kycStatus !== 'verified' && (
                      <motion.button
                        className="bg-black text-white px-6 py-3 rounded-lg font-semibold text-[13px] hover:bg-gray-900 transition-colors duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowKYCModal(true)}
                      >
                        {kycStatus === 'rejected' ? 'Resubmit Documents' : 'Submit KYC'}
                      </motion.button>
                    )}
                  </div>
                  <div className="space-y-4">
                    {brandData.verification.requiredDocuments.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <DocumentTextIcon className={`w-5 h-5 ${doc.submitted ? 'text-black' : 'text-gray-400'}`} />
                          <span className="text-[14px] font-medium text-black">{doc.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {doc.submitted ? (
                            <>
                              <CheckCircleIcon className="w-5 h-5 text-black" />
                              <span className="text-[12px] font-semibold text-black">Submitted</span>
                            </>
                          ) : (
                            <button className="text-[12px] font-semibold text-gray-600 hover:text-black">
                              Upload
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-[12px] text-gray-600">
                      <strong>Review Time:</strong> {brandData.verification.reviewTime}. 
                      You'll be notified via email once the verification is complete.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Tab */}
            {activeTab === 'payment' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-2">Account Holder Name</label>
                    <p className="text-[16px] font-bold text-black">{brandData.payment.accountHolder}</p>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-2">Account Number</label>
                    <p className="text-[16px] font-bold text-black">{brandData.payment.accountNumber}</p>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-2">IFSC Code</label>
                    <p className="text-[16px] font-bold text-black">{brandData.payment.ifscCode}</p>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-2">Bank Name</label>
                    <p className="text-[16px] font-bold text-black">{brandData.payment.bankName}</p>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-2">UPI ID</label>
                    <p className="text-[16px] font-bold text-black">{brandData.payment.upiId}</p>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-2">Payment Method</label>
                    <p className="text-[16px] font-bold text-black capitalize">{brandData.payment.paymentMethod}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-2">Billing Address</label>
                  <p className="text-[14px] text-gray-700">{brandData.payment.billingAddress}</p>
                </div>
                <div className="pt-6 border-t border-gray-200">
                  <motion.button
                    className="bg-black text-white px-6 py-3 rounded-lg font-semibold text-[13px] hover:bg-gray-900 transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Update Payment Details
                  </motion.button>
                </div>
              </div>
            )}

            {/* Team Tab */}
            {activeTab === 'team' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[20px] font-bold text-black">Team Members</h3>
                  <motion.button
                    className="bg-black text-white px-6 py-3 rounded-lg font-semibold text-[13px] hover:bg-gray-900 transition-colors duration-200 flex items-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <PlusIcon className="w-4 h-4" />
                    <span>Invite Member</span>
                  </motion.button>
                </div>
                <div className="space-y-4">
                  {brandData.team.members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-black transition-all duration-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-700 rounded-full flex items-center justify-center text-white font-bold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-[16px] font-bold text-black">{member.name}</p>
                          <p className="text-[12px] text-gray-600">{member.role} • {member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-[11px] font-semibold uppercase">
                          {member.access} access
                        </span>
                        <button className="text-gray-600 hover:text-black">
                          <PencilIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-[20px] font-bold text-black mb-6">Notification Preferences</h3>
                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="text-[14px] font-semibold text-black capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => {
                              setNotifications({
                                ...notifications,
                                [key]: e.target.checked
                              });
                            }}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-[20px] font-bold text-black mb-6">Privacy Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="text-[14px] font-semibold text-black">Profile Visibility</p>
                        <p className="text-[12px] text-gray-600">Who can see your brand profile</p>
                      </div>
                      <select
                        value={privacySettings.profileVisibility}
                        onChange={(e) => {
                          setPrivacySettings({
                            ...privacySettings,
                            profileVisibility: e.target.value
                          });
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-[13px] font-semibold"
                      >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Statistics Tab */}
            {activeTab === 'stats' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <p className="text-[11px] text-gray-500 font-medium uppercase mb-2">Total Spent</p>
                    <p className="text-[32px] font-black text-black">₹{brandData.stats.totalSpent.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <p className="text-[11px] text-gray-500 font-medium uppercase mb-2">Total Campaigns</p>
                    <p className="text-[32px] font-black text-black">{brandData.stats.totalCampaigns}</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <p className="text-[11px] text-gray-500 font-medium uppercase mb-2">Active Campaigns</p>
                    <p className="text-[32px] font-black text-black">{brandData.stats.activeCampaigns}</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <p className="text-[11px] text-gray-500 font-medium uppercase mb-2">Total Reach</p>
                    <p className="text-[32px] font-black text-black">{(brandData.stats.totalReach / 1000000).toFixed(1)}M</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <p className="text-[11px] text-gray-500 font-medium uppercase mb-2">Average ROI</p>
                    <p className="text-[32px] font-black text-black">{brandData.stats.avgROI}%</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <p className="text-[11px] text-gray-500 font-medium uppercase mb-2">Total Creators</p>
                    <p className="text-[32px] font-black text-black">{brandData.stats.totalCreators}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* KYC Modal */}
      <AnimatePresence>
        {showKYCModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowKYCModal(false)}
          >
            <motion.div
              className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[24px] font-bold text-black">Submit KYC Documents</h3>
                <button onClick={() => setShowKYCModal(false)}>
                  <XMarkIcon className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              <div className="space-y-4">
                {brandData.verification.requiredDocuments.map((doc) => (
                  <div key={doc.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[14px] font-semibold text-black">{doc.name}</span>
                      <button className="text-[12px] font-semibold text-black hover:text-gray-600 flex items-center space-x-1">
                        <ArrowUpTrayIcon className="w-4 h-4" />
                        <span>Upload</span>
                      </button>
                    </div>
                    <input type="file" className="hidden" />
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-end space-x-3">
                <button
                  onClick={() => setShowKYCModal(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-[13px] hover:border-black transition-colors duration-200"
                >
                  Cancel
                </button>
                <motion.button
                  onClick={handleKYCSubmit}
                  className="bg-black text-white px-6 py-3 rounded-lg font-semibold text-[13px] hover:bg-gray-900 transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Documents
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            className="fixed bottom-8 right-8 bg-black text-white px-6 py-4 rounded-lg shadow-xl z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <p className="text-[14px] font-semibold">{successMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Navigation */}
      <FloatingNav userType="brand" />
    </motion.div>
  );
}

export default function BrandProfile() {
  return (
    <DashboardLayout userType="brand" userName="Brand Name" userEmail="brand@example.com">
      <BrandProfileContent />
    </DashboardLayout>
  );
}

