import { ReactNode } from 'react';

interface TypographyProps {
  children: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'lead';
  className?: string;
  as?: keyof JSX.IntrinsicElements;
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
    h1: 'text-[96px] md:text-[72px] sm:text-[48px] font-black leading-none tracking-tight',
    h2: 'text-[64px] md:text-[56px] sm:text-[40px] font-black leading-none tracking-tight',
    h3: 'text-[48px] md:text-[40px] sm:text-[32px] font-black leading-tight',
    h4: 'text-[40px] md:text-[32px] sm:text-[28px] font-black leading-tight',
    h5: 'text-[32px] md:text-[28px] sm:text-[24px] font-black leading-tight',
    h6: 'text-[24px] md:text-[20px] font-black leading-tight',
    body: 'text-lg font-regular leading-relaxed',
    caption: 'text-sm font-medium',
    lead: 'text-xl md:text-lg font-light',
  };

  const gradientClass = gradient
    ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
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

