"use client";

import { motion } from "framer-motion";
import { ResearchItem } from "@/lib/types";

/**
 * Props for the ResearchCard component
 */
interface ResearchCardProps extends ResearchItem {
  /** Index of the research item (used for staggered animations) */
  index: number;
}

/**
 * ResearchCard component displaying academic research information
 * Features animations and interactive hover effects
 */
export default function ResearchCard({
  title,
  publication,
  authors,
  date,
  description,
  tags,
  link,
  index,
}: ResearchCardProps) {
  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * index,
      },
    }),
  };

  return (
    <motion.div
      className="bg-white/80 hover:bg-gray-100 border border-gray-200 dark:border-transparent 
                dark:bg-white/10 dark:hover:bg-white/20 transition-all duration-150 p-6 rounded-xl 
                shadow-md hover:shadow-lg relative group cursor-pointer"
      variants={fadeInAnimationVariants}
      initial="initial"
      whileInView="animate"
      viewport={{
        once: true,
      }}
      custom={index}
      onClick={() => link && window.open(link, '_blank')}
      whileHover={{
        y: -5,
        transition: { duration: 0.08, ease: "easeOut" }
      }}
    >
      {/* Absolute positioned link for SEO and accessibility */}
      {link && (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute inset-0 z-10"
          aria-label={`Read research paper: ${title}`}
        >
          <span className="sr-only">Read research paper</span>
        </a>
      )}
      
      <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-600 dark:text-white 
                     dark:group-hover:text-gray-300 transition-all duration-150">
        {title}
      </h3>
      
      <div className="flex flex-wrap gap-2 mt-1 mb-2">
        <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
          {publication}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          • {date}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
        <span className="font-semibold">Authors:</span> {authors}
      </p>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2 mt-3">
        {tags.map((tag, tagIndex) => (
          <span
            key={tagIndex}
            className="bg-blue-600/80 dark:bg-black/[0.7] px-3 py-1 text-[0.7rem] 
                      uppercase tracking-wider text-white rounded-full dark:text-white/70"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
