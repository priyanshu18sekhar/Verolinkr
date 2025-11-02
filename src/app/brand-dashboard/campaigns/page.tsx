'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  BriefcaseIcon
} from '@heroicons/react/24/outline';
import FloatingNav from '../../../componets/ui/FloatingNav';

export default function BrandCampaigns() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [isLoading, setIsLoading] = useState(true);

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

  // Skeleton Loading Component
  const SkeletonLoader = () => (
    <div className="w-full px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto py-8 animate-pulse">
      <div className="bg-white border-b border-gray-200 -mx-8 md:-mx-16 lg:-mx-24 px-8 md:px-16 lg:px-24 mb-8">
        <div className="py-8">
          <div className="h-12 bg-gray-200 rounded w-96 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-64"></div>
        </div>
      </div>
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
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
            { label: 'Total Campaigns', value: campaigns.length },
            { label: 'Active Campaigns', value: campaigns.filter(c => c.status === 'active').length },
            { label: 'Total Budget', value: `₹${campaigns.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}` },
            { label: 'Avg ROI', value: `${Math.round(campaigns.reduce((sum, c) => sum + c.roi, 0) / campaigns.length)}%` }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:border-black transition-all duration-200"
            >
              <p className="text-[10px] text-gray-500 font-medium uppercase mb-1">{stat.label}</p>
              <p className="text-[24px] font-black text-black leading-none">{stat.value}</p>
            </div>
          ))}
        </motion.div>

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

      {/* Floating Navigation */}
      <FloatingNav userType="brand" />
    </motion.div>
  );
}
