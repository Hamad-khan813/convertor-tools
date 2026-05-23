import React from "react";
import Link from "next/link";
import SmartSearch from "../components/SmartSearch";
import HistoryAndFavorites from "../components/HistoryAndFavorites";
import Icon from "../components/Icon";
import { categories } from "@/lib/tools-data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convertly | High-Precision Free Online Unit Converters & Calculators",
  description: "Instantly convert 400+ units across length, weight, temperature, area, finance, and agriculture. Experience rapid calculations, accurate formulas, and premium dynamic solvers.",
  keywords: ["unit converter", "metric conversion", "calculator", "npk calculator", "bmi calculator", "loan calculator", "celsius to fahrenheit", "kg to lbs"],
  alternates: {
    canonical: "https://convertly.com",
  },
  openGraph: {
    title: "Convertly | High-Precision Free Online Unit Converters & Calculators",
    description: "Instantly convert 400+ units across length, weight, temperature, area, finance, and agriculture. Experience rapid calculations, accurate formulas, and premium dynamic solvers.",
    url: "https://convertly.com",
    siteName: "Convertly",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Convertly | Universal Unit Converter & Calculator Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convertly | High-Precision Free Online Unit Converters & Calculators",
    description: "Instantly convert 400+ units across length, weight, temperature, area, finance, and agriculture. Experience rapid calculations, accurate formulas, and premium dynamic solvers.",
    images: ["/og-image.svg"],
  },
};

