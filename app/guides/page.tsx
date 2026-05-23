import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Convertly Guides | How to Use Converters & Calculators",
  description: "Explore Convertly guides for step-by-step instructions on using converters, calculators, and measurement tools effectively.",
  alternates: {
    canonical: "https://convertly.com/guides",
  },
  openGraph: {
    title: "Convertly Guides | How to Use Converters & Calculators",
    description: "Explore Convertly guides for step-by-step instructions on using converters, calculators, and measurement tools effectively.",
    url: "https://convertly.com/guides",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Convertly Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convertly Guides | How to Use Converters & Calculators",
    description: "Explore Convertly guides for step-by-step instructions on using converters, calculators, and measurement tools effectively.",
    images: ["/og-image.svg"],
  },
};

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">Convertly Guides</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-5xl">
            Step-by-step guides for smarter conversions
          </h1>
          <p className="mt-4 text-base leading-8 text-zinc-600 dark:text-zinc-300">
            Learn how to use Convertly tools, choose the right units, and apply formulas accurately across science, finance, and agriculture.
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-8 shadow-sm">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            This page will host in-depth guides that explain how to best use each calculator and converter, how unit ratios work, and how to interpret results across different domains.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Link href="/" className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-6 py-5 text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition">
              Back to Home
            </Link>
            <Link href="/#categories" className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-6 py-5 text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition">
              Browse Categories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
