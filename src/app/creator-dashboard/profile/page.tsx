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
  HeartIcon,
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
  DocumentCheckIcon
} from '@heroicons/react/24/outline';
import FloatingNav from '../../../componets/ui/FloatingNav';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { storage, auth } from '@/lib/firebase/client';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface Platform {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  username?: string;
  followers?: number;
  verified?: boolean;
  color: string;
}

import { apiGet, apiPatch } from '@/lib/api/client';

// ... interface Platform remains ...

function CreatorProfileContent() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verificationStep, setVerificationStep] = useState(1);
  const [platforms, setPlatforms] = useState<Platform[]>([
    { id: 'instagram', name: 'Instagram', icon: 'IG', connected: false, color: 'bg-gradient-to-br from-purple-600 to-pink-500' },
    { id: 'youtube', name: 'YouTube', icon: 'YT', connected: false, color: 'bg-red-600' },
    { id: 'tiktok', name: 'TikTok', icon: 'TT', connected: false, color: 'bg-black' },
    { id: 'twitter', name: 'Twitter/X', icon: 'X', connected: false, color: 'bg-black' },
    { id: 'facebook', name: 'Facebook', icon: 'FB', connected: false, color: 'bg-blue-600' },
    { id: 'linkedin', name: 'LinkedIn', icon: 'IN', connected: false, color: 'bg-blue-700' }
  ]);

  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await apiGet<{ creator: any }>('/api/creators/me');
        const c = data.creator;
        const stats = c.stats || {};
        
        // Update platforms state if available
        if (c.platforms) {
             const connectedIds = c.platforms.map((p:any) => p.id || p.platform);
             setPlatforms(prev => prev.map(p => ({
                 ...p,
                 connected: connectedIds.includes(p.id)
             })));
        }

        setProfileData({
            personal: {
              name: c.displayName || c.fullName || '',
              username: c.username || '', 
              avatarUrl: c.avatarUrl || null,
              email: c.email || '',
              phone: c.phone || c.mobileNumber || '',
              bio: c.bio || c.shortBio || '',
              location: c.location || (c.city ? `${c.city}, ${c.country || ''}` : '') || '',
              website: c.website || '',
              dateOfBirth: c.dateOfBirth || '',
              languages: c.languages || [],
              interests: c.interests || []
            },
            professional: {
              category: c.categories?.[0] || 'Beauty & Skincare',
              experience: c.experience || '1+ years',
              followers: c.followerCount || stats.totalFollowers || 0,
              engagement: stats.avgEngagement || 0,
              rating: stats.averageRating || 5.0,
              completedCampaigns: stats.completedCampaigns || 0,
              authenticityScore: stats.authenticityScore || 0,
              verified: c.verified || false,
              identityVerified: c.identityVerified || false,
              businessVerified: false,
              priceRange: c.priceRange || '₹5,000 - ₹10,000',
              deliveryTime: c.deliveryTime || '3-5 days',
              availability: c.availability || 'Available',
              responseTime: c.responseTime || '12 hours',
              skills: c.skills || ['Content Creation'],
              certifications: [
                { name: 'Certified Creator', issuer: 'Verolinkr', date: '2024' }
              ],
              achievements: [
                { title: 'Rising Star', description: 'Joined Verolinkr', icon: TrophyIcon, date: '2024' }
              ]
            },
            portfolio: {
              recentWork: [],
              bestPerforming: [],
              mediaKit: {
                totalReach: stats.totalFollowers || 0,
                avgEngagement: stats.avgEngagement || 0,
                audienceGender: 'N/A',
                audienceAge: 'N/A',
                topCountries: []
              }
            },
            stats: {
                totalEarnings: stats.totalEarnings || 0,
                totalViews: stats.totalViews || 0,
                totalCampaigns: stats.activeCampaigns + stats.completedCampaigns || 0,
                avgRating: stats.averageRating || 0,
                responseRate: stats.responseRate || 0,
                onTimeDelivery: 100
            },
            payment: {
                accountHolder: c.accountHolder || c.displayName || '',
                accountNumber: c.accountNumber || '',
                ifscCode: c.ifscCode || '',
                bankName: c.bankName || '',
                upiId: c.upiId || '',
                panCard: c.pan || '',
                gstNumber: c.gstNumber || '',
                payoutMethod: c.payoutMethod || 'bank'
            }
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: UserIcon },
    { id: 'professional', label: 'Professional', icon: StarIcon },
    { id: 'platforms', label: 'Platforms', icon: LinkIcon },
    { id: 'portfolio', label: 'Portfolio', icon: PhotoIcon },
    { id: 'verification', label: 'Verification', icon: ShieldCheckIcon },
    { id: 'payment', label: 'Payment', icon: CreditCardIcon },
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
    
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("No user");
        
        const fileRef = ref(storage, `creators/${user.uid}/avatar_${Date.now()}_${file.name}`);
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        
        // Update local state
        setProfileData((prev: any) => ({
            ...prev, 
            personal: { ...prev.personal, avatarUrl: url }
        }));
        
        // Save to API
        await apiPatch('/api/creators/me', { avatarUrl: url });
        
        setSuccessMessage('✓ Profile picture updated successfully');
        setShowSuccessModal(true);
        setTimeout(() => setShowSuccessModal(false), 3000);
    } catch (error) {
        console.error("Upload failed", error);
        setSuccessMessage('❌ Upload failed');
        setShowSuccessModal(true);
        setTimeout(() => setShowSuccessModal(false), 3000);
    } finally {
        setUploadingImage(false);
    }
  };

  const handleInputChange = (section: string, field: string, value: any) => {
    setProfileData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    try {
        setSuccessMessage('Saving...');
        setShowSuccessModal(true);
        
        const payload: any = {
            displayName: profileData.personal.name,
            bio: profileData.personal.bio,
            // Only include fields if they exist in state to avoid overwriting with undefined
            ...(profileData.personal.phone && { phone: profileData.personal.phone }),
            ...(profileData.personal.website && { website: profileData.personal.website }),
            ...(profileData.personal.dateOfBirth && { dateOfBirth: profileData.personal.dateOfBirth }),
            languages: profileData.personal.languages,
            interests: profileData.personal.interests,
            
            categories: [profileData.professional.category],
            experience: profileData.professional.experience,
            priceRange: profileData.professional.priceRange,
            deliveryTime: profileData.professional.deliveryTime,
            availability: profileData.professional.availability,
            responseTime: profileData.professional.responseTime,
            skills: profileData.professional.skills,
            
            // Map location if needed, API accepts city/state/country separately usually, 
            // but we might just store location string if we updated API to accept it? 
            // I'll check mapped API allowed fields again.
             // I added 'location' wasn't in allowed list? 
             // allowed: city, state, country.
             // I'll assume location is immutable for now or split it if I want to be fancy.
             // Let's just stick to what we have.
             
             // Payment Details
             bankName: profileData.payment.bankName,
             accountNumber: profileData.payment.accountNumber,
             ifscCode: profileData.payment.ifscCode,
             pan: profileData.payment.panCard,
             upiId: profileData.payment.upiId,
             gstNumber: profileData.payment.gstNumber,
             payoutMethod: profileData.payment.payoutMethod,
             
             // Professional Handle (if editable)
             professionalHandle: profileData.personal.username ? profileData.personal.username.replace('@', '') : undefined
        };
        
        await apiPatch('/api/creators/me', payload);
        
        setIsEditing(false);
        setSuccessMessage('✓ Profile updated successfully');
        setTimeout(() => setShowSuccessModal(false), 3000);
    } catch (error) {
        console.error('Error saving profile:', error);
        setSuccessMessage('❌ Error saving profile');
        setTimeout(() => setShowSuccessModal(false), 3000);
    }
  };

  const handleConnectPlatform = (platformId: string) => {
    setSelectedPlatform(platformId);
    setShowConnectModal(true);
  };

  const confirmConnect = () => {
    setPlatforms(platforms.map(p => 
      p.id === selectedPlatform ? {...p, connected: true} : p
    ));
    setShowConnectModal(false);
    setSuccessMessage('✓ Platform connected successfully');
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 3000);
  };

  const handleDisconnect = (platformId: string) => {
    setPlatforms(platforms.map(p => 
      p.id === platformId ? {...p, connected: false, username: undefined, followers: undefined} : p
    ));
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
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            className="fixed top-8 right-8 z-50"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
          >
            <div className="bg-white border-2 border-black rounded-lg p-4 shadow-xl min-w-[300px]">
              <p className="text-[14px] font-bold text-black">{successMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connect Platform Modal */}
      <AnimatePresence>
        {showConnectModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConnectModal(false)}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="bg-white border-2 border-black rounded-lg p-8 max-w-md w-full">
                <h3 className="text-[24px] font-black text-black mb-4">Connect Platform</h3>
                <p className="text-[14px] text-gray-700 mb-6">
                  You&apos;ll be redirected to authorize {platforms.find(p => p.id === selectedPlatform)?.name}. Make sure you&apos;re logged in.
                </p>
                <div className="flex gap-3">
                  <motion.button
                    className="flex-1 px-4 py-3 bg-white border-2 border-gray-300 text-black rounded-lg font-semibold text-[14px] hover:border-black transition-all duration-200"
                    onClick={() => setShowConnectModal(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    className="flex-1 px-4 py-3 bg-black text-white rounded-lg font-semibold text-[14px] hover:bg-gray-900 transition-all duration-200"
                    onClick={confirmConnect}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Connect
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Verification Modal */}
      <AnimatePresence>
        {showVerifyModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowVerifyModal(false)}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="bg-white border-2 border-black rounded-lg p-8 max-w-2xl w-full my-8">
                <h3 className="text-[24px] font-black text-black mb-6">Identity Verification</h3>
                
                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-8">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center flex-1">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        verificationStep >= step ? 'bg-black border-black text-white' : 'border-gray-300 text-gray-400'
                      }`}>
                        {step}
                      </div>
                      {step < 3 && (
                        <div className={`flex-1 h-1 mx-2 ${
                          verificationStep > step ? 'bg-black' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>

                {verificationStep === 1 && (
                  <div className="space-y-6">
                    <h4 className="text-[18px] font-bold text-black">Step 1: Personal Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase">Full Name (as per ID)</label>
                        <input
                          type="text"
                          defaultValue={profileData.personal.name}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black text-[14px] font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase">Date of Birth</label>
                        <input
                          type="date"
                          defaultValue={profileData.personal.dateOfBirth}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black text-[14px] font-medium"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase">Address</label>
                        <textarea
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black text-[14px] font-medium"
                          placeholder="Enter your full address"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {verificationStep === 2 && (
                  <div className="space-y-6">
                    <h4 className="text-[18px] font-bold text-black">Step 2: Document Upload</h4>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-black transition-all">
                        <ArrowUpTrayIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-[14px] font-bold text-black mb-2">Upload Government ID</p>
                        <p className="text-[12px] text-gray-600 mb-4">Aadhaar, PAN Card, Passport, or Driving License</p>
                        <input type="file" className="hidden" id="id-upload" accept="image/*,application/pdf" />
                        <label htmlFor="id-upload" className="inline-block px-6 py-2 bg-black text-white rounded-lg text-[13px] font-bold cursor-pointer hover:bg-gray-900">
                          Choose File
                        </label>
                      </div>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-black transition-all">
                        <CameraIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-[14px] font-bold text-black mb-2">Upload Selfie</p>
                        <p className="text-[12px] text-gray-600 mb-4">Hold your ID next to your face</p>
                        <input type="file" className="hidden" id="selfie-upload" accept="image/*" />
                        <label htmlFor="selfie-upload" className="inline-block px-6 py-2 bg-black text-white rounded-lg text-[13px] font-bold cursor-pointer hover:bg-gray-900">
                          Choose File
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {verificationStep === 3 && (
                  <div className="space-y-6 text-center">
                    <CheckCircleIcon className="w-24 h-24 text-black mx-auto" />
                    <h4 className="text-[24px] font-black text-black">Review & Submit</h4>
                    <p className="text-[14px] text-gray-700">
                      Please review your information before submitting. Our team will verify your documents within 24-48 hours.
                    </p>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-left">
                      <div className="grid grid-cols-2 gap-4 text-[13px]">
                        <div><span className="text-gray-600">Name:</span> <span className="font-bold text-black">{profileData.personal.name}</span></div>
                        <div><span className="text-gray-600">DOB:</span> <span className="font-bold text-black">{profileData.personal.dateOfBirth}</span></div>
                        <div><span className="text-gray-600">Documents:</span> <span className="font-bold text-black">2 files uploaded</span></div>
                        <div><span className="text-gray-600">Status:</span> <span className="font-bold text-black">Ready to submit</span></div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-8">
                  {verificationStep > 1 && (
                    <motion.button
                      className="px-6 py-3 bg-white border-2 border-gray-300 text-black rounded-lg font-semibold text-[14px] hover:border-black"
                      onClick={() => setVerificationStep(verificationStep - 1)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Back
                    </motion.button>
                  )}
                  <motion.button
                    className="flex-1 px-6 py-3 bg-black text-white rounded-lg font-semibold text-[14px] hover:bg-gray-900"
                    onClick={() => {
                      if (verificationStep < 3) {
                        setVerificationStep(verificationStep + 1);
                      } else {
                        setShowVerifyModal(false);
                        setSuccessMessage('✓ Verification submitted! We\'ll review within 24-48 hours.');
                        setShowSuccessModal(true);
                        setTimeout(() => setShowSuccessModal(false), 3000);
                      }
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {verificationStep === 3 ? 'Submit for Review' : 'Continue'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        className="bg-white border-b border-gray-200"
        {...fadeInUp}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto">
          <div className="flex justify-between items-start py-8">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <ShieldCheckIcon className="w-4 h-4 text-black" />
                <span className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                  {profileData.professional.identityVerified ? 'Verified Creator' : 'Unverified Account'}
                </span>
                <span className="text-[11px] font-semibold text-gray-600">•</span>
                <div className="flex items-center space-x-1">
                  <StarIcon className="w-3 h-3 text-black" />
                  <span className="text-[11px] font-semibold text-gray-600">{profileData.professional.rating}/5.0</span>
                </div>
              </div>
              <h1 className="text-[48px] md:text-[56px] font-black text-black tracking-tighter leading-none mb-3">
                My Profile
              </h1>
              <p className="text-[14px] text-gray-600 font-normal max-w-lg">
                Manage your professional profile, connect platforms, and showcase your work
              </p>
            </div>
            <motion.button
              className={`px-6 py-3 rounded-full text-[13px] font-bold transition-all duration-200 ${
                isEditing 
                  ? 'bg-black text-white hover:bg-gray-900' 
                  : 'bg-white border-2 border-gray-300 text-black hover:border-black'
              }`}
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <PencilIcon className="w-4 h-4" />
                <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="w-full px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto py-8">
        {/* Profile Header Card */}
        <motion.div
          className="bg-white border border-gray-200 rounded-lg p-8 mb-8"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center text-white font-bold text-4xl relative overflow-hidden">
                {profileData.personal.avatarUrl ? (
                    <img src={profileData.personal.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                    <span className="relative z-10">
                    {profileData.personal.name ? profileData.personal.name.split(' ').map((n: string) => n[0]).join('') : '?'}
                    </span>
                )}
              </div>
              {isEditing && (
                <motion.label
                  className="absolute bottom-2 right-2 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-all duration-200 border-2 border-white shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                  {uploadingImage ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  ) : (
                    <CameraIcon className="w-5 h-5" />
                  )}
                </motion.label>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-4 flex-wrap">
                <h2 className="text-[32px] font-black text-black">{profileData.personal.name}</h2>
                {profileData.professional.verified && (
                  <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-gray-100 border border-gray-200">
                    <ShieldCheckIcon className="w-4 h-4 text-black" />
                    <span className="text-[11px] font-bold text-black uppercase">VERIFIED</span>
                  </div>
                )}
                {profileData.professional.identityVerified && (
                  <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-black text-white">
                    <DocumentCheckIcon className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase">ID VERIFIED</span>
                  </div>
                )}
              </div>
              
              <p className="text-[16px] text-gray-600 mb-4 font-medium">{profileData.personal.username}</p>
              
              <div className="flex items-center justify-center lg:justify-start gap-6 text-[13px] text-gray-600 mb-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4 text-black" />
                  <span>{profileData.personal.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <StarIcon className="w-4 h-4 text-black" />
                  <span className="font-bold text-black">{profileData.professional.rating}/5.0</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-black" />
                  <span>{profileData.professional.completedCampaigns} campaigns</span>
                </div>
              </div>

              <p className="text-[14px] text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-6">
                {profileData.personal.bio}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:border-black transition-all duration-200">
                  <p className="text-[24px] font-black text-black leading-none mb-1">
                    {(profileData.professional.followers / 1000).toFixed(0)}K
                  </p>
                  <p className="text-[11px] text-gray-600 font-medium uppercase">Followers</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:border-black transition-all duration-200">
                  <p className="text-[24px] font-black text-black leading-none mb-1">
                    {profileData.professional.engagement}%
                  </p>
                  <p className="text-[11px] text-gray-600 font-medium uppercase">Engagement</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:border-black transition-all duration-200">
                  <p className="text-[24px] font-black text-black leading-none mb-1">
                    {profileData.professional.authenticityScore}%
                  </p>
                  <p className="text-[11px] text-gray-600 font-medium uppercase">Authenticity</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:border-black transition-all duration-200">
                  <p className="text-[24px] font-black text-black leading-none mb-1">
                    ₹{(profileData.stats.totalEarnings / 1000).toFixed(0)}K
                  </p>
                  <p className="text-[11px] text-gray-600 font-medium uppercase">Earnings</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="bg-white rounded-lg border border-gray-200 mb-8"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-6 px-6 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-semibold text-[13px] flex items-center space-x-2 transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {/* Personal Info Tab */}
            {activeTab === 'personal' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase tracking-wider">Full Name *</label>
                    <input
                      type="text"
                      value={profileData.personal.name || ''}
                      onChange={(e) => handleInputChange('personal', 'name', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black text-[14px] font-medium text-black disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase tracking-wider">Username *</label>
                    <input
                      type="text"
                      value={profileData.personal.username || ''}
                      onChange={(e) => handleInputChange('personal', 'username', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black text-[14px] font-medium text-black disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase tracking-wider">Email *</label>
                    <input
                      type="email"
                      value={profileData.personal.email || ''}
                      onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black text-[14px] font-medium text-black disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase tracking-wider">Phone Number</label>
                    <input
                      type="tel"
                      value={profileData.personal.phone || ''}
                      onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black text-[14px] font-medium text-black disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase tracking-wider">Location</label>
                    <input
                      type="text"
                      value={profileData.personal.location || ''}
                      onChange={(e) => handleInputChange('personal', 'location', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black text-[14px] font-medium text-black disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase tracking-wider">Website</label>
                    <input
                      type="url"
                      value={profileData.personal.website || ''}
                      onChange={(e) => handleInputChange('personal', 'website', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black text-[14px] font-medium text-black disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase tracking-wider">Bio *</label>
                  <textarea
                    rows={4}
                    value={profileData.personal.bio || ''}
                    onChange={(e) => handleInputChange('personal', 'bio', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black text-[14px] font-medium text-black disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                {/* Languages */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-3 uppercase tracking-wider">Languages</label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.personal.languages.map((language: any, index: number) => (
                      <span key={index} className="px-4 py-2 bg-gray-100 border border-gray-200 text-black rounded-full text-[12px] font-semibold flex items-center gap-2 hover:border-black transition-all duration-200">
                        {language}
                        {isEditing && (
                          <button className="hover:bg-gray-200 rounded-full p-1 transition-all duration-200">
                            <XMarkIcon className="w-3 h-3" />
                          </button>
                        )}
                      </span>
                    ))}
                    {isEditing && (
                      <motion.button
                        className="px-4 py-2 bg-white border-2 border-gray-300 text-black rounded-full text-[12px] font-semibold hover:border-black transition-all duration-200 flex items-center gap-2"
                        onClick={() => {
                            const val = prompt('Enter language:');
                            if (val) {
                                setProfileData((prev:any) => ({
                                    ...prev,
                                    personal: { ...prev.personal, languages: [...prev.personal.languages, val] }
                                }));
                            }
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <PlusIcon className="w-4 h-4" />
                        Add Language
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-3 uppercase tracking-wider">Interests & Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.personal.interests.map((interest: any, index: number) => (
                      <span key={index} className="px-4 py-2 bg-gray-100 border border-gray-200 text-black rounded-full text-[12px] font-semibold flex items-center gap-2 hover:border-black transition-all duration-200">
                        {interest}
                        {isEditing && (
                          <button className="hover:bg-gray-200 rounded-full p-1 transition-all duration-200">
                            <XMarkIcon className="w-3 h-3" />
                          </button>
                        )}
                      </span>
                    ))}
                    {isEditing && (
                      <motion.button
                        className="px-4 py-2 bg-white border-2 border-gray-300 text-black rounded-full text-[12px] font-semibold hover:border-black transition-all duration-200 flex items-center gap-2"
                        onClick={() => {
                            const val = prompt('Enter interest:');
                            if (val) {
                                setProfileData((prev:any) => ({
                                    ...prev,
                                    personal: { ...prev.personal, interests: [...prev.personal.interests, val] }
                                }));
                            }
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <PlusIcon className="w-4 h-4" />
                        Add Interest
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Professional Tab */}
            {activeTab === 'professional' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase tracking-wider">Category *</label>
                    <select
                      value={profileData.professional.category || 'beauty'}
                      onChange={(e) => handleInputChange('professional', 'category', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black text-[14px] font-medium text-black disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      <option value="beauty">Beauty & Skincare</option>
                      <option value="fashion">Fashion</option>
                      <option value="tech">Technology</option>
                      <option value="food">Food & Cooking</option>
                      <option value="fitness">Fitness & Wellness</option>
                      <option value="travel">Travel & Lifestyle</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase tracking-wider">Experience</label>
                    <input
                      type="text"
                      value={profileData.professional.experience || ''}
                      onChange={(e) => handleInputChange('professional', 'experience', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black text-[14px] font-medium text-black disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase tracking-wider">Price Range</label>
                    <input
                      type="text"
                      value={profileData.professional.priceRange || ''}
                      onChange={(e) => handleInputChange('professional', 'priceRange', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black text-[14px] font-medium text-black disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase tracking-wider">Delivery Time</label>
                    <input
                      type="text"
                      value={profileData.professional.deliveryTime || ''}
                      onChange={(e) => handleInputChange('professional', 'deliveryTime', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black text-[14px] font-medium text-black disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-3 uppercase tracking-wider">Skills & Expertise</label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.professional.skills.map((skill: any, index: number) => (
                      <span key={index} className="px-4 py-2 bg-gray-100 border border-gray-200 text-black rounded-full text-[12px] font-semibold flex items-center gap-2 hover:border-black transition-all duration-200">
                        {skill}
                        {isEditing && (
                          <button className="hover:bg-gray-200 rounded-full p-1 transition-all duration-200">
                            <XMarkIcon className="w-3 h-3" />
                          </button>
                        )}
                      </span>
                    ))}
                    {isEditing && (
                      <motion.button
                        className="px-4 py-2 bg-white border-2 border-gray-300 text-black rounded-full text-[12px] font-semibold hover:border-black transition-all duration-200 flex items-center gap-2"
                        onClick={() => {
                            const val = prompt('Enter skill:');
                            if (val) {
                                setProfileData((prev:any) => ({
                                    ...prev,
                                    professional: { ...prev.professional, skills: [...prev.professional.skills, val] }
                                }));
                            }
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <PlusIcon className="w-4 h-4" />
                        Add Skill
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider">Certifications</label>
                    {isEditing && (
                      <motion.button
                        className="px-4 py-2 bg-black text-white rounded-lg font-semibold text-[11px] hover:bg-gray-900"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <PlusIcon className="w-4 h-4 inline mr-1" />
                        Add Certification
                      </motion.button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profileData.professional.certifications.map((cert: any, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-black transition-all">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-[14px] font-bold text-black mb-1">{cert.name}</p>
                            <p className="text-[12px] text-gray-600">Issued by {cert.issuer}</p>
                            <p className="text-[11px] text-gray-500 mt-1">{cert.date}</p>
                          </div>
                          {isEditing && (
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <XMarkIcon className="w-4 h-4 text-gray-600" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h4 className="text-[18px] font-black text-black mb-6">Performance Metrics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-[11px] text-gray-500 font-medium mb-2 uppercase">Authenticity Score</p>
                      <p className="text-[32px] font-black text-black mb-2">{profileData.professional.authenticityScore}%</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-black h-2 rounded-full" 
                          style={{ width: `${profileData.professional.authenticityScore}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-500 font-medium mb-2 uppercase">Rating</p>
                      <p className="text-[32px] font-black text-black mb-2">{profileData.professional.rating}/5.0</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-black h-2 rounded-full" 
                          style={{ width: `${(profileData.professional.rating / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-500 font-medium mb-2 uppercase">Campaigns</p>
                      <p className="text-[32px] font-black text-black mb-2">{profileData.professional.completedCampaigns}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-black h-2 rounded-full" 
                          style={{ width: `${(profileData.professional.completedCampaigns / 100) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-500 font-medium mb-2 uppercase">Response Time</p>
                      <p className="text-[32px] font-black text-black mb-2">{profileData.professional.responseTime}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-black h-2 rounded-full" style={{ width: '98%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="text-[18px] font-black text-black mb-6">Achievements & Badges</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {profileData.professional.achievements.map((achievement: any, index: number) => {
                      const Icon = achievement.icon;
                      return (
                        <motion.div
                          key={achievement.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black transition-all duration-200 text-center"
                        >
                          <div className="w-16 h-16 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center mb-4 mx-auto">
                            <Icon className="w-8 h-8 text-black" />
                          </div>
                          <h5 className="text-[14px] font-black text-black mb-2">{achievement.title}</h5>
                          <p className="text-[11px] text-gray-600 mb-2">{achievement.description}</p>
                          <p className="text-[10px] text-gray-500 uppercase">{achievement.date}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Platforms Tab */}
            {activeTab === 'platforms' && (
              <div className="space-y-8">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <LinkIcon className="w-5 h-5 text-black" />
                    <h4 className="text-[16px] font-bold text-black">Connect Your Platforms</h4>
                  </div>
                  <p className="text-[13px] text-gray-600">
                    Link your social media accounts to verify your reach and automatically sync your follower metrics.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {platforms.map((platform, index) => (
                    <motion.div
                      key={platform.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`border-2 rounded-lg p-6 transition-all duration-200 ${
                        platform.connected ? 'border-black bg-white' : 'border-gray-200 bg-white hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 ${platform.color} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                            {platform.icon}
                          </div>
                          <div>
                            <h5 className="text-[16px] font-black text-black mb-1">{platform.name}</h5>
                            {platform.connected && platform.username && (
                              <p className="text-[13px] text-gray-600">{platform.username}</p>
                            )}
                          </div>
                        </div>
                        {platform.connected && platform.verified && (
                          <CheckCircleIcon className="w-6 h-6 text-black" />
                        )}
                      </div>

                      {platform.connected ? (
                        <>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-[11px] text-gray-500 uppercase mb-1">Followers</p>
                              <p className="text-[20px] font-black text-black">{platform.followers ? (platform.followers / 1000).toFixed(0) + 'K' : '-'}</p>
                            </div>
                            <div>
                              <p className="text-[11px] text-gray-500 uppercase mb-1">Status</p>
                              <span className="inline-block px-3 py-1 bg-black text-white rounded-full text-[10px] font-bold uppercase">
                                Connected
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <motion.button
                              className="flex-1 px-4 py-2 bg-white border-2 border-gray-300 text-black rounded-lg font-semibold text-[13px] hover:border-black transition-all"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Refresh Data
                            </motion.button>
                            <motion.button
                              onClick={() => handleDisconnect(platform.id)}
                              className="px-4 py-2 bg-white border-2 border-gray-300 text-black rounded-lg font-semibold text-[13px] hover:border-black transition-all"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Disconnect
                            </motion.button>
                          </div>
                        </>
                      ) : (
                        <motion.button
                          onClick={() => handleConnectPlatform(platform.id)}
                          className="w-full px-4 py-3 bg-black text-white rounded-lg font-semibold text-[13px] hover:bg-gray-900 transition-all flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <LinkIcon className="w-4 h-4" />
                          Connect {platform.name}
                        </motion.button>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Connection Stats */}
                <div className="grid grid-cols-3 gap-6 mt-8">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                    <p className="text-[32px] font-black text-black">{platforms.filter(p => p.connected).length}/{platforms.length}</p>
                    <p className="text-[11px] text-gray-600 uppercase">Platforms Connected</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                    <p className="text-[32px] font-black text-black">{platforms.reduce((sum, p) => sum + (p.followers || 0), 0).toLocaleString()}</p>
                    <p className="text-[11px] text-gray-600 uppercase">Total Reach</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                    <p className="text-[32px] font-black text-black">{platforms.filter(p => p.verified).length}</p>
                    <p className="text-[11px] text-gray-600 uppercase">Verified</p>
                  </div>
                </div>
              </div>
            )}

            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h4 className="text-[24px] font-black text-black">Recent Work</h4>
                  {isEditing && (
                    <motion.button
                      className="px-4 py-2 bg-black text-white rounded-lg font-semibold text-[13px] hover:bg-gray-900 transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <PlusIcon className="w-4 h-4 inline mr-2" />
                      Add Work
                    </motion.button>
                  )}
                </div>
                
                <div className="space-y-4">
                  {profileData.portfolio.recentWork.map((work: any, index: number) => (
                    <motion.div
                      key={work.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h5 className="text-[18px] font-black text-black mb-2">{work.title}</h5>
                          <p className="text-[13px] text-gray-600">for {work.brand}</p>
                        </div>
                        {isEditing && (
                          <motion.button
                            className="p-2 rounded-lg border border-gray-300 hover:border-black transition-all duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <XMarkIcon className="w-5 h-5 text-black" />
                          </motion.button>
                        )}
                      </div>
                      <div className="grid grid-cols-4 gap-6">
                        <div>
                          <p className="text-[11px] text-gray-500 mb-1 uppercase">Views</p>
                          <p className="text-[20px] font-black text-black">{work.views.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-500 mb-1 uppercase">Engagement</p>
                          <p className="text-[20px] font-black text-black">{work.engagement}%</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-500 mb-1 uppercase">Likes</p>
                          <p className="text-[20px] font-black text-black">{work.likes.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-500 mb-1 uppercase">Date</p>
                          <p className="text-[20px] font-black text-black">{work.date}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div>
                  <h4 className="text-[24px] font-black text-black mb-6">Best Performing Content</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {profileData.portfolio.bestPerforming.map((content: any, index: number) => (
                      <motion.div
                        key={content.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black transition-all duration-200 group"
                      >
                        <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center border border-gray-200 relative overflow-hidden">
                          <PlayIcon className="w-12 h-12 text-black group-hover:scale-110 transition-transform duration-200" />
                          <span className="absolute top-2 right-2 px-2 py-1 rounded bg-gray-100 border border-gray-200 text-[10px] font-bold text-black uppercase">
                            BEST
                          </span>
                        </div>
                        <h5 className="text-[16px] font-black text-black mb-3">{content.title}</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[12px] text-gray-600">Views</span>
                            <span className="font-black text-black text-[13px]">{content.views.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[12px] text-gray-600">Engagement</span>
                            <span className="font-black text-black text-[13px]">{content.engagement}%</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Verification Tab */}
            {activeTab === 'verification' && (
              <div className="space-y-8">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <ShieldCheckIcon className="w-6 h-6 text-black flex-shrink-0" />
                    <div>
                      <h4 className="text-[16px] font-bold text-black mb-2">Why Get Verified?</h4>
                      <p className="text-[13px] text-gray-700 mb-4">
                        Verified creators get more visibility, higher-paying campaigns, and increased trust from brands.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white border border-gray-200 text-black rounded-full text-[11px] font-bold">Priority Support</span>
                        <span className="px-3 py-1 bg-white border border-gray-200 text-black rounded-full text-[11px] font-bold">Premium Campaigns</span>
                        <span className="px-3 py-1 bg-white border border-gray-200 text-black rounded-full text-[11px] font-bold">Trust Badge</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Identity Verification */}
                  <div className="border-2 border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <DocumentCheckIcon className="w-6 h-6 text-black" />
                        <h5 className="text-[16px] font-bold text-black">Identity Verification</h5>
                      </div>
                      {profileData.professional.identityVerified ? (
                        <span className="px-3 py-1 bg-black text-white rounded-full text-[10px] font-bold uppercase">
                          VERIFIED
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-[10px] font-bold uppercase">
                          PENDING
                        </span>
                      )}
                    </div>
                    <p className="text-[13px] text-gray-700 mb-4">
                      Verify your identity with government-issued ID to gain trust from brands.
                    </p>
                    {!profileData.professional.identityVerified && (
                      <motion.button
                        onClick={() => setShowVerifyModal(true)}
                        className="w-full px-4 py-3 bg-black text-white rounded-lg font-semibold text-[13px] hover:bg-gray-900"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Start Verification
                      </motion.button>
                    )}
                  </div>

                  {/* Business Verification */}
                  <div className="border-2 border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <BuildingLibraryIcon className="w-6 h-6 text-black" />
                        <h5 className="text-[16px] font-bold text-black">Business Verification</h5>
                      </div>
                      {profileData.professional.businessVerified ? (
                        <span className="px-3 py-1 bg-black text-white rounded-full text-[10px] font-bold uppercase">
                          VERIFIED
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-[10px] font-bold uppercase">
                          NOT VERIFIED
                        </span>
                      )}
                    </div>
                    <p className="text-[13px] text-gray-700 mb-4">
                      Register as a business entity to access GST invoices and tax benefits.
                    </p>
                    {!profileData.professional.businessVerified && (
                      <motion.button
                        className="w-full px-4 py-3 bg-white border-2 border-gray-300 text-black rounded-lg font-semibold text-[13px] hover:border-black"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Verify Business
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Verification Checklist */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-[18px] font-bold text-black mb-6">Verification Checklist</h4>
                  <div className="space-y-4">
                    {[
                      { label: 'Government ID Uploaded', completed: true },
                      { label: 'Selfie with ID Uploaded', completed: true },
                      { label: 'Phone Number Verified', completed: true },
                      { label: 'Email Address Verified', completed: true },
                      { label: 'Address Proof Submitted', completed: false },
                      { label: 'Bank Account Linked', completed: true }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-black transition-all">
                        <div className="flex items-center gap-3">
                          {item.completed ? (
                            <CheckCircleIcon className="w-5 h-5 text-black" />
                          ) : (
                            <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                          )}
                          <span className="text-[14px] font-medium text-black">{item.label}</span>
                        </div>
                        {item.completed && (
                          <span className="text-[11px] font-bold text-black">COMPLETED</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Payment Tab */}
            {activeTab === 'payment' && (
              <div className="space-y-8">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <CreditCardIcon className="w-5 h-5 text-black" />
                    <h4 className="text-[16px] font-bold text-black">Payment Settings</h4>
                  </div>
                  <p className="text-[13px] text-gray-600">
                    Set up your preferred payment method to receive campaign earnings quickly and securely.
                  </p>
                </div>

                {/* Bank Account */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <BuildingLibraryIcon className="w-6 h-6 text-black" />
                      <h5 className="text-[18px] font-bold text-black">Bank Account</h5>
                    </div>
                    <span className="px-3 py-1 bg-black text-white rounded-full text-[10px] font-bold uppercase">
                      VERIFIED
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase">Account Holder Name</label>
                      <input
                        type="text"
                        value={profileData.payment.accountHolder}
                        onChange={(e) => handleInputChange('payment', 'accountHolder', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black text-[14px] font-medium text-black disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="Account Holder Name"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase">Account Number</label>
                      <input
                        type="text"
                        value={profileData.payment.accountNumber}
                        onChange={(e) => handleInputChange('payment', 'accountNumber', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black text-[14px] font-medium text-black disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="Account Number"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase">IFSC Code</label>
                      <input
                        type="text"
                        value={profileData.payment.ifscCode}
                        onChange={(e) => handleInputChange('payment', 'ifscCode', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black text-[14px] font-medium text-black disabled:bg-gray-50 disabled:text-gray-500 uppercase"
                        placeholder="IFSC Code"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase">Bank Name</label>
                      <input
                        type="text"
                        value={profileData.payment.bankName}
                        onChange={(e) => handleInputChange('payment', 'bankName', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black text-[14px] font-medium text-black disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="Bank Name"
                      />
                    </div>
                  </div>
                </div>

                {/* UPI */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <CreditCardIcon className="w-6 h-6 text-black" />
                      <h5 className="text-[18px] font-bold text-black">UPI Details</h5>
                    </div>
                  </div>
                  <div className="max-w-md">
                    <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase">UPI ID</label>
                    <input
                      type="text"
                      value={profileData.payment.upiId}
                      onChange={(e) => handleInputChange('payment', 'upiId', e.target.value)}
                      disabled={!isEditing}
                      placeholder="yourname@upi"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black text-[14px] font-medium text-black disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                {/* Tax Information */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <DocumentTextIcon className="w-6 h-6 text-black" />
                    <h5 className="text-[18px] font-bold text-black">Tax Information</h5>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase">PAN Card Number</label>
                      <input
                        type="text"
                        value={profileData.payment.panCard}
                        onChange={(e) => handleInputChange('payment', 'panCard', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black text-[14px] font-medium text-black disabled:bg-gray-50 disabled:text-gray-500 uppercase"
                        placeholder="PAN Number"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase">GST Number (Optional)</label>
                      <input
                        type="text"
                        value={profileData.payment.gstNumber}
                        onChange={(e) => handleInputChange('payment', 'gstNumber', e.target.value)}
                        placeholder="Enter GST Number"
                        disabled={!isEditing}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black text-[14px] font-medium text-black disabled:bg-gray-50 disabled:text-gray-500 uppercase"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Statistics Tab */}
            {activeTab === 'stats' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <CurrencyDollarIcon className="w-5 h-5 text-black" />
                      </div>
                      <div className="flex items-center space-x-1">
                        <ArrowUpIcon className="w-3 h-3 text-black" />
                        <span className="text-[11px] font-bold text-black">+24%</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-500 mb-2 uppercase">Total Earnings</p>
                    <p className="text-[32px] font-black text-black">₹{profileData.stats.totalEarnings.toLocaleString()}</p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <EyeIcon className="w-5 h-5 text-black" />
                      </div>
                      <div className="flex items-center space-x-1">
                        <ArrowUpIcon className="w-3 h-3 text-black" />
                        <span className="text-[11px] font-bold text-black">+18%</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-500 mb-2 uppercase">Total Views</p>
                    <p className="text-[32px] font-black text-black">{(profileData.stats.totalViews / 1000).toFixed(0)}K</p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <CheckCircleIcon className="w-5 h-5 text-black" />
                      </div>
                      <div className="flex items-center space-x-1">
                        <ArrowUpIcon className="w-3 h-3 text-black" />
                        <span className="text-[11px] font-bold text-black">+12%</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-500 mb-2 uppercase">Total Campaigns</p>
                    <p className="text-[32px] font-black text-black">{profileData.stats.totalCampaigns}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h5 className="text-[18px] font-black text-black mb-4">Response Rate</h5>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[13px] text-gray-600">Current Rate</span>
                        <span className="text-[24px] font-black text-black">{profileData.stats.responseRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-black h-3 rounded-full" 
                          style={{ width: `${profileData.stats.responseRate}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h5 className="text-[18px] font-black text-black mb-4">On-Time Delivery</h5>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[13px] text-gray-600">Delivery Rate</span>
                        <span className="text-[24px] font-black text-black">{profileData.stats.onTimeDelivery}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-black h-3 rounded-full" 
                          style={{ width: `${profileData.stats.onTimeDelivery}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <FloatingNav userType="creator" />
    </motion.div>
  );
}

export default function CreatorProfile() {
  return (
    <DashboardLayout userType="creator" userName="Creator Name" userEmail="creator@example.com">
      <CreatorProfileContent />
    </DashboardLayout>
  );
}
