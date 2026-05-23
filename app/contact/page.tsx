import React from "react";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Support & Engineering Calibration | Convertly",
  description: "Get in touch with the Convertly engineering and mathematics team. Report calculator rounding bugs, request specialized physical converters, or check server status.",
  keywords: ["contact convertly", "request calculator", "report rounding bug", "convertly engineering", "support"],
  alternates: {
    canonical: "https://convertly.com/contact",
    languages: {
      "x-default": "https://convertly.com/contact",
      en: "https://convertly.com/contact",
    },
  },
  openGraph: {
    title: "Contact Support & Engineering Calibration | Convertly",
    description: "Get in touch with the Convertly engineering and mathematics team. Report calculator rounding bugs or request specialized physical converters.",
    url: "https://convertly.com/contact",
    siteName: "Convertly",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Support & Engineering Calibration | Convertly",
    description: "Get in touch with the Convertly engineering and mathematics team. Report calculator rounding bugs or request specialized physical converters.",
  },
};

export default function ContactPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://convertly.com/contact#webpage",
      "url": "https://convertly.com/contact",
      "name": "Contact Support & Engineering Calibration - Convertly",
      "description": "Contact the core team for unit converter calibration queries, tool requests, and general support.",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": "https://convertly.com/contact#breadcrumb",
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
          "name": "Contact",
          "item": "https://convertly.com/contact",
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
              Contact Support & Engineering
            </h1>
            <p className="text-zinc-500 mt-2 text-sm max-w-2xl leading-relaxed">
              Report a mathematical rounding bug, request a new calculator tool, or contact the core engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Contact details */}
            <div className="space-y-6 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <div>
                <h3 className="font-bold text-zinc-900 dark:text-white text-base">Direct Channels</h3>
                <p className="mt-1">For critical enterprise calibration API integrations, contact our engineering branch:</p>
                <div className="mt-3 space-y-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
                  <div>Email: hamadkhan9996310@gmail.com</div>
                  <div>Server Availability: 99.99% Up</div>
                </div>
              </div>

              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6">
                <h3 className="font-bold text-zinc-900 dark:text-white text-base">Tool Requests</h3>
                <p className="mt-1">
                  We are actively expanding our catalog towards 1000+ custom calculators. Let us know if you require specialized construction, chemical science, or financial amortization worksheets.
                </p>
              </div>
            </div>

            {/* Form Card (Decoupled client component) */}
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}
