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
  ArrowUpIcon,
  ChartPieIcon,
  Square2StackIcon,
  HeartIcon,
  ShareIcon,
  ChatBubbleLeftRightIcon,
  PlayIcon,
  MapPinIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import FloatingNav from '../../../componets/ui/FloatingNav';
import DashboardLayout from '../../../components/layout/DashboardLayout';

function CreatorAnalyticsContent() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('earnings');
  const [isLoading, setIsLoading] = useState(true);
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const stats = {
    totalEarnings: 185000,
    earningsGrowth: 24.5,
    thisMonthEarnings: 45000,
    totalViews: 1250000,
    viewsGrowth: 18.3,
    verifiedViews: 1180000,
    engagementRate: 8.5,
    engagementGrowth: 3.2,
    avgEngagement: 9.2,
    completedCampaigns: 12,
    activeCampaigns: 3,
    totalFollowers: 125000,
    followerGrowth: 12.5,
    authenticityScore: 95,
    rating: 4.9,
    avgCompletionTime: '2.5 days',
    topCategory: 'Technology',
    peakPerformance: 'Jan 2024',
    clickThroughRate: 4.2,
    conversionRate: 2.8,
    avgDealValue: 22500
  };

  const performanceData = [
    { month: 'Jan', earnings: 15000, views: 85000, engagement: 8.2, conversions: 120, clicks: 3400 },
    { month: 'Feb', earnings: 18000, views: 95000, engagement: 8.8, conversions: 145, clicks: 3850 },
    { month: 'Mar', earnings: 22000, views: 110000, engagement: 9.1, conversions: 168, clicks: 4200 },
    { month: 'Apr', earnings: 25000, views: 125000, engagement: 9.3, conversions: 192, clicks: 4680 },
    { month: 'May', earnings: 28000, views: 135000, engagement: 9.5, conversions: 210, clicks: 5100 },
    { month: 'Jun', earnings: 32000, views: 145000, engagement: 9.7, conversions: 235, clicks: 5550 },
    { month: 'Jul', earnings: 35000, views: 155000, engagement: 9.9, conversions: 258, clicks: 5890 }
  ];

  const heatmapData = {
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    hours: ['00', '04', '08', '12', '16', '20'],
    data: [
      [15, 12, 18, 25, 35, 22],
      [18, 14, 22, 30, 42, 28],
      [16, 15, 25, 35, 45, 30],
      [20, 18, 30, 42, 50, 35],
      [22, 20, 32, 45, 48, 32],
      [25, 28, 40, 50, 42, 30],
      [20, 22, 35, 40, 35, 25]
    ]
  };

  const categoryDistribution = [
    { category: 'Technology', percentage: 45, earnings: 85000, campaigns: 5, color: 'bg-black' },
    { category: 'Fashion', percentage: 25, earnings: 45000, campaigns: 3, color: 'bg-gray-700' },
    { category: 'Beauty', percentage: 20, earnings: 35000, campaigns: 2, color: 'bg-gray-500' },
    { category: 'Food', percentage: 10, earnings: 20000, campaigns: 2, color: 'bg-gray-300' }
  ];

  const deviceBreakdown = [
    { device: 'Mobile', percentage: 62, icon: DevicePhoneMobileIcon },
    { device: 'Desktop', percentage: 28, icon: ComputerDesktopIcon },
    { device: 'Tablet', percentage: 10, icon: Square2StackIcon }
  ];

  const audienceMetrics = {
    ageGroups: [
      { age: '18-24', percentage: 35 },
      { age: '25-34', percentage: 45 },
      { age: '35-44', percentage: 15 },
      { age: '45+', percentage: 5 }
    ],
    topLocations: [
      { city: 'Mumbai', percentage: 28 },
      { city: 'Delhi', percentage: 22 },
      { city: 'Bangalore', percentage: 18 },
      { city: 'Chennai', percentage: 12 },
      { city: 'Others', percentage: 20 }
    ],
    gender: [
      { type: 'Female', percentage: 58 },
      { type: 'Male', percentage: 40 },
      { type: 'Other', percentage: 2 }
    ]
  };

  const funnelData = [
    { stage: 'Profile Views', count: 12500, percentage: 100, icon: EyeIcon },
    { stage: 'Campaign Inquiries', count: 1875, percentage: 15, icon: ChatBubbleLeftRightIcon },
    { stage: 'Proposals Sent', count: 875, percentage: 7, icon: ShareIcon },
    { stage: 'Deals Closed', count: 350, percentage: 2.8, icon: CheckCircleIcon }
  ];

  const skillPerformance = [
    { skill: 'Video Production', score: 95 },
    { skill: 'Engagement', score: 88 },
    { skill: 'Authenticity', score: 92 },
    { skill: 'Communication', score: 85 },
    { skill: 'Delivery Time', score: 90 },
    { skill: 'Quality', score: 93 }
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
      conversionRate: 2.5,
      clicks: 4200,
      shares: 850
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
      conversionRate: 2.1,
      clicks: 3100,
      shares: 620
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
      conversionRate: 1.8,
      clicks: 2450,
      shares: 480
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  const getTypeColor = (type: string) => 'bg-gray-100 text-gray-700';

  const maxValue = Math.max(...performanceData.map(d => {
    if (selectedMetric === 'earnings') return d.earnings;
    if (selectedMetric === 'views') return d.views;
    if (selectedMetric === 'engagement') return d.engagement;
    if (selectedMetric === 'conversions') return d.conversions;
    return d.clicks;
  }));

  const getIntensityColor = (value: number) => {
    const max = Math.max(...heatmapData.data.flat());
    const intensity = (value / max) * 100;
    if (intensity > 75) return 'bg-black';
    if (intensity > 50) return 'bg-gray-700';
    if (intensity > 25) return 'bg-gray-400';
    return 'bg-gray-200';
  };

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
                Comprehensive performance insights with advanced visualizations
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
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
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
                <span className="text-[10px] font-semibold text-black">+{stats.earningsGrowth}%</span>
              </div>
            </div>
            <p className="text-[24px] font-black text-black leading-none">₹{(stats.totalEarnings / 1000).toFixed(0)}K</p>
            <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase">Total Earnings</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-black transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <EyeIcon className="w-4 h-4 text-black" />
              </div>
              <div className="flex items-center space-x-1">
                <ArrowUpIcon className="w-3 h-3 text-black" />
                <span className="text-[10px] font-semibold text-black">+{stats.viewsGrowth}%</span>
              </div>
            </div>
            <p className="text-[24px] font-black text-black leading-none">{(stats.totalViews / 1000).toFixed(0)}K</p>
            <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase">Total Views</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-black transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <ChartBarIcon className="w-4 h-4 text-black" />
              </div>
              <div className="flex items-center space-x-1">
                <ArrowUpIcon className="w-3 h-3 text-black" />
                <span className="text-[10px] font-semibold text-black">+{stats.engagementGrowth}%</span>
              </div>
            </div>
            <p className="text-[24px] font-black text-black leading-none">{stats.engagementRate}%</p>
            <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase">Engagement</p>
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
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-black transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-4 h-4 text-black" />
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircleIcon className="w-3 h-3 text-black" />
              </div>
            </div>
            <p className="text-[24px] font-black text-black leading-none">{stats.authenticityScore}%</p>
            <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase">Authenticity</p>
          </div>
        </motion.div>

        {/* Performance Trend - Area Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6"
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[18px] font-bold text-black">Performance Trends</h3>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 bg-gray-50 p-1 rounded border border-gray-200">
                  <button
                    onClick={() => setChartType('area')}
                    className={`px-3 py-1 rounded text-[11px] font-bold transition-all ${
                      chartType === 'area' ? 'bg-black text-white' : 'text-gray-600 hover:bg-white'
                    }`}
                  >
                    Area
                  </button>
                  <button
                    onClick={() => setChartType('bar')}
                    className={`px-3 py-1 rounded text-[11px] font-bold transition-all ${
                      chartType === 'bar' ? 'bg-black text-white' : 'text-gray-600 hover:bg-white'
                    }`}
                  >
                    Bar
                  </button>
        </div>
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="px-3 py-1 rounded border border-gray-200 text-[11px] font-bold focus:border-black"
                >
                  <option value="earnings">Earnings</option>
                  <option value="views">Views</option>
                  <option value="engagement">Engagement</option>
                  <option value="conversions">Conversions</option>
                  <option value="clicks">Clicks</option>
                </select>
              </div>
            </div>
            
            <div className="relative h-64">
              <div className="absolute inset-0 flex items-end justify-between gap-2">
              {performanceData.map((data, index) => {
                  let value = 0;
                  if (selectedMetric === 'earnings') value = data.earnings;
                  if (selectedMetric === 'views') value = data.views;
                  if (selectedMetric === 'engagement') value = data.engagement;
                  if (selectedMetric === 'conversions') value = data.conversions;
                  if (selectedMetric === 'clicks') value = data.clicks;
                  
                  const percentage = (value / maxValue) * 100;
                  
                  return (
                    <motion.div
                      key={data.month}
                      className="flex-1 flex flex-col items-center"
                      initial={{ height: 0 }}
                      animate={{ height: '100%' }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-full flex flex-col items-center justify-end h-full pb-8">
                        {chartType === 'area' ? (
                          <div className="w-full flex flex-col items-center">
                            <motion.div
                              className="w-3 h-3 bg-black rounded-full mb-1 relative z-10"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.1 + 0.3 }}
                            />
                            <motion.div
                              className="w-full bg-gradient-to-t from-gray-900 to-gray-400 rounded-t"
                              initial={{ height: 0 }}
                              animate={{ height: `${percentage}%` }}
                              transition={{ delay: index * 0.1, duration: 0.5 }}
                            />
                          </div>
                        ) : (
                          <motion.div
                            className="w-full bg-black rounded-t hover:bg-gray-800 transition-colors"
                            initial={{ height: 0 }}
                            animate={{ height: `${percentage}%` }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                          />
                        )}
                      </div>
                      <p className="text-[11px] font-bold text-gray-600 mt-2">{data.month}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Conversion Funnel */}
          <motion.div
            className="bg-white border border-gray-200 rounded-lg p-6"
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <FunnelIcon className="w-5 h-5 text-black" />
              <h3 className="text-[18px] font-bold text-black">Conversion Funnel</h3>
            </div>
            
            <div className="space-y-3">
              {funnelData.map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <motion.div
                    key={stage.stage}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-black" />
                        <span className="text-[13px] font-bold text-black">{stage.stage}</span>
                      </div>
                      <span className="text-[13px] font-black text-black">{stage.count.toLocaleString()}</span>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-3 border border-gray-300 overflow-hidden">
                        <motion.div 
                          className="h-full bg-black rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${stage.percentage}%` }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          />
                      </div>
                      <span className="absolute right-2 top-0 text-[10px] font-bold text-white">{stage.percentage}%</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Category Distribution & Device Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Category Donut Chart */}
          <motion.div
            className="bg-white border border-gray-200 rounded-lg p-6"
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <ChartPieIcon className="w-5 h-5 text-black" />
              <h3 className="text-[18px] font-bold text-black">Category Distribution</h3>
            </div>
            
            <div className="flex items-center justify-between">
              {/* Donut Visual */}
              <div className="relative w-48 h-48">
                <svg className="transform -rotate-90 w-full h-full">
                  <circle cx="96" cy="96" r="80" fill="none" stroke="#f3f4f6" strokeWidth="32" />
                  {categoryDistribution.reduce((acc, cat, index) => {
                    const prevPercentage = categoryDistribution.slice(0, index).reduce((sum, c) => sum + c.percentage, 0);
                    const circumference = 2 * Math.PI * 80;
                    const strokeDasharray = `${(cat.percentage / 100) * circumference} ${circumference}`;
                    const strokeDashoffset = -((prevPercentage / 100) * circumference);
                    
                    acc.push(
                      <motion.circle
                        key={cat.category}
                        cx="96"
                        cy="96"
                        r="80"
                        fill="none"
                        stroke={index === 0 ? '#000' : index === 1 ? '#374151' : index === 2 ? '#6b7280' : '#d1d5db'}
                        strokeWidth="32"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        initial={{ strokeDasharray: `0 ${circumference}` }}
                        animate={{ strokeDasharray }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                      />
                    );
                    return acc;
                  }, [] as React.ReactElement[])}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <p className="text-[32px] font-black text-black">₹185K</p>
                  <p className="text-[11px] text-gray-500">Total</p>
                </div>
              </div>

              {/* Legend */}
              <div className="flex-1 ml-6 space-y-3">
                {categoryDistribution.map((cat, index) => (
                  <motion.div
                    key={cat.category}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded ${cat.color}`} />
                      <div>
                        <p className="text-[13px] font-bold text-black">{cat.category}</p>
                        <p className="text-[11px] text-gray-600">{cat.campaigns} campaigns</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[16px] font-black text-black">{cat.percentage}%</p>
                      <p className="text-[11px] text-gray-600">₹{(cat.earnings / 1000).toFixed(0)}K</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Device Breakdown */}
          <motion.div
            className="bg-white border border-gray-200 rounded-lg p-6"
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <DevicePhoneMobileIcon className="w-5 h-5 text-black" />
              <h3 className="text-[18px] font-bold text-black">Device Breakdown</h3>
            </div>
            
            <div className="space-y-6">
              {deviceBreakdown.map((device, index) => {
                const Icon = device.icon;
                return (
                  <motion.div
                    key={device.device}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                          <Icon className="w-5 h-5 text-black" />
                        </div>
                        <span className="text-[16px] font-bold text-black">{device.device}</span>
                      </div>
                      <span className="text-[24px] font-black text-black">{device.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 border border-gray-300 overflow-hidden">
                      <motion.div
                        className="h-full bg-black rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${device.percentage}%` }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Heatmap & Radar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Performance Heatmap */}
          <motion.div
            className="bg-white border border-gray-200 rounded-lg p-6"
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Square2StackIcon className="w-5 h-5 text-black" />
              <h3 className="text-[18px] font-bold text-black">Activity Heatmap</h3>
            </div>
            
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="w-16"></div>
                {heatmapData.hours.map(hour => (
                  <div key={hour} className="flex-1 text-center text-[10px] font-bold text-gray-600">
                    {hour}h
                  </div>
                ))}
              </div>
              {heatmapData.days.map((day, dayIndex) => (
                <div key={day} className="flex gap-2 items-center">
                  <div className="w-16 text-[11px] font-bold text-gray-600">{day}</div>
                  {heatmapData.data[dayIndex].map((value, hourIndex) => (
                    <motion.div
                      key={`${dayIndex}-${hourIndex}`}
                      className={`flex-1 h-10 rounded ${getIntensityColor(value)} border border-gray-300 hover:scale-110 transition-transform cursor-pointer relative group`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (dayIndex * 6 + hourIndex) * 0.01 }}
                      title={`${value} activities`}
                    >
                      <span className="hidden group-hover:block absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-[10px] font-bold whitespace-nowrap">
                        {value} activities
                      </span>
                    </motion.div>
                  ))}
                </div>
              ))}
              <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-gray-200">
                <span className="text-[10px] text-gray-600">Less</span>
                <div className="flex gap-1">
                  <div className="w-4 h-4 bg-gray-200 rounded" />
                  <div className="w-4 h-4 bg-gray-400 rounded" />
                  <div className="w-4 h-4 bg-gray-700 rounded" />
                  <div className="w-4 h-4 bg-black rounded" />
                </div>
                <span className="text-[10px] text-gray-600">More</span>
              </div>
            </div>
          </motion.div>

          {/* Skills Radar */}
          <motion.div
            className="bg-white border border-gray-200 rounded-lg p-6"
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <TrophyIcon className="w-5 h-5 text-black" />
              <h3 className="text-[18px] font-bold text-black">Skill Performance</h3>
            </div>
            
            <div className="relative">
              {/* Radar Chart (Simplified) */}
              <div className="space-y-3">
                {skillPerformance.map((skill, index) => (
                  <motion.div
                    key={skill.skill}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[13px] font-bold text-black">{skill.skill}</span>
                      <span className="text-[16px] font-black text-black">{skill.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 border border-gray-300 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-gray-800 to-black rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.score}%` }}
                        transition={{ delay: 0.4 + index * 0.05, duration: 0.5 }}
                      />
              </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Audience Demographics */}
        <motion.div
          className="bg-white border border-gray-200 rounded-lg p-6 mb-8"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <UserIcon className="w-5 h-5 text-black" />
            <h3 className="text-[18px] font-bold text-black">Audience Demographics</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Age Groups */}
            <div>
              <h4 className="text-[14px] font-bold text-black mb-4">Age Distribution</h4>
              <div className="space-y-3">
                {audienceMetrics.ageGroups.map((age, index) => (
                  <motion.div
                    key={age.age}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 + index * 0.05 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] font-bold text-black">{age.age}</span>
                      <span className="text-[14px] font-black text-black">{age.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="h-full bg-black rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${age.percentage}%` }}
                        transition={{ delay: 0.45 + index * 0.05, duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Top Locations */}
            <div>
              <h4 className="text-[14px] font-bold text-black mb-4">Top Locations</h4>
              <div className="space-y-3">
                {audienceMetrics.topLocations.map((location, index) => (
                <motion.div
                    key={location.city}
                    initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="w-3 h-3 text-black" />
                        <span className="text-[12px] font-bold text-black">{location.city}</span>
                      </div>
                      <span className="text-[14px] font-black text-black">{location.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="h-full bg-black rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${location.percentage}%` }}
                        transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Gender Distribution */}
                    <div>
              <h4 className="text-[14px] font-bold text-black mb-4">Gender Split</h4>
              <div className="space-y-3">
                {audienceMetrics.gender.map((gender, index) => (
                  <motion.div
                    key={gender.type}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 + index * 0.05 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] font-bold text-black">{gender.type}</span>
                      <span className="text-[14px] font-black text-black">{gender.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="h-full bg-black rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${gender.percentage}%` }}
                        transition={{ delay: 0.55 + index * 0.05, duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                ))}
                    </div>
                  </div>
          </div>
        </motion.div>

        {/* Recent Campaign Performance */}
        <motion.div
          className="bg-white border border-gray-200 rounded-lg p-6 mb-8"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.5 }}
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
                  
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    <div>
                    <p className="text-[11px] text-gray-500 font-medium mb-1 uppercase">Earnings</p>
                    <p className="text-[18px] font-black text-black">₹{(campaign.earnings / 1000).toFixed(0)}K</p>
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
                    <div>
                    <p className="text-[11px] text-gray-500 font-medium mb-1 uppercase">Clicks</p>
                    <p className="text-[18px] font-black text-black">{campaign.clicks}</p>
                    </div>
                    <div>
                    <p className="text-[11px] text-gray-500 font-medium mb-1 uppercase">Shares</p>
                    <p className="text-[18px] font-black text-black">{campaign.shares}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Insights */}
        <motion.div
          className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.55 }}
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
                  POWERED BY AI
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-[14px] text-gray-700 font-medium">
                    <TrophyIcon className="w-4 h-4 inline mr-2 text-black" />
                    Your engagement rate increased by <span className="font-black text-black">{stats.engagementGrowth}%</span> this month - keep up the great content!
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-[14px] text-gray-700 font-medium">
                    <ChartBarIcon className="w-4 h-4 inline mr-2 text-black" />
                    Your best performing time is <span className="font-black text-black">16:00-20:00 on Thursday</span>. Schedule posts accordingly.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-[14px] text-gray-700 font-medium">
                    <ArrowTrendingUpIcon className="w-4 h-4 inline mr-2 text-black" />
                    <span className="font-black text-black">{stats.topCategory}</span> category shows highest ROI at {categoryDistribution[0].percentage}% of total earnings.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-[14px] text-gray-700 font-medium">
                    <DevicePhoneMobileIcon className="w-4 h-4 inline mr-2 text-black" />
                    <span className="font-black text-black">62%</span> of your audience uses mobile. Optimize content for mobile viewing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

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
