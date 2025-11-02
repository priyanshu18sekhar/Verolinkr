'use client';

import { useState } from 'react';
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
  UsersIcon
} from '@heroicons/react/24/outline';
import FloatingNav from '../../../componets/ui/FloatingNav';
import { AnimatedParticles } from '../../../components/onboarding';

export default function BrandCampaigns() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
                Campaign Management
              </h1>
              <p className="text-2xl md:text-xl text-gray-600 font-light">
                Manage all your campaigns across different types
              </p>
            </div>
            
            <motion.button
              className="bg-black text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <PlusIcon className="w-5 h-5" />
              <span>Create Campaign</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 relative z-10">
        {/* Filters and Search */}
        <motion.div
          className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8 hover:border-black transition-all duration-200"
          {...fadeInUp}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
              >
                <option value="all">All Types</option>
                <option value="gigs">Gigs</option>
                <option value="cpv">CPV Campaigns</option>
                <option value="onetime">One-Time Payout</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
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
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
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
          {[
            { label: 'Total Campaigns', value: campaigns.length, color: 'blue' },
            { label: 'Active Campaigns', value: campaigns.filter(c => c.status === 'active').length, color: 'green' },
            { label: 'Total Budget', value: `₹${campaigns.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}`, color: 'purple' },
            { label: 'Avg ROI', value: `${Math.round(campaigns.reduce((sum, c) => sum + c.roi, 0) / campaigns.length)}%`, color: 'orange' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-black transition-all duration-200"
              variants={fadeInUp}
            >
              <p className="text-sm font-bold text-gray-600 mb-2">{stat.label}</p>
              <p className="text-4xl font-black text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Campaigns Grid */}
        <motion.div
          className="space-y-6"
          {...fadeInUp}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          {filteredCampaigns.map((campaign, index) => {
            const TypeIcon = getTypeIcon(campaign.type);
            return (
              <motion.div
                key={campaign.id}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-black hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
                      <TypeIcon className="w-8 h-8 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-4xl font-black text-gray-900 mb-2">{campaign.name}</h3>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${getTypeColor(campaign.type)}`}>
                          {campaign.type.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(campaign.status)}`}>
                          {campaign.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200">
                      <EyeIcon className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-3 bg-blue-100 hover:bg-blue-200 rounded-xl transition-colors duration-200">
                      <PencilIcon className="w-5 h-5 text-blue-600" />
                    </button>
                    {campaign.status === 'active' && (
                      <button className="p-3 bg-yellow-100 hover:bg-yellow-200 rounded-xl transition-colors duration-200">
                        <PauseIcon className="w-5 h-5 text-yellow-600" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-gray-600 font-bold mb-1">Budget</p>
                    <p className="text-2xl font-black text-gray-900">₹{campaign.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-bold mb-1">Spent</p>
                    <p className="text-2xl font-black text-gray-900">₹{campaign.spent.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-bold mb-1">Verified Views</p>
                    <p className="text-2xl font-black text-gray-900">{(campaign.verifiedViews / 1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-bold mb-1">ROI</p>
                    <p className="text-2xl font-black text-green-600">{campaign.roi}%</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <UsersIcon className="w-4 h-4" />
                      <span>{campaign.creators} creators</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="w-4 h-4" />
                      <span>{campaign.startDate} - {campaign.endDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors duration-200">
                      View Analytics
                    </button>
                    {campaign.status === 'active' && (
                      <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors duration-200">
                        Manage
                      </button>
                    )}
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
            transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BriefcaseIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No campaigns found</h3>
            <p className="text-gray-600 mb-8">Try adjusting your search or filter criteria</p>
            <button className="bg-black text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-800 transition-all duration-200">
              Create Your First Campaign
            </button>
          </motion.div>
        )}
      </div>

      {/* Floating Navigation */}
      <FloatingNav userType="brand" />
    </div>
  );
}
