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
import { MdScience } from "react-icons/md";
import { FaBrain } from "react-icons/fa";

export const links = [
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Research",
    hash: "#research",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export interface ExperienceItem {
  title: string;
  location: string;
  description: string[] | string;
  icon: React.ReactNode;
  date: string;
  skills?: string[];
}

export const experiencesData: ExperienceItem[] = [
  {
    title: "Graduate Research Assistant",
    location: "Northeastern University",
    description: [
      "Led research on the Adaptive Incremental Learning Architecture (AILA)",
      "Designed and implemented a novel attention mechanism, improving sequence modeling accuracy by 12%",
      "Achieved 15% faster training times while maintaining model performance",
      "Contributed to Large Language Model (LLM) post-training with RLHF",
      "Created enhanced reward models that improved alignment with human preferences"
    ],
    icon: React.createElement(FaBrain, {}),
    date: "January 2025 - Present",
    skills: ["Neural Networks", "LLMs", "RLHF", "PyTorch", "Research", "VR"],
  },
  {
    title: "Graduate Teaching Assistant",
    location: "Northeastern University",
    description: [
      "Mentored 40+ graduate students in advanced Data Science topics",
      "Provided hands-on guidance for MLOps implementation and deployment pipelines", 
      "Conducted weekly lab sessions focused on practical ML applications",
      "Held regular office hours to support student learning and project development",
      "Created supplementary learning materials that improved project quality by 30%",
      "Developed comprehensive assignment rubrics for consistent evaluation"
    ],
    icon: React.createElement(LuGraduationCap, {}),
    date: "January 2025 - May 2025",
    skills: ["Teaching", "Data Science", "MLOps", "Mentoring"],
  },
  {
    title: "Cloud Engineer Intern",
    location: "Safecast",
    description: [
      "Optimized AWS resource allocation across multiple service tiers", 
      "Implemented auto-scaling strategies reducing monthly cloud costs by 35%",
      "Maintained all performance metrics while decreasing infrastructure expenses",
      "Migrated legacy services to a modern microservices architecture",
      "Utilized containerization and orchestration for improved system reliability (25%)",
      "Established comprehensive infrastructure documentation",
      "Created disaster recovery protocols that decreased incident response time by 40%"
    ],
    icon: React.createElement(FaLaptopCode, {}),
    date: "May 2024 - January 2025",
    skills: ["AWS", "Cloud Cost Optimization", "Infrastructure", "Documentation"],
  },
  {
    title: "Software Engineer",
    location: "Runway Proptech LLC",
    description: [
      "Led backend development for a property management platform serving 10,000+ users",
      "Architected RESTful APIs and microservices using Python and AWS",
      "Developed scalable database solutions with robust data validation",
      "Integrated AI-powered recommendation services increasing client retention by 22%",
      "Built custom forecasting tools for property performance analysis",
      "Implemented CI/CD pipelines reducing deployment time by 60%",
      "Created comprehensive monitoring solutions that decreased critical incidents by 35%"
    ],
    skills: ["Python", "AWS", "Microservices", "RESTful APIs", "SQL", "CI/CD"],
    icon: React.createElement(CgWorkAlt, {}),
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
    githubUrl: "https://github.com/suhas-km/QueryMaster-AI"
  },
  {
    title: "DC SafeHouseSeeker AI",
    description:
      "DC SafeHouseFinder AI: Built during aiXplain's Hackathon, provides personalized housing recommendations using AI and geospatial tech.",
    tags: ["AI Agents", "Vector DB", "aiXplain"],
    imageUrl: corpcommentImg,
    githubUrl: "https://github.com/suhas-km/SafeHomeSeeker-AI"
  },
  {
    title: "MatchPoint: The Resume Analyst",
    description:
      "Developed a resume scoring app using React and FastAPI, Dockerized deployment on AWS ECS, providing real-time NLP-based feedback and suggestions",
    tags: ["React", "FastAPI", "AWS ECS", "Llama Model", "Docker"],
    imageUrl: scorepointImg,
    githubUrl: "https://github.com/suhas-km/MatchPoint"
  },
  {
    title: "Nutrition Tracking Database",
    description:
      "Developed a Nutrition Tracking System with SQL Server, Tableau dashboards, and secure handling of user-specific dietary and fitness data.",
    tags: ["T-SQL", "Database Design", "Tableau", "Data Security"],
    imageUrl: rmtdevImg,
    githubUrl: "https://github.com/suhas-km/Nutrition-Management"
  },
  
  // {
  //   title: "GeoGaurd",
  //   description:
  //     "Job board for remote developer jobs. I was the front-end developer. It has features like filtering, sorting and pagination.",
  //   tags: ["React", "TypeScript", "Next.js", "Tailwind", "Redux"],
  //   imageUrl: rmtdevImg,
  // },
] as const;

export const researchData = [
  {
    title: "AILA: Adaptive Integrated Layered Attention",
    publication: "arXiv",
    authors: "William Claster, Suhas K M, Dhairya Gundechia",
    date: "2024",
    description:
      "Proposed a novel neural architecture for adaptive integrated layering of attention mechanisms, enabling efficient and effective integration of multiple modalities in AI models.",
    tags: ["Neural Network Architecture", "Attention Mechanisms", "Dense Skip Connections", "Multi-Task Modalities", "Self-Attention", "Recurrent Neural Networks"],
    link: "https://arxiv.org/abs/2503.22742"
  },
  {
    title: "REALM: Enhancing Reward Models for LLM Alignment introducing Explicit Prompt-Answer Relevance",
    publication: "arXiv",
    authors: "William Claster, Suhas K M, Dhairya Gundechia",
    date: "2024",
    description:
      "An alignment learning model for relevance-enhanced alignment of AI models, enabling improved performance and accuracy in AI applications.",
    tags: ["Alignment Learning", "Relevance-Enhanced Alignment", "AI Models", "Performance Optimization", "Accuracy Improvement"],
    link: "https://arxiv.org/abs/2503.22742"
  },
  // {
  //   title: "Machine Learning Approaches for Sustainable Urban Housing",
  //   publication: "arXiv",
  //   authors: "William Claster, Suhas K M, Dhairya Gundechia",
  //   date: "2024",
  //   description:
  //     "Developed machine learning models to analyze housing data for predicting sustainability metrics and optimizing resource allocation in urban environments.",
  //   tags: ["Machine Learning", "Urban Planning", "Sustainability"],
  //   link: "https://arxiv.org/abs/2503.22742"
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
    "PyTorch",
    "TensorFlow",
    "RLHF",
    "LLM Fine-tuning",
    "Post-training Alignment",
    "Reward Modeling",
    "NLP",
    "LangChain",
    "Prompt Engineering",
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
  interpersonal: [
    "Project Leadership",
    "Research Collaboration", 
    "Technical Writing",
    "Public Speaking",
    "Team Mentoring",
    "Cross-functional",
    "Client Presentations",
    "Agile",
  ],
} as const;

