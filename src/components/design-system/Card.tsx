import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'hover' | 'bordered';
  className?: string;
  onClick?: () => void;
}

export default function Card({
  children,
  variant = 'default',
  className = '',
  onClick,
}: CardProps) {
  const baseStyles = 'rounded-xl transition-all duration-200';
  
  const variantStyles = {
    default: 'bg-white border border-gray-200 hover:border-gray-300',
    hover: 'bg-white border border-gray-200 hover:border-black cursor-pointer hover:shadow-sm',
    bordered: 'bg-white border border-black',
  };

  if (onClick) {
    return (
      <motion.div
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        onClick={onClick}
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.995 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
}

