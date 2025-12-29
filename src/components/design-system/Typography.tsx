import React, { ReactNode } from 'react';

interface TypographyProps {
  children: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'lead';
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  gradient?: boolean;
}

export default function Typography({
  children,
  variant = 'body',
  className = '',
  as,
  gradient = false,
}: TypographyProps) {
  const baseStyles = 'font-sans';
  
  const variantStyles = {
    h1: 'text-[64px] lg:text-[80px] md:text-[56px] sm:text-[40px] font-black leading-[0.95] tracking-tighter',
    h2: 'text-[24px] md:text-[28px] font-bold leading-tight tracking-tight',
    h3: 'text-[20px] md:text-[24px] font-bold leading-tight tracking-tight',
    h4: 'text-[18px] md:text-[20px] font-bold leading-tight',
    h5: 'text-[16px] md:text-[18px] font-semibold leading-tight',
    h6: 'text-[14px] md:text-[16px] font-semibold leading-tight',
    body: 'text-[14px] font-normal leading-relaxed',
    caption: 'text-[12px] font-medium',
    lead: 'text-[16px] md:text-[18px] font-light',
  };

  const gradientClass = gradient
    ? 'bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'
    : '';

  const Component = as || (variant === 'h1' ? 'h1' : variant === 'h2' ? 'h2' : variant === 'h3' ? 'h3' : variant === 'h4' ? 'h4' : variant === 'h5' ? 'h5' : variant === 'h6' ? 'h6' : 'p');

  return (
    <Component
      className={`${baseStyles} ${variantStyles[variant]} ${gradientClass} ${className}`}
    >
      {children}
    </Component>
  );
}

