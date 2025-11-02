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
  StarIcon,
  FireIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import FloatingNav from '../../componets/ui/FloatingNav';
import DashboardLayout from '../../components/layout/DashboardLayout';

function BrandDashboardContent() {
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'create'>('overview');
  const [isLoading, setIsLoading] = useState(true);

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
            <div className="h-12 w-40 bg-gray-200 rounded-full"></div>
          </div>
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

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="h-4 bg-gray-200 rounded w-32 mb-6"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
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
                  onClick={() => setActiveTab(tab.id as any)}
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
                  <h3 className="text-[24px] font-bold text-black mb-6">Recent Campaigns</h3>
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
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[20px] font-bold text-black">My Campaigns</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-[12px] text-gray-600">Sort by:</span>
                    <select className="text-[12px] font-semibold text-black border border-gray-300 rounded px-2 py-1">
                      <option>Date</option>
                      <option>Budget</option>
                      <option>ROI</option>
                    </select>
                  </div>
                </div>
                {recentCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="bg-white border border-gray-200 rounded-lg p-5 hover:border-black transition-all duration-200"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-3">
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