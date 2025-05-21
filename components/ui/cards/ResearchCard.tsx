"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ResearchItem } from "@/lib/types";
import Popup from "../Popup";

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
  // State for controlling the popup visibility
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  // Check if this is the REALM paper
  const isRealmPaper = title.includes("REALM");
  
  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
    },
    animate: (index: number) => ({
      opacity: 1,
      transition: {
        delay: 0.05 * index,
      },
    }),
  };
  
  // Handle card click
  const handleCardClick = (e: React.MouseEvent) => {
    if (isRealmPaper) {
      // For REALM paper, prevent default navigation and show popup
      e.preventDefault();
      e.stopPropagation();
      setIsPopupOpen(true);
    } else if (link) {
      // For other papers with links, open the link
      window.open(link, '_blank');
    }
  };

  return (
    <>
      <motion.div
        className="card-light card-dark transition-all duration-150 p-6 px-8 rounded-xl 
                  relative group cursor-pointer w-full mx-auto"
        variants={fadeInAnimationVariants}
        initial="initial"
        whileInView="animate"
        viewport={{
          once: true,
        }}
        custom={index}
        onClick={handleCardClick}
      >
        {/* Absolute positioned link for SEO and accessibility - only for non-REALM papers */}
        {link && !isRealmPaper && (
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
        
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary-600 dark:text-white 
                      dark:group-hover:text-primary-400 transition-all duration-150">
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
              className="bg-secondary-600 dark:bg-secondary-800 px-3 py-1 text-[0.7rem] 
                        uppercase tracking-wider text-white rounded-full shadow-sm dark:text-white/95 transition-all duration-150"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
      
      {/* Popup for REALM paper */}
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        message="In the works, will be out soon"
      />
    </>
  );
}
