'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon,
  EyeIcon,
  CurrencyDollarIcon,
  UserIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ClockIcon,
  StarIcon,
  CheckCircleIcon,
  CalendarIcon,
  TrendingUpIcon,
  TrendingDownIcon
} from '@heroicons/react/24/outline';
import FloatingNav from '../../../componets/ui/FloatingNav';

export default function CreatorAnalytics() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('earnings');

  const stats = {
    totalEarnings: 185000,
    thisMonthEarnings: 45000,
    totalViews: 1250000,
    verifiedViews: 1180000,
    engagementRate: 8.5,
    avgEngagement: 9.2,
    completedCampaigns: 12,
    activeCampaigns: 3,
    totalFollowers: 125000,
    followerGrowth: 12.5,
    authenticityScore: 95,
    rating: 4.9
  };

  const performanceData = [
    { month: 'Jan', earnings: 15000, views: 85000, engagement: 8.2 },
    { month: 'Feb', earnings: 18000, views: 95000, engagement: 8.8 },
    { month: 'Mar', earnings: 22000, views: 110000, engagement: 9.1 },
    { month: 'Apr', earnings: 25000, views: 125000, engagement: 9.3 },
    { month: 'May', earnings: 28000, views: 135000, engagement: 9.5 },
    { month: 'Jun', earnings: 32000, views: 145000, engagement: 9.7 },
    { month: 'Jul', earnings: 35000, views: 155000, engagement: 9.9 }
  ];

  const recentCampaigns = [
    {
      id: 1,
      brand: 'TechGiant',
      title: 'Smartphone Review',
      type: 'cpv',
      earnings: 25000,
      views: 100000,
      engagement: 12.5,
      status: 'completed',
      completedDate: '2024-01-15'
    },
    {
      id: 2,
      brand: 'FashionHouse',
      title: 'Winter Collection',
      type: 'onetime',
      earnings: 20000,
      views: 85000,
      engagement: 9.8,
      status: 'completed',
      completedDate: '2024-01-10'
    },
    {
      id: 3,
      brand: 'SkincareBrand',
      title: 'Product Review',
      type: 'gigs',
      earnings: 15000,
      views: 65000,
      engagement: 11.2,
      status: 'completed',
      completedDate: '2024-01-08'
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-6xl font-black text-gray-900 tracking-tight leading-none mb-4">
                Analytics Dashboard
              </h1>
              <p className="text-xl text-gray-600 font-light">
                Track your performance and earnings across all campaigns
              </p>
            </div>
            
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-lg"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Key Metrics */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="initial"
          animate="animate"
        >
          <motion.div
            className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-200 rounded-xl flex items-center justify-center">
                <CurrencyDollarIcon className="w-6 h-6 text-green-700" />
              </div>
              <div className="flex items-center space-x-1">
                <ArrowTrendingUpIcon className="w-4 h-4 text-green-600" />
                <span className="text-sm font-bold text-green-600">+24%</span>
              </div>
            </div>
            <p className="text-sm font-medium text-green-700 mb-1">Total Earnings</p>
            <p className="text-3xl font-black text-green-900">₹{stats.totalEarnings.toLocaleString()}</p>
            <p className="text-sm text-green-600 font-medium">This month: ₹{stats.thisMonthEarnings.toLocaleString()}</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-200 rounded-xl flex items-center justify-center">
                <EyeIcon className="w-6 h-6 text-blue-700" />
              </div>
              <div className="flex items-center space-x-1">
                <ArrowTrendingUpIcon className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-bold text-blue-600">+18%</span>
              </div>
            </div>
            <p className="text-sm font-medium text-blue-700 mb-1">Total Views</p>
            <p className="text-3xl font-black text-blue-900">{(stats.totalViews / 1000).toFixed(0)}K</p>
            <p className="text-sm text-blue-600 font-medium">Verified: {(stats.verifiedViews / 1000).toFixed(0)}K</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-8"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-200 rounded-xl flex items-center justify-center">
                <ChartBarIcon className="w-6 h-6 text-purple-700" />
              </div>
              <div className="flex items-center space-x-1">
                <ArrowTrendingUpIcon className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-bold text-purple-600">+3.2%</span>
              </div>
            </div>
            <p className="text-sm font-medium text-purple-700 mb-1">Engagement Rate</p>
            <p className="text-3xl font-black text-purple-900">{stats.engagementRate}%</p>
            <p className="text-sm text-purple-600 font-medium">Above avg: {stats.avgEngagement}%</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-200 rounded-xl flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-orange-700" />
              </div>
              <div className="flex items-center space-x-1">
                <ArrowTrendingUpIcon className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-bold text-orange-600">+{stats.followerGrowth}%</span>
              </div>
            </div>
            <p className="text-sm font-medium text-orange-700 mb-1">Followers</p>
            <p className="text-3xl font-black text-orange-900">{(stats.totalFollowers / 1000).toFixed(0)}K</p>
            <p className="text-sm text-orange-600 font-medium">Growing community</p>
          </motion.div>
        </motion.div>

        {/* Performance Overview */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          {...fadeInUp}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          {/* Earnings Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-gray-900">Earnings Trend</h3>
              <div className="flex items-center space-x-2">
                <TrendingUpIcon className="w-5 h-5 text-green-600" />
                <span className="text-green-600 font-bold">+24% growth</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {performanceData.map((data, index) => (
                <div key={data.month} className="flex items-center justify-between">
                  <span className="font-medium text-gray-700 w-12">{data.month}</span>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"
                        style={{ width: `${(data.earnings / 35000) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="font-bold text-gray-900 w-20 text-right">₹{data.earnings.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Campaign Performance */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8">
            <h3 className="text-2xl font-black text-gray-900 mb-8">Campaign Performance</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed Campaigns</p>
                  <p className="text-2xl font-black text-gray-900">{stats.completedCampaigns}</p>
                </div>
                <CheckCircleIcon className="w-8 h-8 text-green-600" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                  <p className="text-2xl font-black text-gray-900">{stats.activeCampaigns}</p>
                </div>
                <ClockIcon className="w-8 h-8 text-blue-600" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <p className="text-2xl font-black text-gray-900">{stats.rating}/5.0</p>
                </div>
                <StarIcon className="w-8 h-8 text-yellow-600" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-gray-600">Authenticity Score</p>
                  <p className="text-2xl font-black text-gray-900">{stats.authenticityScore}%</p>
                </div>
                <CheckCircleIcon className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Campaigns Performance */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-100 p-8"
          {...fadeInUp}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-gray-900">Recent Campaign Performance</h3>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              View All Campaigns
            </button>
          </div>
          
          <div className="space-y-6">
            {recentCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                className="border border-gray-200 rounded-xl p-6 hover:bg-gray-50 transition-colors duration-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{campaign.title}</h4>
                    <p className="text-gray-600">by {campaign.brand}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getTypeColor(campaign.type)}`}>
                    {campaign.type.toUpperCase()}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Earnings</p>
                    <p className="text-xl font-black text-green-600">₹{campaign.earnings.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Views</p>
                    <p className="text-xl font-black text-gray-900">{(campaign.views / 1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Engagement</p>
                    <p className="text-xl font-black text-gray-900">{campaign.engagement}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Completed</p>
                    <p className="text-xl font-black text-gray-900">{campaign.completedDate}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Insights */}
        <motion.div
          className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-8"
          {...fadeInUp}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-200 rounded-xl flex items-center justify-center">
              <TrendingUpIcon className="w-6 h-6 text-blue-700" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-blue-800 mb-2">Performance Insights</h4>
              <p className="text-blue-700">
                Your engagement rate has increased by 3.2% this month. CPV campaigns are performing 40% better than fixed-pay campaigns. 
                Consider focusing more on performance-based campaigns for higher earnings.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Navigation */}
      <FloatingNav userType="creator" />
    </div>
  );
}
