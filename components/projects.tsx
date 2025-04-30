"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.5);

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28">
      <SectionHeading className="mb-8 text-center text-gray-900 dark:text-white">
        Projects
      </SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 max-w-[85rem] mx-auto px-6">
        {projectsData.map((project, index) => (
          <Project key={index} {...project} index={index} />
        ))}
      </div>
    </section>
  );
}
