// lib/htmlTemplateGenerator.ts

import { ResumeData } from "./resumeData";

export function generateHtmlTemplate(data: ResumeData): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resume - ${data.personalInfo.name}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
          }
        }
      }
    }
  </script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script type="module">import "@iframe-resizer/child";</script>
</head>
<body class="font-sans text-sm text-gray-900 bg-white p-8 leading-normal">
  
  <!-- Header -->
  <div class="mb-6">
    <div class="grid grid-cols-3 gap-6">
      <div class="col-span-2">
        <h1 class="text-3xl font-bold text-blue-600 mb-1">${
          data.personalInfo.name
        }</h1>
        ${
          data.personalInfo.summary
            ? `<p class="text-gray-600 text-sm leading-tight">${data.personalInfo.summary}</p>`
            : ""
        }
      </div>
      <div class="text-xs text-gray-600 space-y-0.5 pl-3 border-l border-gray-200">
        <div>${data.personalInfo.location}</div>
        <div>${data.personalInfo.email}</div>
        <div>${data.personalInfo.phone}</div>
        ${
          data.personalInfo.website
            ? `<div><a href="https://${data.personalInfo.website}" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">${data.personalInfo.website}</a></div>`
            : ""
        }
        ${
          data.personalInfo.linkedin
            ? `<div><a href="https://${data.personalInfo.linkedin}" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">${data.personalInfo.linkedin}</a></div>`
            : ""
        }
        ${
          data.personalInfo.github
            ? `<div><a href="https://${data.personalInfo.github}" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">${data.personalInfo.github}</a></div>`
            : ""
        }
      </div>
    </div>
  </div>

  <!-- Three Column Layout -->
  <div class="grid grid-cols-3 gap-6">
    <!-- Left Two Columns - Experience -->
    <div class="col-span-2 pr-3">
      <h2 class="text-base font-semibold text-blue-600 mb-4 uppercase tracking-wide">Experience</h2>
      <div class="space-y-4">
        ${data.experience
          .map((exp) => {
            // Helper function to format title and dates
            const formatTitleAndDates = (
              title: string,
              startDate: string,
              endDate: string,
              current: boolean,
              company: string
            ) =>
              `<div class="flex justify-between items-baseline mb-0.5">
                  <div class="flex items-baseline gap-2">
                    <h3 class="font-semibold text-gray-900 text-sm">${title}</h3>
                    <span class="text-blue-600 font-medium text-sm">• ${company}</span>
                  </div>
                  <span class="text-xs text-gray-500 whitespace-nowrap ml-4">${startDate} - ${
                current ? "Present" : endDate
              }</span>
                </div>`;

            let titleSection = "";

            if (exp.promotions && exp.promotions.length > 0) {
              // Show all positions at this company (original + promotions)
              const allPositions = [
                {
                  title: exp.title,
                  startDate: exp.startDate,
                  endDate: exp.promotions[0].startDate,
                  current: false,
                },
                ...exp.promotions,
              ];

              // Sort by start date (most recent first for display)
              allPositions.sort(
                (a, b) =>
                  new Date(b.startDate).getTime() -
                  new Date(a.startDate).getTime()
              );

              titleSection = allPositions
                .map((pos) =>
                  formatTitleAndDates(
                    pos.title,
                    pos.startDate,
                    pos.endDate,
                    pos.current,
                    exp.company
                  )
                )
                .join("");
            } else {
              // Single position
              titleSection = formatTitleAndDates(
                exp.title,
                exp.startDate,
                exp.current ? "Present" : exp.endDate,
                exp.current,
                exp.company
              );
            }

            return `
          <div>
            ${titleSection}
            <ul class="space-y-0.5 mt-1">
              ${exp.description
                .map(
                  (desc) =>
                    `<li class="text-gray-700 text-xs leading-tight flex">
                      <span class="mr-1.5 flex-shrink-0">•</span>
                      <span>${desc}</span>
                    </li>`
                )
                .join("")}
            </ul>
          </div>
        `;
          })
          .join("")}
      </div>
    </div>
    
    <!-- Right Column -->
    <div class="space-y-5 pl-3 border-l border-gray-200">
      <!-- Skills -->
      <div>
        <h2 class="text-base font-semibold text-blue-600 mb-3 uppercase tracking-wide">Skills</h2>
        <div class="space-y-2">
          ${Object.entries(data.skills)
            .map(
              ([category, items]) => `
            <div>
              <h3 class="font-semibold text-gray-900 mb-0.5 text-xs">${category}</h3>
              <p class="text-gray-600 text-xs leading-tight">${items.join(
                ", "
              )}</p>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      
      <!-- Projects -->
      <div>
        <h2 class="text-base font-semibold text-blue-600 mb-3 uppercase tracking-wide">Projects</h2>
        <div class="space-y-3">
          ${data.projects
            .map(
              (project) => `
            <div>
              <h3 class="font-semibold text-gray-900 text-xs">
                ${
                  project.url
                    ? `<a href="${project.url}" class="text-gray-900 hover:underline">${project.name}</a>`
                    : project.name
                }
              </h3>
              <p class="text-gray-600 text-xs italic mb-0.5 leading-tight">${
                project.description
              }</p>
              <p class="text-gray-500 text-xs">${project.technologies.join(
                " • "
              )}</p>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      
      <!-- Education -->
      <div>
        <h2 class="text-base font-semibold text-blue-600 mb-3 uppercase tracking-wide">Education</h2>
        <div class="space-y-3">
          ${data.education
            .map(
              (edu) => `
            <div>
              <div class="flex justify-between items-baseline">
                <h3 class="font-semibold text-gray-900 text-xs">${
                  edu.institution
                }</h3>
                <span class="text-xs text-gray-500 whitespace-nowrap ml-2">${
                  edu.graduationDate
                }</span>
              </div>
              <p class="text-gray-600 text-xs">${edu.degree}</p>
              ${
                edu.gpa && edu.honors
                  ? `<p class="text-gray-500 text-xs">GPA ${edu.gpa}, ${edu.honors}</p>`
                  : ""
              }
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}
