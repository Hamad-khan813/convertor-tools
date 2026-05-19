"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { categories } from "@/lib/tools-data";
import {
  convertStandard,
  convertTemperature,
  calculateNPK,
  calculateBMI,
  calculateMortgage,
  calculateCompoundInterest,
  decimalToRoman,
} from "@/lib/conversion";
import { saveToHistory, toggleFavorite, isFavorite } from "./HistoryAndFavorites";
import Icon from "./Icon";

interface Fertilizer {
  id: string;
  name: string;
  category: "Nitrogen" | "Phosphorus" | "Potassium" | "Compound" | "Custom";
  n: number;
  p: number;
  k: number;
  description: string;
}

const fertilizers: Fertilizer[] = [
  // Nitrogen Group
  { id: "urea", name: "Urea (46-0-0)", category: "Nitrogen", n: 46, p: 0, k: 0, description: "46% N. Most concentrated dry Nitrogen source. Soil incorporation is recommended to prevent volatilization loss." },
  { id: "calcium-nitrate", name: "Calcium Nitrate (15.5-0-0)", category: "Nitrogen", n: 15.5, p: 0, k: 0, description: "15.5% N + 19% Calcium. Fully water-soluble immediately available nitrogen. Essential for hydroponics to prevent blossom end rot." },
  { id: "ammonium-sulfate", name: "Ammonium Sulfate (21-0-0)", category: "Nitrogen", n: 21, p: 0, k: 0, description: "21% N + 24% Sulfur. High acidifying index, excellent for acid-loving soils and providing secondary Sulfur." },
  { id: "ammonium-nitrate", name: "Ammonium Nitrate (34-0-0)", category: "Nitrogen", n: 34, p: 0, k: 0, description: "34% N. Fast-acting dual nitrogen release (ammonium and nitrate). Highly regulated." },
  { id: "anhydrous-ammonia", name: "Anhydrous Ammonia (82-0-0)", category: "Nitrogen", n: 82, p: 0, k: 0, description: "82% N. Commercial-grade gas injected directly into soil. Requires professional safety gear." },

  // Phosphorus Group
  { id: "map", name: "MAP (11-52-0)", category: "Phosphorus", n: 11, p: 52, k: 0, description: "11% N + 52% P₂O₅. Monoammonium Phosphate. High-purity water-soluble starter fertilizer, vital for early root strength." },
  { id: "dap", name: "DAP (18-46-0)", category: "Phosphorus", n: 18, p: 46, k: 0, description: "18% N + 46% P₂O₅. Diammonium Phosphate. Widely used phosphorus source, provides solid initial Nitrogen." },
  { id: "tsp", name: "TSP (0-46-0)", category: "Phosphorus", n: 0, p: 46, k: 0, description: "46% P₂O₅. Triple Superphosphate. Excellent phosphorus boost without adding any active Nitrogen." },
  { id: "ssp", name: "SSP (0-20-0)", category: "Phosphorus", n: 0, p: 20, k: 0, description: "20% P₂O₅ + 12% Sulfur + 20% Calcium. Single Superphosphate. Great source of secondary nutrients." },

  // Potassium Group
  { id: "mop", name: "MOP (0-0-60)", category: "Potassium", n: 0, p: 0, k: 60, description: "60% K₂O. Muriate of Potash (Potassium Chloride). Most economical potassium source, but has high chlorine content." },
  { id: "sop", name: "SOP (0-0-50)", category: "Potassium", n: 0, p: 0, k: 50, description: "50% K₂O + 18% Sulfur. Potassium Sulfate. Premium low-chloride potash, perfect for chlorine-sensitive plants." },
  { id: "potassium-nitrate", name: "Potassium Nitrate (13-0-44)", category: "Potassium", n: 13, p: 0, k: 44, description: "13% N + 44% K₂O. Soluble dual macronutrient, excellent for foliar feeding, greenhouse, and drip systems." },
  { id: "mkp", name: "MKP (0-52-34)", category: "Potassium", n: 0, p: 52, k: 34, description: "52% P₂O₅ + 34% K₂O. Monopotassium Phosphate. Nitrogen-free premium soluble salt. Boosts blooming and root branching." },

  // Compound Group
  { id: "balanced-20", name: "Triple 20 (20-20-20)", category: "Compound", n: 20, p: 20, k: 20, description: "20% N + 20% P₂O₅ + 20% K₂O. Highly concentrated fully water-soluble balanced fertilizer." },
  { id: "balanced-10", name: "Balanced (10-10-10)", category: "Compound", n: 10, p: 10, k: 10, description: "10% N + 10% P₂O₅ + 10% K₂O. Standard general-purpose garden fertilizer." },
  { id: "tomato-bloom", name: "Tomato/Bloom (5-10-30)", category: "Compound", n: 5, p: 10, k: 30, description: "5% N + 10% P₂O₅ + 30% K₂O. Custom-tailored formulation to enhance flower sizing, fruit production, and root health." },
  { id: "starter-feed", name: "Starter Feed (15-30-15)", category: "Compound", n: 15, p: 30, k: 15, description: "15% N + 30% P₂O₅ + 15% K₂O. Formulated to trigger aggressive early root branching." },

  // Custom Group
  { id: "custom", name: "Custom N-P-K Grade...", category: "Custom", n: 0, p: 0, k: 0, description: "Input custom Dry or Liquid fertilizer grades to execute precision formulations." }
];

interface Props {
  categorySlug: string;
  toolSlug: string;
  initialFrom?: string;
  initialTo?: string;
}

