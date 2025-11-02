'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  StopIcon,
  ArrowDownTrayIcon,
  SparklesIcon,
  LightBulbIcon,
  FunnelIcon,
  CalendarIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import FloatingNav from '../../../componets/ui/FloatingNav';

export default function AnalyticsDashboard() {
  const [selectedCampaign, setSelectedCampaign] = useState(1);
  const [timeRange, setTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(true);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'csv' | 'excel'>('pdf');
  const [showPredictions, setShowPredictions] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const predictions = {
    nextWeekViews: 185000,
    nextWeekROI: 350,
    recommendedBudget: 75000,
    riskLevel: 'low'
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

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
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
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
            <div className="flex gap-3">
              <div className="h-12 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer bg-[length:200%_100%]"></div>
              <div className="h-12 w-40 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer bg-[length:200%_100%]"></div>
              <div className="h-12 w-36 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer bg-[length:200%_100%]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="h-8 w-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer bg-[length:200%_100%]"></div>
            </div>
            <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-24 mb-2 animate-shimmer bg-[length:200%_100%]"></div>
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-20 mb-1 animate-shimmer bg-[length:200%_100%]"></div>
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-28 animate-shimmer bg-[length:200%_100%]"></div>
          </div>
        ))}
      </div>

      {/* Performance Cards Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-40 mb-6 animate-shimmer bg-[length:200%_100%]"></div>
            <div className="space-y-6">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="space-y-2">
                  <div className="flex justify-between">
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-32 animate-shimmer bg-[length:200%_100%]"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-24 animate-shimmer bg-[length:200%_100%]"></div>
                  </div>
                  <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-shimmer bg-[length:200%_100%]"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Creator Performance Table Skeleton */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-48 animate-shimmer bg-[length:200%_100%]"></div>
          <div className="flex gap-4">
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-32 animate-shimmer bg-[length:200%_100%]"></div>
            <div className="h-3 w-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-shimmer bg-[length:200%_100%]"></div>
          </div>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-10 h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-shimmer bg-[length:200%_100%]"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-32 animate-shimmer bg-[length:200%_100%]"></div>
              </div>
              <div className="flex gap-8">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-20 animate-shimmer bg-[length:200%_100%]"></div>
                ))}
              </div>
            </div>
          ))}
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
                Campaign Analytics
              </h1>
              <p className="text-[14px] text-gray-600 font-normal max-w-lg">
                Real-time view tracking with AI-powered verification
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black font-semibold text-[12px]"
              >
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              
              <select
                value={selectedCampaign}
                onChange={(e) => setSelectedCampaign(Number(e.target.value))}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black font-semibold text-[12px]"
              >
                {campaigns.map(campaign => (
                  <option key={campaign.id} value={campaign.id}>
                    {campaign.name}
                  </option>
                ))}
              </select>

              <motion.button
                className="px-4 py-3 bg-black text-white rounded-lg font-semibold text-[12px] hover:bg-gray-900 transition-colors duration-200 flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSuccessMessage('✓ Report exported successfully');
                  setShowSuccessModal(true);
                  setTimeout(() => setShowSuccessModal(false), 3000);
                }}
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                <span>Export Report</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="w-full px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto py-8">
        {/* Real-time Metrics */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-black transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <EyeIcon className="w-4 h-4 text-black" />
              </div>
            </div>
            <p className="text-[24px] font-black text-black leading-none">{realTimeMetrics.viewsToday.toLocaleString()}</p>
            <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase">Views Today</p>
            <p className="text-[10px] text-gray-600 font-medium mt-1">+12% from yesterday</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-black transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <ShieldCheckIcon className="w-4 h-4 text-black" />
              </div>
            </div>
            <p className="text-[24px] font-black text-black leading-none">{realTimeMetrics.verifiedViewsToday.toLocaleString()}</p>
            <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase">Verified Views</p>
            <p className="text-[10px] text-gray-600 font-medium mt-1">93% authenticity</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-black transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <UsersIcon className="w-4 h-4 text-black" />
              </div>
            </div>
            <p className="text-[24px] font-black text-black leading-none">{realTimeMetrics.activeCreators}</p>
            <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase">Active Creators</p>
            <p className="text-[10px] text-gray-600 font-medium mt-1">Creating content</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-black transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <ChartBarIcon className="w-4 h-4 text-black" />
              </div>
            </div>
            <p className="text-[24px] font-black text-black leading-none">{realTimeMetrics.avgEngagement}%</p>
            <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase">Avg Engagement</p>
            <p className="text-[10px] text-gray-600 font-medium mt-1">Above industry avg</p>
          </div>
        </motion.div>

        {/* Performance Overview */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* View Breakdown */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black transition-all duration-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[18px] font-bold text-black">View Breakdown</h3>
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
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black transition-all duration-200">
            <h3 className="text-[18px] font-bold text-black mb-6">Performance Metrics</h3>
            
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
          className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black transition-all duration-200"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[18px] font-bold text-black">Creator Performance</h3>
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

        {/* Predictive Analytics */}
        {showPredictions && (
          <motion.div
            className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6"
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <SparklesIcon className="w-6 h-6 text-purple-600" />
                <h4 className="text-[18px] font-bold text-black">Predictive Analytics</h4>
              </div>
              <button onClick={() => setShowPredictions(false)}>
                <XMarkIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <p className="text-[11px] text-gray-600 font-medium uppercase mb-1">Next Week Views</p>
                <p className="text-[24px] font-black text-black">{predictions.nextWeekViews.toLocaleString()}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <ArrowTrendingUpIcon className="w-3 h-3 text-green-600" />
                  <span className="text-[10px] text-green-600 font-semibold">+12%</span>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <p className="text-[11px] text-gray-600 font-medium uppercase mb-1">Predicted ROI</p>
                <p className="text-[24px] font-black text-black">{predictions.nextWeekROI}%</p>
                <p className="text-[10px] text-gray-600 mt-1">Based on trends</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <p className="text-[11px] text-gray-600 font-medium uppercase mb-1">Recommended Budget</p>
                <p className="text-[24px] font-black text-black">₹{predictions.recommendedBudget.toLocaleString()}</p>
                <p className="text-[10px] text-gray-600 mt-1">AI suggested</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <p className="text-[11px] text-gray-600 font-medium uppercase mb-1">Risk Level</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-[14px] font-bold text-black uppercase">{predictions.riskLevel}</span>
                </div>
                <p className="text-[10px] text-gray-600 mt-1">Low risk campaign</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Fraud Detection Alert */}
        <motion.div
          className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-red-200 rounded-lg flex items-center justify-center">
              <ExclamationTriangleIcon className="w-5 h-5 text-red-700" />
            </div>
            <div>
              <h4 className="text-[16px] font-bold text-red-800 mb-2">AI Fraud Detection Active</h4>
              <p className="text-[13px] text-red-700">
                Our AI system has detected and blocked {realTimeMetrics.fraudDetection}% of fraudulent views in real-time. 
                Only verified, authentic engagement is counted towards your campaign performance.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

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
