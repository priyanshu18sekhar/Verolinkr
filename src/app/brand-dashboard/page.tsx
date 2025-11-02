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

export default function BrandDashboard() {
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
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'gigs': return 'bg-blue-100 text-blue-800';
      case 'cpv': return 'bg-purple-100 text-purple-800';
      case 'onetime': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.div
        className="bg-white border-b border-gray-100"
        {...fadeInUp}
        transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-12">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <ShieldCheckIcon className="w-6 h-6 text-green-600" />
                  <span className="text-sm font-medium text-green-600 uppercase tracking-wide">Verified Brand</span>
                </div>
              </div>
              <h1 className="text-6xl font-black text-gray-900 tracking-tight leading-none mb-4">
                Brand Dashboard
              </h1>
              <p className="text-xl text-gray-600 font-light max-w-2xl">
                Scale your reach with authentic creators and measurable campaigns
              </p>
            </div>
            <motion.button
              className="bg-black text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('create')}
            >
              <PlusIcon className="w-5 h-5" />
              <span>Create Campaign</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Stats Overview */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div
            className="bg-gray-50 rounded-2xl p-8"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <BanknotesIcon className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Total Spent</span>
            </div>
            <p className="text-3xl font-black text-gray-900">₹{brandStats.totalSpent.toLocaleString()}</p>
            <p className="text-sm text-green-600 font-medium">+24% this month</p>
          </motion.div>

          <motion.div
            className="bg-gray-50 rounded-2xl p-8"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <ArrowTrendingUpIcon className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Average ROI</span>
            </div>
            <p className="text-3xl font-black text-gray-900">{brandStats.avgROI}%</p>
            <p className="text-sm text-blue-600 font-medium">+15% improvement</p>
          </motion.div>

          <motion.div
            className="bg-gray-50 rounded-2xl p-8"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <EyeIcon className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Verified Views</span>
            </div>
            <p className="text-3xl font-black text-gray-900">{(brandStats.verifiedViews / 1000).toFixed(0)}K</p>
            <p className="text-sm text-purple-600 font-medium">AI-verified only</p>
          </motion.div>

          <motion.div
            className="bg-gray-50 rounded-2xl p-8"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <UserGroupIcon className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Active Creators</span>
            </div>
            <p className="text-3xl font-black text-gray-900">{brandStats.activeCampaigns * 3}</p>
            <p className="text-sm text-orange-600 font-medium">Working on campaigns</p>
          </motion.div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-100 mb-12"
          {...fadeInUp}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="border-b border-gray-100">
            <nav className="flex space-x-12 px-8">
              {[
                { id: 'overview', label: 'Overview', icon: ChartBarIcon },
                { id: 'campaigns', label: 'My Campaigns', icon: DocumentCheckIcon },
                { id: 'create', label: 'Create Campaign', icon: PlusIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-6 px-1 border-b-2 font-bold text-lg flex items-center space-x-3 transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-12">
                {/* Campaign Types */}
                <div>
                  <h3 className="text-4xl font-black text-gray-900 mb-8">Choose Your Campaign Type</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {campaignTypes.map((type) => (
                      <motion.div
                        key={type.id}
                        className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer group"
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
                        
                        <h4 className="text-2xl font-black text-gray-900 mb-3">{type.title}</h4>
                        <p className="text-gray-600 mb-6 leading-relaxed">{type.description}</p>
                        
                        <div className="mb-6">
                          <p className="text-sm font-medium text-gray-500 mb-2">Price Range</p>
                          <p className="text-xl font-bold text-gray-900">{type.stats}</p>
                        </div>
                        
                        <div className="space-y-2 mb-8">
                          {type.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircleIcon className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-gray-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        <button className={`w-full bg-gradient-to-r ${type.color} text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-200 group-hover:scale-105`}>
                          Create {type.title}
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Recent Campaigns */}
                <div>
                  <h3 className="text-4xl font-black text-gray-900 mb-8">Recent Campaigns</h3>
                  <div className="space-y-6">
                    {recentCampaigns.map((campaign) => (
                      <motion.div
                        key={campaign.id}
                        className="bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-all duration-200"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <div className="flex items-center space-x-4 mb-3">
                              <h4 className="text-2xl font-black text-gray-900">{campaign.title}</h4>
                              <span className={`px-3 py-1 rounded-full text-sm font-bold ${getTypeColor(campaign.type)}`}>
                                {campaign.type.toUpperCase()}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(campaign.status)}`}>
                                {campaign.status.toUpperCase()}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                              <div>
                                <p className="text-gray-500 font-medium">Budget</p>
                                <p className="text-xl font-black text-gray-900">₹{campaign.budget.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 font-medium">Views</p>
                                <p className="text-xl font-black text-gray-900">{(campaign.views / 1000).toFixed(0)}K</p>
                              </div>
                              <div>
                                <p className="text-gray-500 font-medium">ROI</p>
                                <p className="text-xl font-black text-green-600">{campaign.roi}%</p>
                              </div>
                              <div>
                                <p className="text-gray-500 font-medium">Creators</p>
                                <p className="text-xl font-black text-gray-900">{campaign.creators}</p>
                              </div>
                            </div>
                          </div>
                          <button className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors duration-200">
                            View Details
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
                <h3 className="text-4xl font-black text-gray-900 mb-8">Campaign Management</h3>
                <div className="space-y-6">
                  {recentCampaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-gray-50 rounded-2xl p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <div className="flex items-center space-x-4 mb-3">
                            <h4 className="text-2xl font-black text-gray-900">{campaign.title}</h4>
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
                <h3 className="text-4xl font-black text-gray-900 mb-8">Create New Campaign</h3>
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
                      
                      <h4 className="text-2xl font-black text-gray-900 mb-3">{type.title}</h4>
                      <p className="text-gray-600 mb-6 leading-relaxed">{type.description}</p>
                      
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
    </div>
  );
}