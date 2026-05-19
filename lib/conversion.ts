import { categories } from "./tools-data";

// Standard ratio-based converter
export function convertStandard(
  value: number,
  fromUnitId: string,
  toUnitId: string,
  categorySlug: string
): number {
  const category = categories.find((c) => c.id === categorySlug);
  if (!category) return value;

  const fromUnit = category.units.find((u) => u.id === fromUnitId);
  const toUnit = category.units.find((u) => u.id === toUnitId);

  if (!fromUnit || !toUnit) return value;

  // Convert to base unit, then convert to target unit
  const baseValue = value * fromUnit.ratio;
  return baseValue / toUnit.ratio;
}

// Custom Temperature Converter
export function convertTemperature(value: number, from: string, to: string): number {
  if (from === to) return value;

  // Convert from input to Celsius
  let celsius = 0;
  switch (from) {
    case "C":
      celsius = value;
      break;
    case "F":
      celsius = ((value - 32) * 5) / 9;
      break;
    case "K":
      celsius = value - 273.15;
      break;
    case "R":
      celsius = ((value - 491.67) * 5) / 9;
      break;
    case "De":
      celsius = 100 - (value * 2) / 3;
      break;
    case "Re":
      celsius = value * 1.25;
      break;
    case "N":
      celsius = (value * 100) / 33;
      break;
    case "Ro":
      celsius = ((value - 7.5) * 40) / 21;
      break;
    default:
      celsius = value;
  }

  // Convert from Celsius to target
  switch (to) {
    case "C":
      return celsius;
    case "F":
      return (celsius * 9) / 5 + 32;
    case "K":
      return celsius + 273.15;
    case "R":
      return ((celsius + 273.15) * 9) / 5;
    case "De":
      return ((100 - celsius) * 3) / 2;
    case "Re":
      return celsius * 0.8;
    case "N":
      return (celsius * 33) / 100;
    case "Ro":
      return (celsius * 21) / 40 + 7.5;
    default:
      return celsius;
  }
}

// Advanced domain-specific calculators interfaces and functions

export interface NPKResult {
  fertilizerRequired: number; // lbs or kg
  bagAnalysis: {
    N: number;
    P2O5: number;
    K2O: number;
  };
  appliedNutrients: {
    N: number;
    P: number;
    K: number;
  };
  recommendation: string;
}

export function calculateNPK(
  areaSize: number, // in acres or sq ft
  areaUnit: "acres" | "sqft",
  nutrientN: number, // target nutrient rate (lbs/acre or lbs/1000 sq ft)
  nutrientP: number,
  nutrientK: number,
  bagN: number, // bag percentages (e.g. 10 for 10%)
  bagP: number,
  bagK: number
): NPKResult {
  // Convert percentages to decimals
  const pN = bagN / 100;
  const pP = bagP / 100;
  const pK = bagK / 100;

  // We primarily size the fertilizer rate based on the limiting/highest demand nutrient
  // Standard recommendation is to meet the Nitrogen requirement first
  let targetNutrient = nutrientN;
  let activePercentage = pN;

  if (activePercentage <= 0) {
    if (pP > 0) {
      targetNutrient = nutrientP;
      activePercentage = pP;
    } else if (pK > 0) {
      targetNutrient = nutrientK;
      activePercentage = pK;
    }
  }

  // Calculate fertilizer needed per unit area
  // E.g., if target is 1 lb N/1000 sqft and bag N is 10% (0.10)
  // we need 1 / 0.10 = 10 lbs of fertilizer per unit area.
  const ratePerUnitArea = activePercentage > 0 ? targetNutrient / activePercentage : 0;
  
  // Total fertilizer weight
  const totalFertilizer = ratePerUnitArea * areaSize;

  // Applied nutrients calculation
  const appliedN = totalFertilizer * pN;
  const appliedP = totalFertilizer * pP;
  const appliedK = totalFertilizer * pK;

  // Recommendations
  let rec = "Success! Applied fertilizer meets target levels. ";
  if (appliedP < nutrientP * areaSize) {
    const diff = (nutrientP * areaSize - appliedP).toFixed(1);
    rec += `Deficit of ${diff} units of Phosphate. Consider adding a single-nutrient P booster. `;
  }
  if (appliedK < nutrientK * areaSize) {
    const diff = (nutrientK * areaSize - appliedK).toFixed(1);
    rec += `Deficit of ${diff} units of Potash. Consider adding a Potassium booster. `;
  }

  return {
    fertilizerRequired: Number(totalFertilizer.toFixed(2)),
    bagAnalysis: { N: bagN, P2O5: bagP, K2O: bagK },
    appliedNutrients: {
      N: Number(appliedN.toFixed(2)),
      P: Number(appliedP.toFixed(2)),
      K: Number(appliedK.toFixed(2)),
    },
    recommendation: rec.trim(),
  };
}

export function calculateBMI(weight: number, heightCm: number): { bmi: number; category: string; color: string } {
  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);
  let category = "Normal weight";
  let color = "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20";

  if (bmi < 18.5) {
    category = "Underweight";
    color = "text-amber-500 bg-amber-50 dark:bg-amber-950/20";
  } else if (bmi >= 25 && bmi < 29.9) {
    category = "Overweight";
    color = "text-amber-600 bg-amber-50 dark:bg-amber-950/20";
  } else if (bmi >= 30) {
    category = "Obese";
    color = "text-red-500 bg-red-50 dark:bg-red-950/20";
  }

  return { bmi: Number(bmi.toFixed(1)), category, color };
}

export function calculateMortgage(
  principal: number,
  annualRate: number,
  termYears: number
): { monthlyPayment: number; totalPayment: number; totalInterest: number } {
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = termYears * 12;

  let monthlyPayment = 0;
  if (monthlyRate === 0) {
    monthlyPayment = principal / totalMonths;
  } else {
    monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  }

  const totalPayment = monthlyPayment * totalMonths;
  const totalInterest = totalPayment - principal;

  return {
    monthlyPayment: Number(monthlyPayment.toFixed(2)),
    totalPayment: Number(totalPayment.toFixed(2)),
    totalInterest: Number(totalInterest.toFixed(2)),
  };
}

export function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  years: number,
  compoundingPeriods: number = 12
): { finalAmount: number; totalInterest: number } {
  const r = annualRate / 100;
  const n = compoundingPeriods;
  const t = years;

  const finalAmount = principal * Math.pow(1 + r / n, n * t);
  const totalInterest = finalAmount - principal;

  return {
    finalAmount: Number(finalAmount.toFixed(2)),
    totalInterest: Number(totalInterest.toFixed(2)),
  };
}

export function decimalToRoman(num: number): string {
  if (num <= 0 || num > 3999) return "N/A (Range 1-3999)";
  const romanMap: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let result = "";
  let remaining = num;
  for (const [val, letter] of romanMap) {
    while (remaining >= val) {
      result += letter;
      remaining -= val;
    }
  }
  return result;
}
