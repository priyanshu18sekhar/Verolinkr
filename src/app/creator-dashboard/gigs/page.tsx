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
  PlayIcon,
  PhotoIcon,
  ChartBarIcon,
  PencilIcon,
  XMarkIcon,
  SparklesIcon,
  BoltIcon,
  DocumentTextIcon,
  Squares2X2Icon,
  ListBulletIcon,
  AdjustmentsHorizontalIcon,
  ChartPieIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  HeartIcon,
  ShareIcon,
  ChatBubbleLeftRightIcon,
  CubeIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import FloatingNav from '../../../componets/ui/FloatingNav';
import DashboardLayout from '../../../components/layout/DashboardLayout';

function GigsMarketplaceContent() {
  const [activeTab, setActiveTab] = useState<'browse' | 'my-gigs' | 'create'>('browse');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', type: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favoriteGigs, setFavoriteGigs] = useState<number[]>([]);
  
  // Gig Builder States
  const [gigTitle, setGigTitle] = useState('');
  const [gigCategory, setGigCategory] = useState('');
  const [gigDescription, setGigDescription] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [packages, setPackages] = useState({
    basic: { name: 'Basic', price: 15000, delivery: 3, revisions: 1, features: ['1 Video', 'HD Quality', 'Background Music'] },
    standard: { name: 'Standard', price: 25000, delivery: 5, revisions: 2, features: ['2 Videos', '4K Quality', 'Professional Editing', 'Color Grading'] },
    premium: { name: 'Premium', price: 40000, delivery: 7, revisions: 3, features: ['3 Videos', '4K Quality', 'Pro Editing', 'Custom Graphics', 'Fast Delivery'] }
  });
  const [faqs, setFaqs] = useState<{question: string; answer: string}[]>([]);
  const [showPricingCalc, setShowPricingCalc] = useState(false);

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: 'all', name: 'All Gigs', count: 156, icon: GiftIcon, color: 'bg-black' },
    { id: 'fashion', name: 'Fashion & Beauty', count: 45, icon: SparklesIcon, color: 'bg-gray-800' },
    { id: 'tech', name: 'Technology', count: 32, icon: RocketLaunchIcon, color: 'bg-gray-700' },
    { id: 'food', name: 'Food & Cooking', count: 28, icon: TagIcon, color: 'bg-gray-600' },
    { id: 'fitness', name: 'Fitness & Wellness', count: 25, icon: BoltIcon, color: 'bg-gray-500' },
    { id: 'travel', name: 'Travel & Lifestyle', count: 26, icon: PhotoIcon, color: 'bg-gray-800' }
  ];

  const templates = [
    { id: 'product-review', name: 'Product Review Video', category: 'fashion', description: 'Professional product unboxing and review', estimatedPrice: 18000, icon: PlayIcon },
    { id: 'tutorial', name: 'Tutorial Video', category: 'tech', description: 'Step-by-step tutorial content', estimatedPrice: 22000, icon: DocumentTextIcon },
    { id: 'unboxing', name: 'Unboxing Experience', category: 'tech', description: 'Exciting unboxing with reactions', estimatedPrice: 16000, icon: CubeIcon },
    { id: 'recipe', name: 'Recipe Video', category: 'food', description: 'Cooking demonstration with ingredients', estimatedPrice: 14000, icon: TagIcon },
    { id: 'workout', name: 'Workout Routine', category: 'fitness', description: 'Fitness training video', estimatedPrice: 12000, icon: BoltIcon },
    { id: 'lookbook', name: 'Fashion Lookbook', category: 'fashion', description: 'Styled outfit showcase', estimatedPrice: 20000, icon: SparklesIcon }
  ];

  const availableGigs = [
    {
      id: 1,
      title: 'Professional Skincare Review',
      creator: 'Sarah Johnson',
      creatorImage: 'SJ',
      category: 'fashion',
      packages: {
        basic: { price: 15000, delivery: '3 days', features: ['1 Instagram Video', '60 sec duration', '1 Revision'] },
        standard: { price: 25000, delivery: '5 days', features: ['1 YouTube Video + 3 Stories', '3-5 min duration', '2 Revisions', 'Professional Editing'] },
        premium: { price: 40000, delivery: '7 days', features: ['Full Campaign', 'Multiple Platforms', 'Unlimited Revisions', 'Priority Support'] }
      },
      rating: 4.9,
      reviews: 127,
      totalOrders: 89,
      description: 'Professional skincare product review with authentic testing and honest feedback. I\'ll create engaging content that resonates with your target audience.',
      requirements: ['Product sample', 'Brand guidelines', 'Content calendar'],
      deliverables: ['HD Video', 'Raw Footage', 'Social Media Kit'],
      skills: ['Video Production', 'Skincare Expert', 'Social Media'],
      responseTime: '2 hours',
      verified: true,
      featured: true,
      bestseller: true,
      level: 'Top Rated',
      completionRate: 100,
      testimonials: [
        { author: 'BeautyBrand', rating: 5, text: 'Amazing quality and professionalism!' },
        { author: 'GlowCo', rating: 5, text: 'Exceeded expectations. Will hire again!' }
      ]
    },
    {
      id: 2,
      title: 'Tech Gadget Unboxing & Review',
      creator: 'Mike Chen',
      creatorImage: 'MC',
      category: 'tech',
      packages: {
        basic: { price: 20000, delivery: '4 days', features: ['Unboxing Video', '1080p Quality', '1 Revision'] },
        standard: { price: 35000, delivery: '6 days', features: ['Full Review Video', '4K Quality', '2 Revisions', 'B-Roll Footage'] },
        premium: { price: 55000, delivery: '8 days', features: ['Complete Campaign', 'Multi-angle Shots', '3 Revisions', 'Motion Graphics'] }
      },
      rating: 4.8,
      reviews: 203,
      totalOrders: 156,
      description: 'Detailed tech product reviews with feature highlights, hands-on testing, and honest recommendations.',
      requirements: ['Product sample', 'Technical specs', 'Target audience info'],
      deliverables: ['4K Video', 'Thumbnail Design', 'Product Photos'],
      skills: ['Tech Reviews', '4K Video', 'Motion Graphics'],
      responseTime: '1 hour',
      verified: true,
      featured: true,
      bestseller: false,
      level: 'Level 2',
      completionRate: 98,
      testimonials: [
        { author: 'TechGiant', rating: 5, text: 'Best tech reviewer we\'ve worked with!' }
      ]
    },
    {
      id: 3,
      title: 'Recipe Video Creation',
      creator: 'Emma Wilson',
      creatorImage: 'EW',
      category: 'food',
      packages: {
        basic: { price: 12000, delivery: '2 days', features: ['Simple Recipe Video', 'HD Quality', '1 Revision'] },
        standard: { price: 20000, delivery: '4 days', features: ['Detailed Tutorial', 'Ingredient List', '2 Revisions'] },
        premium: { price: 32000, delivery: '6 days', features: ['Professional Video', 'Recipe Card Design', '3 Revisions'] }
      },
      rating: 4.9,
      reviews: 89,
      totalOrders: 67,
      description: 'Beautiful recipe videos with step-by-step instructions, perfect for food brands and restaurants.',
      requirements: ['Recipe details', 'Ingredient list', 'Cooking time'],
      deliverables: ['Recipe Video', 'Recipe Card', 'Ingredient Photos'],
      skills: ['Food Photography', 'Recipe Development', 'Video Editing'],
      responseTime: '3 hours',
      verified: true,
      featured: false,
      bestseller: true,
      level: 'Level 1',
      completionRate: 100,
      testimonials: [
        { author: 'FoodBrand', rating: 5, text: 'Delicious content that drives sales!' }
      ]
    }
  ];

  const myGigs = [
    {
      id: 1,
      title: 'Fashion Lookbook Creation',
      category: 'fashion',
      packages: 3,
      status: 'active',
      orders: 23,
      inQueue: 3,
      rating: 4.8,
      lastOrder: '2 days ago',
      earnings: 414000,
      views: 1250,
      clicks: 245,
      conversionRate: 19.6,
      impressions: 4580,
      avgDelivery: '2.3 days',
      reviewCount: 18,
      repeatCustomers: 12
    },
    {
      id: 2,
      title: 'Fitness Routine Video',
      category: 'fitness',
      packages: 3,
      status: 'paused',
      orders: 15,
      inQueue: 0,
      rating: 4.9,
      lastOrder: '1 week ago',
      earnings: 210000,
      views: 890,
      clicks: 156,
      conversionRate: 17.5,
      impressions: 2340,
      avgDelivery: '1.9 days',
      reviewCount: 12,
      repeatCustomers: 8
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  const toggleFavorite = (gigId: number) => {
    setFavoriteGigs(prev => 
      prev.includes(gigId) ? prev.filter(id => id !== gigId) : [...prev, gigId]
    );
  };

  const filteredGigs = availableGigs.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gig.creator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || gig.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedGigs = [...filteredGigs].sort((a, b) => {
    if (sortBy === 'price_low') return a.packages.basic.price - b.packages.basic.price;
    if (sortBy === 'price_high') return b.packages.basic.price - a.packages.basic.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'popular') return b.totalOrders - a.totalOrders;
    return 0;
  });

  const handleCreateGig = () => {
    setModalContent({
      title: 'Publish Gig',
      message: 'Are you sure you want to publish this gig? It will be reviewed and visible to brands within 24 hours.',
      type: 'create'
    });
    setShowModal(true);
  };

  const confirmAction = () => {
    setShowModal(false);
    if (modalContent.type === 'create') {
      setSuccessMessage('✓ Gig created successfully! It will be visible after review.');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setActiveTab('my-gigs');
    }
  };

  const applyTemplate = (template: typeof templates[0]) => {
    setSelectedTemplate(template.id);
    setGigTitle(template.name);
    setGigCategory(template.category);
    setGigDescription(template.description);
  };

  const calculateSuggestedPrice = () => {
    let basePrice = 10000;
    if (gigCategory === 'tech') basePrice = 15000;
    if (gigCategory === 'fashion') basePrice = 12000;
    if (gigCategory === 'food') basePrice = 8000;
    return { basic: basePrice, standard: basePrice * 1.8, premium: basePrice * 2.5 };
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="h-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
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
                    className="flex-1 px-4 py-3 bg-black text-white rounded-lg font-semibold text-[14px] hover:bg-gray-900 transition-all duration-200"
                    onClick={confirmAction}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Confirm
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
                Create service packages and sell your expertise instantly to brands worldwide
              </p>
            </div>
            <motion.button
              className="bg-black text-white px-6 py-3 rounded-full text-[13px] font-bold hover:bg-gray-900 transition-all duration-200"
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
                { id: 'create', label: 'Gig Builder', icon: RocketLaunchIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'browse' | 'my-gigs' | 'create')}
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
                        placeholder="Search gigs by title or creator..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black text-[14px] font-medium text-black transition-all duration-200"
                      />
                    </div>
                    <div className="flex gap-2">
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
                      
                      <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
                        <motion.button
                          onClick={() => setViewMode('grid')}
                          className={`p-2 rounded ${viewMode === 'grid' ? 'bg-black text-white' : 'text-gray-600 hover:bg-white'}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Squares2X2Icon className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          onClick={() => setViewMode('list')}
                          className={`p-2 rounded ${viewMode === 'list' ? 'bg-black text-white' : 'text-gray-600 hover:bg-white'}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ListBulletIcon className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
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

                {/* Gigs Grid/List */}
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'space-y-6'}>
                  {sortedGigs.map((gig, index) => (
                    <motion.div
                      key={gig.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border-2 border-gray-200 rounded-lg hover:border-black transition-all duration-200 overflow-hidden"
                    >
                      {/* Gig Header */}
                      <div className="p-6 border-b border-gray-200 bg-gray-50">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg">
                              {gig.creatorImage}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-[20px] font-black text-black">{gig.title}</h3>
                                {gig.verified && <ShieldCheckIcon className="w-5 h-5 text-black" />}
                              </div>
                              <p className="text-[13px] text-gray-600 font-medium">by {gig.creator}</p>
                              <div className="flex items-center gap-3 mt-2">
                                <div className="flex items-center gap-1">
                                  <StarIconSolid className="w-4 h-4 text-black" />
                                  <span className="text-[13px] font-bold text-black">{gig.rating}</span>
                                  <span className="text-[13px] text-gray-600">({gig.reviews})</span>
                                </div>
                                <span className="px-2 py-1 bg-black text-white rounded text-[10px] font-bold uppercase">
                                  {gig.level}
                                </span>
                              </div>
                            </div>
                          </div>
                          <motion.button
                            onClick={() => toggleFavorite(gig.id)}
                            className="p-2 hover:bg-white rounded-full transition-all duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {favoriteGigs.includes(gig.id) ? (
                              <HeartIconSolid className="w-6 h-6 text-black" />
                            ) : (
                              <HeartIcon className="w-6 h-6 text-black" />
                            )}
                          </motion.button>
                        </div>

                        {gig.featured && (
                          <div className="flex gap-2 mb-2">
                            <span className="px-2 py-1 bg-black text-white rounded text-[10px] font-bold uppercase">
                              ⚡ FEATURED
                            </span>
                            {gig.bestseller && (
                              <span className="px-2 py-1 bg-gray-200 text-black rounded text-[10px] font-bold uppercase">
                                🔥 BESTSELLER
                              </span>
                            )}
                          </div>
                        )}

                        <p className="text-[14px] text-gray-700 leading-relaxed mb-4">{gig.description}</p>
                        
                        {/* Stats */}
                        <div className="flex items-center gap-6 text-[12px] text-gray-600">
                          <span className="flex items-center gap-1">
                            <CheckCircleIcon className="w-4 h-4" />
                            {gig.totalOrders} orders
                          </span>
                          <span className="flex items-center gap-1">
                            <ClockIcon className="w-4 h-4" />
                            {gig.responseTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <ChartBarIcon className="w-4 h-4" />
                            {gig.completionRate}%
                          </span>
                        </div>
                      </div>

                      {/* Package Options */}
                      <div className="p-6">
                        <h4 className="text-[14px] font-bold text-black mb-4 uppercase">Choose Your Package</h4>
                        <div className="grid grid-cols-3 gap-4">
                          {Object.entries(gig.packages).map(([key, pkg]) => (
                            <div
                              key={key}
                              className="border-2 border-gray-200 rounded-lg p-4 hover:border-black transition-all duration-200 cursor-pointer"
                            >
                              <div className="text-center mb-3">
                                <p className="text-[11px] font-bold text-gray-600 uppercase mb-2">{key}</p>
                                <p className="text-[24px] font-black text-black leading-none">₹{(pkg.price / 1000).toFixed(0)}K</p>
                                <p className="text-[10px] text-gray-500 mt-1">{pkg.delivery}</p>
                              </div>
                              <div className="space-y-2 mb-4">
                                {pkg.features.map((feature: string, idx: number) => (
                                  <div key={idx} className="flex items-start gap-2">
                                    <CheckCircleIcon className="w-3 h-3 text-black mt-0.5 flex-shrink-0" />
                                    <span className="text-[11px] text-gray-700">{feature}</span>
                                  </div>
                                ))}
                              </div>
                              <motion.button
                                className="w-full bg-black text-white px-3 py-2 rounded-lg font-semibold text-[11px] hover:bg-gray-900 transition-all duration-200"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                Select
                              </motion.button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="px-6 pb-6 flex gap-3">
                        <motion.button
                          className="flex-1 px-4 py-3 bg-white border-2 border-gray-300 text-black rounded-lg font-semibold text-[13px] hover:border-black transition-all duration-200"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          View Details
                        </motion.button>
                        <motion.button
                          className="px-4 py-3 bg-white border-2 border-gray-300 text-black rounded-lg font-semibold text-[13px] hover:border-black transition-all duration-200"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <ChatBubbleLeftRightIcon className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          className="px-4 py-3 bg-white border-2 border-gray-300 text-black rounded-lg font-semibold text-[13px] hover:border-black transition-all duration-200"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <ShareIcon className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* My Gigs Tab */}
            {activeTab === 'my-gigs' && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-[32px] font-black text-black">My Gigs Dashboard</h3>
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

                {/* Performance Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black transition-all duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <CurrencyDollarIcon className="w-6 h-6 text-black" />
                      <ArrowUpIcon className="w-4 h-4 text-black" />
                    </div>
                    <p className="text-[32px] font-black text-black">₹624K</p>
                    <p className="text-[11px] text-gray-500 uppercase">Total Earnings</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black transition-all duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <ChartBarIcon className="w-6 h-6 text-black" />
                      <ArrowUpIcon className="w-4 h-4 text-black" />
                    </div>
                    <p className="text-[32px] font-black text-black">38</p>
                    <p className="text-[11px] text-gray-500 uppercase">Total Orders</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black transition-all duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <StarIcon className="w-6 h-6 text-black" />
                      <ArrowUpIcon className="w-4 h-4 text-black" />
                    </div>
                    <p className="text-[32px] font-black text-black">4.85</p>
                    <p className="text-[11px] text-gray-500 uppercase">Avg Rating</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black transition-all duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <EyeIcon className="w-6 h-6 text-black" />
                      <ArrowUpIcon className="w-4 h-4 text-black" />
                    </div>
                    <p className="text-[32px] font-black text-black">2.1K</p>
                    <p className="text-[11px] text-gray-500 uppercase">Total Views</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {myGigs.map((gig, index) => (
                    <motion.div
                      key={gig.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black transition-all duration-200"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-[24px] font-black text-black">{gig.title}</h4>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${
                              gig.status === 'active' 
                                ? 'bg-black text-white border-black' 
                                : 'bg-gray-100 text-gray-700 border-gray-200'
                            }`}>
                              {gig.status}
                            </span>
                            {gig.inQueue > 0 && (
                              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-gray-100 border border-gray-200 text-black">
                                {gig.inQueue} in queue
                              </span>
                            )}
                          </div>
                          <p className="text-[13px] text-gray-600">{gig.packages} packages • Last order: {gig.lastOrder}</p>
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            className="px-4 py-2 bg-white border-2 border-gray-300 text-black rounded-lg font-semibold text-[13px] hover:border-black transition-all duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <PencilIcon className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            className="px-4 py-2 bg-white border-2 border-gray-300 text-black rounded-lg font-semibold text-[13px] hover:border-black transition-all duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <ChartBarIcon className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                        <div>
                          <p className="text-[11px] text-gray-500 font-medium mb-1 uppercase">Earnings</p>
                          <p className="text-[24px] font-black text-black">₹{(gig.earnings / 1000).toFixed(0)}K</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-500 font-medium mb-1 uppercase">Orders</p>
                          <p className="text-[24px] font-black text-black">{gig.orders}</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-500 font-medium mb-1 uppercase">Rating</p>
                          <div className="flex items-center gap-1">
                            <StarIconSolid className="w-5 h-5 text-black" />
                            <p className="text-[24px] font-black text-black">{gig.rating}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-500 font-medium mb-1 uppercase">Conversion</p>
                          <p className="text-[24px] font-black text-black">{gig.conversionRate}%</p>
                        </div>
                      </div>

                      {/* Advanced Metrics */}
                      <div className="grid grid-cols-4 gap-6 pt-6 border-t border-gray-200">
                        <div>
                          <p className="text-[11px] text-gray-500 uppercase mb-2">Impressions</p>
                          <p className="text-[18px] font-black text-black">{gig.impressions.toLocaleString()}</p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div className="bg-black h-2 rounded-full" style={{ width: '75%' }} />
                          </div>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-500 uppercase mb-2">Clicks</p>
                          <p className="text-[18px] font-black text-black">{gig.clicks}</p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div className="bg-black h-2 rounded-full" style={{ width: '65%' }} />
                          </div>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-500 uppercase mb-2">Repeat Customers</p>
                          <p className="text-[18px] font-black text-black">{gig.repeatCustomers}</p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div className="bg-black h-2 rounded-full" style={{ width: '52%' }} />
                          </div>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-500 uppercase mb-2">Avg Delivery</p>
                          <p className="text-[18px] font-black text-black">{gig.avgDelivery}</p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div className="bg-black h-2 rounded-full" style={{ width: '90%' }} />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-6">
                        <motion.button
                          className="px-6 py-3 bg-black text-white rounded-lg font-semibold text-[13px] hover:bg-gray-900 transition-all duration-200"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Edit Gig
                        </motion.button>
                        {gig.status === 'active' ? (
                          <motion.button
                            className="px-6 py-3 bg-white border-2 border-gray-300 text-black rounded-lg font-semibold text-[13px] hover:border-black transition-all duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Pause Gig
                          </motion.button>
                        ) : (
                          <motion.button
                            className="px-6 py-3 bg-white border-2 border-black text-black rounded-lg font-semibold text-[13px] hover:bg-black hover:text-white transition-all duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Activate Gig
                          </motion.button>
                        )}
                        <motion.button
                          className="px-6 py-3 bg-white border-2 border-gray-300 text-black rounded-lg font-semibold text-[13px] hover:border-black transition-all duration-200"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          View Analytics
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Gig Builder Tab */}
            {activeTab === 'create' && (
              <div>
                <h3 className="text-[32px] font-black text-black mb-4">Gig Builder</h3>
                <p className="text-[14px] text-gray-600 mb-8">Create professional service packages with our interactive gig builder</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Builder Form */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Template Selection */}
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <LightBulbIcon className="w-6 h-6 text-black" />
                        <h4 className="text-[18px] font-black text-black">Start with a Template</h4>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {templates.map((template) => {
                          const Icon = template.icon;
                          return (
                            <motion.button
                              key={template.id}
                              onClick={() => applyTemplate(template)}
                              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                                selectedTemplate === template.id
                                  ? 'bg-black text-white border-black'
                                  : 'bg-white border-gray-200 hover:border-black'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Icon className={`w-6 h-6 mb-2 ${selectedTemplate === template.id ? 'text-white' : 'text-black'}`} />
                              <p className="text-[12px] font-bold mb-1">{template.name}</p>
                              <p className={`text-[10px] ${selectedTemplate === template.id ? 'text-gray-300' : 'text-gray-600'}`}>
                                ₹{(template.estimatedPrice / 1000).toFixed(0)}K
                              </p>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Basic Info */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h4 className="text-[18px] font-black text-black mb-6">Gig Details</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase tracking-wider">
                            Gig Title *
                          </label>
                          <input
                            type="text"
                            placeholder="I will create a professional product review video"
                            value={gigTitle}
                            onChange={(e) => setGigTitle(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black text-[14px] font-medium text-black transition-all duration-200"
                          />
                          <p className="text-[11px] text-gray-500 mt-1">{gigTitle.length}/80 characters</p>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase tracking-wider">
                            Category *
                          </label>
                          <select
                            value={gigCategory}
                            onChange={(e) => setGigCategory(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black text-[14px] font-medium text-black transition-all duration-200"
                          >
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
                            rows={6}
                            value={gigDescription}
                            onChange={(e) => setGigDescription(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black text-[14px] font-medium text-black transition-all duration-200"
                            placeholder="Describe what you'll deliver, your process, and why clients should choose you..."
                          />
                          <p className="text-[11px] text-gray-500 mt-1">{gigDescription.length}/1200 characters</p>
                        </div>
                      </div>
                    </div>

                    {/* Package Builder */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h4 className="text-[18px] font-black text-black">Package Pricing</h4>
                        <motion.button
                          onClick={() => setShowPricingCalc(!showPricingCalc)}
                          className="px-4 py-2 bg-gray-100 border border-gray-200 text-black rounded-lg font-semibold text-[11px] hover:border-black transition-all duration-200"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <ChartPieIcon className="w-4 h-4 inline mr-1" />
                          Pricing Calculator
                        </motion.button>
                      </div>

                      {showPricingCalc && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                          <p className="text-[13px] font-bold text-black mb-2">Suggested Pricing</p>
                          <p className="text-[11px] text-gray-600 mb-3">Based on your category and experience:</p>
                          <div className="grid grid-cols-3 gap-4">
                            {Object.entries(calculateSuggestedPrice()).map(([key, value]) => (
                              <div key={key} className="bg-white border border-gray-200 rounded p-3">
                                <p className="text-[10px] text-gray-500 uppercase mb-1">{key}</p>
                                <p className="text-[20px] font-black text-black">₹{(value / 1000).toFixed(0)}K</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Object.entries(packages).map(([key, pkg]) => (
                          <div key={key} className="border-2 border-gray-200 rounded-lg p-4 hover:border-black transition-all duration-200">
                            <h5 className="text-[14px] font-black text-black mb-4 uppercase">{pkg.name}</h5>
                            <div className="space-y-3 mb-4">
                              <div>
                                <label className="block text-[10px] text-gray-500 uppercase mb-1">Price (₹)</label>
                                <input
                                  type="number"
                                  value={pkg.price}
                                  onChange={(e) => setPackages({...packages, [key]: {...pkg, price: Number(e.target.value)}})}
                                  className="w-full px-3 py-2 rounded border border-gray-200 focus:border-black text-[13px] font-bold"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] text-gray-500 uppercase mb-1">Delivery (days)</label>
                                <input
                                  type="number"
                                  value={pkg.delivery}
                                  onChange={(e) => setPackages({...packages, [key]: {...pkg, delivery: Number(e.target.value)}})}
                                  className="w-full px-3 py-2 rounded border border-gray-200 focus:border-black text-[13px] font-bold"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] text-gray-500 uppercase mb-1">Revisions</label>
                                <input
                                  type="number"
                                  value={pkg.revisions}
                                  onChange={(e) => setPackages({...packages, [key]: {...pkg, revisions: Number(e.target.value)}})}
                                  className="w-full px-3 py-2 rounded border border-gray-200 focus:border-black text-[13px] font-bold"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              {pkg.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <CheckCircleIcon className="w-3 h-3 text-black" />
                                  <span className="text-[11px] text-gray-700">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* FAQ Builder */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h4 className="text-[18px] font-black text-black">Frequently Asked Questions</h4>
                        <motion.button
                          onClick={() => setFaqs([...faqs, { question: '', answer: '' }])}
                          className="px-4 py-2 bg-black text-white rounded-lg font-semibold text-[11px] hover:bg-gray-900 transition-all duration-200"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <PlusIcon className="w-4 h-4 inline mr-1" />
                          Add FAQ
                        </motion.button>
                      </div>
                      <div className="space-y-4">
                        {faqs.map((faq, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <div className="flex-1 space-y-3">
                                <input
                                  type="text"
                                  placeholder="Question"
                                  value={faq.question}
                                  onChange={(e) => {
                                    const newFaqs = [...faqs];
                                    newFaqs[index].question = e.target.value;
                                    setFaqs(newFaqs);
                                  }}
                                  className="w-full px-3 py-2 rounded border border-gray-200 focus:border-black text-[13px] font-bold"
                                />
                                <textarea
                                  rows={2}
                                  placeholder="Answer"
                                  value={faq.answer}
                                  onChange={(e) => {
                                    const newFaqs = [...faqs];
                                    newFaqs[index].answer = e.target.value;
                                    setFaqs(newFaqs);
                                  }}
                                  className="w-full px-3 py-2 rounded border border-gray-200 focus:border-black text-[13px]"
                                />
                              </div>
                              <motion.button
                                onClick={() => setFaqs(faqs.filter((_, i) => i !== index))}
                                className="p-2 hover:bg-gray-100 rounded transition-all duration-200"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <XMarkIcon className="w-5 h-5 text-gray-600" />
                              </motion.button>
                            </div>
                          </div>
                        ))}
                        {faqs.length === 0 && (
                          <p className="text-center text-gray-500 text-[13px] py-4">No FAQs added yet</p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-4">
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
                        className="flex-1 px-6 py-3 bg-black text-white rounded-lg font-semibold text-[13px] hover:bg-gray-900 transition-all duration-200"
                        onClick={handleCreateGig}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10 flex items-center justify-center space-x-2">
                          <span>Publish Gig</span>
                          <ArrowRightIcon className="w-4 h-4" />
                        </span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Live Preview */}
                  <div className="lg:col-span-1">
                    <div className="sticky top-8">
                      <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <EyeIcon className="w-5 h-5 text-black" />
                          <h4 className="text-[14px] font-black text-black">Live Preview</h4>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <p className="text-[16px] font-black text-black mb-2">{gigTitle || 'Your Gig Title'}</p>
                          <p className="text-[11px] text-gray-600 mb-3">{gigCategory || 'Category'}</p>
                          <p className="text-[12px] text-gray-700 leading-relaxed mb-4">
                            {gigDescription || 'Your gig description will appear here...'}
                          </p>
                          <div className="border-t border-gray-200 pt-3">
                            <p className="text-[10px] font-bold text-gray-600 uppercase mb-2">Packages</p>
                            <div className="space-y-2">
                              {Object.entries(packages).map(([key, pkg]) => (
                                <div key={key} className="flex justify-between items-center text-[11px]">
                                  <span className="font-bold text-black">{pkg.name}</span>
                                  <span className="text-black">₹{(pkg.price / 1000).toFixed(0)}K • {pkg.delivery}d</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

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
