'use client';

import { useState } from 'react';
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
import { AnimatedParticles } from '../../../components/onboarding';

export default function BrandCreators() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterFollowers, setFilterFollowers] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

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
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      beauty: 'bg-pink-100 text-pink-800',
      technology: 'bg-blue-100 text-blue-800',
      food: 'bg-orange-100 text-orange-800',
      fitness: 'bg-green-100 text-green-800',
      travel: 'bg-purple-100 text-purple-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const filteredCreators = creators.filter(creator => {
    const matchesSearch = creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         creator.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || creator.category === filterCategory;
    const matchesFollowers = filterFollowers === 'all' || 
      (filterFollowers === 'micro' && creator.followers < 100000) ||
      (filterFollowers === 'macro' && creator.followers >= 100000);
    return matchesSearch && matchesCategory && matchesFollowers;
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
                Discover Creators
              </h1>
              <p className="text-2xl md:text-xl text-gray-600 font-light">
                Find the perfect creators for your campaigns
              </p>
            </div>
            
            <motion.button
              className="bg-black text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <PlusIcon className="w-5 h-5" />
              <span>Invite Creator</span>
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
                  placeholder="Search creators by name or username..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
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
                className="px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
              >
                <option value="all">All Sizes</option>
                <option value="micro">Micro (10K-100K)</option>
                <option value="macro">Macro (100K+)</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
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
            { label: 'Total Creators', value: creators.length, color: 'blue' },
            { label: 'Verified Creators', value: creators.filter(c => c.verified).length, color: 'green' },
            { label: 'Avg Rating', value: (creators.reduce((sum, c) => sum + c.rating, 0) / creators.length).toFixed(1), color: 'yellow' },
            { label: 'Avg Engagement', value: `${(creators.reduce((sum, c) => sum + c.engagement, 0) / creators.length).toFixed(1)}%`, color: 'purple' }
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

        {/* Creators Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
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
          {filteredCreators.map((creator, index) => (
            <motion.div
              key={creator.id}
              className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-black hover:shadow-xl transition-all duration-300 cursor-pointer group"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Creator Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {creator.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900">{creator.name}</h3>
                    <p className="text-gray-600 font-medium">{creator.username}</p>
                  </div>
                </div>
                {creator.verified && (
                  <div className="flex items-center space-x-1">
                    <CheckCircleIcon className="w-5 h-5 text-green-600" />
                    <span className="text-xs font-bold text-green-600">VERIFIED</span>
                  </div>
                )}
              </div>

              {/* Category and Location */}
              <div className="flex items-center space-x-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${getCategoryColor(creator.category)}`}>
                  {creator.category.toUpperCase()}
                </span>
                <div className="flex items-center space-x-1 text-gray-600">
                  <MapPinIcon className="w-4 h-4" />
                  <span className="text-sm">{creator.location}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600 font-bold">Followers</p>
                  <p className="text-2xl font-black text-gray-900">{(creator.followers / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-bold">Engagement</p>
                  <p className="text-2xl font-black text-gray-900">{creator.engagement}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-bold">Rating</p>
                  <div className="flex items-center space-x-1">
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                    <span className="text-xl font-black text-gray-900">{creator.rating}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-bold">Campaigns</p>
                  <p className="text-2xl font-black text-gray-900">{creator.completedCampaigns}</p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">{creator.bio}</p>

              {/* Price Range */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-4 mb-6 hover:border-black transition-all duration-200">
                <p className="text-sm text-gray-600 font-bold mb-1">Price Range</p>
                <p className="text-xl font-black text-gray-900">{creator.priceRange}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button className="flex-1 bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors duration-200">
                  View Profile
                </button>
                <button className="px-4 py-3 bg-blue-100 hover:bg-blue-200 rounded-xl transition-colors duration-200">
                  <ChatBubbleLeftRightIcon className="w-5 h-5 text-blue-600" />
                </button>
                <button className="px-4 py-3 bg-red-100 hover:bg-red-200 rounded-xl transition-colors duration-200">
                  <HeartIcon className="w-5 h-5 text-red-600" />
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
            transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <UserGroupIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No creators found</h3>
            <p className="text-gray-600 mb-8">Try adjusting your search or filter criteria</p>
            <button className="bg-black text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-800 transition-all duration-200">
              Browse All Creators
            </button>
          </motion.div>
        )}
      </div>

      {/* Floating Navigation */}
      <FloatingNav userType="brand" />
    </div>
  );
}
