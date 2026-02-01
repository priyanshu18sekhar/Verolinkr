'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
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
  BoltIcon,
  PlusIcon,
  BookmarkIcon,
  ShareIcon,
  ArrowsRightLeftIcon,
  ChartBarIcon,
  FireIcon,
  RocketLaunchIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  TagIcon,
  TrophyIcon,
  UserGroupIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';
import FloatingNav from '../../../componets/ui/FloatingNav';
import DashboardLayout from '../../../components/layout/DashboardLayout';

interface Campaign {
  id: number;
  brand: string;
  title: string;
  category: string;
  type: string;
  budget: number;
  [key: string]: unknown;
}

function CreatorCampaignsContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'cards' | 'stack'>('cards');
  const [showFilters, setShowFilters] = useState(false);
  const [savedCampaigns, setSavedCampaigns] = useState<number[]>([]);
  const [bookmarkedCampaigns, setBookmarkedCampaigns] = useState<number[]>([]);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; message: string; campaign: Campaign | null }>({ title: '', message: '', campaign: null });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [currentStackIndex, setCurrentStackIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

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
      brandRating: 4.8,
      applicants: 23,
      maxApplicants: 50,
      posted: '2 hours ago',
      matchScore: 95,
      recommended: true,
      urgency: 'normal',
      estimatedReach: '50K-100K',
      campaignGoal: 'Product Awareness',
      deliverables: ['1 Video', '3 Stories', '1 Post']
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
      brandRating: 4.9,
      applicants: 45,
      maxApplicants: 100,
      posted: '5 hours ago',
      matchScore: 88,
      recommended: true,
      urgency: 'normal',
      estimatedReach: '100K-200K',
      campaignGoal: 'Product Launch',
      deliverables: ['1 Reel', '5 Stories', '2 Posts']
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
      brandRating: 4.7,
      applicants: 67,
      maxApplicants: 80,
      posted: '1 day ago',
      matchScore: 82,
      recommended: false,
      urgency: 'urgent',
      estimatedReach: '75K-150K',
      campaignGoal: 'Sales & Conversions',
      deliverables: ['3 Posts', '10 Stories']
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
      brandRating: 4.6,
      applicants: 34,
      maxApplicants: 60,
      posted: '3 hours ago',
      matchScore: 75,
      recommended: false,
      urgency: 'normal',
      estimatedReach: '30K-60K',
      campaignGoal: 'Engagement',
      deliverables: ['1 Video', '5 Stories']
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
      brandRating: 4.9,
      applicants: 12,
      maxApplicants: 40,
      posted: '1 hour ago',
      matchScore: 92,
      recommended: true,
      urgency: 'normal',
      estimatedReach: '40K-80K',
      campaignGoal: 'Product Review',
      deliverables: ['1 Video', '3 Posts']
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
      brandRating: 4.8,
      applicants: 28,
      maxApplicants: 50,
      posted: '4 hours ago',
      matchScore: 85,
      recommended: true,
      urgency: 'normal',
      estimatedReach: '80K-150K',
      campaignGoal: 'Brand Awareness',
      deliverables: ['1 Vlog', '7 Stories', '2 Posts']
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
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
      setSuccessMessage('✓ Campaign saved to favorites');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const toggleBookmark = (campaignId: number) => {
    if (bookmarkedCampaigns.includes(campaignId)) {
      setBookmarkedCampaigns(bookmarkedCampaigns.filter(id => id !== campaignId));
    } else {
      setBookmarkedCampaigns([...bookmarkedCampaigns, campaignId]);
      setSuccessMessage('✓ Campaign bookmarked');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  const handleApply = async (campaign: Campaign) => {
    setModalContent({
      title: 'Apply to Campaign',
      message: 'Are you sure you want to apply to this campaign? The brand will review your profile.',
      campaign: campaign
    });
    setShowModal(true);
  };

  const confirmApply = () => {
    setShowModal(false);
    setSuccessMessage('✓ Application submitted successfully!');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleStackAction = (action: 'apply' | 'reject') => {
    if (action === 'apply' && filteredCampaigns[currentStackIndex]) {
      handleApply(filteredCampaigns[currentStackIndex]);
    }
    
    // Move to next card
    if (currentStackIndex < filteredCampaigns.length - 1) {
      setCurrentStackIndex(currentStackIndex + 1);
    } else {
      setCurrentStackIndex(0); // Loop back
    }
  };

  const scrollToCard = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = 450; // Approximate card width
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  let filteredCampaigns = availableCampaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || campaign.type === filterType;
    const matchesCategory = filterCategory === 'all' || campaign.category === filterCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  // Sort campaigns
  if (sortBy === 'budget_high') {
    filteredCampaigns = [...filteredCampaigns].sort((a, b) => b.budget - a.budget);
  } else if (sortBy === 'budget_low') {
    filteredCampaigns = [...filteredCampaigns].sort((a, b) => a.budget - b.budget);
  } else if (sortBy === 'match_score') {
    filteredCampaigns = [...filteredCampaigns].sort((a, b) => b.matchScore - a.matchScore);
  }

  // Stack View Component
  const StackView = ({ campaigns }: { campaigns: Campaign[] }) => {
    const [exitX, setExitX] = useState(0);
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

    if (campaigns.length === 0) return null;
    const campaign = campaigns[currentStackIndex];
    if (!campaign) return null;

    const TypeIcon = getTypeIcon(campaign.type);
    const applicantPercentage = ((campaign.applicants as number) / (campaign.maxApplicants as number)) * 100;

    return (
      <div className="flex flex-col items-center justify-center min-h-[700px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStackIndex}
            className="relative w-full max-w-md"
            style={{ x, rotate, opacity }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ 
              x: exitX, 
              opacity: 0,
              scale: 0.5,
              transition: { duration: 0.2 }
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Card */}
            <div className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-2xl">
              {/* Gray Header */}
              <div className="bg-gray-100 border-b-2 border-black p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center">
                      <BuildingOfficeIcon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[24px] font-black text-black leading-tight mb-1">{campaign.title as string}</h3>
                      <p className="text-[14px] text-gray-700 font-medium">by {campaign.brand as string}</p>
                    </div>
                  </div>
                  {(campaign.recommended as boolean) && (
                    <motion.div
                      className="px-3 py-1 bg-black text-white rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      <SparklesIcon className="w-4 h-4 inline mr-1" />
                      <span className="text-[10px] font-bold uppercase">Top Match</span>
                    </motion.div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[40px] font-black text-black leading-none">₹{(campaign.budget / 1000).toFixed(0)}K</p>
                    <p className="text-[11px] text-gray-600 uppercase tracking-wider mt-1">Total Budget</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-2 mb-1">
                      <StarIcon className="w-5 h-5 text-black" />
                      <span className="text-[24px] font-black text-black">{campaign.matchScore as number}%</span>
                    </div>
                    <p className="text-[11px] text-gray-600 uppercase tracking-wider">Match Score</p>
                  </div>
                </div>
              </div>

              {/* White Body */}
              <div className="p-6 space-y-6">
                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-3 hover:border-black transition-all duration-200">
                    <div className="flex items-center gap-2 mb-2">
                      <ClockIcon className="w-5 h-5 text-black" />
                      <p className="text-[11px] text-gray-500 uppercase font-bold">Duration</p>
                    </div>
                    <p className="text-[16px] font-black text-black">{campaign.duration as string}</p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-3 hover:border-black transition-all duration-200">
                    <div className="flex items-center gap-2 mb-2">
                      <EyeIcon className="w-5 h-5 text-black" />
                      <p className="text-[11px] text-gray-500 uppercase font-bold">Est. Reach</p>
                    </div>
                    <p className="text-[16px] font-black text-black">{campaign.estimatedReach}</p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-3 hover:border-black transition-all duration-200">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPinIcon className="w-5 h-5 text-black" />
                      <p className="text-[11px] text-gray-500 uppercase font-bold">Location</p>
                    </div>
                    <p className="text-[16px] font-black text-black truncate">{campaign.location}</p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-3 hover:border-black transition-all duration-200">
                    <div className="flex items-center gap-2 mb-2">
                      <RocketLaunchIcon className="w-5 h-5 text-black" />
                      <p className="text-[11px] text-gray-500 uppercase font-bold">Goal</p>
                    </div>
                    <p className="text-[16px] font-black text-black truncate">{campaign.campaignGoal}</p>
                  </div>
                </div>

                {/* Deliverables */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircleIcon className="w-5 h-5 text-black" />
                    <p className="text-[12px] font-bold text-black uppercase">Deliverables</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {campaign.deliverables.map((item: string, idx: number) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * idx }}
                        className="px-3 py-1.5 bg-white border-2 border-black rounded-lg text-[12px] font-bold text-black"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <UserGroupIcon className="w-4 h-4 text-black" />
                      <span className="text-[12px] font-bold text-black">
                        {campaign.applicants as number}/{campaign.maxApplicants as number} Applied
                      </span>
                    </div>
                    <span className="text-[12px] font-black text-black">{applicantPercentage.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div 
                      className="bg-black h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${applicantPercentage}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <motion.button
            onClick={() => {
              setExitX(-300);
              handleStackAction('reject');
            }}
            className="w-20 h-20 bg-white border-4 border-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-200 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <XMarkIcon className="w-10 h-10 text-black group-hover:scale-110 transition-transform" />
          </motion.button>

          <motion.div
            className="text-center px-6 py-2 bg-gray-50 border border-gray-200 rounded-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-[20px] font-black text-black">{currentStackIndex + 1}</p>
            <p className="text-[10px] text-gray-500 uppercase font-bold">of {campaigns.length}</p>
          </motion.div>

          <motion.button
            onClick={() => {
              setExitX(300);
              handleStackAction('apply');
            }}
            className="w-20 h-20 bg-black border-4 border-black rounded-full flex items-center justify-center hover:bg-gray-900 transition-all duration-200 group premium-glow-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <CheckIcon className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
          </motion.button>
        </div>

        {/* Instructions */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-[13px] text-gray-600 font-medium">
            <span className="font-bold">✗</span> to skip or <span className="font-bold">✓</span> to quick apply
          </p>
        </motion.div>
      </div>
    );
  };

  // Skeleton Loading
  const SkeletonLoader = () => (
    <div className="w-full px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto py-8 animate-pulse">
      <div className="bg-white border-b border-gray-200 -mx-8 md:-mx-16 lg:-mx-24 px-8 md:px-16 lg:px-24 mb-8">
        <div className="py-8">
          <div className="h-12 bg-gray-200 rounded w-96 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-64"></div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="h-40 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
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
                {modalContent.campaign && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                      <BuildingOfficeIcon className="w-6 h-6 text-black" />
                      <div>
                        <p className="font-black text-black">{modalContent.campaign.title}</p>
                        <p className="text-[12px] text-gray-600">by {modalContent.campaign.brand}</p>
                      </div>
                    </div>
                    <p className="text-[20px] font-black text-black">₹{modalContent.campaign.budget.toLocaleString()}</p>
                  </div>
                )}
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
                    onClick={confirmApply}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Yes, Apply
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
            initial={{ opacity: 0, y: -20, x: 100 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="bg-black text-white border-2 border-black rounded-lg p-4 shadow-2xl min-w-[300px]">
              <p className="text-[14px] font-bold">{successMessage}</p>
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
              <div className="flex items-center space-x-3 mb-3">
                <FireIcon className="w-5 h-5 text-black" />
                <span className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                  {filteredCampaigns.length} Active Campaigns
                </span>
              </div>
              <h1 className="text-[48px] md:text-[56px] font-black text-black tracking-tighter leading-none mb-3">
                Discover Campaigns
              </h1>
              <p className="text-[14px] text-gray-600 font-normal max-w-lg">
                Find perfect brand collaborations matching your niche and expertise
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {bookmarkedCampaigns.length > 0 && (
                <motion.button
                  className="bg-white border-2 border-gray-300 text-black px-4 py-3 rounded-full text-[13px] font-bold hover:border-black transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <BookmarkIcon className="w-4 h-4 inline mr-2" />
                  Saved ({bookmarkedCampaigns.length})
                </motion.button>
              )}
              <motion.button
                className="bg-white border-2 border-gray-300 text-black px-4 py-3 rounded-full text-[13px] font-bold hover:border-black transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <EyeIcon className="w-4 h-4 inline mr-2" />
                My Applications
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="w-full px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto py-8">
        {/* Filters */}
        <motion.div
          className="bg-white border border-gray-200 rounded-lg p-6 mb-6"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              <input
                type="text"
                placeholder="Search campaigns, brands, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black text-[14px] font-medium text-black transition-all duration-200"
              />
            </div>

            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
              {[
                { mode: 'list', icon: ListBulletIcon, label: 'List' },
                { mode: 'grid', icon: Squares2X2Icon, label: 'Grid' },
                { mode: 'cards', icon: SparklesIcon, label: 'Cards' },
                { mode: 'stack', icon: RocketLaunchIcon, label: 'Stack' }
              ].map(({ mode, icon: Icon, label }) => (
                <motion.button
                  key={mode}
                  onClick={() => setViewMode(mode as 'list' | 'grid' | 'cards' | 'stack')}
                  className={`px-4 py-2 rounded-lg text-[12px] font-bold transition-all duration-200 ${
                    viewMode === mode ? 'bg-black text-white' : 'text-gray-600 hover:bg-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4 inline mr-1" />
                  {label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stack View */}
        {viewMode === 'stack' && (
          <StackView campaigns={filteredCampaigns} />
        )}

        {/* Cards View - Horizontal Scroll */}
        {viewMode === 'cards' && (
          <div className="relative">
            {/* Navigation Arrows */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[24px] font-black text-black">Swipe Through Campaigns</h2>
              <div className="flex gap-2">
                <motion.button
                  onClick={() => scrollToCard('left')}
                  className="w-12 h-12 bg-white border-2 border-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowLeftIcon className="w-6 h-6 text-black" />
                </motion.button>
                <motion.button
                  onClick={() => scrollToCard('right')}
                  className="w-12 h-12 bg-black border-2 border-black rounded-full flex items-center justify-center hover:bg-gray-900 transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowRightIcon className="w-6 h-6 text-white" />
                </motion.button>
              </div>
            </div>

            {/* Scrollable Container */}
            <div 
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filteredCampaigns.map((campaign, index) => {
                const TypeIcon = getTypeIcon(campaign.type);
                const applicantPercentage = (campaign.applicants / campaign.maxApplicants) * 100;

                return (
                  <motion.div
                    key={campaign.id}
                    className="flex-shrink-0 w-[420px] snap-start"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="bg-white border-2 border-black rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 h-full">
                      {/* Gray Header */}
                      <div className="bg-gray-100 border-b-2 border-black p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                              <BuildingOfficeIcon className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-[20px] font-black text-black leading-tight mb-1 truncate">{campaign.title}</h3>
                              <p className="text-[13px] text-gray-700 font-medium">by {campaign.brand}</p>
                            </div>
                          </div>
                          <motion.button
                            onClick={() => toggleBookmark(campaign.id)}
                            className="ml-2"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {bookmarkedCampaigns.includes(campaign.id) ? (
                              <BookmarkIconSolid className="w-6 h-6 text-black" />
                            ) : (
                              <BookmarkIcon className="w-6 h-6 text-black" />
                            )}
                          </motion.button>
                        </div>
                        
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-[36px] font-black text-black leading-none">₹{(campaign.budget / 1000).toFixed(0)}K</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <StarIcon className="w-5 h-5 text-black" />
                            <span className="text-[20px] font-black text-black">{campaign.matchScore}%</span>
                          </div>
                        </div>
                      </div>

                      {/* White Body */}
                      <div className="p-6 space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {(campaign.recommended as boolean) && (
                            <span className="px-2 py-1 bg-black text-white rounded text-[10px] font-bold uppercase">
                              Recommended
                            </span>
                          )}
                          {campaign.urgency === 'urgent' && (
                            <span className="px-2 py-1 bg-black text-white rounded text-[10px] font-bold uppercase">
                              Urgent
                            </span>
                          )}
                          <span className="px-2 py-1 bg-gray-100 border border-gray-200 text-black rounded text-[10px] font-bold uppercase">
                            {campaign.type}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="border border-gray-200 rounded p-2">
                            <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Duration</p>
                            <p className="text-[14px] font-black text-black">{campaign.duration}</p>
                          </div>
                          <div className="border border-gray-200 rounded p-2">
                            <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Reach</p>
                            <p className="text-[14px] font-black text-black">{campaign.estimatedReach}</p>
                          </div>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded p-3">
                          <p className="text-[10px] font-bold text-black uppercase mb-2">Deliverables</p>
                          <div className="flex flex-wrap gap-1">
                            {campaign.deliverables.map((item: string, idx: number) => (
                              <span key={idx} className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-semibold text-black">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[11px] font-bold text-black">
                              {campaign.applicants as number}/{campaign.maxApplicants as number} Applied
                            </span>
                            <span className="text-[11px] font-black text-black">{applicantPercentage.toFixed(0)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-black h-2 rounded-full transition-all duration-500"
                              style={{ width: `${applicantPercentage}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <motion.button
                            className="flex-1 bg-black text-white px-4 py-3 rounded-lg font-semibold text-[13px] hover:bg-gray-900 transition-all duration-200"
                            onClick={() => handleApply(campaign)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Apply Now
                          </motion.button>
                          <motion.button
                            onClick={() => toggleSave(campaign.id)}
                            className="p-3 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-all duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {savedCampaigns.includes(campaign.id) ? (
                              <HeartIconSolid className="w-5 h-5 text-black" />
                            ) : (
                              <HeartIcon className="w-5 h-5 text-black" />
                            )}
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Grid View - 3 Columns */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign, index) => {
              const TypeIcon = getTypeIcon(campaign.type);
              const applicantPercentage = (campaign.applicants / campaign.maxApplicants) * 100;

              return (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <div className="bg-white border-2 border-black rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                    {/* Gray Header */}
                    <div className="bg-gray-100 border-b-2 border-black p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2 flex-1">
                          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                            <BuildingOfficeIcon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-[18px] font-black text-black leading-tight truncate">{campaign.title}</h3>
                            <p className="text-[12px] text-gray-700 font-medium truncate">{campaign.brand}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-[32px] font-black text-black leading-none">₹{(campaign.budget / 1000).toFixed(0)}K</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <StarIcon className="w-4 h-4 text-black" />
                          <span className="text-[18px] font-black text-black">{campaign.matchScore}%</span>
                        </div>
                      </div>
                    </div>

                    {/* White Body */}
                    <div className="p-5 space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {(campaign.recommended as boolean) && (
                          <span className="px-2 py-1 bg-black text-white rounded text-[10px] font-bold uppercase">
                            Top Pick
                          </span>
                        )}
                        <span className="px-2 py-1 bg-gray-100 border border-gray-200 text-black rounded text-[10px] font-bold">
                          {campaign.type}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[12px]">
                          <span className="text-gray-600 flex items-center gap-1">
                            <ClockIcon className="w-4 h-4" />
                            Duration
                          </span>
                          <span className="font-bold text-black">{campaign.duration}</span>
                        </div>
                        <div className="flex items-center justify-between text-[12px]">
                          <span className="text-gray-600 flex items-center gap-1">
                            <EyeIcon className="w-4 h-4" />
                            Reach
                          </span>
                          <span className="font-bold text-black">{campaign.estimatedReach}</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-bold text-black">{campaign.applicants as number}/{campaign.maxApplicants as number}</span>
                          <span className="text-[11px] font-black text-black">{applicantPercentage.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-black h-2 rounded-full transition-all duration-500"
                            style={{ width: `${applicantPercentage}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <motion.button
                          className="flex-1 bg-black text-white px-4 py-2.5 rounded-lg font-semibold text-[12px] hover:bg-gray-900 transition-all duration-200"
                          onClick={() => handleApply(campaign)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Apply
                        </motion.button>
                        <motion.button
                          onClick={() => toggleBookmark(campaign.id)}
                          className="p-2.5 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-all duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {bookmarkedCampaigns.includes(campaign.id) ? (
                            <BookmarkIconSolid className="w-5 h-5 text-black" />
                          ) : (
                            <BookmarkIcon className="w-5 h-5 text-black" />
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            {filteredCampaigns.map((campaign, index) => {
              const TypeIcon = getTypeIcon(campaign.type);
              const applicantPercentage = (campaign.applicants / campaign.maxApplicants) * 100;

              return (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border-2 border-black rounded-lg p-6 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-center justify-between gap-6">
                    {/* Left Section - Campaign Info */}
                    <div className="flex items-center gap-6 flex-1">
                      <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
                        <BuildingOfficeIcon className="w-9 h-9 text-white" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-[24px] font-black text-black truncate">{campaign.title}</h3>
                          {(campaign.recommended as boolean) && (
                            <span className="px-3 py-1 bg-black text-white rounded-full text-[10px] font-bold uppercase whitespace-nowrap">
                              Top Match
                            </span>
                          )}
                          {campaign.urgency === 'urgent' && (
                            <span className="px-3 py-1 bg-black text-white rounded-full text-[10px] font-bold uppercase whitespace-nowrap">
                              Urgent
                            </span>
                          )}
                        </div>
                        <p className="text-[14px] text-gray-600 mb-3 font-medium">by {campaign.brand} • {campaign.category}</p>
                        
                        <div className="flex items-center gap-6 text-[13px]">
                          <div className="flex items-center gap-2">
                            <ClockIcon className="w-4 h-4 text-black" />
                            <span className="font-bold text-black">{campaign.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <EyeIcon className="w-4 h-4 text-black" />
                            <span className="font-bold text-black">{campaign.estimatedReach}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPinIcon className="w-4 h-4 text-black" />
                            <span className="font-bold text-black">{campaign.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <StarIcon className="w-4 h-4 text-black" />
                            <span className="font-bold text-black">{campaign.matchScore}% Match</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Middle Section - Deliverables */}
                    <div className="flex-shrink-0">
                      <p className="text-[10px] text-gray-500 uppercase font-bold mb-2">Deliverables</p>
                      <div className="flex flex-wrap gap-2 max-w-xs">
                        {campaign.deliverables.slice(0, 3).map((item: string, idx: number) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-[11px] font-semibold text-black">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Section - Budget & Actions */}
                    <div className="flex items-center gap-6 flex-shrink-0">
                      <div className="text-right">
                        <p className="text-[40px] font-black text-black leading-none mb-1">₹{(campaign.budget / 1000).toFixed(0)}K</p>
                        <p className="text-[11px] text-gray-500 font-medium uppercase">Total Budget</p>
                        
                        {/* Progress */}
                        <div className="mt-3">
                          <div className="flex items-center justify-end gap-2 mb-1">
                            <UserGroupIcon className="w-3 h-3 text-black" />
                            <span className="text-[10px] font-bold text-black">
                              {campaign.applicants as number}/{campaign.maxApplicants as number}
                            </span>
                          </div>
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-black h-2 rounded-full transition-all duration-500"
                              style={{ width: `${applicantPercentage}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <motion.button
                          className="bg-black text-white px-6 py-3 rounded-lg font-semibold text-[13px] hover:bg-gray-900 transition-all duration-200 whitespace-nowrap"
                          onClick={() => handleApply(campaign)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Apply Now
                        </motion.button>
                        <div className="flex gap-2">
                          <motion.button
                            onClick={() => toggleBookmark(campaign.id)}
                            className="flex-1 p-2 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-all duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {bookmarkedCampaigns.includes(campaign.id) ? (
                              <BookmarkIconSolid className="w-5 h-5 text-black" />
                            ) : (
                              <BookmarkIcon className="w-5 h-5 text-black" />
                            )}
                          </motion.button>
                          <motion.button
                            onClick={() => toggleSave(campaign.id)}
                            className="flex-1 p-2 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-all duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {savedCampaigns.includes(campaign.id) ? (
                              <HeartIconSolid className="w-5 h-5 text-black" />
                            ) : (
                              <HeartIcon className="w-5 h-5 text-black" />
                            )}
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <FloatingNav userType="creator" />
    </motion.div>
  );
}

export default function CreatorCampaigns() {
  return (
    <DashboardLayout userType="creator" userName="Creator Name" userEmail="creator@example.com">
      <CreatorCampaignsContent />
    </DashboardLayout>
  );
}
