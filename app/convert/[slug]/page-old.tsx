import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ConverterWidget from "@/components/ConverterWidget";
import {
  getAllSpecialAgricultureSlugs,
  getSpecialAgriculturePageBySlug,
  siteBaseUrl,
} from "@/lib/seo-data";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllSpecialAgricultureSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getSpecialAgriculturePageBySlug(params.slug);
  if (!page) {
    return { title: "Tool Not Found | Convertly" };
  }

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: `${siteBaseUrl}/convert/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${siteBaseUrl}/convert/${page.slug}`,
      type: "website",
    },
  };
}

export default function SpecialConverterPage({ params }: Props) {
  const page = getSpecialAgriculturePageBySlug(params.slug);
  if (!page) {
    notFound();
  }

  const faqItems = page.faqs.slice(0, 3);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.title,
      description: page.description,
      url: `${siteBaseUrl}/convert/${page.slug}`,
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
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Agriculture tool</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-zinc-950 dark:text-white">{page.pageTitle}</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-300">{page.description}</p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">Why this tool matters</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {page.highlights.map((highlight) => (
            <div key={highlight} className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              {highlight}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">Live tool widget</h2>
        <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">This agriculture tool is primarily informational. Use the related conversion pages below for unit-based calculators.</p>
      </section>

      <section className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">Frequently asked questions</h2>
        <div className="mt-6 space-y-4">
          {faqItems.map((item) => (
            <div key={item.q} className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="font-semibold text-zinc-900 dark:text-zinc-100">{item.q}</p>
              <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">More agriculture conversions</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Link href="/convert/ppm-to-mg-per-liter" className="rounded-3xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-sm font-semibold text-zinc-900 transition hover:border-emerald-500/30 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
            PPM to mg/L
          </Link>
          <Link href="/convert/kg-per-hectare-to-lbs-per-acre" className="rounded-3xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-sm font-semibold text-zinc-900 transition hover:border-emerald-500/30 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
            kg/ha to lbs/ac
          </Link>
          <Link href="/convert/celsius-to-fahrenheit-soil-temp" className="rounded-3xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-sm font-semibold text-zinc-900 transition hover:border-emerald-500/30 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
            Soil temp °C to °F
          </Link>
          <Link href="/agriculture-converter" className="rounded-3xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-sm font-semibold text-zinc-900 transition hover:border-emerald-500/30 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
            Agriculture hub
          </Link>
        </div>
      </section>
    </div>
  );
}
