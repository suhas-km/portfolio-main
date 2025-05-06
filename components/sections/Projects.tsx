"use client";

import { projectsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "../ui/cards/ProjectCard";

/**
 * Projects section component
 * Displays project cards in a responsive grid layout with alternating card styles
 */
export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.5);
  
  return (
    <section id="projects" ref={ref} className="scroll-mt-28 mb-24">
      <SectionHeading>Projects</SectionHeading>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-16 lg:gap-y-12 max-w-[90rem] mx-auto px-6 lg:px-12">
        {projectsData.map((project, index) => (
          <ProjectCard key={index} {...project} index={index} />
        ))}
      </div>
    </section>
  );
}
