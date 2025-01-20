"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[65rem] sm:mb-40 scroll-mt-28 px-4"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading className="mb-8 text-center text-gray-900 dark:text-white">
        About Me
      </SectionHeading>
      <div className="max-w-[60rem] mx-auto">
        <p className="mb-3 text-base sm:text-lg text-justify leading-relaxed">
          I am a graduate student in{" "}
          <span className="font-medium">Information Systems</span> at Northeastern University, specializing in{" "}
          <span className="font-medium">software development, data science, and machine learning</span>. 
          I am passionate about building <span className="font-medium">scalable, efficient applications</span> that address real-world problems. 
          My core stack includes{" "}
          <span className="font-medium">
            AWS, React, Python, Java, and Spring Boot
          </span>
          , and I have expertise in{" "}
          <span className="font-medium">
            SQL, machine learning, and deploying cloud-native solutions
          </span>. 
          I thrive on creating impactful solutions and continuously improving my skills to stay ahead in technology.
        </p>

        <p className="text-base sm:text-lg text-justify leading-relaxed">
          I am actively seeking a{" "}
          <span className="font-medium">full-time role</span> as a software engineer or in an AI-focused position. My goal is to contribute to innovative, high-performing systems while embracing opportunities to learn and grow.
        </p>
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
