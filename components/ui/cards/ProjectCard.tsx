"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ProjectItem } from "@/lib/types";

/**
 * Props for the ProjectCard component
 */
interface ProjectCardProps extends ProjectItem {
  /** Index of the project in the project list (used for layout variations) */
  index?: number;
}

/**
 * ProjectCard component that displays project information in a card layout
 * Features specific layouts for different projects
 */
export default function ProjectCard({
  title,
  description,
  tags,
  imageUrl,
  githubUrl,
  index = 0,
}: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Parallax scroll animation setup
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  // Based on the image, determine the specific layout for each project by title
  const shouldBeVertical = title.includes("QueryMaster") || title.includes("Nutrition");
  // For horizontal layouts, determine which side the image should be on
  const isImageOnLeft = title.includes("SafeHouse"); // SafeHouse has image on left, MatchPoint has image on right
  
  /**
   * Helper function to determine optimal image positioning based on content
   */
  const getImagePosition = (): string => {
    if (title.includes("QueryMaster")) return "center 25%"; 
    if (title.includes("SafeHouse")) return "center center"; 
    if (title.includes("MatchPoint")) return "center 30%";
    if (title.includes("Nutrition")) return "center center";
    return "center center";
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
        className={`bg-white/80 border border-gray-200 dark:border-transparent rounded-lg overflow-hidden relative 
                    hover:bg-gray-100 transition-all duration-100 text-gray-800 dark:text-white 
                    dark:bg-white/10 dark:hover:bg-white/20 cursor-pointer shadow-md hover:shadow-xl 
                    dark:shadow-lg dark:shadow-blue-900/10 w-full h-[21rem]`}
        onClick={() => window.open(githubUrl, '_blank')}
      >
        {shouldBeVertical ? (
          // Vertical layout for QueryMaster and Nutrition Tracking
          <div className="flex flex-col h-full">
            <div className="relative w-full h-[14rem] overflow-hidden">
              <div className="absolute inset-0 bg-black/5 dark:bg-black/10 z-10"></div>
              <Image
                src={imageUrl}
                alt={`${title} project`}
                quality={95}
                fill
                style={{ objectFit: 'cover', objectPosition: getImagePosition() }}
                className="transition-all duration-150 ease-out group-hover:scale-105"
              />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-md font-semibold mb-2">{title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-gray-600 dark:text-white/70 mb-auto line-clamp-4">
                {description}
              </p>
              <ul className="flex flex-wrap mt-3 gap-1">
                {tags.map((tag, tagIndex) => (
                  <li
                    className="bg-blue-600/80 dark:bg-black/[0.7] px-1 py-0.5 text-[0.55rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
                    key={tagIndex}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          // Horizontal layout for SafeHouse and MatchPoint
          <div className="flex h-full">
            {isImageOnLeft ? (
              // Image on left, text on right (for SafeHouse)
              <>
                <div className="w-2/5 relative overflow-hidden h-full">
                  <div className="absolute inset-0 bg-black/5 dark:bg-black/10 z-10"></div>
                  <Image
                    src={imageUrl}
                    alt={`${title} project`}
                    quality={95}
                    fill
                    style={{ objectFit: 'cover', objectPosition: getImagePosition() }}
                    className="transition-all duration-150 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="w-3/5 p-4 flex flex-col">
                  <h3 className="text-md font-semibold mb-1">{title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-gray-600 dark:text-white/70 mb-auto line-clamp-3">
                    {description}
                  </p>
                  <ul className="flex flex-wrap mt-2 gap-1">
                    {tags.map((tag, tagIndex) => (
                      <li
                        className="bg-blue-600/80 dark:bg-black/[0.7] px-1 py-0.5 text-[0.55rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
                        key={tagIndex}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              // Text on left, image on right (for MatchPoint)
              <>
                <div className="w-3/5 p-4 flex flex-col">
                  <h3 className="text-md font-semibold mb-1">{title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-gray-600 dark:text-white/70 mb-auto line-clamp-3">
                    {description}
                  </p>
                  <ul className="flex flex-wrap mt-2 gap-1">
                    {tags.map((tag, tagIndex) => (
                      <li
                        className="bg-blue-600/80 dark:bg-black/[0.7] px-1 py-0.5 text-[0.55rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
                        key={tagIndex}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="w-2/5 relative overflow-hidden h-full">
                  <div className="absolute inset-0 bg-black/5 dark:bg-black/10 z-10"></div>
                  <Image
                    src={imageUrl}
                    alt={`${title} project`}
                    quality={95}
                    fill
                    style={{ objectFit: 'cover', objectPosition: getImagePosition() }}
                    className="transition-all duration-150 ease-out group-hover:scale-105"
                  />
                </div>
              </>
            )}
          </div>
        )}
      </section>
    </motion.div>
  );
}
