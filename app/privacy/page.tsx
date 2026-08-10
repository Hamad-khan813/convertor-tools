import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Convertly",
  description: "Read how Convertly handles calculator history, favorites, and browser storage.",
  keywords: ["privacy policy", "calculator history", "local storage", "favorites", "browser data"],
  alternates: {
    canonical: "https://unit-convertor-tools.vercel.app/privacy",
    languages: {
      "x-default": "https://unit-convertor-tools.vercel.app/privacy",
      en: "https://unit-convertor-tools.vercel.app/privacy",
    },
  },
  openGraph: {
    title: "Privacy Policy | Convertly",
    description: "Read how Convertly handles calculator history, favorites, and browser storage.",
    url: "https://unit-convertor-tools.vercel.app/privacy",
    siteName: "Convertly",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Convertly",
    description: "Read how Convertly handles calculator history, favorites, and browser storage.",
  },
};

export default function PrivacyPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://unit-convertor-tools.vercel.app/privacy#webpage",
      "url": "https://unit-convertor-tools.vercel.app/privacy",
      "name": "Privacy Policy - Convertly",
      "description": "Information on how Convertly uses local browser storage for calculator convenience features.",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": "https://unit-convertor-tools.vercel.app/privacy#breadcrumb",
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
          "name": "Privacy Policy",
          "item": "https://unit-convertor-tools.vercel.app/privacy",
        },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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
              Privacy Policy
            </h1>
            <p className="text-zinc-500 mt-2 text-sm max-w-2xl leading-relaxed">
              Your data is handled locally where possible. Learn how we use storage and support data.
            </p>
          </div>

          <div className="space-y-6 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">1. Information Collection</h2>
            <p>
              Convertly is designed so calculator inputs are processed in the browser. We do not require an account to use the main tools.
            </p>

            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">2. Local Browser Storage</h2>
            <p>
              Favorites and conversion history are stored with browser-native <code>localStorage</code>. This data stays on your device and can be cleared from the interface.
            </p>

            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">3. Third Party Services</h2>
            <p>
              We aim to keep third-party scripts to a minimum and avoid unnecessary tracking.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
