/**
 * Application Constants
 * 
 * This file centralizes configuration values and constants used throughout the application.
 * Keeping these values in one place makes the codebase more maintainable and easier to update.
 */

/**
 * Animation timing constants
 */
export const ANIMATION = {
  DURATION: {
    SHORT: 0.2,
    MEDIUM: 0.4,
    LONG: 0.7
  },
  STAGGER: {
    DEFAULT: 0.1,
    FAST: 0.05,
    SLOW: 0.2
  },
  EASING: {
    DEFAULT: [0.25, 0.1, 0.25, 1.0],
    BOUNCE: [0.175, 0.885, 0.32, 1.275]
  }
};

/**
 * Layout constants
 */
export const LAYOUT = {
  SECTION: {
    SPACING: "mb-16 sm:mb-24",
    MAX_WIDTH: "max-w-5xl",
    PADDING: "px-4 sm:px-8"
  },
  SCROLL_MARGIN: "scroll-mt-28"
};

/**
 * Theme color values
 */
export const COLORS = {
  LIGHT: {
    PRIMARY: "bg-blue-600",
    PRIMARY_HOVER: "hover:bg-blue-700",
    CARD_BG: "bg-white",
    CARD_BORDER: "border-gray-200",
    CARD_HOVER_BORDER: "hover:border-blue-300",
    TEXT_PRIMARY: "text-gray-900",
    TEXT_SECONDARY: "text-gray-600"
  },
  DARK: {
    PRIMARY: "bg-blue-700",
    PRIMARY_HOVER: "hover:bg-blue-600",
    CARD_BG: "bg-gray-900/80",
    CARD_BORDER: "border-gray-800",
    CARD_HOVER_BORDER: "hover:border-blue-500/50",
    TEXT_PRIMARY: "text-white",
    TEXT_SECONDARY: "text-gray-300"
  }
};

/**
 * Responsive breakpoints
 */
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536
};