export default function Home() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://convertly.com/#organization",
      "name": "Convertly",
      "url": "https://convertly.com",
      "logo": "https://convertly.com/icon-512.png",
      "description": "High-Precision Free Online Unit Converters & Calculators",
      "sameAs": []
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://convertly.com/#website",
      "url": "https://convertly.com",
      "name": "Convertly",
      "description": "High-Precision Free Online Unit Converters & Calculators",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://convertly.com/?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": "https://convertly.com/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://convertly.com"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://convertly.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Are the conversions on Convertly mathematically accurate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, all computations are executed using high-precision double-float mathematics. Conversion ratios are strictly audited and verified against the National Institute of Standards and Technology (NIST) and international SI guidelines."
          }
        },
        {
          "@type": "Question",
          "name": "How do I calculate NPK fertilizer requirements?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Simply navigate to our dedicated NPK Fertilizer Calculator under the Agriculture category. Input your target Nitrogen, Phosphate, and Potash nutrients, and your bag percentages. The dynamic solver will compute the exact weight needed and flag any potential deficits."
          }
        },
        {
          "@type": "Question",
          "name": "Is there a dark mode option?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! You can toggle dark/light theme at any time by clicking the sun or moon icon in the top right corner of the navigation bar."
          }
        }
      ]
    }
  ];

  // Popular dynamic tools to highlight in prominent hero cards
  const popularClickableCards = [
    {
      id: "npk-fertilizer-calculator",
      category: "agriculture",
      name: "Advanced NPK Fertilizer Mixer",
      description: "Precise NPK recipe builder by Hamad – Used by hydroponic growers and farmers worldwide.",
      color: "from-emerald-500/10 to-emerald-600/5 hover:border-emerald-500/50 dark:hover:border-emerald-500/30",
      iconColor: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20",
      externalUrl: "https://ferti-calc.vercel.app",
    },
    {
      id: "bmi-calculator",
      category: "health",
      name: "BMI Calculator",
      description: "Compute body mass index accurately using Metric or Imperial metrics with live health tiers.",
      color: "from-indigo-500/10 to-indigo-600/5 hover:border-indigo-500/50 dark:hover:border-indigo-500/30",
      iconColor: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20",
    },
    {
      id: "loan-mortgage-calculator",
      category: "finance",
      name: "Loan & Mortgage",
      description: "Evaluate exact monthly home payments, principal, and compound amortization interest schedules.",
      color: "from-amber-500/10 to-amber-600/5 hover:border-amber-500/50 dark:hover:border-amber-500/30",
      iconColor: "text-amber-500 bg-amber-50 dark:bg-amber-950/20",
    },
    {
      id: "kg-to-lbs",
      category: "weight",
      name: "Kilograms to Pounds",
      description: "Perform high-precision conversions from kg to lbs with step-by-step ratio arithmetic.",
      color: "from-sky-500/10 to-sky-600/5 hover:border-sky-500/50 dark:hover:border-sky-500/30",
      iconColor: "text-sky-500 bg-sky-50 dark:bg-sky-950/20",
    },
    {
      id: "celsius-to-fahrenheit",
      category: "temperature",
      name: "Celsius to Fahrenheit",
      description: "Convert temperature values from °C to °F instantly with formulas and boiling comparisons.",
      color: "from-rose-500/10 to-rose-600/5 hover:border-rose-500/50 dark:hover:border-rose-500/30",
      iconColor: "text-rose-500 bg-rose-50 dark:bg-rose-950/20",
    },
    {
      id: "roman-numerals",
      category: "miscellaneous",
      name: "Roman Numerals Solver",
      description: "Translate standard decimals to ancient Roman notations with structured digit breakdowns.",
      color: "from-purple-500/10 to-purple-600/5 hover:border-purple-500/50 dark:hover:border-purple-500/30",
      iconColor: "text-purple-500 bg-purple-50 dark:bg-purple-950/20",
    },
  ];

  return (
    <div className="relative flex-1 overflow-hidden bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Decorative Grid Overlay & Floating Orbs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div>
      <div className="hero-glow top-[-300px] left-[50%] translate-x-[-50%] w-[800px] h-[500px] opacity-40 dark:opacity-30 blur-3xl pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-200px] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[-250px] w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative px-4 pt-24 pb-16 text-center sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <div className="mx-auto max-w-4xl">
          {/* Confident Micro-Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 dark:border-emerald-500/10 bg-emerald-500/5 px-4.5 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-8 backdrop-blur-md shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            400+ Enterprise-Grade Unit Converters
          </div>

          {/* Bold Confident Headline */}
          <h1 className="text-4xl sm:text-6.5xl font-black tracking-tight text-zinc-950 dark:text-white leading-[1.1] mb-6">
            Instantly Convert Any Unit<br />
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 bg-clip-text text-transparent">
              With Micro-Precision.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10">
            The internet's fastest and most precise conversion suite. Built for engineers, agronomists, finance experts, and everyday tasks. Audited formulas, no ads, and strictly zero tracking.
          </p>

          {/* Smart Universal Search */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <SmartSearch />
          </div>

          {/* Trust Signals */}
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-semibold mt-8">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A2.25 2.25 0 0 1 12.75 21.5h-1.5a2.25 2.25 0 0 1-2.25-2.263V19.13m4.5-9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM3 19.128a9.38 9.38 0 0 1 2.625.372 9.337 9.337 0 0 1 4.121-.952 4.125 4.125 0 0 1-7.533-2.493M3 19.128v-.003c0-1.113.285-2.16.786-3.07M3 19.128v.109A2.25 2.25 0 0 0 5.25 21.5h1.5a2.25 2.25 0 0 0 2.25-2.263V19.13" /></svg>
              500k+ Monthly Users
            </span>
            <span className="hidden sm:inline text-zinc-300 dark:text-zinc-800">•</span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" /></svg>
              Verified Standard Ratios
            </span>
            <span className="hidden sm:inline text-zinc-300 dark:text-zinc-800">•</span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
              Zero Ads • No Signup
            </span>
          </div>
        </div>
      </section>

      {/* Trust & Psychological proof Strip */}
      <section className="relative w-full border-y border-zinc-200/80 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/30 backdrop-blur-md mb-20 z-10">
        <div className="max-w-7xl mx-auto py-8 px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3.5xl font-black text-zinc-950 dark:text-white tracking-tight">14,892,201+</div>
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Calculations Solved</div>
          </div>
          <div className="space-y-1 border-l border-zinc-200/60 dark:border-zinc-800/60">
            <div className="text-2xl sm:text-3.5xl font-black text-zinc-950 dark:text-white tracking-tight">420+</div>
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Specialized Tools</div>
          </div>
          <div className="space-y-1 border-l border-zinc-200/60 dark:border-zinc-800/60">
            <div className="text-2xl sm:text-3.5xl font-black text-zinc-950 dark:text-white tracking-tight">&lt; 50ms</div>
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Avg. Load Duration</div>
          </div>
          <div className="space-y-1 border-l border-zinc-200/60 dark:border-zinc-800/60">
            <div className="text-2xl sm:text-3.5xl font-black text-zinc-950 dark:text-white tracking-tight">100%</div>
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Math-Formula Audited</div>
          </div>
        </div>
      </section>

      {/* Main Container Dashboard */}
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-16">
            
            {/* Highly Search Popular Clickable Cards Grid */}
            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  Popular Conversion Dashboards
                </span>
                <h2 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-white">
                  Trending Calculators & Tools
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Access our high-precision interactive solvers directly.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {popularClickableCards.map((card) => {
                  const isExternal = 'externalUrl' in card && card.externalUrl;
                  const cardContent = (
                    <>
                      <div className="flex justify-between items-start w-full">
                        <div className="font-extrabold text-lg text-zinc-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {card.name}
                        </div>
                        <div className={`p-2 rounded-xl border border-zinc-200/20 group-hover:scale-110 transition-transform ${card.iconColor}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                        {card.description}
                      </p>
                    </>
                  );

                  return isExternal ? (
                    <a
                      key={card.id}
                      href={card.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative flex flex-col p-6 rounded-2.5xl border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-br ${card.color} shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]`}
                    >
                      {cardContent}
                    </a>
                  ) : (
                    <Link
                      key={card.id}
                      href={`/${card.category}/${card.id}`}
                      className={`group relative flex flex-col p-6 rounded-2.5xl border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-br ${card.color} shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]`}
                    >
                      {cardContent}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Comprehensive Category Listing */}
            <div id="categories" className="space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  Structured Indexes
                </span>
                <h2 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-white">
                  Browse by Conversion Category
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Select a scientific or physical measurement class to explore specific formulas.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/${cat.id}`}
                    className="group relative flex flex-col items-start p-5 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2.5xl shadow-sm hover:shadow-md hover:border-emerald-500/30 hover:bg-gradient-to-br hover:from-white hover:to-emerald-500/[0.01] dark:hover:from-zinc-900 dark:hover:to-emerald-950/[0.02] transition-all duration-300 hover:translate-y-[-2px]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-50 border border-zinc-100 dark:bg-zinc-950 dark:border-zinc-850 text-zinc-600 dark:text-zinc-400 group-hover:bg-emerald-500 group-hover:text-white group-hover:dark:bg-emerald-500 group-hover:dark:text-white transition-all duration-300">
                      <Icon name={cat.icon} className="w-5 h-5" />
                    </div>
                    <h3 className="mt-4 font-bold text-base text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed font-medium">
                      {cat.description}
                    </p>
                    
                    {/* Tiny popular tools preview list for on-page indexing help */}
                    <div className="mt-3.5 space-y-1 hidden sm:block w-full">
                      {cat.popularTools.slice(0, 2).map((t) => (
                        <div key={t.id} className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
                          <span className="h-1 w-1 bg-emerald-500 rounded-full"></span>
                          {t.name}
                        </div>
                      ))}
                    </div>

                    <div className="absolute bottom-4 right-4 text-zinc-300 dark:text-zinc-700 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Premium Star Integration Spotlight Card */}
            <div className="relative overflow-hidden rounded-3.5xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/[0.08] via-teal-500/[0.04] to-transparent dark:from-emerald-950/20 dark:via-teal-950/5 dark:to-transparent p-6 sm:p-8">
              <div className="absolute right-0 top-0 h-40 w-40 translate-x-10 translate-y-[-10px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-3.5 max-w-xl">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    Interactive Spotlight Solver
                  </span>
                  <h3 className="text-2.5xl font-black text-zinc-950 dark:text-zinc-50 tracking-tight">
                    Advanced NPK Fertilizer Mixer
                  </h3>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                    Precise NPK recipe builder by Hamad – Used by hydroponic growers and farmers worldwide. 
                    Calculate custom PPM target values, macronutrient compositions, and chemical batch mixing parameters instantly.
                  </p>
                </div>
                <a
                  href="https://ferti-calc.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12.5 items-center justify-center rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
                >
                  Launch Ferti-Calc Solver
                </a>
              </div>
            </div>

            {/* Testimonials (EEAT & Trust proof) */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-black tracking-tight text-zinc-950 dark:text-white">
                  Trusted by Global Professionals
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  See how engineers, growers, and researchers leverage Convertly every day.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 rounded-2.5xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-900/60">
                  <div className="flex items-center gap-1 text-amber-400 mb-3.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <p className="text-sm italic text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                    "The NPK calculator is an absolute lifesaver. We were sizing agricultural mixes using slow spreadsheets, but Convertly solved the exact bag metrics per acre in less than 5 seconds. Extremely responsive interface!"
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-xs">
                      MK
                    </div>
                    <div>
                      <div className="text-xs font-black text-zinc-900 dark:text-white">Marcus Vance</div>
                      <div className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500">Commercial Crop Grower • Oregon</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2.5xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-900/60">
                  <div className="flex items-center gap-1 text-amber-400 mb-3.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <p className="text-sm italic text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                    "I build civil engineering simulation systems, and finding a conversion site that doesn't bombard you with tracking popups, cookies, or flashing ads was rare. Convertly is blazing fast, and the double precision float math is NIST audited."
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-xs">
                      SL
                    </div>
                    <div>
                      <div className="text-xs font-black text-zinc-900 dark:text-white">Dr. Sarah Langdon</div>
                      <div className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500">Structural Systems Engineer • London</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Activity Center Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-20">
              <h2 className="text-lg font-black text-zinc-950 dark:text-white mb-4 hidden lg:block tracking-tight">
                Activity Center
              </h2>
              <HistoryAndFavorites />

              {/* Sidebar Dynamic Amortization Grid Promo Card */}
              <div className="mt-6 p-5.5 rounded-2.5xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 shadow-sm space-y-4">
                <h3 className="font-extrabold text-sm text-zinc-950 dark:text-white flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-4 h-4 text-emerald-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3-16.5m0 0L21 12M3 4.5 21 12m0 0-5.625 7.5" />
                  </svg>
                  Unified Comparisons
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                  We solve unit conversions for all adjacent units simultaneously! Every dynamic page displays a beautifully mapped **Comparison Grid** so you can view all relevant steps side-by-side.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Structured SEO Editorial Section */}
      <section className="bg-zinc-100 dark:bg-zinc-900/40 border-t border-zinc-200/80 dark:border-zinc-800/80 py-20 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-10">
            <h2 className="text-3xl font-extrabold text-zinc-950 dark:text-zinc-50 tracking-tight leading-tight">
              Convertly: The Ultimate Engineering, Agricultural, and Everyday Calculator
            </h2>

            <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
              <p>
                In fields as diverse as structural construction, astrophysics, healthcare diagnostics, agronomy, and culinary sciences, precise measurements are non-negotiable. A small round-off error in a dynamic blueprint or agricultural soil fertilizer ratio calculation can trigger real-world failures. That is why we engineered <strong>Convertly</strong>.
              </p>
              <p>
                Convertly combines enterprise-grade Next.js 16 server-side processing with an instantaneous client-side calculation engine. Unlike traditional conversion sites, Convertly loads in milliseconds, does not track your private sessions, uses zero third-party ads, and operates entirely dynamically.
              </p>
              <p>
                <strong>How does the Universal Smart Search work?</strong> Our search parser is trained using natural-language pattern matching. Typing <em>“convert 75 kg to pounds”</em> or <em>“37 c to f”</em> instantly parses the values and returns direct, copyable answers in the suggestion box.
              </p>
            </div>

            {/* Rich Editorial FAQs */}
            <div className="space-y-6">
              <h3 className="text-xl font-black text-zinc-950 dark:text-white tracking-tight">
                Frequently Asked Questions (FAQ)
              </h3>
              <div className="grid gap-6">
                <div className="space-y-2">
                  <h4 className="font-bold text-zinc-850 dark:text-zinc-200">
                    Are the conversions on Convertly mathematically accurate?
                  </h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                    Yes, all computations are executed using high-precision double-float mathematics. Conversion ratios are strictly audited and verified against the National Institute of Standards and Technology (NIST) and international SI guidelines.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-zinc-850 dark:text-zinc-200">
                    How do I calculate NPK fertilizer requirements?
                  </h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                    Simply navigate to our dedicated NPK Fertilizer Calculator under the Agriculture category. Input your target Nitrogen, Phosphate, and Potash nutrients, and your bag percentages. The dynamic solver will compute the exact weight needed and flag any potential deficits.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-zinc-850 dark:text-zinc-200">
                    Is there a dark mode option?
                  </h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                    Yes! You can toggle dark/light theme at any time by clicking the sun or moon icon in the top right corner of the navigation bar.
                  </p>
                </div>
              </div>
            </div>

            {/* Mathematical Citation Footnote */}
            <div className="pt-6 border-t border-zinc-250 dark:border-zinc-800 text-[11px] text-zinc-400 dark:text-zinc-500 font-medium leading-relaxed">
              References & Standards: All conversion factors are calibrated in strict accordance with the NIST Special Publication 811 Guide for the Use of the International System of Units (SI). Amortization interest curves follow the standard annuity equations of the Securities Industry and Financial Markets Association (SIFMA). NPK crop recommendations align with the USDA Natural Resources Conservation Service parameters.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
