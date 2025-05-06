"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/theme-context";

/**
 * Props for the Card component
 */
interface CardProps {
  /** Main content of the card */
  children: ReactNode;
  /** Optional function to handle click events */
  onClick?: () => void;
  /** Optional initial animation settings */
  initial?: object;
  /** Optional whileInView animation settings */
  whileInView?: object;
  /** Optional animation transition settings */
  transition?: object;
  /** Optional viewport settings for animations */
  viewport?: object;
  /** Optional additional CSS classes */
  className?: string;
  /** Optional hover animation settings */
  whileHover?: object;
  /** Whether the card should use layout animation */
  layout?: boolean;
}

/**
 * Reusable Card component with built-in motion animations
 * Used as a base component for various card elements throughout the site
 */
export default function Card({
  children,
  onClick,
  initial = { opacity: 0, y: 20 },
  whileInView = { opacity: 1, y: 0 },
  transition = { duration: 0.4 },
  viewport = { once: true },
  className = "",
  whileHover = { y: -5 },
  layout = false,
}: CardProps) {
  const { theme } = useTheme();
  
  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg border ${
        theme === "light" 
          ? "bg-white shadow-sm border-gray-200 hover:border-blue-300 hover:shadow-lg" 
          : "bg-gray-900/80 border-gray-800 hover:border-blue-500/50 hover:bg-gray-800/90"
      } transition-all duration-300 ${onClick ? "cursor-pointer" : ""} group ${className}`}
      onClick={onClick}
      initial={initial}
      whileInView={whileInView}
      transition={transition}
      viewport={viewport}
      whileHover={whileHover}
      layout={layout}
    >
      {children}
    </motion.div>
  );
}
