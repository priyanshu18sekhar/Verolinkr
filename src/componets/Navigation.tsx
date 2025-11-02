'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    { name: 'Home', href: '/' },
    { name: 'Contact', href: '/contact' },
  ];

  const authItems = [
    { name: 'Login', href: '/auth' },
  ];

  const userItems = userType === 'brand' 
    ? [
        { name: 'Dashboard', href: '/brand-dashboard' },
        { name: 'Creators', href: '/brand-dashboard/creators' },
        { name: 'Campaigns', href: '/brand-dashboard/campaigns' },
      ]
    : userType === 'creator'
    ? [
        { name: 'Dashboard', href: '/creator-dashboard' },
        { name: 'Campaigns', href: '/creator-dashboard/campaigns' },
        { name: 'Gigs', href: '/creator-dashboard/gigs' },
      ]
    : [];

  const itemsToShow = isLoggedIn ? userItems : [...navigationItems, ...authItems];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Just text, black and white */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-black text-black tracking-tighter">VeroLinkr</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {itemsToShow.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-black px-3 py-2 text-base font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            
            {!isLoggedIn && (
              <div className="flex items-center space-x-4 ml-4">
                <Link href="/auth" className="text-gray-600 hover:text-black px-4 py-2 text-base font-medium transition-colors duration-200">
                  Login
                </Link>
                <Link href="/auth">
                  <motion.button
                    className="px-6 py-3 bg-black text-white rounded-full font-bold text-base relative overflow-hidden group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Gradient glow background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 blur-xl -z-10"
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                    />
                    <span className="relative z-10">Get Started</span>
                  </motion.button>
                </Link>
              </div>
            )}
            
            {isLoggedIn && (
              <div className="flex items-center space-x-4 ml-4">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-gray-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {userType === 'brand' ? 'Brand' : 'Creator'}
                  </span>
                </div>
                <button className="text-gray-600 hover:text-black px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-black p-2 transition-colors duration-200"
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
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 py-6"
            >
              <div className="space-y-2">
                {itemsToShow.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-600 hover:text-black block px-3 py-3 text-base font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {!isLoggedIn && (
                  <div className="pt-4 border-t border-gray-200 space-y-3 px-3">
                    <Link href="/auth" onClick={() => setIsMenuOpen(false)}>
                      <button className="w-full text-gray-600 hover:text-black px-4 py-3 text-base font-medium transition-colors duration-200">
                        Login
                      </button>
                    </Link>
                    <Link href="/auth" onClick={() => setIsMenuOpen(false)}>
                      <motion.button
                        className="w-full px-6 py-3 bg-black text-white rounded-full font-bold text-base relative overflow-hidden group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 blur-xl -z-10"
                          animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                          }}
                        />
                        <span className="relative z-10">Get Started</span>
                      </motion.button>
                    </Link>
                  </div>
                )}
                
                {isLoggedIn && (
                  <div className="pt-4 border-t border-gray-200 space-y-3 px-3">
                    <div className="flex items-center space-x-2 px-3 py-2">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-gray-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {userType === 'brand' ? 'Brand' : 'Creator'}
                      </span>
                    </div>
                    <button className="text-gray-600 hover:text-black block px-3 py-3 text-base font-medium transition-colors duration-200">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
