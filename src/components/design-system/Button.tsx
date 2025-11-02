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
  const baseStyles = 'font-bold rounded-full transition-all duration-200 flex items-center justify-center relative';
  
  const sizeStyles = {
    sm: 'px-5 py-2.5 text-[13px]',
    md: 'px-6 py-3 text-[14px]',
    lg: 'px-8 py-4 text-[16px]',
  };

  const variantStyles = {
    primary: 'bg-black text-white hover:bg-gray-900 premium-glow-button',
    secondary: 'bg-white text-black border border-gray-300 hover:border-black hover:bg-gray-50',
    tertiary: 'bg-transparent text-black border border-black hover:bg-black hover:text-white',
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
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

