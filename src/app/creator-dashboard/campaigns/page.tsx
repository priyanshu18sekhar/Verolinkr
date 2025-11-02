'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  PlayIcon,
  HeartIcon,
  SparklesIcon,
  AdjustmentsHorizontalIcon,
  Squares2X2Icon,
  ListBulletIcon,
  XMarkIcon,
  ArrowPathIcon,
  BoltIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import FloatingNav from '../../../componets/ui/FloatingNav';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import GlassCard from '../../../components/design-system/GlassCard';
import GlassButton from '../../../components/design-system/GlassButton';
import GlassInput from '../../../components/design-system/GlassInput';
import ProgressBar from '../../../components/loading/ProgressBar';
import { useModal } from '../../../contexts/ModalContext';

function CreatorCampaignsContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [savedCampaigns, setSavedCampaigns] = useState<number[]>([]);
  const { openConfirm, openSuccess } = useModal();

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
      posted: '2 hours ago',
      matchScore: 95,
      recommended: true,
      urgency: 'normal'
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
      posted: '5 hours ago',
      matchScore: 88,
      recommended: true,
      urgency: 'normal'
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
      posted: '1 day ago',
      matchScore: 82,
      recommended: false,
      urgency: 'urgent'
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
      posted: '3 hours ago',
      matchScore: 75,
      recommended: false,
      urgency: 'normal'
    },
    {
      id: 5,
      brand: 'FitnessFirst',
      title: 'Workout Equipment Review',
      category: 'Fitness & Wellness',
      type: 'gigs',
      budget: 18000,
      duration: '1 week',
      requirements: '1 workout demonstration video',
      location: 'Anywhere, India',
      deadline: '2024-01-25',
      cpvRate: null,
      productCost: null,
      brandRating: 4.9,
      applicants: 12,
      maxApplicants: 40,
      posted: '1 hour ago',
      matchScore: 92,
      recommended: true,
      urgency: 'normal'
    },
    {
      id: 6,
      brand: 'TravelWorld',
      title: 'Destination Guide Video',
      category: 'Travel & Lifestyle',
      type: 'cpv',
      budget: 30000,
      duration: '2 weeks',
      requirements: '1 travel vlog showcasing destination',
      location: 'Goa, India',
      deadline: '2024-02-01',
      cpvRate: 0.30,
      productCost: null,
      brandRating: 4.8,
      applicants: 28,
      maxApplicants: 50,
      posted: '4 hours ago',
      matchScore: 85,
      recommended: true,
      urgency: 'normal'
    }
  ];

  const categories = ['All', 'Beauty & Skincare', 'Technology', 'Fashion', 'Food & Cooking', 'Fitness & Wellness', 'Travel & Lifestyle'];

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'gigs': return GiftIcon;
      case 'cpv': return ArrowTrendingUpIcon;
      case 'onetime': return BanknotesIcon;
      default: return ClockIcon;
    }
  };

  const toggleSave = (campaignId: number) => {
    if (savedCampaigns.includes(campaignId)) {
      setSavedCampaigns(savedCampaigns.filter(id => id !== campaignId));
    } else {
      setSavedCampaigns([...savedCampaigns, campaignId]);
      openSuccess({
        message: 'Campaign saved to favorites',
        autoClose: true,
        autoCloseDelay: 2000,
      });
    }
  };

  const handleApply = async (campaignId: number) => {
    const confirmed = await openConfirm({
      title: 'Apply to Campaign',
      message: 'Are you sure you want to apply to this campaign?',
      confirmText: 'Yes, Apply',
      cancelText: 'Cancel',
    });

    if (confirmed) {
      // Simulate application
      setTimeout(() => {
        openSuccess({
          message: 'Application submitted successfully! The brand will review your profile.',
          title: 'Application Sent',
        });
      }, 500);
    }
  };

  let filteredCampaigns = availableCampaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || campaign.type === filterType;
    const matchesCategory = filterCategory === 'all' || campaign.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'urgent' && campaign.urgency === 'urgent') ||
      (filterStatus === 'recommended' && campaign.recommended) ||
      (filterStatus === 'closing' && (campaign.applicants / campaign.maxApplicants) > 0.8);
    return matchesSearch && matchesType && matchesCategory && matchesStatus;
  });

  // Sort campaigns
  if (sortBy === 'budget_high') {
    filteredCampaigns = [...filteredCampaigns].sort((a, b) => b.budget - a.budget);
  } else if (sortBy === 'budget_low') {
    filteredCampaigns = [...filteredCampaigns].sort((a, b) => a.budget - b.budget);
  } else if (sortBy === 'match_score') {
    filteredCampaigns = [...filteredCampaigns].sort((a, b) => b.matchScore - a.matchScore);
  } else if (sortBy === 'deadline') {
    filteredCampaigns = [...filteredCampaigns].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  }

  const recommendedCampaigns = filteredCampaigns.filter(c => c.recommended);
  const regularCampaigns = filteredCampaigns.filter(c => !c.recommended);

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
                Available Campaigns
              </h1>
              <p className="text-xl text-gray-600 font-light">
                Discover and apply to campaigns that match your niche
              </p>
            </div>
            
            <GlassButton variant="secondary" size="md" onClick={() => {}}>
              <EyeIcon className="w-5 h-5 mr-2" />
              My Applications
            </GlassButton>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <GlassCard variant="elevated" className="p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              <GlassInput
                placeholder="Search campaigns by brand, title, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12"
                size="md"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex gap-3">
              <GlassCard variant="floating" className="p-0">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-3 bg-transparent border-none focus:ring-0 focus:outline-none font-medium text-gray-700"
                >
                  <option value="all">All Types</option>
                  <option value="gigs">Gigs</option>
                  <option value="cpv">CPV</option>
                  <option value="onetime">One-Time</option>
                </select>
              </GlassCard>

              <GlassCard variant="floating" className="p-0">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-3 bg-transparent border-none focus:ring-0 focus:outline-none font-medium text-gray-700"
                >
                  <option value="all">All Categories</option>
                  {categories.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </GlassCard>

              <GlassButton
                variant="tertiary"
                size="md"
                onClick={() => setShowFilters(!showFilters)}
              >
                <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2" />
                Filters
              </GlassButton>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-white/20"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                    <GlassCard variant="floating" className="p-0">
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full px-4 py-3 bg-transparent border-none focus:ring-0 focus:outline-none font-medium text-gray-700"
                      >
                        <option value="all">All Status</option>
                        <option value="recommended">Recommended</option>
                        <option value="urgent">Urgent</option>
                        <option value="closing">Closing Soon</option>
                      </select>
                    </GlassCard>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Sort By</label>
                    <GlassCard variant="floating" className="p-0">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-4 py-3 bg-transparent border-none focus:ring-0 focus:outline-none font-medium text-gray-700"
                      >
                        <option value="newest">Newest First</option>
                        <option value="budget_high">Budget: High to Low</option>
                        <option value="budget_low">Budget: Low to High</option>
                        <option value="match_score">Best Match</option>
                        <option value="deadline">Deadline</option>
                      </select>
                    </GlassCard>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">View Mode</label>
                    <div className="flex gap-2">
                      <GlassButton
                        variant={viewMode === 'list' ? 'primary' : 'tertiary'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                        className="flex-1"
                      >
                        <ListBulletIcon className="w-4 h-4 mr-1" />
                        List
                      </GlassButton>
                      <GlassButton
                        variant={viewMode === 'grid' ? 'primary' : 'tertiary'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                        className="flex-1"
                      >
                        <Squares2X2Icon className="w-4 h-4 mr-1" />
                        Grid
                      </GlassButton>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>

        {/* Campaign Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Available Campaigns', value: filteredCampaigns.length, icon: GiftIcon, color: 'blue' },
            { label: 'Gigs Available', value: filteredCampaigns.filter(c => c.type === 'gigs').length, icon: GiftIcon, color: 'green' },
            { label: 'CPV Campaigns', value: filteredCampaigns.filter(c => c.type === 'cpv').length, icon: ArrowTrendingUpIcon, color: 'purple' },
            { label: 'Total Budget', value: `₹${filteredCampaigns.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}`, icon: CurrencyDollarIcon, color: 'orange' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: 'bg-blue-500/20 border-blue-500/30 text-blue-600',
              green: 'bg-green-500/20 border-green-500/30 text-green-600',
              purple: 'bg-purple-500/20 border-purple-500/30 text-purple-600',
              orange: 'bg-orange-500/20 border-orange-500/30 text-orange-600',
            };

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard variant="elevated" className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 backdrop-blur-sm ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Recommended Campaigns */}
        {recommendedCampaigns.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <SparklesIcon className="w-6 h-6 text-yellow-500" />
              <h2 className="text-3xl font-black text-gray-900">Recommended for You</h2>
            </div>
            <div className="space-y-6">
              {recommendedCampaigns.map((campaign, index) => {
                const TypeIcon = getTypeIcon(campaign.type);
                const isClosingSoon = campaign.applicants / campaign.maxApplicants > 0.8;
                const applicantPercentage = (campaign.applicants / campaign.maxApplicants) * 100;
                
                return (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <GlassCard variant="elevated" className="p-8 border-2 border-yellow-500/30 hover:scale-[1.01] transition-transform duration-200">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-500/30 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                            <TypeIcon className="w-8 h-8 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-3xl font-black text-gray-900">{campaign.title}</h3>
                              <span className="px-3 py-1 rounded-full bg-yellow-500/20 border-2 border-yellow-500/30 text-xs font-bold text-yellow-700 backdrop-blur-sm flex items-center gap-1">
                                <SparklesIcon className="w-3 h-3" />
                                RECOMMENDED
                              </span>
                              {campaign.urgency === 'urgent' && (
                                <span className="px-3 py-1 rounded-full bg-red-500/20 border-2 border-red-500/30 text-xs font-bold text-red-700 backdrop-blur-sm flex items-center gap-1">
                                  <BoltIcon className="w-3 h-3" />
                                  URGENT
                                </span>
                              )}
                              {isClosingSoon && (
                                <span className="px-3 py-1 rounded-full bg-red-500/20 border-2 border-red-500/30 text-xs font-bold text-red-700 backdrop-blur-sm">
                                  CLOSING SOON
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 font-medium mb-3">by {campaign.brand}</p>
                            <div className="flex items-center gap-3 flex-wrap">
                              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-bold text-gray-700">
                                {campaign.category}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-sm font-bold border-2 backdrop-blur-sm ${getTypeColor(campaign.type)}`}>
                                {campaign.type.toUpperCase()}
                              </span>
                              <span className="px-3 py-1 rounded-full bg-green-500/20 border-2 border-green-500/30 text-sm font-bold text-green-700 backdrop-blur-sm">
                                {campaign.matchScore}% Match
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-4xl font-black text-green-600 mb-1">₹{campaign.budget.toLocaleString()}</p>
                          <p className="text-sm text-gray-500 font-medium">Total Budget</p>
                          {campaign.cpvRate && (
                            <p className="text-lg font-bold text-purple-600 mt-1">₹{campaign.cpvRate} per view</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                        <div>
                          <p className="text-sm text-gray-500 font-medium mb-1">Duration</p>
                          <p className="text-lg font-bold text-gray-900">{campaign.duration}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium mb-1">Location</p>
                          <div className="flex items-center gap-1">
                            <MapPinIcon className="w-4 h-4 text-gray-500" />
                            <p className="text-lg font-bold text-gray-900">{campaign.location}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium mb-1">Deadline</p>
                          <p className="text-lg font-bold text-gray-900">{campaign.deadline}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium mb-1">Brand Rating</p>
                          <div className="flex items-center gap-1">
                            <StarIcon className="w-4 h-4 text-yellow-500" />
                            <p className="text-lg font-bold text-gray-900">{campaign.brandRating}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <p className="text-gray-500 font-medium mb-2">Requirements:</p>
                        <p className="text-gray-900 text-lg">{campaign.requirements}</p>
                      </div>

                      {/* Application Stats */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">
                            {campaign.applicants} / {campaign.maxApplicants} applicants
                          </span>
                          <span className="text-sm font-bold text-gray-700">{applicantPercentage.toFixed(0)}% filled</span>
                        </div>
                        <ProgressBar progress={applicantPercentage} variant="linear" color="primary" size="sm" showLabel={false} />
                      </div>

                      <div className="flex gap-4">
                        <GlassButton
                          variant="primary"
                          size="md"
                          onClick={() => handleApply(campaign.id)}
                          className="flex-1"
                        >
                          <BoltIcon className="w-5 h-5 mr-2" />
                          Quick Apply
                        </GlassButton>
                        <GlassButton variant="tertiary" size="md" onClick={() => {}}>
                          View Details
                        </GlassButton>
                        <motion.button
                          onClick={() => toggleSave(campaign.id)}
                          className="p-4 rounded-xl bg-white/20 backdrop-blur-xl border-2 border-white/30 hover:bg-white/30 transition-all duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {savedCampaigns.includes(campaign.id) ? (
                            <HeartIconSolid className="w-5 h-5 text-red-500" />
                          ) : (
                            <HeartIcon className="w-5 h-5 text-gray-600" />
                          )}
                        </motion.button>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Other Campaigns */}
        {regularCampaigns.length > 0 && (
          <div className={recommendedCampaigns.length > 0 ? 'mt-12' : ''}>
            {recommendedCampaigns.length > 0 && (
              <h2 className="text-3xl font-black text-gray-900 mb-6">All Campaigns</h2>
            )}
            <div className="space-y-6">
              {regularCampaigns.map((campaign, index) => {
                const TypeIcon = getTypeIcon(campaign.type);
                const isClosingSoon = campaign.applicants / campaign.maxApplicants > 0.8;
                const applicantPercentage = (campaign.applicants / campaign.maxApplicants) * 100;
                
                return (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <GlassCard variant="elevated" className="p-8 hover:scale-[1.01] transition-transform duration-200">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-500/30 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                            <TypeIcon className="w-8 h-8 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-3xl font-black text-gray-900">{campaign.title}</h3>
                              {campaign.urgency === 'urgent' && (
                                <span className="px-3 py-1 rounded-full bg-red-500/20 border-2 border-red-500/30 text-xs font-bold text-red-700 backdrop-blur-sm flex items-center gap-1">
                                  <BoltIcon className="w-3 h-3" />
                                  URGENT
                                </span>
                              )}
                              {isClosingSoon && (
                                <span className="px-3 py-1 rounded-full bg-red-500/20 border-2 border-red-500/30 text-xs font-bold text-red-700 backdrop-blur-sm">
                                  CLOSING SOON
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 font-medium mb-3">by {campaign.brand}</p>
                            <div className="flex items-center gap-3 flex-wrap">
                              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-bold text-gray-700">
                                {campaign.category}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-sm font-bold border-2 backdrop-blur-sm ${getTypeColor(campaign.type)}`}>
                                {campaign.type.toUpperCase()}
                              </span>
                              <span className="px-3 py-1 rounded-full bg-blue-500/20 border-2 border-blue-500/30 text-sm font-bold text-blue-700 backdrop-blur-sm">
                                {campaign.matchScore}% Match
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-4xl font-black text-green-600 mb-1">₹{campaign.budget.toLocaleString()}</p>
                          <p className="text-sm text-gray-500 font-medium">Total Budget</p>
                          {campaign.cpvRate && (
                            <p className="text-lg font-bold text-purple-600 mt-1">₹{campaign.cpvRate} per view</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                        <div>
                          <p className="text-sm text-gray-500 font-medium mb-1">Duration</p>
                          <p className="text-lg font-bold text-gray-900">{campaign.duration}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium mb-1">Location</p>
                          <div className="flex items-center gap-1">
                            <MapPinIcon className="w-4 h-4 text-gray-500" />
                            <p className="text-lg font-bold text-gray-900">{campaign.location}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium mb-1">Deadline</p>
                          <p className="text-lg font-bold text-gray-900">{campaign.deadline}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium mb-1">Brand Rating</p>
                          <div className="flex items-center gap-1">
                            <StarIcon className="w-4 h-4 text-yellow-500" />
                            <p className="text-lg font-bold text-gray-900">{campaign.brandRating}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <p className="text-gray-500 font-medium mb-2">Requirements:</p>
                        <p className="text-gray-900 text-lg">{campaign.requirements}</p>
                      </div>

                      {/* Application Stats */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">
                            {campaign.applicants} / {campaign.maxApplicants} applicants
                          </span>
                          <span className="text-sm font-bold text-gray-700">{applicantPercentage.toFixed(0)}% filled</span>
                        </div>
                        <ProgressBar progress={applicantPercentage} variant="linear" color="primary" size="sm" showLabel={false} />
                      </div>

                      <div className="flex gap-4">
                        <GlassButton
                          variant="primary"
                          size="md"
                          onClick={() => handleApply(campaign.id)}
                          className="flex-1"
                        >
                          Apply Now
                        </GlassButton>
                        <GlassButton variant="tertiary" size="md" onClick={() => {}}>
                          View Details
                        </GlassButton>
                        <motion.button
                          onClick={() => toggleSave(campaign.id)}
                          className="p-4 rounded-xl bg-white/20 backdrop-blur-xl border-2 border-white/30 hover:bg-white/30 transition-all duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {savedCampaigns.includes(campaign.id) ? (
                            <HeartIconSolid className="w-5 h-5 text-red-500" />
                          ) : (
                            <HeartIcon className="w-5 h-5 text-gray-600" />
                          )}
                        </motion.button>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredCampaigns.length === 0 && (
          <motion.div
            className="text-center py-16"
            {...fadeInUp}
            transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <GlassCard variant="floating" className="p-12 inline-block">
              <div className="w-24 h-24 bg-gray-500/20 border-2 border-gray-500/30 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <ArrowTrendingUpIcon className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">No campaigns found</h3>
              <p className="text-gray-600 mb-8">Try adjusting your search or filter criteria</p>
              <GlassButton variant="primary" size="md" onClick={() => {
                setSearchTerm('');
                setFilterType('all');
                setFilterCategory('all');
                setFilterStatus('all');
              }}>
                <ArrowPathIcon className="w-5 h-5 mr-2" />
                Reset Filters
              </GlassButton>
            </GlassCard>
          </motion.div>
        )}
      </div>

      {/* Floating Navigation */}
      <FloatingNav userType="creator" />
    </div>
  );
}

export default function CreatorCampaigns() {
  return (
    <DashboardLayout userType="creator" userName="Creator Name" userEmail="creator@example.com">
      <CreatorCampaignsContent />
    </DashboardLayout>
  );
}
