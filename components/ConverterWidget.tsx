"use client";

import { useEffect, useMemo, useState } from "react";
import { categories } from "@/lib/tools-data";
import { convertStandard, convertTemperature } from "@/lib/conversion";
import { calculateManualConversion } from "@/lib/seo-data";

interface ConverterWidgetProps {
  categorySlug?: string;
  initialFrom?: string;
  initialTo?: string;
  fromLabel?: string;
  toLabel?: string;
  fromSymbol?: string;
  toSymbol?: string;
  manualConversionType?: "ppm-mgl" | "kg-ha-to-lbs-acre" | "acre-lbs-to-kg-ha" | "ratio";
}

function formatDisplay(value: number) {
  if (!Number.isFinite(value)) return "0";
  return value.toLocaleString(undefined, { maximumFractionDigits: 6 });
}

export default function ConverterWidget({
  categorySlug,
  initialFrom,
  initialTo,
  fromLabel,
  toLabel,
  fromSymbol,
  toSymbol,
  manualConversionType,
}: ConverterWidgetProps) {
  const category = useMemo(
    () => (categorySlug ? categories.find((cat) => cat.id === categorySlug) : undefined),
    [categorySlug]
  );

  const unitAliasMap: Record<string, string> = {
    meters: "m",
    feet: "ft",
    inches: "in",
    miles: "mi",
    yards: "yd",
    sqmeters: "sqm",
    sqfeet: "sqft",
    sqkm: "sqkm",
    sqmiles: "sqmi",
    liters: "l",
    gallons: "gal",
    cups: "cup",
    pounds: "lb",
    lbs: "lb",
    stone: "st",
    celsius: "C",
    fahrenheit: "F",
    kelvin: "K",
    millimeter: "mm",
    inch: "in",
    "fl oz": "fl_oz",
    ounce: "fl_oz",
    "fluid ounce": "fl_oz",
  };

  const resolveUnit = (unit?: string) => {
    if (!unit) return "";
    return unitAliasMap[unit] ?? unit;
  };

  const [fromUnit, setFromUnit] = useState(resolveUnit(initialFrom || category?.units?.[0]?.id || ""));
  const [toUnit, setToUnit] = useState(resolveUnit(initialTo || category?.units?.[1]?.id || ""));
  const [inputValue, setInputValue] = useState("1");
  const [outputValue, setOutputValue] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [conversionCount, setConversionCount] = useState(0);

  useEffect(() => {
    setFromUnit(resolveUnit(initialFrom || category?.units?.[0]?.id || ""));
    setToUnit(resolveUnit(initialTo || category?.units?.[1]?.id || ""));
  }, [initialFrom, initialTo, category?.units]);

  useEffect(() => {
    const stored = Number(window.localStorage.getItem("unit_convertor_tools_conversion_count") || "0");
    setConversionCount(stored);
  }, []);

  const hasCategoryConversion = Boolean(category?.units?.length && !manualConversionType);

  useEffect(() => {
    const numericInput = Number(inputValue);
    if (Number.isNaN(numericInput)) {
      setOutputValue("");
      return;
    }

    let result = 0;
    if (manualConversionType) {
      result = calculateManualConversion(numericInput, manualConversionType);
    } else if (hasCategoryConversion && category?.id === "temperature") {
      result = convertTemperature(numericInput, fromUnit, toUnit);
    } else if (hasCategoryConversion && category) {
      result = convertStandard(numericInput, fromUnit, toUnit, category.id);
    } else {
      result = numericInput;
    }

    setOutputValue(formatDisplay(result));
  }, [inputValue, fromUnit, toUnit, category, hasCategoryConversion, manualConversionType]);

  const chosenFromLabel = fromLabel || category?.units?.find((unit) => unit.id === fromUnit)?.name || "From unit";
  const chosenToLabel = toLabel || category?.units?.find((unit) => unit.id === toUnit)?.name || "To unit";
  const chosenFromSymbol = fromSymbol || category?.units?.find((unit) => unit.id === fromUnit)?.symbol || "";
  const chosenToSymbol = toSymbol || category?.units?.find((unit) => unit.id === toUnit)?.symbol || "";

  const hasSelectableUnits = hasCategoryConversion;
  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(""), 2800);
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(outputValue);
      showToast("Result copied to clipboard.");
      const nextCount = conversionCount + 1;
      window.localStorage.setItem("unit_convertor_tools_conversion_count", String(nextCount));
      setConversionCount(nextCount);
      if (nextCount === 10) {
        showToast("You converted 10 units today! 🎉 Keep the streak going.");
      }
    } catch (error) {
      console.error(error);
      showToast("Copy failed. Try again manually.");
    }
  };

  const shareResult = async () => {
    const shareText = `${chosenFromLabel} to ${chosenToLabel} result: ${outputValue} ${chosenToSymbol} — on Unit Convertor Tools. Try it now!`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      await navigator.share({ title: "Unit Convertor Tools Result", text: shareText, url: shareUrl });
      return;
    }

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  const saveAsPdf = () => {
    window.print();
  };

  return (
    <div className="rounded-3xl border border-[hsla(var(--border),0.85)] bg-[hsl(var(--card))] p-6 shadow-[0_30px_70px_rgba(15,23,42,0.08)] dark:border-zinc-800 dark:bg-zinc-950/90 dark:shadow-black/10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-emerald-600 font-bold mb-2">Live Converter</p>
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            {chosenFromLabel} → {chosenToLabel}
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Enter a value below and see an instant conversion. Copy the result with one tap.
          </p>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            Conversions today: <strong>{conversionCount}</strong>
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={copyResult}
            className="inline-flex items-center justify-center rounded-2xl bg-[hsl(var(--primary))] px-4 py-2 text-sm font-semibold text-white shadow-[0_20px_30px_rgba(16,185,129,0.18)] transition hover:brightness-110"
          >
            Copy Result
          </button>
          <button
            onClick={shareResult}
            className="inline-flex items-center justify-center rounded-2xl border border-[hsla(var(--border),0.85)] bg-[hsl(var(--card))] px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:border-emerald-500 hover:bg-emerald-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
          >
            Share Result
          </button>
          <button
            onClick={saveAsPdf}
            className="inline-flex items-center justify-center rounded-2xl border border-[hsla(var(--border),0.85)] bg-[hsl(var(--card))] px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:border-emerald-500 hover:bg-emerald-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
          >
            Save as PDF
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Value</span>
          <input
            type="number"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="surface-input mt-2 w-full rounded-2xl border px-4 py-3 text-lg text-zinc-950 outline-none transition focus:border-emerald-500 focus:ring-emerald-500/20"
          />
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">Enter the amount you want to convert.</p>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Result</span>
          <div className="mt-2 w-full rounded-2xl border border-[hsla(var(--border),0.85)] bg-[hsl(var(--input))] px-4 py-3 text-lg font-semibold text-zinc-950">
            {outputValue || "0"} {chosenToSymbol}
          </div>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">Live conversion output updates as you type.</p>
        </label>
      </div>

      {hasSelectableUnits ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">From unit</span>
            <select
              value={fromUnit}
              onChange={(event) => setFromUnit(event.target.value)}
              className="surface-input mt-2 w-full rounded-2xl border px-4 py-3 text-base text-zinc-900 outline-none transition focus:border-emerald-500 focus:ring-emerald-500/20"
            >
              {category?.units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name} ({unit.symbol})
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">To unit</span>
            <select
              value={toUnit}
              onChange={(event) => setToUnit(event.target.value)}
              className="surface-input mt-2 w-full rounded-2xl border px-4 py-3 text-base text-zinc-900 outline-none transition focus:border-emerald-500 focus:ring-emerald-500/20"
            >
              {category?.units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name} ({unit.symbol})
                </option>
              ))}
            </select>
          </label>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-[hsla(var(--border),0.75)] bg-[hsl(var(--secondary))] px-4 py-4 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <p>
            Fixed conversion: {chosenFromLabel} ({chosenFromSymbol}) → {chosenToLabel} ({chosenToSymbol}).
          </p>
        </div>
      )}

      {toastMessage ? (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed bottom-6 left-1/2 z-50 w-[min(90vw,28rem)] -translate-x-1/2 rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-950 shadow-[0_20px_40px_rgba(16,185,129,0.12)] dark:border-emerald-500/30 dark:bg-emerald-950/95 dark:text-emerald-100"
        >
          {toastMessage}
        </div>
      ) : null}
    </div>
  );
}
