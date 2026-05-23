import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ConverterWidget from "@/components/ConverterWidget";
import {
  getAllConversionSlugs,
  getConversionPairBySlug,
  siteBaseUrl,
} from "@/lib/seo-data";

interface Props {
  params: { from: string; to: string };
}

function slugFromParams(params: Props["params"]) {
  return `${params.from}-to-${params.to}`;
}

export async function generateStaticParams() {
  return getAllConversionSlugs().map((slug) => {
    const [from, to] = slug.split("-to-");
    return { from, to } as Props["params"];
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = slugFromParams(params);
  const pair = getConversionPairBySlug(slug);
  if (!pair) {
    return { title: "Conversion Not Found | Convertly" };
  }

  return {
    title: `${pair.fromLabel} to ${pair.toLabel} Converter | Convertly`,
    description: pair.description,
    keywords: pair.keywords,
    alternates: {
      canonical: `${siteBaseUrl}/convert/${slug}`,
    },
    openGraph: {
      title: `${pair.fromLabel} to ${pair.toLabel} Converter | Convertly`,
      description: pair.description,
      url: `${siteBaseUrl}/convert/${slug}`,
      type: "website",
    },
  };
}

export default function ConversionPage({ params }: Props) {
  const slug = slugFromParams(params);
  const pair = getConversionPairBySlug(slug);
  if (!pair) {
    notFound();
  }

  const faqItems = pair.faq.slice(0, 3);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `${pair.fromLabel} to ${pair.toLabel} Converter | Convertly`,
      description: pair.description,
      url: `${siteBaseUrl}/convert/${pair.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return (
    <div className="space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="rounded-[2rem] border border-zinc-200 bg-white px-6 py-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Conversion tool</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-zinc-950 dark:text-white">
            {pair.fromLabel} to {pair.toLabel} Converter
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-300">{pair.description}</p>
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">Formula: {pair.formula}</p>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Example: {pair.exampleFormula}</p>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-8">
          <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <ConverterWidget
              categorySlug={pair.category}
              initialFrom={pair.fromSlug}
              initialTo={pair.toSlug}
              fromLabel={pair.fromLabel}
              toLabel={pair.toLabel}
              fromSymbol={pair.fromSymbol}
              toSymbol={pair.toSymbol}
              manualConversionType={pair.manualConversionType}
            />
          </div>

          <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">How it works</h2>
            <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">{pair.formula}</p>
            <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">{pair.exampleFormula}</p>
          </div>

          <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">Frequently asked questions</h2>
            <div className="mt-6 space-y-4">
              {faqItems.map((item) => (
                <div key={item.q} className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100">{item.q}</p>
                  <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">Related converters</h2>
            <div className="mt-5 space-y-3">
              {pair.relatedSlugs.map((relatedSlug) => (
                <Link
                  key={relatedSlug}
                  href={`/convert/${relatedSlug}`}
                  className="block rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-emerald-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                >
                  {relatedSlug.replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">Need more conversions?</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              Browse related hubs for faster access to the most common tools across categories.
            </p>
            <Link href="/length-converter" className="mt-5 inline-flex rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700">
              Explore converters
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}
