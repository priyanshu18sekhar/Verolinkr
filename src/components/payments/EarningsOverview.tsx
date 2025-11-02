'use client';

import { motion, useMotionValue, useSpring, useMotionValueEvent } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CurrencyDollarIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, ClockIcon } from '@heroicons/react/24/outline';
import GlassCard from '../design-system/GlassCard';
import ProgressBar from '../loading/ProgressBar';

interface EarningsOverviewProps {
  totalEarnings?: number;
  pendingEarnings?: number;
  withdrawnEarnings?: number;
  monthlyEarnings?: number;
  growthPercentage?: number;
  chartData?: Array<{ month: string; earnings: number }>;
}

export default function EarningsOverview({
  totalEarnings = 185000,
  pendingEarnings = 32000,
  withdrawnEarnings = 120000,
  monthlyEarnings = 45000,
  growthPercentage = 24.5,
  chartData,
}: EarningsOverviewProps) {
  const animatedTotal = useMotionValue(0);
  const animatedPending = useMotionValue(0);
  const animatedWithdrawn = useMotionValue(0);
  const animatedMonthly = useMotionValue(0);

  const totalSpring = useSpring(animatedTotal, { stiffness: 100, damping: 20 });
  const pendingSpring = useSpring(animatedPending, { stiffness: 100, damping: 20 });
  const withdrawnSpring = useSpring(animatedWithdrawn, { stiffness: 100, damping: 20 });
  const monthlySpring = useSpring(animatedMonthly, { stiffness: 100, damping: 20 });

  useEffect(() => {
    animatedTotal.set(totalEarnings);
    animatedPending.set(pendingEarnings);
    animatedWithdrawn.set(withdrawnEarnings);
    animatedMonthly.set(monthlyEarnings);
  }, [totalEarnings, pendingEarnings, withdrawnEarnings, monthlyEarnings, animatedTotal, animatedPending, animatedWithdrawn, animatedMonthly]);

  const AnimatedNumber = ({ motionValue }: { motionValue: typeof totalSpring }) => {
    const [value, setValue] = useState(0);

    useMotionValueEvent(motionValue, 'change', (latest) => {
      setValue(Math.round(latest));
    });

    return <span>{value.toLocaleString()}</span>;
  };

  const stats = [
    {
      label: 'Total Earnings',
      value: totalEarnings,
      icon: CurrencyDollarIcon,
      color: 'green',
      spring: totalSpring,
      trend: '+32% this month',
    },
    {
      label: 'Pending Earnings',
      value: pendingEarnings,
      icon: ClockIcon,
      color: 'blue',
      spring: pendingSpring,
      trend: 'Available to withdraw',
    },
    {
      label: 'Withdrawn',
      value: withdrawnEarnings,
      icon: ArrowTrendingDownIcon,
      color: 'purple',
      spring: withdrawnSpring,
      trend: 'Total withdrawn',
    },
    {
      label: 'This Month',
      value: monthlyEarnings,
      icon: ArrowTrendingUpIcon,
      color: 'orange',
      spring: monthlySpring,
      trend: `+${growthPercentage}% growth`,
    },
  ];

  const withdrawalProgress = (withdrawnEarnings / totalEarnings) * 100;

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            green: 'bg-green-500/20 border-green-500/30 text-green-600',
            blue: 'bg-blue-500/20 border-blue-500/30 text-blue-600',
            purple: 'bg-purple-500/20 border-purple-500/30 text-purple-600',
            orange: 'bg-orange-500/20 border-orange-500/30 text-orange-600',
          };

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard variant="elevated" className="p-6 hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 backdrop-blur-sm ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-600 mb-2">{stat.label}</p>
                <p className="text-3xl font-black text-gray-900 mb-1">
                  ₹<AnimatedNumber motionValue={stat.spring} />
                </p>
                <p className={`text-xs font-bold ${
                  stat.color === 'green' ? 'text-green-600' :
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'purple' ? 'text-purple-600' :
                  'text-orange-600'
                }`}>
                  {stat.trend}
                </p>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Earnings Breakdown */}
      <GlassCard variant="elevated" className="p-8">
        <h4 className="text-2xl font-black text-gray-900 mb-6">Earnings Breakdown</h4>
        
        <div className="space-y-6">
          {/* Withdrawal Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-gray-700">Withdrawn Amount</span>
              <span className="text-sm font-black text-gray-900">
                ₹{withdrawnEarnings.toLocaleString()} / ₹{totalEarnings.toLocaleString()}
              </span>
            </div>
            <ProgressBar
              progress={withdrawalProgress}
              variant="linear"
              color="gradient"
              size="lg"
              showLabel={false}
            />
          </div>

          {/* Earnings Chart Placeholder */}
          {chartData && chartData.length > 0 && (
            <div className="mt-8">
              <h5 className="text-lg font-bold text-gray-900 mb-4">Monthly Trend</h5>
              <div className="grid grid-cols-7 gap-2">
                {chartData.map((data, index) => {
                  const maxEarnings = Math.max(...chartData.map((d) => d.earnings));
                  const heightPercentage = (data.earnings / maxEarnings) * 100;

                  return (
                    <div key={index} className="flex flex-col items-center gap-2">
                      <div className="w-full h-32 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 relative overflow-hidden">
                        <motion.div
                          className="absolute bottom-0 w-full rounded-xl bg-gradient-to-t from-blue-500 via-purple-500 to-pink-500 backdrop-blur-sm"
                          initial={{ height: 0 }}
                          animate={{ height: `${heightPercentage}%` }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600">{data.month}</span>
                      <span className="text-xs font-bold text-gray-900">₹{(data.earnings / 1000).toFixed(0)}K</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
