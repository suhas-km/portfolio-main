"use client";

import { researchData } from "@/lib/data";
import SectionWrapper from "../layout/SectionWrapper";
import ResearchCard from "../ui/cards/ResearchCard";

/**
 * Research section component
 * Displays academic research papers in a vertically stacked layout
 * Uses motion animations with staggered entry effects
 */
export default function Research() {
  return (
    <SectionWrapper
      id="research"
      title="Research"
      sectionName="Research"
      className="mb-28"
    >
      <div className="space-y-10 max-w-[100rem] mx-auto">
        {researchData.map((research, index) => (
          <ResearchCard 
            key={index}
            {...research}
            index={index}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
