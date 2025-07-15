// lib/reactCodeGenerator.ts

import { ResumeData } from "./resumeData";

export function generateReactCode(data: ResumeData): string {
  return `import React from 'react';

interface ResumeProps {
  data: {
    personalInfo: {
      name: string;
      email: string;
      phone: string;
      location: string;
      website?: string;
      linkedin?: string;
      github?: string;
      summary?: string;
    };
    experience: Array<{
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
    }>;
    education: Array<{
      degree: string;
      institution: string;
      location?: string;
      graduationDate: string;
      gpa?: string;
      honors?: string;
    }>;
    skills: { [category: string]: string[] };
    projects: Array<{
      name: string;
      url?: string;
      description: string;
      technologies: string[];
    }>;
  };
}

export default function Resume({ data }: ResumeProps) {
  return (
    <div className="font-sans text-sm text-gray-900 bg-white p-8 leading-normal">
      {/* Header */}
      <div className="mb-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <h1 className="text-3xl font-bold text-blue-600 mb-1">
              {data.personalInfo.name}
            </h1>
            {data.personalInfo.summary && (
              <p className="text-gray-600 text-sm leading-tight">
                {data.personalInfo.summary}
              </p>
            )}
          </div>
          <div className="text-xs text-gray-600 space-y-0.5 pl-3 border-l border-gray-200">
            <div>{data.personalInfo.location}</div>
            <div>{data.personalInfo.email}</div>
            <div>{data.personalInfo.phone}</div>
            {data.personalInfo.website && (
              <div>
                <a 
                  href={\`https://\${data.personalInfo.website}\`} 
                  className="text-blue-600 hover:underline" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {data.personalInfo.website}
                </a>
              </div>
            )}
            {data.personalInfo.linkedin && (
              <div>
                <a 
                  href={\`https://\${data.personalInfo.linkedin}\`} 
                  className="text-blue-600 hover:underline" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {data.personalInfo.linkedin}
                </a>
              </div>
            )}
            {data.personalInfo.github && (
              <div>
                <a 
                  href={\`https://\${data.personalInfo.github}\`} 
                  className="text-blue-600 hover:underline" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {data.personalInfo.github}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Three Column Layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Two Columns - Experience */}
        <div className="col-span-2 pr-3">
          <h2 className="text-base font-semibold text-blue-600 mb-4 uppercase tracking-wide">
            Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => {
              // Helper component for title and dates
              const TitleAndDates = ({ title, startDate, endDate, current, company }: {
                title: string;
                startDate: string;
                endDate: string;
                current: boolean;
                company: string;
              }) => (
                <div className="flex justify-between items-baseline mb-0.5">
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
                    <span className="text-blue-600 font-medium text-sm">• {company}</span>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                    {startDate} - {current ? 'Present' : endDate}
                  </span>
                </div>
              );

              let titleSection;
              
              if (exp.promotions && exp.promotions.length > 0) {
                // Show all positions at this company (original + promotions)
                const allPositions = [
                  {
                    title: exp.title,
                    startDate: exp.startDate,
                    endDate: exp.promotions[0].startDate,
                    current: false
                  },
                  ...exp.promotions
                ];
                
                // Sort by start date (most recent first for display)
                allPositions.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
                
                titleSection = allPositions.map((pos, posIndex) => (
                  <TitleAndDates
                    key={posIndex}
                    title={pos.title}
                    startDate={pos.startDate}
                    endDate={pos.endDate}
                    current={pos.current}
                    company={exp.company}
                  />
                ));
              } else {
                // Single position
                titleSection = (
                  <TitleAndDates
                    title={exp.title}
                    startDate={exp.startDate}
                    endDate={exp.endDate}
                    current={exp.current}
                    company={exp.company}
                  />
                );
              }

              return (
                <div key={index}>
                  {titleSection}
                  <ul className="space-y-0.5 mt-1">
                    {exp.description.map((desc, descIndex) => (
                      <li key={descIndex} className="text-gray-700 text-xs leading-tight flex">
                        <span className="mr-1.5 flex-shrink-0">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-5 pl-3 border-l border-gray-200">
          {/* Skills */}
          <div>
            <h2 className="text-base font-semibold text-blue-600 mb-3 uppercase tracking-wide">
              Skills
            </h2>
            <div className="space-y-2">
              {Object.entries(data.skills).map(([category, items], index) => (
                <div key={index}>
                  <h3 className="font-semibold text-gray-900 mb-0.5 text-xs">{category}</h3>
                  <p className="text-gray-600 text-xs leading-tight">{items.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Projects */}
          <div>
            <h2 className="text-base font-semibold text-blue-600 mb-3 uppercase tracking-wide">
              Projects
            </h2>
            <div className="space-y-3">
              {data.projects.map((project, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-gray-900 text-xs">
                    {project.url ? (
                      <a href={project.url} className="text-gray-900 hover:underline">
                        {project.name}
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <p className="text-gray-600 text-xs italic mb-0.5 leading-tight">
                    {project.description}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {project.technologies.join(' • ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Education */}
          <div>
            <h2 className="text-base font-semibold text-blue-600 mb-3 uppercase tracking-wide">
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-gray-900 text-xs">{edu.institution}</h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{edu.graduationDate}</span>
                  </div>
                  <p className="text-gray-600 text-xs">{edu.degree}</p>
                  {edu.gpa && edu.honors && (
                    <p className="text-gray-500 text-xs">
                      GPA {edu.gpa}, {edu.honors}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`;
}
