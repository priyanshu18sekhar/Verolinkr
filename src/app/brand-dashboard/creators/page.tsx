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
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import FloatingNav from '../../../componets/ui/FloatingNav';

export default function BrandCreators() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterFollowers, setFilterFollowers] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [isLoading, setIsLoading] = useState(true);

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

  const getCategoryColor = (category: string) => {
    return 'bg-gray-100 text-gray-700';
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
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
              className="bg-white border border-gray-200 rounded-lg p-5 hover:border-black transition-all duration-200 cursor-pointer group"
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
                <button className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200">
                  <ChatBubbleLeftRightIcon className="w-4 h-4 text-black" />
                </button>
                <button className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200">
                  <HeartIcon className="w-4 h-4 text-black" />
                </button>
              </div>
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
