import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Mathematical Disclaimer & Usage Guidelines | Convertly",
  description: "Read the usage terms, math formula disclaimers, and copyright policies of the Convertly calculator hub. Double-precision numbers provided for educational and academic use.",
  keywords: ["terms of service", "convertly rules", "calculator disclaimer", "academic tool usage", "precision licensing"],
  alternates: {
    canonical: "https://convertly.com/terms",
    languages: {
      "x-default": "https://convertly.com/terms",
      en: "https://convertly.com/terms",
    },
  },
  openGraph: {
    title: "Terms of Service | Mathematical Disclaimer & Usage Guidelines | Convertly",
    description: "Read the usage terms, math formula disclaimers, and copyright policies of the Convertly calculator hub. Double-precision numbers provided for educational and academic use.",
    url: "https://convertly.com/terms",
    siteName: "Convertly",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Mathematical Disclaimer & Usage Guidelines | Convertly",
    description: "Read the usage terms, math formula disclaimers, and copyright policies of the Convertly calculator hub. Double-precision numbers provided for educational and academic use.",
  },
};

export default function TermsPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://convertly.com/terms#webpage",
      "url": "https://convertly.com/terms",
      "name": "Terms of Service - Convertly",
      "description": "General operating terms and mathematical disclaimers of Convertly.",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": "https://convertly.com/terms#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://convertly.com",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Terms of Service",
          "item": "https://convertly.com/terms",
        },
      ],
    },
  ];

  return (
    <>
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-8 space-y-2">
            <Link href="/" className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Terms of Service
            </h1>
            <p className="text-zinc-500 mt-2 text-sm max-w-2xl leading-relaxed">
              Please read these terms before performing professional engineering or business calculations.
            </p>
          </div>

          <div className="space-y-6 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">1. Agreement to Terms</h2>
            <p>
              By accessing Convertly, you agree to comply with our standard terms. All calculators are free to use for personal, academic, professional, agricultural, or experimental applications.
            </p>

            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">2. Calculation Disclaimer</h2>
            <p>
              While Convertly performs calculations with float-point double precision calibrated to international SI constants, **all output metrics are provided "as-is" without warranty of any kind**. Convertly will not be held liable for structural failures, crop yields, financial loan margins, or physical damages resulting from calculations.
            </p>

            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">3. Intellectual Property</h2>
            <p>
              The mathematical conversion algorithms, dynamic natural language search systems, custom graphic interfaces, and CSS components are the intellectual property of Convertly Inc.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
