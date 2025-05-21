"use client";

import { AcademicCapIcon, CpuChipIcon, UsersIcon, TrophyIcon, ChevronRightIcon, BeakerIcon, CodeBracketIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About", 0.5);
  return (
    <section
      ref={ref}
      id="about"
      className="relative mb-12 scroll-mt-16 px-2 sm:px-4"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-6xl mx-auto px-6 py-8 sm:px-10
                  bg-white dark:bg-[#18182f]
                  bg-opacity-90 dark:bg-opacity-95
                  backdrop-blur-xl rounded-3xl
                  shadow-lg dark:shadow-[0_8px_48px_rgba(50,80,200,0.15)]
                  border border-gray-200 dark:border-white/10
                  flex flex-col gap-10 overflow-hidden"
      >
        {/* Decorative elements with theme-appropriate colors */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 dark:bg-blue-600/10 rounded-full filter blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-100/50 dark:bg-indigo-500/10 rounded-full filter blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/4"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-200/30 dark:bg-primary-color/5 rounded-full filter blur-3xl -z-10 opacity-60 animate-pulse"></div>
        
        {/* Headline with enhanced gradient */}
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-2xl md:text-4xl font-extrabold tracking-tight text-left 
                     bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-800 
                     dark:bg-gradient-to-r dark:from-blue-400 dark:via-indigo-300 dark:to-blue-200 
                     bg-clip-text text-transparent drop-shadow-sm mb-2 flex items-center gap-2"
        >
          Engineer. Researcher. Mentor.
        </motion.h2>

        {/* Compact bullet-pointed summary with improved colors */}
        <ul className="flex flex-col gap-2 text-gray-700 dark:text-gray-200 text-base md:text-lg leading-snug max-w-3xl text-left font-normal pl-1">
          <motion.li 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="flex items-start gap-2.5 pl-1">
            <span className="text-blue-500 dark:text-blue-400 mt-1">
              <ChevronRightIcon className="w-4 h-4" />
            </span>
            <span>Proven expertise in AI research, cloud-native software, and teaching excellence.</span>
          </motion.li>
          <motion.li 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex items-start gap-2.5 pl-1">
            <span className="text-blue-500 dark:text-blue-400 mt-1">
              <ChevronRightIcon className="w-4 h-4" />
            </span>
            <span>Design intelligent, scalable software that blends rigorous problem-solving with real-world application.</span>
          </motion.li>
          <motion.li 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex items-start gap-2.5 pl-1">
            <span className="text-blue-500 dark:text-blue-400 mt-1">
              <ChevronRightIcon className="w-4 h-4" />
            </span>
            <span>Navigate across abstraction layers—from high-level design to low-level optimization.</span>
          </motion.li>
          <motion.li 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex items-start gap-2.5 pl-1">
            <span className="text-blue-500 dark:text-blue-400 mt-1">
              <ChevronRightIcon className="w-4 h-4" />
            </span>
            <span>Analytical thinker: reduce complexity, build reliable solutions, and value clarity, efficiency, and continuous learning.</span>
          </motion.li>
        </ul>

        {/* Achievements section header */}
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-50 mt-1 text-left border-l-4 border-blue-600 dark:border-blue-400 pl-3 py-1">Highlights</h3>
        {/* Two-column grid for highlights */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 w-full max-w-3xl text-left mt-1">
          <motion.li 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="flex items-center gap-3 text-gray-800 dark:text-gray-50 text-base font-medium">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg 
                           bg-gradient-to-br from-blue-500/90 to-blue-700/90 
                           shadow-md border border-blue-400/20">
              <CpuChipIcon className="w-4 h-4 text-white" />
            </span>
            <span>3+ years shipping backend/data systems</span>
          </motion.li>
          
          <motion.li 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex items-center gap-3 text-gray-800 dark:text-gray-50 text-base font-medium">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg 
                           bg-gradient-to-br from-indigo-500/90 to-indigo-700/90 
                           shadow-md border border-indigo-400/20">
              <AcademicCapIcon className="w-4 h-4 text-white" />
            </span>
            <span>Cloud Certified (AWS SAA + CP)</span>
          </motion.li>
          
          <motion.li 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex items-center gap-3 text-gray-800 dark:text-gray-50 text-base font-medium">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg 
                           bg-gradient-to-br from-blue-400/90 to-indigo-600/90 
                           shadow-md border border-blue-300/20">
              <BeakerIcon className="w-4 h-4 text-white" />
            </span>
            <span>Led LLM alignment research at Northeastern</span>
          </motion.li>
          
          <motion.li 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex items-center gap-3 text-gray-800 dark:text-gray-50 text-base font-medium">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg 
                           bg-gradient-to-br from-blue-500/90 to-indigo-500/90 
                           shadow-md border border-indigo-400/20">
              <TrophyIcon className="w-4 h-4 text-white" />
            </span>
            <span>Hackathon winner | AiXplain 2024</span>
          </motion.li>
          
          <motion.li 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex items-center gap-3 text-gray-800 dark:text-gray-50 text-base font-medium">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg 
                           bg-gradient-to-br from-indigo-500/90 to-blue-600/90 
                           shadow-md border border-blue-400/20">
              <UsersIcon className="w-4 h-4 text-white" />
            </span>
            <span>40+ students mentored as Teaching Assistant</span>
          </motion.li>
          
          <motion.li 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="flex items-center gap-3 text-gray-800 dark:text-gray-50 text-base font-medium">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg 
                           bg-gradient-to-br from-blue-600/90 to-indigo-500/90 
                           shadow-md border border-blue-400/20">
              <CodeBracketIcon className="w-4 h-4 text-white" />
            </span>
            <span>Full-stack development experience</span>
          </motion.li>
        </ul>
      </motion.div>
    </section>
  );
}
