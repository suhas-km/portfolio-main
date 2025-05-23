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
const keywords = ["Data Scientist", "Cloud Certified Software Engineer", "AI/ML Research & Development"];

export default function Intro() {
  // Using a lower threshold for Home to detect it earlier when scrolling up
  const { ref } = useSectionInView("Home", 0.2);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const [keywordIndex, setKeywordIndex] = useState(0);
  const [scope, animate] = useAnimate();

  // Effect for rotating keywords
  useEffect(() => {
    const interval = setInterval(() => {
      setKeywordIndex((prev) => (prev + 1) % keywords.length);
    }, 1500);
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
      className="flex flex-col relative max-w-[80rem] mx-auto scroll-mt-16 px-4 min-h-screen mb-0 pt-0"
    >
      <div className="flex flex-col-reverse md:flex-row-reverse items-center justify-center gap-6 md:gap-8 pt-0 pb-2 relative h-[calc(100vh-8rem)]">
        <div className="flex-1">
          <motion.div
            className="text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span 
              className="inline-block font-light text-xl mb-4 text-gray-500 dark:text-gray-300 tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              WELCOME TO MY PORTFOLIO
            </motion.span>

            <motion.h1
              className="font-bold text-5xl sm:text-7xl block mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Hello, I'm </span>
              <motion.span 
                className="relative inline-block radiant-text cursor-pointer"
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 8,
                  ease: "linear"
                }}
                whileHover={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  opacity: 0.9,
                  transition: {
                    repeat: Infinity, 
                    duration: 1.5,
                    ease: "linear"
                  }
                }}
              >
                Suhas
              </motion.span>
            </motion.h1>
            
            <div className="h-10 mb-6" ref={scope}>
              <motion.span 
                key={keywordIndex}
                className="font-medium text-2xl sm:text-3xl text-blue-400 skill-word inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {keywords[keywordIndex]}
              </motion.span>
            </div>
            
            <motion.div
              className="text-gray-600 dark:text-gray-300 mt-6 mb-10 flex flex-col w-full max-w-3xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-lg md:text-xl mb-4">Transforming complex challenges into elegant solutions across AI, software engineering, and cloud infrastructure</p>
            </motion.div>
            
            <motion.div
              className="flex flex-wrap items-center gap-4 mt-6 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="#contact"
                className="group bg-blue-600 text-white px-6 py-3.5 flex items-center gap-2 rounded-md outline-none focus:scale-105 hover:scale-105 hover:bg-blue-700 active:scale-100 transition-all text-base font-medium h-14 min-w-[11rem] justify-center"
                onClick={() => {
                  setActiveSection("Contact");
                  setTimeOfLastClick(Date.now());
                }}
              >
                Contact me <BsArrowRight className="opacity-80 group-hover:translate-x-1 transition" />
              </Link>

              <a
                className="group bg-transparent border border-gray-500 dark:border-gray-600 px-6 py-3.5 flex items-center gap-2 rounded-md outline-none focus:scale-105 hover:scale-105 hover:border-gray-800 dark:hover:border-white active:scale-100 transition-all text-base font-medium text-gray-700 dark:text-white h-14 min-w-[11rem] justify-center"
                href="/CV.pdf"
                download
              >
                Download CV <HiDownload className="opacity-80 group-hover:translate-y-1 transition" />
              </a>

              <div className="flex gap-3 ml-1">
                <a
                  className="bg-transparent text-gray-500 dark:text-gray-400 hover:text-[#0077B5] dark:hover:text-[#0077B5] flex items-center gap-2 rounded-full focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer p-2 text-3xl"
                  href="https://www.linkedin.com/in/suhaskm/"
                  target="_blank"
                  aria-label="LinkedIn Profile"
                >
                  <BsLinkedin />
                </a>

                <a
                  className="bg-transparent text-gray-500 dark:text-gray-400 hover:text-[#333] dark:hover:text-white flex items-center gap-2 rounded-full focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer p-2 text-3xl"
                  href="https://github.com/suhas-km"
                  target="_blank"
                  aria-label="GitHub Profile"
                >
                  <FaGithubSquare />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="md:flex-1 flex justify-center items-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.2,
            }}
            className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] overflow-hidden rounded-2xl border-[0.35rem] border-blue-600/30 dark:border-blue-900/30 shadow-xl shadow-blue-700/10 dark:shadow-2xl dark:shadow-blue-900/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-700/5 dark:from-blue-900/5 to-transparent z-10" />
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
      
      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute left-0 right-0 flex justify-center z-10 bottom-6 sm:bottom-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Link
          href="#about"
          className="flex flex-col items-center group"
          onClick={() => {
            setActiveSection("About");
            setTimeOfLastClick(Date.now());
          }}
        >
          <motion.span 
            className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Scroll down
          </motion.span>
          <motion.div
            className="w-8 h-12 rounded-full border-2 border-gray-400 dark:border-gray-500 flex items-start justify-center p-1"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <motion.div 
              className="w-1 h-3 bg-gray-500 dark:bg-gray-400 rounded-full"
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
            />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
