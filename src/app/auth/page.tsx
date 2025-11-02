'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input, Button, Container, Typography } from '../../components/design-system';
import { AnimatedParticles } from '../../components/onboarding';
import { fadeInUp } from '../../utils/animations';

export default function AuthPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (isSignup: boolean = false) => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (isSignup) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isSignup = activeTab === 'signup';
    
    if (validateForm(isSignup)) {
      // Store user data
      localStorage.setItem('authData', JSON.stringify({
        email: formData.email,
        userType: null // Will be set during onboarding
      }));
      
      if (isSignup) {
        // Redirect to onboarding role selection
        router.push('/onboarding/role-selection');
      } else {
        // Redirect to dashboard (will need auth check)
        router.push('/creator-dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Subtle background elements matching Hero */}
      <AnimatedParticles count={40} />

      <Container size="sm">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="w-full relative z-10"
        >
          {/* Header - Matching Hero style */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography variant="h2" className="mb-6 font-black">
              Welcome to VeroLinkr
            </Typography>
              <Typography variant="lead" className="text-gray-600 font-light">
                The Premium Platform for Authentic Influencer Marketing
            </Typography>
            </motion.div>
          </div>

          {/* Auth Card */}
          <motion.div
            className="bg-white border-2 border-gray-200 rounded-3xl p-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Tab Navigation */}
            <div className="flex mb-12 bg-gray-50 rounded-2xl p-1">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-4 px-6 rounded-xl text-lg font-black transition-all duration-200 ${
                  activeTab === 'login'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-4 px-6 rounded-xl text-lg font-black transition-all duration-200 ${
                  activeTab === 'signup'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                Sign Up
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'login' ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <Input
                      label="Email Address"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      error={errors.email}
                      required
                    />

                    <div>
                      <div className="relative">
                      <Input
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                          error={errors.password}
                        required
                      />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-12 text-gray-500 hover:text-black"
                        >
                          {showPassword ? (
                            <EyeSlashIcon className="w-6 h-6" />
                          ) : (
                            <EyeIcon className="w-6 h-6" />
                          )}
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="h-5 w-5 rounded border-gray-300 text-black focus:ring-black"
                          />
                          <span className="text-sm font-medium text-gray-700">Remember me</span>
                        </label>
                        <Link href="/forgot-password" className="text-sm font-bold text-black hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      type="submit"
                      className="w-full"
                    >
                      Sign In
                    </Button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <Input
                      label="Email Address"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      error={errors.email}
                      required
                    />

                    <div>
                      <div className="relative">
                        <Input
                          label="Password"
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Create a strong password"
                          error={errors.password}
                          hint="Must be at least 8 characters long"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-12 text-gray-500 hover:text-black"
                        >
                          {showPassword ? (
                            <EyeSlashIcon className="w-6 h-6" />
                          ) : (
                            <EyeIcon className="w-6 h-6" />
                          )}
                        </button>
                          </div>
                        </div>

                    <div>
                      <div className="relative">
                        <Input
                          label="Confirm Password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="Confirm your password"
                          error={errors.confirmPassword}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-12 text-gray-500 hover:text-black"
                        >
                          {showConfirmPassword ? (
                            <EyeSlashIcon className="w-6 h-6" />
                          ) : (
                            <EyeIcon className="w-6 h-6" />
                          )}
                        </button>
                          </div>
                        </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-start space-x-4">
                      <input
                        type="checkbox"
                        id="terms"
                        className="mt-2 h-5 w-5 rounded border-gray-300 text-black focus:ring-black"
                        required
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600">
                        I agree to the{' '}
                        <Link href="/terms" className="text-black font-bold hover:underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-black font-bold hover:underline">
                          Privacy Policy
                    </Link>
                      </label>
                  </div>

                    <Button
                      variant="primary"
                      size="lg"
                      type="submit"
                      className="w-full"
                    >
                      Create Account
                    </Button>
                  </form>

                  <div className="text-center pt-4">
                    <Typography variant="caption" className="text-gray-600">
                      Already have an account?{' '}
                      <button
                        onClick={() => setActiveTab('login')}
                        className="text-black font-bold hover:underline"
                      >
                        Sign in here
                      </button>
                    </Typography>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Footer Links */}
          <div className="text-center mt-12 space-y-4">
            <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-black block">
              Contact Support
            </Link>
            <div className="text-xs text-gray-500">
              By continuing, you agree to our{' '}
              <Link href="/terms" className="underline hover:text-gray-700">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="underline hover:text-gray-700">
                Privacy Policy
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
