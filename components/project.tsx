"use client";

import { useRef } from "react";
import { projectsData } from "@/lib/data";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

type ProjectProps = {
  title: string;
  description: string;
  tags: readonly string[];
  imageUrl: any;
  githubUrl: string;
  index?: number;
};

export default function Project({
  title,
  description,
  tags,
  imageUrl,
  githubUrl,
  index = 0,
}: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  // Determine layout based on project index and modify image position
  const isVertical = index % 2 === 0; // Even indices will be vertical, odd will be horizontal - INVERTED from previous
  
  // Custom image positioning based on project title to optimize visibility
  const getImagePosition = () => {
    if (title.includes("QueryMaster")) return "center top";
    if (title.includes("SafeHouse")) return "65% center"; // Moved slightly to the right
    if (title.includes("MatchPoint")) return "center 30%";
    if (title.includes("Nutrition")) return "center";
    return "center top";
  };
  
  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      className="group h-full"
    >
      <section 
        className={`bg-white/80 border border-gray-200 dark:border-transparent rounded-lg overflow-hidden relative hover:bg-gray-100 transition-all duration-100 text-gray-800 dark:text-white dark:bg-white/10 dark:hover:bg-white/20 cursor-pointer shadow-md hover:shadow-xl dark:shadow-lg dark:shadow-blue-900/10 w-full h-[24rem]`}
        onClick={() => window.open(githubUrl, '_blank')}
      >
        {isVertical ? (
          // Vertical layout (image on top, text below)
          <div className="flex flex-col h-full">
            <div className="relative w-full h-[13.5rem] overflow-hidden">
              <div className="absolute inset-0 bg-black/5 dark:bg-black/10 z-10"></div>
              <Image
                src={imageUrl}
                alt={`${title} project`}
                quality={90}
                fill
                style={{ objectFit: 'cover', objectPosition: getImagePosition() }}
                className="transition-all duration-150 ease-out group-hover:scale-105"
              />
            </div>
            <div className="p-3.5 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold truncate">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-white/70 line-clamp-5 mb-auto">
                {description}
              </p>
              <ul className="flex flex-wrap mt-1.5 gap-1">
                {tags.map((tag, tagIndex) => (
                  <li
                    className="bg-blue-600/80 dark:bg-black/[0.7] px-1.5 py-0.5 text-[0.55rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
                    key={tagIndex}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          // Horizontal layout (image on left, text on right)
          <div className="flex h-full">
            <div className="w-1/2 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/5 dark:bg-black/10 z-10"></div>
              <Image
                src={imageUrl}
                alt={`${title} project`}
                quality={90}
                fill
                style={{ objectFit: 'cover', objectPosition: getImagePosition() }}
                className="transition-all duration-150 ease-out group-hover:scale-105"
              />
            </div>

            <div className="w-1/2 p-4 flex flex-col">
              <h3 className="text-lg font-semibold truncate">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-white/70 line-clamp-5 mb-auto">
                {description}
              </p>
              <ul className="flex flex-wrap mt-1.5 gap-1">
                {tags.map((tag, tagIndex) => (
                  <li
                    className="bg-blue-600/80 dark:bg-black/[0.7] px-1.5 py-0.5 text-[0.55rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
                    key={tagIndex}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>
    </motion.div>
  );
}
