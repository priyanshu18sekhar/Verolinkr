'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CurrencyDollarIcon, 
  ChartBarIcon, 
  ClockIcon,
  CheckCircleIcon,
  UserIcon,
  EyeIcon,
  ShieldCheckIcon,
  StarIcon,
  GiftIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  DocumentCheckIcon,
  PlusIcon,
  TrophyIcon,
  CalendarIcon,
  BellIcon,
  FireIcon,
  SparklesIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  VideoCameraIcon,
  PhotoIcon,
  DocumentTextIcon,
  ShareIcon
} from '@heroicons/react/24/outline';
import DashboardLayout from '../../components/layout/DashboardLayout';
import FloatingNav from '../../componets/ui/FloatingNav';
import CompleteBankDetails from '../../components/dashboard/CompleteBankDetails';
import { DashboardEmptyState } from '../../components/dashboard/DashboardEmptyStates';

import { apiGet } from '@/lib/api/client';

function CreatorDashboardContent() {
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'mycampaigns' | 'earnings' | 'analytics'>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [creatorProfile, setCreatorProfile] = useState<any>(null);
  const [showBankModal, setShowBankModal] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  // Check if bank details need to be completed
  const needsBankDetails = creatorProfile && !creatorProfile.bankDetailsCompleted;
  const noPlatformsConnected = creatorProfile && creatorProfile.platformsLinked === 0;

  useEffect(() => {
    async function fetchData() {
      try {
        const [profileRes, analyticsRes] = await Promise.all([
            apiGet<{ creator: any }>('/api/creators/me'),
            apiGet<any>('/api/creators/analytics')
        ]);
        
        if (profileRes && profileRes.creator) {
          setCreatorProfile(profileRes.creator);
        }
        if (analyticsRes) {
            setAnalyticsData(analyticsRes);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const defaultStats = {
    totalEarnings: 0,
    thisMonthEarnings: 0,
    pendingEarnings: 0,
    activeCampaigns: 0,
    completedCampaigns: 0,
    totalFollowers: 0,
    avgEngagement: 0,
    authenticityScore: 0,
    trustworthinessRating: 0,
    totalViews: 0,
    responseRate: 0,
    completionRate: 0,
    averageRating: 0
  };

  // Use real stats if available
  const creatorStats = creatorProfile?.stats ? { ...defaultStats, ...creatorProfile.stats } : defaultStats;

  // Real graph data or empty state
  const monthlyEarnings = analyticsData?.monthlyEarnings || [];
  const maxEarning = monthlyEarnings.length > 0 ? Math.max(...monthlyEarnings.map((m: any) => m.amount)) : 100;

  // Placeholder for these until fully implemented in API
  const campaignPerformance = analyticsData?.performanceData || [];

  // Empty states for now to strictly follow "no mock data"
  const platformStats: any[] = [];
  const recentActivity: any[] = [];
  const upcomingDeadlines: any[] = [];
  const achievements: any[] = [];
  const availableCampaigns: any[] = [];
  const myCampaigns: any[] = [];
  const completedCampaigns: any[] = [];
  const paymentHistory: any[] = [];



  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-black text-white';
      case 'completed': return 'bg-gray-100 text-gray-700';
      case 'pending': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-black';
      case 'medium': return 'border-gray-400';
      case 'low': return 'border-gray-300';
      default: return 'border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-gray-100 text-gray-700';
      case 'Medium': return 'bg-gray-200 text-gray-800';
      case 'Hard': return 'bg-black text-white';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Skeleton Loading Component
  const SkeletonLoader = () => (
    <div className="w-full px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto py-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-gray-200 -mx-8 md:-mx-16 lg:-mx-24 px-8 md:px-16 lg:px-24 mb-8">
        <div className="py-8">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="h-3 bg-gray-200 rounded w-32 mb-3"></div>
              <div className="h-12 bg-gray-200 rounded w-96 mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-64"></div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="h-20 w-40 bg-gray-200 rounded"></div>
              <div className="h-12 w-40 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Skeleton */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div className="h-5 bg-gray-200 rounded w-32 mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <div className="w-12 h-12 bg-gray-200 rounded-lg mb-3 mx-auto"></div>
              <div className="h-3 bg-gray-200 rounded w-20 mx-auto mb-2"></div>
              <div className="h-2 bg-gray-200 rounded w-16 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="h-8 w-8 bg-gray-200 rounded-lg mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>

      {/* Action Containers Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-40 mb-4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="h-4 bg-gray-200 rounded w-32 mb-6"></div>
                <div className="h-40 bg-gray-200 rounded mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
              <div className="space-y-3">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Show skeleton loading
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
              <div className="flex items-center space-x-3 mb-3">
                <ShieldCheckIcon className="w-4 h-4 text-black" />
                <span className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Verified Creator</span>
                <span className="text-[11px] font-semibold text-gray-600">•</span>
                <div className="flex items-center space-x-1">
                  <StarIcon className="w-3 h-3 text-black" />
                  <span className="text-[11px] font-semibold text-gray-600">{creatorStats.trustworthinessRating}/5.0</span>
                </div>
                <span className="text-[11px] font-semibold text-gray-600">•</span>
                <span className="text-[11px] font-semibold text-gray-600">{creatorStats.authenticityScore}% Authenticity</span>
              </div>
              <h1 className="text-[48px] md:text-[56px] font-black text-black tracking-tighter leading-none mb-3">
                Creator Dashboard
              </h1>
              <p className="text-[14px] text-gray-600 font-normal max-w-lg">
                Monetize your content with verified brands and guaranteed payments
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right border-l border-gray-200 pl-6">
                <p className="text-[11px] text-gray-500 font-medium uppercase tracking-wider mb-1">Available Balance</p>
                <p className="text-[32px] font-black text-black leading-none">₹{creatorStats.pendingEarnings.toLocaleString()}</p>
                <p className="text-[11px] text-gray-600 font-medium mt-1">Ready to withdraw</p>
              </div>
              <motion.button
                className="bg-black text-white px-6 py-3 rounded-full text-[13px] font-bold hover:bg-gray-900 transition-all duration-200 premium-glow-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <BanknotesIcon className="w-4 h-4" />
                  <span>Withdraw Funds</span>
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Connect Platform Banner */}
      {noPlatformsConnected && (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black text-white"
        >
            <div className="w-full px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                    <ShareIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                    <p className="text-sm font-bold">Connect your Social Platforms</p>
                    <p className="text-xs text-gray-400">Link your Instagram or YouTube to start getting campaigns.</p>
                </div>
                </div>
                <motion.button
                onClick={() => window.location.href = '/creator-dashboard/settings'} 
                className="px-4 py-2 bg-white text-black rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                >
                Connect Now
                </motion.button>
            </div>
            </div>
        </motion.div>
      )}

      {/* Bank Details Completion Banner */}
      {needsBankDetails && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200"
        >
          <div className="w-full px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <BanknotesIcon className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-amber-900">Complete Your Bank Details</p>
                  <p className="text-xs text-amber-700">Add your bank details to receive payments for completed campaigns</p>
                </div>
              </div>
              <motion.button
                onClick={() => setShowBankModal(true)}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg font-semibold text-sm hover:bg-amber-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Add Bank Details
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Bank Details Modal */}
      <CompleteBankDetails
        isOpen={showBankModal}
        onClose={() => setShowBankModal(false)}
        onSuccess={() => {
          // Refresh profile to get updated bankDetailsCompleted status
          apiGet<{ creator: any }>('/api/creators/me').then(response => {
            if (response?.creator) setCreatorProfile(response.creator);
          });
        }}
      />

      <div className="w-full px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto py-8">
        {/* Quick Actions Section */}
        <motion.div
          className="bg-white border border-gray-200 rounded-lg p-6 mb-8"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[18px] font-bold text-black">Quick Actions</h3>
            <span className="text-[11px] text-gray-500 uppercase">Most Used</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <motion.button
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all duration-200 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <VideoCameraIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-[12px] font-semibold text-black">Upload Content</span>
              <span className="text-[10px] text-gray-500 mt-1">3 pending</span>
            </motion.button>

            <motion.button
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all duration-200 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-black transition-colors">
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-black group-hover:text-white transition-colors" />
              </div>
              <span className="text-[12px] font-semibold text-black">Messages</span>
              <span className="text-[10px] text-gray-500 mt-1">5 new</span>
            </motion.button>

            <motion.button
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all duration-200 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-black transition-colors">
                <PhotoIcon className="w-6 h-6 text-black group-hover:text-white transition-colors" />
              </div>
              <span className="text-[12px] font-semibold text-black">Portfolio</span>
              <span className="text-[10px] text-gray-500 mt-1">15 items</span>
            </motion.button>

            <motion.button
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all duration-200 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-black transition-colors">
                <CalendarIcon className="w-6 h-6 text-black group-hover:text-white transition-colors" />
              </div>
              <span className="text-[12px] font-semibold text-black">Schedule</span>
              <span className="text-[10px] text-gray-500 mt-1">2 upcoming</span>
            </motion.button>

            <motion.button
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all duration-200 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-black transition-colors">
                <ChartBarIcon className="w-6 h-6 text-black group-hover:text-white transition-colors" />
              </div>
              <span className="text-[12px] font-semibold text-black">Analytics</span>
              <span className="text-[10px] text-gray-500 mt-1">View report</span>
            </motion.button>

            <motion.button
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all duration-200 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-black transition-colors">
                <DocumentTextIcon className="w-6 h-6 text-black group-hover:text-white transition-colors" />
              </div>
              <span className="text-[12px] font-semibold text-black">Proposals</span>
              <span className="text-[10px] text-gray-500 mt-1">2 drafts</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Overview - Enhanced */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-black transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <CurrencyDollarIcon className="w-4 h-4 text-black" />
              </div>
            </div>
            <p className="text-[24px] font-black text-black leading-none">₹{creatorStats.thisMonthEarnings.toLocaleString()}</p>
            <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase">This Month</p>
            <div className="flex items-center space-x-1 mt-1">
              <ArrowUpIcon className="w-3 h-3 text-black" />
              <span className="text-[10px] font-semibold text-black">+32%</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-black transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <ChartBarIcon className="w-4 h-4 text-black" />
              </div>
            </div>
            <p className="text-[24px] font-black text-black leading-none">{creatorStats.activeCampaigns}</p>
            <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase">Active Now</p>
            <p className="text-[10px] text-gray-600 font-medium mt-1">{creatorStats.completedCampaigns} completed</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-black transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <EyeIcon className="w-4 h-4 text-black" />
              </div>
            </div>
            <p className="text-[24px] font-black text-black leading-none">{(creatorStats.totalViews / 1000000).toFixed(1)}M</p>
            <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase">Total Views</p>
            <div className="flex items-center space-x-1 mt-1">
              <ArrowUpIcon className="w-3 h-3 text-black" />
              <span className="text-[10px] font-semibold text-black">+15%</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-black transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <UserIcon className="w-4 h-4 text-black" />
              </div>
            </div>
            <p className="text-[24px] font-black text-black leading-none">{(creatorStats.totalFollowers / 1000).toFixed(0)}K</p>
            <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase">Followers</p>
            <p className="text-[10px] text-gray-600 font-medium mt-1">{creatorStats.avgEngagement}% engagement</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-black transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-4 h-4 text-black" />
              </div>
            </div>
            <p className="text-[24px] font-black text-black leading-none">{creatorStats.completionRate}%</p>
            <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase">Completion</p>
            <p className="text-[10px] text-gray-600 font-medium mt-1">Perfect record</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-black transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <StarIcon className="w-4 h-4 text-black" />
              </div>
            </div>
            <p className="text-[24px] font-black text-black leading-none">{creatorStats.averageRating}</p>
            <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase">Avg Rating</p>
            <p className="text-[10px] text-gray-600 font-medium mt-1">12 reviews</p>
          </div>
        </motion.div>

        {/* Action Containers - Secondary Quick Actions */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-gradient-to-br from-black to-gray-800 rounded-lg p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-[16px] font-bold mb-2">Create Proposal</h4>
                <p className="text-[12px] text-gray-300">Send custom proposals to brands</p>
              </div>
              <PlusIcon className="w-5 h-5" />
            </div>
            <motion.button
              className="w-full bg-white text-black py-2.5 rounded-lg font-semibold text-[13px] hover:bg-gray-100 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              New Proposal
            </motion.button>
          </div>

          <div className="bg-white border-2 border-black rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-[16px] font-bold text-black mb-2">Boost Profile</h4>
                <p className="text-[12px] text-gray-600">Get discovered by top brands</p>
              </div>
              <SparklesIcon className="w-5 h-5 text-black" />
            </div>
            <motion.button
              className="w-full bg-black text-white py-2.5 rounded-lg font-semibold text-[13px] hover:bg-gray-900 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Upgrade Now
            </motion.button>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-[16px] font-bold text-black mb-2">Referral Program</h4>
                <p className="text-[12px] text-gray-600">Earn ₹1,000 per referral</p>
              </div>
              <GiftIcon className="w-5 h-5 text-gray-400" />
            </div>
            <motion.button
              className="w-full bg-gray-100 text-black py-2.5 rounded-lg font-semibold text-[13px] hover:bg-gray-200 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Invite Friends
            </motion.button>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Charts and Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Charts Section */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Earnings Chart */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[18px] font-bold text-black">Monthly Earnings</h3>
                  <span className="text-[11px] font-semibold text-gray-600 uppercase">Last 6 Months</span>
                </div>
                <div className="flex items-end justify-between h-[180px] space-x-2">
                  {monthlyEarnings.length > 0 ? (
                      monthlyEarnings.map((data: any, index: number) => (
                        <div key={index} className="flex-1 flex flex-col items-center justify-end space-y-2">
                          <motion.div
                            className="w-full bg-black rounded-t"
                            initial={{ height: 0 }}
                            animate={{ height: `${(data.amount / maxEarning) * 100}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                          />
                          <span className="text-[10px] font-medium text-gray-600">{data.month}</span>
                        </div>
                      ))
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        No earnings data available yet
                    </div>
                  )}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-gray-600">Average</span>
                    <span className="text-[14px] font-bold text-black">
                        {monthlyEarnings.length > 0 
                            ? `₹${Math.round(monthlyEarnings.reduce((a: number, b: any) => a + (b.amount || 0), 0) / monthlyEarnings.length).toLocaleString()}`
                            : '₹0'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Performance Chart */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[18px] font-bold text-black">Performance</h3>
                  <span className="text-[11px] font-semibold text-gray-600 uppercase">This Month</span>
                </div>
                <div className="space-y-4">
                  {campaignPerformance.length > 0 ? (
                      campaignPerformance.map((metric: any, index: number) => (
                        <div key={index}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[13px] font-medium text-gray-700">{metric.name}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-[11px] font-semibold text-black">{metric.change}</span>
                              <span className="text-[13px] font-bold text-black">{metric.value}%</span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <motion.div
                              className="bg-black h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${metric.value}%` }}
                              transition={{ duration: 0.8, delay: index * 0.1 }}
                            />
                          </div>
                        </div>
                      ))
                  ) : (
                      <div className="py-8 text-center text-gray-500 text-xs">No performance data</div>
                  )}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-gray-600">Overall Score</span>
                    <span className="text-[14px] font-bold text-black">
                        {campaignPerformance.length > 0 
                            ? Math.round(campaignPerformance.reduce((a: number, b: any) => a + (b.value || 0), 0) / campaignPerformance.length)
                            : 0}%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Platform Stats */}
            <motion.div
              className="bg-white border border-gray-200 rounded-lg p-6"
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-[18px] font-bold text-black mb-6">Platform Performance</h3>
              <div className="space-y-4">
                {platformStats.length > 0 ? (
                    platformStats.map((platform: any, index: number) => (
                      <div key={index} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0">
                        <div className="flex-1">
                          <p className="text-[14px] font-bold text-black mb-1">{platform.platform}</p>
                          <div className="flex items-center space-x-4 text-[11px] text-gray-600">
                            <span>{(platform.followers / 1000).toFixed(0)}K followers</span>
                            <span>•</span>
                            <span>{platform.engagement}% engagement</span>
                            <span>•</span>
                            <span>{platform.posts} posts</span>
                          </div>
                        </div>
                        <div className="w-20 bg-gray-100 rounded-full h-2">
                          <motion.div
                            className="bg-black h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(platform.engagement / 15) * 100}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                          />
                        </div>
                      </div>
                    ))
                ) : (
                    <div className="py-6 text-center text-gray-500 text-xs">Connect platforms to see stats</div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Activity and Deadlines */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <motion.div
              className="bg-white border border-gray-200 rounded-lg p-6"
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[18px] font-bold text-black">Recent Activity</h3>
                <BellIcon className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-4">
                {recentActivity.length > 0 ? (
                    recentActivity.map((activity: any, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          {activity.type === 'completed' && <CheckCircleIcon className="w-4 h-4 text-black" />}
                          {activity.type === 'payment' && <CurrencyDollarIcon className="w-4 h-4 text-black" />}
                          {activity.type === 'new' && <SparklesIcon className="w-4 h-4 text-black" />}
                          {activity.type === 'milestone' && <TrophyIcon className="w-4 h-4 text-black" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-[13px] font-medium text-gray-900">{activity.text}</p>
                          <p className="text-[11px] text-gray-500 mt-1">{activity.time}</p>
                        </div>
                        {activity.amount && (
                          <span className="text-[12px] font-bold text-black">+₹{activity.amount.toLocaleString()}</span>
                        )}
                      </div>
                    ))
                ) : (
                    <div className="py-6 text-center text-gray-500 text-xs">No recent activity</div>
                )}
              </div>
            </motion.div>

            {/* Upcoming Deadlines */}
            <motion.div
              className="bg-white border border-gray-200 rounded-lg p-6"
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[18px] font-bold text-black">Upcoming Deadlines</h3>
                <CalendarIcon className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-3">
                {upcomingDeadlines.length > 0 ? (
                    upcomingDeadlines.map((item: any, index: number) => (
                      <div key={index} className={`border-l-2 ${getUrgencyColor(item.urgency)} pl-4 py-2`}>
                        <p className="text-[13px] font-bold text-black">{item.campaign}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <ClockIcon className="w-3 h-3 text-gray-500" />
                          <p className="text-[11px] text-gray-600">{item.deadline} remaining</p>
                        </div>
                      </div>
                    ))
                ) : (
                    <div className="py-2 text-center text-gray-500 text-xs">No upcoming deadlines</div>
                )}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              className="bg-white border border-gray-200 rounded-lg p-6"
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[18px] font-bold text-black">Achievements</h3>
                <TrophyIcon className="w-4 h-4 text-gray-400" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {achievements.length > 0 ? (
                    achievements.map((achievement: any, index: number) => (
                      <div 
                        key={index} 
                        className={`flex flex-col items-center p-3 rounded-lg border ${achievement.earned ? 'border-black bg-gray-50' : 'border-gray-200 opacity-40'}`}
                      >
                        <achievement.icon className={`w-5 h-5 mb-2 ${achievement.earned ? 'text-black' : 'text-gray-400'}`} />
                        <span className="text-[10px] font-semibold text-center">{achievement.title}</span>
                      </div>
                    ))
                ) : (
                    <div className="col-span-3 py-4 text-center text-gray-500 text-xs">No achievements yet</div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tab Navigation */}
        <motion.div
          className="bg-white rounded-lg border border-gray-200 mb-8"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6 overflow-x-auto">
              {[
                { id: 'campaigns', label: 'Available Campaigns', icon: FireIcon, count: availableCampaigns.length },
                { id: 'mycampaigns', label: 'My Active Campaigns', icon: ChartBarIcon, count: myCampaigns.filter(c => c.status === 'active').length },
                { id: 'earnings', label: 'Completed & Earnings', icon: CheckCircleIcon, count: completedCampaigns.length },
                { id: 'analytics', label: 'Payment History', icon: DocumentCheckIcon, count: paymentHistory.length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'overview' | 'campaigns' | 'mycampaigns' | 'earnings' | 'analytics')}
                  className={`py-4 px-1 border-b-2 font-semibold text-[13px] flex items-center space-x-2 transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-[10px] font-bold">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Available Campaigns Tab */}
            {activeTab === 'campaigns' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[20px] font-bold text-black">Available Campaigns</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-[12px] text-gray-600">Sort by:</span>
                    <select className="text-[12px] font-semibold text-black border border-gray-300 rounded px-2 py-1">
                      <option>Best Match</option>
                      <option>Highest Budget</option>
                      <option>Deadline</option>
                    </select>
                  </div>
                </div>
                {availableCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className={`bg-white border rounded-lg p-5 hover:border-black transition-all duration-200 ${campaign.featured ? 'border-black' : 'border-gray-200'}`}
                  >
                    {campaign.featured && (
                      <div className="flex items-center space-x-2 mb-3">
                        <SparklesIcon className="w-4 h-4 text-black" />
                        <span className="text-[10px] font-bold text-black uppercase tracking-wider">Featured Campaign</span>
                      </div>
                    )}
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-[32px]">{campaign.brandLogo}</span>
                          <div>
                            <h4 className="text-[16px] font-bold text-black">{campaign.title}</h4>
                            <p className="text-[12px] text-gray-600">by {campaign.brand} • {campaign.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-700 uppercase">
                            {campaign.type}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${getDifficultyColor(campaign.difficulty)}`}>
                            {campaign.difficulty}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-700">
                            {campaign.match}% Match
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-3">
                          <div>
                            <p className="text-[11px] text-gray-500 font-medium uppercase">Budget</p>
                            <p className="text-[16px] font-black text-black">₹{campaign.budget.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-500 font-medium uppercase">Duration</p>
                            <p className="text-[16px] font-black text-black">{campaign.duration}</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-500 font-medium uppercase">Deadline</p>
                            <p className="text-[16px] font-black text-black">{campaign.deadline}</p>
                          </div>
                        </div>
                        <p className="text-[12px] text-gray-600">
                          <span className="font-semibold">Requirements:</span> {campaign.requirements}
                        </p>
                      </div>
                      <motion.button 
                        className="bg-black text-white px-6 py-3 rounded-lg font-semibold text-[13px] hover:bg-gray-900 transition-colors duration-200 ml-4 premium-glow-button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10 flex items-center space-x-2">
                          <PlusIcon className="w-4 h-4" />
                          <span>Apply Now</span>
                        </span>
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* My Active Campaigns Tab */}
            {activeTab === 'mycampaigns' && (
              <div className="space-y-4">
                <h3 className="text-[20px] font-bold text-black mb-4">My Active Campaigns</h3>
                {myCampaigns.filter(c => c.status === 'active' || c.status === 'pending').map((campaign) => (
                  <div
                    key={campaign.id}
                    className="bg-white border border-gray-200 rounded-lg p-5 hover:border-black transition-all duration-200"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-[32px]">{campaign.brandLogo}</span>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="text-[16px] font-bold text-black">{campaign.title}</h4>
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-700 uppercase">
                                {campaign.type}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${getStatusColor(campaign.status)} uppercase`}>
                                {campaign.status}
                              </span>
                            </div>
                            <p className="text-[12px] text-gray-600">by {campaign.brand}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-[11px] text-gray-500 font-medium uppercase">Earnings</p>
                            <p className="text-[16px] font-black text-black">₹{campaign.earnings.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-500 font-medium uppercase">Views</p>
                            <p className="text-[16px] font-black text-black">{(campaign.views / 1000).toFixed(0)}K / {(campaign.targetViews / 1000).toFixed(0)}K</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-500 font-medium uppercase">Engagement</p>
                            <p className="text-[16px] font-black text-black">{campaign.engagement}%</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-500 font-medium uppercase">Deadline</p>
                            <p className="text-[16px] font-black text-black">{campaign.deadline}</p>
                          </div>
                        </div>
                        <div className="mb-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[12px] font-semibold text-gray-700">Progress: {campaign.deliverables}</span>
                            <span className="text-[12px] font-bold text-black">{campaign.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                              className="bg-black h-2 rounded-full transition-all duration-500"
                              style={{ width: `${campaign.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2 ml-4">
                        <button className="bg-black text-white px-4 py-2 rounded-lg font-semibold text-[12px] hover:bg-gray-900 transition-colors duration-200">
                          View Details
                        </button>
                        <button className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg font-semibold text-[12px] hover:border-black transition-colors duration-200">
                          Upload Content
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Completed Campaigns & Earnings Tab */}
            {activeTab === 'earnings' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[20px] font-bold text-black">Completed Campaigns</h3>
                  <div className="text-right">
                    <p className="text-[11px] text-gray-500 uppercase">Total Earned</p>
                    <p className="text-[24px] font-black text-black">₹{creatorStats.totalEarnings.toLocaleString()}</p>
                  </div>
                </div>
                {completedCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="bg-white border border-gray-200 rounded-lg p-5 hover:border-black transition-all duration-200"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-[32px]">{campaign.brandLogo}</span>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="text-[16px] font-bold text-black">{campaign.title}</h4>
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-700 uppercase">
                                {campaign.type}
                              </span>
                            </div>
                            <p className="text-[12px] text-gray-600">by {campaign.brand} • Completed {campaign.completedDate}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 mb-3">
                          <div>
                            <p className="text-[11px] text-gray-500 font-medium uppercase">Earned</p>
                            <p className="text-[16px] font-black text-black">₹{campaign.earnings.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-500 font-medium uppercase">Views</p>
                            <p className="text-[16px] font-black text-black">{(campaign.views / 1000).toFixed(0)}K</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-500 font-medium uppercase">Engagement</p>
                            <p className="text-[16px] font-black text-black">{campaign.engagement}%</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-500 font-medium uppercase">Rating</p>
                            <div className="flex items-center space-x-1">
                              <StarIcon className="w-4 h-4 text-black fill-black" />
                              <p className="text-[16px] font-black text-black">{campaign.rating}</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                          <p className="text-[11px] text-gray-500 font-semibold uppercase mb-1">Brand Review</p>
                          <p className="text-[13px] text-gray-700 italic">&quot;{campaign.review}&quot;</p>
                        </div>
                      </div>
                      <button className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg font-semibold text-[12px] hover:border-black transition-colors duration-200 ml-4">
                        View Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Payment History Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[20px] font-bold text-black">Payment History</h3>
                  <button className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg font-semibold text-[12px] hover:border-black transition-colors duration-200">
                    Download Statement
                  </button>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-6 py-4 text-[11px] font-bold text-gray-600 uppercase">Date</th>
                        <th className="text-left px-6 py-4 text-[11px] font-bold text-gray-600 uppercase">Campaign</th>
                        <th className="text-right px-6 py-4 text-[11px] font-bold text-gray-600 uppercase">Amount</th>
                        <th className="text-center px-6 py-4 text-[11px] font-bold text-gray-600 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentHistory.map((payment, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-6 py-4 text-[13px] text-gray-700">{payment.date}</td>
                          <td className="px-6 py-4 text-[13px] font-semibold text-black">{payment.campaign}</td>
                          <td className="px-6 py-4 text-[13px] font-bold text-black text-right">₹{payment.amount.toLocaleString()}</td>
                          <td className="px-6 py-4 text-center">
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-[10px] font-semibold uppercase">
                              {payment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <p className="text-[11px] text-gray-500 font-medium uppercase mb-2">Total Payments</p>
                      <p className="text-[24px] font-black text-black">{paymentHistory.length}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-500 font-medium uppercase mb-2">Total Amount</p>
                      <p className="text-[24px] font-black text-black">₹{paymentHistory.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-500 font-medium uppercase mb-2">Average Payment</p>
                      <p className="text-[24px] font-black text-black">₹{Math.round(paymentHistory.reduce((sum, p) => sum + p.amount, 0) / paymentHistory.length).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Floating Navigation */}
      <FloatingNav userType="creator" />
    </motion.div>
  );
}

export default function CreatorDashboard() {
  return (
    <DashboardLayout userType="creator" userName="Creator Name" userEmail="creator@example.com">
      <CreatorDashboardContent />
    </DashboardLayout>
  );
}
