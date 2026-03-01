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
      "Software engineer with 7+ years of experience building and shipping web and mobile products — from enterprise platforms to self-launched apps reaching millions of users.",
  },
  experience: [
    {
      title: "Founder & Product Engineer",
      company: "Dreamer Apps",
      location: "Miami, FL",
      startDate: "Jan 2025",
      endDate: "Present",
      current: true,
      description: [
        "Launched a portfolio of profitable web and mobile applications that have collectively reached millions of users since 2022, operating as the sole engineer, designer, and decision-maker.",
        "Architect and ship web products primarily in Next.js, TypeScript, Tailwind, PostgreSQL, and Stripe while adopting whatever frameworks or tools best fit the problem.",
        "Delivered an iOS application to the App Store using React Native, Expo, and RevenueCat, managing the full native build, review, and deployment pipeline.",
        "Drive rapid shipping cycles by leveraging AI-assisted development tools like Claude Code and conducting targeted UI/UX research through Figma and Mobbin.",
        "Advise clients on custom application development, translating business requirements into production-ready products from architecture through deployment.",
      ],
    },
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
        "Promoted to Senior Front-End Engineer — mentored junior developers and partnered with designers, product managers, and engineers to ship features across AxiosHQ's enterprise communication platform.",
        "Spearheaded the frontend implementation of multiple AI-powered features including LLM-driven translation, topic suggestions, Smart Brevity AI, and intelligent card templates — establishing the React architecture patterns the team adopted going forward.",
        "Engineered a standardized event tracking system using React hooks and TypeScript interfaces, creating the analytics foundation for measuring user interactions and AI feature adoption.",
        "Architected a hierarchical commenting system across nested TipTap editor instances, enabling contextual discussions within the platform's deck and card content structure.",
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
        "Developed frontend interfaces across React/Next.js and Vue/Nuxt for Trazi's public records SaaS platform, implementing custom filtering systems for efficient discovery across large datasets.",
        "Engineered a high-performance Vue.js dashboard that surfaced 10M+ public records with scalable data interaction patterns, directly streamlining business decision-making for end users.",
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
        "Led all frontend development as one of two engineers for a construction project management platform, delivering Vue.js interfaces for project tracking, photo management, and revenue reporting.",
        "Overhauled the core project management dashboard using Vue.js and Sass, delivering capabilities that contributed to $11M in company revenue growth.",
      ],
    },
    {
      title: "Front-End Engineer",
      company: "Independent Contractor",
      location: "Miami, FL",
      startDate: "Jun 2016",
      endDate: "Dec 2019",
      current: false,
      description: [],
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
      "React Native",
      "Expo",
      "Next.js",
      "Vue.js",
      "Sass",
      "TailwindCSS",
    ],
    "Backend & Database": [
      "Node.js",
      "PostgreSQL",
      "Supabase",
      "NeonDB",
      "DrizzleORM",
      "Firebase",
      "Clerk",
    ],
    "State & Data Management": [
      "Zustand",
      "Jotai",
      "React Query",
      "REST APIs",
    ],
    "Payments & Services": ["Stripe", "RevenueCat"],
    "Testing & Quality": ["Jest", "React Testing Library", "Storybook"],
    "Tools & Platforms": ["Git", "Github", "Vercel", "AWS", "npm/yarn"],
    "AI & Productivity": ["Claude Code", "AI-Assisted Development"],
    "Design & UI": [
      "Figma",
      "Framer",
      "shadcn",
      "Responsive Design",
      "UI/UX Principles",
      "Web Accessibility",
      "Performance Optimization",
    ],
  },
  projects: [
    {
      name: "WallStage",
      url: "https://apps.apple.com/us/app/wallstage-wall-art-previews/id6757448513",
      description:
        "iOS mobile app that leverages AI to help artists create realistic wall art mockups for showcasing and selling their work",
      technologies: ["React Native", "Expo", "TypeScript", "RevenueCat", "AWS", "Next.js"],
    },
    {
      name: "ArchitectGPT",
      url: "https://www.architectgpt.io/",
      description:
        "AI-powered architecture and interior design platform enabling instant visual transformations through photo uploads",
      technologies: ["Next.js", "TypeScript", "Firebase"],
    },
  ],
};
