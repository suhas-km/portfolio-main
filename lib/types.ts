import { StaticImageData } from "next/image";
import { ReactNode } from "react";
import { links } from "./data";

// Navigation link types
export type SectionName = (typeof links)[number]["name"];
export interface NavLink {
  name: SectionName;
  hash: string;
}

// Experience section types
export interface ExperienceItem {
  title: string;
  location: string;
  description: string[] | string;
  icon: ReactNode;
  date: string;
  skills?: string[];
}

// Project section types
export interface ProjectItem {
  title: string;
  description: string;
  tags: readonly string[];
  imageUrl: StaticImageData;
  githubUrl?: string;
  demoUrl?: string;
}

// Research section types
export interface ResearchItem {
  title: string;
  publication: string;
  authors: string;
  date: string;
  description: string;
  tags: readonly string[];
  link?: string;
}

// Skills section types
export interface SkillsData {
  programming: readonly string[];
  cloud: readonly string[];
  databases: readonly string[];
  dataScienceAI: readonly string[];
  tools: readonly string[];
  interpersonal: readonly string[];
  [key: string]: readonly string[];
}

// Form submission types
export interface ContactFormData {
  email: string;
  message: string;
}

// Theme context types
export type Theme = "light" | "dark";

