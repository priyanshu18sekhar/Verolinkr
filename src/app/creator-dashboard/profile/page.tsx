'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ShieldCheckIcon,
  LinkIcon,
  PhotoIcon,
  VideoCameraIcon,
  ChartBarIcon,
  TrophyIcon,
  SparklesIcon,
  HeartIcon,
  EyeIcon,
  ShareIcon,
  DocumentTextIcon,
  PlayIcon
} from '@heroicons/react/24/outline';
import FloatingNav from '../../../componets/ui/FloatingNav';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import GlassCard from '../../../components/design-system/GlassCard';
import GlassButton from '../../../components/design-system/GlassButton';
import GlassInput from '../../../components/design-system/GlassInput';
import ProgressBar from '../../../components/loading/ProgressBar';
import { useModal } from '../../../contexts/ModalContext';

function CreatorProfileContent() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [uploadingImage, setUploadingImage] = useState(false);
  const { openSuccess, openError } = useModal();

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
      interests: ['Skincare', 'Makeup', 'Fashion', 'Photography'],
      socialMedia: {
        instagram: '@sarahj_beauty',
        youtube: 'Sarah Johnson Beauty',
        twitter: '@sarahjbeauty'
      }
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
      responseTime: '2 hours',
      skills: ['Video Production', 'Content Creation', 'Product Photography', 'Social Media Marketing'],
      achievements: [
        { title: 'Top Creator', description: 'Featured creator of the month', icon: TrophyIcon },
        { title: '50+ Campaigns', description: 'Completed 50+ successful campaigns', icon: CheckCircleIcon },
        { title: '4.9 Rating', description: 'Excellent rating from brands', icon: StarIcon }
      ]
    },
    portfolio: {
      recentWork: [
        { id: 1, title: 'Skincare Routine Video', brand: 'GlowUp', views: 85000, engagement: 12.5, date: '2024-01-15', thumbnail: '/api/placeholder/300/200' },
        { id: 2, title: 'Makeup Tutorial', brand: 'BeautyBrand', views: 120000, engagement: 9.8, date: '2024-01-10', thumbnail: '/api/placeholder/300/200' },
        { id: 3, title: 'Product Review', brand: 'SkincareCo', views: 95000, engagement: 11.2, date: '2024-01-08', thumbnail: '/api/placeholder/300/200' }
      ],
      bestPerforming: [
        { id: 1, title: 'Summer Skincare Tips', views: 250000, engagement: 15.3, thumbnail: '/api/placeholder/300/200' },
        { id: 2, title: 'Foundation Matching Guide', views: 180000, engagement: 13.7, thumbnail: '/api/placeholder/300/200' },
        { id: 3, title: 'Night Routine Video', views: 165000, engagement: 12.9, thumbnail: '/api/placeholder/300/200' }
      ]
    },
    stats: {
      totalEarnings: 185000,
      totalViews: 1250000,
      totalCampaigns: 45,
      avgRating: 4.9,
      responseRate: 98,
      onTimeDelivery: 100
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: UserIcon },
    { id: 'professional', label: 'Professional', icon: StarIcon },
    { id: 'portfolio', label: 'Portfolio', icon: CheckCircleIcon },
    { id: 'stats', label: 'Statistics', icon: ChartBarIcon }
  ];

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      openError({
        message: 'Image size should be less than 5MB',
        title: 'File Too Large',
      });
      return;
    }

    setUploadingImage(true);
    // Simulate upload
    setTimeout(() => {
      setUploadingImage(false);
      openSuccess({
        message: 'Profile picture updated successfully',
        title: 'Image Updated',
        autoClose: true,
        autoCloseDelay: 2000,
      });
    }, 1500);
  };

  const handleSave = async () => {
    setIsEditing(false);
    openSuccess({
      message: 'Profile updated successfully',
      title: 'Changes Saved',
      autoClose: true,
      autoCloseDelay: 2000,
    });
  };

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
                Profile Settings
              </h1>
              <p className="text-xl text-gray-600 font-light">
                Manage your profile and showcase your work
              </p>
            </div>
            
            <GlassButton
              variant={isEditing ? 'secondary' : 'primary'}
              size="md"
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
            >
              <PencilIcon className="w-5 h-5 mr-2" />
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </GlassButton>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <GlassCard variant="elevated" className="p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-full flex items-center justify-center border-4 border-white/50 shadow-xl backdrop-blur-sm relative overflow-hidden">
                <span className="text-white font-bold text-4xl relative z-10">
                  {profileData.personal.name.split(' ').map(n => n[0]).join('')}
                </span>
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: 'loop',
                      duration: 3,
                      ease: 'linear',
                    },
                  }}
                />
              </div>
              {isEditing && (
                <motion.label
                  className="absolute bottom-2 right-2 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-all duration-200 shadow-lg border-2 border-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                  {uploadingImage ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  ) : (
                    <CameraIcon className="w-5 h-5" />
                  )}
                </motion.label>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                <h2 className="text-4xl font-black text-gray-900">{profileData.personal.name}</h2>
                {profileData.professional.verified && (
                  <motion.div
                    className="flex items-center space-x-1 px-3 py-1 rounded-full bg-green-500/20 border-2 border-green-500/30 backdrop-blur-sm"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                  >
                    <ShieldCheckIcon className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-bold text-green-700">VERIFIED</span>
                  </motion.div>
                )}
              </div>
              
              <p className="text-xl text-gray-600 mb-4">{profileData.personal.username}</p>
              
              <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-600 mb-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4" />
                  <span>{profileData.personal.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <StarIcon className="w-4 h-4 text-yellow-500" />
                  <span>{profileData.professional.rating}/5.0</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span>{profileData.professional.completedCampaigns} campaigns</span>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {profileData.personal.bio}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <GlassCard variant="floating" className="p-4 text-center">
                  <p className="text-2xl font-black text-gray-900 mb-1">{(profileData.professional.followers / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-gray-600">Followers</p>
                </GlassCard>
                <GlassCard variant="floating" className="p-4 text-center">
                  <p className="text-2xl font-black text-gray-900 mb-1">{profileData.professional.engagement}%</p>
                  <p className="text-xs text-gray-600">Engagement</p>
                </GlassCard>
                <GlassCard variant="floating" className="p-4 text-center">
                  <p className="text-2xl font-black text-gray-900 mb-1">{profileData.professional.authenticityScore}%</p>
                  <p className="text-xs text-gray-600">Authenticity</p>
                </GlassCard>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Tab Navigation */}
        <GlassCard variant="elevated" className="mb-8">
          <div className="border-b border-white/20">
            <nav className="flex space-x-8 px-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-6 px-1 border-b-2 font-bold text-lg flex items-center space-x-3 transition-all duration-200 whitespace-nowrap ${
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
            {/* Personal Info Tab */}
            {activeTab === 'personal' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <GlassInput
                    label="Full Name *"
                    defaultValue={profileData.personal.name}
                    disabled={!isEditing}
                    size="md"
                  />
                  
                  <GlassInput
                    label="Username *"
                    defaultValue={profileData.personal.username}
                    disabled={!isEditing}
                    size="md"
                  />
                  
                  <GlassInput
                    label="Email *"
                    type="email"
                    defaultValue={profileData.personal.email}
                    disabled={!isEditing}
                    size="md"
                  />
                  
                  <GlassInput
                    label="Phone Number"
                    type="tel"
                    defaultValue={profileData.personal.phone}
                    disabled={!isEditing}
                    size="md"
                  />
                  
                  <GlassInput
                    label="Location"
                    defaultValue={profileData.personal.location}
                    disabled={!isEditing}
                    size="md"
                  />
                  
                  <GlassInput
                    label="Website"
                    type="url"
                    defaultValue={profileData.personal.website}
                    disabled={!isEditing}
                    size="md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Bio *
                  </label>
                  <textarea
                    rows={4}
                    defaultValue={profileData.personal.bio}
                    disabled={!isEditing}
                    className="w-full px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border-2 border-white/20 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                {/* Social Media Links */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4">
                    Social Media Links
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <span className="text-white font-bold text-sm">IG</span>
                      </div>
                      <GlassInput
                        placeholder="Instagram handle"
                        defaultValue={profileData.personal.socialMedia.instagram}
                        disabled={!isEditing}
                        size="sm"
                        className="flex-1"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <span className="text-white font-bold text-sm">YT</span>
                      </div>
                      <GlassInput
                        placeholder="YouTube channel"
                        defaultValue={profileData.personal.socialMedia.youtube}
                        disabled={!isEditing}
                        size="sm"
                        className="flex-1"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <span className="text-white font-bold text-sm">TW</span>
                      </div>
                      <GlassInput
                        placeholder="Twitter handle"
                        defaultValue={profileData.personal.socialMedia.twitter}
                        disabled={!isEditing}
                        size="sm"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Languages
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.personal.languages.map((language, index) => (
                      <span key={index} className="px-4 py-2 bg-blue-500/20 border-2 border-blue-500/30 text-blue-700 rounded-full text-sm font-bold backdrop-blur-sm flex items-center gap-2">
                        {language}
                        {isEditing && (
                          <button className="hover:bg-blue-500/20 rounded-full p-1">
                            <XMarkIcon className="w-3 h-3" />
                          </button>
                        )}
                      </span>
                    ))}
                    {isEditing && (
                      <motion.button
                        className="px-4 py-2 bg-white/20 backdrop-blur-xl border-2 border-white/30 text-gray-600 rounded-full text-sm font-bold hover:bg-white/30 transition-all duration-200 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <PlusIcon className="w-4 h-4" />
                        Add Language
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Interests & Skills
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.personal.interests.map((interest, index) => (
                      <span key={index} className="px-4 py-2 bg-purple-500/20 border-2 border-purple-500/30 text-purple-700 rounded-full text-sm font-bold backdrop-blur-sm flex items-center gap-2">
                        {interest}
                        {isEditing && (
                          <button className="hover:bg-purple-500/20 rounded-full p-1">
                            <XMarkIcon className="w-3 h-3" />
                          </button>
                        )}
                      </span>
                    ))}
                    {isEditing && (
                      <motion.button
                        className="px-4 py-2 bg-white/20 backdrop-blur-xl border-2 border-white/30 text-gray-600 rounded-full text-sm font-bold hover:bg-white/30 transition-all duration-200 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <PlusIcon className="w-4 h-4" />
                        Add Interest
                      </motion.button>
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
                    <GlassCard variant="floating" className="p-0">
                      <select
                        defaultValue={profileData.professional.category}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-transparent border-none focus:ring-0 focus:outline-none font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="beauty">Beauty & Skincare</option>
                        <option value="fashion">Fashion</option>
                        <option value="tech">Technology</option>
                        <option value="food">Food & Cooking</option>
                        <option value="fitness">Fitness & Wellness</option>
                        <option value="travel">Travel & Lifestyle</option>
                      </select>
                    </GlassCard>
                  </div>
                  
                  <GlassInput
                    label="Experience"
                    defaultValue={profileData.professional.experience}
                    disabled={!isEditing}
                    size="md"
                  />
                  
                  <GlassInput
                    label="Price Range"
                    defaultValue={profileData.professional.priceRange}
                    disabled={!isEditing}
                    size="md"
                  />
                  
                  <GlassInput
                    label="Delivery Time"
                    defaultValue={profileData.professional.deliveryTime}
                    disabled={!isEditing}
                    size="md"
                  />
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4">
                    Skills & Expertise
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.professional.skills.map((skill, index) => (
                      <span key={index} className="px-4 py-2 bg-green-500/20 border-2 border-green-500/30 text-green-700 rounded-full text-sm font-bold backdrop-blur-sm flex items-center gap-2">
                        {skill}
                        {isEditing && (
                          <button className="hover:bg-green-500/20 rounded-full p-1">
                            <XMarkIcon className="w-3 h-3" />
                          </button>
                        )}
                      </span>
                    ))}
                    {isEditing && (
                      <motion.button
                        className="px-4 py-2 bg-white/20 backdrop-blur-xl border-2 border-white/30 text-gray-600 rounded-full text-sm font-bold hover:bg-white/30 transition-all duration-200 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <PlusIcon className="w-4 h-4" />
                        Add Skill
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Performance Metrics */}
                <GlassCard variant="floating" className="p-6 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10">
                  <h4 className="text-lg font-black text-gray-900 mb-6">Performance Metrics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Authenticity Score</p>
                      <p className="text-3xl font-black text-green-600 mb-2">{profileData.professional.authenticityScore}%</p>
                      <ProgressBar progress={profileData.professional.authenticityScore} variant="linear" color="success" size="sm" showLabel={false} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Rating</p>
                      <p className="text-3xl font-black text-yellow-600 mb-2">{profileData.professional.rating}/5.0</p>
                      <ProgressBar progress={(profileData.professional.rating / 5) * 100} variant="linear" color="warning" size="sm" showLabel={false} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Campaigns</p>
                      <p className="text-3xl font-black text-blue-600 mb-2">{profileData.professional.completedCampaigns}</p>
                      <ProgressBar progress={(profileData.professional.completedCampaigns / 100) * 100} variant="linear" color="primary" size="sm" showLabel={false} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Response Time</p>
                      <p className="text-3xl font-black text-purple-600 mb-2">{profileData.professional.responseTime}</p>
                      <ProgressBar progress={98} variant="linear" color="gradient" size="sm" showLabel={false} />
                    </div>
                  </div>
                </GlassCard>

                {/* Achievements */}
                <div>
                  <h4 className="text-lg font-black text-gray-900 mb-6">Achievements & Badges</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {profileData.professional.achievements.map((achievement, index) => {
                      const Icon = achievement.icon;
                      return (
                        <motion.div
                          key={achievement.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <GlassCard variant="elevated" className="p-6 hover:scale-105 transition-transform duration-200">
                            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/30 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm mx-auto">
                              <Icon className="w-8 h-8 text-yellow-600" />
                            </div>
                            <h5 className="text-lg font-black text-gray-900 mb-2 text-center">{achievement.title}</h5>
                            <p className="text-sm text-gray-600 text-center">{achievement.description}</p>
                          </GlassCard>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h4 className="text-2xl font-black text-gray-900">Recent Work</h4>
                  {isEditing && (
                    <GlassButton variant="primary" size="sm" onClick={() => {}}>
                      <PlusIcon className="w-4 h-4 mr-2" />
                      Add Work
                    </GlassButton>
                  )}
                </div>
                
                <div className="space-y-6">
                  {profileData.portfolio.recentWork.map((work, index) => (
                    <motion.div
                      key={work.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <GlassCard variant="elevated" className="p-6 hover:scale-[1.01] transition-transform duration-200">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h5 className="text-xl font-black text-gray-900 mb-2">{work.title}</h5>
                            <p className="text-gray-600">for {work.brand}</p>
                          </div>
                          {isEditing && (
                            <motion.button
                              className="p-2 rounded-xl bg-red-500/20 border-2 border-red-500/30 hover:bg-red-500/30 transition-all duration-200"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <XMarkIcon className="w-5 h-5 text-red-600" />
                            </motion.button>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Views</p>
                            <p className="text-xl font-black text-gray-900">{work.views.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Engagement</p>
                            <p className="text-xl font-black text-gray-900">{work.engagement}%</p>
                            <ProgressBar progress={work.engagement} variant="linear" color="primary" size="sm" showLabel={false} className="mt-2" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Date</p>
                            <p className="text-xl font-black text-gray-900">{work.date}</p>
                          </div>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>

                <div>
                  <h4 className="text-2xl font-black text-gray-900 mb-6">Best Performing Content</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {profileData.portfolio.bestPerforming.map((content, index) => (
                      <motion.div
                        key={content.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <GlassCard variant="elevated" className="p-6 hover:scale-105 transition-transform duration-200 group">
                          <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl mb-4 flex items-center justify-center border-2 border-white/30 backdrop-blur-sm relative overflow-hidden">
                            <PlayIcon className="w-12 h-12 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                            <span className="absolute top-2 right-2 px-2 py-1 rounded bg-yellow-500/20 border border-yellow-500/30 text-xs font-bold text-yellow-700 backdrop-blur-sm">
                              BEST
                            </span>
                          </div>
                          <h5 className="text-lg font-black text-gray-900 mb-3">{content.title}</h5>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Views</span>
                              <span className="font-black text-gray-900">{content.views.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Engagement</span>
                              <span className="font-black text-gray-900">{content.engagement}%</span>
                            </div>
                            <ProgressBar progress={content.engagement} variant="linear" color="gradient" size="sm" showLabel={false} />
                          </div>
                        </GlassCard>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Statistics Tab */}
            {activeTab === 'stats' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <GlassCard variant="elevated" className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <CurrencyDollarIcon className="w-8 h-8 text-green-600" />
                      <span className="text-sm font-bold text-green-600">+24%</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Total Earnings</p>
                    <p className="text-3xl font-black text-gray-900">₹{profileData.stats.totalEarnings.toLocaleString()}</p>
                  </GlassCard>

                  <GlassCard variant="elevated" className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <EyeIcon className="w-8 h-8 text-blue-600" />
                      <span className="text-sm font-bold text-blue-600">+18%</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Total Views</p>
                    <p className="text-3xl font-black text-gray-900">{(profileData.stats.totalViews / 1000).toFixed(0)}K</p>
                  </GlassCard>

                  <GlassCard variant="elevated" className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <CheckCircleIcon className="w-8 h-8 text-purple-600" />
                      <span className="text-sm font-bold text-purple-600">+12%</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Total Campaigns</p>
                    <p className="text-3xl font-black text-gray-900">{profileData.stats.totalCampaigns}</p>
                  </GlassCard>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <GlassCard variant="elevated" className="p-6">
                    <h5 className="text-lg font-black text-gray-900 mb-4">Response Rate</h5>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Current Rate</span>
                        <span className="text-2xl font-black text-green-600">{profileData.stats.responseRate}%</span>
                      </div>
                      <ProgressBar progress={profileData.stats.responseRate} variant="linear" color="success" size="md" showLabel={false} />
                    </div>
                  </GlassCard>

                  <GlassCard variant="elevated" className="p-6">
                    <h5 className="text-lg font-black text-gray-900 mb-4">On-Time Delivery</h5>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Delivery Rate</span>
                        <span className="text-2xl font-black text-blue-600">{profileData.stats.onTimeDelivery}%</span>
                      </div>
                      <ProgressBar progress={profileData.stats.onTimeDelivery} variant="linear" color="primary" size="md" showLabel={false} />
                    </div>
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

export default function CreatorProfile() {
  return (
    <DashboardLayout userType="creator" userName="Creator Name" userEmail="creator@example.com">
      <CreatorProfileContent />
    </DashboardLayout>
  );
}
