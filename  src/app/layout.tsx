import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ALPHA WAVE | Business Explorer",
    template: "%s | ALPHA WAVE Business Explorer"
  },
  description:
    "Explore business opportunities, industry research, financial planning tools and business intelligence for India.",
  applicationName: "ALPHA WAVE Business Explorer",
  keywords: [
    "ALPHA WAVE",
    "Business Explorer",
    "Business Opportunities India",
    "Business Research",
    "Startup Planning",
    "Financial Calculators",
    "Market Research"
  ],
  authors: [
    {
      name: "ALPHA WAVE"
    }
  ],
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2457d6"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}