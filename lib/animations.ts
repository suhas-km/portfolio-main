/**
 * Animation Utility File
 * 
 * Centralized location for all Framer Motion animation variants
 * to maintain consistency throughout the application.
 */

/**
 * Fade in from bottom animation - commonly used for section content
 */
export const fadeInFromBottom = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.5 }
};

/**
 * Fade in animation - subtle with no movement
 */
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4 }
};

/**
 * Staggered children animation - for lists of items
 */
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

/**
 * Scale animation - for hover effects
 */
export const scaleAnimation = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 400, damping: 17 }
};

/**
 * Card hover animation - for card components
 */
export const cardHoverAnimation = {
  whileHover: { y: -5 },
  transition: { duration: 0.3 }
};

/**
 * Section entry animation - used with useInView for section entries
 */
export const sectionEntryAnimation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
  viewport: { once: true, margin: "-100px" }
};
