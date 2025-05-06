"use client";

import { skillsData } from "@/lib/data";
import SectionWrapper from "../layout/SectionWrapper";
import SkillsCategory from "../ui/cards/SkillsCategory";

/**
 * Skills section component
 * Displays categorized skills in a responsive grid layout
 * Each category has a distinct visual style while maintaining design consistency
 */
export default function Skills() {
  return (
    <SectionWrapper
      id="skills"
      title="Skills"
      sectionName="Skills"
      className="mb-20 max-w-[65rem]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[60rem] mx-auto">
        {Object.entries(skillsData).map(([category, skills]) => (
          <SkillsCategory
            key={category}
            category={category}
            skills={skills}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
