import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Unit Convertor Tools",
  description: "The page you requested cannot be found. Return to the homepage or open one of the top converter tools.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-zinc-200 bg-white p-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">404 — Page not found</p>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-5xl">
            We couldn&apos;t find that calculator or guide.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-base leading-8 text-zinc-600 dark:text-zinc-300">
            The URL may have changed or the tool was renamed. Explore the fastest converter pages, browse calculator categories, or return to the homepage for instant access.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/length-converter" className="rounded-3xl border border-zinc-200 bg-zinc-50 px-6 py-5 text-left text-sm font-semibold text-zinc-900 transition hover:border-emerald-500/30 hover:bg-emerald-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
              Length Converter
            </Link>
            <Link href="/weight-converter" className="rounded-3xl border border-zinc-200 bg-zinc-50 px-6 py-5 text-left text-sm font-semibold text-zinc-900 transition hover:border-emerald-500/30 hover:bg-emerald-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
              Weight Converter
            </Link>
            <Link href="/agriculture/npk-fertilizer-calculator" className="rounded-3xl border border-zinc-200 bg-zinc-50 px-6 py-5 text-left text-sm font-semibold text-zinc-900 transition hover:border-emerald-500/30 hover:bg-emerald-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
              NPK Fertilizer Calculator
            </Link>
            <Link href="/blog" className="rounded-3xl border border-zinc-200 bg-zinc-50 px-6 py-5 text-left text-sm font-semibold text-zinc-900 transition hover:border-emerald-500/30 hover:bg-emerald-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
              SEO Blog & Guides
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
