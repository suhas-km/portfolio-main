"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { skillsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";

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

export default function Skills() {
  const { ref } = useSectionInView("Skills");
  
  // Get gradient colors for each category
  const getCategoryColors = (category: string) => {
    const colorMap: Record<string, {from: string, to: string, shadow: string}> = {
      programming: { from: '#6366f1', to: '#8b5cf6', shadow: 'rgba(99, 102, 241, 0.5)' },
      cloud: { from: '#3b82f6', to: '#0ea5e9', shadow: 'rgba(59, 130, 246, 0.5)' },
      databases: { from: '#14b8a6', to: '#10b981', shadow: 'rgba(20, 184, 166, 0.5)' },
      dataScienceAI: { from: '#8b5cf6', to: '#d946ef', shadow: 'rgba(139, 92, 246, 0.5)' },
      tools: { from: '#f59e0b', to: '#f43f5e', shadow: 'rgba(245, 158, 11, 0.5)' },
    };
    return colorMap[category] || { from: '#6366f1', to: '#8b5cf6', shadow: 'rgba(99, 102, 241, 0.5)' };
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-20 max-w-[65rem] scroll-mt-28 text-center sm:mb-28 px-4"
    >
      <SectionHeading className="mb-12 text-center text-gray-900 dark:text-white">
        Skills
      </SectionHeading>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[60rem] mx-auto">
        {Object.entries(skillsData).map(([category, skills]) => {
          const { from, to, shadow } = getCategoryColors(category);
          return (
            <motion.div 
              key={category} 
              className="mb-6 relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg
                transition-all duration-150 hover:shadow-xl hover:-translate-y-1 cursor-default"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.02,
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                transition: { duration: 0.15 }
              }}
            >
              <div 
                className="absolute inset-0 rounded-xl opacity-10 z-0" 
                style={{ background: `linear-gradient(to right, ${from}, ${to})` }}
              />
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4 capitalize relative z-10">
                {category === 'dataScienceAI' ? 'Data Science & AI' : category.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 relative z-10">
                {skills.map((skill, index) => (
                  <motion.div
                    key={`${category}-${skill}-${index}`}
                    className={`bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20
                      hover:bg-gradient-to-r hover:border-transparent text-white/90
                      transform transition-all duration-100 ease-out
                      hover:shadow-xl relative hover:z-20 flex items-center justify-center h-full`}
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                    whileHover={{
                      scale: 1.05,
                      background: `linear-gradient(to right, ${from}, ${to})`,
                      boxShadow: `0 10px 25px -5px ${shadow}`,
                      transition: {
                        duration: 0.1,
                        ease: [0.3, 0.7, 0.4, 1]
                      }
                    }}
                    initial="initial"
                    whileInView="animate"
                    variants={fadeInAnimationVariants}
                    viewport={{
                      once: true,
                    }}
                    custom={index}
                  >
                    <span className="font-medium">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
