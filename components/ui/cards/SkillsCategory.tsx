"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/theme-context";

/**
 * Animation variants for staggered entry of skill items
 */
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
                 border border-gray-200 dark:border-white/10 shadow-lg cursor-default"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
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
          <div
            key={`${category}-${skill}-${index}`}
            className="backdrop-blur-sm rounded-xl px-3 py-2 
                       border border-transparent
                       text-white
                       relative flex items-center justify-center h-full"
            style={{
              background: `linear-gradient(to right, ${from}, ${to})`,
              boxShadow: `0 5px 15px -5px ${shadow}`
            }}
          >
            <span className="font-medium">{skill}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
