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
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading className="mb-8 text-center text-gray-900 dark:text-white">
        About me
      </SectionHeading>
      <p className="mb-3">
      After graduating with a degree in{" "}
      <span className="font-medium">Information Systems</span>, I honed my skills in
      <span className="font-medium">software development, databases, data science, and machine learning</span>. 
      <span className="italic">My favorite part of this field</span> is creating intelligent systems that solve real-world problems. 
      I <span className="underline">enjoy</span> building scalable, efficient applications and continuously improving their performance. 
      My core stack includes{" "}
      <span className="font-medium">
        AWS, React, Python, Java, and Spring Boot
      </span>
      . I am also skilled in SQL, Machine Learning, and deploying cloud-native solutions. 
      I am passionate about leveraging technology to make impactful contributions and am always eager to learn and adapt. 
      I am currently looking for a{" "}
      <span className="font-medium">full-time position</span> as a software engineer or in an AI-focused role.
      </p>

      <p>
        <span className="italic">When I'm not coding</span>, I enjoy playing
        video games, watching movies, and playing with my dog. I also enjoy{" "}
        <span className="font-medium">learning new things</span>. I am currently
        learning about{" "}
        <span className="font-medium">history and philosophy</span>. I'm also
        learning how to play the guitar.
      </p>
    </motion.section>
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
//     I’m always eager to connect with like-minded individuals and collaborate on exciting opportunities.{" "}
//     <span className="font-semibold text-gray-200">Let’s build something extraordinary together!</span>
//   </p>
// </motion.section>



  );
}
