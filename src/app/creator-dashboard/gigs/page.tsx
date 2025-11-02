'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GiftIcon,
  PlusIcon,
  StarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  EyeIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  TagIcon,
  UserIcon,
  CalendarIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PlayIcon,
  PhotoIcon,
  ChartBarIcon,
  PencilIcon,
  XMarkIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import FloatingNav from '../../../componets/ui/FloatingNav';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import GlassCard from '../../../components/design-system/GlassCard';
import GlassButton from '../../../components/design-system/GlassButton';
import GlassInput from '../../../components/design-system/GlassInput';
import ProgressBar from '../../../components/loading/ProgressBar';
import { useModal } from '../../../contexts/ModalContext';

function GigsMarketplaceContent() {
  const [activeTab, setActiveTab] = useState<'browse' | 'my-gigs' | 'create'>('browse');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const { openConfirm, openSuccess } = useModal();

  const categories = [
    { id: 'all', name: 'All Gigs', count: 156, icon: GiftIcon },
    { id: 'fashion', name: 'Fashion & Beauty', count: 45, icon: TagIcon },
    { id: 'tech', name: 'Technology', count: 32, icon: PlayIcon },
    { id: 'food', name: 'Food & Cooking', count: 28, icon: TagIcon },
    { id: 'fitness', name: 'Fitness & Wellness', count: 25, icon: TagIcon },
    { id: 'travel', name: 'Travel & Lifestyle', count: 26, icon: TagIcon }
  ];

  const availableGigs = [
    {
      id: 1,
      title: 'Skincare Product Review',
      creator: 'Sarah Johnson',
      category: 'fashion',
      price: 15000,
      deliveryTime: '3 days',
      rating: 4.9,
      reviews: 127,
      description: 'Professional unboxing and authentic review video for your skincare product. Includes 1 main video (2-3 mins) and 3 Instagram stories.',
      requirements: ['Product sample required', 'Brand guidelines provided', 'Professional video quality'],
      portfolio: ['https://example.com/video1', 'https://example.com/video2'],
      verified: true,
      completedOrders: 89,
      avgDelivery: '2.5 days',
      responseTime: '2 hours',
      featured: true,
      bestseller: true
    },
    {
      id: 2,
      title: 'Tech Unboxing Video',
      creator: 'Mike Chen',
      category: 'tech',
      price: 25000,
      deliveryTime: '5 days',
      rating: 4.8,
      reviews: 203,
      description: 'Detailed tech product unboxing with feature highlights. Perfect for gadget launches and tech reviews.',
      requirements: ['Product sample required', 'Technical specifications', 'HD video quality'],
      portfolio: ['https://example.com/video3', 'https://example.com/video4'],
      verified: true,
      completedOrders: 156,
      avgDelivery: '4.2 days',
      responseTime: '1 hour',
      featured: true,
      bestseller: false
    },
    {
      id: 3,
      title: 'Recipe Video Creation',
      creator: 'Emma Wilson',
      category: 'food',
      price: 12000,
      deliveryTime: '2 days',
      rating: 4.9,
      reviews: 89,
      description: 'Beautiful recipe video with step-by-step instructions. Includes ingredient list and cooking tips.',
      requirements: ['Recipe details provided', 'Kitchen setup required', 'High-quality video'],
      portfolio: ['https://example.com/video5', 'https://example.com/video6'],
      verified: true,
      completedOrders: 67,
      avgDelivery: '1.8 days',
      responseTime: '3 hours',
      featured: false,
      bestseller: true
    },
    {
      id: 4,
      title: 'Fashion Lookbook Video',
      creator: 'Alex Thompson',
      category: 'fashion',
      price: 20000,
      deliveryTime: '4 days',
      rating: 4.7,
      reviews: 94,
      description: 'Stylish fashion lookbook showcasing your clothing line with multiple outfit combinations and styling tips.',
      requirements: ['Clothing samples', 'Brand guidelines', 'Professional photography'],
      portfolio: ['https://example.com/video7', 'https://example.com/video8'],
      verified: true,
      completedOrders: 112,
      avgDelivery: '3.5 days',
      responseTime: '2 hours',
      featured: false,
      bestseller: false
    }
  ];

  const myGigs = [
    {
      id: 1,
      title: 'Fashion Lookbook Creation',
      category: 'fashion',
      price: 18000,
      status: 'active',
      orders: 23,
      rating: 4.8,
      lastOrder: '2 days ago',
      earnings: 414000,
      views: 1250,
      conversionRate: 1.8,
      avgDelivery: '2.3 days'
    },
    {
      id: 2,
      title: 'Fitness Routine Video',
      category: 'fitness',
      price: 14000,
      status: 'paused',
      orders: 15,
      rating: 4.9,
      lastOrder: '1 week ago',
      earnings: 210000,
      views: 890,
      conversionRate: 1.7,
      avgDelivery: '1.9 days'
    },
    {
      id: 3,
      title: 'Product Photography',
      category: 'fashion',
      price: 8000,
      status: 'active',
      orders: 42,
      rating: 4.9,
      lastOrder: '5 hours ago',
      earnings: 336000,
      views: 2150,
      conversionRate: 2.0,
      avgDelivery: '1.5 days'
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      fashion: 'bg-pink-500/20 text-pink-700 border-pink-500/30',
      tech: 'bg-blue-500/20 text-blue-700 border-blue-500/30',
      food: 'bg-orange-500/20 text-orange-700 border-orange-500/30',
      fitness: 'bg-green-500/20 text-green-700 border-green-500/30',
      travel: 'bg-purple-500/20 text-purple-700 border-purple-500/30'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-700 border-gray-500/30';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-700 border-green-500/30';
      case 'paused': return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
      case 'draft': return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
    }
  };

  const filteredGigs = availableGigs.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gig.creator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || gig.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort gigs
  let sortedGigs = [...filteredGigs];
  if (sortBy === 'price_low') {
    sortedGigs.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_high') {
    sortedGigs.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    sortedGigs.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'popular') {
    sortedGigs.sort((a, b) => b.completedOrders - a.completedOrders);
  }

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
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-500/20 border-2 border-blue-500/30 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <GiftIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-6xl font-black text-gray-900 tracking-tight leading-none mb-2">
                    Gigs Marketplace
                  </h1>
                  <p className="text-xl text-gray-600 font-light">
                    Buy and sell pre-defined creator services
                  </p>
                </div>
              </div>
            </div>
            
            <GlassButton
              variant="primary"
              size="md"
              onClick={() => setActiveTab('create')}
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Create Gig
            </GlassButton>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Tab Navigation */}
        <GlassCard variant="elevated" className="mb-12">
          <div className="border-b border-white/20">
            <nav className="flex space-x-12 px-8">
              {[
                { id: 'browse', label: 'Browse Gigs', icon: EyeIcon },
                { id: 'my-gigs', label: 'My Gigs', icon: GiftIcon },
                { id: 'create', label: 'Create Gig', icon: PlusIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-6 px-1 border-b-2 font-bold text-lg flex items-center space-x-3 transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-white/30'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {/* Browse Gigs Tab */}
            {activeTab === 'browse' && (
              <div>
                {/* Search and Filters */}
                <GlassCard variant="floating" className="p-6 mb-8">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative">
                      <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                      <GlassInput
                        placeholder="Search gigs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12"
                        size="md"
                      />
                    </div>
                    <GlassCard variant="floating" className="p-0">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-3 bg-transparent border-none focus:ring-0 focus:outline-none font-medium text-gray-700"
                      >
                        <option value="popular">Most Popular</option>
                        <option value="rating">Highest Rated</option>
                        <option value="price_low">Price: Low to High</option>
                        <option value="price_high">Price: High to Low</option>
                      </select>
                    </GlassCard>
                  </div>
                </GlassCard>

                {/* Category Filter */}
                <div className="mb-8">
                  <h3 className="text-2xl font-black text-gray-900 mb-6">Browse by Category</h3>
                  <div className="flex flex-wrap gap-4">
                    {categories.map((category, index) => {
                      const Icon = category.icon;
                      const isSelected = selectedCategory === category.id;
                      
                      return (
                        <motion.button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className={`px-6 py-4 rounded-2xl font-bold transition-all duration-200 flex items-center gap-3 backdrop-blur-xl border-2 ${
                            isSelected
                              ? 'bg-blue-500/30 border-blue-500/40 text-blue-700 shadow-lg'
                              : 'bg-white/20 border-white/30 text-gray-700 hover:bg-white/30 hover:border-white/40'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{category.name}</span>
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            isSelected ? 'bg-blue-500/20 text-blue-700' : 'bg-white/20 text-gray-600'
                          }`}>
                            {category.count}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Featured Gigs */}
                {sortedGigs.filter(g => g.featured).length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-6">
                      <SparklesIcon className="w-6 h-6 text-yellow-500" />
                      <h2 className="text-3xl font-black text-gray-900">Featured Gigs</h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                      {sortedGigs.filter(g => g.featured).map((gig, index) => (
                        <motion.div
                          key={gig.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <GlassCard variant="elevated" className="p-8 border-2 border-yellow-500/30 hover:scale-[1.02] transition-transform duration-200">
                            <div className="flex items-start justify-between mb-6">
                              <div className="flex items-center gap-4 flex-1">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-500/30 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                  <PlayIcon className="w-8 h-8 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-2xl font-black text-gray-900">{gig.title}</h3>
                                    <span className="px-2 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-xs font-bold text-yellow-700 backdrop-blur-sm">
                                      FEATURED
                                    </span>
                                    {gig.bestseller && (
                                      <span className="px-2 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-xs font-bold text-green-700 backdrop-blur-sm">
                                        BESTSELLER
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <span className="flex items-center gap-1">
                                      <UserIcon className="w-4 h-4" />
                                      {gig.creator}
                                    </span>
                                    {gig.verified && (
                                      <span className="flex items-center gap-1 text-green-600">
                                        <CheckCircleIcon className="w-4 h-4" />
                                        Verified
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mb-6">
                              <p className="text-gray-700 mb-4 leading-relaxed">{gig.description}</p>
                              <div className="space-y-2">
                                <p className="text-sm font-bold text-gray-900">Requirements:</p>
                                {gig.requirements.map((req, idx) => (
                                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                                    <span>{req}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center gap-6">
                                <div>
                                  <p className="text-sm text-gray-500">Price</p>
                                  <p className="text-2xl font-black text-gray-900">₹{gig.price.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Delivery</p>
                                  <p className="text-lg font-bold text-gray-900">{gig.deliveryTime}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Rating</p>
                                  <div className="flex items-center gap-1">
                                    <StarIcon className="w-4 h-4 text-yellow-500" />
                                    <span className="font-bold text-gray-900">{gig.rating}</span>
                                    <span className="text-gray-600">({gig.reviews})</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-3">
                              <GlassButton variant="primary" size="md" onClick={() => {}} className="flex-1">
                                Order Now
                              </GlassButton>
                              <GlassButton variant="tertiary" size="md" onClick={() => {}}>
                                View Details
                              </GlassButton>
                            </div>
                          </GlassCard>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* All Gigs Grid */}
                <div className={sortedGigs.filter(g => g.featured).length > 0 ? 'mt-8' : ''}>
                  {sortedGigs.filter(g => !g.featured).length > 0 && (
                    <h2 className="text-3xl font-black text-gray-900 mb-6">All Gigs</h2>
                  )}
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {sortedGigs.filter(g => !g.featured).map((gig, index) => (
                      <motion.div
                        key={gig.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <GlassCard variant="elevated" className="p-6 hover:scale-105 transition-transform duration-200">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-500/30 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                <PlayIcon className="w-6 h-6 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-black text-gray-900">{gig.creator}</h4>
                                <div className="flex items-center gap-2">
                                  <StarIcon className="w-4 h-4 text-yellow-500" />
                                  <span className="text-sm font-medium text-gray-600">{gig.rating}</span>
                                  <span className="text-sm text-gray-500">({gig.reviews} reviews)</span>
                                </div>
                              </div>
                            </div>
                            {gig.verified && (
                              <CheckCircleIcon className="w-5 h-5 text-green-600" />
                            )}
                          </div>

                          <h3 className="text-xl font-black text-gray-900 mb-3">{gig.title}</h3>
                          
                          <div className="flex items-center gap-2 mb-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-bold border-2 backdrop-blur-sm ${getCategoryColor(gig.category)}`}>
                              {categories.find(c => c.id === gig.category)?.name || gig.category}
                            </span>
                            {gig.bestseller && (
                              <span className="px-2 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-xs font-bold text-green-700 backdrop-blur-sm">
                                BESTSELLER
                              </span>
                            )}
                          </div>

                          <p className="text-gray-600 mb-6 leading-relaxed text-sm line-clamp-3">{gig.description}</p>

                          <div className="space-y-2 mb-4">
                            <p className="text-xs font-bold text-gray-700">Key Requirements:</p>
                            {gig.requirements.slice(0, 2).map((req, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                                <CheckCircleIcon className="w-3 h-3 text-green-500" />
                                <span>{req}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <p className="text-sm text-gray-500">Price</p>
                              <p className="text-2xl font-black text-gray-900">₹{gig.price.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Delivery</p>
                              <p className="text-lg font-bold text-gray-900">{gig.deliveryTime}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Orders</p>
                              <p className="text-lg font-bold text-gray-900">{gig.completedOrders}</p>
                            </div>
                          </div>

                          <GlassButton variant="primary" size="md" onClick={() => {}} className="w-full">
                            Order Now
                          </GlassButton>
                        </GlassCard>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Empty State */}
                {sortedGigs.length === 0 && (
                  <GlassCard variant="floating" className="p-12 text-center">
                    <div className="w-24 h-24 bg-gray-500/20 border-2 border-gray-500/30 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                      <GiftIcon className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-4">No gigs found</h3>
                    <p className="text-gray-600 mb-8">Try adjusting your search or filter criteria</p>
                  </GlassCard>
                )}
              </div>
            )}

            {/* My Gigs Tab */}
            {activeTab === 'my-gigs' && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-3xl font-black text-gray-900">My Gigs</h3>
                  <GlassButton variant="primary" size="md" onClick={() => setActiveTab('create')}>
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Create New Gig
                  </GlassButton>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {myGigs.map((gig, index) => (
                    <motion.div
                      key={gig.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <GlassCard variant="elevated" className="p-8 hover:scale-[1.02] transition-transform duration-200">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <div className="flex items-center gap-3 mb-3">
                              <h4 className="text-2xl font-black text-gray-900">{gig.title}</h4>
                              <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 backdrop-blur-sm ${getStatusColor(gig.status)}`}>
                                {gig.status.toUpperCase()}
                              </span>
                            </div>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold border-2 backdrop-blur-sm ${getCategoryColor(gig.category)}`}>
                              {categories.find(c => c.id === gig.category)?.name || gig.category}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-6">
                          <div>
                            <p className="text-sm text-gray-500 font-medium mb-1">Price</p>
                            <p className="text-xl font-black text-gray-900">₹{gig.price.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 font-medium mb-1">Total Orders</p>
                            <p className="text-xl font-black text-gray-900">{gig.orders}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 font-medium mb-1">Rating</p>
                            <div className="flex items-center gap-1">
                              <StarIcon className="w-4 h-4 text-yellow-500" />
                              <span className="font-bold text-gray-900">{gig.rating}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 font-medium mb-1">Total Earnings</p>
                            <p className="text-xl font-black text-green-600">₹{gig.earnings.toLocaleString()}</p>
                          </div>
                        </div>

                        {/* Performance Metrics */}
                        <div className="mb-6 space-y-3">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium text-gray-600">Views</span>
                              <span className="text-sm font-bold text-gray-900">{gig.views}</span>
                            </div>
                            <ProgressBar progress={(gig.views / 2500) * 100} variant="linear" color="primary" size="sm" showLabel={false} />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium text-gray-600">Conversion Rate</span>
                              <span className="text-sm font-bold text-gray-900">{gig.conversionRate}%</span>
                            </div>
                            <ProgressBar progress={gig.conversionRate * 10} variant="linear" color="success" size="sm" showLabel={false} />
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <GlassButton variant="secondary" size="sm" onClick={() => {}} className="flex-1">
                            <ChartBarIcon className="w-4 h-4 mr-2" />
                            Analytics
                          </GlassButton>
                          <GlassButton variant="tertiary" size="sm" onClick={() => {}} className="flex-1">
                            <PencilIcon className="w-4 h-4 mr-2" />
                            Edit Gig
                          </GlassButton>
                          {gig.status === 'active' ? (
                            <GlassButton variant="secondary" gradient="creator" size="sm" onClick={() => {}}>
                              Pause
                            </GlassButton>
                          ) : (
                            <GlassButton variant="primary" size="sm" onClick={() => {}}>
                              Activate
                            </GlassButton>
                          )}
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Create Gig Tab */}
            {activeTab === 'create' && (
              <div>
                <h3 className="text-3xl font-black text-gray-900 mb-8">Create New Gig</h3>
                
                <div className="max-w-3xl mx-auto">
                  <GlassCard variant="elevated" className="p-6 mb-8 border-2 border-blue-500/30">
                    <div className="flex items-center gap-3">
                      <SparklesIcon className="w-6 h-6 text-blue-600" />
                      <p className="text-blue-800 font-medium">
                        Create a service that brands can purchase instantly. Set your price, delivery time, and requirements.
                      </p>
                    </div>
                  </GlassCard>

                  <GlassCard variant="elevated" className="p-8">
                    <form className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Gig Title *
                        </label>
                        <GlassInput
                          type="text"
                          placeholder="e.g., Professional Product Review Video"
                          size="md"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Category *
                        </label>
                        <GlassCard variant="floating" className="p-0">
                          <select className="w-full px-4 py-3 bg-transparent border-none focus:ring-0 focus:outline-none font-medium text-gray-700">
                            <option value="">Select category</option>
                            {categories.filter(c => c.id !== 'all').map(cat => (
                              <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                          </select>
                        </GlassCard>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Description *
                        </label>
                        <textarea
                          rows={4}
                          className="w-full px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border-2 border-white/20 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 transition-all duration-300"
                          placeholder="Describe what you'll deliver..."
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            Price (₹) *
                          </label>
                          <GlassInput
                            type="number"
                            placeholder="15000"
                            size="md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            Delivery Time *
                          </label>
                          <GlassInput
                            type="text"
                            placeholder="3 days"
                            size="md"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Requirements
                        </label>
                        <textarea
                          rows={3}
                          className="w-full px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border-2 border-white/20 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 transition-all duration-300"
                          placeholder="List what the brand needs to provide..."
                        />
                      </div>

                      <div className="flex gap-4 pt-4">
                        <GlassButton
                          variant="tertiary"
                          size="md"
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab('my-gigs');
                          }}
                          className="flex-1"
                        >
                          Cancel
                        </GlassButton>
                        <GlassButton
                          variant="primary"
                          size="md"
                          onClick={async (e) => {
                            e.preventDefault();
                            const confirmed = await openConfirm({
                              title: 'Create Gig',
                              message: 'Are you sure you want to publish this gig?',
                              confirmText: 'Publish',
                              cancelText: 'Cancel',
                            });
                            if (confirmed) {
                              openSuccess({
                                message: 'Gig created successfully! It will be visible to brands after review.',
                                title: 'Gig Created',
                                onButtonClick: () => setActiveTab('my-gigs'),
                              });
                            }
                          }}
                          className="flex-1"
                        >
                          <span>Create Gig</span>
                          <ArrowRightIcon className="w-4 h-4 ml-2" />
                        </GlassButton>
                      </div>
                    </form>
                  </GlassCard>
                </div>
              </div>
            )}
          </div>
        </GlassCard>
      </div>

      {/* Floating Navigation */}
      <FloatingNav userType="creator" />
    </div>
  );
}

export default function GigsMarketplace() {
  return (
    <DashboardLayout userType="creator" userName="Creator Name" userEmail="creator@example.com">
      <GigsMarketplaceContent />
    </DashboardLayout>
  );
}
