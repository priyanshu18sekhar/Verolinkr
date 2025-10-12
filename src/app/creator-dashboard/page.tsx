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
  ShieldCheckIcon,
  StarIcon,
  GiftIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  DocumentCheckIcon
} from '@heroicons/react/24/outline';
import FloatingNav from '../../componets/ui/FloatingNav';

export default function CreatorDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'earnings'>('overview');

  // Mock data for creator dashboard
  const creatorStats = {
    totalEarnings: 185000,
    pendingEarnings: 32000,
    activeCampaigns: 3,
    completedCampaigns: 12,
    totalFollowers: 125000,
    avgEngagement: 8.5,
    authenticityScore: 95,
    trustworthinessRating: 4.9
  };

  const availableCampaigns = [
    {
      id: 1,
      brand: 'SkincareBrand',
      title: 'Product Review Video',
      category: 'Beauty & Skincare',
      type: 'gigs',
      budget: 15000,
      duration: '1 week',
      requirements: '1 unboxing video + 1 review video',
      location: 'Anywhere, India',
      deadline: '2024-01-15',
      cpvRate: null,
      productCost: null
    },
    {
      id: 2,
      brand: 'TechGiant',
      title: 'Smartphone Launch Campaign',
      category: 'Technology',
      type: 'cpv',
      budget: 50000,
      duration: '2 weeks',
      requirements: '1 Instagram Reel showcasing features',
      location: 'Anywhere, India',
      deadline: '2024-01-20',
      cpvRate: 0.25,
      productCost: null
    },
    {
      id: 3,
      brand: 'FashionHouse',
      title: 'Winter Collection Launch',
      category: 'Fashion',
      type: 'onetime',
      budget: 25000,
      duration: '1 week',
      requirements: '3 Instagram posts with product',
      location: 'Mumbai, India',
      deadline: '2024-01-18',
      cpvRate: null,
      productCost: 5000
    }
  ];

  const myCampaigns = [
    {
      id: 1,
      brand: 'TechGiant',
      title: 'Smartphone Review Campaign',
      type: 'cpv',
      status: 'active',
      earnings: 25000,
      progress: 75,
      deadline: '2024-01-10',
      deliverables: 'Video posted, tracking views',
      views: 100000,
      cpvRate: 0.25
    },
    {
      id: 2,
      brand: 'FashionHouse',
      title: 'Winter Collection Launch',
      type: 'onetime',
      status: 'completed',
      earnings: 20000,
      progress: 100,
      deadline: '2024-01-05',
      deliverables: 'All posts delivered and approved',
      views: 85000,
      productReceived: true
    },
    {
      id: 3,
      brand: 'SkincareBrand',
      title: 'Product Review Gig',
      type: 'gigs',
      status: 'pending_approval',
      earnings: 15000,
      progress: 100,
      deadline: '2024-01-08',
      deliverables: 'Awaiting brand approval',
      views: 45000,
      fixedPayout: true
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'pending_approval': return 'bg-yellow-100 text-yellow-800';
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'gigs': return GiftIcon;
      case 'cpv': return ArrowTrendingUpIcon;
      case 'onetime': return BanknotesIcon;
      default: return DocumentCheckIcon;
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
                  <span className="text-sm font-medium text-green-600 uppercase tracking-wide">Verified Creator</span>
                </div>
                <div className="flex items-center space-x-2">
                  <StarIcon className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">{creatorStats.trustworthinessRating}/5.0</span>
                </div>
              </div>
              <h1 className="text-6xl font-black text-gray-900 tracking-tight leading-none mb-4">
                Creator Dashboard
              </h1>
              <p className="text-xl text-gray-600 font-light max-w-2xl">
                Monetize your content with verified brands and guaranteed payments
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm text-gray-500 font-medium">Available Balance</p>
                <p className="text-3xl font-black text-green-600">₹{creatorStats.pendingEarnings.toLocaleString()}</p>
              </div>
              <motion.button
                className="bg-black text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Withdraw Funds
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Stats Overview */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          {...fadeInUp}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Total Earnings</span>
            </div>
            <p className="text-3xl font-black text-gray-900">₹{creatorStats.totalEarnings.toLocaleString()}</p>
            <p className="text-sm text-green-600 font-medium">+32% this month</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <ChartBarIcon className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Active Campaigns</span>
            </div>
            <p className="text-3xl font-black text-gray-900">{creatorStats.activeCampaigns}</p>
            <p className="text-sm text-blue-600 font-medium">3 different types</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <EyeIcon className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Authenticity Score</span>
            </div>
            <p className="text-3xl font-black text-gray-900">{creatorStats.authenticityScore}%</p>
            <p className="text-sm text-purple-600 font-medium">AI-verified</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Total Followers</span>
            </div>
            <p className="text-3xl font-black text-gray-900">{(creatorStats.totalFollowers / 1000).toFixed(0)}K</p>
            <p className="text-sm text-orange-600 font-medium">Growing community</p>
          </div>
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
                { id: 'campaigns', label: 'Available Campaigns', icon: ClockIcon },
                { id: 'earnings', label: 'My Campaigns', icon: CheckCircleIcon }
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
                    <h4 className="text-2xl font-black text-gray-900 mb-6">Quick Stats</h4>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Completed Campaigns</span>
                        <span className="text-2xl font-black text-green-600">{creatorStats.completedCampaigns}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Pending Earnings</span>
                        <span className="text-2xl font-black text-blue-600">₹{creatorStats.pendingEarnings.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Success Rate</span>
                        <span className="text-2xl font-black text-purple-600">94%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
                    <h4 className="text-2xl font-black text-gray-900 mb-6">Recent Activity</h4>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 text-sm">
                        <CheckCircleIcon className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700 font-medium">Campaign "Winter Collection" completed</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <ClockIcon className="w-5 h-5 text-yellow-600" />
                        <span className="text-gray-700 font-medium">New campaign "Skincare Routine" approved</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <CurrencyDollarIcon className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700 font-medium">Payment of ₹20,000 received</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-4xl font-black text-gray-900 mb-8">My Active Campaigns</h3>
                  <div className="space-y-6">
                    {myCampaigns.filter(c => c.status === 'active').map((campaign) => {
                      const TypeIcon = getTypeIcon(campaign.type);
                      return (
                        <motion.div
                          key={campaign.id}
                          className="bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-all duration-200"
                          whileHover={{ scale: 1.01 }}
                        >
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
                                <TypeIcon className="w-6 h-6 text-gray-600" />
                              </div>
                              <div>
                                <h4 className="text-2xl font-black text-gray-900">{campaign.title}</h4>
                                <p className="text-gray-600 font-medium">by {campaign.brand}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className={`px-3 py-1 rounded-full text-sm font-bold ${getTypeColor(campaign.type)}`}>
                                {campaign.type.toUpperCase()}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(campaign.status)}`}>
                                {campaign.status.replace('_', ' ').toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                            <div>
                              <p className="text-gray-500 font-medium">Earnings</p>
                              <p className="text-xl font-black text-green-600">₹{campaign.earnings.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 font-medium">Progress</p>
                              <p className="text-xl font-black text-gray-900">{campaign.progress}%</p>
                            </div>
                            <div>
                              <p className="text-gray-500 font-medium">Views</p>
                              <p className="text-xl font-black text-gray-900">{(campaign.views / 1000).toFixed(0)}K</p>
                            </div>
                            <div>
                              <p className="text-gray-500 font-medium">Deadline</p>
                              <p className="text-xl font-black text-gray-900">{campaign.deadline}</p>
                            </div>
                          </div>
                          <p className="text-gray-600 mt-4 font-medium">{campaign.deliverables}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'campaigns' && (
              <div>
                <h3 className="text-4xl font-black text-gray-900 mb-8">Available Campaigns</h3>
                <div className="space-y-8">
                  {availableCampaigns.map((campaign) => {
                    const TypeIcon = getTypeIcon(campaign.type);
                    return (
                      <motion.div
                        key={campaign.id}
                        className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
                              <TypeIcon className="w-8 h-8 text-gray-600" />
                            </div>
                            <div>
                              <h4 className="text-3xl font-black text-gray-900">{campaign.title}</h4>
                              <p className="text-gray-600 font-medium">by {campaign.brand}</p>
                              <div className="flex items-center space-x-3 mt-2">
                                <span className="inline-block bg-gray-100 text-gray-800 text-sm font-bold px-3 py-1 rounded-full">
                                  {campaign.category}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-sm font-bold ${getTypeColor(campaign.type)}`}>
                                  {campaign.type.toUpperCase()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-3xl font-black text-green-600">₹{campaign.budget.toLocaleString()}</p>
                            <p className="text-sm text-gray-500 font-medium">Total Budget</p>
                            {campaign.cpvRate && (
                              <p className="text-lg font-bold text-purple-600">₹{campaign.cpvRate} per view</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 text-sm">
                          <div>
                            <p className="text-gray-500 font-medium">Duration</p>
                            <p className="text-lg font-bold text-gray-900">{campaign.duration}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 font-medium">Location</p>
                            <p className="text-lg font-bold text-gray-900">{campaign.location}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 font-medium">Deadline</p>
                            <p className="text-lg font-bold text-gray-900">{campaign.deadline}</p>
                          </div>
                          {campaign.productCost && (
                            <div>
                              <p className="text-gray-500 font-medium">Product Cost</p>
                              <p className="text-lg font-bold text-green-600">₹{campaign.productCost.toLocaleString()}</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="mb-6">
                          <p className="text-gray-500 font-medium mb-2">Requirements:</p>
                          <p className="text-gray-900 text-lg">{campaign.requirements}</p>
                        </div>
                        
                        <div className="flex space-x-4">
                          <button className="bg-black text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl">
                            Apply Now
                          </button>
                          <button className="bg-gray-100 text-gray-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors duration-200">
                            View Details
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'earnings' && (
              <div>
                <h3 className="text-4xl font-black text-gray-900 mb-8">My Campaigns</h3>
                <div className="space-y-6">
                  {myCampaigns.map((campaign) => {
                    const TypeIcon = getTypeIcon(campaign.type);
                    return (
                      <div key={campaign.id} className="bg-gray-50 rounded-2xl p-8">
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
                              <TypeIcon className="w-6 h-6 text-gray-600" />
                            </div>
                            <div>
                              <h4 className="text-2xl font-black text-gray-900">{campaign.title}</h4>
                              <p className="text-gray-600 font-medium">by {campaign.brand}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-bold ${getTypeColor(campaign.type)}`}>
                              {campaign.type.toUpperCase()}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(campaign.status)}`}>
                              {campaign.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm mb-6">
                          <div>
                            <p className="text-gray-500 font-medium">Earnings</p>
                            <p className="text-2xl font-black text-green-600">₹{campaign.earnings.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 font-medium">Progress</p>
                            <p className="text-2xl font-black text-gray-900">{campaign.progress}%</p>
                          </div>
                          <div>
                            <p className="text-gray-500 font-medium">Views</p>
                            <p className="text-2xl font-black text-gray-900">{(campaign.views / 1000).toFixed(0)}K</p>
                          </div>
                          <div>
                            <p className="text-gray-500 font-medium">Deadline</p>
                            <p className="text-2xl font-black text-gray-900">{campaign.deadline}</p>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <p className="text-gray-600 font-medium">{campaign.deliverables}</p>
                          {campaign.cpvRate && (
                            <p className="text-sm text-purple-600 font-medium mt-1">
                              CPV Rate: ₹{campaign.cpvRate} per verified view
                            </p>
                          )}
                          {campaign.productReceived && (
                            <p className="text-sm text-green-600 font-medium mt-1">
                              ✓ Product received and reviewed
                            </p>
                          )}
                        </div>
                        
                        <div className="flex space-x-4">
                          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors duration-200">
                            View Details
                          </button>
                          {campaign.status === 'active' && (
                            <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors duration-200">
                              Submit Work
                            </button>
                          )}
                          {campaign.status === 'pending_approval' && (
                            <button className="bg-yellow-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-yellow-700 transition-colors duration-200">
                              Track Approval
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Floating Navigation */}
      <FloatingNav userType="creator" />
    </div>
  );
}

