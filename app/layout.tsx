import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const basisGrotesque = localFont({
  src: [
    {
      path: "./fonts/BasisGrotesqueArabicPro-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/BasisGrotesqueArabicPro-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/BasisGrotesqueArabicPro-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/BasisGrotesqueArabicPro-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Personal Resume Builder",
  description:
    "Custom resume builder with live JSON editing, real-time preview, and PDF export. Built with Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${basisGrotesque.className} antialiased bg-black`}>
        {children}
      </body>
    </html>
  );
}
