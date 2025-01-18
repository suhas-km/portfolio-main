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
      <SectionHeading>About me</SectionHeading>
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
  );
}
