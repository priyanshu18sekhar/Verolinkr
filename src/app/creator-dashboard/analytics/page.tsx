'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useMotionValueEvent } from 'framer-motion';
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
  FireIcon
} from '@heroicons/react/24/outline';
import FloatingNav from '../../../componets/ui/FloatingNav';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import GlassCard from '../../../components/design-system/GlassCard';
import GlassButton from '../../../components/design-system/GlassButton';
import ProgressBar from '../../../components/loading/ProgressBar';
import GlassInput from '../../../components/design-system/GlassInput';
import { EarningsOverview } from '../../../components/payments';

function CreatorAnalyticsContent() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('earnings');
  const [compareMode, setCompareMode] = useState(false);
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);

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
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'gigs': return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
      case 'cpv': return 'bg-purple-500/20 text-purple-700 border-purple-500/30';
      case 'onetime': return 'bg-green-500/20 text-green-700 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
    }
  };

  const AnimatedCounter = ({ value, delay = 0 }: { value: number; delay?: number }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const animated = useMotionValue(0);
    const spring = useSpring(animated, { stiffness: 100, damping: 20 });

    useEffect(() => {
      animated.set(value);
    }, [value, animated]);

    useMotionValueEvent(spring, 'change', (latest) => {
      setDisplayValue(Math.round(latest));
    });

    return <span>{displayValue.toLocaleString()}</span>;
  };

  const maxEarnings = Math.max(...performanceData.map(d => d.earnings));
  const maxViews = Math.max(...performanceData.map(d => d.views));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <motion.div
        className="bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-2xl border-b border-white/30"
        {...fadeInUp}
        transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-6xl font-black text-gray-900 tracking-tight leading-none mb-4">
                Analytics Dashboard
              </h1>
              <p className="text-xl text-gray-600 font-light">
                Track your performance and earnings across all campaigns
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <GlassCard variant="floating" className="p-0">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-6 py-3 bg-transparent border-none focus:ring-0 focus:outline-none font-medium text-gray-700"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>
              </GlassCard>
              <GlassButton variant="secondary" size="md" onClick={() => {}}>
                <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                Export
              </GlassButton>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Key Metrics */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
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
          <GlassCard variant="elevated" className="p-6 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 backdrop-blur-sm border-2 border-green-500/30 rounded-xl flex items-center justify-center">
                <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex items-center space-x-1">
                <ArrowTrendingUpIcon className="w-4 h-4 text-green-600" />
                <span className="text-sm font-bold text-green-600">+24%</span>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Total Earnings</p>
            <p className="text-3xl font-black text-gray-900">₹<AnimatedCounter value={stats.totalEarnings} /></p>
            <p className="text-sm text-green-600 font-medium mt-1">This month: ₹{stats.thisMonthEarnings.toLocaleString()}</p>
          </GlassCard>

          <GlassCard variant="elevated" className="p-6 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-sm border-2 border-blue-500/30 rounded-xl flex items-center justify-center">
                <EyeIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex items-center space-x-1">
                <ArrowTrendingUpIcon className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-bold text-blue-600">+18%</span>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Total Views</p>
            <p className="text-3xl font-black text-gray-900">{(stats.totalViews / 1000).toFixed(0)}K</p>
            <p className="text-sm text-blue-600 font-medium mt-1">Verified: {(stats.verifiedViews / 1000).toFixed(0)}K</p>
          </GlassCard>

          <GlassCard variant="elevated" className="p-6 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/20 backdrop-blur-sm border-2 border-purple-500/30 rounded-xl flex items-center justify-center">
                <ChartBarIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex items-center space-x-1">
                <ArrowTrendingUpIcon className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-bold text-purple-600">+3.2%</span>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Engagement Rate</p>
            <p className="text-3xl font-black text-gray-900">{stats.engagementRate}%</p>
            <p className="text-sm text-purple-600 font-medium mt-1">Above avg: {stats.avgEngagement}%</p>
          </GlassCard>

          <GlassCard variant="elevated" className="p-6 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-500/20 backdrop-blur-sm border-2 border-orange-500/30 rounded-xl flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex items-center space-x-1">
                <ArrowTrendingUpIcon className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-bold text-orange-600">+{stats.followerGrowth}%</span>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Followers</p>
            <p className="text-3xl font-black text-gray-900">{(stats.totalFollowers / 1000).toFixed(0)}K</p>
            <p className="text-sm text-orange-600 font-medium mt-1">Growing community</p>
          </GlassCard>
        </motion.div>

        {/* Earnings Overview Component */}
        <div className="mb-12">
          <EarningsOverview
            totalEarnings={stats.totalEarnings}
            pendingEarnings={stats.thisMonthEarnings}
            withdrawnEarnings={stats.totalEarnings - stats.thisMonthEarnings}
            monthlyEarnings={stats.thisMonthEarnings}
            growthPercentage={24.5}
            chartData={performanceData.map(d => ({ month: d.month, earnings: d.earnings }))}
          />
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Earnings Trend Chart */}
          <GlassCard variant="elevated" className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-gray-900">Earnings Trend</h3>
              <div className="flex items-center space-x-2">
                <ArrowTrendingUpIcon className="w-5 h-5 text-green-600" />
                <span className="text-green-600 font-bold">+24% growth</span>
              </div>
            </div>
            
            <div className="space-y-4">
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
                    <span className="font-medium text-gray-700 w-12">{data.month}</span>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-white/20 backdrop-blur-sm rounded-full h-4 border border-white/30 overflow-hidden">
                        <motion.div 
                          className="h-full rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 backdrop-blur-sm relative overflow-hidden"
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          />
                        </motion.div>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900 w-24 text-right">₹{data.earnings.toLocaleString()}</span>
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>

          {/* Views & Engagement Chart */}
          <GlassCard variant="elevated" className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-gray-900">Views & Engagement</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedMetric('views')}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    selectedMetric === 'views'
                      ? 'bg-blue-500/30 text-blue-700 border-2 border-blue-500/40'
                      : 'bg-white/10 text-gray-600 border-2 border-transparent'
                  }`}
                >
                  Views
                </button>
                <button
                  onClick={() => setSelectedMetric('engagement')}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    selectedMetric === 'engagement'
                      ? 'bg-purple-500/30 text-purple-700 border-2 border-purple-500/40'
                      : 'bg-white/10 text-gray-600 border-2 border-transparent'
                  }`}
                >
                  Engagement
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
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
                    <span className="font-medium text-gray-700 w-12">{data.month}</span>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-white/20 backdrop-blur-sm rounded-full h-4 border border-white/30 overflow-hidden">
                        <motion.div 
                          className={`h-full rounded-full backdrop-blur-sm ${
                            selectedMetric === 'views'
                              ? 'bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600'
                              : 'bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                        />
                      </div>
                    </div>
                    <span className="font-bold text-gray-900 w-20 text-right">
                      {selectedMetric === 'views' 
                        ? `${(data.views / 1000).toFixed(0)}K`
                        : `${data.engagement}%`
                      }
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>
        </div>

        {/* Campaign Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <GlassCard variant="elevated" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Campaigns</p>
                <p className="text-3xl font-black text-gray-900 mt-1">{stats.completedCampaigns}</p>
              </div>
              <div className="w-16 h-16 bg-green-500/20 border-2 border-green-500/30 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <CheckCircleIcon className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <ProgressBar progress={(stats.completedCampaigns / (stats.completedCampaigns + stats.activeCampaigns)) * 100} variant="linear" color="success" size="sm" showLabel={false} />
          </GlassCard>
          
          <GlassCard variant="elevated" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-3xl font-black text-gray-900 mt-1">{stats.rating}/5.0</p>
              </div>
              <div className="w-16 h-16 bg-yellow-500/20 border-2 border-yellow-500/30 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <StarIcon className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <ProgressBar progress={(stats.rating / 5) * 100} variant="linear" color="warning" size="sm" showLabel={false} />
          </GlassCard>
          
          <GlassCard variant="elevated" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Authenticity Score</p>
                <p className="text-3xl font-black text-gray-900 mt-1">{stats.authenticityScore}%</p>
              </div>
              <div className="w-16 h-16 bg-purple-500/20 border-2 border-purple-500/30 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <CheckCircleIcon className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <ProgressBar progress={stats.authenticityScore} variant="linear" color="primary" size="sm" showLabel={false} />
          </GlassCard>
        </div>

        {/* Category Performance */}
        <GlassCard variant="elevated" className="p-8 mb-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-gray-900">Category Performance</h3>
            <GlassButton variant="tertiary" size="sm" onClick={() => {}}>
              View Details
            </GlassButton>
          </div>
          
          <div className="space-y-6">
            {categoryPerformance.map((category, index) => {
              const maxEarnings = Math.max(...categoryPerformance.map(c => c.earnings));
              const percentage = (category.earnings / maxEarnings) * 100;
              
              return (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-black text-gray-900 mb-1">{category.category}</h4>
                      <p className="text-sm text-gray-600">{category.campaigns} campaigns</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-green-600">₹{category.earnings.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Avg: {category.avgEngagement}% engagement</p>
                    </div>
                  </div>
                  <ProgressBar progress={percentage} variant="linear" color="gradient" size="md" showLabel={true} label={`₹${category.earnings.toLocaleString()}`} />
                </motion.div>
              );
            })}
          </div>
        </GlassCard>

        {/* Recent Campaigns Performance */}
        <GlassCard variant="elevated" className="p-8 mb-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-gray-900">Recent Campaign Performance</h3>
            <GlassButton variant="tertiary" size="sm" onClick={() => {}}>
              View All Campaigns
            </GlassButton>
          </div>
          
          <div className="space-y-6">
            {recentCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <GlassCard variant="floating" className="p-6 hover:scale-[1.02] transition-transform duration-200">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h4 className="text-xl font-black text-gray-900 mb-1">{campaign.title}</h4>
                      <p className="text-gray-600">by {campaign.brand}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-xl text-sm font-bold border-2 backdrop-blur-sm ${getTypeColor(campaign.type)}`}>
                      {campaign.type.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                    <div>
                      <p className="text-sm text-gray-500 font-medium mb-1">Earnings</p>
                      <p className="text-2xl font-black text-green-600">₹{campaign.earnings.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium mb-1">Views</p>
                      <p className="text-2xl font-black text-gray-900">{(campaign.views / 1000).toFixed(0)}K</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium mb-1">Engagement</p>
                      <p className="text-2xl font-black text-gray-900">{campaign.engagement}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium mb-1">ROI</p>
                      <p className="text-2xl font-black text-purple-600">{campaign.roi}%</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <ProgressBar progress={campaign.engagement} variant="linear" color="primary" size="sm" showLabel={true} label={`Engagement: ${campaign.engagement}%`} />
                    </div>
                    <div>
                      <ProgressBar progress={campaign.conversionRate * 10} variant="linear" color="success" size="sm" showLabel={true} label={`Conversion: ${campaign.conversionRate}%`} />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* AI Insights & Recommendations */}
        <GlassCard variant="floating" className="p-8 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-2 border-blue-500/20">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-blue-500/20 border-2 border-blue-500/30 rounded-2xl flex items-center justify-center backdrop-blur-sm flex-shrink-0">
              <LightBulbIcon className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-2xl font-black text-gray-900">AI Performance Insights</h4>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-xs font-bold text-blue-700 backdrop-blur-sm">
                  <FireIcon className="w-4 h-4 inline mr-1" />
                  HOT
                </span>
              </div>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30">
                  <p className="text-gray-700 font-medium">
                    <TrophyIcon className="w-5 h-5 inline mr-2 text-yellow-600" />
                    Your engagement rate increased by <span className="font-black text-green-600">3.2%</span> this month - keep up the great content!
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30">
                  <p className="text-gray-700 font-medium">
                    <ChartBarIcon className="w-5 h-5 inline mr-2 text-purple-600" />
                    CPV campaigns are performing <span className="font-black text-purple-600">40% better</span> than fixed-pay campaigns. Consider focusing more on performance-based campaigns.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30">
                  <p className="text-gray-700 font-medium">
                    <ArrowTrendingUpIcon className="w-5 h-5 inline mr-2 text-blue-600" />
                    <span className="font-black text-blue-600">Technology</span> category shows highest ROI. Explore more campaigns in this niche.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Floating Navigation */}
      <FloatingNav userType="creator" />
    </div>
  );
}

export default function CreatorAnalytics() {
  return (
    <DashboardLayout userType="creator" userName="Creator Name" userEmail="creator@example.com">
      <CreatorAnalyticsContent />
    </DashboardLayout>
  );
}
