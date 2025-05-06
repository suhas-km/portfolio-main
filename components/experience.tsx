"use client";

import React, { useState } from "react";
import SectionHeading from "./section-heading";
import { motion, AnimatePresence } from "framer-motion";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";

export default function Experience() {
  const { ref } = useSectionInView("Experience");
  const { theme } = useTheme();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      id="experience"
      ref={ref}
      className="scroll-mt-28 mb-16 sm:mb-24 max-w-5xl mx-auto px-4 sm:px-8"
    >
      <SectionHeading className="mb-8 text-center text-gray-900 dark:text-white">
        Experience
      </SectionHeading>
      
      <div className="space-y-10">
        {experiencesData.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              ease: [0.25, 0.1, 0.25, 1.0]
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            {/* Card */}
            <motion.div 
              className={`relative overflow-hidden rounded-lg border ${theme === "light" 
                ? "bg-white shadow-sm border-gray-200 hover:border-blue-300 hover:shadow-lg" 
                : "bg-gray-900/80 border-gray-800 hover:border-blue-500/50 hover:bg-gray-800/90"} 
                transition-all duration-300 cursor-pointer group`}
              onClick={() => handleCardClick(index)}
              whileHover={{ y: -5 }}
              layout
            >
              <div className="p-5">
                <div className="flex items-start">
                  <div className="mr-3 flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900 shadow-sm">
                    <div className="text-blue-600 dark:text-blue-100 text-lg">
                      {item.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                          {item.location}
                        </p>
                      </div>
                      <div className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 whitespace-nowrap">
                        {item.date}
                      </div>
                    </div>
                  </div>
                </div>
                
                <AnimatePresence>
                  {(expandedIndex === index || expandedIndex === null) && (
                    <motion.div 
                      initial={expandedIndex !== null ? { height: 0, opacity: 0 } : false}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`mt-4 text-sm text-gray-600 dark:text-gray-300 ${expandedIndex !== index && expandedIndex !== null ? 'line-clamp-2' : ''}`}
                    >
                      {/* Display description as a list of bullet points */}
                      {typeof item.description === 'string' ? (
                        <p>{item.description}</p>
                      ) : (
                        <ul className="ml-1 mt-2 space-y-1.5 list-disc list-inside">
                          {Array.isArray(item.description) && item.description.map((point, i) => (
                            <li key={i} className="pl-0">
                              <span className="text-sm">{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      {/* Skills/Tools used (optional) */}
                      {item.skills && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.skills.map((skill, skillIndex) => (
                            <span 
                              key={skillIndex} 
                              className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(index);
                  }} 
                  className={`mt-4 text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1 ${expandedIndex === null ? 'hidden' : ''}`}
                >
                  {expandedIndex === index ? 'Show less' : 'Read more'}
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${expandedIndex === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
