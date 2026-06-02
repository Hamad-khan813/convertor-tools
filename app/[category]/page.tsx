import React from "react";
import { notFound } from "next/navigation";
import { categories } from "@/lib/tools-data";
import CategoryClient from "../../components/CategoryClient";
import Link from "next/link";
import { Metadata } from "next";

interface Props {
  params: Promise<{ category: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Generate static routes for all categories during compile time
export async function generateStaticParams() {
  return categories.map((cat) => ({
    category: cat.id,
  }));
}

// Dynamic SEO metadata generator for categories
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = categories.find((c) => c.id === categorySlug);

  if (!category) {
    return {
      title: "Category Not Found | Convertly",
    };
  }

  return {
    title: `${category.name} Converter | Online Unit Calculator | Convertly`,
    description: `Convert between all ${category.name} units instantly. ${category.description} Real-time accurate formulas, comparison grids, and history tracking.`,
    keywords: [
      `${category.name.toLowerCase()} converter`,
      `convert ${category.name.toLowerCase()} units`,
      ...category.units.slice(0, 5).map((u) => `${u.name.toLowerCase()} converter`),
    ],
    alternates: {
      canonical: `https://unit-convertor-tools.vercel.app/${categorySlug}`,
      languages: {
        "x-default": `https://unit-convertor-tools.vercel.app/${categorySlug}`,
        en: `https://unit-convertor-tools.vercel.app/${categorySlug}`,
      },
    },
    openGraph: {
      title: `${category.name} Unit Converter | Convertly`,
      description: category.description,
      url: `https://unit-convertor-tools.vercel.app/${categorySlug}`,
      type: "website",
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: `${category.name} Unit Converter | Convertly`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} Unit Converter | Convertly`,
      description: category.description,
      images: ["/og-image.svg"],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params;
  const category = categories.find((c) => c.id === categorySlug);

  if (!category) {
    notFound();
  }

  // Generate JSON-LD structured data for the category
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "@id": `https://unit-convertor-tools.vercel.app/${categorySlug}#webapp`,
      "name": `${category.name} Unit Converter - Convertly`,
      "description": category.description,
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "url": `https://unit-convertor-tools.vercel.app/${categorySlug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `https://unit-convertor-tools.vercel.app/${categorySlug}#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://unit-convertor-tools.vercel.app"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": category.name,
          "item": `https://unit-convertor-tools.vercel.app/${categorySlug}`
        }
      ]
    }
  ];

  return (
    <>
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative flex-1">
        {/* Background glow */}
        <div className="hero-glow top-[-200px] left-[50%] translate-x-[-50%] opacity-40"></div>

        {/* Dynamic Category Interactive Wrapper */}
        <CategoryClient categorySlug={categorySlug} />
      </div>
    </>
  );
}
