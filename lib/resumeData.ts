// lib/resumeData.ts

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary?: string;
}

export interface Experience {
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  promotions?: Array<{
    title: string;
    startDate: string;
    endDate: string;
    current: boolean;
  }>;
}

export interface Education {
  degree: string;
  institution: string;
  location?: string;
  graduationDate: string;
  gpa?: string;
  honors?: string;
}

export interface Project {
  name: string;
  url?: string;
  description: string;
  technologies: string[];
}

export interface Skills {
  [category: string]: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skills;
  projects: Project[];
}

export const initialResumeData: ResumeData = {
  personalInfo: {
    name: "Kelvin Brito",
    email: "britok30@gmail.com",
    phone: "(786) 263-2104",
    location: "Miami, FL",
    website: "kelvinbrito.io",
    linkedin: "linkedin.com/in/kelvin-brito",
    github: "github.com/britok30",
    summary:
      "Experienced software engineer passionate about building intuitive & modern web applications",
  },
  experience: [
    {
      title: "Front-End Engineer",
      company: "Axios",
      location: "Remote",
      startDate: "Jul 2021",
      endDate: "Dec 2024",
      current: false,
      promotions: [
        {
          title: "Senior Front-End Engineer",
          startDate: "Dec 2023",
          endDate: "Dec 2024",
          current: false,
        },
      ],
      description: [
        "Collaborated cross-functionally with designers, product managers, and engineers while mentoring junior developers on AxiosHQ's enterprise communication platform using React, TypeScript, and Tailwind.",
        "Built AI-powered Card Templates widget replacing standard 'add new card' functionality, creating React components that surface 3 AI-generated recommendations with modal navigation and seamless card insertion.",
        "Designed standardized frontend event tracking system using React hooks and TypeScript interfaces, establishing consistent data logging patterns for user interactions and AI feature analytics.",
        "Pioneered frontend implementation of initial LLM features including translation tools and topic suggestions, establishing React architecture patterns for AI-driven content assistance.",
        "Developed Smart Brevity AI v3 sidebar interface using React and TypeScript, creating accessible components that enabled one-click application of writing improvements to TipTap editor content.",
        "Architected hierarchical commenting system for deck/card structure, implementing React state management for contextual commenting across nested TipTap editor instances.",
      ],
    },
    {
      title: "Front-End Engineer",
      company: "Trazi Ventures",
      location: "Remote",
      startDate: "Oct 2020",
      endDate: "Jul 2021",
      current: false,
      description: [
        "Built frontend features for Trazi's public records SaaS platform, developing interfaces across React/Next.js and Vue/Nuxt applications with custom filtering for efficient business record discovery.",
        "Engineered high-performance Vue.js dashboard visualizing 10M+ public records, creating scalable data interaction patterns that streamlined business decision-making.",
      ],
    },
    {
      title: "Front-End Engineer",
      company: "Carroll Bradford",
      location: "Remote",
      startDate: "Dec 2019",
      endDate: "Oct 2020",
      current: false,
      description: [
        "Led all frontend development in two-person team for construction project management platform, building comprehensive Vue.js interfaces for project tracking, photo collection, and revenue calculation.",
        "Owned frontend overhaul of project management dashboard using Vue.js and Sass, delivering enhanced tracking capabilities that contributed to $11M in company revenue growth.",
      ],
    },
    {
      title: "Front-End Engineer",
      company: "Independent Contractor",
      location: "Miami, FL",
      startDate: "Jun 2016",
      endDate: "Dec 2019",
      current: false,
      description: [
        "Designed and developed responsive web applications and business websites for diverse clients using React, HTML, CSS, and JavaScript, delivering custom solutions for small businesses and startups across Miami.",
        "Optimized client applications for performance and accessibility while delivering all projects on time and within budget, maintaining high-quality code standards and building strong client relationships.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Science, Business Administration",
      institution: "University of South Carolina",
      location: "Columbia, SC",
      graduationDate: "May 2019",
      gpa: "3.65",
      honors: "Magna Cum Laude",
    },
  ],
  skills: {
    "Frontend Technologies": [
      "HTML",
      "CSS",
      "JavaScript (ES6+)",
      "TypeScript",
      "React",
      "Next.js",
      "Vue.js",
      "Sass",
      "TailwindCSS",
    ],
    "Backend & Database": [
      "Node.js",
      "SQL",
      "Firebase",
      "NeonDB",
      "DrizzleORM",
    ],
    "State & Data Management": [
      "Jotai",
      "Recoil",
      "React Query",
      "REST APIs",
      "JSON",
    ],
    "Specialized Tools": ["shadcn", "Storybook"],
    "Testing & Quality": ["Jest", "React Testing Library", "Storybook"],
    "Tools & Platforms": ["Git", "Github", "Vercel", "AWS (S3)", "npm/yarn"],
    "Design & UI": [
      "Figma",
      "Framer",
      "Responsive Design",
      "UI/UX Principles",
      "Web Accessibility",
      "Performance Optimization",
    ],
  },
  projects: [
    {
      name: "ArchitectGPT",
      url: "https://www.architectgpt.io/",
      description:
        "AI-powered architecture and interior design platform enabling instant visual transformations through photo uploads",
      technologies: ["Next.js", "TypeScript", "Firebase"],
    },
    {
      name: " World's Radio",
      url: "https://www.worldsradio.com/",
      description:
        "Global radio streaming platform providing access to thousands of international radio stations with interactive world map",
      technologies: [
        "Next.js",
        "TypeScript",
        "TailwindCSS",
        "Mapbox",
        "Framer Motion",
      ],
    },
  ],
};
