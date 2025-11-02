import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  spacing?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  background?: 'white' | 'gray' | 'gradient';
}

export default function Section({
  children,
  className = '',
  spacing = 'xl',
  background = 'white',
}: SectionProps) {
  const spacingStyles = {
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-24',
    lg: 'py-24 md:py-32',
    xl: 'py-32 md:py-40',
    '2xl': 'py-40 md:py-56',
  };

  const backgroundStyles = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    gradient: 'bg-gradient-to-br from-gray-50 to-white',
  };

  return (
    <section
      className={`${spacingStyles[spacing]} ${backgroundStyles[background]} ${className}`}
    >
      {children}
    </section>
  );
}

