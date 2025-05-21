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
  whileHover = {}, // Removed y: -5 to eliminate up-down hover animation
  layout = false,
}: CardProps) {
  const { theme } = useTheme();
  
  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg border ${
        theme === "light" 
          ? "bg-white shadow-sm border-gray-200"
          : "bg-black border-gray-800"
      } ${onClick ? "cursor-pointer" : ""} ${className}`}
      onClick={onClick}
      initial={initial}
      whileInView={whileInView}
      transition={transition}
      viewport={viewport}
      layout={layout}
    >
      {children}
    </motion.div>
  );
}
