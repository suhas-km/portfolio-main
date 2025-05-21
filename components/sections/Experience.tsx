"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { experiencesData } from "@/lib/data";
import { useTheme } from "@/context/theme-context";
import { ExperienceItem } from "@/lib/types";
import SectionWrapper from "../layout/SectionWrapper";
import Card from "../ui/cards/Card";
import Image from "next/image";

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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative pl-10"
    >
      <Card 
        onClick={() => handleCardClick(index)}
        layout
        className="p-0"
      >
        <div className="p-5">
          <div className="flex items-start">
            {item.logo ? (
              <div className="mr-3 flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 relative">
                <Image
                  src={item.logo}
                  alt={`${item.location} logo`}
                  fill
                  style={{ objectFit: "contain", objectPosition: "center" }}
                  sizes="48px"
                  priority={index < 2}
                />
              </div>
            ) : (
              <div className="mr-3 flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900 shadow-sm">
                <div className="text-blue-600 dark:text-blue-100 text-lg">
                  {item.icon}
                </div>
              </div>
            )}
            
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

  // Track scroll progress for the entire section with improved offset for smoother animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
    smooth: 16 // Smoother scrolling effect
  });
  
  // State to track the current scroll progress percentage for the bright spot
  const [beamEndPosition, setBeamEndPosition] = useState(0);
  
  // Update the bright spot position whenever scroll changes
  useEffect(() => {
    // Function to update bright spot position based on scroll
    const updatePosition = () => {
      setBeamEndPosition(scrollYProgress.get() * 100);
    };
    
    // Set up a listener for scrollYProgress changes
    const unsubscribe = scrollYProgress.on('change', updatePosition);
    
    // Call once to initialize
    updatePosition();
    
    // Cleanup listener on unmount
    return () => {
      unsubscribe();
    };
  }, [scrollYProgress]);

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
        {/* Lightsaber timeline - Star Wars style */}
        <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-300 dark:bg-gray-800 rounded-full z-[1] overflow-visible">
          
          {/* Base beam layer - provides the background glow */}
          <motion.div 
            className="absolute top-0 left-0 right-0 bg-blue-600 dark:bg-blue-500 rounded-full h-full origin-top"
            style={{ 
              scaleY: scrollYProgress,
              filter: 'blur(6px)',
              opacity: 0.4,
              width: '8px',
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          />
          
          {/* Main beam glow */}
          <motion.div 
            className="absolute top-0 left-0 right-0 bg-blue-500 dark:bg-blue-400 rounded-full h-full origin-top"
            style={{ 
              scaleY: scrollYProgress,
              filter: 'blur(3px)',
              opacity: 0.8,
              width: '4px',
              left: '50%',
              transform: 'translateX(-50%)',
              boxShadow: '0 0 15px 3px rgba(59,130,246,0.9), 0 0 25px rgba(37,99,235,0.6)'
            }}
          />
          
          {/* Intense blue core */}
          <motion.div 
            className="absolute top-0 left-0 right-0 bg-blue-300 rounded-full h-full origin-top"
            style={{ 
              scaleY: scrollYProgress,
              filter: 'blur(1px)',
              opacity: 0.9,
              width: '2px',
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          />
          
          {/* Center white core - the brightest part */}
          <motion.div 
            className="absolute top-0 left-0 right-0 bg-white rounded-full h-full origin-top"
            style={{ 
              scaleY: scrollYProgress,
              opacity: 1,
              width: '1px',
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          />
          
          {/* Bright spot that moves with scroll at the end of the illuminated beam */}
          <div
            className="absolute w-5 h-5 rounded-full bg-white z-10"
            style={{
              top: `calc(${beamEndPosition}% - 2.5px)`, // Use state variable that updates with scroll
              left: '50%',
              transform: 'translateX(-50%)',
              boxShadow: '0 0 10px 3px rgba(255,255,255,0.9), 0 0 15px 5px rgba(59,130,246,0.7), 0 0 25px rgba(37,99,235,0.6)',
              opacity: beamEndPosition > 1 ? 1 : 0,
            }}
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
