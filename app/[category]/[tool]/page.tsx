import React from "react";
import { notFound } from "next/navigation";
import { categories } from "@/lib/tools-data";
import ToolClient from "../../../components/ToolClient";
import { Metadata } from "next";

interface Props {
  params: Promise<{ category: string; tool: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const dynamicParams = true;

// Pre-render standard predefined tools during static generation
export async function generateStaticParams() {
  const paramsList: { category: string; tool: string }[] = [];

  categories.forEach((cat) => {
    // Add popular predefined converters (which include the custom calculators)
    cat.popularTools.forEach((tool) => {
      paramsList.push({
        category: cat.id,
        tool: tool.id,
      });
    });
  });

  return paramsList;
}

// Utility to parse dynamic ad-hoc converters (e.g. meter-to-foot -> m and ft)
function parseAdHocTool(categorySlug: string, toolSlug: string) {
  const category = categories.find((c) => c.id === categorySlug);
  if (!category) return null;

  // Predefined custom calculators and their dedicated categories
  const specialToolsMap: { [key: string]: string } = {
    "npk-fertilizer-calculator": "agriculture",
    "bmi-calculator": "health",
    "loan-mortgage-calculator": "finance",
    "compound-interest": "finance",
    "roman-numerals": "miscellaneous",
  };

  // Enforce correct category path for custom dynamic dashboard calculators
  if (specialToolsMap[toolSlug]) {
    if (categorySlug !== specialToolsMap[toolSlug]) {
      return null;
    }
  }

  // Check if it matches popularTools first
  const popular = category.popularTools.find((t) => t.id === toolSlug);
  if (popular) {
    const isSpecial = !!specialToolsMap[toolSlug];
    return {
      isSpecial,
      fromUnit: popular.fromUnit,
      toUnit: popular.toUnit,
      name: popular.name,
      description: popular.description,
      faqs: popular.faqs,
      formula: popular.formula,
    };
  }

  // Safely fallback for special tools if not fully represented in popularTools
  if (specialToolsMap[toolSlug]) {
    return {
      isSpecial: true,
      fromUnit: "",
      toUnit: "",
      name: toolSlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      description: `Premium interactive ${toolSlug.replace(/-/g, " ")} solver dashboard.`,
      faqs: [],
      formula: "",
    };
  }

  // Check if it's an ad-hoc "unit1-to-unit2" converter
  const parts = toolSlug.split("-to-");
  if (parts.length === 2) {
    const fromUnitRaw = parts[0];
    const toUnitRaw = parts[1];

    // Find units by symbol, ID or synonym
    const fromUnit = category.units.find(
      (u) =>
        u.id.toLowerCase() === fromUnitRaw ||
        u.symbol.toLowerCase() === fromUnitRaw ||
        u.name.toLowerCase().startsWith(fromUnitRaw)
    );
    const toUnit = category.units.find(
      (u) =>
        u.id.toLowerCase() === toUnitRaw ||
        u.symbol.toLowerCase() === toUnitRaw ||
        u.name.toLowerCase().startsWith(toUnitRaw)
    );

    if (fromUnit && toUnit) {
      return {
        isSpecial: false,
        fromUnit: fromUnit.id,
        toUnit: toUnit.id,
        name: `${fromUnit.name} to ${toUnit.name}`,
        description: `Convert ${fromUnit.name} to ${toUnit.name} (${fromUnit.symbol} to ${toUnit.symbol}) instantly using our high-precision online tool.`,
        formula: `Multiply the ${fromUnit.name} value by ${fromUnit.ratio / toUnit.ratio}`,
        faqs: [
          {
            q: `How do I convert ${fromUnit.name} to ${toUnit.name}?`,
            a: `Multiply the number of ${fromUnit.name} by ${fromUnit.ratio / toUnit.ratio}.`,
          },
        ],
      };
    }
  }

  return null;
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug, tool: toolSlug } = await params;
  const category = categories.find((c) => c.id === categorySlug);
  
  if (!category) return { title: "Not Found" };

  const toolData = parseAdHocTool(categorySlug, toolSlug);
  if (!toolData) return { title: "Converter Not Found" };

  const seoTitle = `${toolData.name} Converter | Step-by-Step Formulas | Convertly`;
  const seoDesc = `${toolData.description} Includes live steps, mathematical formulas, and a side-by-side comparison table.`;

  return {
    title: seoTitle,
    description: seoDesc,
    keywords: [
      toolData.name.toLowerCase(),
      `${toolSlug.replace(/-/g, " ")} calculator`,
      `${categorySlug} conversion`,
      "unit converter",
      "convert units online",
    ],
    alternates: {
      canonical: `https://unit-convertor-tools.vercel.app/${categorySlug}/${toolSlug}`,
      languages: {
        "x-default": `https://unit-convertor-tools.vercel.app/${categorySlug}/${toolSlug}`,
        en: `https://unit-convertor-tools.vercel.app/${categorySlug}/${toolSlug}`,
      },
    },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      url: `https://unit-convertor-tools.vercel.app/${categorySlug}/${toolSlug}`,
      siteName: "Convertly",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: `${toolData.name} Calculator - Convertly`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDesc,
      images: ["/og-image.svg"],
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { category: categorySlug, tool: toolSlug } = await params;
  const category = categories.find((c) => c.id === categorySlug);

  if (!category) notFound();

  const toolData = parseAdHocTool(categorySlug, toolSlug);
  if (!toolData) notFound();

  // Dynamic FAQ list schema mapping
  const faqSchema = toolData.faqs && toolData.faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": toolData.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a,
          },
        })),
      }
    : null;

  // Dynamic HowTo / Calculator steps schema mapping
  const howToSchema = toolData.formula
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": `How to Convert using ${toolData.name}`,
        "description": `Step-by-step guide explaining how to convert or calculate values using the ${toolData.name} formula.`,
        "step": [
          {
            "@type": "HowToStep",
            "name": "Identify Input Value",
            "text": "Locate the input measurement value you want to convert.",
            "url": `https://unit-convertor-tools.vercel.app/${categorySlug}/${toolSlug}#step1`,
          },
          {
            "@type": "HowToStep",
            "name": "Apply Mathematical Formula",
            "text": `Apply the conversion formula: ${toolData.formula}`,
            "url": `https://unit-convertor-tools.vercel.app/${categorySlug}/${toolSlug}#step2`,
          },
          {
            "@type": "HowToStep",
            "name": "Calculate & Review Precision",
            "text": "Multiply or resolve the equation to derive the final exact output. Check against standard adjacent unit comparison tables for precision.",
            "url": `https://unit-convertor-tools.vercel.app/${categorySlug}/${toolSlug}#step3`,
          }
        ]
      }
    : null;

  // Complete array of structured JSON-LD schemas
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "@id": `https://unit-convertor-tools.vercel.app/${categorySlug}/${toolSlug}#webapp`,
      "name": `${toolData.name} Calculator - Convertly`,
      "description": toolData.description,
      "applicationCategory": "EducationalApplication",
      "url": `https://unit-convertor-tools.vercel.app/${categorySlug}/${toolSlug}`,
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `https://unit-convertor-tools.vercel.app/${categorySlug}/${toolSlug}#breadcrumb`,
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
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": toolData.name,
          "item": `https://unit-convertor-tools.vercel.app/${categorySlug}/${toolSlug}`
        }
      ]
    },
    ...(faqSchema ? [faqSchema] : []),
    ...(howToSchema ? [howToSchema] : []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative flex-1">
        <div className="hero-glow top-[-200px] left-[50%] translate-x-[-50%] opacity-40"></div>
        
        {/* Dynamic Tool Interface client dashboard */}
        <ToolClient
          categorySlug={categorySlug}
          toolSlug={toolSlug}
          initialFrom={toolData.fromUnit}
          initialTo={toolData.toUnit}
        />
      </div>
    </>
  );
}
