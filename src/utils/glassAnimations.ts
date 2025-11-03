import { Variants } from 'framer-motion';

export const liquidWaveAnimation: Variants = {
  animate: {
    y: [0, -10, 0],
    scale: [1, 1.02, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const glassShimmer: Variants = {
  animate: {
    x: ['-100%', '100%'],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 3,
        ease: 'linear',
      },
    },
  },
};

export const glassFloat: Variants = {
  animate: {
    y: [0, -10, -5, 0],
    rotate: [0, 1, -1, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const glassPulse: Variants = {
  animate: {
    opacity: [0.3, 0.5, 0.3],
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const liquidFlow: Variants = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

export const rippleAnimation = (x: number, y: number) => ({
  width: [0, 200],
  height: [0, 200],
  x: [x, x - 100],
  y: [y, y - 100],
  opacity: [0.4, 0],
  transition: {
    duration: 0.6,
    ease: 'easeOut',
  },
});

export const glassFadeIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    backdropFilter: 'blur(0px)',
  },
  animate: {
    opacity: 1,
    scale: 1,
    backdropFilter: 'blur(20px)',
    transition: {
      duration: 0.4,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    backdropFilter: 'blur(0px)',
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

export const glassSlideUp: Variants = {
  initial: {
    opacity: 0,
    y: 50,
    backdropFilter: 'blur(0px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    backdropFilter: 'blur(20px)',
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
  exit: {
    opacity: 0,
    y: 50,
    backdropFilter: 'blur(0px)',
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

export const glassScaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    backdropFilter: 'blur(0px)',
  },
  animate: {
    opacity: 1,
    scale: 1,
    backdropFilter: 'blur(20px)',
    transition: {
      duration: 0.4,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    backdropFilter: 'blur(0px)',
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

export const hoverLift: Variants = {
  hover: {
    y: -4,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: 'easeIn',
    },
  },
};

export const glassGlow: Variants = {
  hover: {
    boxShadow: [
      '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      '0 8px 32px 0 rgba(59, 130, 246, 0.3), 0 0 40px 0 rgba(147, 51, 234, 0.2)',
    ],
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};


