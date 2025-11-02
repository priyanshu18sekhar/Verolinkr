'use client';

import { useState } from 'react';
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
  DocumentCheckIcon
} from '@heroicons/react/24/outline';
import FloatingNav from '../../componets/ui/FloatingNav';
import { AnimatedParticles } from '../../components/onboarding';
import DashboardLayout from '../../components/layout/DashboardLayout';

function BrandDashboardContent() {
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'create'>('overview');

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
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-black text-white';
      case 'completed': return 'bg-gray-100 text-gray-700';
      case 'pending': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <>
      {/* Subtle background elements matching Hero */}
      <AnimatedParticles count={60} />
      
      {/* Header */}
      <motion.div
        className="bg-white border-b border-gray-200"
        {...fadeInUp}
        transition={{ duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        <div className="w-full px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto">
          <div className="flex justify-between items-start py-8">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-3">
                <ShieldCheckIcon className="w-4 h-4 text-black" />
                <span className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Verified Brand</span>
              </div>
              <h1 className="text-[48px] md:text-[56px] font-black text-black tracking-tighter leading-none mb-3">
                Brand Dashboard
              </h1>
              <p className="text-[14px] text-gray-600 font-normal max-w-lg">
                Scale your reach with authentic creators and measurable campaigns
              </p>
            </div>
            <motion.button
              className="bg-black text-white px-6 py-3 rounded-full text-[13px] font-bold hover:bg-gray-900 transition-all duration-200 flex items-center space-x-2 premium-glow-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('create')}
            >
              <PlusIcon className="w-4 h-4" />
              <span className="relative z-10">Create Campaign</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="w-full px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto py-8 relative z-10">
        {/* Stats Overview */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div
            className="bg-white border border-gray-200 rounded-lg p-5 hover:border-black transition-all duration-200"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <BanknotesIcon className="w-4 h-4 text-black" />
              </div>
              <span className="text-[10px] font-semibold text-gray-500 uppercase">Total Spent</span>
            </div>
            <p className="text-[28px] font-black text-black leading-none">₹{brandStats.totalSpent.toLocaleString()}</p>
            <p className="text-[11px] text-gray-600 font-medium mt-1">+24% this month</p>
          </motion.div>

          <motion.div
            className="bg-white border border-gray-200 rounded-lg p-5 hover:border-black transition-all duration-200"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <ArrowTrendingUpIcon className="w-4 h-4 text-black" />
              </div>
              <span className="text-[10px] font-semibold text-gray-500 uppercase">Avg ROI</span>
            </div>
            <p className="text-[28px] font-black text-black leading-none">{brandStats.avgROI}%</p>
            <p className="text-[11px] text-gray-600 font-medium mt-1">+15% improvement</p>
          </motion.div>

          <motion.div
            className="bg-white border border-gray-200 rounded-lg p-5 hover:border-black transition-all duration-200"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <EyeIcon className="w-4 h-4 text-black" />
              </div>
              <span className="text-[10px] font-semibold text-gray-500 uppercase">Views</span>
            </div>
            <p className="text-[28px] font-black text-black leading-none">{(brandStats.verifiedViews / 1000).toFixed(0)}K</p>
            <p className="text-[11px] text-gray-600 font-medium mt-1">AI-verified</p>
          </motion.div>

          <motion.div
            className="bg-white border border-gray-200 rounded-lg p-5 hover:border-black transition-all duration-200"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <UserGroupIcon className="w-4 h-4 text-black" />
              </div>
              <span className="text-[10px] font-semibold text-gray-500 uppercase">Creators</span>
            </div>
            <p className="text-[28px] font-black text-black leading-none">{brandStats.activeCampaigns * 3}</p>
            <p className="text-[11px] text-gray-600 font-medium mt-1">Active now</p>
          </motion.div>
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
              <div>
                <h3 className="text-5xl font-black text-gray-900 mb-12">Campaign Management</h3>
                <div className="space-y-6">
                  {recentCampaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-black transition-all duration-200">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <div className="flex items-center space-x-4 mb-4">
                            <h4 className="text-3xl font-black text-gray-900">{campaign.title}</h4>
                            <span className={`px-3 py-1 rounded-full text-sm font-bold ${getTypeColor(campaign.type)}`}>
                              {campaign.type.toUpperCase()}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(campaign.status)}`}>
                              {campaign.status.toUpperCase()}
                        </span>
                      </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                        <div>
                              <p className="text-gray-500 font-medium">Spent</p>
                              <p className="text-xl font-black text-gray-900">₹{campaign.spent.toLocaleString()}</p>
                        </div>
                        <div>
                              <p className="text-gray-500 font-medium">Engagement</p>
                              <p className="text-xl font-black text-gray-900">{campaign.engagement}%</p>
                        </div>
                        <div>
                              <p className="text-gray-500 font-medium">Deadline</p>
                              <p className="text-xl font-black text-gray-900">{campaign.deadline}</p>
                        </div>
                        <div>
                              <p className="text-gray-500 font-medium">Progress</p>
                              <p className="text-xl font-black text-gray-900">85%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-4">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors duration-200">
                          View Analytics
                        </button>
                        <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-bold hover:bg-gray-300 transition-colors duration-200">
                          Edit Campaign
                        </button>
                        {campaign.status === 'active' && (
                          <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors duration-200">
                            Pause Campaign
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'create' && (
              <div>
                <h3 className="text-5xl font-black text-gray-900 mb-12">Create New Campaign</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {campaignTypes.map((type) => (
                    <motion.div
                      key={type.id}
                      className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-gray-300 transition-all duration-300 cursor-pointer group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className={`w-16 h-16 ${type.bgColor} rounded-2xl flex items-center justify-center`}>
                          <type.icon className={`w-8 h-8 ${type.textColor}`} />
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${type.bgColor} ${type.textColor}`}>
                          {type.subtitle}
                        </span>
                      </div>
                      
                      <h4 className="text-3xl font-black text-gray-900 mb-4">{type.title}</h4>
                      <p className="text-lg text-gray-600 mb-8 leading-relaxed">{type.description}</p>
                      
                      <div className="space-y-2 mb-8">
                        {type.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircleIcon className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                </div>
                      
                      <button className={`w-full bg-gradient-to-r ${type.color} text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-200 group-hover:scale-105`}>
                        Start {type.title}
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
    </>
  );
}

export default function BrandDashboard() {
  return (
    <DashboardLayout userType="brand" userName="Brand Name" userEmail="brand@example.com">
      <BrandDashboardContent />
    </DashboardLayout>
  );
}