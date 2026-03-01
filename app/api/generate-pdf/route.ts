// app/api/generate-pdf/route.ts
import { NextRequest, NextResponse } from "next/server";
import puppeteer, { Browser } from "puppeteer";
import { generateHtmlTemplate } from "@/lib/htmlTemplateGenerator";
import { ResumeData } from "@/lib/resumeData";

const PDF_TIMEOUT_MS = 30_000;

function sanitizeFilename(name: string): string {
  return name
    .replace(/[^\w\s-]/g, "") // strip everything except word chars, spaces, hyphens
    .replace(/\s+/g, "_") // collapse whitespace to underscores
    .slice(0, 100); // cap length
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 }
    );
  }

  const resumeData = body as ResumeData;

  if (!resumeData?.personalInfo?.name) {
    return NextResponse.json(
      { error: "Missing required field: personalInfo.name" },
      { status: 400 }
    );
  }

  const htmlContent = generateHtmlTemplate(resumeData);
  const filename = sanitizeFilename(resumeData.personalInfo.name);

  let browser: Browser | null = null;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });

    const page = await browser.newPage();

    // domcontentloaded is sufficient — the template is self-contained.
    // fonts.ready below handles the only async resource (Google Fonts).
    await page.setContent(htmlContent, {
      waitUntil: "domcontentloaded",
    });

    await page.evaluateHandle("document.fonts.ready");

    const pdfBuffer = await Promise.race([
      page.pdf({
        format: "Letter",
        printBackground: true,
        preferCSSPageSize: false,
        margin: { top: "0in", right: "0in", bottom: "0in", left: "0in" },
        displayHeaderFooter: false,
        scale: 1,
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("PDF generation timed out")),
          PDF_TIMEOUT_MS
        )
      ),
    ]);

    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}_Resume.pdf"`,
        "Content-Length": pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    const message =
      error instanceof Error && error.message === "PDF generation timed out"
        ? "PDF generation timed out"
        : "Failed to generate PDF";
    return NextResponse.json({ error: message }, { status: 500 });
  } finally {
    await browser?.close();
  }
}
