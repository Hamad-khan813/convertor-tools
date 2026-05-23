export type ConversionEntry = {
  from: string;
  to: string;
  // conversion function from value in 'from' unit to 'to' unit
  convert: (value: number) => number;
  // brief description/guide for the conversion pair
  guide: string;
};

export const conversionMap: ConversionEntry[] = [
  // Weight
  {
    from: 'kg',
    to: 'lbs',
    convert: (v) => v * 2.20462,
    guide: `**Kilograms to Pounds**\n\n1 kilogram equals 2.20462 pounds. This conversion is commonly used when moving between metric and imperial weight units.`,
  },
  {
    from: 'lbs',
    to: 'kg',
    convert: (v) => v / 2.20462,
    guide: `**Pounds to Kilograms**\n\n1 pound equals 0.453592 kilograms. Useful for scientific and cooking contexts where metric is preferred.`,
  },
  {
    from: 'grams',
    to: 'ounces',
    convert: (v) => v * 0.035274,
    guide: `**Grams to Ounces**\n\n1 gram equals 0.035274 ounces. Often needed for small weight measurements in recipes.`,
  },
  {
    from: 'ounces',
    to: 'grams',
    convert: (v) => v / 0.035274,
    guide: `**Ounces to Grams**\n\n1 ounce equals 28.3495 grams.`,
  },
  // Length
  {
    from: 'cm',
    to: 'inches',
    convert: (v) => v * 0.393701,
    guide: `**Centimeters to Inches**\n\n1 centimeter equals 0.393701 inches. Useful for converting measurements in construction and tailoring.`,
  },
  {
    from: 'inches',
    to: 'cm',
    convert: (v) => v / 0.393701,
    guide: `**Inches to Centimeters**\n\n1 inch equals 2.54 centimeters.`,
  },
  {
    from: 'mm',
    to: 'inches',
    convert: (v) => v * 0.0393701,
    guide: `**Millimeters to Inches**\n\n1 millimeter equals 0.0393701 inches.`,
  },
  {
    from: 'meters',
    to: 'feet',
    convert: (v) => v * 3.28084,
    guide: `**Meters to Feet**\n\n1 meter equals 3.28084 feet.`,
  },
  {
    from: 'feet',
    to: 'meters',
    convert: (v) => v / 3.28084,
    guide: `**Feet to Meters**\n\n1 foot equals 0.3048 meters.`,
  },
  {
    from: 'miles',
    to: 'km',
    convert: (v) => v * 1.60934,
    guide: `**Miles to Kilometers**\n\n1 mile equals 1.60934 kilometers.`,
  },
  {
    from: 'km',
    to: 'miles',
    convert: (v) => v / 1.60934,
    guide: `**Kilometers to Miles**\n\n1 kilometer equals 0.621371 miles.`,
  },
  // Temperature
  {
    from: 'celsius',
    to: 'fahrenheit',
    convert: (v) => (v * 9) / 5 + 32,
    guide: `**Celsius to Fahrenheit**\n\nFormula: (°C × 9/5) + 32 = °F.`,
  },
  {
    from: 'fahrenheit',
    to: 'celsius',
    convert: (v) => ((v - 32) * 5) / 9,
    guide: `**Fahrenheit to Celsius**\n\nFormula: (°F − 32) × 5/9 = °C.`,
  },
  {
    from: 'kelvin',
    to: 'celsius',
    convert: (v) => v - 273.15,
    guide: `**Kelvin to Celsius**\n\nSubtract 273.15 from Kelvin to get Celsius.`,
  },
  // Area
  {
    from: 'acres',
    to: 'sqft',
    convert: (v) => v * 43560,
    guide: `**Acres to Square Feet**\n\n1 acre equals 43,560 square feet.`,
  },
  {
    from: 'sqmeters',
    to: 'sqft',
    convert: (v) => v * 10.7639,
    guide: `**Square Meters to Square Feet**\n\n1 square meter equals 10.7639 square feet.`,
  },
  {
    from: 'hectares',
    to: 'acres',
    convert: (v) => v * 2.47105,
    guide: `**Hectares to Acres**\n\n1 hectare equals 2.47105 acres.`,
  },
  // Cooking (example entry – more can be added similarly)
  {
    from: 'cups',
    to: 'grams',
    convert: (v) => v * 236.588, // assuming water density; placeholder for generic
    guide: `**Cups to Grams**\n\nFor water, 1 cup ≈ 236.588 g. Adjust for ingredient density.`,
  },
  // Add more entries as needed for the top‑50 list
];

/**
 * Find conversion entry matching given from/to strings (case‑insensitive).
 */
export function findConversion(from: string, to: string) {
  const lowerFrom = from.toLowerCase();
  const lowerTo = to.toLowerCase();
  return conversionMap.find(
    (c) => c.from.toLowerCase() === lowerFrom && c.to.toLowerCase() === lowerTo,
  );
}
