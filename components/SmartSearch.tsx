"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { categories, Category, PopularTool } from "@/lib/tools-data";
import { convertStandard, convertTemperature } from "@/lib/conversion";

interface SearchResult {
  type: "tool" | "category" | "instant";
  title: string;
  subtitle: string;
  href: string;
  categoryName?: string;
  instantResult?: {
    value: number;
    fromSymbol: string;
    toSymbol: string;
    result: number;
    categorySlug: string;
  };
}

export default function SmartSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Map user synonyms to unit IDs
  const unitSynonyms: { [key: string]: { id: string; category: string } } = {
    // Length
    mm: { id: "mm", category: "length" },
    millimeter: { id: "mm", category: "length" },
    millimeters: { id: "mm", category: "length" },
    cm: { id: "cm", category: "length" },
    centimeter: { id: "cm", category: "length" },
    centimeters: { id: "cm", category: "length" },
    m: { id: "m", category: "length" },
    meter: { id: "m", category: "length" },
    meters: { id: "m", category: "length" },
    km: { id: "km", category: "length" },
    kilometer: { id: "km", category: "length" },
    kilometers: { id: "km", category: "length" },
    in: { id: "in", category: "length" },
    inch: { id: "in", category: "length" },
    inches: { id: "in", category: "length" },
    ft: { id: "ft", category: "length" },
    foot: { id: "ft", category: "length" },
    feet: { id: "ft", category: "length" },
    yd: { id: "yd", category: "length" },
    yard: { id: "yd", category: "length" },
    yards: { id: "yd", category: "length" },
    mi: { id: "mi", category: "length" },
    mile: { id: "mi", category: "length" },
    miles: { id: "mi", category: "length" },
    nmi: { id: "nmi", category: "length" },
    nautical: { id: "nmi", category: "length" },
    ly: { id: "ly", category: "length" },
    lightyear: { id: "ly", category: "length" },
    lightyears: { id: "ly", category: "length" },
    ac: { id: "ac", category: "area" },
    acre: { id: "ac", category: "area" },
    acres: { id: "ac", category: "area" },
    ha: { id: "ha", category: "area" },
    hectare: { id: "ha", category: "area" },
    hectares: { id: "ha", category: "area" },

    // Mass
    g: { id: "g", category: "weight" },
    gram: { id: "g", category: "weight" },
    grams: { id: "g", category: "weight" },
    kg: { id: "kg", category: "weight" },
    kilogram: { id: "kg", category: "weight" },
    kilograms: { id: "kg", category: "weight" },
    lb: { id: "lb", category: "weight" },
    lbs: { id: "lb", category: "weight" },
    pound: { id: "lb", category: "weight" },
    pounds: { id: "lb", category: "weight" },
    oz: { id: "oz", category: "weight" },
    ounce: { id: "oz", category: "weight" },
    ounces: { id: "oz", category: "weight" },

    // Temperature
    c: { id: "C", category: "temperature" },
    celsius: { id: "C", category: "temperature" },
    f: { id: "F", category: "temperature" },
    fahrenheit: { id: "F", category: "temperature" },
    k: { id: "K", category: "temperature" },
    kelvin: { id: "K", category: "temperature" },

    // Volume
    ml: { id: "ml", category: "volume" },
    milliliter: { id: "ml", category: "volume" },
    milliliters: { id: "ml", category: "volume" },
    l: { id: "l", category: "volume" },
    liter: { id: "l", category: "volume" },
    liters: { id: "l", category: "volume" },
    gal: { id: "gal", category: "volume" },
    gallon: { id: "gal", category: "volume" },
    gallons: { id: "gal", category: "volume" },
    cup: { id: "cup", category: "volume" },
    cups: { id: "cup", category: "volume" },
  };

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const cleanQuery = query.toLowerCase().trim();
    const tempResults: SearchResult[] = [];

    // 1. Natural Language Parse (e.g. "convert 75 kg to pounds" or "37 c to f" or "how many acres is 5 hectares")
    // Regex matches optional prefix, a number, a space, a word (from unit), connecting words (to/in/is/=), a word (to unit)
    const nlRegex = /(?:convert\s+)?(\d+(?:\.\d+)?)\s*([a-zA-Z°]+)\s+(?:to|in|equals|=|\sis\s)\s*([a-zA-Z°]+)/i;
    const match = cleanQuery.match(nlRegex);

    if (match) {
      const val = parseFloat(match[1]);
      const fromRaw = match[2];
      const toRaw = match[3];

      const fromUnitData = unitSynonyms[fromRaw];
      const toUnitData = unitSynonyms[toRaw];

      if (fromUnitData && toUnitData && fromUnitData.category === toUnitData.category) {
        const catSlug = fromUnitData.category;
        let convertedVal = 0;

        if (catSlug === "temperature") {
          convertedVal = convertTemperature(val, fromUnitData.id, toUnitData.id);
        } else {
          convertedVal = convertStandard(val, fromUnitData.id, toUnitData.id, catSlug);
        }

        const category = categories.find((c) => c.id === catSlug);
        const fromUnit = category?.units.find((u) => u.id === fromUnitData.id);
        const toUnit = category?.units.find((u) => u.id === toUnitData.id);

        tempResults.push({
          type: "instant",
          title: `${val} ${fromUnit?.name || fromRaw} = ${convertedVal.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${toUnit?.name || toRaw}`,
          subtitle: `Instant conversion for ${category?.name}`,
          href: `/${catSlug}/${fromUnitData.id}-to-${toUnitData.id}`,
          categoryName: category?.name,
          instantResult: {
            value: val,
            fromSymbol: fromUnit?.symbol || "",
            toSymbol: toUnit?.symbol || "",
            result: convertedVal,
            categorySlug: catSlug,
          },
        });
      }
    }

    // 2. Keyword Search across categories
    categories.forEach((cat) => {
      if (cat.name.toLowerCase().includes(cleanQuery) || cat.description.toLowerCase().includes(cleanQuery)) {
        tempResults.push({
          type: "category",
          title: cat.name,
          subtitle: cat.description,
          href: `/${cat.id}`,
        });
      }

      // Popular tools search
      cat.popularTools.forEach((tool) => {
        if (
          tool.name.toLowerCase().includes(cleanQuery) ||
          tool.description.toLowerCase().includes(cleanQuery) ||
          tool.id.replace(/-/g, " ").includes(cleanQuery)
        ) {
          tempResults.push({
            type: "tool",
            title: tool.name,
            subtitle: tool.description,
            href: `/${cat.id}/${tool.id}`,
            categoryName: cat.name,
          });
        }
      });
    });

    // Special tools keyword search
    const specialKeywords = [
      { name: "Advanced NPK Fertilizer Mixer", href: "/agriculture/npk-fertilizer-calculator", kw: ["npk", "fertilizer", "soil", "agriculture", "nitrogen", "potash", "phosphate", "farming"] },
      { name: "BMI Calculator", href: "/health/bmi-calculator", kw: ["bmi", "body mass", "obese", "overweight", "health", "height", "weight"] },
      { name: "Loan & Mortgage Calculator", href: "/finance/loan-mortgage-calculator", kw: ["loan", "mortgage", "interest", "finance", "payment"] },
      { name: "Compound Interest Calculator", href: "/finance/compound-interest", kw: ["compound", "interest", "yield", "savings", "finance"] },
      { name: "Roman Numerals Converter", href: "/miscellaneous/roman-numerals", kw: ["roman", "numerals", "letters", "math", "numbers"] },
    ];

    specialKeywords.forEach((tool) => {
      if (tool.name.toLowerCase().includes(cleanQuery) || tool.kw.some((k) => cleanQuery.includes(k))) {
        tempResults.push({
          type: "tool",
          title: tool.name,
          subtitle: "Dedicated high-performance calculator",
          href: tool.href,
          categoryName: "Special Calculator",
        });
      }
    });

    setResults(tempResults.slice(0, 6)); // limit to top 6 hits
  }, [query]);

  const [copied, setCopied] = useState(false);
  const copyToClipboard = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto z-40">
      {/* Search Input Container */}
      <div className="relative">
        <div className="relative flex items-center bg-[hsl(var(--card))] border border-[hsla(var(--border),0.75)] rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.05)] focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all duration-300">
          <span className="pl-4 text-zinc-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
            </svg>
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Try: 'convert 75 kg to pounds' or '37 c to f' or 'npk calculator'..."
            className="w-full h-14 pl-3 pr-4 rounded-2xl bg-transparent text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="pr-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Results Dropdown */}
      {isFocused && query && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-[hsl(var(--card))] border border-[hsla(var(--border),0.75)] rounded-2xl shadow-xl overflow-hidden backdrop-blur-md transition-colors duration-300">
          {results.length > 0 ? (
            <div className="p-2">
              {results.map((res, index) => {
                if (res.type === "instant" && res.instantResult) {
                  const valString = res.title.split("=")[1].trim();
                  return (
                    <div
                      key={index}
                      onClick={() => router.push(res.href)}
                      className="p-4 mb-2 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 dark:from-emerald-950/10 dark:to-teal-950/10 border border-emerald-500/20 dark:border-emerald-500/10 rounded-xl flex items-center justify-between cursor-pointer group transition-all"
                    >
                      <div className="flex-1">
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                          Instant Answer
                        </span>
                        <div className="text-lg font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {res.title}
                        </div>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          {res.subtitle} • Click to open interactive solver
                        </span>
                      </div>
                      <button
                        onClick={(e) => copyToClipboard(valString, e)}
                        className="ml-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-300 text-xs font-semibold shadow-sm transition-all"
                      >
                        {copied ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-emerald-500">
                              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                            </svg>
                            Copied!
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.375c0-.621.504-1.125 1.125-1.125h9.75c.621 0 1.125.504 1.125 1.125v8.625c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.375Z" />
                            </svg>
                            Copy Value
                          </>
                        )}
                      </button>
                    </div>
                  );
                }

                return (
                  <div
                    key={index}
                    onClick={() => router.push(res.href)}
                    className="p-3 mb-1 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-xl cursor-pointer flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                        {res.title}
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                        {res.subtitle}
                      </div>
                    </div>
                    {res.categoryName && (
                      <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                        {res.categoryName}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
              No matching conversions found. Try refining your keywords.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
