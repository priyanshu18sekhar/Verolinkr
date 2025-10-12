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
  CalendarIcon
} from '@heroicons/react/24/outline';

export default function GigsMarketplace() {
  const [activeTab, setActiveTab] = useState<'browse' | 'my-gigs' | 'create'>('browse');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Gigs', count: 156 },
    { id: 'fashion', name: 'Fashion & Beauty', count: 45 },
    { id: 'tech', name: 'Technology', count: 32 },
    { id: 'food', name: 'Food & Cooking', count: 28 },
    { id: 'fitness', name: 'Fitness & Wellness', count: 25 },
    { id: 'travel', name: 'Travel & Lifestyle', count: 26 }
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
      avgDelivery: '2.5 days'
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
      avgDelivery: '4.2 days'
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
      avgDelivery: '1.8 days'
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
      earnings: 414000
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
      earnings: 210000
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      fashion: 'bg-pink-100 text-pink-800',
      tech: 'bg-blue-100 text-blue-800',
      food: 'bg-orange-100 text-orange-800',
      fitness: 'bg-green-100 text-green-800',
      travel: 'bg-purple-100 text-purple-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
              <div className="flex items-center space-x-4 mb-4">
                <GiftIcon className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-4xl font-black text-gray-900">Gigs Marketplace</h1>
                  <p className="text-lg text-gray-600">Buy and sell pre-defined creator services</p>
                </div>
              </div>
            </div>
            
            <motion.button
              className="bg-black text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('create')}
            >
              <PlusIcon className="w-5 h-5" />
              <span>Create Gig</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Tab Navigation */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-100 mb-12"
          {...fadeInUp}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="border-b border-gray-100">
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
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
                {/* Category Filter */}
                <div className="mb-8">
                  <h3 className="text-2xl font-black text-gray-900 mb-6">Browse by Category</h3>
                  <div className="flex flex-wrap gap-4">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-6 py-3 rounded-xl font-bold transition-all duration-200 ${
                          selectedCategory === category.id
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {category.name} ({category.count})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gigs Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                  {availableGigs
                    .filter(gig => selectedCategory === 'all' || gig.category === selectedCategory)
                    .map((gig) => (
                    <motion.div
                      key={gig.id}
                      className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {gig.creator.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{gig.creator}</h4>
                            <div className="flex items-center space-x-2">
                              <StarIcon className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm font-medium text-gray-600">{gig.rating}</span>
                              <span className="text-sm text-gray-500">({gig.reviews} reviews)</span>
                            </div>
                          </div>
                        </div>
                        {gig.verified && (
                          <div className="flex items-center space-x-1">
                            <CheckCircleIcon className="w-4 h-4 text-green-600" />
                            <span className="text-xs font-bold text-green-600">VERIFIED</span>
                          </div>
                        )}
                      </div>

                      <h3 className="text-xl font-black text-gray-900 mb-3">{gig.title}</h3>
                      
                      <div className="flex items-center space-x-3 mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${getCategoryColor(gig.category)}`}>
                          {categories.find(c => c.id === gig.category)?.name}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-6 leading-relaxed">{gig.description}</p>

                      <div className="space-y-3 mb-6">
                        <h5 className="font-bold text-gray-900">Requirements:</h5>
                        {gig.requirements.map((req, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircleIcon className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-600">{req}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mb-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-500">Price</p>
                          <p className="text-2xl font-black text-gray-900">₹{gig.price.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500">Delivery</p>
                          <p className="text-lg font-bold text-gray-900">{gig.deliveryTime}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500">Orders</p>
                          <p className="text-lg font-bold text-gray-900">{gig.completedOrders}</p>
                        </div>
                      </div>

                      <button className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all duration-200 group-hover:scale-105">
                        Order Now
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* My Gigs Tab */}
            {activeTab === 'my-gigs' && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-black text-gray-900">My Gigs</h3>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <PlusIcon className="w-4 h-4" />
                    <span>Create New Gig</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {myGigs.map((gig) => (
                    <motion.div
                      key={gig.id}
                      className="bg-gray-50 rounded-2xl p-8"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h4 className="text-2xl font-black text-gray-900 mb-2">{gig.title}</h4>
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${getCategoryColor(gig.category)}`}>
                            {categories.find(c => c.id === gig.category)?.name}
                          </span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(gig.status)}`}>
                          {gig.status.toUpperCase()}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Price</p>
                          <p className="text-xl font-black text-gray-900">₹{gig.price.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Total Orders</p>
                          <p className="text-xl font-black text-gray-900">{gig.orders}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Rating</p>
                          <div className="flex items-center space-x-1">
                            <StarIcon className="w-4 h-4 text-yellow-500" />
                            <span className="font-bold text-gray-900">{gig.rating}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Total Earnings</p>
                          <p className="text-xl font-black text-green-600">₹{gig.earnings.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors duration-200">
                          Edit Gig
                        </button>
                        <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-bold hover:bg-gray-300 transition-colors duration-200">
                          View Analytics
                        </button>
                        {gig.status === 'active' ? (
                          <button className="bg-yellow-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-yellow-700 transition-colors duration-200">
                            Pause
                          </button>
                        ) : (
                          <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors duration-200">
                            Activate
                          </button>
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
                <h3 className="text-2xl font-black text-gray-900 mb-8">Create New Gig</h3>
                
                <div className="max-w-2xl mx-auto">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                    <div className="flex items-center space-x-3">
                      <GiftIcon className="w-5 h-5 text-blue-600" />
                      <p className="text-blue-800 font-medium">
                        Create a service that brands can purchase instantly. Set your price, delivery time, and requirements.
                      </p>
                    </div>
                  </div>

                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Gig Title *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Professional Product Review Video"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Category *
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="">Select category</option>
                        <option value="fashion">Fashion & Beauty</option>
                        <option value="tech">Technology</option>
                        <option value="food">Food & Cooking</option>
                        <option value="fitness">Fitness & Wellness</option>
                        <option value="travel">Travel & Lifestyle</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Describe what you'll deliver..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Price (₹) *
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="15000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Delivery Time *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="3 days"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Requirements
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="List what the brand needs to provide..."
                      />
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="button"
                        className="bg-gray-200 text-gray-800 px-8 py-4 rounded-xl font-bold hover:bg-gray-300 transition-colors duration-200"
                      >
                        Save as Draft
                      </button>
                      <button
                        type="submit"
                        className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <span>Create Gig</span>
                        <ArrowRightIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
