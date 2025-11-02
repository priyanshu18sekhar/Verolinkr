'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  EyeIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CurrencyDollarIcon,
  UsersIcon,
  ClockIcon,
  MapPinIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlayIcon,
  PauseIcon,
  StopIcon
} from '@heroicons/react/24/outline';
import FloatingNav from '../../../componets/ui/FloatingNav';
import { AnimatedParticles } from '../../../components/onboarding';

export default function AnalyticsDashboard() {
  const [selectedCampaign, setSelectedCampaign] = useState(1);
  const [timeRange, setTimeRange] = useState('7d');

  // Mock analytics data
  const campaigns = [
    {
      id: 1,
      name: 'Skincare Product Launch',
      type: 'cpv',
      status: 'active',
      budget: 50000,
      spent: 32000,
      views: 640000,
      verifiedViews: 580000,
      engagement: 8.5,
      roi: 285,
      creators: 15,
      startDate: '2024-01-01',
      endDate: '2024-01-20'
    },
    {
      id: 2,
      name: 'Tech Review Campaign',
      type: 'cpv',
      status: 'completed',
      budget: 25000,
      spent: 25000,
      views: 500000,
      verifiedViews: 475000,
      engagement: 12.3,
      roi: 420,
      creators: 8,
      startDate: '2023-12-15',
      endDate: '2024-01-15'
    }
  ];

  const selectedCampaignData = campaigns.find(c => c.id === selectedCampaign) || campaigns[0];

  const realTimeMetrics = {
    currentViews: 125000,
    viewsToday: 18500,
    verifiedViewsToday: 17200,
    activeCreators: 12,
    avgEngagement: 9.2,
    fraudDetection: 2.3
  };

  const performanceData = {
    totalViews: selectedCampaignData.views,
    verifiedViews: selectedCampaignData.verifiedViews,
    fraudViews: selectedCampaignData.views - selectedCampaignData.verifiedViews,
    engagementRate: selectedCampaignData.engagement,
    costPerView: selectedCampaignData.spent / selectedCampaignData.verifiedViews,
    roi: selectedCampaignData.roi
  };

  const creatorPerformance = [
    { name: 'Sarah Johnson', views: 85000, verifiedViews: 82000, engagement: 12.5, status: 'active' },
    { name: 'Mike Chen', views: 120000, verifiedViews: 115000, engagement: 9.8, status: 'active' },
    { name: 'Emma Wilson', views: 95000, verifiedViews: 91000, engagement: 11.2, status: 'completed' },
    { name: 'David Kumar', views: 78000, verifiedViews: 75000, engagement: 8.9, status: 'active' },
    { name: 'Lisa Park', views: 110000, verifiedViews: 105000, engagement: 10.7, status: 'active' }
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

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Subtle background elements matching Hero */}
      <AnimatedParticles count={60} />
      
      {/* Header */}
      <motion.div
        className="bg-white border-b border-gray-100"
        {...fadeInUp}
        transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-[72px] md:text-[64px] font-black text-gray-900 tracking-tighter leading-none mb-6">
                Campaign Analytics
              </h1>
              <p className="text-2xl md:text-xl text-gray-600 font-light">
                Real-time view tracking with AI-powered verification
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
              >
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              
              <select
                value={selectedCampaign}
                onChange={(e) => setSelectedCampaign(Number(e.target.value))}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
              >
                {campaigns.map(campaign => (
                  <option key={campaign.id} value={campaign.id}>
                    {campaign.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 relative z-10">
        {/* Real-time Metrics */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div
            className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-black transition-all duration-200"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <EyeIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex items-center space-x-1">
                <PlayIcon className="w-4 h-4 text-green-600" />
                <span className="text-sm font-black text-green-600">LIVE</span>
              </div>
            </div>
            <p className="text-sm font-bold text-gray-600 mb-1">Views Today</p>
            <p className="text-4xl font-black text-gray-900">{realTimeMetrics.viewsToday.toLocaleString()}</p>
            <p className="text-sm text-green-600 font-bold">+12% from yesterday</p>
          </motion.div>

          <motion.div
            className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-black transition-all duration-200"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <ShieldCheckIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircleIcon className="w-4 h-4 text-green-600" />
                <span className="text-sm font-black text-green-600">VERIFIED</span>
              </div>
            </div>
            <p className="text-sm font-bold text-gray-600 mb-1">Verified Views</p>
            <p className="text-4xl font-black text-gray-900">{realTimeMetrics.verifiedViewsToday.toLocaleString()}</p>
            <p className="text-sm text-green-600 font-bold">93% authenticity rate</p>
          </motion.div>

          <motion.div
            className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-black transition-all duration-200"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex items-center space-x-1">
                <ArrowTrendingUpIcon className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-black text-purple-600">ACTIVE</span>
              </div>
            </div>
            <p className="text-sm font-bold text-gray-600 mb-1">Active Creators</p>
            <p className="text-4xl font-black text-gray-900">{realTimeMetrics.activeCreators}</p>
            <p className="text-sm text-purple-600 font-bold">Creating content</p>
          </motion.div>

          <motion.div
            className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-black transition-all duration-200"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <ChartBarIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex items-center space-x-1">
                <ArrowTrendingUpIcon className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-black text-orange-600">+{realTimeMetrics.avgEngagement}%</span>
              </div>
            </div>
            <p className="text-sm font-bold text-gray-600 mb-1">Avg. Engagement</p>
            <p className="text-4xl font-black text-gray-900">{realTimeMetrics.avgEngagement}%</p>
            <p className="text-sm text-orange-600 font-bold">Above industry avg</p>
          </motion.div>
        </motion.div>

        {/* Performance Overview */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          {...fadeInUp}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          {/* View Breakdown */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-black transition-all duration-200">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-black text-gray-900">View Breakdown</h3>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-600">Verified</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">Total Views</span>
                  <span className="font-bold text-gray-900">{performanceData.totalViews.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gray-400 h-3 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-green-700">Verified Views</span>
                  <span className="font-bold text-green-900">{performanceData.verifiedViews.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-500 h-3 rounded-full" 
                    style={{ width: `${(performanceData.verifiedViews / performanceData.totalViews) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-red-700">Fraudulent Views</span>
                  <span className="font-bold text-red-900">{performanceData.fraudViews.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-red-500 h-3 rounded-full" 
                    style={{ width: `${(performanceData.fraudViews / performanceData.totalViews) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center space-x-3">
                <ShieldCheckIcon className="w-5 h-5 text-green-600" />
                <p className="text-green-800 font-medium">
                  AI detected and filtered {performanceData.fraudViews.toLocaleString()} fraudulent views
                </p>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-black transition-all duration-200">
            <h3 className="text-3xl font-black text-gray-900 mb-8">Performance Metrics</h3>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-gray-600">Engagement Rate</p>
                  <p className="text-2xl font-black text-gray-900">{performanceData.engagementRate}%</p>
                </div>
                <ArrowTrendingUpIcon className="w-8 h-8 text-green-600" />
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-gray-600">Cost Per Verified View</p>
                  <p className="text-2xl font-black text-gray-900">₹{performanceData.costPerView.toFixed(2)}</p>
                </div>
                <CurrencyDollarIcon className="w-8 h-8 text-blue-600" />
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-gray-600">Return on Investment</p>
                  <p className="text-2xl font-black text-gray-900">{performanceData.roi}%</p>
                </div>
                <ArrowTrendingUpIcon className="w-8 h-8 text-purple-600" />
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-gray-600">Verification Rate</p>
                  <p className="text-2xl font-black text-gray-900">
                    {((performanceData.verifiedViews / performanceData.totalViews) * 100).toFixed(1)}%
                  </p>
                </div>
                <ShieldCheckIcon className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Creator Performance */}
        <motion.div
          className="bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-black transition-all duration-200"
          {...fadeInUp}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-black text-gray-900">Creator Performance</h3>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Real-time tracking</span>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-2 font-bold text-gray-900">Creator</th>
                  <th className="text-left py-4 px-2 font-bold text-gray-900">Total Views</th>
                  <th className="text-left py-4 px-2 font-bold text-gray-900">Verified Views</th>
                  <th className="text-left py-4 px-2 font-bold text-gray-900">Engagement</th>
                  <th className="text-left py-4 px-2 font-bold text-gray-900">Status</th>
                  <th className="text-left py-4 px-2 font-bold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {creatorPerformance.map((creator, index) => (
                  <motion.tr
                    key={creator.name}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {creator.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">{creator.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span className="font-bold text-gray-900">{creator.views.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-2">
                      <span className="font-bold text-green-600">{creator.verifiedViews.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-2">
                      <span className="font-bold text-gray-900">{creator.engagement}%</span>
                    </td>
                    <td className="py-4 px-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        creator.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {creator.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                          View Details
                        </button>
                        {creator.status === 'active' && (
                          <>
                            <button className="text-yellow-600 hover:text-yellow-800 font-medium text-sm">
                              Pause
                            </button>
                            <button className="text-red-600 hover:text-red-800 font-medium text-sm">
                              Stop
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Fraud Detection Alert */}
        <motion.div
          className="mt-8 bg-red-50 border border-red-200 rounded-2xl p-8"
          {...fadeInUp}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-200 rounded-xl flex items-center justify-center">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-700" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-red-800 mb-2">AI Fraud Detection Active</h4>
              <p className="text-red-700">
                Our AI system has detected and blocked {realTimeMetrics.fraudDetection}% of fraudulent views in real-time. 
                Only verified, authentic engagement is counted towards your campaign performance.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Navigation */}
      <FloatingNav userType="brand" />
    </div>
  );
}
