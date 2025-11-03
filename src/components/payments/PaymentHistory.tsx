'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, FunnelIcon, ArrowDownTrayIcon, CalendarIcon } from '@heroicons/react/24/outline';
import GlassCard from '../design-system/GlassCard';
import GlassInput from '../design-system/GlassInput';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  reference: string;
}

interface PaymentHistoryProps {
  transactions?: Transaction[];
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'credit',
    amount: 25000,
    description: 'Campaign Payment - TechGiant',
    date: '2024-01-15',
    status: 'completed',
    reference: 'TXN123456',
  },
  {
    id: '2',
    type: 'debit',
    amount: 15000,
    description: 'Withdrawal to HDFC Bank',
    date: '2024-01-12',
    status: 'completed',
    reference: 'WDX789012',
  },
  {
    id: '3',
    type: 'credit',
    amount: 20000,
    description: 'Campaign Payment - FashionHouse',
    date: '2024-01-10',
    status: 'completed',
    reference: 'TXN345678',
  },
  {
    id: '4',
    type: 'credit',
    amount: 18000,
    description: 'CPV Campaign Earnings',
    date: '2024-01-08',
    status: 'pending',
    reference: 'TXN901234',
  },
  {
    id: '5',
    type: 'credit',
    amount: 12000,
    description: 'Gig Order Payment',
    date: '2024-01-05',
    status: 'completed',
    reference: 'TXN567890',
  },
];

export default function PaymentHistory({ transactions = mockTransactions }: PaymentHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'credit' | 'debit'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || txn.type === filterType;
    const matchesStatus = filterStatus === 'all' || txn.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-700 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
      case 'failed':
        return 'bg-red-500/20 text-red-700 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-black text-gray-900">Payment History</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-xl bg-white/20 backdrop-blur-xl border border-white/30 hover:bg-white/30 transition-all duration-200 flex items-center gap-2 font-bold text-gray-700"
        >
          <ArrowDownTrayIcon className="w-5 h-5" />
          Export
        </motion.button>
      </div>

      {/* Filters */}
      <GlassCard variant="elevated" className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <GlassInput
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12"
            />
          </div>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-4 py-3 rounded-xl bg-white/20 backdrop-blur-xl border border-white/30 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-gray-700"
          >
            <option value="all">All Types</option>
            <option value="credit">Credits</option>
            <option value="debit">Debits</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-3 rounded-xl bg-white/20 backdrop-blur-xl border border-white/30 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-gray-700"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </GlassCard>

      {/* Transactions List */}
      <div className="space-y-4">
        {filteredTransactions.length === 0 ? (
          <GlassCard variant="floating" className="p-12 text-center">
            <p className="text-gray-600 text-lg">No transactions found</p>
          </GlassCard>
        ) : (
          filteredTransactions.map((txn, index) => (
            <motion.div
              key={txn.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <GlassCard
                variant="elevated"
                className="p-6 hover:scale-[1.01] transition-transform duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Type Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm ${
                        txn.type === 'credit'
                          ? 'bg-green-500/20 border-2 border-green-500/30'
                          : 'bg-red-500/20 border-2 border-red-500/30'
                      }`}
                    >
                      <span className={`text-2xl font-black ${
                        txn.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {txn.type === 'credit' ? '+' : '-'}
                      </span>
                    </div>

                    {/* Transaction Details */}
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 mb-1">{txn.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          {formatDate(txn.date)}
                        </span>
                        <span className="font-mono text-xs">{txn.reference}</span>
                      </div>
                    </div>

                    {/* Amount and Status */}
                    <div className="text-right">
                      <p
                        className={`text-2xl font-black mb-2 ${
                          txn.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {txn.type === 'credit' ? '+' : '-'}₹{txn.amount.toLocaleString()}
                      </p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-sm ${getStatusColor(
                          txn.status
                        )}`}
                      >
                        {txn.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}


