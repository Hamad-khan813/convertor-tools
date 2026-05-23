import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/lib/tools-data";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Convertly Categories | All Converter Types",
  description: "Browse all Convertly conversion categories including length, weight, volume, temperature, finance, agriculture, and more.",
  alternates: {
    canonical: "https://convertly.com/categories",
  },
  openGraph: {
    title: "Convertly Categories | All Converter Types",
    description: "Browse all Convertly conversion categories including length, weight, volume, temperature, finance, agriculture, and more.",
    url: "https://convertly.com/categories",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Convertly Categories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convertly Categories | All Converter Types",
    description: "Browse all Convertly conversion categories including length, weight, volume, temperature, finance, agriculture, and more.",
    images: ["/og-image.svg"],
  },
};

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">Convertly Categories</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-5xl">
            Explore every converter category in one place
          </h1>
          <p className="mt-4 text-base leading-8 text-zinc-600 dark:text-zinc-300">
            Choose a category to access specialized conversion calculators, precision tools, and domain-specific guide content.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${category.id}`}
              className="group rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-sm hover:border-emerald-500/30 hover:shadow-md transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-300 mb-4">
                <Icon name={category.icon} className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-zinc-950 dark:text-white mb-2">{category.name}</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{category.description}</p>
              <div className="mt-4 text-sm font-semibold text-emerald-600 dark:text-emerald-400">Browse Tools →</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
