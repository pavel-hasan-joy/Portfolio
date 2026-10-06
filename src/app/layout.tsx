import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScrollProvider } from "@/components/SmoothScroll";
import { siteContent } from "@/data/content";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteContent.personal.name} — Aspiring Full-Stack Software Engineer & ML Engineer`,
  description: `${siteContent.personal.name} (${siteContent.personal.bengaliName}) is an aspiring Full-Stack Software Engineer and ML & AI Engineer at ULAB. Specializing in C, C++, Java, Git, GitHub, climate intelligence, and modern web architectures.`,
  keywords: [
    "Pavel Hasan Joy",
    "পাবেল হাসান জয়",
    "ULAB CSE",
    "Full-Stack Software Engineer",
    "ML Engineer",
    "Climate Lens Bangladesh",
    "NASA Space Apps 2026",
    "C++ Developer",
    "Java Developer",
  ],
  authors: [{ name: siteContent.personal.name, url: siteContent.socials.github }],
  creator: siteContent.personal.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pavel-hasan-joy.vercel.app",
    title: `${siteContent.personal.name} — Portfolio`,
    description: siteContent.personal.oneLineValueProp,
    siteName: `${siteContent.personal.name} Portfolio`,
    images: [
      {
        url: siteContent.personal.avatarUrl,
        width: 400,
        height: 400,
        alt: siteContent.personal.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.personal.name,
    description: siteContent.personal.oneLineValueProp,
    images: [siteContent.personal.avatarUrl],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Person Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteContent.personal.name,
    alternateName: siteContent.personal.bengaliName,
    url: siteContent.socials.github,
    sameAs: [
      siteContent.socials.github,
      siteContent.socials.linkedin,
    ],
    jobTitle: siteContent.personal.roles,
    alumniOf: {
      "@type": "EducationalOrganization",
      name: siteContent.personal.institution,
    },
    knowsAbout: ["C", "C++", "Java", "Git", "GitHub", "Full-Stack Development", "Machine Learning"],
  };

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
