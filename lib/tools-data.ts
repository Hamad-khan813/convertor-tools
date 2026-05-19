export interface Unit {
  id: string;
  name: string;
  symbol: string;
  ratio: number; // Ratio to base unit
  offset?: number; // Optional offset for temperature
}

export interface FAQ {
  q: string;
  a: string;
}

export interface PopularTool {
  id: string; // slug, e.g. "meter-to-foot"
  name: string; // e.g. "Meter to Foot Converter"
  fromUnit: string;
  toUnit: string;
  formula: string;
  description: string;
  faqs: FAQ[];
}

export interface Category {
  id: string; // slug, e.g. "length"
  name: string;
  icon: string; // Icon name
  description: string;
  baseUnit: string;
  units: Unit[];
  popularTools: PopularTool[];
}

export const categories: Category[] = [
  {
    id: "length",
    name: "Length & Distance",
    icon: "Ruler",
    description: "Convert between metric, imperial, and astronomical length and distance units including meters, feet, inches, miles, and light years.",
    baseUnit: "m",
    units: [
      { id: "mm", name: "Millimeter", symbol: "mm", ratio: 0.001 },
      { id: "cm", name: "Centimeter", symbol: "cm", ratio: 0.01 },
      { id: "m", name: "Meter", symbol: "m", ratio: 1 },
      { id: "km", name: "Kilometer", symbol: "km", ratio: 1000 },
      { id: "in", name: "Inch", symbol: "in", ratio: 0.0254 },
      { id: "ft", name: "Foot", symbol: "ft", ratio: 0.3048 },
      { id: "yd", name: "Yard", symbol: "yd", ratio: 0.9144 },
      { id: "mi", name: "Mile", symbol: "mi", ratio: 1609.344 },
      { id: "nmi", name: "Nautical Mile", symbol: "nmi", ratio: 1852 },
      { id: "ly", name: "Light Year", symbol: "ly", ratio: 9.4607304725808e15 },
      { id: "pc", name: "Parsec", symbol: "pc", ratio: 3.08567758149137e16 },
      { id: "au", name: "Astronomical Unit", symbol: "AU", ratio: 1.495978707e11 },
      { id: "ch", name: "Chain", symbol: "ch", ratio: 20.1168 },
      { id: "fur", name: "Furlong", symbol: "fur", ratio: 201.168 },
      { id: "rd", name: "Rod", symbol: "rd", ratio: 5.0292 },
      { id: "hand", name: "Hand", symbol: "hand", ratio: 0.1016 },
      { id: "cubit", name: "Cubit", symbol: "cubit", ratio: 0.4572 },
      { id: "span", name: "Span", symbol: "span", ratio: 0.2286 },
      { id: "cable", name: "Cable", symbol: "cable", ratio: 185.2 },
      { id: "fath", name: "Fathom", symbol: "fath", ratio: 1.8288 },
      { id: "l_p", name: "Planck Length", symbol: "ℓₚ", ratio: 1.616255e-35 }
    ],
    popularTools: [
      {
        id: "millimeter-to-centimeter",
        name: "Millimeter to Centimeter",
        fromUnit: "mm",
        toUnit: "cm",
        formula: "Divide the length value by 10",
        description: "Quickly convert millimeters to centimeters (mm to cm). Standard metric length conversion.",
        faqs: [
          { q: "How many centimeters are in a millimeter?", a: "There are 0.1 centimeters in a millimeter. To convert, divide by 10." },
          { q: "What is 10 mm in cm?", a: "10 mm equals 1 cm." }
        ]
      },
      {
        id: "centimeter-to-meter",
        name: "Centimeter to Meter",
        fromUnit: "cm",
        toUnit: "m",
        formula: "Divide the length value by 100",
        description: "Convert centimeters to meters (cm to m). Metric length units conversion.",
        faqs: [
          { q: "How many meters are in a centimeter?", a: "There are 0.01 meters in a centimeter. To convert, divide by 100." }
        ]
      },
      {
        id: "meter-to-kilometer",
        name: "Meter to Kilometer",
        fromUnit: "m",
        toUnit: "km",
        formula: "Divide the length value by 1000",
        description: "Convert meters to kilometers (m to km). Standard SI unit conversion.",
        faqs: [
          { q: "How do I convert meters to kilometers?", a: "Divide the number of meters by 1000. E.g., 5000 m = 5 km." }
        ]
      },
      {
        id: "inch-to-foot",
        name: "Inch to Foot",
        fromUnit: "in",
        toUnit: "ft",
        formula: "Divide the length value by 12",
        description: "Convert inches to feet (in to ft). Imperial measurement converter.",
        faqs: [
          { q: "How many inches in a foot?", a: "There are exactly 12 inches in a foot. To convert inches to feet, divide by 12." }
        ]
      },
      {
        id: "foot-to-yard",
        name: "Foot to Yard",
        fromUnit: "ft",
        toUnit: "yd",
        formula: "Divide the length value by 3",
        description: "Convert feet to yards (ft to yd). Imperial unit converter.",
        faqs: [
          { q: "How many feet make a yard?", a: "Exactly 3 feet make 1 yard." }
        ]
      },
      {
        id: "yard-to-mile",
        name: "Yard to Mile",
        fromUnit: "yd",
        toUnit: "mi",
        formula: "Divide the length value by 1760",
        description: "Convert yards to miles (yd to mi). Distance converter for imperial units.",
        faqs: [
          { q: "How many yards are in a mile?", a: "There are 1,760 yards in one mile." }
        ]
      },
      {
        id: "mile-to-kilometer",
        name: "Mile to Kilometer",
        fromUnit: "mi",
        toUnit: "km",
        formula: "Multiply the length value by 1.609344",
        description: "Convert miles to kilometers (mi to km). Inter-system distance conversion.",
        faqs: [
          { q: "What is the formula to convert miles to km?", a: "Multiply miles by 1.609344. E.g., 5 miles = 8.047 km." }
        ]
      },
      {
        id: "nautical-mile-converter",
        name: "Nautical Mile Converter",
        fromUnit: "nmi",
        toUnit: "km",
        formula: "Multiply the distance value by 1.852",
        description: "Convert nautical miles to kilometers or other units. Crucial for aviation and marine navigation.",
        faqs: [
          { q: "What is a nautical mile in km?", a: "One nautical mile is exactly 1.852 kilometers (or 1,852 meters)." }
        ]
      },
      {
        id: "meter-to-foot",
        name: "Meter to Foot",
        fromUnit: "m",
        toUnit: "ft",
        formula: "Multiply the length by 3.280839895",
        description: "Convert meters to feet (m to ft) instantly. Very popular converter for construction, height, and mapping.",
        faqs: [
          { q: "How many feet are in 1 meter?", a: "There are 3.28084 feet in 1 meter. To convert, multiply meters by 3.28084." },
          { q: "Is a meter bigger than a foot?", a: "Yes, 1 meter is about 3.28 feet, which makes it more than three times larger." }
        ]
      }
    ]
  },
  {
    id: "weight",
    name: "Weight & Mass",
    icon: "Scale",
    description: "Convert between metric and imperial weight/mass units, including kilograms, grams, pounds, ounces, and tons.",
    baseUnit: "kg",
    units: [
      { id: "mcg", name: "Microgram", symbol: "mcg", ratio: 1e-9 },
      { id: "mg", name: "Milligram", symbol: "mg", ratio: 0.000001 },
      { id: "g", name: "Gram", symbol: "g", ratio: 0.001 },
      { id: "kg", name: "Kilogram", symbol: "kg", ratio: 1 },
      { id: "t", name: "Metric Ton", symbol: "t", ratio: 1000 },
      { id: "oz", name: "Ounce", symbol: "oz", ratio: 0.028349523125 },
      { id: "lb", name: "Pound", symbol: "lb", ratio: 0.45359237 },
      { id: "st", name: "Stone", symbol: "st", ratio: 6.35029318 },
      { id: "ct", name: "Carat", symbol: "ct", ratio: 0.0002 },
      { id: "gr", name: "Grain", symbol: "gr", ratio: 0.00006479891 },
      { id: "ozt", name: "Troy Ounce", symbol: "ozt", ratio: 0.0311034768 },
      { id: "slug", name: "Slug", symbol: "slug", ratio: 14.5939029 },
      { id: "u", name: "Atomic Mass Unit", symbol: "u", ratio: 1.6605390666e-27 },
      { id: "q", name: "Quintal", symbol: "q", ratio: 100 },
      { id: "cwt", name: "Hundredweight (US)", symbol: "cwt", ratio: 45.359237 },
      { id: "dr", name: "Dram", symbol: "dr", ratio: 0.0017718451953125 },
      { id: "dwt", name: "Pennyweight", symbol: "dwt", ratio: 0.00155517384 },
      { id: "lton", name: "Long Ton (UK)", symbol: "lton", ratio: 1016.0469088 },
      { id: "ston", name: "Short Ton (US)", symbol: "ston", ratio: 907.18474 },
      { id: "msun", name: "Solar Mass", symbol: "M☉", ratio: 1.98847e30 }
    ],
    popularTools: [
      {
        id: "gram-to-kilogram",
        name: "Gram to Kilogram",
        fromUnit: "g",
        toUnit: "kg",
        formula: "Divide the mass value by 1000",
        description: "Convert grams to kilograms (g to kg). Standard metric mass conversion.",
        faqs: [{ q: "How many grams are in a kilogram?", a: "There are 1000 grams in a kilogram. E.g., 2500 g = 2.5 kg." }]
      },
      {
        id: "kilogram-to-metric-ton",
        name: "Kilogram to Metric Ton",
        fromUnit: "kg",
        toUnit: "t",
        formula: "Divide the mass value by 1000",
        description: "Convert kilograms to metric tons (kg to t). For heavy mass calculations.",
        faqs: [{ q: "How many kg are in a ton?", a: "There are 1000 kilograms in a metric ton." }]
      },
      {
        id: "ounce-to-pound",
        name: "Ounce to Pound",
        fromUnit: "oz",
        toUnit: "lb",
        formula: "Divide the mass value by 16",
        description: "Convert ounces to pounds (oz to lb). Standard imperial mass converter.",
        faqs: [{ q: "How many ounces in a pound?", a: "There are exactly 16 ounces in a pound." }]
      },
      {
        id: "pound-to-stone",
        name: "Pound to Stone",
        fromUnit: "lb",
        toUnit: "st",
        formula: "Divide the mass value by 14",
        description: "Convert pounds to stones (lb to st). Widely used in the UK for human body weight.",
        faqs: [{ q: "How many pounds in a stone?", a: "There are exactly 14 pounds in one stone." }]
      },
      {
        id: "kg-to-lbs",
        name: "Kilogram to Pound",
        fromUnit: "kg",
        toUnit: "lb",
        formula: "Divide the mass value by 0.45359237 or multiply by 2.20462262",
        description: "Convert kilograms to pounds (kg to lbs) quickly. Essential for fitness, luggage weight, and international travel.",
        faqs: [
          { q: "How many pounds in 1 kg?", a: "1 kilogram is equal to approximately 2.20462 pounds. Multiply kilograms by 2.20462 to get pounds." },
          { q: "What is 75 kg in lbs?", a: "75 kg is equal to about 165.35 lbs." }
        ]
      }
    ]
  },
  {
    id: "volume",
    name: "Volume & Capacity",
    icon: "Volume2",
    description: "Convert between cubic measurements and fluid capacity units including liters, milliliters, gallons, cups, and cubic feet.",
    baseUnit: "l",
    units: [
      { id: "ml", name: "Milliliter", symbol: "ml", ratio: 0.001 },
      { id: "l", name: "Liter", symbol: "L", ratio: 1 },
      { id: "m3", name: "Cubic Meter", symbol: "m³", ratio: 1000 },
      { id: "tsp", name: "Teaspoon (US)", symbol: "tsp", ratio: 0.00492892159375 },
      { id: "tbsp", name: "Tablespoon (US)", symbol: "tbsp", ratio: 0.01478676478125 },
      { id: "cup", name: "Cup (US)", symbol: "cup", ratio: 0.2365882365 },
      { id: "pt", name: "Pint (US)", symbol: "pt", ratio: 0.473176473 },
      { id: "qt", name: "Quart (US)", symbol: "qt", ratio: 0.946352946 },
      { id: "gal", name: "Gallon (US)", symbol: "gal", ratio: 3.785411784 },
      { id: "in3", name: "Cubic Inch", symbol: "in³", ratio: 0.016387064 },
      { id: "ft3", name: "Cubic Foot", symbol: "ft³", ratio: 28.316846592 },
      { id: "yd3", name: "Cubic Yard", symbol: "yd³", ratio: 764.554857984 },
      { id: "bbl", name: "Oil Barrel", symbol: "bbl", ratio: 158.987294928 },
      { id: "fl_oz", name: "Fluid Ounce (US)", symbol: "fl oz", ratio: 0.0295735295625 },
      { id: "ac_ft", name: "Acre-Foot", symbol: "ac-ft", ratio: 1233481.8375475 },
      { id: "bu", name: "Bushel (US)", symbol: "bu", ratio: 35.23907016688 },
      { id: "pk", name: "Peck", symbol: "pk", ratio: 8.80976754172 },
      { id: "cord", name: "Cord (firewood)", symbol: "cord", ratio: 3624.556363776 },
      { id: "hl", name: "Hectoliter", symbol: "hl", ratio: 100 },
      { id: "dl", name: "Deciliter", symbol: "dl", ratio: 0.1 }
    ],
    popularTools: [
      {
        id: "milliliter-to-liter",
        name: "Milliliter to Liter",
        fromUnit: "ml",
        toUnit: "l",
        formula: "Divide by 1000",
        description: "Convert milliliters to liters (ml to L) quickly and easily.",
        faqs: [{ q: "How many ml is 1 L?", a: "There are exactly 1000 milliliters in 1 liter." }]
      },
      {
        id: "gallon-to-liter",
        name: "Gallon to Liter",
        fromUnit: "gal",
        toUnit: "l",
        formula: "Multiply by 3.785411784",
        description: "Convert US liquid gallons to liters (gal to L). Very useful for fuel and chemical volume estimates.",
        faqs: [
          { q: "How many liters are in a US gallon?", a: "A US liquid gallon is exactly 3.785411784 liters. To convert, multiply by 3.7854." }
        ]
      }
    ]
  },
  {
    id: "area",
    name: "Area",
    icon: "Grid",
    description: "Convert land, surface, and floor area measurements between square meters, square feet, acres, hectares, and more.",
    baseUnit: "m2",
    units: [
      { id: "m2", name: "Square Meter", symbol: "m²", ratio: 1 },
      { id: "ft2", name: "Square Foot", symbol: "ft²", ratio: 0.09290304 },
      { id: "yd2", name: "Square Yard", symbol: "yd²", ratio: 0.83612736 },
      { id: "ac", name: "Acre", symbol: "ac", ratio: 4046.8564224 },
      { id: "ha", name: "Hectare", symbol: "ha", ratio: 10000 },
      { id: "km2", name: "Square Kilometer", symbol: "km²", ratio: 1000000 },
      { id: "mi2", name: "Square Mile", symbol: "mi²", ratio: 2589988.110336 },
      { id: "in2", name: "Square Inch", symbol: "in²", ratio: 0.00064516 },
      { id: "cm2", name: "Square Centimeter", symbol: "cm²", ratio: 0.0001 },
      { id: "are", name: "Are", symbol: "a", ratio: 100 },
      { id: "rood", name: "Rood", symbol: "rood", ratio: 1011.7141056 },
      { id: "perch", name: "Perch", symbol: "perch", ratio: 25.29285264 },
      { id: "guntha", name: "Guntha", symbol: "guntha", ratio: 101.17 },
      { id: "bigha", name: "Bigha", symbol: "bigha", ratio: 1618.7 },
      { id: "marla", name: "Marla", symbol: "marla", ratio: 25.2929 },
      { id: "sq_rd", name: "Square Rod", symbol: "sq rd", ratio: 25.29285264 },
      { id: "cmil", name: "Circular Mil", symbol: "cmil", ratio: 5.06707479e-10 },
      { id: "barn", name: "Barn", symbol: "b", ratio: 1e-28 },
      { id: "section", name: "Section", symbol: "section", ratio: 2589988.110336 },
      { id: "township", name: "Township", symbol: "twp", ratio: 93239571.972096 }
    ],
    popularTools: [
      {
        id: "square-meter-to-square-foot",
        name: "Square Meter to Square Foot",
        fromUnit: "m2",
        toUnit: "ft2",
        formula: "Multiply by 10.76391",
        description: "Convert square meters to square feet (sq m to sq ft). Essential for real estate and construction floor space.",
        faqs: [{ q: "How many square feet are in a square meter?", a: "There are approximately 10.76391 square feet in one square meter." }]
      },
      {
        id: "acre-to-hectare",
        name: "Acre to Hectare",
        fromUnit: "ac",
        toUnit: "ha",
        formula: "Divide by 2.4710538 or multiply by 0.40468564",
        description: "Convert acres to hectares (ac to ha). Standard agricultural land area conversion.",
        faqs: [
          { q: "How many hectares in an acre?", a: "One acre is about 0.4047 hectares. To convert acres to hectares, multiply by 0.404686." },
          { q: "Is an acre bigger than a hectare?", a: "No, a hectare is much larger. 1 hectare equals 2.47 acres." }
        ]
      }
    ]
  },
  {
    id: "temperature",
    name: "Temperature",
    icon: "Thermometer",
    description: "Convert temperatures between Celsius, Fahrenheit, Kelvin, Rankine, and lesser-known historical units.",
    baseUnit: "C",
    units: [
      { id: "C", name: "Celsius", symbol: "°C", ratio: 1 },
      { id: "F", name: "Fahrenheit", symbol: "°F", ratio: 1 },
      { id: "K", name: "Kelvin", symbol: "K", ratio: 1 },
      { id: "R", name: "Rankine", symbol: "°R", ratio: 1 },
      { id: "De", name: "Delisle", symbol: "°De", ratio: 1 },
      { id: "Re", name: "Réaumur", symbol: "°Re", ratio: 1 },
      { id: "N", name: "Newton", symbol: "°N", ratio: 1 },
      { id: "Ro", name: "Rømer", symbol: "°Rø", ratio: 1 }
    ],
    popularTools: [
      {
        id: "celsius-to-fahrenheit",
        name: "Celsius to Fahrenheit",
        fromUnit: "C",
        toUnit: "F",
        formula: "(°C × 9/5) + 32",
        description: "Convert Celsius to Fahrenheit (°C to °F) instantly. Most popular global weather temperature converter.",
        faqs: [
          { q: "How do I convert Celsius to Fahrenheit?", a: "Multiply the Celsius temperature by 1.8 (or 9/5) and add 32. For example, 20°C = (20 * 1.8) + 32 = 68°F." },
          { q: "At what temperature are Celsius and Fahrenheit equal?", a: "They are equal at -40 degrees (-40°C = -40°F)." }
        ]
      },
      {
        id: "celsius-to-kelvin",
        name: "Celsius to Kelvin",
        fromUnit: "C",
        toUnit: "K",
        formula: "°C + 273.15",
        description: "Convert Celsius to Kelvin (°C to K). Critical for physics, thermodynamics, and chemistry calculations.",
        faqs: [{ q: "How do I convert Celsius to Kelvin?", a: "Add 273.15 to the Celsius value. E.g., 0°C = 273.15 K." }]
      }
    ]
  },
  {
    id: "speed",
    name: "Speed & Velocity",
    icon: "Gauge",
    description: "Convert speeds between km/h, mph, knots, speed of light, and and other automotive, aviation, and science velocity units.",
    baseUnit: "m/s",
    units: [
      { id: "mps", name: "Meters per Second", symbol: "m/s", ratio: 1 },
      { id: "kmh", name: "Kilometers per Hour", symbol: "km/h", ratio: 0.277777778 },
      { id: "mph", name: "Miles per Hour", symbol: "mph", ratio: 0.44704 },
      { id: "knot", name: "Knot", symbol: "kt", ratio: 0.514444444 },
      { id: "fps", name: "Feet per Second", symbol: "ft/s", ratio: 0.3048 },
      { id: "c", name: "Speed of Light", symbol: "c", ratio: 299792458 },
      { id: "mach", name: "Mach (Sound Speed)", symbol: "M", ratio: 340.29 }
    ],
    popularTools: [
      {
        id: "kmh-to-mph",
        name: "km/h to mph",
        fromUnit: "kmh",
        toUnit: "mph",
        formula: "Divide the speed value by 1.609344",
        description: "Convert kilometers per hour to miles per hour (km/h to mph) for vehicle speedometer conversions.",
        faqs: [{ q: "How many mph in a km/h?", a: "1 km/h is about 0.621371 mph. To convert, multiply km/h by 0.621371." }]
      }
    ]
  },
  {
    id: "time",
    name: "Time & Duration",
    icon: "Clock",
    description: "Convert durations from seconds and minutes to age, pay-roll calculations, and custom time indicators.",
    baseUnit: "s",
    units: [
      { id: "s", name: "Second", symbol: "s", ratio: 1 },
      { id: "min", name: "Minute", symbol: "min", ratio: 60 },
      { id: "h", name: "Hour", symbol: "h", ratio: 3600 },
      { id: "d", name: "Day", symbol: "d", ratio: 86400 },
      { id: "w", name: "Week", symbol: "w", ratio: 604800 },
      { id: "mo", name: "Month (avg)", symbol: "mo", ratio: 2629746 },
      { id: "y", name: "Year (calendar)", symbol: "yr", ratio: 31536000 }
    ],
    popularTools: [
      {
        id: "second-to-minute",
        name: "Second to Minute",
        fromUnit: "s",
        toUnit: "min",
        formula: "Divide by 60",
        description: "Convert seconds to minutes (s to min). Quick time converter.",
        faqs: [{ q: "How many seconds in a minute?", a: "There are exactly 60 seconds in a minute." }]
      }
    ]
  },
  {
    id: "pressure",
    name: "Pressure",
    icon: "Activity",
    description: "Convert engineering pressure values including pascals, bars, psi, and atmosphere specifications.",
    baseUnit: "Pa",
    units: [
      { id: "Pa", name: "Pascal", symbol: "Pa", ratio: 1 },
      { id: "kPa", name: "Kilopascal", symbol: "kPa", ratio: 1000 },
      { id: "MPa", name: "Megapascal", symbol: "MPa", ratio: 1000000 },
      { id: "bar", name: "Bar", symbol: "bar", ratio: 1000000 },
      { id: "psi", name: "PSI", symbol: "psi", ratio: 6894.757293 },
      { id: "atm", name: "Atmosphere", symbol: "atm", ratio: 101325 },
      { id: "torr", name: "Torr", symbol: "Torr", ratio: 133.322368 },
      { id: "mmHg", name: "mmHg (Millimeter of Mercury)", symbol: "mmHg", ratio: 133.322387 },
      { id: "inHg", name: "inHg (Inch of Mercury)", symbol: "inHg", ratio: 3386.388666 }
    ],
    popularTools: [
      {
        id: "bar-to-psi",
        name: "Bar to Psi",
        fromUnit: "bar",
        toUnit: "psi",
        formula: "Multiply pressure by 14.50377",
        description: "Convert bar to psi (pound-force per square inch). Extremely common in car tires and air compressors.",
        faqs: [{ q: "How many PSI are in 1 Bar?", a: "1 Bar is equal to approximately 14.50377 PSI." }]
      }
    ]
  },
  {
    id: "energy",
    name: "Energy & Work",
    icon: "Flame",
    description: "Convert thermodynamics and physical work units like Joules, Calories, Kilocalories, and kWh.",
    baseUnit: "J",
    units: [
      { id: "J", name: "Joule", symbol: "J", ratio: 1 },
      { id: "cal", name: "Calorie (therm.)", symbol: "cal", ratio: 4.184 },
      { id: "kcal", name: "Kilocalorie (food)", symbol: "kcal", ratio: 4184 },
      { id: "kWh", name: "Kilowatt-Hour", symbol: "kWh", ratio: 3600000 },
      { id: "btu", name: "BTU (British Thermal Unit)", symbol: "BTU", ratio: 1055.05585 },
      { id: "eV", name: "Electron Volt", symbol: "eV", ratio: 1.602176634e-19 }
    ],
    popularTools: [
      {
        id: "joule-to-calorie",
        name: "Joule to Calorie",
        fromUnit: "J",
        toUnit: "cal",
        formula: "Divide by 4.184",
        description: "Convert Joules to thermal calories (J to cal).",
        faqs: [{ q: "What is 1 joule in calories?", a: "1 Joule is about 0.239 calories. To convert, divide Joules by 4.184." }]
      }
    ]
  },
  {
    id: "power",
    name: "Power",
    icon: "Zap",
    description: "Convert electrical and mechanical power levels including watts, kilowatts, horsepower, and BTUs/hour.",
    baseUnit: "W",
    units: [
      { id: "W", name: "Watt", symbol: "W", ratio: 1 },
      { id: "kW", name: "Kilowatt", symbol: "kW", ratio: 1000 },
      { id: "hp", name: "Horsepower (mechanical)", symbol: "hp", ratio: 745.699872 },
      { id: "mhp", name: "Metric Horsepower", symbol: "ps", ratio: 735.49875 },
      { id: "btuh", name: "BTU per hour", symbol: "BTU/h", ratio: 0.293071 }
    ],
    popularTools: [
      {
        id: "watt-to-kilowatt",
        name: "Watt to Kilowatt",
        fromUnit: "W",
        toUnit: "kW",
        formula: "Divide by 1000",
        description: "Convert Watts to Kilowatts (W to kW). Used widely in electricity rating calculations.",
        faqs: [{ q: "How many watts in a kilowatt?", a: "There are exactly 1000 watts in one kilowatt." }]
      }
    ]
  },
  {
    id: "electricity",
    name: "Electricity & Magnetism",
    icon: "Cpu",
    description: "Convert electrotechnical quantities including Volts, Amperes, Ohms, Farads, and magnetic Tesla values.",
    baseUnit: "base",
    units: [
      { id: "v", name: "Volt", symbol: "V", ratio: 1 },
      { id: "kv", name: "Kilovolt", symbol: "kV", ratio: 1000 },
      { id: "a", name: "Ampere", symbol: "A", ratio: 1 },
      { id: "ma", name: "Milliampere", symbol: "mA", ratio: 0.001 },
      { id: "ohm", name: "Ohm", symbol: "Ω", ratio: 1 },
      { id: "kohm", name: "Kilohm", symbol: "kΩ", ratio: 1000 }
    ],
    popularTools: [
      {
        id: "volt-to-kv",
        name: "Volt to kV",
        fromUnit: "v",
        toUnit: "kv",
        formula: "Divide by 1000",
        description: "Convert standard electrical Volts to Kilovolts (V to kV).",
        faqs: [{ q: "How many volts in 1 kV?", a: "There are 1000 volts in 1 kilovolt (kV)." }]
      }
    ]
  },
  {
    id: "digital",
    name: "Digital & Data",
    icon: "Database",
    description: "Convert information storage sizes and bandwidth transfer rates between bits, bytes, kilobytes, megabytes, gigabytes, and gigabits.",
    baseUnit: "B",
    units: [
      { id: "b", name: "Bit", symbol: "b", ratio: 0.125 },
      { id: "B", name: "Byte", symbol: "B", ratio: 1 },
      { id: "KB", name: "Kilobyte (decimal)", symbol: "KB", ratio: 1000 },
      { id: "MB", name: "Megabyte (decimal)", symbol: "MB", ratio: 1000000 },
      { id: "GB", name: "Gigabyte (decimal)", symbol: "GB", ratio: 1000000000 },
      { id: "TB", name: "Terabyte (decimal)", symbol: "TB", ratio: 1000000000000 },
      { id: "KiB", name: "Kibibyte (binary)", symbol: "KiB", ratio: 1024 },
      { id: "MiB", name: "Mebibyte (binary)", symbol: "MiB", ratio: 1048576 },
      { id: "GiB", name: "Gibibyte (binary)", symbol: "GiB", ratio: 1073741824 }
    ],
    popularTools: [
      {
        id: "bytes-to-kb-mb-gb-tb",
        name: "Bytes to KB, MB, GB, TB",
        fromUnit: "B",
        toUnit: "GB",
        formula: "Divide byte count by size factor",
        description: "Convert raw bytes into readable sizes like Kilobytes, Megabytes, and Gigabytes.",
        faqs: [{ q: "How many bytes is 1 GB?", a: "In decimal units, 1 Gigabyte is exactly 1 billion (1,000,000,000) bytes." }]
      }
    ]
  },
  {
    id: "cooking",
    name: "Cooking & Kitchen",
    icon: "ChefHat",
    description: "Convert kitchen measurements between teaspoons, tablespoons, fluid ounces, cups, and grams for ingredients.",
    baseUnit: "ml",
    units: [
      { id: "ml", name: "Milliliter", symbol: "ml", ratio: 1 },
      { id: "tsp", name: "Teaspoon (US)", symbol: "tsp", ratio: 4.92892 },
      { id: "tbsp", name: "Tablespoon (US)", symbol: "tbsp", ratio: 14.7868 },
      { id: "cup", name: "Cup (US)", symbol: "c", ratio: 236.588 },
      { id: "floz", name: "Fluid Ounce (US)", symbol: "fl oz", ratio: 29.5735 },
      { id: "g_flour", name: "Grams Flour (avg)", symbol: "g (Flour)", ratio: 1.89 }, // Custom ratio relative to cups/ml
      { id: "g_sugar", name: "Grams Sugar (avg)", symbol: "g (Sugar)", ratio: 1.18 }
    ],
    popularTools: [
      {
        id: "teaspoon-to-tablespoon",
        name: "Teaspoon to Tablespoon",
        fromUnit: "tsp",
        toUnit: "tbsp",
        formula: "Divide value by 3",
        description: "Convert teaspoons to tablespoons (tsp to tbsp) quickly for recipes.",
        faqs: [{ q: "How many teaspoons in a tablespoon?", a: "There are exactly 3 teaspoons in a tablespoon." }]
      }
    ]
  },
  {
    id: "finance",
    name: "Finance & Business",
    icon: "DollarSign",
    description: "Calculate mortgage options, interest accumulation, profit yields, tax brackets, and basic salaries.",
    baseUnit: "custom",
    units: [],
    popularTools: [
      {
        id: "loan-mortgage-calculator",
        name: "Loan / Mortgage Calculator",
        fromUnit: "",
        toUnit: "",
        formula: "M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]",
        description: "Calculate standard monthly mortgage rates based on principal, interest rate, and term.",
        faqs: [{ q: "What does this calculator solve?", a: "It figures out your monthly home loan principal and interest payment." }]
      },
      {
        id: "compound-interest",
        name: "Compound Interest",
        fromUnit: "",
        toUnit: "",
        formula: "A = P(1 + r/n)^(nt)",
        description: "Calculate future value of savings with periodic compound interest.",
        faqs: [{ q: "How does compounding work?", a: "Interest is earned on your principal and on previously accumulated interest." }]
      }
    ]
  },
  {
    id: "health",
    name: "Health & Medical",
    icon: "Heart",
    description: "Calculate fitness indexes, metabolic needs, calorie counts, dosage volumes, and heart rates.",
    baseUnit: "custom",
    units: [],
    popularTools: [
      {
        id: "bmi-calculator",
        name: "BMI Calculator",
        fromUnit: "kg",
        toUnit: "m",
        formula: "Weight (kg) / Height² (m²)",
        description: "Calculate Body Mass Index (BMI) to understand relative weight distribution classifications.",
        faqs: [{ q: "What is a healthy BMI?", a: "A healthy range is typically between 18.5 and 24.9." }]
      }
    ]
  },
  {
    id: "construction",
    name: "Construction & Civil",
    icon: "Hammer",
    description: "Estimate building volumes including concrete pours, wall bricks, lumber yards, and pipe volumes.",
    baseUnit: "custom",
    units: [],
    popularTools: [
      {
        id: "concrete-volume-calculator",
        name: "Concrete Volume Calculator",
        fromUnit: "ft",
        toUnit: "yd3",
        formula: "(Length × Width × Thickness) in yards",
        description: "Calculate bags or cubic yards of concrete needed for slabs, walls, or footing projects.",
        faqs: [{ q: "How much is a cubic yard of concrete in bags?", a: "One cubic yard requires about 45 standard 80lb bags of concrete mix." }]
      }
    ]
  },
  {
    id: "agriculture",
    name: "Agriculture & Farming",
    icon: "Sprout",
    description: "Calculate NPK fertilizer, seed drop rates, spraying metrics, crop yields, and moisture content levels.",
    baseUnit: "custom",
    units: [],
    popularTools: [
      {
        id: "npk-fertilizer-calculator",
        name: "Advanced NPK Fertilizer Mixer",
        fromUnit: "lbs/acre",
        toUnit: "bags",
        formula: "NPK ratios and custom target PPM batch dilution ratios.",
        description: "Precise NPK recipe builder by Hamad – Used by hydroponic growers and farmers worldwide.",
        faqs: [
          { q: "What does NPK stand for?", a: "N stands for Nitrogen, P for Phosphorus (expressed as P₂O₅), and K for Potassium (expressed as K₂O)." },
          { q: "What calculations are supported in this mixer?", a: "You can calculate custom target macronutrients, target NPK percentages, PPM dilutions, and exact batch recipe formulations." }
        ]
      }
    ]
  },
  {
    id: "science",
    name: "Science & Chemistry",
    icon: "FlaskConical",
    description: "Calculate molar weight ratios, pH balances, density equations, and solution dilutions.",
    baseUnit: "custom",
    units: [],
    popularTools: [
      {
        id: "ph-calculator",
        name: "pH Calculator",
        fromUnit: "mol/L",
        toUnit: "pH",
        formula: "pH = -log10[H+]",
        description: "Determine solution acidity or alkalinity from hydrogen ion concentration.",
        faqs: [{ q: "What is neutral pH?", a: "A pH of 7.0 is neutral at 25°C. Lower is acidic, higher is basic." }]
      }
    ]
  },
  {
    id: "automotive",
    name: "Automotive & Transport",
    icon: "Car",
    description: "Convert motor metrics including MPG to L/100km, wheel tire diameters, torque scales, and EV ranges.",
    baseUnit: "custom",
    units: [],
    popularTools: [
      {
        id: "mpg-to-l100km",
        name: "MPG to L/100km",
        fromUnit: "mpg",
        toUnit: "l/100km",
        formula: "235.215 / MPG value",
        description: "Convert fuel efficiency values between US MPG and European Liters per 100 kilometers.",
        faqs: [{ q: "Is a lower L/100km value better?", a: "Yes. Lower L/100km means the car consumes less fuel for the same distance." }]
      }
    ]
  },
  {
    id: "miscellaneous",
    name: "Miscellaneous & Fun",
    icon: "Smile",
    description: "Convert clothing sizes, Roman numerals, number bases, custom calculations, and timing ratios.",
    baseUnit: "custom",
    units: [],
    popularTools: [
      {
        id: "roman-numerals",
        name: "Roman Numerals",
        fromUnit: "decimal",
        toUnit: "roman",
        formula: "Additive and subtractive Roman notation conversion",
        description: "Convert standard numbers (decimals) to historic Roman numeral notation.",
        faqs: [{ q: "What is 2026 in Roman Numerals?", a: "2026 is written as MMXXVI." }]
      }
    ]
  }
];
