import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import corpcommentImg from "@/public/corpcomment.png";
import rmtdevImg from "@/public/rmtdev.png";
import wordanalyticsImg from "@/public/wordanalytics.png";
import { FaLaptopCode } from "react-icons/fa";
import { BiCodeBlock } from "react-icons/bi";
import { SiNextdotjs } from "react-icons/si";
import scorepointImg from "@/public/scorepoint.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Graduate Teaching Assistent",
    location: "Northeastern University",
    description:
      "Assisted Professor with Data Science Course",
    icon: React.createElement(LuGraduationCap),
    date: "January 2025 - May 2025",
  },
  {
    title: "Cloud Engineer Intern",
    location: "Safecast",
    description:
      "Worked on analysing and reducing AWS Costs, helped in migrating to new backend design, documented infrastructure",
    icon: React.createElement(FaLaptopCode),
    date: "May 2024 - January 2025",
  },
  {
    title: "Software Engineer",
    location: "Runway Proptech LLC",
    description:
      "I worked a backend software engineer. My stack includes Python, AWS, Microservices, RESTful APIs, SQL DB, Agile and AI Integration.",
    icon: React.createElement(FaLaptopCode),
    date: "August 2022 - September 2023",
  },
] as const;

export const projectsData = [
  {
    title: "QueryMaster AI",
    description:
      "AI app to achieve over 90% accuracy in translating natural language into SQL queries, enhancing data accessibility for non-technical users.",
    tags: ["LLM", "SQLite", "Prompt Engineering", "LangChain", "Docker", "Agentic AI"],
    imageUrl: wordanalyticsImg,
  },
  {
    title: "SafeHouseSeeker AI",
    description:
      "SafeHouseFinder AI: Built during aiXplain's Hackathon, this tool provides personalized housing recommendations using AI and geospatial tech. Contributed as a full-stack developer to design and implement the app.",
    tags: ["AI Agents", "Pinecone", "OpenAI", "Geospatial Mapping", "aiXplain"],
    imageUrl: corpcommentImg,
  },
  {
    title: "MatchPoint: The Resume Analyst",
    description:
      "Developed a resume scoring app using React, FastAPI, and Llama models, with Dockerized deployment on AWS ECS for scalability, providing real-time NLP-based feedback and improvement suggestions",
    tags: ["React", "FastAPI", "AWS ECS", "Llama Model", "Docker", "Agentic AI"],
    imageUrl: scorepointImg,
  },
  {
    title: "Nutrition Tracking Database",
    description:
      "Developed a Nutrition Tracking System with SQL Server, Tableau dashboards, and secure handling of user-specific dietary and fitness data.",
    tags: ["TSQL", "Database Design", "SQL Server", "Tableau", "Data Security"],
    imageUrl: rmtdevImg,
  },
  
  // {
  //   title: "GeoGaurd",
  //   description:
  //     "Job board for remote developer jobs. I was the front-end developer. It has features like filtering, sorting and pagination.",
  //   tags: ["React", "TypeScript", "Next.js", "Tailwind", "Redux"],
  //   imageUrl: rmtdevImg,
  // },
] as const;

export const skillsData = {
  programming: [
    "Java",
    "Python",
    "Go",
    "SQL",
    "R",
    "React",
    "Node.js",
    "Spring Boot",
    "FastAPI",
    "Flask",
  ],
  cloud: [
    "Docker",
    "Kubernetes",
    "AWS",
    "GCP",
    "Azure",
    "CI/CD",
    "Terraform",
  ],
  databases: [
    "PostgreSQL",
    "MongoDB",
    "Elasticsearch",
    "Redis",
  ],
  dataScienceAI: [
    "scikit-learn",
    "PyTorch",
    "TensorFlow",
    "NLP",
    "LangChain",
    "OpenAI",
    "MLOps",
    "Data Analytics",
  ],
  tools: [
    "Git",
    "Prometheus",
    "Grafana",
    "Tableau",
    "Power BI",
    "Apache Spark",
    "Kafka",
    "Pinecone",
  ],
} as const;

