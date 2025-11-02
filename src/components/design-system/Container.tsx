import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export default function Container({
  children,
  className = '',
  size = 'lg',
}: ContainerProps) {
  const sizeStyles = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[1600px]',
    full: 'max-w-full',
  };

  return (
    <div className={`mx-auto px-6 lg:px-8 ${sizeStyles[size]} ${className}`}>
      {children}
    </div>
  );
}

