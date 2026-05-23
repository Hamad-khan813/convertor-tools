import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ConverterWidget from "@/components/ConverterWidget";
import {
  getAllHubSlugs,
  getHubPageBySlug,
  siteBaseUrl,
  HubConversionLink,
} from "@/lib/seo-data";

interface Props {
  params: { hub: string };
}

export async function generateStaticParams() {
  return getAllHubSlugs().map((hub) => ({ hub }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getHubPageBySlug(params.hub);
  if (!page) {
    return {
      title: "Converter Hub Not Found | Convertly",
    };
  }

  return {
    title: page.title,
    description: page.description,
    keywords: [
      `${page.category} converter`,
      `${page.category} conversion`,
      `free ${page.category} converter`,
      ...page.popularConversions.slice(0, 5).map((link) => link.label.toLowerCase()),
    ],
    alternates: {
      canonical: `${siteBaseUrl}/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${siteBaseUrl}/${page.slug}`,
      type: "website",
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: ["/og-image.svg"],
    },
  };
}

function renderConversionGrid(conversions: HubConversionLink[]) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {conversions.map((link) => (
        <Link
          key={link.slug}
          href={`/${link.slug}`}
          className="rounded-3xl border border-zinc-200 bg-white px-5 py-4 text-left shadow-sm transition hover:border-emerald-500/30 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
        >
          <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{link.label}</p>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Open the live converter for this pair.</p>
        </Link>
      ))}
    </div>
  );
}

export default function HubPage({ params }: Props) {
  const page = getHubPageBySlug(params.hub);
  if (!page) {
    notFound();
  }

  const faqItems = [
    {
      question: `How do I use the ${page.pageTitle.toLowerCase()}?`,
      answer: `Enter your source value, choose the units, and the live widget computes the answer instantly. Use related conversion links for fast reuse.`,
    },
    {
      question: `Is this ${page.category} converter free to use?`,
      answer: `Yes. Convertly provides all hub converters without ads, signups, or tracking.`,
    },
    {
      question: `How accurate are the results?`,
      answer: `Calculations are based on standard scientific ratios and are produced instantly for reliable use in engineering, agriculture, and everyday tasks.`,
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": `${page.pageTitle} | Convertly`,
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "featureList": `Instant ${page.category} conversion, live widget, NIST-calibrated ratios, no tracking`,
      "url": `${siteBaseUrl}/${page.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];

  return (
    <div className="space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="rounded-[2rem] border border-zinc-200 bg-white px-6 py-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">{page.category} Hub</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-zinc-950 dark:text-white">{page.pageTitle}</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-300">{page.description}</p>
          {page.callout ? <p className="mt-4 text-zinc-700 dark:text-zinc-400">{page.callout}</p> : null}
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-8">
          <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">Live conversion widget</h2>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Use the embedded converter to test values quickly in this category.</p>
              </div>
            </div>
            <div className="mt-6">
              <ConverterWidget categorySlug={page.category} />
            </div>
          </div>

          <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">Popular conversions</h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Jump directly to the most requested conversions in this category.</p>
            <div className="mt-6">{renderConversionGrid(page.popularConversions)}</div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">Most Popular Today</h2>
            <div className="mt-5 space-y-3">
              {page.mostPopular.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  className="block rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-emerald-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">Why this hub?</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              Each conversion hub is designed to surface category-specific tools, formulas, and examples so your query is answered in one page. Convertly keeps calculations fast, precise, and search-friendly.
            </p>
            {page.extraParagraph ? <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{page.extraParagraph}</p> : null}
          </div>
        </aside>
      </section>

      <section className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">Frequently asked questions</h2>
        <div className="mt-6 space-y-4">
          {faqItems.map((item) => (
            <div key={item.question} className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="font-semibold text-zinc-900 dark:text-zinc-100">{item.question}</p>
              <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
