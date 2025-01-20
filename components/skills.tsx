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

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-20 max-w-[65rem] scroll-mt-28 text-center sm:mb-28 px-4"
    >
      <SectionHeading className="mb-8 text-center text-gray-900 dark:text-white">
        Skills
      </SectionHeading>
      
      <div className="max-w-[60rem] mx-auto">
        {Object.entries(skillsData).map(([category, skills]) => (
          <div key={category} className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 capitalize">
              {category.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
            <ul className="flex flex-wrap justify-center gap-2 text-base text-gray-800">
              {skills.map((skill, index) => (
                <motion.li
                  key={`${category}-${skill}-${index}`}
                  className="bg-white borderBlack rounded-lg px-4 py-2 dark:bg-white/10 dark:text-white/80 
                    hover:bg-gradient-to-r hover:from-[#FF2D55] hover:to-[#FF3B30] hover:text-white
                    transform transition-all duration-200 ease-out
                    hover:shadow-2xl hover:shadow-red-500/40 cursor-default
                    relative hover:z-20"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -12,
                    rotateX: 8,
                    rotateY: 0,
                    transition: {
                      duration: 0.15,
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
                  {skill}
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
