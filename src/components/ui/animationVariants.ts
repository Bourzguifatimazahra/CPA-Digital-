import { Variants } from "framer-motion";

/**
 * Standard animation variants for consistent motion across the application
 * Reduces duplication of animation configurations
 */

// Fade in from bottom
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Fade in from left
export const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

// Fade in from right
export const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

// Scale in
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

// Staggered container for lists
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// Staggered item (for use with container)
export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Card hover effect
export const cardHover = {
  hover: { y: -8, transition: { duration: 0.3 } },
};

// Spring animation for bouncy effect
export const springAnimation = {
  transition: { duration: 0.6, type: "spring", stiffness: 100 },
};

// Quick fade in
export const quickFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

// Section header animation
export const sectionHeaderAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Combine variants for complex animations
export const combinedFadeInUp = {
  hidden: { opacity: 0, y: 40, rotateY: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateY: 0,
    transition: { duration: 0.6, type: "spring", stiffness: 100 },
  },
};

// Export as a typed object
export const animations = {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
  staggerItem,
  cardHover,
  springAnimation,
  quickFade,
  sectionHeaderAnimation,
  combinedFadeInUp,
} as const;

export type AnimationVariants = Variants;
