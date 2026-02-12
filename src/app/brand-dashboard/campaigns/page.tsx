'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  ArrowTrendingUpIcon,
  GiftIcon,
  BanknotesIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  UsersIcon,
  BriefcaseIcon,
  DocumentDuplicateIcon,
  SparklesIcon,
  ArrowDownTrayIcon,
  ChartBarIcon,
  FireIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import FloatingNav from '../../../components/ui/FloatingNav';

export default function BrandCampaigns() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCampaigns, setSelectedCampaigns] = useState<number[]>([]);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showPredictions, setShowPredictions] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

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
      endDate: '2024-01-20',
      createdAt: '2023-12-15'
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
      endDate: '2024-01-15',
      createdAt: '2023-12-10'
    },
    {
      id: 3,
      name: 'Fashion Gig Purchase',
      type: 'gigs',
      status: 'completed',
      budget: 15000,
      spent: 15000,
      views: 180000,
      verifiedViews: 175000,
      engagement: 9.2,
      roi: 180,
      creators: 5,
      startDate: '2023-12-20',
      endDate: '2024-01-10',
      createdAt: '2023-12-18'
    },
    {
      id: 4,
      name: 'Winter Collection Launch',
      type: 'onetime',
      status: 'paused',
      budget: 35000,
      spent: 12000,
      views: 280000,
      verifiedViews: 265000,
      engagement: 7.8,
      roi: 220,
      creators: 12,
      startDate: '2024-01-05',
      endDate: '2024-01-25',
      createdAt: '2023-12-28'
    }
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-black text-white';
      case 'completed': return 'bg-gray-100 text-gray-700';
      case 'paused': return 'bg-gray-100 text-gray-700';
      case 'draft': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
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
              <div className="h-12 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-shimmer bg-[length:200%_100%]"></div>
              <div className="h-12 w-40 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-shimmer bg-[length:200%_100%]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Skeleton */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer bg-[length:200%_100%]"></div>
          </div>
          <div className="flex gap-3">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-12 w-40 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer bg-[length:200%_100%]"></div>
            ))}
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
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-24 mb-2 animate-shimmer bg-[length:200%_100%]"></div>
            <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-32 animate-shimmer bg-[length:200%_100%]"></div>
          </div>
        ))}
      </div>

      {/* Campaign Cards Skeleton */}
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]"></div>
                  <div className="w-10 h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer bg-[length:200%_100%]"></div>
                  <div className="space-y-2">
                    <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-48 animate-shimmer bg-[length:200%_100%]"></div>
                    <div className="flex gap-2">
                      <div className="h-5 w-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]"></div>
                      <div className="h-5 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]"></div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="space-y-1">
                      <div className="h-2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-16 animate-shimmer bg-[length:200%_100%]"></div>
                      <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-20 animate-shimmer bg-[length:200%_100%]"></div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-24 animate-shimmer bg-[length:200%_100%]"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-32 animate-shimmer bg-[length:200%_100%]"></div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 ml-4">
                <div className="h-10 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer bg-[length:200%_100%]"></div>
                <div className="h-10 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer bg-[length:200%_100%]"></div>
              </div>
            </div>
          </div>
        ))}
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'gigs': return GiftIcon;
      case 'cpv': return ArrowTrendingUpIcon;
      case 'onetime': return BanknotesIcon;
      default: return ClockIcon;
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || campaign.type === filterType;
    return matchesSearch && matchesFilter;
  });

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
                Campaign Management
              </h1>
              <p className="text-[14px] text-gray-600 font-normal max-w-lg">
                Manage all your campaigns across different types
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <motion.button
                className="bg-white border border-gray-300 text-black px-6 py-3 rounded-full text-[13px] font-bold hover:border-black transition-all duration-200 flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowTemplates(true)}
              >
                <DocumentDuplicateIcon className="w-4 h-4" />
                <span>Templates</span>
              </motion.button>
              <motion.button
                className="bg-black text-white px-6 py-3 rounded-full text-[13px] font-bold hover:bg-gray-900 transition-all duration-200 premium-glow-button flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <PlusIcon className="w-4 h-4" />
                <span className="relative z-10">Create Campaign</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="w-full px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto py-8">
        {/* Filters and Search */}
        <motion.div
          className="bg-white border border-gray-200 rounded-lg p-6 mb-8"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-[13px]"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black font-semibold text-[12px]"
              >
                <option value="all">All Types</option>
                <option value="gigs">Gigs</option>
                <option value="cpv">CPV Campaigns</option>
                <option value="onetime">One-Time Payout</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black font-semibold text-[12px]"
              >
                <option value="date">Sort by Date</option>
                <option value="budget">Sort by Budget</option>
                <option value="roi">Sort by ROI</option>
                <option value="views">Sort by Views</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Campaign Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {[
            { label: 'Total Campaigns', value: campaigns.length, icon: BriefcaseIcon },
            { label: 'Active Campaigns', value: campaigns.filter(c => c.status === 'active').length, icon: PlayIcon },
            { label: 'Total Budget', value: `₹${campaigns.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}`, icon: BanknotesIcon },
            { label: 'Avg ROI', value: `${Math.round(campaigns.reduce((sum, c) => sum + c.roi, 0) / campaigns.length)}%`, icon: ArrowTrendingUpIcon }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:border-black transition-all duration-200"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-[10px] text-gray-500 font-medium uppercase mb-1">{stat.label}</p>
                <p className="text-[24px] font-black text-black leading-none">{stat.value}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bulk Actions Bar */}
        {selectedCampaigns.length > 0 && (
          <motion.div
            className="bg-black text-white rounded-lg p-4 mb-8 flex items-center justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center space-x-4">
              <span className="font-semibold">
                {selectedCampaigns.length} campaign{selectedCampaigns.length > 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-white text-black rounded-lg text-[12px] font-semibold hover:bg-gray-100">
                Bulk Actions
              </button>
              <button 
                onClick={() => setSelectedCampaigns([])}
                className="text-gray-300 hover:text-white"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* AI Performance Predictions */}
        {showPredictions && (
          <motion.div
            className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <SparklesIcon className="w-6 h-6 text-blue-600" />
                <h4 className="text-[18px] font-bold text-black">AI Performance Predictions</h4>
              </div>
              <button onClick={() => setShowPredictions(false)}>
                <XMarkIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="text-[11px] text-gray-600 font-medium uppercase mb-1">Top Performer</p>
                <p className="text-[18px] font-black text-black mb-2">Skincare Product Launch</p>
                <div className="flex items-center space-x-2">
                  <FireIcon className="w-4 h-4 text-orange-500" />
                  <span className="text-[12px] font-semibold text-black">+25% above average</span>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="text-[11px] text-gray-600 font-medium uppercase mb-1">Predicted Growth</p>
                <p className="text-[18px] font-black text-black mb-2">+18% this week</p>
                <div className="flex items-center space-x-2">
                  <ArrowTrendingUpIcon className="w-4 h-4 text-green-600" />
                  <span className="text-[12px] font-semibold text-black">Strong trend</span>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="text-[11px] text-gray-600 font-medium uppercase mb-1">Optimization</p>
                <p className="text-[18px] font-black text-black mb-2">3 campaigns need attention</p>
                <div className="flex items-center space-x-2">
                  <ExclamationTriangleIcon className="w-4 h-4 text-yellow-600" />
                  <span className="text-[12px] font-semibold text-black">Review recommended</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Campaigns Grid */}
        <motion.div
          className="space-y-4"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filteredCampaigns.map((campaign, index) => {
            const TypeIcon = getTypeIcon(campaign.type);
            return (
              <motion.div
                key={campaign.id}
                className="bg-white border border-gray-200 rounded-lg p-5 hover:border-black transition-all duration-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <input
                        type="checkbox"
                        checked={selectedCampaigns.includes(campaign.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCampaigns([...selectedCampaigns, campaign.id]);
                          } else {
                            setSelectedCampaigns(selectedCampaigns.filter(id => id !== campaign.id));
                          }
                        }}
                        className="w-4 h-4 border-gray-300 rounded text-black focus:ring-black"
                      />
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <TypeIcon className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <h3 className="text-[16px] font-bold text-black">{campaign.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${getTypeColor(campaign.type)} uppercase`}>
                            {campaign.type}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${getStatusColor(campaign.status)} uppercase`}>
                            {campaign.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-[11px] text-gray-500 font-medium uppercase">Budget</p>
                        <p className="text-[16px] font-black text-black">₹{campaign.budget.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-500 font-medium uppercase">Spent</p>
                        <p className="text-[16px] font-black text-black">₹{campaign.spent.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-500 font-medium uppercase">Verified Views</p>
                        <p className="text-[16px] font-black text-black">{(campaign.verifiedViews / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-500 font-medium uppercase">ROI</p>
                        <p className="text-[16px] font-black text-black">{campaign.roi}%</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-[11px] text-gray-600">
                      <div className="flex items-center space-x-1">
                        <UsersIcon className="w-3 h-3" />
                        <span>{campaign.creators} creators</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="w-3 h-3" />
                        <span>{campaign.startDate} - {campaign.endDate}</span>
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
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty State */}
        {filteredCampaigns.length === 0 && (
          <motion.div
            className="text-center py-16"
            {...fadeInUp}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BriefcaseIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-[18px] font-bold text-black mb-2">No campaigns found</h3>
            <p className="text-[13px] text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <motion.button
              className="bg-black text-white px-6 py-3 rounded-full text-[13px] font-bold hover:bg-gray-900 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Create Your First Campaign
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Campaign Templates Modal */}
      <AnimatePresence>
        {showTemplates && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTemplates(false)}
          >
            <motion.div
              className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[24px] font-bold text-black">Campaign Templates</h3>
                <button onClick={() => setShowTemplates(false)}>
                  <XMarkIcon className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Product Launch', type: 'onetime', icon: BanknotesIcon },
                  { name: 'Review Campaign', type: 'cpv', icon: ArrowTrendingUpIcon },
                  { name: 'Quick Gig', type: 'gigs', icon: GiftIcon }
                ].map((template) => {
                  const Icon = template.icon;
                  return (
                    <motion.div
                      key={template.name}
                      className="border border-gray-200 rounded-lg p-6 hover:border-black transition-all duration-200 cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-black" />
                        </div>
                        <div>
                          <h4 className="text-[16px] font-bold text-black">{template.name}</h4>
                          <p className="text-[12px] text-gray-600">{template.type} template</p>
                        </div>
                      </div>
                      <button className="w-full bg-black text-white py-2.5 rounded-lg font-semibold text-[12px] hover:bg-gray-900 transition-colors">
                        Use Template
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Navigation */}
      <FloatingNav userType="brand" />
    </motion.div>
  );
}
