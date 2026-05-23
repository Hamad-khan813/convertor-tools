import { categories } from "@/lib/tools-data";

export const siteBaseUrl = "https://convertortools.vercel.app";

export interface HubConversionLink {
  slug: string;
  label: string;
}

export interface HubPage {
  slug: string;
  category: string;
  title: string;
  description: string;
  pageTitle: string;
  popularConversions: HubConversionLink[];
  mostPopular: HubConversionLink[];
  callout?: string;
  extraParagraph?: string;
}

export interface ConversionPair {
  slug: string;
  fromSlug: string;
  toSlug: string;
  fromLabel: string;
  toLabel: string;
  fromSymbol: string;
  toSymbol: string;
  category: string;
  description: string;
  formula: string;
  exampleFormula: string;
  relatedSlugs: string[];
  faq: { q: string; a: string }[];
  keywords: string[];
  manualConversionType?: "ppm-mgl" | "kg-ha-to-lbs-acre" | "acre-lbs-to-kg-ha" | "ratio";
}

export interface SpecialAgriculturePage {
  slug: string;
  title: string;
  description: string;
  pageTitle: string;
  keywords: string[];
  faqs: { q: string; a: string }[];
  highlights: string[];
}

export const hubPages: HubPage[] = [
  {
    slug: "length-converter",
    category: "length",
    title: "Free Length Converter | Convert Meters, Feet, Inches | Convertly",
    pageTitle: "Length Converter — Free Online Length Conversion Tool",
    description:
      "Convert meters to feet, cm to inches, km to miles instantly. Accurate to NIST standards. No ads, no tracking.",
    popularConversions: [
      { slug: "convert/meters-to-feet", label: "Meters to Feet" },
      { slug: "convert/feet-to-meters", label: "Feet to Meters" },
      { slug: "convert/cm-to-inches", label: "Centimeters to Inches" },
      { slug: "convert/inches-to-cm", label: "Inches to Centimeters" },
      { slug: "convert/km-to-miles", label: "Kilometers to Miles" },
      { slug: "convert/miles-to-km", label: "Miles to Kilometers" },
      { slug: "convert/meters-to-yards", label: "Meters to Yards" },
      { slug: "convert/yards-to-meters", label: "Yards to Meters" },
      { slug: "convert/mm-to-inches", label: "Millimeters to Inches" },
      { slug: "convert/inches-to-mm", label: "Inches to Millimeters" }
    ],
    mostPopular: [
      { slug: "convert/meters-to-feet", label: "Meters → Feet" },
      { slug: "convert/km-to-miles", label: "Kilometers → Miles" },
      { slug: "convert/cm-to-inches", label: "Centimeters → Inches" },
      { slug: "convert/inches-to-cm", label: "Inches → Centimeters" }
    ]
  },
  {
    slug: "weight-converter",
    category: "weight",
    title: "Free Weight Converter | Convert kg, lbs, g, oz | Convertly",
    pageTitle: "Weight Converter — Free Online Weight Conversion Tool",
    description:
      "Convert kg to lbs, g to oz, stone to kg instantly. Accurate to NIST standards. No ads, no tracking.",
    popularConversions: [
      { slug: "convert/kg-to-lbs", label: "Kilograms to Pounds" },
      { slug: "convert/lbs-to-kg", label: "Pounds to Kilograms" },
      { slug: "convert/kg-to-g", label: "Kilograms to Grams" },
      { slug: "convert/g-to-kg", label: "Grams to Kilograms" },
      { slug: "convert/oz-to-g", label: "Ounces to Grams" },
      { slug: "convert/g-to-oz", label: "Grams to Ounces" },
      { slug: "convert/lbs-to-oz", label: "Pounds to Ounces" },
      { slug: "convert/oz-to-lbs", label: "Ounces to Pounds" },
      { slug: "convert/stone-to-kg", label: "Stone to Kilograms" },
      { slug: "convert/kg-to-stone", label: "Kilograms to Stone" }
    ],
    mostPopular: [
      { slug: "convert/kg-to-lbs", label: "kg → lbs" },
      { slug: "convert/lbs-to-kg", label: "lbs → kg" },
      { slug: "convert/kg-to-g", label: "kg → g" },
      { slug: "convert/oz-to-g", label: "oz → g" }
    ]
  },
  {
    slug: "temperature-converter",
    category: "temperature",
    title: "Free Temperature Converter | Convert Celsius, Fahrenheit, Kelvin | Convertly",
    pageTitle: "Temperature Converter — Free Online Temperature Conversion Tool",
    description:
      "Convert Celsius to Fahrenheit, Fahrenheit to Kelvin, Celsius to Kelvin instantly. Accurate to NIST standards. No ads, no tracking.",
    popularConversions: [
      { slug: "convert/celsius-to-fahrenheit", label: "Celsius to Fahrenheit" },
      { slug: "convert/fahrenheit-to-celsius", label: "Fahrenheit to Celsius" },
      { slug: "convert/celsius-to-kelvin", label: "Celsius to Kelvin" },
      { slug: "convert/kelvin-to-celsius", label: "Kelvin to Celsius" },
      { slug: "convert/fahrenheit-to-kelvin", label: "Fahrenheit to Kelvin" },
      { slug: "convert/kelvin-to-fahrenheit", label: "Kelvin to Fahrenheit" }
    ],
    mostPopular: [
      { slug: "convert/celsius-to-fahrenheit", label: "°C → °F" },
      { slug: "convert/fahrenheit-to-celsius", label: "°F → °C" },
      { slug: "convert/celsius-to-kelvin", label: "°C → K" }
    ]
  },
  {
    slug: "volume-converter",
    category: "volume",
    title: "Free Volume Converter | Convert Liters, Gallons, Cups | Convertly",
    pageTitle: "Volume Converter — Free Online Volume Conversion Tool",
    description:
      "Convert liters to gallons, cups to ml, liters to cups instantly. Accurate to NIST standards. No ads, no tracking.",
    popularConversions: [
      { slug: "convert/liters-to-gallons", label: "Liters to Gallons" },
      { slug: "convert/gallons-to-liters", label: "Gallons to Liters" },
      { slug: "convert/ml-to-oz", label: "Milliliters to Ounces" },
      { slug: "convert/oz-to-ml", label: "Ounces to Milliliters" },
      { slug: "convert/cups-to-ml", label: "Cups to Milliliters" },
      { slug: "convert/ml-to-cups", label: "Milliliters to Cups" },
      { slug: "convert/liters-to-cups", label: "Liters to Cups" },
      { slug: "convert/cups-to-liters", label: "Cups to Liters" }
    ],
    mostPopular: [
      { slug: "convert/liters-to-gallons", label: "L → gal" },
      { slug: "convert/gallons-to-liters", label: "gal → L" },
      { slug: "convert/cups-to-ml", label: "cups → ml" }
    ]
  },
  {
    slug: "area-converter",
    category: "area",
    title: "Free Area Converter | Convert Square Meters, Acres, Hectares | Convertly",
    pageTitle: "Area Converter — Free Online Area Conversion Tool",
    description:
      "Convert square meters to square feet, hectares to acres, square kilometers to square miles instantly. Accurate to NIST standards. No ads, no tracking.",
    popularConversions: [
      { slug: "convert/sqmeters-to-sqfeet", label: "Square Meters to Square Feet" },
      { slug: "convert/sqfeet-to-sqmeters", label: "Square Feet to Square Meters" },
      { slug: "convert/hectare-to-acre", label: "Hectares to Acres" },
      { slug: "convert/acre-to-hectare", label: "Acres to Hectares" },
      { slug: "convert/sqkm-to-sqmiles", label: "Square Kilometers to Square Miles" },
      { slug: "convert/sqmiles-to-sqkm", label: "Square Miles to Square Kilometers" }
    ],
    mostPopular: [
      { slug: "convert/hectare-to-acre", label: "ha → ac" },
      { slug: "convert/acre-to-hectare", label: "ac → ha" },
      { slug: "convert/sqmeters-to-sqfeet", label: "m² → ft²" }
    ]
  },
  {
    slug: "speed-converter",
    category: "speed",
    title: "Free Speed Converter | Convert km/h, mph, knots | Convertly",
    pageTitle: "Speed Converter — Free Online Speed Conversion Tool",
    description:
      "Convert km/h to mph, knots to m/s, mach to km/h instantly. Accurate to NIST standards. No ads, no tracking.",
    popularConversions: [
      { slug: "convert/kmh-to-mph", label: "km/h to mph" },
      { slug: "convert/mph-to-kmh", label: "mph to km/h" },
      { slug: "convert/knots-to-mps", label: "Knots to m/s" },
      { slug: "convert/feet-per-second-to-kmh", label: "ft/s to km/h" }
    ],
    mostPopular: [
      { slug: "convert/kmh-to-mph", label: "km/h → mph" },
      { slug: "convert/mph-to-kmh", label: "mph → km/h" },
      { slug: "convert/knots-to-mps", label: "knots → m/s" }
    ]
  },
  {
    slug: "pressure-converter",
    category: "pressure",
    title: "Free Pressure Converter | Convert PSI, Bar, Pascal | Convertly",
    pageTitle: "Pressure Converter — Free Online Pressure Conversion Tool",
    description:
      "Convert PSI to bar, pascal to atmospheres, mmHg to inHg instantly. Accurate to NIST standards. No ads, no tracking.",
    popularConversions: [
      { slug: "convert/bar-to-psi", label: "Bar to PSI" },
      { slug: "convert/psi-to-bar", label: "PSI to Bar" },
      { slug: "convert/pascal-to-atm", label: "Pascals to Atmospheres" },
      { slug: "convert/mmhg-to-inhg", label: "mmHg to inHg" }
    ],
    mostPopular: [
      { slug: "convert/bar-to-psi", label: "bar → psi" },
      { slug: "convert/psi-to-bar", label: "psi → bar" }
    ]
  },
  {
    slug: "energy-converter",
    category: "energy",
    title: "Free Energy Converter | Convert Joules, Calories, kWh | Convertly",
    pageTitle: "Energy Converter — Free Online Energy Conversion Tool",
    description:
      "Convert joules to calories, kWh to BTU, eV to joules instantly. Accurate to NIST standards. No ads, no tracking.",
    popularConversions: [
      { slug: "convert/joules-to-calories", label: "Joules to Calories" },
      { slug: "convert/calories-to-joules", label: "Calories to Joules" },
      { slug: "convert/kwh-to-btu", label: "kWh to BTU" },
      { slug: "convert/btu-to-kwh", label: "BTU to kWh" }
    ],
    mostPopular: [
      { slug: "convert/joules-to-calories", label: "J → cal" },
      { slug: "convert/kwh-to-btu", label: "kWh → BTU" }
    ]
  },
  {
    slug: "power-converter",
    category: "power",
    title: "Free Power Converter | Convert Watts, kW, Horsepower | Convertly",
    pageTitle: "Power Converter — Free Online Power Conversion Tool",
    description:
      "Convert watts to kilowatts, horsepower to watts, BTU/h to kW instantly. Accurate to NIST standards. No ads, no tracking.",
    popularConversions: [
      { slug: "convert/watt-to-kilowatt", label: "Watt to Kilowatt" },
      { slug: "convert/kilowatt-to-watt", label: "Kilowatt to Watt" },
      { slug: "convert/horsepower-to-watt", label: "Horsepower to Watt" },
      { slug: "convert/watt-to-horsepower", label: "Watt to Horsepower" }
    ],
    mostPopular: [
      { slug: "convert/watt-to-kilowatt", label: "W → kW" },
      { slug: "convert/horsepower-to-watt", label: "hp → W" }
    ]
  },
  {
    slug: "data-converter",
    category: "digital",
    title: "Free Data Converter | Convert Bytes, KB, MB, GB | Convertly",
    pageTitle: "Data Converter — Free Online Data Conversion Tool",
    description:
      "Convert bytes to KB, MB to GB, KB to MiB instantly. Accurate to NIST standards. No ads, no tracking.",
    popularConversions: [
      { slug: "convert/bytes-to-kb", label: "Bytes to KB" },
      { slug: "convert/kb-to-mb", label: "KB to MB" },
      { slug: "convert/mb-to-gb", label: "MB to GB" },
      { slug: "convert/gb-to-tb", label: "GB to TB" }
    ],
    mostPopular: [
      { slug: "convert/bytes-to-kb", label: "B → KB" },
      { slug: "convert/mb-to-gb", label: "MB → GB" }
    ]
  },
  {
    slug: "currency-converter",
    category: "finance",
    title: "Free Currency Converter | Convert Dollar, Euro, Pound | Convertly",
    pageTitle: "Currency Converter — Free Online Currency Conversion Tool",
    description:
      "Convert USD, EUR, GBP, JPY instantly using fast calculators. Accurate to NIST standards. No ads, no tracking.",
    popularConversions: [
      { slug: "convert/usd-to-eur", label: "USD to EUR" },
      { slug: "convert/eur-to-usd", label: "EUR to USD" },
      { slug: "convert/usd-to-gbp", label: "USD to GBP" },
      { slug: "convert/gbp-to-usd", label: "GBP to USD" }
    ],
    mostPopular: [
      { slug: "convert/usd-to-eur", label: "USD → EUR" },
      { slug: "convert/eur-to-usd", label: "EUR → USD" }
    ]
  },
  {
    slug: "time-converter",
    category: "time",
    title: "Free Time Converter | Convert Seconds, Minutes, Hours | Convertly",
    pageTitle: "Time Converter — Free Online Time Conversion Tool",
    description:
      "Convert seconds to minutes, hours to days, weeks to months instantly. Accurate to NIST standards. No ads, no tracking.",
    popularConversions: [
      { slug: "convert/seconds-to-minutes", label: "Seconds to Minutes" },
      { slug: "convert/minutes-to-hours", label: "Minutes to Hours" },
      { slug: "convert/hours-to-days", label: "Hours to Days" },
      { slug: "convert/days-to-weeks", label: "Days to Weeks" }
    ],
    mostPopular: [
      { slug: "convert/seconds-to-minutes", label: "s → min" },
      { slug: "convert/minutes-to-hours", label: "min → hr" }
    ]
  },
  {
    slug: "agriculture-converter",
    category: "agriculture",
    title: "Agriculture & Agronomy Unit Converter | NPK, PPM, Hectare Tools | Convertly",
    pageTitle: "Agriculture & Agronomy Unit Converter | NPK, PPM, Hectare Tools",
    description:
      "Specialized agricultural conversion tools for farmers, agronomists, and hydroponic growers. NPK blending, PPM calculations, and field-scale unit conversions.",
    callout:
      "Build fertilizer blends, convert field units, and calculate soil temperature or rainfall metrics with agriculture-grade formulas.",
    popularConversions: [
      { slug: "convert/tool/npk-ratio-calculator", label: "NPK Ratio Calculator" },
      { slug: "convert/ppm-to-mg-per-liter", label: "PPM to mg/L" },
      { slug: "convert/hectare-to-acre", label: "Hectare to Acre" },
      { slug: "convert/kg-per-hectare-to-lbs-per-acre", label: "kg/ha to lbs/acre" },
      { slug: "convert/tool/fertilizer-dose-calculator", label: "Fertilizer Dose Calculator" },
      { slug: "convert/celsius-to-fahrenheit-soil-temp", label: "Soil Temp °C to °F" },
      { slug: "convert/millimeter-to-inch-rainfall", label: "Rainfall mm to inches" }
    ],
    mostPopular: [
      { slug: "convert/tool/npk-ratio-calculator", label: "NPK Calculator" },
      { slug: "convert/hectare-to-acre", label: "ha → ac" },
      { slug: "convert/ppm-to-mg-per-liter", label: "PPM → mg/L" }
    ]
  }
];

