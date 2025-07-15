export interface ResumeVariables {
  [key: string]: {
    normal: string;
    redacted?: string;
  };
}

export interface ResumeConfig {
  redacted: boolean;
  variables: ResumeVariables;
}

export interface ThemeConfig {
  isDark: boolean;
}

export interface ExportOptions {
  format: "pdf" | "html";
  includeStyles: boolean;
}
