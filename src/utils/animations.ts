import { Variants } from 'framer-motion';

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] as const }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] as const }
};

export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] as const }
};

export const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] as const }
};

export const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] as const }
};

export const floatingVariants: Variants = {
  float: {
    y: [0, -20],
    transition: {
      y: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 1.5,
        ease: "easeInOut" as const
      }
    }
  }
};

export const pulseVariants: Variants = {
  pulse: {
    scale: [1, 1.05],
    transition: {
      scale: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 1,
        ease: "easeInOut" as const
      }
    }
  }
};

