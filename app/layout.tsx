import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Unit Convertor Tools | Free Online Unit Converters & Calculators",
  description:
    "Fast, accurate unit conversion and precision calculator tools for finance, agriculture, NPK planning, amortization, and daily engineering conversions.",
  keywords: [
    "unit converter",
    "npk calculator",
    "loan calculator",
    "amortization calculator",
    "online converter",
    "fertilizer calculator",
    "unit conversion tool",
  ],
  authors: [{ name: "Unit Convertor Tools" }],
  metadataBase: new URL("https://unit-convertor-tools.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "x-default": "/",
      en: "/",
    },
  },
  openGraph: {
    title: "Unit Convertor Tools | Free Online Unit Converters & Calculators",
    description:
      "Fast, accurate unit conversion and precision calculator tools for finance, agriculture, NPK planning, amortization, and daily engineering conversions.",
    type: "website",
    locale: "en_US",
    siteName: "Unit Convertor Tools",
    url: "https://unit-convertor-tools.vercel.app",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Convertly | High-Precision Free Online Unit Converters & Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convertly | Free Online Converter & Calculator Hub",
    description:
      "Fast, accurate unit conversion and precision calculator tools for finance, agriculture, NPK planning, amortization, and daily engineering conversions.",
    images: ["/og-image.svg"],
  },
  icons: [
    { rel: "icon", url: "/favicon.svg", type: "image/svg+xml" },
    { rel: "apple-touch-icon", url: "/icon-512.svg", sizes: "512x512" },
  ],
  manifest: "/manifest.json",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Unit Convertor Tools",
        "url": "https://unit-convertor-tools.vercel.app",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript and HTML5.",
      },
      {
        "@type": "SoftwareApplication",
        "name": "Unit Convertor Tools",
        "url": "https://unit-convertor-tools.vercel.app",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "WebBrowser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://unit-convertor-tools.vercel.app",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Categories",
            "item": "https://unit-convertor-tools.vercel.app/categories",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Blog",
            "item": "https://unit-convertor-tools.vercel.app/blog",
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className="font-sans h-full antialiased dark" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-512.svg" />
        <link rel="icon" href="/favicon.svg" />
        <meta name="google-site-verification" content="nA6CNbhkt6FhyCDoQrXABe_G2lH00HfK4cikrh0TrWo" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-full flex flex-col bg-[color:var(--background)] text-[color:var(--foreground)] transition-colors duration-300">
        <Header />
        <main className="flex-1 flex flex-col w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

