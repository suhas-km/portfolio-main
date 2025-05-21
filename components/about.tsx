"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";

export default function About() {
  const { ref } = useSectionInView("About");
  
  return (
    <motion.section
      ref={ref}
      className="mb-16 max-w-[65rem] sm:mb-24 scroll-mt-28 px-4"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading className="mb-8 text-center text-gray-900 dark:text-white">
        About Me
      </SectionHeading>
      
      <div className="max-w-[60rem] mx-auto rounded-xl bg-white/60 dark:bg-black p-8 border border-gray-200 dark:border-gray-800/50 shadow-md">
        {/* Subtle accent line */}
        <div className="w-24 h-1 bg-blue-600 dark:bg-blue-500 mb-8 rounded-full mx-auto opacity-80"></div>
        
        <p className="mb-6 text-base sm:text-lg leading-relaxed text-center mx-auto max-w-4xl">
          I'm an engineer with proven expertise in AI Research, Cloud-native Software Development, and Teaching Excellence.
        </p>

        <div className="mt-8 space-y-6">
          <p className="mb-4 text-base sm:text-lg leading-relaxed text-gray-800 dark:text-gray-300">
            I specialize in designing <span className="font-medium">intelligent, scalable software</span> that blends rigorous problem-solving with real-world application. With a background in <span className="font-medium">software engineering, data science, and machine learning</span>, I navigate across abstraction layers — from high-level design to low-level optimization.
          </p>

          <p className="text-base sm:text-lg leading-relaxed text-gray-800 dark:text-gray-300">
            My approach is rooted in <span className="font-medium">analytical thinking</span>: understanding patterns, reducing complexity, and building reliable solutions that adapt and evolve. Whether working on <span className="font-medium">cloud-native architectures</span> or research-driven <span className="font-medium">AI systems</span>, I value clarity, efficiency, and continuous learning.
          </p>
        </div>
      </div>
    </motion.section>
  );
}

//     <motion.section
//   ref={ref}
//   className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
//   initial={{ opacity: 0, y: 100 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ delay: 0.175 }}
//   id="about"
// >
//   <SectionHeading className="text-4xl font-bold text-gray-200 mb-6">
//     About Me
//   </SectionHeading>
//   <p className="mb-4 text-lg text-gray-300 leading-relaxed">
//     I am an{" "}
//     <span className="font-semibold text-white">AI/ML Engineer and Cloud Solutions Architect</span> 
//     with over three years of experience. I specialize in building{" "}
//     <span className="font-semibold text-white">intelligent, scalable systems</span> using{" "}
//     <span className="font-semibold text-white">
//       AWS, React, Python, and Spring Boot
//     </span>. My expertise includes{" "}
//     <span className="font-semibold text-white">
//       serverless architectures, AI-powered solutions, and cloud optimization
//     </span>{" "}
//     to solve real-world challenges efficiently. Passionate about{" "}
//     <span className="italic text-gray-400">knowledge-sharing and community-building</span>, 
//     I enjoy mentoring aspiring professionals and hosting tech meetups.
//   </p>
//   <p className="text-lg text-gray-300 leading-relaxed">
//     <span className="italic text-gray-400">When I'm not coding</span>, 
//     I enjoy diving into{" "}
//     <span className="font-semibold text-white">Cognitive Science, Sociology, History, and Philosophy</span>, 
//     broadening my perspective to fuel innovation and creativity. 
//     I'm always eager to connect with like-minded individuals and collaborate on exciting opportunities.{" "}
//     <span className="font-semibold text-gray-200">Let's build something extraordinary together!</span>
//   </p>
// </motion.section>



//   );
// }
