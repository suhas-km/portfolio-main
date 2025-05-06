"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/theme-context";

/**
 * Animation variants for staggered entry of skill items
 */
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

/**
 * Color palettes for different skill categories
 */
const getCategoryColors = (category: string) => {
  const colorMap: Record<string, {from: string, to: string, shadow: string}> = {
    programming: { from: '#6366f1', to: '#8b5cf6', shadow: 'rgba(99, 102, 241, 0.5)' },
    cloud: { from: '#3b82f6', to: '#0ea5e9', shadow: 'rgba(59, 130, 246, 0.5)' },
    databases: { from: '#14b8a6', to: '#10b981', shadow: 'rgba(20, 184, 166, 0.5)' },
    dataScienceAI: { from: '#8b5cf6', to: '#d946ef', shadow: 'rgba(139, 92, 246, 0.5)' },
    tools: { from: '#f59e0b', to: '#f43f5e', shadow: 'rgba(245, 158, 11, 0.5)' },
    interpersonal: { from: '#0ea5e9', to: '#38bdf8', shadow: 'rgba(14, 165, 233, 0.5)' }
  };
  return colorMap[category] || { from: '#6366f1', to: '#8b5cf6', shadow: 'rgba(99, 102, 241, 0.5)' };
};

/**
 * Props for the SkillsCategory component
 */
interface SkillsCategoryProps {
  /** The category name */
  category: string;
  /** Array of skills in this category */
  skills: readonly string[];
}

/**
 * SkillsCategory component displays a group of related skills with consistent styling
 * Features animation effects and interactive hover states
 */
export default function SkillsCategory({ category, skills }: SkillsCategoryProps) {
  const { theme } = useTheme();
  const { from, to, shadow } = getCategoryColors(category);
  
  /**
   * Formats the category name for display (handles special cases and adds spaces)
   */
  const formatCategoryName = (name: string): string => {
    if (name === 'dataScienceAI') return 'Data Science & AI';
    return name.replace(/([A-Z])/g, ' $1').trim();
  };
  
  return (
    <motion.div 
      className="mb-6 relative p-6 rounded-xl bg-white/70 dark:bg-white/5 backdrop-blur-sm 
                 border border-gray-200 dark:border-white/10 shadow-lg
                 transition-all duration-150 hover:shadow-xl cursor-default"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{
        backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.08)',
        boxShadow: theme === 'light' ? '' : '0 8px 25px -5px rgba(59, 130, 246, 0.15)',
        transition: { duration: 0.08 }
      }}  
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0 rounded-xl opacity-10 dark:opacity-10 z-0" 
        style={{ background: `linear-gradient(to right, ${from}, ${to})` }}
      />
      
      {/* Category title */}
      <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4 capitalize relative z-10">
        {formatCategoryName(category)}
      </h3>
      
      {/* Skills grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 relative z-10">
        {skills.map((skill, index) => (
          <motion.div
            key={`${category}-${skill}-${index}`}
            className="bg-white/50 dark:bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 
                       border border-gray-200 dark:border-white/20
                       text-gray-700 dark:text-white/90
                       transform will-change-transform
                       relative hover:z-20 flex items-center justify-center h-full"
            style={{
              transformStyle: 'preserve-3d',
            }}
            whileHover={{
              scale: 1.05,
              background: `linear-gradient(to right, ${from}, ${to})`,
              boxShadow: `0 10px 25px -5px ${shadow}`,
              color: "white",
              borderColor: "transparent",
              transition: {
                duration: 0.03,
                ease: "easeOut"
              }
            }}
            whileTap={{
              scale: 0.98
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
}
