"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import SectionHeading from "@/components/ui/SectionHeading";
import { researchData } from "@/lib/data";
import ResearchCard from "../ui/cards/ResearchCard";

/**
 * Research section component
 * Displays academic research papers in a vertically stacked layout with full width
 * Uses motion animations with staggered entry effects
 */
export default function Research() {
  const { ref } = useSectionInView("Research");

  return (
    <section
      id="research"
      ref={ref}
      className="scroll-mt-28 mb-28 w-full mx-auto px-0"
    >
      <SectionHeading className="mb-8 text-center text-gray-900 dark:text-white">
        Research
      </SectionHeading>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="w-full max-w-none px-4 md:px-8 lg:px-16 xl:px-24"
      >
        <div className="space-y-10">
          {researchData.map((research, index) => (
            <ResearchCard 
              key={index}
              {...research}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
