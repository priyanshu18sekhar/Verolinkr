'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  ArrowTrendingUpIcon,
  GiftIcon,
  BanknotesIcon,
  ClockIcon,
  CheckCircleIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  StarIcon,
  PlayIcon
} from '@heroicons/react/24/outline';
import FloatingNav from '../../../componets/ui/FloatingNav';

export default function CreatorCampaigns() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

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
      productCost: null,
      brandRating: 4.8,
      applicants: 23,
      maxApplicants: 50,
      posted: '2 hours ago'
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
      productCost: null,
      brandRating: 4.9,
      applicants: 45,
      maxApplicants: 100,
      posted: '5 hours ago'
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
      productCost: 5000,
      brandRating: 4.7,
      applicants: 67,
      maxApplicants: 80,
      posted: '1 day ago'
    },
    {
      id: 4,
      brand: 'FoodieHub',
      title: 'Recipe Video Creation',
      category: 'Food & Cooking',
      type: 'gigs',
      budget: 12000,
      duration: '3 days',
      requirements: '1 recipe video with ingredients list',
      location: 'Anywhere, India',
      deadline: '2024-01-12',
      cpvRate: null,
      productCost: null,
      brandRating: 4.6,
      applicants: 34,
      maxApplicants: 60,
      posted: '3 hours ago'
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'gigs': return GiftIcon;
      case 'cpv': return ArrowTrendingUpIcon;
      case 'onetime': return BanknotesIcon;
      default: return ClockIcon;
    }
  };

  const filteredCampaigns = availableCampaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || campaign.type === filterType;
    return matchesSearch && matchesType;
  });

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
                Available Campaigns
              </h1>
              <p className="text-xl text-gray-600 font-light">
                Discover and apply to campaigns that match your niche
              </p>
            </div>
            
            <motion.button
              className="bg-black text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <EyeIcon className="w-5 h-5" />
              <span>My Applications</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Filters and Search */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-100 p-8 mb-8"
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
                  placeholder="Search campaigns by brand, title, or category..."
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
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
              >
                <option value="all">All Status</option>
                <option value="open">Open for Applications</option>
                <option value="closing">Closing Soon</option>
                <option value="urgent">Urgent</option>
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
            { label: 'Available Campaigns', value: availableCampaigns.length, color: 'blue' },
            { label: 'Gigs Available', value: availableCampaigns.filter(c => c.type === 'gigs').length, color: 'green' },
            { label: 'CPV Campaigns', value: availableCampaigns.filter(c => c.type === 'cpv').length, color: 'purple' },
            { label: 'Total Budget', value: `₹${availableCampaigns.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}`, color: 'orange' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-gray-50 rounded-2xl p-6"
              variants={fadeInUp}
            >
              <p className="text-sm font-medium text-gray-500 mb-2">{stat.label}</p>
              <p className="text-3xl font-black text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Campaigns Grid */}
        <motion.div
          className="space-y-8"
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
          {filteredCampaigns.map((campaign, index) => {
            const TypeIcon = getTypeIcon(campaign.type);
            const isClosingSoon = campaign.applicants / campaign.maxApplicants > 0.8;
            
            return (
              <motion.div
                key={campaign.id}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
                variants={fadeInUp}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
                      <TypeIcon className="w-8 h-8 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-gray-900 mb-2">{campaign.title}</h3>
                      <p className="text-gray-600 font-medium">by {campaign.brand}</p>
                      <div className="flex items-center space-x-3 mt-2">
                        <span className="inline-block bg-gray-100 text-gray-800 text-sm font-bold px-3 py-1 rounded-full">
                          {campaign.category}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${getTypeColor(campaign.type)}`}>
                          {campaign.type.toUpperCase()}
                        </span>
                        {isClosingSoon && (
                          <span className="px-3 py-1 rounded-full text-sm font-bold bg-red-100 text-red-800">
                            CLOSING SOON
                          </span>
                        )}
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

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Duration</p>
                    <p className="text-lg font-bold text-gray-900">{campaign.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Location</p>
                    <div className="flex items-center space-x-1">
                      <MapPinIcon className="w-4 h-4 text-gray-500" />
                      <p className="text-lg font-bold text-gray-900">{campaign.location}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Deadline</p>
                    <p className="text-lg font-bold text-gray-900">{campaign.deadline}</p>
                  </div>
                  {campaign.productCost && (
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Product Cost</p>
                      <p className="text-lg font-bold text-green-600">₹{campaign.productCost.toLocaleString()}</p>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <p className="text-gray-500 font-medium mb-2">Requirements:</p>
                  <p className="text-gray-900 text-lg">{campaign.requirements}</p>
                </div>

                {/* Brand Rating and Application Stats */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <StarIcon className="w-5 h-5 text-yellow-500" />
                      <span className="font-bold text-gray-900">{campaign.brandRating}</span>
                      <span className="text-gray-600">Brand Rating</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <PlayIcon className="w-5 h-5 text-blue-500" />
                      <span className="font-bold text-gray-900">{campaign.applicants}</span>
                      <span className="text-gray-600">applicants</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Posted {campaign.posted}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button className="flex-1 bg-black text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Apply Now
                  </button>
                  <button className="bg-gray-100 text-gray-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors duration-200">
                    View Details
                  </button>
                  <button className="bg-blue-100 text-blue-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-200 transition-colors duration-200">
                    Save
                  </button>
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
              <ArrowTrendingUpIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No campaigns found</h3>
            <p className="text-gray-600 mb-8">Try adjusting your search or filter criteria</p>
            <button className="bg-black text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-800 transition-all duration-200">
              Browse All Campaigns
            </button>
          </motion.div>
        )}
      </div>

      {/* Floating Navigation */}
      <FloatingNav userType="creator" />
    </div>
  );
}
