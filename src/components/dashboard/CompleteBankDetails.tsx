'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon, BanknotesIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Input } from '../design-system';
import { apiPost } from '@/lib/api/client';

interface CompleteBankDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CompleteBankDetails({ isOpen, onClose, onSuccess }: CompleteBankDetailsProps) {
  const [formData, setFormData] = useState({
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    pan: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.bankName.trim()) {
      newErrors.bankName = 'Bank name is required';
    }

    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required';
    } else if (!/^\d{9,18}$/.test(formData.accountNumber.replace(/\D/g, ''))) {
      newErrors.accountNumber = 'Invalid account number (9-18 digits)';
    }

    if (!formData.ifscCode.trim()) {
      newErrors.ifscCode = 'IFSC code is required';
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode.toUpperCase())) {
      newErrors.ifscCode = 'Invalid IFSC code';
    }

    if (!formData.pan.trim()) {
      newErrors.pan = 'PAN is required';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan.toUpperCase())) {
      newErrors.pan = 'Invalid PAN';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await apiPost('/api/creators/me/bank-details', {
        ...formData,
        ifscCode: formData.ifscCode.toUpperCase(),
        pan: formData.pan.toUpperCase(),
      });
      onSuccess();
      onClose();
    } catch (error) {
      setErrors({ submit: 'Failed to save bank details. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <BanknotesIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Complete Bank Details</h2>
              <p className="text-sm text-gray-500">Required to receive payments</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Bank Name"
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleInputChange}
            placeholder="Enter bank name"
            error={errors.bankName}
          />

          <Input
            label="Account Number"
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleInputChange}
            placeholder="Enter account number"
            error={errors.accountNumber}
          />

          <Input
            label="IFSC Code"
            type="text"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase();
              handleInputChange(e);
            }}
            placeholder="SBIN0001234"
            error={errors.ifscCode}
          />

          <Input
            label="PAN Number"
            type="text"
            name="pan"
            value={formData.pan}
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase();
              handleInputChange(e);
            }}
            placeholder="ABCDE1234F"
            error={errors.pan}
          />

          {/* Security Notice */}
          <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
            <div className="flex items-start gap-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-purple-700">
                Your bank details are encrypted and securely stored. We use industry-standard security.
              </p>
            </div>
          </div>

          {errors.submit && (
            <p className="text-sm text-red-600">{errors.submit}</p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {isSubmitting ? 'Saving...' : 'Save Bank Details'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default CompleteBankDetails;
