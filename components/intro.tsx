"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";

export default function Intro() {
  const { ref } = useSectionInView("About", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  return (
    <section
      ref={ref}
      id="home"
      className="mb-16 max-w-[70rem] sm:mb-0 scroll-mt-[100rem] px-4"
    >
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
        <div className="flex-1">
          <motion.h1
            className="mb-6 mt-4 text-2xl font-medium !leading-[1.5] sm:text-4xl text-left whitespace-normal"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-bold text-3xl sm:text-5xl block mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Hello, I'm Suhas.
            </span>
            An AI/ML developer solving real-world challenges through innovative research, cloud solutions, and impactful software development.
          </motion.h1>
        </div>
        
        <div className="flex-1 flex justify-center md:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 125,
              damping: 15,
              duration: 0.5,
            }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl border-4 border-white/10 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1736965098883-43e78a019282?fit=crop&w=900&h=650&q=100&auto=format&crop=faces"
                alt="Suhas portrait"
                width={450}  
                height={500}
                quality="95"
                priority={true}
                className="h-[400px] w-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent pointer-events-none"></div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="flex flex-col sm:flex-row items-start md:items-center justify-start gap-2 mt-6 text-lg font-medium"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
        }}
      >
        <Link
          href="#contact"
          className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
        >
          Contact me here{" "}
          <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
        </Link>

        <a
          className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10"
          href="/CV.pdf"
          download
        >
          Download CV{" "}
          <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
        </a>

        <a
          className="bg-white p-4 text-gray-700 hover:text-gray-950 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
          href="https://www.linkedin.com/in/suhaskm/"
          target="_blank"
        >
          <BsLinkedin />
        </a>

        <a
          className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
          href="https://github.com/suhas-km"
          target="_blank"
        >
          <FaGithubSquare />
        </a>
      </motion.div>
    </section>
  );
}