export const conversionPairs: ConversionPair[] = [
  // Weight
  {
    slug: "kg-to-lbs",
    fromSlug: "kg",
    toSlug: "lb",
    fromLabel: "Kilogram",
    toLabel: "Pound",
    fromSymbol: "kg",
    toSymbol: "lb",
    category: "weight",
    description: "Convert kilograms to pounds instantly with NIST-calibrated precision.",
    formula: "Multiply kilograms by 2.20462262 to get pounds.",
    exampleFormula: "1 kg = 2.20462 lbs",
    relatedSlugs: ["lbs-to-kg", "kg-to-g", "g-to-kg", "kg-to-stone"],
    faq: [
      { q: "How many pounds is 1 kilogram?", a: "1 kilogram equals approximately 2.20462 pounds." },
      { q: "What formula converts kg to lbs?", a: "Multiply kilograms by 2.20462262 to get pounds." },
      { q: "Is a kilogram larger than a pound?", a: "Yes, a kilogram is about 2.2 times heavier than a pound." }
    ],
    keywords: ["kg to lbs", "kilogram to pound", "convert kg to lbs", "kg lbs converter"]
  },
  {
    slug: "lbs-to-kg",
    fromSlug: "lb",
    toSlug: "kg",
    fromLabel: "Pound",
    toLabel: "Kilogram",
    fromSymbol: "lb",
    toSymbol: "kg",
    category: "weight",
    description: "Convert pounds to kilograms instantly with precise, traceable conversion values.",
    formula: "Multiply pounds by 0.45359237 to get kilograms.",
    exampleFormula: "1 lb = 0.453592 kg",
    relatedSlugs: ["kg-to-lbs", "lbs-to-oz", "oz-to-lbs", "lbs-to-stone"],
    faq: [
      { q: "How many kilograms is 1 pound?", a: "1 pound is equal to about 0.453592 kilograms." },
      { q: "What is the formula for lbs to kg?", a: "Multiply pounds by 0.45359237." }
    ],
    keywords: ["lbs to kg", "pound to kilogram", "convert lbs to kg", "pound kg converter"]
  },
  {
    slug: "kg-to-g",
    fromSlug: "kg",
    toSlug: "g",
    fromLabel: "Kilogram",
    toLabel: "Gram",
    fromSymbol: "kg",
    toSymbol: "g",
    category: "weight",
    description: "Convert kilograms to grams instantly for lab, cooking, and science applications.",
    formula: "Multiply kilograms by 1000 to get grams.",
    exampleFormula: "1 kg = 1000 g",
    relatedSlugs: ["g-to-kg", "kg-to-lbs", "oz-to-g"],
    faq: [
      { q: "How many grams are in 1 kilogram?", a: "There are exactly 1,000 grams in 1 kilogram." },
      { q: "What is the kg to g formula?", a: "Multiply kilograms by 1000." }
    ],
    keywords: ["kg to g", "kilogram to gram", "convert kg to g", "kg g converter"]
  },
  {
    slug: "g-to-kg",
    fromSlug: "g",
    toSlug: "kg",
    fromLabel: "Gram",
    toLabel: "Kilogram",
    fromSymbol: "g",
    toSymbol: "kg",
    category: "weight",
    description: "Convert grams to kilograms instantly with accurate metric scaling.",
    formula: "Divide grams by 1000 to get kilograms.",
    exampleFormula: "1000 g = 1 kg",
    relatedSlugs: ["kg-to-g", "g-to-oz", "oz-to-g"],
    faq: [
      { q: "How many kilograms is 1000 grams?", a: "1000 grams equals 1 kilogram." },
      { q: "What is the g to kg formula?", a: "Divide grams by 1000." }
    ],
    keywords: ["g to kg", "gram to kilogram", "convert g to kg", "g kg converter"]
  },
  {
    slug: "oz-to-g",
    fromSlug: "oz",
    toSlug: "g",
    fromLabel: "Ounce",
    toLabel: "Gram",
    fromSymbol: "oz",
    toSymbol: "g",
    category: "weight",
    description: "Convert ounces to grams instantly for recipes, shipping, and small-mass metrics.",
    formula: "Multiply ounces by 28.3495 to get grams.",
    exampleFormula: "1 oz = 28.3495 g",
    relatedSlugs: ["g-to-oz", "oz-to-lbs", "kg-to-g"],
    faq: [
      { q: "How many grams are in 1 ounce?", a: "1 ounce is equal to approximately 28.3495 grams." },
      { q: "What is the oz to g formula?", a: "Multiply ounces by 28.3495." }
    ],
    keywords: ["oz to g", "ounce to gram", "convert oz to g", "oz g converter"]
  },
  {
    slug: "g-to-oz",
    fromSlug: "g",
    toSlug: "oz",
    fromLabel: "Gram",
    toLabel: "Ounce",
    fromSymbol: "g",
    toSymbol: "oz",
    category: "weight",
    description: "Convert grams to ounces instantly for ingredient weights and package sizing.",
    formula: "Divide grams by 28.3495 to get ounces.",
    exampleFormula: "28.3495 g = 1 oz",
    relatedSlugs: ["oz-to-g", "kg-to-g", "lbs-to-oz"],
    faq: [
      { q: "How many ounces are in 100 grams?", a: "100 grams is approximately 3.5274 ounces." },
      { q: "What is the g to oz formula?", a: "Divide grams by 28.3495." }
    ],
    keywords: ["g to oz", "gram to ounce", "convert g to oz", "gram oz converter"]
  },
  {
    slug: "lbs-to-oz",
    fromSlug: "lb",
    toSlug: "oz",
    fromLabel: "Pound",
    toLabel: "Ounce",
    fromSymbol: "lb",
    toSymbol: "oz",
    category: "weight",
    description: "Convert pounds to ounces instantly with precise imperial unit support.",
    formula: "Multiply pounds by 16 to get ounces.",
    exampleFormula: "1 lb = 16 oz",
    relatedSlugs: ["oz-to-lbs", "lbs-to-kg", "kg-to-lbs"],
    faq: [
      { q: "How many ounces are in a pound?", a: "There are exactly 16 ounces in a pound." },
      { q: "What is the lbs to oz formula?", a: "Multiply pounds by 16." }
    ],
    keywords: ["lbs to oz", "pound to ounce", "convert lbs to oz", "lb oz converter"]
  },
  {
    slug: "oz-to-lbs",
    fromSlug: "oz",
    toSlug: "lb",
    fromLabel: "Ounce",
    toLabel: "Pound",
    fromSymbol: "oz",
    toSymbol: "lb",
    category: "weight",
    description: "Convert ounces to pounds instantly for parcel, cooking, and shipping conversions.",
    formula: "Divide ounces by 16 to get pounds.",
    exampleFormula: "16 oz = 1 lb",
    relatedSlugs: ["lbs-to-oz", "oz-to-g", "kg-to-lbs"],
    faq: [
      { q: "How many pounds are in 16 ounces?", a: "There is exactly 1 pound in 16 ounces." },
      { q: "What is the oz to lbs formula?", a: "Divide ounces by 16." }
    ],
    keywords: ["oz to lbs", "ounce to pound", "convert oz to lbs", "oz lb converter"]
  },
  {
    slug: "stone-to-kg",
    fromSlug: "st",
    toSlug: "kg",
    fromLabel: "Stone",
    toLabel: "Kilogram",
    fromSymbol: "st",
    toSymbol: "kg",
    category: "weight",
    description: "Convert stone to kilograms for bodyweight, livestock, and UK imperial measurements.",
    formula: "Multiply stone by 6.35029318 to get kilograms.",
    exampleFormula: "1 st = 6.35029 kg",
    relatedSlugs: ["kg-to-stone", "lbs-to-kg"],
    faq: [
      { q: "How many kilograms are in a stone?", a: "One stone is equal to approximately 6.35029 kilograms." },
      { q: "What is the stone to kg formula?", a: "Multiply stone by 6.35029318." }
    ],
    keywords: ["stone to kg", "stone to kilogram", "convert stone to kg", "stone kg converter"]
  },
  {
    slug: "kg-to-stone",
    fromSlug: "kg",
    toSlug: "st",
    fromLabel: "Kilogram",
    toLabel: "Stone",
    fromSymbol: "kg",
    toSymbol: "st",
    category: "weight",
    description: "Convert kilograms to stones for UK bodyweight and livestock measurements.",
    formula: "Divide kilograms by 6.35029318 to get stones.",
    exampleFormula: "6.35029 kg = 1 st",
    relatedSlugs: ["stone-to-kg", "kg-to-lbs"],
    faq: [
      { q: "How many stones are in a kilogram?", a: "1 kilogram is approximately 0.157473 stones." },
      { q: "What is the kg to stone formula?", a: "Divide kilograms by 6.35029318." }
    ],
    keywords: ["kg to stone", "kilogram to stone", "convert kg to stone", "kg stone converter"]
  },

  // Temperature
  {
    slug: "celsius-to-fahrenheit",
    fromSlug: "C",
    toSlug: "F",
    fromLabel: "Celsius",
    toLabel: "Fahrenheit",
    fromSymbol: "°C",
    toSymbol: "°F",
    category: "temperature",
    description: "Convert Celsius to Fahrenheit instantly with the exact scientific formula.",
    formula: "Multiply Celsius by 9/5 and add 32.",
    exampleFormula: "1°C = 33.8°F",
    relatedSlugs: ["fahrenheit-to-celsius", "celsius-to-kelvin", "celsius-to-fahrenheit-soil-temp"],
    faq: [
      { q: "How do I convert Celsius to Fahrenheit?", a: "Multiply Celsius by 9/5, then add 32." },
      { q: "What is 0°C in Fahrenheit?", a: "0°C equals 32°F." }
    ],
    keywords: ["celsius to fahrenheit", "°c to °f", "convert celsius to fahrenheit"]
  },
  {
    slug: "fahrenheit-to-celsius",
    fromSlug: "F",
    toSlug: "C",
    fromLabel: "Fahrenheit",
    toLabel: "Celsius",
    fromSymbol: "°F",
    toSymbol: "°C",
    category: "temperature",
    description: "Convert Fahrenheit to Celsius instantly with precise temperature formulas.",
    formula: "Subtract 32 from Fahrenheit, then multiply by 5/9.",
    exampleFormula: "32°F = 0°C",
    relatedSlugs: ["celsius-to-fahrenheit", "fahrenheit-to-kelvin"],
    faq: [
      { q: "How do I convert Fahrenheit to Celsius?", a: "Subtract 32, then multiply by 5/9." },
      { q: "What is 100°F in Celsius?", a: "100°F equals 37.78°C." }
    ],
    keywords: ["fahrenheit to celsius", "°f to °c", "convert fahrenheit to celsius"]
  },
  {
    slug: "celsius-to-kelvin",
    fromSlug: "C",
    toSlug: "K",
    fromLabel: "Celsius",
    toLabel: "Kelvin",
    fromSymbol: "°C",
    toSymbol: "K",
    category: "temperature",
    description: "Convert Celsius to Kelvin instantly with absolute temperature precision.",
    formula: "Add 273.15 to the Celsius value.",
    exampleFormula: "0°C = 273.15 K",
    relatedSlugs: ["kelvin-to-celsius", "celsius-to-fahrenheit"],
    faq: [
      { q: "How do I convert Celsius to Kelvin?", a: "Add 273.15 to the Celsius temperature." },
      { q: "What is absolute zero in Celsius?", a: "Absolute zero is -273.15°C (0 K)." }
    ],
    keywords: ["celsius to kelvin", "°c to k", "convert celsius to kelvin"]
  },
  {
    slug: "kelvin-to-celsius",
    fromSlug: "K",
    toSlug: "C",
    fromLabel: "Kelvin",
    toLabel: "Celsius",
    fromSymbol: "K",
    toSymbol: "°C",
    category: "temperature",
    description: "Convert Kelvin to Celsius instantly with reliable scientific accuracy.",
    formula: "Subtract 273.15 from the Kelvin temperature.",
    exampleFormula: "273.15 K = 0°C",
    relatedSlugs: ["celsius-to-kelvin", "kelvin-to-fahrenheit"],
    faq: [
      { q: "How do I convert Kelvin to Celsius?", a: "Subtract 273.15 from Kelvin." },
      { q: "What is 300 K in Celsius?", a: "300 K equals 26.85°C." }
    ],
    keywords: ["kelvin to celsius", "k to celsius", "convert kelvin to celsius"]
  },
  {
    slug: "fahrenheit-to-kelvin",
    fromSlug: "F",
    toSlug: "K",
    fromLabel: "Fahrenheit",
    toLabel: "Kelvin",
    fromSymbol: "°F",
    toSymbol: "K",
    category: "temperature",
    description: "Convert Fahrenheit to Kelvin instantly with the exact temperature formula.",
    formula: "Subtract 32, multiply by 5/9, then add 273.15.",
    exampleFormula: "32°F = 273.15 K",
    relatedSlugs: ["kelvin-to-fahrenheit", "fahrenheit-to-celsius"],
    faq: [
      { q: "How do I convert Fahrenheit to Kelvin?", a: "Subtract 32, multiply by 5/9, then add 273.15." }
    ],
    keywords: ["fahrenheit to kelvin", "°f to k", "convert fahrenheit to kelvin"]
  },
  {
    slug: "kelvin-to-fahrenheit",
    fromSlug: "K",
    toSlug: "F",
    fromLabel: "Kelvin",
    toLabel: "Fahrenheit",
    fromSymbol: "K",
    toSymbol: "°F",
    category: "temperature",
    description: "Convert Kelvin to Fahrenheit instantly with absolute temperature precision.",
    formula: "Subtract 273.15, multiply by 9/5, then add 32.",
    exampleFormula: "273.15 K = 32°F",
    relatedSlugs: ["fahrenheit-to-kelvin", "kelvin-to-celsius"],
    faq: [
      { q: "How do I convert Kelvin to Fahrenheit?", a: "Subtract 273.15, multiply by 9/5, then add 32." }
    ],
    keywords: ["kelvin to fahrenheit", "k to °f", "convert kelvin to fahrenheit"]
  },

  // Length
  {
    slug: "meters-to-feet",
    fromSlug: "m",
    toSlug: "ft",
    fromLabel: "Meter",
    toLabel: "Foot",
    fromSymbol: "m",
    toSymbol: "ft",
    category: "length",
    description: "Convert meters to feet instantly using exact international measurement ratios.",
    formula: "Multiply meters by 3.280839895 to get feet.",
    exampleFormula: "1 m = 3.28084 ft",
    relatedSlugs: ["feet-to-meters", "cm-to-inches", "meters-to-yards"],
    faq: [
      { q: "How many feet are in 1 meter?", a: "1 meter equals approximately 3.28084 feet." },
      { q: "What is the formula for meters to feet?", a: "Multiply meters by 3.280839895." }
    ],
    keywords: ["meters to feet", "m to ft", "convert meters to feet"]
  },
  {
    slug: "feet-to-meters",
    fromSlug: "ft",
    toSlug: "m",
    fromLabel: "Foot",
    toLabel: "Meter",
    fromSymbol: "ft",
    toSymbol: "m",
    category: "length",
    description: "Convert feet to meters instantly for engineering, architecture, and travel conversions.",
    formula: "Multiply feet by 0.3048 to get meters.",
    exampleFormula: "1 ft = 0.3048 m",
    relatedSlugs: ["meters-to-feet", "inches-to-cm", "yards-to-meters"],
    faq: [
      { q: "How many meters are in a foot?", a: "1 foot equals exactly 0.3048 meters." },
      { q: "What is the formula for feet to meters?", a: "Multiply feet by 0.3048." }
    ],
    keywords: ["feet to meters", "ft to m", "convert ft to m"]
  },
  {
    slug: "cm-to-inches",
    fromSlug: "cm",
    toSlug: "in",
    fromLabel: "Centimeter",
    toLabel: "Inch",
    fromSymbol: "cm",
    toSymbol: "in",
    category: "length",
    description: "Convert centimeters to inches instantly for international measurements and tailoring.",
    formula: "Multiply centimeters by 0.393700787 to get inches.",
    exampleFormula: "1 cm = 0.3937 in",
    relatedSlugs: ["inches-to-cm", "meters-to-feet"],
    faq: [
      { q: "How many inches are in 1 centimeter?", a: "1 centimeter equals about 0.3937 inches." },
      { q: "What is the formula for cm to inches?", a: "Multiply centimeters by 0.393700787." }
    ],
    keywords: ["cm to inches", "centimeter to inch", "convert cm to in"]
  },
  {
    slug: "inches-to-cm",
    fromSlug: "in",
    toSlug: "cm",
    fromLabel: "Inch",
    toLabel: "Centimeter",
    fromSymbol: "in",
    toSymbol: "cm",
    category: "length",
    description: "Convert inches to centimeters instantly for printing, clothing, and plans.",
    formula: "Multiply inches by 2.54 to get centimeters.",
    exampleFormula: "1 in = 2.54 cm",
    relatedSlugs: ["cm-to-inches", "feet-to-meters"],
    faq: [
      { q: "How many centimeters are in 1 inch?", a: "1 inch is exactly 2.54 centimeters." },
      { q: "What is the formula for inches to cm?", a: "Multiply inches by 2.54." }
    ],
    keywords: ["inches to cm", "inch to centimeter", "convert in to cm"]
  },
  {
    slug: "km-to-miles",
    fromSlug: "km",
    toSlug: "mi",
    fromLabel: "Kilometer",
    toLabel: "Mile",
    fromSymbol: "km",
    toSymbol: "mi",
    category: "length",
    description: "Convert kilometers to miles instantly for running, travel, and mapping conversions.",
    formula: "Multiply kilometers by 0.621371192 to get miles.",
    exampleFormula: "1 km = 0.62137 mi",
    relatedSlugs: ["miles-to-km", "meters-to-feet"],
    faq: [
      { q: "How many miles are in 1 kilometer?", a: "1 kilometer equals about 0.62137 miles." },
      { q: "What is the formula for km to miles?", a: "Multiply kilometers by 0.621371192." }
    ],
    keywords: ["km to miles", "kilometer to mile", "convert km to miles"]
  },
  {
    slug: "miles-to-km",
    fromSlug: "mi",
    toSlug: "km",
    fromLabel: "Mile",
    toLabel: "Kilometer",
    fromSymbol: "mi",
    toSymbol: "km",
    category: "length",
    description: "Convert miles to kilometers instantly for distance conversions and route planning.",
    formula: "Multiply miles by 1.609344 to get kilometers.",
    exampleFormula: "1 mi = 1.60934 km",
    relatedSlugs: ["km-to-miles", "yards-to-meters"],
    faq: [
      { q: "How many kilometers are in 1 mile?", a: "1 mile equals 1.609344 kilometers." },
      { q: "What is the formula for miles to km?", a: "Multiply miles by 1.609344." }
    ],
    keywords: ["miles to km", "mile to kilometer", "convert miles to km"]
  },
  {
    slug: "meters-to-yards",
    fromSlug: "m",
    toSlug: "yd",
    fromLabel: "Meter",
    toLabel: "Yard",
    fromSymbol: "m",
    toSymbol: "yd",
    category: "length",
    description: "Convert meters to yards instantly for field layouts and construction prep.",
    formula: "Multiply meters by 1.0936133 to get yards.",
    exampleFormula: "1 m = 1.09361 yd",
    relatedSlugs: ["yards-to-meters", "meters-to-feet"],
    faq: [
      { q: "How many yards are in 1 meter?", a: "1 meter equals approximately 1.09361 yards." },
      { q: "What is the formula for meters to yards?", a: "Multiply meters by 1.0936133." }
    ],
    keywords: ["meters to yards", "m to yd", "convert meters to yards"]
  },
  {
    slug: "yards-to-meters",
    fromSlug: "yd",
    toSlug: "m",
    fromLabel: "Yard",
    toLabel: "Meter",
    fromSymbol: "yd",
    toSymbol: "m",
    category: "length",
    description: "Convert yards to meters instantly for sports fields, landscaping, and design.",
    formula: "Multiply yards by 0.9144 to get meters.",
    exampleFormula: "1 yd = 0.9144 m",
    relatedSlugs: ["meters-to-yards", "feet-to-meters"],
    faq: [
      { q: "How many meters are in 1 yard?", a: "1 yard equals 0.9144 meters." },
      { q: "What is the formula for yards to meters?", a: "Multiply yards by 0.9144." }
    ],
    keywords: ["yards to meters", "yd to m", "convert yards to meters"]
  },
  {
    slug: "mm-to-inches",
    fromSlug: "mm",
    toSlug: "in",
    fromLabel: "Millimeter",
    toLabel: "Inch",
    fromSymbol: "mm",
    toSymbol: "in",
    category: "length",
    description: "Convert millimeters to inches instantly for precision measurements and fabrication.",
    formula: "Multiply millimeters by 0.0393700787 to get inches.",
    exampleFormula: "1 mm = 0.03937 in",
    relatedSlugs: ["inches-to-mm", "cm-to-inches"],
    faq: [
      { q: "How many inches are in a millimeter?", a: "1 millimeter equals about 0.03937 inches." },
      { q: "What is the mm to inches formula?", a: "Multiply millimeters by 0.0393700787." }
    ],
    keywords: ["mm to inches", "millimeter to inch", "convert mm to inches"]
  },
  {
    slug: "inches-to-mm",
    fromSlug: "in",
    toSlug: "mm",
    fromLabel: "Inch",
    toLabel: "Millimeter",
    fromSymbol: "in",
    toSymbol: "mm",
    category: "length",
    description: "Convert inches to millimeters instantly for design, machining, and print layout.",
    formula: "Multiply inches by 25.4 to get millimeters.",
    exampleFormula: "1 in = 25.4 mm",
    relatedSlugs: ["mm-to-inches", "inches-to-cm"],
    faq: [
      { q: "How many millimeters are in an inch?", a: "1 inch equals exactly 25.4 millimeters." },
      { q: "What is the inches to mm formula?", a: "Multiply inches by 25.4." }
    ],
    keywords: ["inches to mm", "inch to millimeter", "convert in to mm"]
  },

  // Volume
  {
    slug: "liters-to-gallons",
    fromSlug: "l",
    toSlug: "gal",
    fromLabel: "Liter",
    toLabel: "Gallon",
    fromSymbol: "L",
    toSymbol: "gal",
    category: "volume",
    description: "Convert liters to gallons instantly for liquid volume and fuel conversions.",
    formula: "Multiply liters by 0.264172052 to get US gallons.",
    exampleFormula: "1 L = 0.26417 gal",
    relatedSlugs: ["gallons-to-liters", "liters-to-cups"],
    faq: [
      { q: "How many gallons are in a liter?", a: "1 liter equals approximately 0.264172 US gallons." },
      { q: "What is the liters to gallons formula?", a: "Multiply liters by 0.264172052." }
    ],
    keywords: ["liters to gallons", "l to gal", "convert liters to gallons"]
  },
  {
    slug: "gallons-to-liters",
    fromSlug: "gal",
    toSlug: "l",
    fromLabel: "Gallon",
    toLabel: "Liter",
    fromSymbol: "gal",
    toSymbol: "L",
    category: "volume",
    description: "Convert gallons to liters instantly for beverages, fuel, and chemistry volumes.",
    formula: "Multiply gallons by 3.785411784 to get liters.",
    exampleFormula: "1 gal = 3.78541 L",
    relatedSlugs: ["liters-to-gallons", "cups-to-liters"],
    faq: [
      { q: "How many liters are in a gallon?", a: "1 US liquid gallon equals 3.785411784 liters." },
      { q: "What is the gallons to liters formula?", a: "Multiply gallons by 3.785411784." }
    ],
    keywords: ["gallons to liters", "gal to l", "convert gallons to liters"]
  },
  {
    slug: "ml-to-oz",
    fromSlug: "ml",
    toSlug: "fl_oz",
    fromLabel: "Milliliter",
    toLabel: "Fluid Ounce",
    fromSymbol: "ml",
    toSymbol: "fl oz",
    category: "volume",
    description: "Convert milliliters to ounces instantly for recipes, liquids, and lab dosing.",
    formula: "Multiply milliliters by 0.0338140227 to get US fluid ounces.",
    exampleFormula: "1 mL = 0.033814 fl oz",
    relatedSlugs: ["oz-to-ml", "cups-to-ml"],
    faq: [
      { q: "How many ounces are in a milliliter?", a: "1 mL equals about 0.033814 US fluid ounces." },
      { q: "What is the ml to oz formula?", a: "Multiply milliliters by 0.0338140227." }
    ],
    keywords: ["ml to oz", "milliliter to ounce", "convert ml to oz"]
  },
  {
    slug: "oz-to-ml",
    fromSlug: "fl_oz",
    toSlug: "ml",
    fromLabel: "Fluid Ounce",
    toLabel: "Milliliter",
    fromSymbol: "fl oz",
    toSymbol: "ml",
    category: "volume",
    description: "Convert ounces to milliliters instantly for liquid measurement conversions.",
    formula: "Multiply ounces by 29.5735295625 to get milliliters.",
    exampleFormula: "1 oz = 29.5735 mL",
    relatedSlugs: ["ml-to-oz", "cups-to-ml"],
    faq: [
      { q: "How many milliliters are in 1 ounce?", a: "1 US fluid ounce is approximately 29.5735 milliliters." },
      { q: "What is the oz to ml formula?", a: "Multiply ounces by 29.5735295625." }
    ],
    keywords: ["oz to ml", "ounce to milliliter", "convert oz to ml"]
  },
  {
    slug: "cups-to-ml",
    fromSlug: "cup",
    toSlug: "ml",
    fromLabel: "Cup",
    toLabel: "Milliliter",
    fromSymbol: "cup",
    toSymbol: "ml",
    category: "volume",
    description: "Convert cups to milliliters instantly for cooking, chemistry, and beverage measures.",
    formula: "Multiply cups by 236.588 to get milliliters.",
    exampleFormula: "1 cup = 236.588 mL",
    relatedSlugs: ["ml-to-cups", "liters-to-cups"],
    faq: [
      { q: "How many milliliters in a cup?", a: "One US cup equals approximately 236.588 milliliters." },
      { q: "What is the cups to ml formula?", a: "Multiply cups by 236.588." }
    ],
    keywords: ["cups to ml", "cup to milliliter", "convert cups to ml"]
  },
  {
    slug: "ml-to-cups",
    fromSlug: "ml",
    toSlug: "cup",
    fromLabel: "Milliliter",
    toLabel: "Cup",
    fromSymbol: "ml",
    toSymbol: "cup",
    category: "volume",
    description: "Convert milliliters to cups instantly for recipe and kitchen conversions.",
    formula: "Divide milliliters by 236.588 to get cups.",
    exampleFormula: "236.588 mL = 1 cup",
    relatedSlugs: ["cups-to-ml", "liters-to-cups"],
    faq: [
      { q: "How many cups are in 500 milliliters?", a: "500 mL equals about 2.113 cups." },
      { q: "What is the ml to cups formula?", a: "Divide milliliters by 236.588." }
    ],
    keywords: ["ml to cups", "milliliter to cup", "convert ml to cups"]
  },
  {
    slug: "liters-to-cups",
    fromSlug: "l",
    toSlug: "cup",
    fromLabel: "Liter",
    toLabel: "Cup",
    fromSymbol: "L",
    toSymbol: "cup",
    category: "volume",
    description: "Convert liters to cups instantly for large liquid volumes and kitchen scaling.",
    formula: "Multiply liters by 4.22675284 to get cups.",
    exampleFormula: "1 L = 4.22675 cups",
    relatedSlugs: ["cups-to-liters", "liters-to-gallons"],
    faq: [
      { q: "How many cups are in 1 liter?", a: "1 liter equals about 4.22675 US cups." },
      { q: "What is the liters to cups formula?", a: "Multiply liters by 4.22675284." }
    ],
    keywords: ["liters to cups", "l to cups", "convert liters to cups"]
  },
  {
    slug: "cups-to-liters",
    fromSlug: "cup",
    toSlug: "l",
    fromLabel: "Cup",
    toLabel: "Liter",
    fromSymbol: "cup",
    toSymbol: "L",
    category: "volume",
    description: "Convert cups to liters instantly for recipes and fluid conversions.",
    formula: "Divide cups by 4.22675284 to get liters.",
    exampleFormula: "4.22675 cups = 1 L",
    relatedSlugs: ["liters-to-cups", "cups-to-ml"],
    faq: [
      { q: "How many liters are in 1 cup?", a: "1 US cup equals about 0.236588 liters." },
      { q: "What is the cups to liters formula?", a: "Divide cups by 4.22675284." }
    ],
    keywords: ["cups to liters", "cup to liter", "convert cups to liters"]
  },

  // Area
  {
    slug: "sqmeters-to-sqfeet",
    fromSlug: "sqm",
    toSlug: "sqft",
    fromLabel: "Square Meter",
    toLabel: "Square Foot",
    fromSymbol: "m²",
    toSymbol: "ft²",
    category: "area",
    description: "Convert square meters to square feet instantly for real estate and floor plans.",
    formula: "Multiply square meters by 10.76391 to get square feet.",
    exampleFormula: "1 m² = 10.7639 ft²",
    relatedSlugs: ["sqfeet-to-sqmeters", "hectare-to-acre"],
    faq: [
      { q: "How many square feet are in a square meter?", a: "1 square meter equals about 10.76391 square feet." },
      { q: "What is the sq meters to sq feet formula?", a: "Multiply square meters by 10.76391." }
    ],
    keywords: ["sqmeters to sqfeet", "square meter to square foot", "convert m2 to ft2"]
  },
  {
    slug: "sqfeet-to-sqmeters",
    fromSlug: "sqft",
    toSlug: "sqm",
    fromLabel: "Square Foot",
    toLabel: "Square Meter",
    fromSymbol: "ft²",
    toSymbol: "m²",
    category: "area",
    description: "Convert square feet to square meters instantly for international area conversions.",
    formula: "Multiply square feet by 0.09290304 to get square meters.",
    exampleFormula: "1 ft² = 0.092903 m²",
    relatedSlugs: ["sqmeters-to-sqfeet", "acre-to-hectare"],
    faq: [
      { q: "How many square meters are in a square foot?", a: "1 square foot equals 0.092903 square meters." },
      { q: "What is the sq feet to sq meters formula?", a: "Multiply square feet by 0.09290304." }
    ],
    keywords: ["sqfeet to sqmeters", "square foot to square meter"]
  },
  {
    slug: "hectare-to-acre",
    fromSlug: "hectare",
    toSlug: "acre",
    fromLabel: "Hectare",
    toLabel: "Acre",
    fromSymbol: "ha",
    toSymbol: "ac",
    category: "area",
    description: "Convert hectares to acres instantly for agricultural and land planning calculations.",
    formula: "Multiply hectares by 2.4710538 to get acres.",
    exampleFormula: "1 ha = 2.47105 ac",
    relatedSlugs: ["acre-to-hectare", "sqmeters-to-sqfeet"],
    faq: [
      { q: "How many acres are in a hectare?", a: "One hectare is equal to approximately 2.47105 acres." },
      { q: "What is the hectare to acre formula?", a: "Multiply hectares by 2.4710538." }
    ],
    keywords: ["hectare to acre", "ha to ac", "convert hectare to acre"]
  },
  {
    slug: "acre-to-hectare",
    fromSlug: "acre",
    toSlug: "hectare",
    fromLabel: "Acre",
    toLabel: "Hectare",
    fromSymbol: "ac",
    toSymbol: "ha",
    category: "area",
    description: "Convert acres to hectares instantly for farm area and plot sizing conversions.",
    formula: "Multiply acres by 0.40468564 to get hectares.",
    exampleFormula: "1 ac = 0.404686 ha",
    relatedSlugs: ["hectare-to-acre", "sqfeet-to-sqmeters"],
    faq: [
      { q: "How many hectares are in an acre?", a: "One acre equals about 0.404686 hectares." },
      { q: "What is the acre to hectare formula?", a: "Multiply acres by 0.40468564." }
    ],
    keywords: ["acre to hectare", "ac to ha", "convert acre to hectare"]
  },
  {
    slug: "sqkm-to-sqmiles",
    fromSlug: "sqkm",
    toSlug: "sqmi",
    fromLabel: "Square Kilometer",
    toLabel: "Square Mile",
    fromSymbol: "km²",
    toSymbol: "mi²",
    category: "area",
    description: "Convert square kilometers to square miles instantly for mapping and geography.",
    formula: "Multiply square kilometers by 0.3861021585 to get square miles.",
    exampleFormula: "1 km² = 0.38610 mi²",
    relatedSlugs: ["sqmiles-to-sqkm", "hectare-to-acre"],
    faq: [
      { q: "How many square miles are in a square kilometer?", a: "1 square kilometer equals about 0.386102 square miles." },
      { q: "What is the sq km to sq miles formula?", a: "Multiply sq km by 0.3861021585." }
    ],
    keywords: ["sqkm to sqmiles", "square kilometer to square mile"]
  },
  {
    slug: "sqmiles-to-sqkm",
    fromSlug: "sqmi",
    toSlug: "sqkm",
    fromLabel: "Square Mile",
    toLabel: "Square Kilometer",
    fromSymbol: "mi²",
    toSymbol: "km²",
    category: "area",
    description: "Convert square miles to square kilometers instantly for area comparisons.",
    formula: "Multiply square miles by 2.589988110336 to get square kilometers.",
    exampleFormula: "1 mi² = 2.58999 km²",
    relatedSlugs: ["sqkm-to-sqmiles", "acre-to-hectare"],
    faq: [
      { q: "How many square kilometers are in a square mile?", a: "1 square mile equals about 2.58999 square kilometers." },
      { q: "What is the sq miles to sq km formula?", a: "Multiply sq miles by 2.589988110336." }
    ],
    keywords: ["sqmiles to sqkm", "square mile to square kilometer"]
  },

  // Agriculture & specialized conversions
  {
    slug: "ppm-to-mg-per-liter",
    fromSlug: "ppm",
    toSlug: "mg-per-liter",
    fromLabel: "Parts per Million",
    toLabel: "Milligrams per Liter",
    fromSymbol: "ppm",
    toSymbol: "mg/L",
    category: "agriculture",
    description: "Convert PPM to mg/L instantly for water treatment and nutrient dosing calculations.",
    formula: "1 ppm equals 1 mg/L in water at standard density.",
    exampleFormula: "1 ppm = 1 mg/L",
    relatedSlugs: ["mg-per-liter-to-ppm", "celsius-to-fahrenheit-soil-temp"],
    faq: [
      { q: "How do I convert ppm to mg per liter?", a: "For water, 1 ppm is equivalent to 1 mg/L at standard density." },
      { q: "Why is ppm important for nutrient solutions?", a: "PPM measures solute concentration and helps growers dose fertilizers accurately." }
    ],
    keywords: ["ppm to mg per liter", "convert ppm to mg/l", "ppm mg/l calculator"],
    manualConversionType: "ppm-mgl"
  },
  {
    slug: "mg-per-liter-to-ppm",
    fromSlug: "mg-per-liter",
    toSlug: "ppm",
    fromLabel: "Milligrams per Liter",
    toLabel: "Parts per Million",
    fromSymbol: "mg/L",
    toSymbol: "ppm",
    category: "agriculture",
    description: "Convert mg/L to ppm instantly for water chemistry and fertilizer mixing.",
    formula: "1 mg/L equals 1 ppm in water at standard density.",
    exampleFormula: "1 mg/L = 1 ppm",
    relatedSlugs: ["ppm-to-mg-per-liter", "kg-per-hectare-to-lbs-per-acre"],
    faq: [
      { q: "How do I convert mg/L to ppm?", a: "For water, 1 mg/L equals 1 ppm at standard density." },
      { q: "Is mg/L the same as ppm?", a: "In dilute aqueous solutions, yes — they are equivalent for water." }
    ],
    keywords: ["mg per liter to ppm", "convert mg/l to ppm", "mg l ppm calculator"],
    manualConversionType: "ppm-mgl"
  },
  {
    slug: "hectare-to-acre",
    fromSlug: "hectare",
    toSlug: "acre",
    fromLabel: "Hectare",
    toLabel: "Acre",
    fromSymbol: "ha",
    toSymbol: "ac",
    category: "area",
    description: "Convert hectares to acres instantly for agricultural land conversions.",
    formula: "Multiply hectares by 2.4710538 to get acres.",
    exampleFormula: "1 ha = 2.47105 ac",
    relatedSlugs: ["acre-to-hectare", "sqmeters-to-sqfeet"],
    faq: [
      { q: "How many acres are in a hectare?", a: "One hectare equals approximately 2.47105 acres." },
      { q: "What is the formula for hectares to acres?", a: "Multiply hectares by 2.4710538." }
    ],
    keywords: ["hectare to acre", "ha to ac", "convert hectare to acre"]
  },
  {
    slug: "acre-to-hectare",
    fromSlug: "acre",
    toSlug: "hectare",
    fromLabel: "Acre",
    toLabel: "Hectare",
    fromSymbol: "ac",
    toSymbol: "ha",
    category: "area",
    description: "Convert acres to hectares instantly for agricultural and land use planning.",
    formula: "Multiply acres by 0.40468564 to get hectares.",
    exampleFormula: "1 ac = 0.404686 ha",
    relatedSlugs: ["hectare-to-acre", "sqfeet-to-sqmeters"],
    faq: [
      { q: "How many hectares are in an acre?", a: "One acre equals about 0.404686 hectares." },
      { q: "What is the formula for acres to hectares?", a: "Multiply acres by 0.40468564." }
    ],
    keywords: ["acre to hectare", "ac to ha", "convert acre to hectare"]
  },
  {
    slug: "kg-per-hectare-to-lbs-per-acre",
    fromSlug: "kg-per-hectare",
    toSlug: "lbs-per-acre",
    fromLabel: "Kilograms per Hectare",
    toLabel: "Pounds per Acre",
    fromSymbol: "kg/ha",
    toSymbol: "lbs/ac",
    category: "agriculture",
    description: "Convert kg/ha to lbs/acre instantly for agricultural nutrient rates.",
    formula: "Multiply kg/ha by 0.892179 to get lbs/acre.",
    exampleFormula: "1 kg/ha = 0.89218 lbs/ac",
    relatedSlugs: ["lbs-per-acre-to-kg-per-hectare", "hectare-to-acre"],
    faq: [
      { q: "How do I convert kg/ha to lbs/acre?", a: "Multiply kg/ha by 0.892179." },
      { q: "Why do I need this conversion?", a: "It helps compare nutrient application rates between metric and imperial farming systems." }
    ],
    keywords: ["kg per hectare to lbs per acre", "kg/ha to lbs/ac", "convert kg ha to lbs acre"],
    manualConversionType: "kg-ha-to-lbs-acre"
  },
  {
    slug: "lbs-per-acre-to-kg-per-hectare",
    fromSlug: "lbs-per-acre",
    toSlug: "kg-per-hectare",
    fromLabel: "Pounds per Acre",
    toLabel: "Kilograms per Hectare",
    fromSymbol: "lbs/ac",
    toSymbol: "kg/ha",
    category: "agriculture",
    description: "Convert lbs/acre to kg/ha instantly for nutrient and soil application comparisons.",
    formula: "Multiply lbs/acre by 1.120845 to get kg/ha.",
    exampleFormula: "1 lbs/ac = 1.12085 kg/ha",
    relatedSlugs: ["kg-per-hectare-to-lbs-per-acre", "acre-to-hectare"],
    faq: [
      { q: "How do I convert lbs/acre to kg/ha?", a: "Multiply lbs/acre by 1.120845." },
      { q: "Why convert between these units?", a: "This is useful when comparing fertilizer recommendations across imperial and metric farm systems." }
    ],
    keywords: ["lbs per acre to kg per hectare", "lbs/ac to kg/ha"],
    manualConversionType: "acre-lbs-to-kg-ha"
  },
  {
    slug: "celsius-to-fahrenheit-soil-temp",
    fromSlug: "C",
    toSlug: "F",
    fromLabel: "Celsius",
    toLabel: "Fahrenheit",
    fromSymbol: "°C",
    toSymbol: "°F",
    category: "temperature",
    description: "Convert soil temperature from Celsius to Fahrenheit instantly for agronomy and greenhouse use.",
    formula: "Multiply Celsius by 9/5 and add 32.",
    exampleFormula: "1°C = 33.8°F",
    relatedSlugs: ["celsius-to-fahrenheit", "ppm-to-mg-per-liter"],
    faq: [
      { q: "How do I convert soil temperature from Celsius to Fahrenheit?", a: "Use the standard formula: (°C × 9/5) + 32." },
      { q: "Is soil temperature measured the same as air temperature?", a: "Soil is measured in the same scale, but it changes more slowly than air temperature." }
    ],
    keywords: ["celsius to fahrenheit soil temp", "soil temperature converter"]
  },
  {
    slug: "millimeter-to-inch-rainfall",
    fromSlug: "mm",
    toSlug: "in",
    fromLabel: "Millimeter",
    toLabel: "Inch",
    fromSymbol: "mm",
    toSymbol: "in",
    category: "length",
    description: "Convert rainfall depth from millimeters to inches instantly for irrigation and climate reports.",
    formula: "Multiply millimeters by 0.0393701 to get inches.",
    exampleFormula: "1 mm = 0.03937 in",
    relatedSlugs: ["inch-to-mm-rainfall", "hectare-to-acre"],
    faq: [
      { q: "How do I convert rainfall from mm to inches?", a: "Multiply millimeters by 0.0393701." },
      { q: "Is 10 mm of rain a lot?", a: "10 mm equals about 0.39 inches — a moderate shower." }
    ],
    keywords: ["millimeter to inch rainfall", "mm to in rainfall", "convert rainfall mm to inches"]
  },
  {
    slug: "inch-to-mm-rainfall",
    fromSlug: "in",
    toSlug: "mm",
    fromLabel: "Inch",
    toLabel: "Millimeter",
    fromSymbol: "in",
    toSymbol: "mm",
    category: "length",
    description: "Convert rainfall depth from inches to millimeters instantly for irrigation planning.",
    formula: "Multiply inches by 25.4 to get millimeters.",
    exampleFormula: "1 in = 25.4 mm",
    relatedSlugs: ["millimeter-to-inch-rainfall", "acre-to-hectare"],
    faq: [
      { q: "How do I convert rainfall from inches to mm?", a: "Multiply inches by 25.4." },
      { q: "Is 1 inch of rain heavy?", a: "One inch of rain is a heavy downpour, equivalent to 25.4 mm." }
    ],
    keywords: ["inch to mm rainfall", "convert inch to mm rainfall"]
  }
];

