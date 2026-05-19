import React from "react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-8 space-y-2">
          <Link href="/" className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" /></svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-zinc-500 mt-2 text-sm max-w-2xl leading-relaxed">
            Your data is strictly private. Learn how we handle storage and calculations.
          </p>
        </div>

        <div className="space-y-6 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">1. Information Collection</h2>
          <p>
            Convertly is designed as a server-side rendered, client-side stateful application. We **do not collect, harvest, or transmit** any parameters you enter in our calculators or converter inputs.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">2. Local Browser Storage</h2>
          <p>
            Our dynamic favorites system and conversion history widgets operate strictly through browser-native `localStorage`. This data is saved directly on your device, is never uploaded to our servers, and can be cleared instantly by selecting the “Clear History” button in the sidebar.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">3. Third Party Services</h2>
          <p>
            We use no external behavioral tracking tools or advertising scripts. Clean operations protect your device bandwidth and maximize page speed metrics.
          </p>
        </div>
      </div>
    </div>
  );
}
