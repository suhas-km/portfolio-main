"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { SectionName } from "@/lib/types";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * Props for the SectionWrapper component
 */
interface SectionWrapperProps {
  /** The unique ID for the section, used for navigation anchors */
  id: string;
  /** The title of the section, displayed in the section heading */
  title: string;
  /** The section name used for active section tracking */
  sectionName: SectionName;
  /** The content of the section */
  children: ReactNode;
  /** Optional additional className for styling customization */
  className?: string;
}

/**
 * A wrapper component for standardizing section layout and animations
 * Provides consistent spacing, section references, and animations
 */
export default function SectionWrapper({
  id,
  title,
  sectionName,
  children,
  className = "",
}: SectionWrapperProps) {
  // Use the custom hook to track section visibility
  const { ref } = useSectionInView(sectionName);

  return (
    <section
      id={id}
      ref={ref}
      className={`scroll-mt-28 mb-16 sm:mb-24 max-w-full px-2 sm:max-w-5xl sm:px-4 xl:max-w-6xl xl:px-8 mx-auto ${className}`}
    >
      <SectionHeading className="mb-8 text-center text-gray-900 dark:text-white">
        {title}
      </SectionHeading>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {children}
      </motion.div>
    </section>
  );
}
