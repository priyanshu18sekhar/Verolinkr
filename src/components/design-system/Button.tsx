import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  gradient?: 'brand' | 'creator' | 'success';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  gradient = 'brand',
}: ButtonProps) {
  const baseStyles = 'font-bold rounded-full transition-all duration-200 flex items-center justify-center';
  
  const sizeStyles = {
    sm: 'px-6 py-3 text-sm',
    md: 'px-8 py-4 text-lg',
    lg: 'px-12 py-5 text-xl',
  };

  const variantStyles = {
    primary: 'bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl',
    secondary: gradient === 'brand'
      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
      : gradient === 'creator'
      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl'
      : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl',
    tertiary: 'bg-white text-black border-2 border-black hover:bg-gray-50',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabledStyles} ${className}`}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {children}
    </motion.button>
  );
}

