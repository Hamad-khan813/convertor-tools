import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-8 space-y-2">
          <Link href="/" className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" /></svg>
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
            Convertly was founded in 2026 to solve a major problem with the modern internet: legibility. For years, unit conversion sites have been cluttered with slow loading layouts, intrusive tracking scripts, and outdated user interfaces.
          </p>
          <p>
            Our objective is to deliver a premium, fast, highly precise calculation hub. By utilizing Next.js 15 Server-Side Rendering (SSR), lightweight vector rendering, and localized clients, we build pages that load instantly and provide zero lag for students, scientists, farmers, and engineering teams.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Mathematical Integrity</h2>
          <p>
            Precision is our core metric. All conversion constants are calibrated against standard units established by the International Bureau of Weights and Measures (BIPM) and the National Institute of Standards and Technology (NIST). Our calculations process numbers using double-precision floating-point formats, providing high numerical resolution up to 6 decimal places.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Open & Private</h2>
          <p>
            Your activity belongs to you. Convertly implements the **Favorites & Conversion History** systems strictly on your local browser machine via `localStorage`. No search history or calculator parameters are ever uploaded to cloud servers.
          </p>
        </div>
      </div>
    </div>
  );
}
