import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'status' | 'type' | 'category' | 'default';
  color?: string;
  className?: string;
}

export default function Badge({
  children,
  variant = 'default',
  color = 'blue',
  className = '',
}: BadgeProps) {
  const baseStyles = 'px-3 py-1 rounded-full text-sm font-bold';
  
  const colorStyles = {
    blue: 'bg-blue-100 text-blue-800',
    purple: 'bg-purple-100 text-purple-800',
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
    gray: 'bg-gray-100 text-gray-800',
    orange: 'bg-orange-100 text-orange-800',
    pink: 'bg-pink-100 text-pink-800',
  };

  const variantStyles = {
    status: '',
    type: '',
    category: '',
    default: '',
  };

  return (
    <span
      className={`${baseStyles} ${colorStyles[color as keyof typeof colorStyles]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