export const agricultureSpecialPages: SpecialAgriculturePage[] = [
  {
    slug: "npk-ratio-calculator",
    pageTitle: "NPK Ratio Calculator | Convertly Agriculture Tool",
    title: "NPK Ratio Calculator | Convertly",
    description:
      "Calculate NPK fertilizer blend ratios quickly for crops, hydroponics, and field applications.",
    keywords: ["npk ratio calculator", "fertilizer ratio calculator", "calculate npk blend"],
    highlights: [
      "Automatically size nitrogen, phosphorus, and potassium ratios.",
      "Compare bag grade percentages using NPK formulas.",
      "Generate target fertilizer recommendations for farming and hydroponics."
    ],
    faqs: [
      { q: "What does NPK stand for?", a: "NPK stands for Nitrogen, Phosphorus, and Potassium — the three primary plant macronutrients." },
      { q: "How do I use an NPK ratio calculator?", a: "Enter your desired nutrient percentages and the tool computes the correct fertilizer blend amounts." }
    ]
  },
  {
    slug: "fertilizer-dose-calculator",
    pageTitle: "Fertilizer Dose Calculator | Convertly Agriculture Tool",
    title: "Fertilizer Dose Calculator | Convertly",
    description:
      "Quickly calculate fertilizer doses for field area, crop targets, and nutrient application rates.",
    keywords: ["fertilizer dose calculator", "fertilizer application rate", "calculate fertilizer dose"],
    highlights: [
      "Convert nutrient targets into bag doses, kg, and lb recommendations.",
      "Use area-based calculations for acres and hectares.",
      "Check balanced fertilizer dosing for field and greenhouse crops."
    ],
    faqs: [
      { q: "What is a fertilizer dose calculator?", a: "It converts target nutrient rates into actual fertilizer quantities for a given area." },
      { q: "Can I use it for both acres and hectares?", a: "Yes, the tool supports both imperial and metric farming units." }
    ]
  }
];

export function getHubPageBySlug(slug: string) {
  return hubPages.find((hub) => hub.slug === slug);
}

export function getConversionPairBySlug(slug: string) {
  return conversionPairs.find((pair) => pair.slug === slug);
}

export function getSpecialAgriculturePageBySlug(slug: string) {
  return agricultureSpecialPages.find((page) => page.slug === slug);
}

export function getAllHubSlugs() {
  return hubPages.map((hub) => hub.slug);
}

export function getAllConversionSlugs() {
  return conversionPairs.map((pair) => pair.slug);
}

export function getAllSpecialAgricultureSlugs() {
  return agricultureSpecialPages.map((page) => page.slug);
}

export function calculateManualConversion(value: number, type: "ppm-mgl" | "kg-ha-to-lbs-acre" | "acre-lbs-to-kg-ha" | "ratio") {
  switch (type) {
    case "ppm-mgl":
      return value;
    case "kg-ha-to-lbs-acre":
      return value * 0.892179;
    case "acre-lbs-to-kg-ha":
      return value * 1.120845;
    case "ratio":
      return value;
    default:
      return value;
  }
}
