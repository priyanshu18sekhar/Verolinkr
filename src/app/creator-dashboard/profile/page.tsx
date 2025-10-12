'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserIcon,
  CameraIcon,
  PencilIcon,
  CheckCircleIcon,
  StarIcon,
  MapPinIcon,
  GlobeAltIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  TagIcon,
  PlusIcon,
  XMarkIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import FloatingNav from '../../../componets/ui/FloatingNav';

export default function CreatorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const profileData = {
    personal: {
      name: 'Sarah Johnson',
      username: '@sarahj_beauty',
      email: 'sarah@example.com',
      phone: '+91 98765 43210',
      bio: 'Beauty influencer with 5+ years experience. Specializes in skincare and makeup tutorials. Passionate about helping people discover their natural beauty.',
      location: 'Mumbai, India',
      website: 'https://sarahjbeauty.com',
      dateOfBirth: '1995-06-15',
      languages: ['English', 'Hindi', 'Marathi'],
      interests: ['Skincare', 'Makeup', 'Fashion', 'Photography']
    },
    professional: {
      category: 'Beauty & Skincare',
      experience: '5+ years',
      followers: 125000,
      engagement: 8.5,
      rating: 4.9,
      completedCampaigns: 45,
      authenticityScore: 95,
      verified: true,
      priceRange: '₹15,000 - ₹50,000',
      deliveryTime: '2-3 days',
      availability: 'Available',
      responseTime: '2 hours'
    },
    portfolio: {
      recentWork: [
        { id: 1, title: 'Skincare Routine Video', brand: 'GlowUp', views: 85000, engagement: 12.5, date: '2024-01-15' },
        { id: 2, title: 'Makeup Tutorial', brand: 'BeautyBrand', views: 120000, engagement: 9.8, date: '2024-01-10' },
        { id: 3, title: 'Product Review', brand: 'SkincareCo', views: 95000, engagement: 11.2, date: '2024-01-08' }
      ],
      bestPerforming: [
        { id: 1, title: 'Summer Skincare Tips', views: 250000, engagement: 15.3 },
        { id: 2, title: 'Foundation Matching Guide', views: 180000, engagement: 13.7 },
        { id: 3, title: 'Night Routine Video', views: 165000, engagement: 12.9 }
      ]
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: UserIcon },
    { id: 'professional', label: 'Professional', icon: StarIcon },
    { id: 'portfolio', label: 'Portfolio', icon: CheckCircleIcon }
  ];

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
                Profile Settings
              </h1>
              <p className="text-xl text-gray-600 font-light">
                Manage your profile and showcase your work
              </p>
            </div>
            
            <motion.button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-8 py-4 rounded-full text-lg font-bold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-3 ${
                isEditing 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <PencilIcon className="w-5 h-5" />
              <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-100 p-8 mb-8"
          {...fadeInUp}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="flex items-center space-x-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-4xl">
                  {profileData.personal.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              {isEditing && (
                <button className="absolute bottom-2 right-2 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200">
                  <CameraIcon className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <h2 className="text-4xl font-black text-gray-900">{profileData.personal.name}</h2>
                {profileData.professional.verified && (
                  <div className="flex items-center space-x-1">
                    <ShieldCheckIcon className="w-6 h-6 text-green-600" />
                    <span className="text-sm font-bold text-green-600">VERIFIED</span>
                  </div>
                )}
              </div>
              
              <p className="text-xl text-gray-600 mb-4">{profileData.personal.username}</p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="w-4 h-4" />
                  <span>{profileData.personal.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <StarIcon className="w-4 h-4 text-yellow-500" />
                  <span>{profileData.professional.rating}/5.0</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span>{profileData.professional.completedCampaigns} campaigns</span>
                </div>
              </div>

              <p className="text-gray-700 mt-4 leading-relaxed max-w-2xl">
                {profileData.personal.bio}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-black text-gray-900">{(profileData.professional.followers / 1000).toFixed(0)}K</p>
                <p className="text-sm text-gray-600">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-gray-900">{profileData.professional.engagement}%</p>
                <p className="text-sm text-gray-600">Engagement</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-100 mb-8"
          {...fadeInUp}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="border-b border-gray-100">
            <nav className="flex space-x-8 px-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
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
            {/* Personal Info Tab */}
            {activeTab === 'personal' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      defaultValue={profileData.personal.name}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Username *
                    </label>
                    <input
                      type="text"
                      defaultValue={profileData.personal.username}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      defaultValue={profileData.personal.email}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue={profileData.personal.phone}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      defaultValue={profileData.personal.location}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      defaultValue={profileData.personal.website}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Bio *
                  </label>
                  <textarea
                    rows={4}
                    defaultValue={profileData.personal.bio}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Languages
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.personal.languages.map((language, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {language}
                      </span>
                    ))}
                    {isEditing && (
                      <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-200">
                        <PlusIcon className="w-4 h-4 inline mr-1" />
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Professional Tab */}
            {activeTab === 'professional' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      defaultValue={profileData.professional.category}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    >
                      <option value="beauty">Beauty & Skincare</option>
                      <option value="fashion">Fashion</option>
                      <option value="tech">Technology</option>
                      <option value="food">Food & Cooking</option>
                      <option value="fitness">Fitness & Wellness</option>
                      <option value="travel">Travel & Lifestyle</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Experience
                    </label>
                    <input
                      type="text"
                      defaultValue={profileData.professional.experience}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Price Range
                    </label>
                    <input
                      type="text"
                      defaultValue={profileData.professional.priceRange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Delivery Time
                    </label>
                    <input
                      type="text"
                      defaultValue={profileData.professional.deliveryTime}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Performance Metrics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-sm text-gray-600">Authenticity Score</p>
                      <p className="text-2xl font-black text-green-600">{profileData.professional.authenticityScore}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Rating</p>
                      <p className="text-2xl font-black text-yellow-600">{profileData.professional.rating}/5.0</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Campaigns</p>
                      <p className="text-2xl font-black text-blue-600">{profileData.professional.completedCampaigns}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Response Time</p>
                      <p className="text-2xl font-black text-purple-600">{profileData.professional.responseTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-2xl font-bold text-gray-900">Recent Work</h4>
                    {isEditing && (
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                        <PlusIcon className="w-4 h-4 inline mr-2" />
                        Add Work
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    {profileData.portfolio.recentWork.map((work) => (
                      <div key={work.id} className="border border-gray-200 rounded-xl p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="text-lg font-bold text-gray-900">{work.title}</h5>
                            <p className="text-gray-600">for {work.brand}</p>
                          </div>
                          {isEditing && (
                            <button className="text-red-600 hover:text-red-800">
                              <XMarkIcon className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                          <div>
                            <p className="text-gray-600">Views</p>
                            <p className="font-bold">{work.views.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Engagement</p>
                            <p className="font-bold">{work.engagement}%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Date</p>
                            <p className="font-bold">{work.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-6">Best Performing Content</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {profileData.portfolio.bestPerforming.map((content) => (
                      <div key={content.id} className="border border-gray-200 rounded-xl p-6">
                        <h5 className="text-lg font-bold text-gray-900 mb-3">{content.title}</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Views</span>
                            <span className="font-bold">{content.views.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Engagement</span>
                            <span className="font-bold">{content.engagement}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Floating Navigation */}
      <FloatingNav userType="creator" />
    </div>
  );
}
