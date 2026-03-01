"use client";

import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import IframeResizer from "@iframe-resizer/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize,
  Download,
  Loader2,
} from "lucide-react";
import { initialResumeData, type ResumeData } from "@/lib/resumeData";
import { generateHtmlTemplate } from "@/lib/htmlTemplateGenerator";
import { generateReactCode } from "@/lib/reactCodeGenerator";
import { useGeneratePdf } from "./hooks/useGeneratePdf";

const STORAGE_KEY = "resume-builder-data";

export default function TabbedResumeBuilder() {
  const [jsonData, setJsonData] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return saved;
    }
    return JSON.stringify(initialResumeData, null, 2);
  });
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [htmlContent, setHtmlContent] = useState("");
  const [reactCode, setReactCode] = useState("");
  const [zoom, setZoom] = useState(70);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving">("saved");
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { generatePdf, isGenerating, error } = useGeneratePdf();

  // Auto-save to localStorage (debounced)
  useEffect(() => {
    setSaveStatus("saving");
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      try {
        JSON.parse(jsonData);
        localStorage.setItem(STORAGE_KEY, jsonData);
      } catch {
        // Don't persist broken JSON
      }
      setSaveStatus("saved");
    }, 500);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [jsonData]);

  // Update resume data when JSON changes
  useEffect(() => {
    try {
      const parsed = JSON.parse(jsonData);
      setResumeData(parsed);
      setJsonError(null);
    } catch (error) {
      setJsonError("Invalid JSON format");
      return;
    }
  }, [jsonData]);

  // Generate HTML and React code when data changes
  useEffect(() => {
    if (resumeData && !jsonError) {
      const html = generateHtmlTemplate(resumeData);
      const react = generateReactCode(resumeData);
      setHtmlContent(html);
      setReactCode(react);
    }
  }, [resumeData, jsonError]);

  const handleReset = () => {
    const defaultData = JSON.stringify(initialResumeData, null, 2);
    setJsonData(defaultData);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleJsonChange = (value: string | undefined) => {
    if (value !== undefined) {
      setJsonData(value);
    }
  };

  // Zoom controls
  const zoomIn = () => setZoom((prev) => Math.min(prev + 10, 200));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 10, 30));
  const resetZoom = () => setZoom(100);
  const fitToWidth = () => setZoom(70);

  const handleDownloadPdf = async () => {
    if (resumeData && !jsonError) {
      await generatePdf(resumeData);
    }
  };

  return (
    <div className="h-screen bg-zinc-900 p-3 flex flex-col overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5 flex-1 min-h-0">
        {/* Left Panel - Tabbed Editors */}
        <div className="flex flex-col bg-zinc-800 rounded-md overflow-hidden">
          {/* Add PDF Export Button in the header */}
          <div className="flex items-center justify-between p-3 bg-zinc-800 border-b border-zinc-700">
            <h2 className="text-zinc-100 font-medium">Resume Builder</h2>
            <Button
              onClick={handleDownloadPdf}
              disabled={isGenerating || !!jsonError}
              className="bg-zinc-100 hover:bg-white text-zinc-900 font-medium text-xs px-3 py-1.5 h-auto"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-3 h-3 mr-1.5" />
                  Export PDF
                </>
              )}
            </Button>
          </div>

          {error && (
            <div className="mx-3 mt-2 p-2 bg-zinc-700/50 border border-zinc-600 rounded text-zinc-300 text-xs">
              PDF Export Error: {error}
            </div>
          )}

          <Tabs defaultValue="json" className="flex flex-col flex-1 min-h-0">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-800 border-b border-zinc-700">
              <TabsTrigger
                value="json"
                className="data-[state=active]:bg-zinc-700 text-zinc-300 data-[state=active]:text-white"
              >
                JSON Data
              </TabsTrigger>
              <TabsTrigger
                value="react"
                className="data-[state=active]:bg-zinc-700 text-zinc-300 data-[state=active]:text-white"
              >
                React Code
              </TabsTrigger>
            </TabsList>

            <TabsContent value="json" className="flex-1 m-0 min-h-0 overflow-hidden">
              <div className="flex flex-col h-full min-h-0">
                <div className="flex items-center justify-between p-3 bg-zinc-800 border-b border-zinc-700">
                  <div className="flex items-center gap-2">
                    <h2 className="text-zinc-100 font-medium">Resume Data</h2>
                    <Badge
                      variant="outline"
                      className={`text-xs border-zinc-700 bg-transparent transition-opacity duration-300 ${
                        saveStatus === "saving"
                          ? "text-zinc-400 opacity-70"
                          : "text-zinc-500"
                      }`}
                    >
                      {saveStatus === "saving" ? "Saving..." : "Saved"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {jsonError && (
                      <span className="text-zinc-200 text-xs bg-zinc-600 font-medium px-2 py-1 rounded">
                        {jsonError}
                      </span>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleReset}
                      className="h-7 px-2 text-xs text-zinc-400 hover:text-white hover:bg-zinc-700"
                    >
                      <RotateCcw className="w-3 h-3 mr-1" />
                      Reset
                    </Button>
                  </div>
                </div>
                <div className="flex-1 min-h-0 relative">
                  <div className="absolute inset-0">
                  <Editor
                    height="100%"
                    language="json"
                    theme="vs-dark"
                    value={jsonData}
                    onChange={handleJsonChange}
                    options={{
                      fontSize: 14,
                      lineHeight: 1.5,
                      fontFamily:
                        "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      wordWrap: "on",
                      wordWrapColumn: 80,
                      wrappingIndent: "indent",
                      lineNumbers: "on",
                      folding: true,
                      bracketPairColorization: { enabled: true },
                      autoIndent: "full",
                      formatOnPaste: true,
                      formatOnType: true,
                      tabSize: 2,
                      insertSpaces: true,
                      smoothScrolling: true,
                      scrollbar: {
                        horizontal: "auto",
                        vertical: "auto",
                        horizontalScrollbarSize: 12,
                        verticalScrollbarSize: 12,
                      },
                      automaticLayout: true,
                    }}
                  />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="react" className="flex-1 m-0 min-h-0 overflow-hidden">
              <div className="flex flex-col h-full min-h-0">
                <div className="flex items-center justify-between p-3 bg-zinc-800 border-b border-zinc-700">
                  <h2 className="text-zinc-100 font-medium">
                    Generated React Component
                  </h2>
                  <Badge
                    variant="outline"
                    className="text-zinc-400 border-zinc-600 bg-transparent text-xs"
                  >
                    Read-only
                  </Badge>
                </div>
                <div className="flex-1 min-h-0 relative">
                  <div className="absolute inset-0">
                  <Editor
                    height="100%"
                    language="typescript"
                    theme="vs-dark"
                    value={reactCode}
                    options={{
                      readOnly: true,
                      fontSize: 14,
                      lineHeight: 1.5,
                      fontFamily:
                        "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      wordWrap: "on",
                      wordWrapColumn: 80,
                      wrappingIndent: "indent",
                      lineNumbers: "on",
                      folding: true,
                      bracketPairColorization: { enabled: true },
                      tabSize: 2,
                      smoothScrolling: true,
                      scrollbar: {
                        horizontal: "auto",
                        vertical: "auto",
                        horizontalScrollbarSize: 12,
                        verticalScrollbarSize: 12,
                      },
                      automaticLayout: true,
                    }}
                  />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex flex-col bg-zinc-800 rounded-md overflow-hidden">
          {/* Zoom Controls */}
          <div className="flex items-center justify-between p-3 bg-zinc-800 border-b border-zinc-700">
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={zoomOut}
                disabled={zoom <= 30}
                className="h-8 w-8 p-0 bg-zinc-700 border-zinc-600 text-white hover:bg-zinc-600"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>

              <Badge
                variant="secondary"
                className="min-w-[60px] text-center bg-zinc-700 text-zinc-100 hover:bg-zinc-700"
              >
                {zoom}%
              </Badge>

              <Button
                variant="secondary"
                size="sm"
                onClick={zoomIn}
                disabled={zoom >= 200}
                className="h-8 w-8 p-0 bg-zinc-700 border-zinc-600 text-white hover:bg-zinc-600"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>

              <Separator
                orientation="vertical"
                className="h-6 mx-1 bg-zinc-600"
              />

              <Button
                variant="secondary"
                size="sm"
                onClick={fitToWidth}
                className="h-8 px-3 text-xs bg-zinc-700 border-zinc-600 text-white hover:bg-zinc-600"
              >
                <Maximize className="w-3 h-3 mr-1" />
                Fit
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={resetZoom}
                className="h-8 px-3 text-xs bg-zinc-700 border-zinc-600 text-white hover:bg-zinc-600"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                100%
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-zinc-300 text-sm font-medium">
                Resume Preview
              </span>
              <Badge
                variant="outline"
                className="text-zinc-400 border-zinc-600 bg-transparent"
              >
                8.5" × 11"
              </Badge>
            </div>
          </div>

          {/* Preview Container */}
          <div className="flex-1 overflow-auto bg-black p-4">
            <div className="flex justify-center">
              <div
                className="bg-white rounded-sm shadow-xl"
                style={{
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: "top center",
                  width: "816px",
                  minHeight: "1056px",
                }}
              >
                {htmlContent && (
                  <IframeResizer
                    src={`data:text/html;charset=utf-8,${encodeURIComponent(
                      htmlContent
                    )}`}
                    style={{
                      width: "816px",
                      height: "auto",
                      minHeight: "1056px",
                      border: "none",
                      background: "white",
                      borderRadius: "8px",
                    }}
                    license="GPLv3"
                    checkOrigin={false}
                    direction="none"
                    scrolling={false}
                    log={false}
                    warningTimeout={0}
                    tolerance={0}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
