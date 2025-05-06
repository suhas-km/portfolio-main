"use client";

import { ReactNode } from "react";

/**
 * Props for the SectionHeading component
 */
interface SectionHeadingProps {
  /** Content to display in the heading */
  children: ReactNode;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * A standardized heading component for section titles
 * Features responsive sizing and text gradient styling
 */
export default function SectionHeading({
  children,
  className = "",
}: SectionHeadingProps) {
  return (
    <h2 
      className={`text-4xl font-bold capitalize mb-8 text-center tracking-tight 
        bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-200 
        bg-clip-text text-transparent
        ${className}`}
    >
      {children}
    </h2>
  );
}
