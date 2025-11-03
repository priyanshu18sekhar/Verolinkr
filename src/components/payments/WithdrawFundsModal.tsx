'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BanknotesIcon, ArrowDownTrayIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import BaseModal from '../modals/BaseModal';
import GlassButton from '../design-system/GlassButton';
import GlassInput from '../design-system/GlassInput';
import GlassCard from '../design-system/GlassCard';
import { useModal } from '@/contexts/ModalContext';

interface WithdrawFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
  onWithdraw?: (amount: number, accountId: string) => void;
}

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  accountHolderName: string;
}

export default function WithdrawFundsModal({
  isOpen,
  onClose,
  availableBalance,
  onWithdraw,
}: WithdrawFundsModalProps) {
  const [amount, setAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { openSuccess, openError } = useModal();

  // Mock bank accounts - in real app, fetch from API
  const bankAccounts: BankAccount[] = [
    {
      id: '1',
      bankName: 'HDFC Bank',
      accountNumber: '****1234',
      ifsc: 'HDFC0001234',
      accountHolderName: 'John Doe',
    },
    {
      id: '2',
      bankName: 'ICICI Bank',
      accountNumber: '****5678',
      ifsc: 'ICIC0005678',
      accountHolderName: 'John Doe',
    },
  ];

  const handleWithdraw = async () => {
    const withdrawAmount = parseFloat(amount);
    
    if (!withdrawAmount || withdrawAmount <= 0) {
      openError({
        message: 'Please enter a valid amount',
        title: 'Invalid Amount',
      });
      return;
    }

    if (withdrawAmount > availableBalance) {
      openError({
        message: 'Insufficient balance. Available balance is ₹' + availableBalance.toLocaleString(),
        title: 'Insufficient Balance',
      });
      return;
    }

    if (!selectedAccount) {
      openError({
        message: 'Please select a bank account',
        title: 'Account Required',
      });
      return;
    }

    if (withdrawAmount < 100) {
      openError({
        message: 'Minimum withdrawal amount is ₹100',
        title: 'Minimum Amount',
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate withdrawal processing
    setTimeout(() => {
      setIsProcessing(false);
      onWithdraw?.(withdrawAmount, selectedAccount);
      openSuccess({
        message: `₹${withdrawAmount.toLocaleString()} will be transferred to your bank account within 2-3 business days`,
        title: 'Withdrawal Request Submitted',
        buttonText: 'Got it',
        onButtonClick: () => {
          onClose();
          setAmount('');
          setSelectedAccount('');
        },
      });
    }, 2000);
  };

  const quickAmounts = [5000, 10000, 25000, availableBalance];

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Withdraw Funds"
      size="lg"
      showCloseButton={true}
    >
      <div className="p-8">
        {/* Available Balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <GlassCard variant="elevated" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Available Balance</p>
                <p className="text-4xl font-black text-gray-900">₹{availableBalance.toLocaleString()}</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500/30 flex items-center justify-center backdrop-blur-sm">
                <BanknotesIcon className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Amount Input */}
        <div className="mb-8">
          <GlassInput
            label="Withdrawal Amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            helperText="Minimum withdrawal: ₹100"
          />

          {/* Quick Amounts */}
          <div className="flex gap-3 mt-4">
            {quickAmounts.map((quickAmount) => (
              <motion.button
                key={quickAmount}
                onClick={() => setAmount(quickAmount.toString())}
                className={`px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-bold transition-all duration-200 ${
                  amount === quickAmount.toString()
                    ? 'bg-white/30 border-white/40 text-gray-900'
                    : 'text-gray-700 hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {quickAmount === availableBalance ? 'All' : `₹${(quickAmount / 1000).toFixed(0)}K`}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Bank Account Selection */}
        <div className="mb-8">
          <p className="text-sm font-bold text-gray-700 mb-4">Select Bank Account</p>
          <div className="space-y-3">
            {bankAccounts.map((account, index) => {
              const isSelected = selectedAccount === account.id;
              
              return (
                <motion.button
                  key={account.id}
                  onClick={() => setSelectedAccount(account.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`w-full p-4 rounded-2xl bg-white/20 backdrop-blur-xl border-2 transition-all duration-300 text-left ${
                    isSelected
                      ? 'border-blue-500/40 bg-blue-500/20 shadow-lg'
                      : 'border-white/20 hover:border-white/30 hover:bg-white/25'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-900 mb-1">{account.bankName}</p>
                      <p className="text-sm text-gray-600">{account.accountNumber}</p>
                      <p className="text-xs text-gray-500 mt-1">IFSC: {account.ifsc}</p>
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center"
                      >
                        <CheckCircleIcon className="w-5 h-5 text-white" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-2"
          >
            <span>+ Add New Bank Account</span>
          </motion.button>
        </div>

        {/* Transaction Details Preview */}
        {amount && parseFloat(amount) > 0 && selectedAccount && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <GlassCard variant="floating" className="p-6">
              <p className="text-sm font-bold text-gray-700 mb-4">Transaction Summary</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Withdrawal Amount:</span>
                  <span className="font-bold text-gray-900">₹{parseFloat(amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing Fee:</span>
                  <span className="font-bold text-gray-900">₹0</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/20">
                  <span className="text-gray-700 font-bold">Amount Received:</span>
                  <span className="font-black text-green-600">₹{parseFloat(amount).toLocaleString()}</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Withdraw Button */}
        <GlassButton
          variant="primary"
          size="lg"
          onClick={handleWithdraw}
          disabled={isProcessing || !amount || !selectedAccount}
          className="w-full"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <motion.span
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              Processing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <ArrowDownTrayIcon className="w-5 h-5" />
              Withdraw Funds
            </span>
          )}
        </GlassButton>
      </div>
    </BaseModal>
  );
}


