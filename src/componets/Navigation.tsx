'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Bars3Icon, 
  XMarkIcon,
  HomeIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

interface NavigationProps {
  userType?: 'brand' | 'creator' | null;
  isLoggedIn?: boolean;
}

export default function Navigation({ userType, isLoggedIn = false }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Contact', href: '/contact', icon: ChatBubbleLeftRightIcon },
  ];

  const authItems = [
    { name: 'Login', href: '/auth', icon: UserIcon },
  ];

  const userItems = userType === 'brand' 
    ? [
        { name: 'Dashboard', href: '/brand-dashboard', icon: HomeIcon },
        { name: 'Discover Creators', href: '/discover-creators', icon: UserIcon },
        { name: 'My Campaigns', href: '/my-campaigns', icon: ChatBubbleLeftRightIcon },
      ]
    : userType === 'creator'
    ? [
        { name: 'Dashboard', href: '/creator-dashboard', icon: HomeIcon },
        { name: 'Available Campaigns', href: '/my-campaigns', icon: ChatBubbleLeftRightIcon },
        { name: 'Earnings', href: '/earnings', icon: UserIcon },
      ]
    : [];

  const itemsToShow = isLoggedIn ? userItems : [...navigationItems, ...authItems];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="text-xl font-bold text-gray-900">VeroLinkr</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {itemsToShow.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
            
            {!isLoggedIn && (
              <div className="flex items-center space-x-4 ml-4">
                <Link
                  href="/auth"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/auth"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Get Started
                </Link>
              </div>
            )}
            
            {isLoggedIn && (
              <div className="flex items-center space-x-4 ml-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {userType === 'brand' ? 'Brand Account' : 'Creator Account'}
                  </span>
                </div>
                <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-1">
                  <ArrowRightOnRectangleIcon className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2 rounded-md transition-colors duration-200"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 py-4"
          >
            <div className="space-y-2">
              {itemsToShow.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center space-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
              
              {!isLoggedIn && (
                <div className="pt-4 border-t border-gray-200">
                  <Link
                    href="/auth"
                    className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-center font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
              
              {isLoggedIn && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2 px-3 py-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <UserIcon className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {userType === 'brand' ? 'Brand Account' : 'Creator Account'}
                    </span>
                  </div>
                  <button className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center space-x-2">
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}

