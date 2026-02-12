'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  HeartIcon,
  StarIcon,
  UserGroupIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  PlusIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowsRightLeftIcon,
  BookmarkIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  FireIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import FloatingNav from '../../../components/ui/FloatingNav';

export default function BrandCreators() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterFollowers, setFilterFollowers] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAIRecs, setShowAIRecs] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const creators = [
    {
      id: 1,
      name: 'Sarah Johnson',
      username: '@sarahj_beauty',
      category: 'beauty',
      followers: 125000,
      engagement: 8.5,
      rating: 4.9,
      location: 'Mumbai, India',
      verified: true,
      authenticityScore: 95,
      completedCampaigns: 45,
      avgDelivery: '2.3 days',
      priceRange: '₹15,000 - ₹50,000',
      bio: 'Beauty influencer with 5+ years experience. Specializes in skincare and makeup tutorials.',
      avatar: '/avatars/sarah.jpg',
      recentWork: ['Skincare Review', 'Makeup Tutorial', 'Brand Collaboration'],
      languages: ['English', 'Hindi'],
      responseTime: '2 hours'
    },
    {
      id: 2,
      name: 'Mike Chen',
      username: '@mike_tech',
      category: 'technology',
      followers: 89000,
      engagement: 12.3,
      rating: 4.8,
      location: 'Bangalore, India',
      verified: true,
      authenticityScore: 92,
      completedCampaigns: 32,
      avgDelivery: '3.1 days',
      priceRange: '₹20,000 - ₹75,000',
      bio: 'Tech reviewer and gadget enthusiast. Deep knowledge of consumer electronics.',
      avatar: '/avatars/mike.jpg',
      recentWork: ['Phone Review', 'Laptop Unboxing', 'Gaming Setup'],
      languages: ['English', 'Tamil'],
      responseTime: '1 hour'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      username: '@emma_foodie',
      category: 'food',
      followers: 156000,
      engagement: 9.8,
      rating: 4.9,
      location: 'Delhi, India',
      verified: true,
      authenticityScore: 98,
      completedCampaigns: 67,
      avgDelivery: '1.8 days',
      priceRange: '₹10,000 - ₹35,000',
      bio: 'Food blogger and recipe creator. Passionate about healthy cooking and food photography.',
      avatar: '/avatars/emma.jpg',
      recentWork: ['Recipe Video', 'Restaurant Review', 'Cooking Tips'],
      languages: ['English', 'Hindi', 'Punjabi'],
      responseTime: '3 hours'
    },
    {
      id: 4,
      name: 'David Kumar',
      username: '@david_fitness',
      category: 'fitness',
      followers: 98000,
      engagement: 11.2,
      rating: 4.7,
      location: 'Chennai, India',
      verified: true,
      authenticityScore: 89,
      completedCampaigns: 28,
      avgDelivery: '2.7 days',
      priceRange: '₹12,000 - ₹45,000',
      bio: 'Fitness trainer and wellness coach. Certified personal trainer with 6 years experience.',
      avatar: '/avatars/david.jpg',
      recentWork: ['Workout Routine', 'Nutrition Tips', 'Fitness Gear Review'],
      languages: ['English', 'Tamil', 'Telugu'],
      responseTime: '4 hours'
    },
    {
      id: 5,
      name: 'Lisa Park',
      username: '@lisa_travel',
      category: 'travel',
      followers: 210000,
      engagement: 7.9,
      rating: 4.8,
      location: 'Goa, India',
      verified: true,
      authenticityScore: 91,
      completedCampaigns: 54,
      avgDelivery: '4.2 days',
      priceRange: '₹18,000 - ₹60,000',
      bio: 'Travel blogger and adventure enthusiast. Explores hidden gems and shares travel tips.',
      avatar: '/avatars/lisa.jpg',
      recentWork: ['Travel Vlog', 'Hotel Review', 'Destination Guide'],
      languages: ['English', 'Hindi', 'Korean'],
      responseTime: '6 hours'
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  const [aiRecommendations] = useState([
    { id: 1, name: 'Sarah Johnson', matchScore: 98, reason: 'Perfect match for beauty campaigns' },
    { id: 3, name: 'Emma Wilson', matchScore: 95, reason: 'High engagement in food category' },
    { id: 2, name: 'Mike Chen', matchScore: 92, reason: 'Strong tech review performance' }
  ]);

  const getCategoryColor = (category: string) => {
    return 'bg-gray-100 text-gray-700';
  };

  const toggleFavorite = (creatorId: number) => {
    setFavorites(prev => 
      prev.includes(creatorId) 
        ? prev.filter(id => id !== creatorId)
        : [...prev, creatorId]
    );
  };

  const toggleCompare = (creatorId: number) => {
    if (selectedForCompare.includes(creatorId)) {
      setSelectedForCompare(prev => prev.filter(id => id !== creatorId));
    } else if (selectedForCompare.length < 3) {
      setSelectedForCompare(prev => [...prev, creatorId]);
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
            <div className="h-12 w-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-shimmer bg-[length:200%_100%]"></div>
          </div>
        </div>
      </div>

      {/* Filters Skeleton */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer bg-[length:200%_100%]"></div>
          </div>
          <div className="flex gap-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer bg-[length:200%_100%]"></div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex gap-3">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-8 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer bg-[length:200%_100%]"></div>
            ))}
          </div>
          <div className="flex gap-3">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-8 w-28 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer bg-[length:200%_100%]"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="h-8 w-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg mb-3 animate-shimmer bg-[length:200%_100%]"></div>
            <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-20 mb-2 animate-shimmer bg-[length:200%_100%]"></div>
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-24 animate-shimmer bg-[length:200%_100%]"></div>
          </div>
        ))}
      </div>

      {/* Creators Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-shimmer bg-[length:200%_100%]"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-32 animate-shimmer bg-[length:200%_100%]"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-24 animate-shimmer bg-[length:200%_100%]"></div>
                </div>
              </div>
              <div className="h-5 w-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]"></div>
            </div>
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-20 mb-4 animate-shimmer bg-[length:200%_100%]"></div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="space-y-1">
                  <div className="h-2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-16 animate-shimmer bg-[length:200%_100%]"></div>
                  <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-12 animate-shimmer bg-[length:200%_100%]"></div>
                </div>
              ))}
            </div>
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-full mb-2 animate-shimmer bg-[length:200%_100%]"></div>
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 mb-4 animate-shimmer bg-[length:200%_100%]"></div>
            <div className="h-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg mb-4 animate-shimmer bg-[length:200%_100%]"></div>
            <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer bg-[length:200%_100%]"></div>
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

  const filteredCreators = creators.filter(creator => {
    const matchesSearch = creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         creator.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || creator.category === filterCategory;
    const matchesFollowers = filterFollowers === 'all' || 
      (filterFollowers === 'micro' && creator.followers < 100000) ||
      (filterFollowers === 'macro' && creator.followers >= 100000);
    return matchesSearch && matchesCategory && matchesFollowers;
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
                Discover Creators
              </h1>
              <p className="text-[14px] text-gray-600 font-normal max-w-lg">
                Find the perfect creators for your campaigns
              </p>
            </div>
            
            <motion.button
              className="bg-black text-white px-6 py-3 rounded-full text-[13px] font-bold hover:bg-gray-900 transition-all duration-200 premium-glow-button flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <PlusIcon className="w-4 h-4" />
              <span className="relative z-10">Invite Creator</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="w-full px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto py-8">
        {/* AI Recommendations Banner */}
        {showAIRecs && (
          <motion.div
            className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <SparklesIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-black mb-1">AI Recommended Creators</h3>
                  <p className="text-[12px] text-gray-600">Top matches based on your campaign history</p>
                </div>
              </div>
              <button onClick={() => setShowAIRecs(false)}>
                <XMarkIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {aiRecommendations.map((rec) => (
                <div key={rec.id} className="bg-white rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[14px] font-bold text-black">{rec.name}</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-[10px] font-semibold">
                      {rec.matchScore}% match
                    </span>
                  </div>
                  <p className="text-[12px] text-gray-600">{rec.reason}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Compare Mode Banner */}
        {compareMode && selectedForCompare.length > 0 && (
          <motion.div
            className="bg-black text-white rounded-lg p-4 mb-8 flex items-center justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center space-x-4">
              <ArrowsRightLeftIcon className="w-5 h-5" />
              <span className="font-semibold">
                Comparing {selectedForCompare.length} creator{selectedForCompare.length > 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setCompareMode(false)}
                className="px-4 py-2 bg-white text-black rounded-lg text-[12px] font-semibold hover:bg-gray-100"
              >
                Compare Now
              </button>
              <button onClick={() => {
                setCompareMode(false);
                setSelectedForCompare([]);
              }}>
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Filters and Search */}
        <motion.div
          className="bg-white border border-gray-200 rounded-lg p-6 mb-8"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search creators by name or username..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-[13px]"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black font-semibold text-[12px]"
              >
                <option value="all">All Categories</option>
                <option value="beauty">Beauty</option>
                <option value="technology">Technology</option>
                <option value="food">Food</option>
                <option value="fitness">Fitness</option>
                <option value="travel">Travel</option>
              </select>

              <select
                value={filterFollowers}
                onChange={(e) => setFilterFollowers(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black font-semibold text-[12px]"
              >
                <option value="all">All Sizes</option>
                <option value="micro">Micro (10K-100K)</option>
                <option value="macro">Macro (100K+)</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black font-semibold text-[12px]"
              >
                <option value="rating">Sort by Rating</option>
                <option value="followers">Sort by Followers</option>
                <option value="engagement">Sort by Engagement</option>
                <option value="price">Sort by Price</option>
              </select>
            </div>
          </div>

          {/* View Mode and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold ${
                  viewMode === 'grid' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold ${
                  viewMode === 'list' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                List
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <motion.button
                onClick={() => setCompareMode(!compareMode)}
                className={`px-4 py-2 rounded-lg text-[12px] font-semibold flex items-center space-x-2 ${
                  compareMode ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowsRightLeftIcon className="w-4 h-4" />
                <span>Compare</span>
              </motion.button>
              {favorites.length > 0 && (
                <motion.button
                  className="px-4 py-2 bg-red-50 text-red-700 rounded-lg text-[12px] font-semibold flex items-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                >
                  <BookmarkIcon className="w-4 h-4 fill-current" />
                  <span>Favorites ({favorites.length})</span>
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Creator Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {[
            { label: 'Total Creators', value: creators.length },
            { label: 'Verified Creators', value: creators.filter(c => c.verified).length },
            { label: 'Avg Rating', value: (creators.reduce((sum, c) => sum + c.rating, 0) / creators.length).toFixed(1) },
            { label: 'Avg Engagement', value: `${(creators.reduce((sum, c) => sum + c.engagement, 0) / creators.length).toFixed(1)}%` }
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

        {/* Creators Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filteredCreators.map((creator, index) => (
            <motion.div
              key={creator.id}
              className={`bg-white border rounded-lg p-5 hover:border-black transition-all duration-200 cursor-pointer group relative ${
                compareMode && selectedForCompare.includes(creator.id)
                  ? 'border-black border-2 bg-gray-50'
                  : 'border-gray-200'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.995 }}
            >
              {/* Creator Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {creator.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-black">{creator.name}</h3>
                    <p className="text-[12px] text-gray-600 font-medium">{creator.username}</p>
                  </div>
                </div>
                {creator.verified && (
                  <div className="flex items-center space-x-1">
                    <CheckCircleIcon className="w-4 h-4 text-black" />
                    <span className="text-[10px] font-bold text-black">VERIFIED</span>
                  </div>
                )}
              </div>

              {/* Category and Location */}
              <div className="flex items-center space-x-2 mb-4">
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${getCategoryColor(creator.category)} uppercase`}>
                  {creator.category}
                </span>
                <div className="flex items-center space-x-1 text-gray-600">
                  <MapPinIcon className="w-3 h-3" />
                  <span className="text-[11px]">{creator.location}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-[11px] text-gray-500 font-medium uppercase">Followers</p>
                  <p className="text-[16px] font-black text-black">{(creator.followers / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 font-medium uppercase">Engagement</p>
                  <p className="text-[16px] font-black text-black">{creator.engagement}%</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 font-medium uppercase">Rating</p>
                  <div className="flex items-center space-x-1">
                    <StarIcon className="w-4 h-4 text-black fill-black" />
                    <span className="text-[16px] font-black text-black">{creator.rating}</span>
                  </div>
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 font-medium uppercase">Campaigns</p>
                  <p className="text-[16px] font-black text-black">{creator.completedCampaigns}</p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-[12px] text-gray-600 mb-4 leading-relaxed">{creator.bio}</p>

              {/* Price Range */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
                <p className="text-[11px] text-gray-500 font-medium uppercase mb-1">Price Range</p>
                <p className="text-[16px] font-black text-black">{creator.priceRange}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-black text-white py-2.5 rounded-lg font-semibold text-[12px] hover:bg-gray-900 transition-colors duration-200">
                  View Profile
                </button>
                {compareMode ? (
                  <button
                    onClick={() => toggleCompare(creator.id)}
                    className={`px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                      selectedForCompare.includes(creator.id)
                        ? 'bg-black text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-black'
                    }`}
                  >
                    <ArrowsRightLeftIcon className="w-4 h-4" />
                  </button>
                ) : (
                  <>
                    <button className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200">
                      <ChatBubbleLeftRightIcon className="w-4 h-4 text-black" />
                    </button>
                    <button
                      onClick={() => toggleFavorite(creator.id)}
                      className={`px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                        favorites.includes(creator.id)
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 hover:bg-gray-200 text-black'
                      }`}
                    >
                      {favorites.includes(creator.id) ? (
                        <BookmarkIcon className="w-4 h-4 fill-current" />
                      ) : (
                        <HeartIcon className="w-4 h-4" />
                      )}
                    </button>
                  </>
                )}
              </div>

              {/* Performance Badge */}
              {creator.authenticityScore >= 95 && (
                <div className="absolute top-4 right-4 bg-green-100 text-green-700 px-2 py-1 rounded text-[10px] font-bold flex items-center space-x-1">
                  <FireIcon className="w-3 h-3" />
                  <span>Top Performer</span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredCreators.length === 0 && (
          <motion.div
            className="text-center py-16"
            {...fadeInUp}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserGroupIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-[18px] font-bold text-black mb-2">No creators found</h3>
            <p className="text-[13px] text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <motion.button
              className="bg-black text-white px-6 py-3 rounded-full text-[13px] font-bold hover:bg-gray-900 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Browse All Creators
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Floating Navigation */}
      <FloatingNav userType="brand" />
    </motion.div>
  );
}
