"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { experiencesData } from "@/lib/data";
import { useTheme } from "@/context/theme-context";
import { ExperienceItem } from "@/lib/types";
import SectionWrapper from "../layout/SectionWrapper";
import Card from "../ui/cards/Card";

/**
 * ExperienceCard component to display individual experience items
 */
function ExperienceCard({ 
  item, 
  index, 
  expandedIndex, 
  handleCardClick,
  itemRef,
  isActive
}: { 
  item: ExperienceItem;
  index: number;
  expandedIndex: number | null;
  handleCardClick: (index: number) => void;
  itemRef: (el: HTMLDivElement | null) => void;
  isActive: boolean;
}) {
  const { theme } = useTheme();

  return (
    <motion.div 
      key={index}
      ref={itemRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative pl-10"
    >
      {/* Timeline connection dot */}
      <div className="absolute left-4 top-6 w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700 transform -translate-x-1/2 z-10"></div>
      {/* Glowing dot for active timeline item */}
      {isActive && (
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute left-4 top-6 w-3 h-3 rounded-full bg-blue-500 transform -translate-x-1/2 z-20 shadow-[0_0_8px_rgba(59,130,246,0.7)] dark:shadow-[0_0_12px_rgba(59,130,246,0.9)]"
        />
      )}
      <Card 
        onClick={() => handleCardClick(index)}
        whileHover={{ y: -5 }}
        layout
        className="p-0"
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
      </Card>
    </motion.div>
  );
}

/**
 * Experience section component
 * Displays professional experience in an interactive card layout
 */
export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Track scroll progress for the entire section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Set up observers to track which elements are in view
  useEffect(() => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      };

      const callback: IntersectionObserverCallback = (entries) => {
        const visibleItems: number[] = [];
        
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            visibleItems.push(index);
          }
        });
        
        setActiveIndices(prev => {
          const newIndices = [...prev];
          visibleItems.forEach(idx => {
            if (!newIndices.includes(idx)) {
              newIndices.push(idx);
            }
          });
          return newIndices.sort((a, b) => a - b);
        });
      };

      const observer = new IntersectionObserver(callback, options);
      
      // Setup refs and observers
      itemRefs.current = experiencesData.map((_, i) => itemRefs.current[i] || null);
      
      const elements = itemRefs.current.filter(Boolean) as HTMLDivElement[];
      elements.forEach(el => observer.observe(el));

      return () => {
        elements.forEach(el => observer.unobserve(el));
      };
    }
  }, []);

  const handleCardClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <SectionWrapper
      id="experience"
      title="Experience"
      sectionName="Experience"
      className="mb-16 sm:mb-24"
    >
      <div ref={sectionRef} className="relative space-y-10">
        {/* Lightsaber timeline */}
        <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-800 rounded-full z-[1] overflow-hidden">
          {/* Base lightsaber handle */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-6 rounded-full bg-gray-400 dark:bg-gray-700 z-0" />
          
          {/* Glowing effect */}
          <motion.div 
            className="absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-200 dark:from-blue-600 dark:via-blue-500 dark:to-blue-300 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] dark:shadow-[0_0_15px_rgba(59,130,246,0.7)] h-full origin-top"
            style={{ 
              scaleY: scrollYProgress,
              filter: 'blur(2px)',
            }}
          />
          <motion.div 
            className="absolute top-0 left-0 right-0 bg-blue-500 dark:bg-blue-400 rounded-full opacity-70 h-full origin-top"
            style={{ scaleY: scrollYProgress }}
          />
        </div>
        
        {experiencesData.map((item, index) => {
          // Set up callback refs for each item
          const setItemRef = (el: HTMLDivElement | null) => {
            if (el) {
              el.setAttribute('data-index', index.toString());
              itemRefs.current[index] = el;
            }
          };
          
          const isActive = activeIndices.includes(index);
          
          return (
            <ExperienceCard
              key={index}
              item={item}
              index={index}
              expandedIndex={expandedIndex}
              handleCardClick={handleCardClick}
              itemRef={setItemRef}
              isActive={isActive}
            />
          );
        })}
      </div>
    </SectionWrapper>
  );
}
