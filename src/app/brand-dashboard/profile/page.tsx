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
  FileTextIcon,
  BriefcaseIcon
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
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [activityFilter, setActivityFilter] = useState('all');

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
    activityTimeline: [
      { id: 1, type: 'campaign', action: 'Created campaign', details: 'Skincare Product Launch', timestamp: '2 hours ago', user: 'Rajesh Kumar' },
      { id: 2, type: 'team', action: 'Invited team member', details: 'Priya Sharma joined', timestamp: '1 day ago', user: 'Rajesh Kumar' },
      { id: 3, type: 'payment', action: 'Payment processed', details: '₹50,000 for Campaign #123', timestamp: '2 days ago', user: 'System' },
      { id: 4, type: 'profile', action: 'Updated profile', details: 'Company information updated', timestamp: '3 days ago', user: 'Amit Patel' },
      { id: 5, type: 'campaign', action: 'Campaign completed', details: 'Tech Review Campaign finished', timestamp: '5 days ago', user: 'System' }
    ],
    brandInsights: {
      performanceScore: 92,
      growthTrend: '+18%',
      topPerformingCampaign: 'Tech Review Campaign',
      recommendedActions: [
        { id: 1, action: 'Increase budget for top performers', priority: 'high', impact: 'High ROI potential' },
        { id: 2, action: 'Expand creator network in beauty category', priority: 'medium', impact: 'Market opportunity' },
        { id: 3, action: 'Review underperforming campaigns', priority: 'medium', impact: 'Cost optimization' }
      ],
      upcomingDeadlines: [
        { id: 1, task: 'Campaign review due', date: '2024-01-22', campaign: 'Skincare Product Launch' },
        { id: 2, task: 'Payment processing', date: '2024-01-25', campaign: 'Winter Collection' }
      ]
    },
    documents: [
      { id: 1, name: 'Company Certificate.pdf', type: 'certificate', uploaded: '2024-01-01', size: '2.4 MB', category: 'Legal' },
      { id: 2, name: 'Brand Guidelines.pdf', type: 'guidelines', uploaded: '2024-01-05', size: '5.2 MB', category: 'Marketing' },
      { id: 3, name: 'Contract Template.docx', type: 'contract', uploaded: '2024-01-10', size: '1.8 MB', category: 'Legal' },
      { id: 4, name: 'Product Images.zip', type: 'assets', uploaded: '2024-01-15', size: '45.6 MB', category: 'Assets' }
    ],
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
    { id: 'stats', label: 'Statistics', icon: ChartBarIcon },
    { id: 'activity', label: 'Activity Timeline', icon: ClockIcon },
    { id: 'insights', label: 'Brand Insights', icon: SparklesIcon },
    { id: 'documents', label: 'Document Library', icon: BuildingLibraryIcon }
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

  // Enhanced Skeleton Loading Component
  const SkeletonLoader = () => (
    <div className="w-full px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto py-8">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-gray-200 -mx-8 md:-mx-16 lg:-mx-24 px-8 md:px-16 lg:px-24 mb-8">
        <div className="py-8">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="h-14 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-96 mb-3 animate-shimmer bg-[length:200%_100%]"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-64 animate-shimmer bg-[length:200%_100%]"></div>
            </div>
            <div className="h-12 w-40 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-shimmer bg-[length:200%_100%]"></div>
          </div>
        </div>
      </div>

      {/* Profile Header Skeleton */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div className="flex items-start space-x-6">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-shimmer bg-[length:200%_100%]"></div>
            <div className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-shimmer bg-[length:200%_100%]"></div>
          </div>
          <div className="flex-1 space-y-3">
            <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-64 animate-shimmer bg-[length:200%_100%]"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-full animate-shimmer bg-[length:200%_100%]"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 animate-shimmer bg-[length:200%_100%]"></div>
            <div className="flex items-center space-x-4 mt-4">
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-32 animate-shimmer bg-[length:200%_100%]"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-32 animate-shimmer bg-[length:200%_100%]"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-32 animate-shimmer bg-[length:200%_100%]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation Skeleton */}
      <div className="bg-white border border-gray-200 rounded-lg mb-8">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex space-x-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-24 animate-shimmer bg-[length:200%_100%]"></div>
            ))}
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-32 animate-shimmer bg-[length:200%_100%]"></div>
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-full animate-shimmer bg-[length:200%_100%]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
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
                      You&apos;ll be notified via email once the verification is complete.
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
                  <div>
                    <h3 className="text-[20px] font-bold text-black">Team Members</h3>
                    <p className="text-[12px] text-gray-600 mt-1">{brandData.team.members.length} active members</p>
                  </div>
                  <motion.button
                    className="bg-black text-white px-6 py-3 rounded-lg font-semibold text-[13px] hover:bg-gray-900 transition-colors duration-200 flex items-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowInviteModal(true)}
                  >
                    <PlusIcon className="w-4 h-4" />
                    <span>Invite Member</span>
                  </motion.button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {brandData.team.members.map((member) => (
                    <motion.div 
                      key={member.id} 
                      className="bg-white border border-gray-200 rounded-lg p-5 hover:border-black transition-all duration-200"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-black to-gray-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-[16px] font-bold text-black">{member.name}</p>
                            <p className="text-[12px] text-gray-600">{member.role}</p>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-black transition-colors">
                          <PencilIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-[12px] text-gray-600">
                          <EnvelopeIcon className="w-4 h-4" />
                          <span>{member.email}</span>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <span className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold uppercase ${
                            member.access === 'full' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {member.access} access
                          </span>
                          <div className="flex items-center space-x-2">
                            <button className="text-[11px] font-semibold text-blue-600 hover:text-blue-800">View Activity</button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
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
                  <motion.div 
                    className="bg-gradient-to-br from-black to-gray-800 border border-gray-200 rounded-lg p-6 text-white"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-[11px] text-gray-300 font-medium uppercase mb-2">Total Spent</p>
                    <p className="text-[32px] font-black text-white">₹{brandData.stats.totalSpent.toLocaleString()}</p>
                    <div className="flex items-center space-x-1 mt-2">
                      <ArrowUpIcon className="w-3 h-3 text-green-400" />
                      <span className="text-[10px] text-green-400 font-semibold">+24%</span>
                    </div>
                  </motion.div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-black transition-all duration-200">
                    <p className="text-[11px] text-gray-500 font-medium uppercase mb-2">Total Campaigns</p>
                    <p className="text-[32px] font-black text-black">{brandData.stats.totalCampaigns}</p>
                    <p className="text-[10px] text-gray-600 mt-1">{brandData.stats.activeCampaigns} active</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-black transition-all duration-200">
                    <p className="text-[11px] text-gray-500 font-medium uppercase mb-2">Active Campaigns</p>
                    <p className="text-[32px] font-black text-black">{brandData.stats.activeCampaigns}</p>
                    <p className="text-[10px] text-gray-600 mt-1">Running now</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-black transition-all duration-200">
                    <p className="text-[11px] text-gray-500 font-medium uppercase mb-2">Total Reach</p>
                    <p className="text-[32px] font-black text-black">{(brandData.stats.totalReach / 1000000).toFixed(1)}M</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <ArrowUpIcon className="w-3 h-3 text-black" />
                      <span className="text-[10px] font-semibold text-black">+18%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-black transition-all duration-200">
                    <p className="text-[11px] text-gray-500 font-medium uppercase mb-2">Average ROI</p>
                    <p className="text-[32px] font-black text-black">{brandData.stats.avgROI}%</p>
                    <p className="text-[10px] text-gray-600 mt-1">Industry leading</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-black transition-all duration-200">
                    <p className="text-[11px] text-gray-500 font-medium uppercase mb-2">Total Creators</p>
                    <p className="text-[32px] font-black text-black">{brandData.stats.totalCreators}</p>
                    <p className="text-[10px] text-gray-600 mt-1">Partners</p>
                  </div>
                </div>
              </div>
            )}

            {/* Activity Timeline Tab */}
            {activeTab === 'activity' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[20px] font-bold text-black">Activity Timeline</h3>
                  <select
                    value={activityFilter}
                    onChange={(e) => setActivityFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-[13px] font-semibold"
                  >
                    <option value="all">All Activities</option>
                    <option value="campaign">Campaigns</option>
                    <option value="team">Team</option>
                    <option value="payment">Payments</option>
                    <option value="profile">Profile</option>
                  </select>
                </div>
                <div className="space-y-4">
                  {brandData.activityTimeline
                    .filter(activity => activityFilter === 'all' || activity.type === activityFilter)
                    .map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:border-black transition-all duration-200"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          {activity.type === 'campaign' && <BriefcaseIcon className="w-5 h-5 text-black" />}
                          {activity.type === 'team' && <UsersIcon className="w-5 h-5 text-black" />}
                          {activity.type === 'payment' && <CreditCardIcon className="w-5 h-5 text-black" />}
                          {activity.type === 'profile' && <PencilIcon className="w-5 h-5 text-black" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="text-[14px] font-bold text-black">{activity.action}</p>
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-700 uppercase">
                              {activity.type}
                            </span>
                          </div>
                          <p className="text-[13px] text-gray-600 mb-1">{activity.details}</p>
                          <div className="flex items-center space-x-4 text-[11px] text-gray-500">
                            <span>{activity.timestamp}</span>
                            <span>•</span>
                            <span>{activity.user}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            )}

            {/* Brand Insights Tab */}
            {activeTab === 'insights' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-black to-gray-800 rounded-lg p-8 text-white">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-[24px] font-black text-white mb-2">Brand Performance Score</h3>
                      <p className="text-gray-300">Based on campaign performance and growth metrics</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[64px] font-black text-white">{brandData.brandInsights.performanceScore}</p>
                      <p className="text-gray-300">Out of 100</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                    <motion.div
                      className="bg-white h-4 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${brandData.brandInsights.performanceScore}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <SparklesIcon className="w-5 h-5 text-white" />
                    <span className="text-[14px] font-semibold">Growth Trend: {brandData.brandInsights.growthTrend}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-[18px] font-bold text-black mb-4">Recommended Actions</h4>
                    <div className="space-y-4">
                      {brandData.brandInsights.recommendedActions.map((action) => (
                        <div key={action.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <p className="text-[14px] font-semibold text-black">{action.action}</p>
                            <span className={`px-2 py-1 rounded text-[10px] font-semibold ${
                              action.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {action.priority}
                            </span>
                          </div>
                          <p className="text-[12px] text-gray-600">{action.impact}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-[18px] font-bold text-black mb-4">Upcoming Deadlines</h4>
                    <div className="space-y-4">
                      {brandData.brandInsights.upcomingDeadlines.map((deadline) => (
                        <div key={deadline.id} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                          <div>
                            <p className="text-[14px] font-semibold text-black">{deadline.task}</p>
                            <p className="text-[12px] text-gray-600">{deadline.campaign}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[13px] font-bold text-black">{deadline.date}</p>
                            <p className="text-[11px] text-gray-500">Due soon</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-[18px] font-bold text-black mb-4">Top Performing Campaign</h4>
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[20px] font-black text-black">{brandData.brandInsights.topPerformingCampaign}</p>
                        <p className="text-[12px] text-gray-600 mt-1">Highest ROI this month</p>
                      </div>
                      <TrophyIcon className="w-12 h-12 text-yellow-500" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Document Library Tab */}
            {activeTab === 'documents' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[20px] font-bold text-black">Document Library</h3>
                  <motion.button
                    className="bg-black text-white px-6 py-3 rounded-lg font-semibold text-[13px] hover:bg-gray-900 transition-colors duration-200 flex items-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArrowUpTrayIcon className="w-4 h-4" />
                    <span>Upload Document</span>
                  </motion.button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {brandData.documents.map((doc) => (
                    <motion.div
                      key={doc.id}
                      className="bg-white border border-gray-200 rounded-lg p-5 hover:border-black transition-all duration-200 cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <DocumentTextIcon className="w-6 h-6 text-black" />
                        </div>
                        <button className="text-gray-400 hover:text-black">
                          <ShareIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <h4 className="text-[14px] font-bold text-black mb-2">{doc.name}</h4>
                      <div className="flex items-center justify-between text-[11px] text-gray-600">
                        <span className="px-2 py-1 bg-gray-100 rounded uppercase font-semibold">{doc.category}</span>
                        <span>{doc.size}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-2">Uploaded {doc.uploaded}</p>
                    </motion.div>
                  ))}
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

      {/* Invite Team Member Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowInviteModal(false)}
          >
            <motion.div
              className="bg-white rounded-lg p-8 max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[24px] font-bold text-black">Invite Team Member</h3>
                <button onClick={() => setShowInviteModal(false)}>
                  <XMarkIcon className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-[12px] font-semibold text-gray-700 uppercase mb-2">Email Address</label>
                  <input
                    type="email"
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                    placeholder="member@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-[13px]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-gray-700 uppercase mb-2">Access Level</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-[13px]">
                    <option>Campaigns Only</option>
                    <option>Full Access</option>
                    <option>Analytics Only</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end space-x-3">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-[13px] hover:border-black transition-colors duration-200"
                >
                  Cancel
                </button>
                <motion.button
                  onClick={() => {
                    setShowInviteModal(false);
                    setSuccessMessage('✓ Invitation sent successfully');
                    setShowSuccessModal(true);
                    setTimeout(() => setShowSuccessModal(false), 3000);
                  }}
                  className="bg-black text-white px-6 py-3 rounded-lg font-semibold text-[13px] hover:bg-gray-900 transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Invitation
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