export default function ToolClient({ categorySlug, toolSlug, initialFrom, initialTo }: Props) {
  const category = categories.find((c) => c.id === categorySlug);
  if (!category) return null;

  const popularTool = category.popularTools.find((t) => t.id === toolSlug);

  // General State
  const [value, setValue] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState<string>(initialFrom || category.units[0]?.id || "");
  const [toUnit, setToUnit] = useState<string>(initialTo || category.units[1]?.id || "");
  const [result, setResult] = useState<number>(0);
  const [isFav, setIsFav] = useState<boolean>(false);
  const [compValue, setCompValue] = useState<string>("1");

  // NPK Calculator State
  const [npkArea, setNpkArea] = useState<string>("1000");
  const [npkUnit, setNpkUnit] = useState<"acres" | "sqft">("sqft");
  const [targetN, setTargetN] = useState<string>("1");
  const [targetP, setTargetP] = useState<string>("0.5");
  const [targetK, setTargetK] = useState<string>("0.5");
  const [bagN, setBagN] = useState<string>("10");
  const [bagP, setBagP] = useState<string>("10");
  const [bagK, setBagK] = useState<string>("10");

  // NPK Native Mixer States
  const [npkMode, setNpkMode] = useState<"liquid" | "soil">("liquid");
  const [liquidVolume, setLiquidVolume] = useState<string>("1");
  const [liquidVolumeUnit, setLiquidVolumeUnit] = useState<"L" | "gal">("L");
  const [liquidTargetUnit, setLiquidTargetUnit] = useState<"%" | "ppm">("%");
  const [selectedFertilizerId, setSelectedFertilizerId] = useState<string>("urea");
  const [customN, setCustomN] = useState<string>("10");
  const [customP, setCustomP] = useState<string>("10");
  const [customK, setCustomK] = useState<string>("10");
  const [soilMatchMode, setSoilMatchMode] = useState<"N" | "P" | "K" | "max">("max");
  const [showCopiedToast, setShowCopiedToast] = useState<boolean>(false);

  // BMI Calculator State
  const [weight, setWeight] = useState<string>("70");
  const [height, setHeight] = useState<string>("175");

  // Mortgage Calculator State
  const [principal, setPrincipal] = useState<string>("300000");
  const [interestRate, setInterestRate] = useState<string>("5.5");
  const [term, setTerm] = useState<string>("30");

  // Compound Interest State
  const [savingsPrincipal, setSavingsPrincipal] = useState<string>("10000");
  const [savingsRate, setSavingsRate] = useState<string>("6");
  const [savingsYears, setSavingsYears] = useState<string>("10");
  const [compPeriods, setCompPeriods] = useState<string>("12");

  // Roman Numerals State
  const [romanVal, setRomanVal] = useState<string>("2026");

  useEffect(() => {
    setIsFav(isFavorite(toolSlug));
  }, [toolSlug]);

  // Standard conversions
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
    if (
      toolSlug !== "npk-fertilizer-calculator" &&
      toolSlug !== "bmi-calculator" &&
      toolSlug !== "loan-mortgage-calculator" &&
      toolSlug !== "compound-interest" &&
      toolSlug !== "roman-numerals"
    ) {
      calculateResult();
    }
  }, [value, fromUnit, toUnit]);

  // Save standard conversions to history
  useEffect(() => {
    const val = parseFloat(value);
    if (isNaN(val) || val === 0) return;
    if (
      toolSlug === "npk-fertilizer-calculator" ||
      toolSlug === "bmi-calculator" ||
      toolSlug === "loan-mortgage-calculator" ||
      toolSlug === "compound-interest" ||
      toolSlug === "roman-numerals"
    )
      return;

    const timer = setTimeout(() => {
      const fromObj = category.units.find((u) => u.id === fromUnit);
      const toObj = category.units.find((u) => u.id === toUnit);
      if (fromObj && toObj) {
        saveToHistory({
          categorySlug,
          categoryName: category.name,
          toolId: toolSlug,
          toolName: popularTool?.name || `${fromObj.name} to ${toObj.name}`,
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
      toolId: toolSlug,
      toolName: popularTool?.name || toolSlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    });
    setIsFav(added);
  };

  const selectedFromUnit = category.units.find((u) => u.id === fromUnit);
  const selectedToUnit = category.units.find((u) => u.id === toUnit);

  const getFormulaText = () => {
    if (categorySlug === "temperature") {
      if (fromUnit === "C" && toUnit === "F") return "Formula: (°C × 9/5) + 32";
      if (fromUnit === "F" && toUnit === "C") return "Formula: (°F – 32) × 5/9";
      return "Thermo conversion algorithm";
    }
    if (selectedFromUnit && selectedToUnit) {
      const ratio = selectedFromUnit.ratio / selectedToUnit.ratio;
      return `Formula: Multiply the ${selectedFromUnit.name} value by ${ratio.toLocaleString(undefined, { maximumFractionDigits: 6 })}.`;
    }
    return "";
  };

  // Render Specialized Calculators
  if (toolSlug === "npk-fertilizer-calculator") {
    // 1. Get Selected Fertilizer Grade
    const fertilizer = fertilizers.find((f) => f.id === selectedFertilizerId) || fertilizers[0];
    const gradeN = selectedFertilizerId === "custom" ? (parseFloat(customN) || 0) : fertilizer.n;
    const gradeP = selectedFertilizerId === "custom" ? (parseFloat(customP) || 0) : fertilizer.p;
    const gradeK = selectedFertilizerId === "custom" ? (parseFloat(customK) || 0) : fertilizer.k;

    // 2. Perform Calculations Based on Mode
    let requiredAmount = 0; // grams for liquid, lbs for soil
    let displayUnit = "";
    let limitingNutrient = "None";
    let targetVolumeText = "";
    
    // Delivered & Targets (Percent for liquid, rate for soil)
    let nTarget = 0;
    let pTarget = 0;
    let kTarget = 0;
    let nDelivered = 0;
    let pDelivered = 0;
    let kDelivered = 0;
    let nDeficit = 0;
    let pDeficit = 0;
    let kDeficit = 0;

    if (npkMode === "liquid") {
      const tN = parseFloat(targetN) || 0;
      const tP = parseFloat(targetP) || 0;
      const tK = parseFloat(targetK) || 0;

      // In % terms
      const nTargetPct = liquidTargetUnit === "ppm" ? tN / 10000 : tN;
      const pTargetPct = liquidTargetUnit === "ppm" ? tP / 10000 : tP;
      const kTargetPct = liquidTargetUnit === "ppm" ? tK / 10000 : tK;

      nTarget = tN;
      pTarget = tP;
      kTarget = tK;

      const vol = parseFloat(liquidVolume) || 0;
      const volumeL = liquidVolumeUnit === "gal" ? vol * 3.78541 : vol;
      targetVolumeText = `${vol} ${liquidVolumeUnit}`;

      // Target Mass in grams (since water is 1000g/L)
      const targetMassN = (nTargetPct / 100) * volumeL * 1000;
      const targetMassP = (pTargetPct / 100) * volumeL * 1000;
      const targetMassK = (kTargetPct / 100) * volumeL * 1000;

      // Required Dry fertilizer mass for each element in grams
      const reqMassN = gradeN > 0 ? targetMassN / (gradeN / 100) : 0;
      const reqMassP = gradeP > 0 ? targetMassP / (gradeP / 100) : 0;
      const reqMassK = gradeK > 0 ? targetMassK / (gradeK / 100) : 0;

      // Max required mass to meet all targets
      requiredAmount = Math.max(reqMassN, reqMassP, reqMassK);
      displayUnit = "grams (g)";

      // Identify limiting element
      let maxMass = 0;
      if (gradeN > 0 && reqMassN > maxMass) { maxMass = reqMassN; limitingNutrient = "Nitrogen (N)"; }
      if (gradeP > 0 && reqMassP > maxMass) { maxMass = reqMassP; limitingNutrient = "Phosphorus (P₂O₅)"; }
      if (gradeK > 0 && reqMassK > maxMass) { maxMass = reqMassK; limitingNutrient = "Potassium (K₂O)"; }

      // Delivered in solution
      const delN = requiredAmount > 0 ? (requiredAmount * (gradeN / 100)) / (volumeL * 10) : 0;
      const delP = requiredAmount > 0 ? (requiredAmount * (gradeP / 100)) / (volumeL * 10) : 0;
      const delK = requiredAmount > 0 ? (requiredAmount * (gradeK / 100)) / (volumeL * 10) : 0;

      if (liquidTargetUnit === "ppm") {
        nDelivered = Math.round(delN * 10000);
        pDelivered = Math.round(delP * 10000);
        kDelivered = Math.round(delK * 10000);
        nDeficit = Math.max(0, nTarget - nDelivered);
        pDeficit = Math.max(0, pTarget - pDelivered);
        kDeficit = Math.max(0, kTarget - kDelivered);
      } else {
        nDelivered = Number(delN.toFixed(4));
        pDelivered = Number(delP.toFixed(4));
        kDelivered = Number(delK.toFixed(4));
        nDeficit = Number(Math.max(0, nTarget - nDelivered).toFixed(4));
        pDeficit = Number(Math.max(0, pTarget - pDelivered).toFixed(4));
        kDeficit = Number(Math.max(0, kTarget - kDelivered).toFixed(4));
      }
    } else {
      const tN = parseFloat(targetN) || 0;
      const tP = parseFloat(targetP) || 0;
      const tK = parseFloat(targetK) || 0;

      nTarget = tN;
      pTarget = tP;
      kTarget = tK;

      const areaVal = parseFloat(npkArea) || 0;
      const areaMultiplier = npkUnit === "acres" ? areaVal : areaVal / 1000;
      targetVolumeText = `${areaVal} ${npkUnit}`;

      const targetMassN = tN * areaMultiplier;
      const targetMassP = tP * areaMultiplier;
      const targetMassK = tK * areaMultiplier;

      const reqMassN = gradeN > 0 ? targetMassN / (gradeN / 100) : 0;
      const reqMassP = gradeP > 0 ? targetMassP / (gradeP / 100) : 0;
      const reqMassK = gradeK > 0 ? targetMassK / (gradeK / 100) : 0;

      if (soilMatchMode === "N") {
        requiredAmount = reqMassN;
        limitingNutrient = "Nitrogen (N)";
      } else if (soilMatchMode === "P") {
        requiredAmount = reqMassP;
        limitingNutrient = "Phosphorus (P₂O₅)";
      } else if (soilMatchMode === "K") {
        requiredAmount = reqMassK;
        limitingNutrient = "Potassium (K₂O)";
      } else {
        requiredAmount = Math.max(reqMassN, reqMassP, reqMassK);
        let maxMass = 0;
        if (gradeN > 0 && reqMassN > maxMass) { maxMass = reqMassN; limitingNutrient = "Nitrogen (N)"; }
        if (gradeP > 0 && reqMassP > maxMass) { maxMass = reqMassP; limitingNutrient = "Phosphorus (P₂O₅)"; }
        if (gradeK > 0 && reqMassK > maxMass) { maxMass = reqMassK; limitingNutrient = "Potassium (K₂O)"; }
      }

      displayUnit = "pounds (lbs)";

      nDelivered = Number((requiredAmount > 0 && areaMultiplier > 0 ? (requiredAmount * (gradeN / 100)) / areaMultiplier : 0).toFixed(2));
      pDelivered = Number((requiredAmount > 0 && areaMultiplier > 0 ? (requiredAmount * (gradeP / 100)) / areaMultiplier : 0).toFixed(2));
      kDelivered = Number((requiredAmount > 0 && areaMultiplier > 0 ? (requiredAmount * (gradeK / 100)) / areaMultiplier : 0).toFixed(2));

      nDeficit = Number(Math.max(0, nTarget - nDelivered).toFixed(2));
      pDeficit = Number(Math.max(0, pTarget - pDelivered).toFixed(2));
      kDeficit = Number(Math.max(0, kTarget - kDelivered).toFixed(2));
    }

    const showWarning = nDeficit > 0 || pDeficit > 0 || kDeficit > 0;

    // Build the recipe summary for clipboard
    const getSummaryText = () => {
      let txt = `Advanced NPK Fertilizer Mixer Recipe Details\n`;
      txt += `==========================================\n`;
      txt += `Calculation Mode: ${npkMode === "liquid" ? "Liquid Solution (PPM/Hydroponics)" : "Soil Application"}\n`;
      txt += `Source Fertilizer: ${fertilizer.name} (${gradeN}-${gradeP}-${gradeK})\n`;
      txt += `Target Volume/Area: ${targetVolumeText}\n\n`;
      txt += `Target Nutrients:\n`;
      txt += ` - N: ${nTarget}${npkMode === "liquid" ? liquidTargetUnit : ` lbs/${npkUnit === "acres" ? "acre" : "1000 sq ft"}`}\n`;
      txt += ` - P: ${pTarget}${npkMode === "liquid" ? liquidTargetUnit : ` lbs/${npkUnit === "acres" ? "acre" : "1000 sq ft"}`}\n`;
      txt += ` - K: ${kTarget}${npkMode === "liquid" ? liquidTargetUnit : ` lbs/${npkUnit === "acres" ? "acre" : "1000 sq ft"}`}\n\n`;
      txt += `Delivered Nutrients:\n`;
      txt += ` - N: ${nDelivered}${npkMode === "liquid" ? liquidTargetUnit : ` lbs/${npkUnit === "acres" ? "acre" : "1000 sq ft"}`}\n`;
      txt += ` - P: ${pDelivered}${npkMode === "liquid" ? liquidTargetUnit : ` lbs/${npkUnit === "acres" ? "acre" : "1000 sq ft"}`}\n`;
      txt += ` - K: ${kDelivered}${npkMode === "liquid" ? liquidTargetUnit : ` lbs/${npkUnit === "acres" ? "acre" : "1000 sq ft"}`}\n\n`;
      txt += `Required Fertilizer Mass:\n`;
      txt += ` => ${requiredAmount.toFixed(2)} ${displayUnit}\n`;
      if (limitingNutrient !== "None") {
        txt += `Limiting Element: ${limitingNutrient}\n`;
      }
      if (showWarning) {
        txt += `\n⚠️ WARNING: Deficiencies detected!\n`;
        if (nDeficit > 0) txt += ` - N Deficit: ${nDeficit}${npkMode === "liquid" ? liquidTargetUnit : ` lbs/${npkUnit === "acres" ? "acre" : "1000 sq ft"}`}\n`;
        if (pDeficit > 0) txt += ` - P Deficit: ${pDeficit}${npkMode === "liquid" ? liquidTargetUnit : ` lbs/${npkUnit === "acres" ? "acre" : "1000 sq ft"}`}\n`;
        if (kDeficit > 0) txt += ` - K Deficit: ${kDeficit}${npkMode === "liquid" ? liquidTargetUnit : ` lbs/${npkUnit === "acres" ? "acre" : "1000 sq ft"}`}\n`;
      }
      txt += `\nFormulated with Precision via Convertly.`;
      return txt;
    };

    const handleCopyRecipe = () => {
      navigator.clipboard.writeText(getSummaryText());
      setShowCopiedToast(true);
      setTimeout(() => setShowCopiedToast(false), 3000);
    };

    // Safe Progress bar percentage
    const getPercentMet = (target: number, delivered: number) => {
      if (target <= 0) return 100;
      return Math.min(100, Math.round((delivered / target) * 100));
    };

    const nPercentMet = getPercentMet(nTarget, nDelivered);
    const pPercentMet = getPercentMet(pTarget, pDelivered);
    const kPercentMet = getPercentMet(kTarget, kDelivered);

    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Title block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-8 mb-8">
          <div className="space-y-2">
            <Link href="/" className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" /></svg>
              Back to Home
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                Advanced NPK Fertilizer Mixer
              </h1>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-500/10 shadow-sm uppercase tracking-wider">
                Official Integration
              </span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2 max-w-3xl leading-relaxed font-medium">
              Precise NPK recipe builder by Hamad – Used by hydroponic growers and farmers worldwide. 
              Determine exact target macronutrients, customize PPM ratios, and optimize your liquid or dry chemical fertilizer batch mixtures seamlessly below.
            </p>
          </div>
          <div className="flex items-center">
            <a
              href="https://ferti-calc.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-950 font-bold px-5 text-sm shadow-sm transition-all whitespace-nowrap"
            >
              Open Fullscreen Tool
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 ml-1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
            </a>
          </div>
        </div>

        {/* Success Toast */}
        {showCopiedToast && (
          <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg border border-emerald-500/20 text-sm font-bold animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" /></svg>
            Recipe copied to clipboard!
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form column (Left) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Card 1: Mixer Mode & Setup */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
                Step 1: Select Application Mode
              </h2>
              <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-100 dark:bg-zinc-950 rounded-2xl">
                <button
                  type="button"
                  onClick={() => {
                    setNpkMode("liquid");
                    // Adjust defaults for liquid
                    setTargetN("10");
                    setTargetP("5");
                    setTargetK("10");
                  }}
                  className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                    npkMode === "liquid"
                      ? "bg-emerald-600 text-white shadow-sm shadow-emerald-500/10"
                      : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}
                >
                  <span className="text-lg">🧪</span>
                  <span>Liquid Mix (PPM / Hydro)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNpkMode("soil");
                    // Adjust defaults for soil
                    setTargetN("1");
                    setTargetP("0.5");
                    setTargetK("0.5");
                  }}
                  className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                    npkMode === "soil"
                      ? "bg-emerald-600 text-white shadow-sm shadow-emerald-500/10"
                      : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}
                >
                  <span className="text-lg">🌱</span>
                  <span>Soil Area Application</span>
                </button>
              </div>
            </div>

            {/* Card 2: Target Nutrient Strengths */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Step 2: Target Macronutrients
                </h2>
                {npkMode === "liquid" && (
                  <select
                    value={liquidTargetUnit}
                    onChange={(e) => setLiquidTargetUnit(e.target.value as "%" | "ppm")}
                    className="h-8 text-xs font-bold rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-2 text-zinc-700 dark:text-zinc-300"
                  >
                    <option value="%">Percent (%)</option>
                    <option value="ppm">PPM (mg/L)</option>
                  </select>
                )}
                {npkMode === "soil" && (
                  <span className="text-xs font-bold text-zinc-400">
                    lbs / {npkUnit === "acres" ? "acre" : "1,000 sq ft"}
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {/* Nitrogen Input */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-zinc-500">
                    <span className="text-zinc-800 dark:text-zinc-200">Nitrogen (N)</span>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      {targetN} {npkMode === "liquid" ? liquidTargetUnit : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max={npkMode === "liquid" ? (liquidTargetUnit === "ppm" ? "1000" : "50") : "10"}
                      step={npkMode === "liquid" ? (liquidTargetUnit === "ppm" ? "10" : "0.5") : "0.1"}
                      value={targetN}
                      onChange={(e) => setTargetN(e.target.value)}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                    <input
                      type="number"
                      value={targetN}
                      onChange={(e) => setTargetN(e.target.value)}
                      className="w-20 text-center h-9 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold rounded-lg text-sm"
                    />
                  </div>
                </div>

                {/* Phosphorus Input */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-zinc-500">
                    <span className="text-zinc-800 dark:text-zinc-200">Phosphorus (P₂O₅)</span>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      {targetP} {npkMode === "liquid" ? liquidTargetUnit : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max={npkMode === "liquid" ? (liquidTargetUnit === "ppm" ? "1000" : "50") : "10"}
                      step={npkMode === "liquid" ? (liquidTargetUnit === "ppm" ? "10" : "0.5") : "0.1"}
                      value={targetP}
                      onChange={(e) => setTargetP(e.target.value)}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                    <input
                      type="number"
                      value={targetP}
                      onChange={(e) => setTargetP(e.target.value)}
                      className="w-20 text-center h-9 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold rounded-lg text-sm"
                    />
                  </div>
                </div>

                {/* Potassium Input */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-zinc-500">
                    <span className="text-zinc-800 dark:text-zinc-200">Potassium (K₂O)</span>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      {targetK} {npkMode === "liquid" ? liquidTargetUnit : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max={npkMode === "liquid" ? (liquidTargetUnit === "ppm" ? "1000" : "50") : "10"}
                      step={npkMode === "liquid" ? (liquidTargetUnit === "ppm" ? "10" : "0.5") : "0.1"}
                      value={targetK}
                      onChange={(e) => setTargetK(e.target.value)}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                    <input
                      type="number"
                      value={targetK}
                      onChange={(e) => setTargetK(e.target.value)}
                      className="w-20 text-center h-9 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Source Fertilizer Selection */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm space-y-4">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Step 3: Choose Source Fertilizer
              </h2>
              <div className="space-y-3">
                <select
                  value={selectedFertilizerId}
                  onChange={(e) => setSelectedFertilizerId(e.target.value)}
                  className="w-full h-11 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold rounded-xl text-sm text-zinc-850 dark:text-white px-3"
                >
                  <optgroup label="Nitrogen Sources">
                    {fertilizers.filter(f => f.category === "Nitrogen").map(f => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Phosphorus Sources">
                    {fertilizers.filter(f => f.category === "Phosphorus").map(f => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Potassium Sources">
                    {fertilizers.filter(f => f.category === "Potassium").map(f => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Compound Blends (N-P-K)">
                    {fertilizers.filter(f => f.category === "Compound").map(f => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Custom Options">
                    {fertilizers.filter(f => f.category === "Custom").map(f => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </optgroup>
                </select>

                {/* Show custom percentage fields if custom is selected */}
                {selectedFertilizerId === "custom" && (
                  <div className="grid grid-cols-3 gap-3 p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold uppercase text-zinc-400">Custom N (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={customN}
                        onChange={(e) => setCustomN(e.target.value)}
                        className="w-full text-center h-10 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-bold rounded-lg text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold uppercase text-zinc-400">Custom P (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={customP}
                        onChange={(e) => setCustomP(e.target.value)}
                        className="w-full text-center h-10 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-bold rounded-lg text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold uppercase text-zinc-400">Custom K (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={customK}
                        onChange={(e) => setCustomK(e.target.value)}
                        className="w-full text-center h-10 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-bold rounded-lg text-sm"
                      />
                    </div>
                  </div>
                )}

                <div className="p-3 bg-emerald-500/[0.02] border border-emerald-500/10 rounded-2xl text-[11px] font-medium leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {selectedFertilizerId === "custom"
                    ? "Define your own dry/liquid chemical percentages above to trigger localized formulations."
                    : fertilizer.description}
                </div>
              </div>
            </div>

            {/* Card 4: Liquid Volume or Application Area */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm space-y-4">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                {npkMode === "liquid" ? "Step 4: Target Liquid Volume" : "Step 4: Application Soil Area"}
              </h2>

              {npkMode === "liquid" ? (
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase text-zinc-400">Final Solution Volume</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={liquidVolume}
                      onChange={(e) => setLiquidVolume(e.target.value)}
                      className="flex-1 h-11 px-3 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold rounded-xl text-sm"
                    />
                    <select
                      value={liquidVolumeUnit}
                      onChange={(e) => setLiquidVolumeUnit(e.target.value as "L" | "gal")}
                      className="h-11 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold rounded-xl text-sm px-3"
                    >
                      <option value="L">Liters (L)</option>
                      <option value="gal">Gallons (gal)</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase text-zinc-400">Application Size</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="1"
                        value={npkArea}
                        onChange={(e) => setNpkArea(e.target.value)}
                        className="flex-1 h-11 px-3 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold rounded-xl text-sm"
                      />
                      <select
                        value={npkUnit}
                        onChange={(e) => setNpkUnit(e.target.value as "acres" | "sqft")}
                        className="h-11 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold rounded-xl text-sm px-3"
                      >
                        <option value="sqft">Square Feet (sq ft)</option>
                        <option value="acres">Acres (ac)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase text-zinc-400">Acreage Match Criteria</label>
                    <select
                      value={soilMatchMode}
                      onChange={(e) => setSoilMatchMode(e.target.value as "N" | "P" | "K" | "max")}
                      className="w-full h-11 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold rounded-xl text-sm px-3 text-zinc-700 dark:text-zinc-300"
                    >
                      <option value="max">Meet All Targets (Maximize amount)</option>
                      <option value="N">Match Nitrogen (N) Target First</option>
                      <option value="P">Match Phosphorus (P₂O₅) Target First</option>
                      <option value="K">Match Potassium (K₂O) Target First</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results column (Right) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Card 5: Required Fertilizer weight */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-emerald-500/10 flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-100/90 block mb-2">
                  Precision Formulation
                </span>
                <div className="text-5xl font-black tracking-tight leading-none mb-3">
                  {requiredAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{" "}
                  <span className="text-2xl font-bold font-sans">
                    {npkMode === "liquid" ? "g" : "lbs"}
                  </span>
                </div>
                <p className="text-emerald-100/95 text-xs font-semibold leading-relaxed max-w-lg">
                  Dissolving exactly <strong className="underline decoration-2 underline-offset-2">{requiredAmount.toFixed(2)} {npkMode === "liquid" ? "grams" : "pounds"}</strong> of{" "}
                  <strong>{selectedFertilizerId === "custom" ? "Custom Fertilizer" : fertilizer.name}</strong> dry powder in{" "}
                  <strong>{targetVolumeText}</strong> yields the closest nutrient matching with a limiting element of <strong>{limitingNutrient}</strong>.
                </p>
              </div>

              <div className="border-t border-white/10 pt-4 mt-6 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-4 text-xs font-bold text-emerald-50">
                  <div>
                    <span className="block text-[10px] text-emerald-200/80 uppercase">Limiting Element</span>
                    <span className="text-sm font-extrabold mt-0.5 block">{limitingNutrient}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-emerald-200/80 uppercase">Target Space</span>
                    <span className="text-sm font-extrabold mt-0.5 block">{targetVolumeText}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyRecipe}
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 font-extrabold px-4 text-xs shadow-md transition-all gap-1.5 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376A8.965 8.965 0 0 0 12 12.75c-.497 0-.982.04-1.455.12l-.179.032m8.667 3.974c.22.658-.08 1.396-.704 1.76a8.973 8.973 0 0 1-3.6 1.047c-.244 0-.49-.004-.733-.012m10.133-4.38c.311-.807.467-1.683.467-2.583a8.96 8.96 0 0 0-8.667-8.967m0 0A8.967 8.967 0 0 1 18 12.75c0 .497-.04.982-.12 1.455l-.032.179m-8.667-3.974a8.965 8.965 0 0 0-1.047 3.6c0 .244.004.49.012.733m-1.76-.704c-.364.624-.606 1.32-.704 2.06m8.667-8.967C10.75 3.033 6 7.8 6 12.75c0 .9.156 1.778.444 2.6" /></svg>
                  Copy Recipe
                </button>
              </div>
            </div>

            {/* Card 6: Nutrient Comparison Chart */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h3 className="text-base font-extrabold text-zinc-900 dark:text-white">
                  Nutrient Comparison & Grade Audit
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                  Comparing targeted chemical demand vs. delivered fertilizer levels. A deficit represents unfulfilled nutrients.
                </p>
              </div>

              <div className="space-y-5">
                {/* Nitrogen Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-zinc-800 dark:text-zinc-200">Nitrogen (N)</span>
                    <span className="text-zinc-500">
                      Target: <strong className="text-zinc-800 dark:text-zinc-200">{nTarget}</strong> | Delivered:{" "}
                      <strong className={nDeficit > 0 ? "text-amber-500" : "text-emerald-500"}>{nDelivered}</strong>{" "}
                      {npkMode === "liquid" ? liquidTargetUnit : ` lbs`}
                    </span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-950 h-4 rounded-full overflow-hidden relative border border-zinc-200/50 dark:border-zinc-800/50 shadow-inner">
                    <div
                      style={{ width: `${nPercentMet}%` }}
                      className={`h-full rounded-full transition-all duration-500 shadow-sm ${
                        nDeficit > 0 ? "bg-amber-500" : "bg-emerald-500"
                      }`}
                    />
                    <span className="absolute inset-y-0 right-3 flex items-center text-[10px] font-black text-zinc-400">
                      {nPercentMet}% met
                    </span>
                  </div>
                </div>

                {/* Phosphorus Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-zinc-800 dark:text-zinc-200">Phosphorus (P₂O₅)</span>
                    <span className="text-zinc-500">
                      Target: <strong className="text-zinc-800 dark:text-zinc-200">{pTarget}</strong> | Delivered:{" "}
                      <strong className={pDeficit > 0 ? "text-amber-500" : "text-emerald-500"}>{pDelivered}</strong>{" "}
                      {npkMode === "liquid" ? liquidTargetUnit : ` lbs`}
                    </span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-950 h-4 rounded-full overflow-hidden relative border border-zinc-200/50 dark:border-zinc-800/50 shadow-inner">
                    <div
                      style={{ width: `${pPercentMet}%` }}
                      className={`h-full rounded-full transition-all duration-500 shadow-sm ${
                        pDeficit > 0 ? "bg-amber-500" : "bg-emerald-500"
                      }`}
                    />
                    <span className="absolute inset-y-0 right-3 flex items-center text-[10px] font-black text-zinc-400">
                      {pPercentMet}% met
                    </span>
                  </div>
                </div>

                {/* Potassium Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-zinc-800 dark:text-zinc-200">Potassium (K₂O)</span>
                    <span className="text-zinc-500">
                      Target: <strong className="text-zinc-800 dark:text-zinc-200">{targetK}</strong> | Delivered:{" "}
                      <strong className={kDeficit > 0 ? "text-amber-500" : "text-emerald-500"}>{kDelivered}</strong>{" "}
                      {npkMode === "liquid" ? liquidTargetUnit : ` lbs`}
                    </span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-950 h-4 rounded-full overflow-hidden relative border border-zinc-200/50 dark:border-zinc-800/50 shadow-inner">
                    <div
                      style={{ width: `${kPercentMet}%` }}
                      className={`h-full rounded-full transition-all duration-500 shadow-sm ${
                        kDeficit > 0 ? "bg-amber-500" : "bg-emerald-500"
                      }`}
                    />
                    <span className="absolute inset-y-0 right-3 flex items-center text-[10px] font-black text-zinc-400">
                      {kPercentMet}% met
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 7: Deficiency Alerts & Advice */}
            {showWarning && (
              <div className="bg-amber-500/[0.02] border border-amber-500/20 rounded-3xl p-6 shadow-sm flex gap-4 items-start">
                <div className="text-2xl pt-0.5">⚠️</div>
                <div className="space-y-2">
                  <h4 className="text-sm font-extrabold text-amber-600 dark:text-amber-400">
                    Deficiencies Detected in Formulation
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                    Because you selected a single or unbalanced compound fertilizer source (<strong>{selectedFertilizerId === "custom" ? "Custom Grade" : fertilizer.name}</strong>), your targets are partially unfulfilled:
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-zinc-600 dark:text-zinc-400 font-bold">
                    {nDeficit > 0 && (
                      <li>Nitrogen Deficit: {nDeficit} {npkMode === "liquid" ? liquidTargetUnit : ` lbs`}. Consider adding a <strong>Urea</strong> or <strong>Ammonium Nitrate</strong> booster.</li>
                    )}
                    {pDeficit > 0 && (
                      <li>Phosphorus Deficit: {pDeficit} {npkMode === "liquid" ? liquidTargetUnit : ` lbs`}. Consider adding a <strong>TSP (Triple Superphosphate)</strong> or <strong>MAP</strong> booster.</li>
                    )}
                    {kDeficit > 0 && (
                      <li>Potassium Deficit: {kDeficit} {npkMode === "liquid" ? liquidTargetUnit : ` lbs`}. Consider adding a <strong>Potassium Sulfate (SOP)</strong> booster.</li>
                    )}
                  </ul>
                </div>
              </div>
            )}

            {/* Card 8: Step-by-Step Mixing Walkthrough */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="text-base font-extrabold text-zinc-900 dark:text-white">
                Agronomic Recipe & Mixing Guide
              </h3>

              <div className="relative border-l-2 border-zinc-100 dark:border-zinc-800 ml-3 pl-6 space-y-6">
                <div className="relative">
                  <div className="absolute top-0 -left-[31px] w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-900 shadow-sm" />
                  <h4 className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide">
                    Step 1: Set Reservoir Volume / Area
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1">
                    {npkMode === "liquid" ? (
                      <>Pour exactly <strong>{targetVolumeText}</strong> of clean, pure water (preferably RO or distilled water if doing hydroponics) into your mixing reservoir.</>
                    ) : (
                      <>Mark out the boundaries for the target application site measuring exactly <strong>{targetVolumeText}</strong>.</>
                    )}
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute top-0 -left-[31px] w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-900 shadow-sm" />
                  <h4 className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide">
                    Step 2: Weigh Dry Salt / Fertilizer
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1">
                    Using a precision scale, weigh exactly <strong>{requiredAmount.toFixed(2)} {npkMode === "liquid" ? "grams" : "pounds"}</strong> of <strong>{selectedFertilizerId === "custom" ? "Custom Fertilizer" : fertilizer.name}</strong> dry powder.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute top-0 -left-[31px] w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-900 shadow-sm" />
                  <h4 className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide">
                    Step 3: Dissolve & Distribute
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1">
                    {npkMode === "liquid" ? (
                      <>Add the weighed powder slowly to the water while stirring. Continue agitation for 2-3 minutes until all crystals dissolve completely.</>
                    ) : (
                      <>Add dry powder to a mechanical spreader calibrated for even flow, or dissolve in water for a liquid spray rig, and distribute uniformly across the entire zone.</>
                    )}
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute top-0 -left-[31px] w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-900 shadow-sm" />
                  <h4 className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide">
                    Step 4: Check Ratios and Supplemental Blends
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1">
                    Your base solution is ready! It provides a strength of{" "}
                    <strong>{nDelivered} {npkMode === "liquid" ? liquidTargetUnit : ` lbs`} N</strong>,{" "}
                    <strong>{pDelivered} {npkMode === "liquid" ? liquidTargetUnit : ` lbs`} P</strong>, and{" "}
                    <strong>{kDelivered} {npkMode === "liquid" ? liquidTargetUnit : ` lbs`} K</strong>.{" "}
                    {showWarning && (
                      <span className="text-amber-500 font-bold block mt-1.5">
                        ⚠️ Note: Supplement with Single-source Boosters to address the unfulfilled deficits identified above.
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // BMI Calculator
  if (toolSlug === "bmi-calculator") {
    const bmiResult = calculateBMI(parseFloat(weight) || 0, parseFloat(height) || 1);

    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-8 mb-8">
          <Link href="/" className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" /></svg>
            Back to Home
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Body Mass Index (BMI) Calculator</h1>
          <p className="text-sm text-zinc-500 mt-2">Instant assessment based on standard World Health Organization metrics.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase">Weight (kg)</label>
              <input type="range" min="30" max="150" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full accent-emerald-500 cursor-pointer" />
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold rounded-xl" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase">Height (cm)</label>
              <input type="range" min="100" max="220" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full accent-emerald-500 cursor-pointer" />
              <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold rounded-xl" />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className={`p-8 rounded-3xl border border-zinc-200/50 flex flex-col items-center justify-center text-center shadow-sm ${bmiResult.color}`}>
              <span className="text-sm font-bold uppercase tracking-wider opacity-85">BMI Index</span>
              <div className="text-5xl font-black mt-2">{bmiResult.bmi}</div>
              <div className="text-xl font-bold mt-3">{bmiResult.category}</div>
              <p className="text-xs mt-4 max-w-xs opacity-75">Healthy range: 18.5 – 24.9. Obese limits commence at 30.0.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mortgage Calculator
  if (toolSlug === "loan-mortgage-calculator") {
    const pVal = parseFloat(principal) || 0;
    const iVal = parseFloat(interestRate) || 0;
    const tVal = parseFloat(term) || 1;
    const mortgage = calculateMortgage(pVal, iVal, tVal);

    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-8 mb-8">
          <Link href="/" className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" /></svg>
            Back to Home
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Loan & Mortgage Calculator</h1>
          <p className="text-sm text-zinc-500 mt-1">Determine monthly mortgage principal and interest rates instantly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm space-y-4">
            <div>
              <label className="text-xs font-semibold text-zinc-500 uppercase block mb-1">Principal Amount ($)</label>
              <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold rounded-xl" />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-500 uppercase block mb-1">Interest Rate (%)</label>
              <input type="number" value={interestRate} step="0.1" onChange={(e) => setInterestRate(e.target.value)} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold rounded-xl" />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-500 uppercase block mb-1">Term (Years)</label>
              <input type="number" value={term} onChange={(e) => setTerm(e.target.value)} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold rounded-xl" />
            </div>
          </div>

          <div className="bg-emerald-500/[0.03] border border-emerald-500/10 rounded-3xl p-6 flex flex-col justify-center space-y-4">
            <div>
              <span className="text-xs font-semibold uppercase text-emerald-600 dark:text-emerald-400">Monthly Payment</span>
              <div className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50">${mortgage.monthlyPayment}</div>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-4">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-bold">Total Interest</span>
                <div className="font-bold text-zinc-800 dark:text-zinc-200">${mortgage.totalInterest}</div>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-bold">Total Cost</span>
                <div className="font-bold text-zinc-800 dark:text-zinc-200">${mortgage.totalPayment}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Compound Interest
  if (toolSlug === "compound-interest") {
    const interest = calculateCompoundInterest(
      parseFloat(savingsPrincipal) || 0,
      parseFloat(savingsRate) || 0,
      parseFloat(savingsYears) || 0,
      parseFloat(compPeriods) || 12
    );

    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-8 mb-8">
          <Link href="/" className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" /></svg>
            Back to Home
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Compound Interest Calculator</h1>
          <p className="text-sm text-zinc-500 mt-1">Estimate savings compounding growth over dynamic annual factors.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm space-y-4">
            <div>
              <label className="text-xs font-semibold text-zinc-500 uppercase block mb-1">Principal ($)</label>
              <input type="number" value={savingsPrincipal} onChange={(e) => setSavingsPrincipal(e.target.value)} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold rounded-xl" />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-500 uppercase block mb-1">Annual Rate (%)</label>
              <input type="number" value={savingsRate} step="0.1" onChange={(e) => setSavingsRate(e.target.value)} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold rounded-xl" />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-500 uppercase block mb-1">Time (Years)</label>
              <input type="number" value={savingsYears} onChange={(e) => setSavingsYears(e.target.value)} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-bold rounded-xl" />
            </div>
          </div>

          <div className="bg-emerald-500/[0.03] border border-emerald-500/10 rounded-3xl p-6 flex flex-col justify-center space-y-4">
            <div>
              <span className="text-xs font-semibold uppercase text-emerald-600 dark:text-emerald-400">Future Balance</span>
              <div className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50">${interest.finalAmount}</div>
            </div>
            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
              <span className="text-[10px] text-zinc-400 uppercase font-bold">Total Interest Earned</span>
              <div className="font-bold text-zinc-800 dark:text-zinc-200">${interest.totalInterest}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Roman Numerals
  if (toolSlug === "roman-numerals") {
    const romanStr = decimalToRoman(parseInt(romanVal) || 0);

    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-8 mb-8">
          <Link href="/" className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" /></svg>
            Back to Home
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Roman Numerals Converter</h1>
          <p className="text-sm text-zinc-500 mt-1">Convert standard integers to historical additive/subtractive Roman notation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm flex flex-col justify-center">
            <label className="text-xs font-semibold text-zinc-500 uppercase block mb-2">Integer Number (1 – 3999)</label>
            <input type="number" min="1" max="3999" value={romanVal} onChange={(e) => setRomanVal(e.target.value)} className="w-full h-12 px-3 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-black rounded-xl text-xl" />
          </div>

          <div className="bg-emerald-500/[0.03] border border-emerald-500/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-sm">
            <span className="text-xs font-semibold uppercase text-emerald-600 dark:text-emerald-400">Roman Notation</span>
            <div className="text-5xl font-black text-zinc-950 dark:text-zinc-50 mt-4 tracking-wider">{romanStr}</div>
          </div>
        </div>
      </div>
    );
  }

  // Standard Converter Workspace (e.g. meter-to-foot)
  const showComp = category.units.length > 1;
  const compData = showComp
    ? category.units.map((u) => ({
        unit: u,
        value:
          categorySlug === "temperature"
            ? convertTemperature(parseFloat(compValue) || 1, fromUnit, u.id)
            : convertStandard(parseFloat(compValue) || 1, fromUnit, u.id, categorySlug),
      }))
    : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-8 mb-10 transition-colors">
        <Link href={`/${categorySlug}`} className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" /></svg>
          Back to {category.name} Category
        </Link>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            {popularTool?.name || `${selectedFromUnit?.name} to ${selectedToUnit?.name}`} Converter
          </h1>
          <button onClick={handleToggleFav} className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-emerald-500 cursor-pointer bg-white dark:bg-zinc-900">
            <svg xmlns="http://www.w3.org/2000/svg" fill={isFav ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 ${isFav ? "text-emerald-500 fill-emerald-500" : ""}`}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
          </button>
        </div>
        <p className="text-zinc-500 mt-2 text-sm max-w-2xl leading-relaxed">
          {popularTool?.description || `High-precision solver for converting ${selectedFromUnit?.name} to ${selectedToUnit?.name}.`} Check the dynamic mathematics formula below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-9 gap-4 items-center">
              {/* From input */}
              <div className="sm:col-span-4 space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Input Amount</label>
                <div className="flex flex-col border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 rounded-2xl p-3">
                  <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="bg-transparent font-extrabold text-xl focus:outline-none w-full text-zinc-900 dark:text-white" />
                  <span className="text-xs font-bold text-zinc-500 mt-2">{selectedFromUnit?.name} ({selectedFromUnit?.symbol})</span>
                </div>
              </div>

              {/* Swap */}
              <div className="sm:col-span-1 flex justify-center pt-4">
                <button onClick={handleSwap} className="h-10 w-10 flex items-center justify-center rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-all cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3-16.5m0 0L21 12M3 4.5 21 12m0 0-5.625 7.5" /></svg>
                </button>
              </div>

              {/* To input */}
              <div className="sm:col-span-4 space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Output Result</label>
                <div className="flex flex-col border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 rounded-2xl p-3">
                  <div className="font-extrabold text-xl py-1 text-zinc-950 dark:text-white">
                    {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                  </div>
                  <span className="text-xs font-bold text-zinc-500 mt-2">{selectedToUnit?.name} ({selectedToUnit?.symbol})</span>
                </div>
              </div>
            </div>

            {/* Formula breakdown */}
            <div className="p-4 bg-emerald-500/[0.03] border border-emerald-500/10 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Real-time Step-by-Step Solver</span>
              <div className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 leading-relaxed">
                {getFormulaText()}
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                Formula Steps:{" "}
                {parseFloat(value) || 0} {selectedFromUnit?.symbol} ={" "}
                {result.toLocaleString(undefined, { maximumFractionDigits: 6 })} {selectedToUnit?.symbol}
              </div>
            </div>
          </div>

          {/* Special Custom Converter FAQ Section */}
          {popularTool?.faqs && popularTool.faqs.length > 0 && (
            <div className="bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">{popularTool.name} FAQs</h3>
              <div className="grid gap-4 mt-2">
                {popularTool.faqs.map((faq, i) => (
                  <div key={i} className="space-y-1">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{faq.q}</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Side-by-Side Comparison */}
        {showComp && (
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm space-y-6">
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  Comparison Grid
                </h3>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1">
                  Compare the output with other units in the {category.name} category.
                </p>
              </div>

              <div className="flex gap-2.5 bg-zinc-50 dark:bg-zinc-950 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 items-center">
                <input type="number" value={compValue} onChange={(e) => setCompValue(e.target.value)} className="w-12 bg-transparent font-bold text-sm text-zinc-900 dark:text-white focus:outline-none p-0 border-0" />
                <span className="text-xs font-bold text-zinc-400">{selectedFromUnit?.symbol} =</span>
              </div>

              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                {compData.map((item) => (
                  <div key={item.unit.id} className={`flex justify-between items-center p-2.5 rounded-lg border text-xs ${item.unit.id === toUnit ? "border-emerald-500/30 bg-emerald-500/[0.02]" : "border-zinc-100 dark:border-zinc-800"}`}>
                    <span className="font-bold text-zinc-500">{item.unit.name} ({item.unit.symbol})</span>
                    <span className="font-extrabold text-zinc-900 dark:text-zinc-100">{item.value.toLocaleString(undefined, { maximumFractionDigits: 5 })}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
