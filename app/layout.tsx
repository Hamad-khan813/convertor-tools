import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Convertly | Premium Unit Converter & Advanced Calculators",
  description:
    "Convert between length, weight, area, volume, temperature, and use advanced business, medical, and agricultural calculators like the NPK Fertilizer Calculator.",
  keywords: [
    "unit converter",
    "kg to lbs",
    "celsius to fahrenheit",
    "acres to hectares",
    "npk calculator",
    "mortgage calculator",
    "compound interest",
  ],
  authors: [{ name: "Convertly Team" }],
  metadataBase: new URL("https://convertly.com"),
  alternates: {
    canonical: "/",
    languages: {
      "x-default": "/",
      en: "/",
    },
  },
  openGraph: {
    title: "Convertly | Universal Unit Converter & Calculator Hub",
    description: "Premium, high-performance, real-time calculations for speed and accuracy.",
    type: "website",
    locale: "en_US",
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
    title: "Convertly | Universal Unit Converter",
    description: "Fast, accurate, and completely free unit conversions.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-sans h-full antialiased" suppressHydrationWarning>
      <head>
        {/* Anti-FOUC Theme Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && supportDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-300">
        <Header />
        <main className="flex-1 flex flex-col w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
