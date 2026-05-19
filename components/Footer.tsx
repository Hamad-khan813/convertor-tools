import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const categories = [
    { name: "Length Converter", href: "/length" },
    { name: "Weight Converter", href: "/weight" },
    { name: "Temperature Converter", href: "/temperature" },
    { name: "Volume Converter", href: "/volume" },
    { name: "Area Converter", href: "/area" },
  ];

  const tools = [
    { name: "Advanced NPK Fertilizer Mixer", href: "/agriculture/npk-fertilizer-calculator" },
    { name: "BMI Calculator", href: "/health/bmi-calculator" },
    { name: "Loan & Mortgage", href: "/finance/loan-mortgage-calculator" },
    { name: "Compound Interest", href: "/finance/compound-interest" },
    { name: "Roman Numerals", href: "/miscellaneous/roman-numerals" },
  ];

  const company = [
    { name: "About Us", href: "/about" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Contact Support", href: "/contact" },
  ];

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 text-white font-bold text-lg">
                C
              </div>
              <span className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white">
                Convertly
              </span>
            </Link>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xs leading-relaxed">
              Premium, high-performance unit converter and calculator platform. Fast, accurate, and completely free. Built for students, engineers, and scientists.
            </p>
          </div>

          {/* Quick Categories */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-zinc-900 dark:text-zinc-100 uppercase">
              Popular Categories
            </h3>
            <ul className="mt-4 space-y-2">
              {categories.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-600 hover:text-emerald-500 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Advanced Calculators */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-zinc-900 dark:text-zinc-100 uppercase">
              Specialized Tools
            </h3>
            <ul className="mt-4 space-y-2">
              {tools.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-600 hover:text-emerald-500 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Company */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-zinc-900 dark:text-zinc-100 uppercase">
              Legal & Support
            </h3>
            <ul className="mt-4 space-y-2">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-600 hover:text-emerald-500 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            &copy; {currentYear} Convertly Inc. All rights reserved. Made with love for precision.
          </p>
          <div className="flex gap-6 text-xs text-zinc-500 dark:text-zinc-400">
            <span>Core Web Vitals: 100% Optimized</span>
            <span>SSR Powered</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
