"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { researchData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";

export default function Research() {
  const { ref } = useSectionInView("Research");

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
    <section id="research" ref={ref} className="scroll-mt-28 mb-28">
      <SectionHeading>Research</SectionHeading>
      <div className="space-y-8">
        {researchData.map((research, index) => (
          <motion.div
            key={index}
            className="bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 transition-all duration-150 p-6 rounded-xl relative group cursor-pointer"
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}
            onClick={() => window.open(research.link, '_blank')}
          >
            {/* Absolute positioned link for SEO and accessibility */}
            <a 
              href={research.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute inset-0 z-10"
              aria-label={`Read research paper: ${research.title}`}
            >
              <span className="sr-only">Read research paper</span>
            </a>
            
            <h3 className="text-xl font-bold group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-all duration-150">
              {research.title}
            </h3>
            
            <div className="flex flex-wrap gap-2 mt-1 mb-2">
              <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                {research.publication}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                • {research.date}
              </span>
            </div>
            
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              <span className="font-semibold">Authors:</span> {research.authors}
            </p>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {research.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-3">
              {research.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
