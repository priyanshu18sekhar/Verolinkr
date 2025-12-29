'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CurrencyDollarIcon, 
  ChartBarIcon, 
  ClockIcon,
  CheckCircleIcon,
  UserIcon,
  EyeIcon,
  PlusIcon,
  ShieldCheckIcon,
  BoltIcon,
  GiftIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
  DocumentCheckIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  StarIcon,
  FireIcon,
  SparklesIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  BellIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import FloatingNav from '../../componets/ui/FloatingNav';
import DashboardLayout from '../../components/layout/DashboardLayout';

function BrandDashboardContent() {
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'create'>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedCampaigns, setSelectedCampaigns] = useState<number[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');

  // Simple loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Mock data for brand dashboard
  const brandStats = {
    totalSpent: 125000,
    activeCampaigns: 8,
    completedCampaigns: 24,
    totalReach: 2400000,
    avgROI: 340,
    verifiedViews: 156000,
    kycStatus: 'verified'
  };

  const campaignTypes = [
    {
      id: 'gigs',
      title: 'Gigs Marketplace',
      subtitle: 'Fixed Payout',
      description: 'Purchase pre-defined creator services at fixed prices. Perfect for specific content needs.',
      icon: GiftIcon,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      stats: '₹5,000 - ₹50,000',
      features: ['Fixed pricing', 'Quick delivery', 'Low risk', 'Quality guaranteed']
    },
    {
      id: 'cpv',
      title: 'CPV Campaigns',
      subtitle: 'Performance-Based',
      description: 'Pay only for verified views. Our AI ensures authentic engagement and measurable ROI.',
      icon: ArrowTrendingUpIcon,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      stats: '₹0.05 - ₹0.50 per view',
      features: ['Verified views only', 'AI-powered tracking', 'Guaranteed ROI', 'Escrow protection']
    },
    {
      id: 'onetime',
      title: 'One-Time Campaigns',
      subtitle: 'Product Launch',
      description: 'Launch physical products with creators. We handle product costs and creator fees.',
      icon: BanknotesIcon,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      stats: '₹10,000 - ₹1,00,000',
      features: ['Product included', 'Creator fees covered', 'No shipping hassle', 'Scalable campaigns']
    }
  ];

  const recentCampaigns = [
    {
      id: 1,
      title: 'Skincare Product Launch',
      type: 'onetime',
      status: 'active',
      budget: 50000,
      spent: 32000,
      views: 640000,
      engagement: 8.5,
      roi: 285,
      creators: 15,
      deadline: '2024-01-20'
    },
    {
      id: 2,
      title: 'Tech Review Campaign',
      type: 'cpv',
      status: 'completed',
      budget: 25000,
      spent: 25000,
      views: 500000,
      engagement: 12.3,
      roi: 420,
      creators: 8,
      deadline: '2024-01-15'
    },
    {
      id: 3,
      title: 'Fashion Gig Purchase',
      type: 'gigs',
      status: 'completed',
      budget: 15000,
      spent: 15000,
      views: 180000,
      engagement: 9.2,
      roi: 180,
      creators: 5,
      deadline: '2024-01-10'
    }
  ];

  // Spending trends data
  const spendingTrends = [
    { month: 'Jan', spent: 95000, budget: 100000 },
    { month: 'Feb', spent: 110000, budget: 120000 },
    { month: 'Mar', spent: 125000, budget: 130000 },
    { month: 'Apr', spent: 105000, budget: 120000 },
    { month: 'May', spent: 135000, budget: 140000 },
    { month: 'Jun', spent: 125000, budget: 130000 },
  ];

  // ROI trends data
  const roiTrends = [
    { month: 'Jan', roi: 320 },
    { month: 'Feb', roi: 340 },
    { month: 'Mar', roi: 335 },
    { month: 'Apr', roi: 350 },
    { month: 'May', roi: 345 },
    { month: 'Jun', roi: 340 },
  ];

  // Campaign performance comparison
  const campaignPerformance = [
    { name: 'CPV Campaigns', value: 420, change: '+12%', color: 'bg-purple-500' },
    { name: 'Gigs', value: 180, change: '+5%', color: 'bg-blue-500' },
    { name: 'One-Time', value: 285, change: '+18%', color: 'bg-green-500' },
  ];

  // Engagement metrics
  const engagementData = [
    { platform: 'Instagram', engagement: 9.2, views: 1200000 },
    { platform: 'YouTube', engagement: 8.5, views: 800000 },
    { platform: 'TikTok', engagement: 12.3, views: 400000 },
  ];

  const maxSpending = Math.max(...spendingTrends.map(s => Math.max(s.spent, s.budget)));
  const maxROI = Math.max(...roiTrends.map(r => r.roi));

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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'gigs': return 'bg-gray-100 text-gray-700';
      case 'cpv': return 'bg-gray-100 text-gray-700';
      case 'onetime': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
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
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-64 mb-3 animate-shimmer bg-[length:200%_100%]"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-48 animate-shimmer bg-[length:200%_100%]"></div>
            </div>
            <div className="flex gap-3">
              <div className="h-12 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-shimmer bg-[length:200%_100%]"></div>
              <div className="h-12 w-40 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-shimmer bg-[length:200%_100%]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="h-8 w-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer bg-[length:200%_100%]"></div>
            </div>
            <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-24 mb-2 animate-shimmer bg-[length:200%_100%]"></div>
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-20 mb-1 animate-shimmer bg-[length:200%_100%]"></div>
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-16 animate-shimmer bg-[length:200%_100%]"></div>
          </div>
        ))}
      </div>

      {/* Tab Navigation Skeleton */}
      <div className="bg-white border border-gray-200 rounded-lg mb-8">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex space-x-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-24 animate-shimmer bg-[length:200%_100%]"></div>
            ))}
          </div>
        </div>
        <div className="p-6">
          {/* Filters Skeleton */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="h-8 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer bg-[length:200%_100%]"></div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-8 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer bg-[length:200%_100%]"></div>
              ))}
              <div className="h-8 w-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer bg-[length:200%_100%]"></div>
            </div>
          </div>

          {/* Graphs Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="space-y-2">
                    <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-40 animate-shimmer bg-[length:200%_100%]"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-24 animate-shimmer bg-[length:200%_100%]"></div>
                  </div>
                  <div className="flex gap-2">
                    {[...Array(2)].map((_, j) => (
                      <div key={j} className="h-4 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]"></div>
                    ))}
                  </div>
                </div>
                <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer bg-[length:200%_100%]"></div>
              </div>
            ))}
          </div>

          {/* Campaign Types Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer bg-[length:200%_100%]"></div>
                  <div className="h-5 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]"></div>
                </div>
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-40 mb-2 animate-shimmer bg-[length:200%_100%]"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-full mb-2 animate-shimmer bg-[length:200%_100%]"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 mb-4 animate-shimmer bg-[length:200%_100%]"></div>
                <div className="space-y-2 mb-4">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-full animate-shimmer bg-[length:200%_100%]"></div>
                  ))}
                </div>
                <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer bg-[length:200%_100%]"></div>
              </div>
            ))}
          </div>

          {/* Campaigns List Skeleton */}
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-5">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="h-4 w-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]"></div>
                  <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-48 animate-shimmer bg-[length:200%_100%]"></div>
                  <div className="h-5 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]"></div>
                  <div className="h-5 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="space-y-1">
                      <div className="h-2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-16 animate-shimmer bg-[length:200%_100%]"></div>
                      <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-20 animate-shimmer bg-[length:200%_100%]"></div>
                    </div>
                  ))}
                </div>
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
              <h1 className="text-[48px] md:text-[56px] font-black text-black tracking-tighter leading-none mb-3">
                Brand Dashboard
              </h1>
              <p className="text-[14px] text-gray-600 font-normal max-w-lg">
                Scale your reach with authentic creators and measurable campaigns
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right border-l border-gray-200 pl-6">
                <p className="text-[11px] text-gray-500 font-medium uppercase tracking-wider mb-1">Available Budget</p>
                <p className="text-[32px] font-black text-black leading-none">₹{(brandStats.totalSpent * 2).toLocaleString()}</p>
                <p className="text-[11px] text-gray-600 font-medium mt-1">Ready to spend</p>
              </div>
              <motion.button
                className="bg-black text-white px-6 py-3 rounded-full text-[13px] font-bold hover:bg-gray-900 transition-all duration-200 premium-glow-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab('create')}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <PlusIcon className="w-4 h-4" />
                  <span>Create Campaign</span>
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="w-full px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto py-8">
        {/* Stats Overview - Enhanced */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-black transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <BanknotesIcon className="w-4 h-4 text-black" />
              </div>
            </div>
            <p className="text-[24px] font-black text-black leading-none">₹{brandStats.totalSpent.toLocaleString()}</p>
            <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase">Total Spent</p>
            <div className="flex items-center space-x-1 mt-1">
              <ArrowUpIcon className="w-3 h-3 text-black" />
              <span className="text-[10px] font-semibold text-black">+24%</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-black transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <ChartBarIcon className="w-4 h-4 text-black" />
              </div>
            </div>
            <p className="text-[24px] font-black text-black leading-none">{brandStats.activeCampaigns}</p>
            <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase">Active Now</p>
            <p className="text-[10px] text-gray-600 font-medium mt-1">{brandStats.completedCampaigns} completed</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-black transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <EyeIcon className="w-4 h-4 text-black" />
              </div>
            </div>
            <p className="text-[24px] font-black text-black leading-none">{(brandStats.totalReach / 1000000).toFixed(1)}M</p>
            <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase">Total Reach</p>
            <div className="flex items-center space-x-1 mt-1">
              <ArrowUpIcon className="w-3 h-3 text-black" />
              <span className="text-[10px] font-semibold text-black">+18%</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-black transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <UserGroupIcon className="w-4 h-4 text-black" />
              </div>
            </div>
            <p className="text-[24px] font-black text-black leading-none">{brandStats.activeCampaigns * 3}</p>
            <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase">Creators</p>
            <p className="text-[10px] text-gray-600 font-medium mt-1">Active now</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-black transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <ArrowTrendingUpIcon className="w-4 h-4 text-black" />
              </div>
            </div>
            <p className="text-[24px] font-black text-black leading-none">{brandStats.avgROI}%</p>
            <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase">Avg ROI</p>
            <p className="text-[10px] text-gray-600 font-medium mt-1">+15% improvement</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-black transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <ShieldCheckIcon className="w-4 h-4 text-black" />
              </div>
            </div>
            <p className="text-[24px] font-black text-black leading-none">{(brandStats.verifiedViews / 1000).toFixed(0)}K</p>
            <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase">Verified Views</p>
            <p className="text-[10px] text-gray-600 font-medium mt-1">AI-verified</p>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="bg-white rounded-lg border border-gray-200 mb-8 hover:border-gray-300 transition-all duration-200"
          {...fadeInUp}
          transition={{ duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: ChartBarIcon },
                { id: 'campaigns', label: 'My Campaigns', icon: DocumentCheckIcon },
                { id: 'create', label: 'Create', icon: PlusIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'overview' | 'campaigns' | 'create')}
                  className={`py-4 px-1 border-b-2 font-semibold text-[13px] flex items-center space-x-2 transition-all duration-200 ${
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

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Control Bar with Filters, Export, and Time Range */}
                <motion.div
                  className="bg-white border border-gray-200 rounded-lg p-4 flex flex-wrap items-center justify-between gap-4"
                  {...fadeInUp}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="flex items-center space-x-3 flex-wrap gap-3">
                    <div className="flex items-center space-x-2">
                      <FunnelIcon className="w-4 h-4 text-gray-600" />
                      <span className="text-[12px] font-semibold text-gray-700">Filters:</span>
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="text-[12px] font-semibold text-black border border-gray-300 rounded-lg px-3 py-1.5 hover:border-black transition-colors"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                    </select>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="text-[12px] font-semibold text-black border border-gray-300 rounded-lg px-3 py-1.5 hover:border-black transition-colors"
                    >
                      <option value="all">All Types</option>
                      <option value="cpv">CPV</option>
                      <option value="gigs">Gigs</option>
                      <option value="onetime">One-Time</option>
                    </select>
                    <select
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value as '7d' | '30d' | '90d' | '1y')}
                      className="text-[12px] font-semibold text-black border border-gray-300 rounded-lg px-3 py-1.5 hover:border-black transition-colors"
                    >
                      <option value="7d">Last 7 days</option>
                      <option value="30d">Last 30 days</option>
                      <option value="90d">Last 90 days</option>
                      <option value="1y">Last year</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    {selectedCampaigns.length > 0 && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-3 py-1.5 bg-gray-100 text-black rounded-lg text-[11px] font-semibold hover:bg-gray-200 transition-colors flex items-center space-x-1"
                      >
                        <span>{selectedCampaigns.length} selected</span>
                        <XMarkIcon className="w-3 h-3" onClick={() => setSelectedCampaigns([])} />
                      </motion.button>
                    )}
                    <motion.button
                      className="px-4 py-2 bg-white border border-gray-300 text-black rounded-lg text-[12px] font-semibold hover:border-black transition-colors flex items-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ArrowDownTrayIcon className="w-4 h-4" />
                      <span>Export</span>
                    </motion.button>
                    <motion.button
                      className="px-4 py-2 bg-white border border-gray-300 text-black rounded-lg text-[12px] font-semibold hover:border-black transition-colors flex items-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <BellIcon className="w-4 h-4" />
                      <span>Alerts</span>
                    </motion.button>
                  </div>
                </motion.div>

                {/* Graphs Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Spending Trends Graph */}
                  <motion.div
                    className="bg-white border border-gray-200 rounded-lg p-6"
                    {...fadeInUp}
                    transition={{ duration: 0.5, delay: 0.15 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-[18px] font-bold text-black">Spending Trends</h3>
                        <p className="text-[11px] text-gray-500 mt-1">Budget vs Actual</p>
                      </div>
                      <div className="flex items-center space-x-4 text-[11px]">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-black rounded"></div>
                          <span className="text-gray-600">Budget</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-gray-400 rounded"></div>
                          <span className="text-gray-600">Spent</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-end justify-between h-[200px] space-x-2 px-2">
                      {spendingTrends.map((data, index) => {
                        const budgetHeight = (data.budget / maxSpending) * 100;
                        const spentHeight = (data.spent / maxSpending) * 100;
                        return (
                          <div key={index} className="flex-1 flex flex-col items-center justify-end h-full max-w-[80px]">
                            <div className="w-full h-full flex flex-col justify-end" style={{ minHeight: '150px' }}>
                              <div className="w-full flex flex-col justify-end gap-0.5">
                                <motion.div
                                  className="w-full bg-gray-300 rounded-t"
                                  initial={{ height: 0 }}
                                  animate={{ height: `${Math.max(budgetHeight, 3)}%` }}
                                  transition={{ duration: 0.8, delay: index * 0.1 }}
                                  style={{ minHeight: '4px' }}
                                />
                                <motion.div
                                  className="w-full bg-black rounded-t"
                                  initial={{ height: 0 }}
                                  animate={{ height: `${Math.max(spentHeight, 3)}%` }}
                                  transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                                  style={{ minHeight: '4px' }}
                                />
                              </div>
                            </div>
                            <span className="text-[10px] font-medium text-gray-600 mt-2 text-center w-full">{data.month}</span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* ROI Trends Graph */}
                  <motion.div
                    className="bg-white border border-gray-200 rounded-lg p-6"
                    {...fadeInUp}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-[18px] font-bold text-black">ROI Trends</h3>
                        <p className="text-[11px] text-gray-500 mt-1">Average ROI over time</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ArrowUpIcon className="w-3 h-3 text-black" />
                        <span className="text-[10px] font-semibold text-black">+6%</span>
                      </div>
                    </div>
                    <div className="flex items-end justify-between h-[200px] space-x-2 px-2">
                      {roiTrends.map((data, index) => {
                        const roiHeight = (data.roi / maxROI) * 100;
                        return (
                          <div key={index} className="flex-1 flex flex-col items-center justify-end h-full max-w-[80px]">
                            <div className="w-full h-full flex items-end justify-center" style={{ minHeight: '150px' }}>
                              <motion.div
                                className="w-full bg-gradient-to-t from-black to-gray-700 rounded-t"
                                initial={{ height: 0 }}
                                animate={{ height: `${Math.max(roiHeight, 10)}%` }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                style={{ minHeight: '8px' }}
                              />
                            </div>
                            <div className="mt-2 text-center w-full">
                              <span className="text-[10px] font-medium text-gray-600 block">{data.month}</span>
                              <span className="text-[11px] font-bold text-black">{data.roi}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* Campaign Performance Comparison */}
                  <motion.div
                    className="bg-white border border-gray-200 rounded-lg p-6"
                    {...fadeInUp}
                    transition={{ duration: 0.5, delay: 0.25 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-[18px] font-bold text-black">Campaign Performance</h3>
                        <p className="text-[11px] text-gray-500 mt-1">Average ROI by type</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {campaignPerformance.map((campaign, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[13px] font-medium text-gray-700">{campaign.name}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-[11px] font-semibold text-black">{campaign.change}</span>
                              <span className="text-[14px] font-bold text-black">{campaign.value}%</span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-3">
                            <motion.div
                              className={`${campaign.color} h-3 rounded-full`}
                              initial={{ width: 0 }}
                              animate={{ width: `${(campaign.value / 420) * 100}%` }}
                              transition={{ duration: 0.8, delay: index * 0.1 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Engagement Metrics */}
                  <motion.div
                    className="bg-white border border-gray-200 rounded-lg p-6"
                    {...fadeInUp}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-[18px] font-bold text-black">Engagement Metrics</h3>
                        <p className="text-[11px] text-gray-500 mt-1">By platform</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {engagementData.map((platform, index) => (
                        <div key={index} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0">
                          <div className="flex-1">
                            <p className="text-[14px] font-bold text-black mb-1">{platform.platform}</p>
                            <div className="flex items-center space-x-4 text-[11px] text-gray-600">
                              <span>{platform.engagement}% engagement</span>
                              <span>•</span>
                              <span>{(platform.views / 1000).toFixed(0)}K views</span>
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
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Campaign Types */}
                <div>
                  <h3 className="text-[24px] font-bold text-black mb-6">Choose Your Campaign Type</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {campaignTypes.map((type) => (
                      <motion.div
                        key={type.id}
                        className="bg-white border border-gray-200 rounded-lg p-5 hover:border-black transition-all duration-200 cursor-pointer group"
                        whileHover={{ scale: 1.005 }}
                        whileTap={{ scale: 0.995 }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <type.icon className="w-5 h-5 text-black" />
                          </div>
                          <span className="px-2 py-1 rounded-md text-[10px] font-semibold bg-gray-100 text-gray-700 uppercase">
                            {type.subtitle}
                          </span>
                        </div>
                        
                        <h4 className="text-[18px] font-bold text-black mb-2">{type.title}</h4>
                        <p className="text-[13px] text-gray-600 mb-4 leading-relaxed">{type.description}</p>
                        
                        <div className="mb-4">
                          <p className="text-[11px] font-semibold text-gray-500 mb-1 uppercase">Price Range</p>
                          <p className="text-[16px] font-black text-black">{type.stats}</p>
                        </div>
                        
                        <div className="space-y-1.5 mb-4">
                          {type.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-1.5">
                              <CheckCircleIcon className="w-3 h-3 text-black flex-shrink-0" />
                              <span className="text-[12px] text-gray-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        <button className="w-full bg-black text-white py-2.5 rounded-lg font-semibold text-[13px] hover:bg-gray-900 transition-all duration-200">
                          Create {type.title}
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Recent Campaigns */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[24px] font-bold text-black">Recent Campaigns</h3>
                    <div className="flex items-center space-x-2">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="text-[12px] font-semibold text-black border border-gray-300 rounded-lg px-3 py-1.5 hover:border-black transition-colors"
                      >
                        <option value="date">Sort by Date</option>
                        <option value="budget">Sort by Budget</option>
                        <option value="roi">Sort by ROI</option>
                        <option value="engagement">Sort by Engagement</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {recentCampaigns.map((campaign) => (
                      <motion.div
                        key={campaign.id}
                        className="bg-white border border-gray-200 rounded-lg p-5 hover:border-black transition-all duration-200"
                        whileHover={{ scale: 1.002 }}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-3">
                              <input
                                type="checkbox"
                                checked={selectedCampaigns.includes(campaign.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedCampaigns([...selectedCampaigns, campaign.id]);
                                  } else {
                                    setSelectedCampaigns(selectedCampaigns.filter(id => id !== campaign.id));
                                  }
                                }}
                                className="w-4 h-4 border-gray-300 rounded text-black focus:ring-black"
                              />
                              <h4 className="text-[16px] font-bold text-black">{campaign.title}</h4>
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-700 uppercase">
                                {campaign.type}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${getStatusColor(campaign.status)} uppercase`}>
                                {campaign.status}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div>
                                <p className="text-[11px] text-gray-500 font-medium uppercase">Budget</p>
                                <p className="text-[16px] font-black text-black">₹{campaign.budget.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-[11px] text-gray-500 font-medium uppercase">Views</p>
                                <p className="text-[16px] font-black text-black">{(campaign.views / 1000).toFixed(0)}K</p>
                              </div>
                              <div>
                                <p className="text-[11px] text-gray-500 font-medium uppercase">ROI</p>
                                <p className="text-[16px] font-black text-black">{campaign.roi}%</p>
                              </div>
                              <div>
                                <p className="text-[11px] text-gray-500 font-medium uppercase">Creators</p>
                                <p className="text-[16px] font-black text-black">{campaign.creators}</p>
                              </div>
                            </div>
                          </div>
                          <button className="bg-black text-white px-4 py-2 rounded-lg font-semibold text-[12px] hover:bg-gray-900 transition-colors duration-200 ml-4">
                            View
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'campaigns' && (
              <div className="space-y-4">
                {/* Enhanced Controls for Campaigns Tab */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-3 flex-wrap gap-3">
                    <div className="flex items-center space-x-2">
                      <FunnelIcon className="w-4 h-4 text-gray-600" />
                      <span className="text-[12px] font-semibold text-gray-700">Filters:</span>
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="text-[12px] font-semibold text-black border border-gray-300 rounded-lg px-3 py-1.5 hover:border-black transition-colors"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                    </select>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="text-[12px] font-semibold text-black border border-gray-300 rounded-lg px-3 py-1.5 hover:border-black transition-colors"
                    >
                      <option value="all">All Types</option>
                      <option value="cpv">CPV</option>
                      <option value="gigs">Gigs</option>
                      <option value="onetime">One-Time</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    {selectedCampaigns.length > 0 && (
                      <>
                        <motion.button
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="px-3 py-1.5 bg-black text-white rounded-lg text-[11px] font-semibold hover:bg-gray-900 transition-colors"
                        >
                          Bulk Actions ({selectedCampaigns.length})
                        </motion.button>
                        <motion.button
                          className="px-3 py-1.5 bg-gray-100 text-black rounded-lg text-[11px] font-semibold hover:bg-gray-200 transition-colors"
                          onClick={() => setSelectedCampaigns([])}
                        >
                          Clear
                        </motion.button>
                      </>
                    )}
                    <motion.button
                      className="px-4 py-2 bg-white border border-gray-300 text-black rounded-lg text-[12px] font-semibold hover:border-black transition-colors flex items-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ArrowDownTrayIcon className="w-4 h-4" />
                      <span>Export</span>
                    </motion.button>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[20px] font-bold text-black">My Campaigns</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-[12px] text-gray-600">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="text-[12px] font-semibold text-black border border-gray-300 rounded-lg px-3 py-1.5 hover:border-black transition-colors"
                    >
                      <option value="date">Date</option>
                      <option value="budget">Budget</option>
                      <option value="roi">ROI</option>
                      <option value="engagement">Engagement</option>
                    </select>
                  </div>
                </div>
                {recentCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className={`bg-white border rounded-lg p-5 hover:border-black transition-all duration-200 ${
                      selectedCampaigns.includes(campaign.id) ? 'border-black bg-gray-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-3">
                          <input
                            type="checkbox"
                            checked={selectedCampaigns.includes(campaign.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCampaigns([...selectedCampaigns, campaign.id]);
                              } else {
                                setSelectedCampaigns(selectedCampaigns.filter(id => id !== campaign.id));
                              }
                            }}
                            className="w-4 h-4 border-gray-300 rounded text-black focus:ring-black"
                          />
                          <h4 className="text-[16px] font-bold text-black">{campaign.title}</h4>
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-700 uppercase">
                            {campaign.type}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${getStatusColor(campaign.status)} uppercase`}>
                            {campaign.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-[11px] text-gray-500 font-medium uppercase">Budget</p>
                            <p className="text-[16px] font-black text-black">₹{campaign.budget.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-500 font-medium uppercase">Spent</p>
                            <p className="text-[16px] font-black text-black">₹{campaign.spent.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-500 font-medium uppercase">Views</p>
                            <p className="text-[16px] font-black text-black">{(campaign.views / 1000).toFixed(0)}K</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-500 font-medium uppercase">ROI</p>
                            <p className="text-[16px] font-black text-black">{campaign.roi}%</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2 ml-4">
                        <button className="bg-black text-white px-4 py-2 rounded-lg font-semibold text-[12px] hover:bg-gray-900 transition-colors duration-200">
                          View Details
                        </button>
                        <button className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg font-semibold text-[12px] hover:border-black transition-colors duration-200">
                          Analytics
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'create' && (
              <div>
                <h3 className="text-[20px] font-bold text-black mb-6">Create New Campaign</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {campaignTypes.map((type) => (
                    <motion.div
                      key={type.id}
                      className="bg-white border border-gray-200 rounded-lg p-5 hover:border-black transition-all duration-200 cursor-pointer group"
                      whileHover={{ scale: 1.005 }}
                      whileTap={{ scale: 0.995 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <type.icon className="w-5 h-5 text-black" />
                        </div>
                        <span className="px-2 py-1 rounded-md text-[10px] font-semibold bg-gray-100 text-gray-700 uppercase">
                          {type.subtitle}
                        </span>
                      </div>
                      
                      <h4 className="text-[18px] font-bold text-black mb-2">{type.title}</h4>
                      <p className="text-[13px] text-gray-600 mb-4 leading-relaxed">{type.description}</p>
                      
                      <div className="mb-4">
                        <p className="text-[11px] font-semibold text-gray-500 mb-1 uppercase">Price Range</p>
                        <p className="text-[16px] font-black text-black">{type.stats}</p>
                      </div>
                      
                      <div className="space-y-1.5 mb-4">
                        {type.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-1.5">
                            <CheckCircleIcon className="w-3 h-3 text-black flex-shrink-0" />
                            <span className="text-[12px] text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <button className="w-full bg-black text-white py-2.5 rounded-lg font-semibold text-[13px] hover:bg-gray-900 transition-all duration-200">
                        Create {type.title}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Floating Navigation */}
      <FloatingNav userType="brand" />
    </motion.div>
  );
}

export default function BrandDashboard() {
  return (
    <DashboardLayout userType="brand" userName="Brand Name" userEmail="brand@example.com">
      <BrandDashboardContent />
    </DashboardLayout>
  );
}