import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Convertly | Premium Numerical Standards & Precision Mission",
  description: "Learn about Convertly, a unit conversion and calculator site built for clarity, speed, and practical use.",
  keywords: ["about convertly", "numerical standards", "calculator precision", "privacy policy", "fast unit converters"],
  alternates: {
    canonical: "https://unit-convertor-tools.vercel.app/about",
    languages: {
      "x-default": "https://unit-convertor-tools.vercel.app/about",
      en: "https://unit-convertor-tools.vercel.app/about",
    },
  },
  openGraph: {
    title: "About Convertly | Unit Conversion and Calculator Tools",
    description: "Learn about Convertly, a unit conversion and calculator site built for clarity, speed, and practical use.",
    url: "https://unit-convertor-tools.vercel.app/about",
    siteName: "Convertly",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Convertly | Premium Numerical Standards & Precision Mission",
    description: "Learn about the mission, technological stack, and strict mathematical standards powering Convertly.",
  },
};

export default function AboutPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": "https://unit-convertor-tools.vercel.app/about#webpage",
      "url": "https://unit-convertor-tools.vercel.app/about",
      "name": "About Convertly",
      "description": "Discover the mission and practical focus behind Convertly unit conversion tools.",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": "https://unit-convertor-tools.vercel.app/about#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://unit-convertor-tools.vercel.app",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "About",
          "item": "https://unit-convertor-tools.vercel.app/about",
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
              About Convertly
            </h1>
            <p className="text-zinc-500 mt-2 text-sm max-w-2xl leading-relaxed">
              Discover the mission, technology, and engineering standards behind our premium calculator suite.
            </p>
          </div>

          <div className="space-y-6 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Our Mission</h2>
            <p>
              Convertly exists to make everyday unit conversion easier to find, faster to use, and simpler to verify.
            </p>
            <p>
              Our objective is to deliver a fast calculation hub with clear formulas, practical layouts, and straightforward navigation for students, professionals, and everyday users.
            </p>

            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Mathematical Integrity</h2>
            <p>
              Precision matters on every calculator page. We publish the formulas and conversion logic directly in the interface so users can review the math behind each result.
            </p>

            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Open & Private</h2>
            <p>
              Favorites and history are stored locally in your browser with `localStorage`. That keeps common calculator shortcuts on your device without requiring an account.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

