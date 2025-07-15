// app/api/generate-pdf/route.ts
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { generateHtmlTemplate } from "@/lib/htmlTemplateGenerator";
import { ResumeData } from "@/lib/resumeData";

export async function POST(request: NextRequest) {
  try {
    const resumeData: ResumeData = await request.json();

    // Generate HTML content
    const htmlContent = generateHtmlTemplate(resumeData);

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });

    const page = await browser.newPage();

    // Set content and wait for fonts to load
    await page.setContent(htmlContent, {
      waitUntil: ["networkidle0", "domcontentloaded"],
    });

    // Wait for fonts to load (Google Fonts)
    await page.evaluateHandle("document.fonts.ready");

    // Generate PDF with high quality settings
    const pdfBuffer = await page.pdf({
      format: "Letter", // 8.5" x 11"
      printBackground: true,
      preferCSSPageSize: false,
      margin: {
        top: "0.0in",
        right: "0.0in",
        bottom: "0.0in",
        left: "0.0in",
      },
      displayHeaderFooter: false,
      scale: 1,
    });

    await browser.close();

    // Return PDF with proper headers
    return new NextResponse(pdfBuffer as any, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${resumeData.personalInfo.name.replace(
          /\s+/g,
          "_"
        )}_Resume.pdf"`,
        "Content-Length": pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}

// Optional: Add a simple GET endpoint for testing
export async function GET() {
  return NextResponse.json({
    message: "PDF generation endpoint is working. Use POST with resume data.",
    usage: "POST /api/generate-pdf with ResumeData in body",
  });
}
