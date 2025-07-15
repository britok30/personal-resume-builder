// hooks/useGeneratePdf.ts
import { useState } from "react";
import { ResumeData } from "@/lib/resumeData";

interface UseGeneratePdfReturn {
  generatePdf: (resumeData: ResumeData) => Promise<void>;
  isGenerating: boolean;
  error: string | null;
}

export function useGeneratePdf(): UseGeneratePdfReturn {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePdf = async (resumeData: ResumeData) => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resumeData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Get the PDF blob
      const pdfBlob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${resumeData.personalInfo.name.replace(
        /\s+/g,
        "_"
      )}_Resume.pdf`;

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation failed:", err);
      setError(err instanceof Error ? err.message : "PDF generation failed");
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generatePdf,
    isGenerating,
    error,
  };
}
