'use client';

import { useState, useEffect } from 'react';
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
  ArrowDownTrayIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  LightBulbIcon,
  TrophyIcon,
  FireIcon,
  ArrowUpIcon
} from '@heroicons/react/24/outline';
import FloatingNav from '../../../componets/ui/FloatingNav';
import DashboardLayout from '../../../components/layout/DashboardLayout';

function CreatorAnalyticsContent() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('earnings');
  const [isLoading, setIsLoading] = useState(true);

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

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
    rating: 4.9,
    avgCompletionTime: '2.5 days',
    topCategory: 'Technology',
    peakPerformance: 'Jan 2024'
  };

  const performanceData = [
    { month: 'Jan', earnings: 15000, views: 85000, engagement: 8.2, conversions: 120 },
    { month: 'Feb', earnings: 18000, views: 95000, engagement: 8.8, conversions: 145 },
    { month: 'Mar', earnings: 22000, views: 110000, engagement: 9.1, conversions: 168 },
    { month: 'Apr', earnings: 25000, views: 125000, engagement: 9.3, conversions: 192 },
    { month: 'May', earnings: 28000, views: 135000, engagement: 9.5, conversions: 210 },
    { month: 'Jun', earnings: 32000, views: 145000, engagement: 9.7, conversions: 235 },
    { month: 'Jul', earnings: 35000, views: 155000, engagement: 9.9, conversions: 258 }
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
      completedDate: '2024-01-15',
      roi: 240,
      conversionRate: 2.5
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
      completedDate: '2024-01-10',
      roi: 180,
      conversionRate: 2.1
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
      completedDate: '2024-01-08',
      roi: 165,
      conversionRate: 1.8
    }
  ];

  const categoryPerformance = [
    { category: 'Technology', earnings: 85000, campaigns: 5, avgEngagement: 10.2 },
    { category: 'Fashion', earnings: 45000, campaigns: 3, avgEngagement: 8.9 },
    { category: 'Beauty', earnings: 35000, campaigns: 2, avgEngagement: 9.5 },
    { category: 'Food', earnings: 20000, campaigns: 2, avgEngagement: 7.8 }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'gigs': return 'bg-gray-100 text-gray-700';
      case 'cpv': return 'bg-gray-100 text-gray-700';
      case 'onetime': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const maxEarnings = Math.max(...performanceData.map(d => d.earnings));
  const maxViews = Math.max(...performanceData.map(d => d.views));

  // Skeleton Loading Component
  const SkeletonLoader = () => (
    <div className="w-full px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto py-8 animate-pulse">
      <div className="bg-white border-b border-gray-200 -mx-8 md:-mx-16 lg:-mx-24 px-8 md:px-16 lg:px-24 mb-8">
        <div className="py-8">
          <div className="h-12 bg-gray-200 rounded w-96 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-64"></div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="h-8 w-8 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="h-40 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        ))}
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
                Analytics Dashboard
              </h1>
              <p className="text-[14px] text-gray-600 font-normal max-w-lg">
                Track your performance and earnings across all campaigns
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black text-[13px] font-medium text-black transition-all duration-200"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <motion.button
                className="bg-white border-2 border-gray-300 text-black px-4 py-2 rounded-lg text-[13px] font-bold hover:border-black transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowDownTrayIcon className="w-4 h-4 inline mr-2" />
                Export
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="w-full px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto py-8">
        {/* Key Metrics */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-black transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <CurrencyDollarIcon className="w-4 h-4 text-black" />
              </div>
              <div className="flex items-center space-x-1">
                <ArrowUpIcon className="w-3 h-3 text-black" />
                <span className="text-[10px] font-semibold text-black">+24%</span>
              </div>
            </div>
            <p className="text-[24px] font-black text-black leading-none">₹{stats.totalEarnings.toLocaleString()}</p>
            <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase">Total Earnings</p>
            <p className="text-[10px] text-gray-600 font-medium mt-1">This month: ₹{stats.thisMonthEarnings.toLocaleString()}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-black transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <EyeIcon className="w-4 h-4 text-black" />
              </div>
              <div className="flex items-center space-x-1">
                <ArrowUpIcon className="w-3 h-3 text-black" />
                <span className="text-[10px] font-semibold text-black">+18%</span>
              </div>
            </div>
            <p className="text-[24px] font-black text-black leading-none">{(stats.totalViews / 1000).toFixed(0)}K</p>
            <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase">Total Views</p>
            <p className="text-[10px] text-gray-600 font-medium mt-1">Verified: {(stats.verifiedViews / 1000).toFixed(0)}K</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-black transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <ChartBarIcon className="w-4 h-4 text-black" />
              </div>
              <div className="flex items-center space-x-1">
                <ArrowUpIcon className="w-3 h-3 text-black" />
                <span className="text-[10px] font-semibold text-black">+3.2%</span>
              </div>
            </div>
            <p className="text-[24px] font-black text-black leading-none">{stats.engagementRate}%</p>
            <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase">Engagement Rate</p>
            <p className="text-[10px] text-gray-600 font-medium mt-1">Above avg: {stats.avgEngagement}%</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-black transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <UserIcon className="w-4 h-4 text-black" />
              </div>
              <div className="flex items-center space-x-1">
                <ArrowUpIcon className="w-3 h-3 text-black" />
                <span className="text-[10px] font-semibold text-black">+{stats.followerGrowth}%</span>
              </div>
            </div>
            <p className="text-[24px] font-black text-black leading-none">{(stats.totalFollowers / 1000).toFixed(0)}K</p>
            <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase">Followers</p>
            <p className="text-[10px] text-gray-600 font-medium mt-1">Growing community</p>
          </div>
        </motion.div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Earnings Trend Chart */}
          <motion.div
            className="bg-white border border-gray-200 rounded-lg p-6"
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[18px] font-bold text-black">Earnings Trend</h3>
              <div className="flex items-center space-x-1">
                <ArrowTrendingUpIcon className="w-4 h-4 text-black" />
                <span className="text-black text-[11px] font-semibold">+24% growth</span>
              </div>
            </div>
            
            <div className="space-y-3">
              {performanceData.map((data, index) => {
                const percentage = (data.earnings / maxEarnings) * 100;
                return (
                  <motion.div
                    key={data.month}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <span className="font-medium text-gray-700 w-12 text-[13px]">{data.month}</span>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-100 rounded-full h-3 border border-gray-200 overflow-hidden">
                        <motion.div 
                          className="h-full rounded-full bg-black"
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                        />
                      </div>
                    </div>
                    <span className="font-bold text-black w-24 text-right text-[13px]">₹{data.earnings.toLocaleString()}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Views & Engagement Chart */}
          <motion.div
            className="bg-white border border-gray-200 rounded-lg p-6"
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[18px] font-bold text-black">Views & Engagement</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedMetric('views')}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    selectedMetric === 'views'
                      ? 'bg-black text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-black'
                  }`}
                >
                  Views
                </button>
                <button
                  onClick={() => setSelectedMetric('engagement')}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    selectedMetric === 'engagement'
                      ? 'bg-black text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-black'
                  }`}
                >
                  Engagement
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              {performanceData.map((data, index) => {
                const percentage = selectedMetric === 'views' 
                  ? (data.views / maxViews) * 100
                  : (data.engagement / 10) * 100;
                return (
                  <motion.div
                    key={data.month}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <span className="font-medium text-gray-700 w-12 text-[13px]">{data.month}</span>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-100 rounded-full h-3 border border-gray-200 overflow-hidden">
                        <motion.div 
                          className="h-full rounded-full bg-black"
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                        />
                      </div>
                    </div>
                    <span className="font-bold text-black w-20 text-right text-[13px]">
                      {selectedMetric === 'views' 
                        ? `${(data.views / 1000).toFixed(0)}K`
                        : `${data.engagement}%`
                      }
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Campaign Performance Metrics */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[11px] font-medium text-gray-500 uppercase">Completed Campaigns</p>
                <p className="text-[32px] font-black text-black mt-1">{stats.completedCampaigns}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-black" />
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-black h-2 rounded-full" 
                style={{ width: `${(stats.completedCampaigns / (stats.completedCampaigns + stats.activeCampaigns)) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[11px] font-medium text-gray-500 uppercase">Average Rating</p>
                <p className="text-[32px] font-black text-black mt-1">{stats.rating}/5.0</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <StarIcon className="w-6 h-6 text-black" />
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-black h-2 rounded-full" 
                style={{ width: `${(stats.rating / 5) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[11px] font-medium text-gray-500 uppercase">Authenticity Score</p>
                <p className="text-[32px] font-black text-black mt-1">{stats.authenticityScore}%</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-black" />
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-black h-2 rounded-full" 
                style={{ width: `${stats.authenticityScore}%` }}
              />
            </div>
          </div>
        </motion.div>

        {/* Category Performance */}
        <motion.div
          className="bg-white border border-gray-200 rounded-lg p-6 mb-8"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[18px] font-bold text-black">Category Performance</h3>
            <button className="text-[13px] font-semibold text-gray-600 hover:text-black transition-colors duration-200">
              View Details
            </button>
          </div>
          
          <div className="space-y-4">
            {categoryPerformance.map((category, index) => {
              const maxEarnings = Math.max(...categoryPerformance.map(c => c.earnings));
              const percentage = (category.earnings / maxEarnings) * 100;
              
              return (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-4 hover:border-black transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-[16px] font-black text-black mb-1">{category.category}</h4>
                      <p className="text-[12px] text-gray-600">{category.campaigns} campaigns</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[20px] font-black text-black">₹{category.earnings.toLocaleString()}</p>
                      <p className="text-[11px] text-gray-600">Avg: {category.avgEngagement}% engagement</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-black h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Campaigns Performance */}
        <motion.div
          className="bg-white border border-gray-200 rounded-lg p-6 mb-8"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[18px] font-bold text-black">Recent Campaign Performance</h3>
            <button className="text-[13px] font-semibold text-gray-600 hover:text-black transition-colors duration-200">
              View All Campaigns
            </button>
          </div>
          
          <div className="space-y-4">
            {recentCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg p-5 hover:border-black transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-[16px] font-black text-black mb-1">{campaign.title}</h4>
                    <p className="text-[13px] text-gray-600">by {campaign.brand}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-semibold ${getTypeColor(campaign.type)} uppercase`}>
                    {campaign.type}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-[11px] text-gray-500 font-medium mb-1 uppercase">Earnings</p>
                    <p className="text-[18px] font-black text-black">₹{campaign.earnings.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 font-medium mb-1 uppercase">Views</p>
                    <p className="text-[18px] font-black text-black">{(campaign.views / 1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 font-medium mb-1 uppercase">Engagement</p>
                    <p className="text-[18px] font-black text-black">{campaign.engagement}%</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 font-medium mb-1 uppercase">ROI</p>
                    <p className="text-[18px] font-black text-black">{campaign.roi}%</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Insights & Recommendations */}
        <motion.div
          className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
              <LightBulbIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[20px] font-black text-black">AI Performance Insights</h4>
                <span className="px-3 py-1 rounded-full bg-black text-white text-[10px] font-bold uppercase flex items-center gap-1">
                  <FireIcon className="w-3 h-3" />
                  HOT
                </span>
              </div>
              <div className="space-y-3">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-[14px] text-gray-700 font-medium">
                    <TrophyIcon className="w-4 h-4 inline mr-2 text-black" />
                    Your engagement rate increased by <span className="font-black text-black">3.2%</span> this month - keep up the great content!
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-[14px] text-gray-700 font-medium">
                    <ChartBarIcon className="w-4 h-4 inline mr-2 text-black" />
                    CPV campaigns are performing <span className="font-black text-black">40% better</span> than fixed-pay campaigns. Consider focusing more on performance-based campaigns.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-[14px] text-gray-700 font-medium">
                    <ArrowTrendingUpIcon className="w-4 h-4 inline mr-2 text-black" />
                    <span className="font-black text-black">Technology</span> category shows highest ROI. Explore more campaigns in this niche.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Navigation */}
      <FloatingNav userType="creator" />
    </motion.div>
  );
}

export default function CreatorAnalytics() {
  return (
    <DashboardLayout userType="creator" userName="Creator Name" userEmail="creator@example.com">
      <CreatorAnalyticsContent />
    </DashboardLayout>
  );
}
