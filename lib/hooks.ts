import { useActiveSectionContext } from "@/context/active-section-context";
import { useEffect, useCallback, useState } from "react";
import { useInView } from "react-intersection-observer";
import type { SectionName } from "./types";

/**
 * Enhanced section detection hook with intelligent handling of scroll behavior
 * to ensure perfect navbar highlighting across all viewport sizes and scroll behaviors
 */
export function useSectionInView(sectionName: SectionName, threshold = 0.35) {
  // More advanced options based on section type
  const options = {
    // Home needs earlier detection on scroll
    threshold: sectionName === "Home" ? 0.05 : threshold,
    // Negative top margin helps detect Home section sooner
    // For About, we want slightly less priority than Home
    rootMargin: sectionName === "Home" ? "0px" : 
               sectionName === "About" ? "100px 0px 0px 0px" : 
               "0px",
  };
  
  const { ref, inView } = useInView(options);
  const { activeSection, setActiveSection, timeOfLastClick } = useActiveSectionContext();
  const [elementTop, setElementTop] = useState<number | null>(null);
  
  // Get precise scroll positions for better detection
  const updatePosition = useCallback(() => {
    // TypeScript safeguard: ref is both a function and has a current property in react-intersection-observer
    // @ts-ignore - This is safe as useInView returns an object with a current property
    if (ref.current) {
      // @ts-ignore
      const element = ref.current;
      const rect = element.getBoundingClientRect();
      setElementTop(rect.top + window.scrollY);
    }
  }, [ref]);
  
  // Update element position on mount
  useEffect(() => {
    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [updatePosition]);
  
  // Precise detection logic
  const isAtTopOfPage = useCallback(() => {
    return window.scrollY < 50;
  }, []);
  
  const isNearSection = useCallback(() => {
    if (elementTop === null) return false;
    const viewportHeight = window.innerHeight;
    const scrollPosition = window.scrollY;
    
    if (sectionName === "Home") {
      // Home section is active when near the top
      return scrollPosition < 100;
    } else {
      // Other sections are active when scrolled near their start
      const distance = Math.abs(scrollPosition - elementTop + viewportHeight / 3);
      return distance < viewportHeight / 2;
    }
  }, [elementTop, sectionName]);

  // Section detection using both inView and scroll position
  useEffect(() => {
    // Skip updates from user clicks for a short time
    if (Date.now() - timeOfLastClick < 1000) return;
    
    // Top priority: Home section when at top of page
    if (sectionName === "Home" && isAtTopOfPage()) {
      setActiveSection("Home");
      return;
    }
    
    // Second priority: use isNearSection for more precise detection
    if (isNearSection()) {
      setActiveSection(sectionName);
      return;
    }
    
    // Fallback: use standard inView detection
    if (inView) {
      setActiveSection(sectionName);
    }
  }, [inView, isAtTopOfPage, isNearSection, setActiveSection, sectionName, timeOfLastClick]);

  // Active scroll monitoring specifically for Home section
  useEffect(() => {
    if (sectionName !== "Home") return;
    
    const handleScroll = () => {
      if (isAtTopOfPage() && Date.now() - timeOfLastClick > 1000) {
        setActiveSection("Home");
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionName, setActiveSection, timeOfLastClick, isAtTopOfPage]);

  return { ref };
}
