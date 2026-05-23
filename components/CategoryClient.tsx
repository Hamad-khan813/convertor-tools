"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { categories, Unit } from "@/lib/tools-data";
import { convertStandard, convertTemperature } from "@/lib/conversion";
import { saveToHistory, toggleFavorite, isFavorite } from "./HistoryAndFavorites";
import Icon from "./Icon";

interface Props {
  categorySlug: string;
}

export default function CategoryClient({ categorySlug }: Props) {
  const category = categories.find((c) => c.id === categorySlug);

  if (!category) return null;

  // Defaults
  const defaultFrom = category.units[0]?.id || "";
  const defaultTo = category.units[1]?.id || category.units[0]?.id || "";

  const [value, setValue] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState<string>(defaultFrom);
  const [toUnit, setToUnit] = useState<string>(defaultTo);
  const [result, setResult] = useState<number>(0);
  const [isFav, setIsFav] = useState<boolean>(false);
  const [compValue, setCompValue] = useState<string>("1");

  // Load favorite state
  useEffect(() => {
    setIsFav(isFavorite(categorySlug));
  }, [categorySlug]);

  // Main Conversion Calculation
  const calculateResult = () => {
    const val = parseFloat(value);
    if (isNaN(val)) {
      setResult(0);
      return;
    }

    let res = 0;
    if (categorySlug === "temperature") {
      res = convertTemperature(val, fromUnit, toUnit);
    } else {
      res = convertStandard(val, fromUnit, toUnit, categorySlug);
    }
    setResult(res);
  };

  useEffect(() => {
    calculateResult();
  }, [value, fromUnit, toUnit]);

  // Handle auto-saving to history with a short debounce to avoid keypress spam
  useEffect(() => {
    const val = parseFloat(value);
    if (isNaN(val) || val === 0) return;

    const timer = setTimeout(() => {
      const fromObj = category.units.find((u) => u.id === fromUnit);
      const toObj = category.units.find((u) => u.id === toUnit);
      if (fromObj && toObj) {
        saveToHistory({
          categorySlug,
          categoryName: category.name,
          toolId: `${categorySlug}-converter`,
          value: val,
          fromUnit: fromObj.symbol,
          toUnit: toObj.symbol,
          result: Number(result.toFixed(4)),
        });
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [value, fromUnit, toUnit, result]);

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const handleToggleFav = () => {
    const added = toggleFavorite({
      categorySlug,
      toolId: categorySlug,
      toolName: `${category.name} Converter`,
    });
    setIsFav(added);
  };

  const selectedFromUnit = category.units.find((u) => u.id === fromUnit);
  const selectedToUnit = category.units.find((u) => u.id === toUnit);

  // Generate formula explanation
  const getFormulaText = () => {
    if (categorySlug === "temperature") {
      if (fromUnit === "C" && toUnit === "F") return "Multiply Celsius by 1.8 and add 32.";
      if (fromUnit === "F" && toUnit === "C") return "Subtract 32 from Fahrenheit, then multiply by 5/9.";
      if (fromUnit === "C" && toUnit === "K") return "Add 273.15 to Celsius.";
      if (fromUnit === "K" && toUnit === "C") return "Subtract 273.15 from Kelvin.";
      return "Custom thermodynamic temperature conversion scale.";
    }
    if (selectedFromUnit && selectedToUnit) {
      const ratio = selectedFromUnit.ratio / selectedToUnit.ratio;
      return `Multiply the ${selectedFromUnit.name} value by ${ratio.toLocaleString(undefined, { maximumFractionDigits: 6 })} to get ${selectedToUnit.name}.`;
    }
    return "";
  };

  // Dynamic Comparison table calculations
  const getComparisonData = () => {
    const baseVal = parseFloat(compValue) || 1;
    return category.units.map((u) => {
      let res = 0;
      if (categorySlug === "temperature") {
        res = convertTemperature(baseVal, fromUnit, u.id);
      } else {
        res = convertStandard(baseVal, fromUnit, u.id, categorySlug);
      }
      return {
        unit: u,
        value: res,
      };
    });
  };

  const compData = getComparisonData();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-8 mb-10 transition-colors">
        <div className="space-y-2">
          <Link href="/" className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
            </svg>
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              {category.name} Converter
            </h1>
            <button
              onClick={handleToggleFav}
              className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer bg-white dark:bg-zinc-900"
              aria-label="Toggle favorite"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill={isFav ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${isFav ? "text-emerald-500 fill-emerald-500" : ""}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </button>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-3xl leading-relaxed">
            {category.description} Set your input amount and select units to convert dynamically.
          </p>
        </div>
      </div>

      <section aria-labelledby="category-usage-heading" className="grid gap-4 sm:grid-cols-3 mb-10">
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
          <h2 id="category-usage-heading" className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
            How to use this converter
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <li>Enter the quantity you want to convert in the input field.</li>
            <li>Select the source and destination units from the dropdown lists.</li>
            <li>Review the live output and conversion formula for exact precision.</li>
          </ol>
        </div>

        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
            Input details
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Use exact values wherever possible. If you are converting between scientific or imperial units, keep decimals for the most accurate results. The converter uses the base unit <strong>{category.baseUnit}</strong> internally for every calculation.
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
            What this tool provides
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Instant unit conversion with a detailed comparison across all {category.name.toLowerCase()} units. This includes step-by-step formula guidance and a high-precision conversion history for repeat use.
          </p>
        </div>
      </section>

      {/* Main calculation row */}
      {category.units.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Solver Console (Col span 2) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-9 gap-4 items-center">
                {/* From Input */}
                <div className="sm:col-span-4 space-y-2">
                  <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    From Unit
                  </label>
                  <div className="flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-3 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500">
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="bg-transparent border-0 text-xl font-extrabold text-zinc-900 dark:text-white focus:outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="Enter value"
                    />
                    <select
                      value={fromUnit}
                      onChange={(e) => setFromUnit(e.target.value)}
                      className="mt-2 bg-transparent text-sm font-semibold text-zinc-700 dark:text-zinc-300 border-0 focus:outline-none focus:ring-0 cursor-pointer"
                    >
                      {category.units.map((u) => (
                        <option key={u.id} value={u.id} className="bg-white dark:bg-zinc-900">
                          {u.name} ({u.symbol})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Swap Button */}
                <div className="sm:col-span-1 flex justify-center pt-6">
                  <button
                    onClick={handleSwap}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm hover:bg-zinc-50 hover:scale-105 active:scale-95 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-all cursor-pointer"
                    title="Swap Units"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3-16.5m0 0L21 12M3 4.5 21 12m0 0-5.625 7.5" />
                    </svg>
                  </button>
                </div>

                {/* To Input */}
                <div className="sm:col-span-4 space-y-2">
                  <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    To Unit
                  </label>
                  <div className="flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-3">
                    <div className="text-xl font-extrabold text-zinc-900 dark:text-white py-1">
                      {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                    </div>
                    <select
                      value={toUnit}
                      onChange={(e) => setToUnit(e.target.value)}
                      className="mt-2 bg-transparent text-sm font-semibold text-zinc-700 dark:text-zinc-300 border-0 focus:outline-none focus:ring-0 cursor-pointer"
                    >
                      {category.units.map((u) => (
                        <option key={u.id} value={u.id} className="bg-white dark:bg-zinc-900">
                          {u.name} ({u.symbol})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Formula Step-by-Step Explanation Box */}
              <div className="p-4 bg-emerald-500/[0.03] border border-emerald-500/10 rounded-2xl space-y-2">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                  Mathematical Conversion Method
                </span>
                <div className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 leading-relaxed">
                  {getFormulaText()}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  Formula:{" "}
                  {parseFloat(value) || 0} {selectedFromUnit?.symbol} ={" "}
                  {result.toLocaleString(undefined, { maximumFractionDigits: 6 })} {selectedToUnit?.symbol}
                </div>
              </div>
            </div>

            {/* Popular predefined conversions listing (Google Keyword SEO Grid) */}
            {category.popularTools.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Dedicated Popular {category.name} Solvers
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {category.popularTools.map((pt) => (
                    <Link
                      key={pt.id}
                      href={`/${categorySlug}/${pt.id}`}
                      className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-emerald-500/30 rounded-2xl flex flex-col items-start gap-1 group shadow-sm hover:shadow transition-all"
                    >
                      <span className="font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors text-sm">
                        {pt.name} Converter
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                        {pt.description}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dynamic Side-by-Side Comparison Grid (Col span 1) */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-emerald-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3-16.5m0 0L21 12M3 4.5 21 12m0 0-5.625 7.5" />
                  </svg>
                  Comparison Mode
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                  Enter an amount to see it mapped to all units in this category concurrently.
                </p>
              </div>

              {/* Reference unit selector */}
              <div className="flex gap-3 bg-zinc-50 dark:bg-zinc-950 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 items-center">
                <input
                  type="number"
                  value={compValue}
                  onChange={(e) => setCompValue(e.target.value)}
                  className="w-16 bg-transparent font-extrabold focus:outline-none text-sm text-zinc-900 dark:text-white focus:ring-0 border-0 p-0"
                />
                <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                  {selectedFromUnit?.symbol || ""} =
                </span>
              </div>

              {/* Comparison values panel */}
              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1 custom-scrollbar">
                {compData.map((item) => (
                  <div
                    key={item.unit.id}
                    className={`flex justify-between items-center p-3 rounded-xl border transition-colors ${
                      item.unit.id === toUnit
                        ? "border-emerald-500/30 bg-emerald-500/[0.02]"
                        : "border-zinc-100 dark:border-zinc-800"
                    }`}
                  >
                    <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                      {item.unit.name} ({item.unit.symbol})
                    </span>
                    <span className="text-xs font-extrabold text-zinc-900 dark:text-zinc-50">
                      {item.value.toLocaleString(undefined, { maximumFractionDigits: 5 })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Render a premium custom tools showcase grid if this category has no standard units */
        <div className="space-y-8 mb-12">
          <div className="bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
            <div className="relative z-10 max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30 rounded-full uppercase tracking-wider">
                Specialized Dashboard Solvers
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white leading-tight">
                Featured {category.name} Calculators & Systems
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                This category comprises specialized interactive tools and mathematical dashboards engineered for advanced domain-specific calculations. Select any featured solver below to begin:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.popularTools.map((pt) => (
              <Link
                key={pt.id}
                href={`/${categorySlug}/${pt.id}`}
                className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-emerald-500/30 rounded-3xl flex flex-col items-start gap-3 group shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-2xl group-hover:scale-110 transition-transform">
                  <Icon name={category.icon} className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors text-base">
                    {pt.name}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3">
                    {pt.description}
                  </p>
                </div>
                <div className="w-full pt-2 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>Open Interactive Solver</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* SEO Static Descriptions & Category FAQs */}
      <section className="bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-2xl font-bold text-zinc-950 dark:text-zinc-50">
          Understanding {category.name} Measurements & Calculations
        </h3>
        <div className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-4">
          <p>
            The measurement of {category.name.toLowerCase()} spans many historic and scientific definitions. In engineering laboratories, microscopic tolerances require Planck Length, millimeter, or micron scales. Conversely, in marine navigation and astrophysics, distance indicators rely on Nautical Miles, Astronomical Units (AU), light years, and parsecs.
          </p>
          <p>
            Using the Convertly solver, you can easily shift variables across standard metric units (meters, kilometers) and British Imperial metrics (inches, feet, yards, miles). Our float-point algorithms evaluate coefficients relative to a base unit of <strong>{category.baseUnit}</strong> to guarantee precision values.
          </p>
        </div>

        {/* FAQs */}
        <div className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-6">
          <h4 className="font-bold text-lg text-zinc-900 dark:text-white">
            Frequently Asked Questions (FAQ) for {category.name}
          </h4>
          <div className="grid gap-6 sm:grid-cols-2 mt-4">
            <div className="space-y-2">
              <h5 className="font-bold text-zinc-800 dark:text-zinc-200 text-sm">
                How do I calculate metric to imperial measurements?
              </h5>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Metric and imperial values are linked using constant scientific ratios. For example, 1 inch is defined as exactly 2.54 centimeters. Convertly stores these constants and maps input values relative to their target definitions automatically.
              </p>
            </div>
            <div className="space-y-2">
              <h5 className="font-bold text-zinc-800 dark:text-zinc-200 text-sm">
                Does Convertly preserve precision for small scales?
              </h5>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Yes! Convertly supports double float mathematical rounding, preserving precision factors up to 6 decimal places. We display extreme scientific scales (like Planck Length) in clean notation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
