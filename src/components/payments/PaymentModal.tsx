'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCardIcon, BanknotesIcon, WalletIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import BaseModal from '../modals/BaseModal';
import GlassButton from '../design-system/GlassButton';
import GlassInput from '../design-system/GlassInput';
import { glassFadeIn } from '@/utils/glassAnimations';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onPaymentComplete?: (paymentMethod: string) => void;
}

type PaymentMethod = 'card' | 'upi' | 'wallet' | 'bank';

export default function PaymentModal({
  isOpen,
  onClose,
  amount,
  onPaymentComplete,
}: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    { id: 'card' as PaymentMethod, name: 'Credit/Debit Card', icon: CreditCardIcon },
    { id: 'upi' as PaymentMethod, name: 'UPI', icon: WalletIcon },
    { id: 'wallet' as PaymentMethod, name: 'Wallet', icon: WalletIcon },
    { id: 'bank' as PaymentMethod, name: 'Net Banking', icon: BanknotesIcon },
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete?.(selectedMethod);
      onClose();
    }, 2000);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Payment"
      size="md"
      showCloseButton={true}
    >
      <div className="p-8">
        {/* Amount Display */}
        <motion.div
          variants={glassFadeIn}
          initial="initial"
          animate="animate"
          className="text-center mb-8"
        >
          <p className="text-sm text-gray-600 mb-2">Total Amount</p>
          <p className="text-5xl font-black text-gray-900">₹{amount.toLocaleString()}</p>
        </motion.div>

        {/* Payment Methods */}
        <div className="space-y-3 mb-8">
          <p className="text-sm font-bold text-gray-700 mb-4">Select Payment Method</p>
          {paymentMethods.map((method, index) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.id;
            
            return (
              <motion.button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`w-full p-4 rounded-2xl bg-white/20 backdrop-blur-xl border-2 transition-all duration-300 ${
                  isSelected
                    ? 'border-white/40 bg-white/30 shadow-lg'
                    : 'border-white/20 hover:border-white/30 hover:bg-white/25'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-white/30' : 'bg-white/20'
                  }`}>
                    <Icon className={`w-6 h-6 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
                  </div>
                  <span className={`flex-1 text-left font-bold ${
                    isSelected ? 'text-gray-900' : 'text-gray-700'
                  }`}>
                    {method.name}
                  </span>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Payment Form - Card */}
        {selectedMethod === 'card' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 mb-8"
          >
            <GlassInput
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              type="text"
              maxLength={19}
            />
            <div className="grid grid-cols-2 gap-4">
              <GlassInput
                label="Expiry"
                placeholder="MM/YY"
                type="text"
                maxLength={5}
              />
              <GlassInput
                label="CVV"
                placeholder="123"
                type="text"
                maxLength={3}
              />
            </div>
            <GlassInput
              label="Cardholder Name"
              placeholder="John Doe"
              type="text"
            />
          </motion.div>
        )}

        {/* Payment Form - UPI */}
        {selectedMethod === 'upi' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <GlassInput
              label="UPI ID"
              placeholder="yourname@paytm"
              type="text"
            />
          </motion.div>
        )}

        {/* Security Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <ShieldCheckIcon className="w-5 h-5 text-green-600" />
          <span className="text-sm text-gray-600">Secure payment encrypted with SSL</span>
        </motion.div>

        {/* Payment Button */}
        <GlassButton
          variant="primary"
          size="lg"
          onClick={handlePayment}
          disabled={isProcessing}
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
            `Pay ₹${amount.toLocaleString()}`
          )}
        </GlassButton>
      </div>
    </BaseModal>
  );
}


