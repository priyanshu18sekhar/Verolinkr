'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  SparklesIcon,
  BoltIcon
} from '@heroicons/react/24/outline';
import FloatingNav from '../../../componets/ui/FloatingNav';
import DashboardLayout from '../../../components/layout/DashboardLayout';

function GigsMarketplaceContent() {
  const [activeTab, setActiveTab] = useState<'browse' | 'my-gigs' | 'create'>('browse');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

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
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  const getCategoryColor = (category: string) => {
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'paused': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'draft': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
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

  const handleCreateGig = () => {
    setModalContent({
      title: 'Create Gig',
      message: 'Are you sure you want to publish this gig? It will be visible to brands after review.'
    });
    setShowModal(true);
  };

  const confirmCreate = () => {
    setShowModal(false);
    setSuccessMessage('✓ Gig created successfully! It will be visible to brands after review.');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setActiveTab('my-gigs');
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
      <div className="bg-white border border-gray-200 rounded-lg mb-8">
        <div className="h-16 bg-gray-200 rounded-t-lg"></div>
        <div className="p-8 space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
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
      {/* Confirmation Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="bg-white border-2 border-black rounded-lg p-8 max-w-md w-full shadow-2xl">
                <h3 className="text-[24px] font-black text-black mb-4">{modalContent.title}</h3>
                <p className="text-[14px] text-gray-700 mb-6">{modalContent.message}</p>
                <div className="flex gap-3">
                  <motion.button
                    className="flex-1 px-4 py-3 bg-white border-2 border-gray-300 text-black rounded-lg font-semibold text-[14px] hover:border-black transition-all duration-200"
                    onClick={() => setShowModal(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    className="flex-1 px-4 py-3 bg-black text-white rounded-lg font-semibold text-[14px] hover:bg-gray-900 transition-all duration-200 premium-glow-button"
                    onClick={confirmCreate}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Publish
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed top-8 right-8 z-50"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white border-2 border-black rounded-lg p-4 shadow-xl min-w-[300px]">
              <p className="text-[14px] font-bold text-black">{successMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        className="bg-white border-b border-gray-200"
        {...fadeInUp}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto">
          <div className="flex justify-between items-start py-8">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                  <GiftIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-[48px] md:text-[56px] font-black text-black tracking-tighter leading-none">
                    Gigs Marketplace
                  </h1>
                </div>
              </div>
              <p className="text-[14px] text-gray-600 font-normal max-w-lg">
                Buy and sell pre-defined creator services instantly
              </p>
            </div>
            <motion.button
              className="bg-black text-white px-6 py-3 rounded-full text-[13px] font-bold hover:bg-gray-900 transition-all duration-200 premium-glow-button"
              onClick={() => setActiveTab('create')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <PlusIcon className="w-4 h-4" />
                <span>Create Gig</span>
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="w-full px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto py-8">
        {/* Tab Navigation */}
        <motion.div
          className="bg-white rounded-lg border border-gray-200 mb-8"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'browse', label: 'Browse Gigs', icon: EyeIcon },
                { id: 'my-gigs', label: 'My Gigs', icon: GiftIcon },
                { id: 'create', label: 'Create Gig', icon: PlusIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-semibold text-[13px] flex items-center space-x-2 transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
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
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative">
                      <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                      <input
                        type="text"
                        placeholder="Search gigs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black text-[14px] font-medium text-black transition-all duration-200"
                      />
                    </div>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black text-[14px] font-medium text-black transition-all duration-200"
                    >
                      <option value="popular">Most Popular</option>
                      <option value="rating">Highest Rated</option>
                      <option value="price_low">Price: Low to High</option>
                      <option value="price_high">Price: High to Low</option>
                    </select>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="mb-8">
                  <h3 className="text-[24px] font-black text-black mb-6">Browse by Category</h3>
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
                          className={`px-6 py-4 rounded-lg font-bold transition-all duration-200 flex items-center gap-3 border ${
                            isSelected
                              ? 'bg-black text-white border-black'
                              : 'bg-white text-black border-gray-200 hover:border-black'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-[13px]">{category.name}</span>
                          <span className={`text-[11px] px-2 py-1 rounded-full ${
                            isSelected ? 'bg-white text-black' : 'bg-gray-100 text-gray-700'
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
                      <SparklesIcon className="w-6 h-6 text-black" />
                      <h2 className="text-[32px] font-black text-black">Featured Gigs</h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                      {sortedGigs.filter(g => g.featured).map((gig, index) => (
                        <motion.div
                          key={gig.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white border-2 border-black rounded-lg p-6 hover:shadow-lg transition-all duration-200"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4 flex-1">
                              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                                <PlayIcon className="w-6 h-6 text-black" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="text-[20px] font-black text-black">{gig.title}</h3>
                                  <span className="px-2 py-1 rounded-full bg-gray-100 border border-gray-200 text-[10px] font-bold text-black uppercase">
                                    FEATURED
                                  </span>
                                  {gig.bestseller && (
                                    <span className="px-2 py-1 rounded-full bg-black text-white text-[10px] font-bold uppercase">
                                      BESTSELLER
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-4 text-[13px] text-gray-600">
                                  <span className="flex items-center gap-1">
                                    <UserIcon className="w-4 h-4" />
                                    {gig.creator}
                                  </span>
                                  {gig.verified && (
                                    <span className="flex items-center gap-1 text-black">
                                      <CheckCircleIcon className="w-4 h-4" />
                                      Verified
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mb-4">
                            <p className="text-[14px] text-gray-700 leading-relaxed">{gig.description}</p>
                          </div>

                          <div className="space-y-2 mb-4">
                            <p className="text-[12px] font-bold text-gray-900">Requirements:</p>
                            {gig.requirements.map((req, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-[13px] text-gray-600">
                                <CheckCircleIcon className="w-4 h-4 text-black" />
                                <span>{req}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between mb-4 pt-4 border-t border-gray-200">
                            <div className="flex items-center gap-6">
                              <div>
                                <p className="text-[11px] text-gray-500 uppercase">Price</p>
                                <p className="text-[20px] font-black text-black">₹{gig.price.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-[11px] text-gray-500 uppercase">Delivery</p>
                                <p className="text-[14px] font-bold text-black">{gig.deliveryTime}</p>
                              </div>
                              <div>
                                <p className="text-[11px] text-gray-500 uppercase">Rating</p>
                                <div className="flex items-center gap-1">
                                  <StarIcon className="w-4 h-4 text-black" />
                                  <span className="font-bold text-black text-[14px]">{gig.rating}</span>
                                  <span className="text-gray-600 text-[13px]">({gig.reviews})</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <motion.button
                              className="flex-1 bg-black text-white px-6 py-3 rounded-lg font-semibold text-[13px] hover:bg-gray-900 transition-all duration-200"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Order Now
                            </motion.button>
                            <motion.button
                              className="px-6 py-3 bg-white border-2 border-gray-300 text-black rounded-lg font-semibold text-[13px] hover:border-black transition-all duration-200"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              View Details
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* All Gigs Grid */}
                <div className={sortedGigs.filter(g => g.featured).length > 0 ? 'mt-8' : ''}>
                  {sortedGigs.filter(g => !g.featured).length > 0 && (
                    <h2 className="text-[32px] font-black text-black mb-6">All Gigs</h2>
                  )}
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {sortedGigs.filter(g => !g.featured).map((gig, index) => (
                      <motion.div
                        key={gig.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black transition-all duration-200"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                              <PlayIcon className="w-5 h-5 text-black" />
                            </div>
                            <div>
                              <h4 className="font-black text-black text-[14px]">{gig.creator}</h4>
                              <div className="flex items-center gap-2">
                                <StarIcon className="w-3 h-3 text-black" />
                                <span className="text-[12px] font-medium text-gray-600">{gig.rating}</span>
                                <span className="text-[12px] text-gray-500">({gig.reviews})</span>
                              </div>
                            </div>
                          </div>
                          {gig.verified && (
                            <CheckCircleIcon className="w-5 h-5 text-black" />
                          )}
                        </div>

                        <h3 className="text-[18px] font-black text-black mb-3">{gig.title}</h3>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <span className={`px-3 py-1 rounded-full text-[12px] font-semibold border ${getCategoryColor(gig.category)}`}>
                            {categories.find(c => c.id === gig.category)?.name || gig.category}
                          </span>
                          {gig.bestseller && (
                            <span className="px-2 py-1 rounded-full bg-black text-white text-[10px] font-bold uppercase">
                              BESTSELLER
                            </span>
                          )}
                        </div>

                        <p className="text-gray-600 mb-4 leading-relaxed text-[13px] line-clamp-3">{gig.description}</p>

                        <div className="space-y-2 mb-4">
                          <p className="text-[11px] font-bold text-gray-700">Key Requirements:</p>
                          {gig.requirements.slice(0, 2).map((req, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-[12px] text-gray-600">
                              <CheckCircleIcon className="w-3 h-3 text-black" />
                              <span>{req}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between mb-4 pt-4 border-t border-gray-200">
                          <div>
                            <p className="text-[11px] text-gray-500 uppercase">Price</p>
                            <p className="text-[20px] font-black text-black">₹{gig.price.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-500 uppercase">Delivery</p>
                            <p className="text-[14px] font-bold text-black">{gig.deliveryTime}</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-500 uppercase">Orders</p>
                            <p className="text-[14px] font-bold text-black">{gig.completedOrders}</p>
                          </div>
                        </div>

                        <motion.button
                          className="w-full bg-black text-white px-6 py-3 rounded-lg font-semibold text-[13px] hover:bg-gray-900 transition-all duration-200"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Order Now
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Empty State */}
                {sortedGigs.length === 0 && (
                  <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-200">
                      <GiftIcon className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-[24px] font-black text-black mb-4">No gigs found</h3>
                    <p className="text-[14px] text-gray-600 mb-8">Try adjusting your search or filter criteria</p>
                  </div>
                )}
              </div>
            )}

            {/* My Gigs Tab */}
            {activeTab === 'my-gigs' && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-[32px] font-black text-black">My Gigs</h3>
                  <motion.button
                    className="bg-black text-white px-6 py-3 rounded-lg font-semibold text-[13px] hover:bg-gray-900 transition-all duration-200"
                    onClick={() => setActiveTab('create')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <PlusIcon className="w-4 h-4 inline mr-2" />
                    Create New Gig
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {myGigs.map((gig, index) => (
                    <motion.div
                      key={gig.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black transition-all duration-200"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-[20px] font-black text-black">{gig.title}</h4>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-semibold border ${getStatusColor(gig.status)} uppercase`}>
                              {gig.status}
                            </span>
                          </div>
                          <span className={`inline-block px-3 py-1 rounded-full text-[12px] font-semibold border ${getCategoryColor(gig.category)}`}>
                            {categories.find(c => c.id === gig.category)?.name || gig.category}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-[11px] text-gray-500 font-medium mb-1 uppercase">Price</p>
                          <p className="text-[18px] font-black text-black">₹{gig.price.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-500 font-medium mb-1 uppercase">Total Orders</p>
                          <p className="text-[18px] font-black text-black">{gig.orders}</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-500 font-medium mb-1 uppercase">Rating</p>
                          <div className="flex items-center gap-1">
                            <StarIcon className="w-4 h-4 text-black" />
                            <span className="font-bold text-black text-[14px]">{gig.rating}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-500 font-medium mb-1 uppercase">Total Earnings</p>
                          <p className="text-[18px] font-black text-black">₹{gig.earnings.toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div className="space-y-2 mb-4 pt-4 border-t border-gray-200">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[12px] font-medium text-gray-600">Views</span>
                            <span className="text-[12px] font-bold text-black">{gig.views}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-black h-2 rounded-full" 
                              style={{ width: `${(gig.views / 2500) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[12px] font-medium text-gray-600">Conversion Rate</span>
                            <span className="text-[12px] font-bold text-black">{gig.conversionRate}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-black h-2 rounded-full" 
                              style={{ width: `${gig.conversionRate * 10}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <motion.button
                          className="flex-1 px-4 py-2 bg-white border-2 border-gray-300 text-black rounded-lg font-semibold text-[13px] hover:border-black transition-all duration-200"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <ChartBarIcon className="w-4 h-4 inline mr-2" />
                          Analytics
                        </motion.button>
                        <motion.button
                          className="flex-1 px-4 py-2 bg-white border-2 border-gray-300 text-black rounded-lg font-semibold text-[13px] hover:border-black transition-all duration-200"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <PencilIcon className="w-4 h-4 inline mr-2" />
                          Edit
                        </motion.button>
                        {gig.status === 'active' ? (
                          <motion.button
                            className="px-4 py-2 bg-white border-2 border-gray-300 text-black rounded-lg font-semibold text-[13px] hover:border-black transition-all duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Pause
                          </motion.button>
                        ) : (
                          <motion.button
                            className="px-4 py-2 bg-black text-white rounded-lg font-semibold text-[13px] hover:bg-gray-900 transition-all duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Activate
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Create Gig Tab */}
            {activeTab === 'create' && (
              <div>
                <h3 className="text-[32px] font-black text-black mb-8">Create New Gig</h3>
                
                <div className="max-w-3xl mx-auto">
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 mb-8">
                    <div className="flex items-center gap-3">
                      <SparklesIcon className="w-6 h-6 text-black" />
                      <p className="text-black font-medium text-[14px]">
                        Create a service that brands can purchase instantly. Set your price, delivery time, and requirements.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-8">
                    <form className="space-y-6">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase tracking-wider">
                          Gig Title *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Professional Product Review Video"
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black text-[14px] font-medium text-black transition-all duration-200"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase tracking-wider">
                          Category *
                        </label>
                        <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black text-[14px] font-medium text-black transition-all duration-200">
                          <option value="">Select category</option>
                          {categories.filter(c => c.id !== 'all').map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase tracking-wider">
                          Description *
                        </label>
                        <textarea
                          rows={4}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black text-[14px] font-medium text-black transition-all duration-200"
                          placeholder="Describe what you'll deliver..."
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase tracking-wider">
                            Price (₹) *
                          </label>
                          <input
                            type="number"
                            placeholder="15000"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black text-[14px] font-medium text-black transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase tracking-wider">
                            Delivery Time *
                          </label>
                          <input
                            type="text"
                            placeholder="3 days"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black text-[14px] font-medium text-black transition-all duration-200"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase tracking-wider">
                          Requirements
                        </label>
                        <textarea
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black text-[14px] font-medium text-black transition-all duration-200"
                          placeholder="List what the brand needs to provide..."
                        />
                      </div>

                      <div className="flex gap-4 pt-4">
                        <motion.button
                          type="button"
                          className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-black rounded-lg font-semibold text-[13px] hover:border-black transition-all duration-200"
                          onClick={() => setActiveTab('my-gigs')}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Cancel
                        </motion.button>
                        <motion.button
                          type="button"
                          className="flex-1 px-6 py-3 bg-black text-white rounded-lg font-semibold text-[13px] hover:bg-gray-900 transition-all duration-200 premium-glow-button"
                          onClick={handleCreateGig}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="relative z-10 flex items-center justify-center space-x-2">
                            <span>Create Gig</span>
                            <ArrowRightIcon className="w-4 h-4" />
                          </span>
                        </motion.button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Floating Navigation */}
      <FloatingNav userType="creator" />
    </motion.div>
  );
}

export default function GigsMarketplace() {
  return (
    <DashboardLayout userType="creator" userName="Creator Name" userEmail="creator@example.com">
      <GigsMarketplaceContent />
    </DashboardLayout>
  );
}
