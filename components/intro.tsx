"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimate, stagger } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";

// Rotating keywords for animation
const keywords = ["AI Researcher", "Cloud Engineer", "ML Developer", "Neural Architect"];

export default function Intro() {
  const { ref } = useSectionInView("About", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const [keywordIndex, setKeywordIndex] = useState(0);
  const [scope, animate] = useAnimate();

  // Effect for rotating keywords
  useEffect(() => {
    const interval = setInterval(() => {
      setKeywordIndex((prev) => (prev + 1) % keywords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Text animation sequence for skills
  useEffect(() => {
    animate(
      "span.skill-word",
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.5, delay: stagger(0.1) }
    );
  }, [animate, keywordIndex]);

  return (
    <section
      ref={ref}
      id="home"
      className="mb-16 max-w-[70rem] sm:mb-0 scroll-mt-[100rem] px-4"
    >
      <div className="flex flex-col-reverse md:flex-row items-center md:items-center justify-between gap-16 py-12">
        <div className="flex-1">
          <motion.div
            className="text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span 
              className="inline-block font-light text-lg mb-3 text-gray-500 dark:text-gray-300 tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              WELCOME TO MY PORTFOLIO
            </motion.span>

            <motion.h1
              className="font-bold text-4xl sm:text-6xl block mb-5 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Hello, I'm Suhas.
            </motion.h1>
            
            <div className="h-8 mb-5" ref={scope}>
              <motion.span 
                key={keywordIndex}
                className="font-medium text-xl sm:text-2xl text-blue-400 skill-word inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {keywords[keywordIndex]}
              </motion.span>
            </div>
            
            <motion.p 
              className="text-md sm:text-lg text-gray-600 dark:text-gray-300 max-w-[550px] leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Transforming complex challenges into elegant solutions across AI, software engineering, and cloud infrastructure. Passionate about building innovative technologies that create meaningful impact in our increasingly digital world.
            </motion.p>
            
            <motion.div
              className="flex flex-wrap items-center gap-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="#contact"
                className="group bg-blue-600 text-white px-6 py-3 flex items-center gap-2 rounded-md outline-none focus:scale-105 hover:scale-105 hover:bg-blue-700 active:scale-100 transition-all text-sm font-medium"
                onClick={() => {
                  setActiveSection("Contact");
                  setTimeOfLastClick(Date.now());
                }}
              >
                Contact me <BsArrowRight className="opacity-80 group-hover:translate-x-1 transition" />
              </Link>

              <a
                className="group bg-transparent border border-gray-500 dark:border-gray-600 px-6 py-3 flex items-center gap-2 rounded-md outline-none focus:scale-105 hover:scale-105 hover:border-gray-800 dark:hover:border-white active:scale-100 transition-all text-sm font-medium text-gray-700 dark:text-white"
                href="/Suhas_Resume.pdf"
                download
              >
                Download CV <HiDownload className="opacity-80 group-hover:translate-y-1 transition" />
              </a>

              <div className="flex gap-3 ml-1">
                <a
                  className="bg-transparent text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white flex items-center gap-2 rounded-full focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer p-2 text-xl"
                  href="https://www.linkedin.com/in/suhaskm/"
                  target="_blank"
                >
                  <BsLinkedin />
                </a>

                <a
                  className="bg-transparent text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white flex items-center gap-2 rounded-full focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer p-2 text-xl"
                  href="https://github.com/suhas-km"
                  target="_blank"
                >
                  <FaGithubSquare />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="md:flex-1 flex justify-center md:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.2,
            }}
            className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] overflow-hidden rounded-2xl border-[0.25rem] border-blue-600/30 dark:border-blue-900/30 shadow-xl shadow-blue-700/10 dark:shadow-2xl dark:shadow-blue-900/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-700/20 dark:from-blue-900/20 to-transparent z-10" />
            <Image
              src="/FA720AE6-044D-450F-A771-077E3E84DD43_1_201_a.jpeg"
              alt="Portrait of Suhas"
              quality={95}
              fill
              priority={true}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
