import { RAW_MATEIRALS_NAME_LIST, RawMaterialName } from "./constants";

export const TMeasuredIn = [
  "bbl", // barrel
  "ton", // ton for weight
  "kj", // kilojoule for energy
  "l", // liter for volume
];
export type Unit = {
  /**
   * The currency of the price
   */
  currency: string;
  /**
   * The unit in which the price is measured
   * @example "ton"
   * @example "kj"
   * @example "l"
   */
  measuredIn: (typeof TMeasuredIn)[number];
};

/**
 * Units for raw materials
 * -- default backend returned units
 */
export const MaterialUnits: Record<RawMaterialName, Unit> = {
  "Crude Oil": {
    currency: "USD",
    measuredIn: "bbl",
  },
  Brent: {
    currency: "USD",
    measuredIn: "bbl",
  },
  "Natural gas": {
    currency: "USD",
    measuredIn: "ton",
  },
  Gasoline: {
    currency: "USD",
    measuredIn: "l",
  },
  "Heating Oil": {
    currency: "USD",
    measuredIn: "l",
  },
  Coal: {
    currency: "USD",
    measuredIn: "ton",
  },
  "TTF Gas": {
    currency: "USD",
    measuredIn: "kj",
  },
  "UK Gas": {
    currency: "USD",
    measuredIn: "kj",
  },
  Ethanol: {
    currency: "USD",
    measuredIn: "l",
  },
  Naphtha: {
    currency: "USD",
    measuredIn: "ton",
  },
  Uranium: {
    currency: "USD",
    measuredIn: "ton",
  },
  Propane: {
    currency: "USD",
    measuredIn: "l",
  },
  Methanol: {
    currency: "USD",
    measuredIn: "ton",
  },
  "Urals Oil": {
    currency: "USD",
    measuredIn: "ton",
  },
  Gold: {
    currency: "USD",
    measuredIn: "ton",
  },
  Silver: {
    currency: "USD",
    measuredIn: "ton",
  },
  Copper: {
    currency: "USD",
    measuredIn: "ton",
  },
  Steel: {
    currency: "USD",
    measuredIn: "ton",
  },
  "Iron Ore": {
    currency: "USD",
    measuredIn: "ton",
  },
  Lithium: {
    currency: "USD",
    measuredIn: "ton",
  },
  Platinum: {
    currency: "USD",
    measuredIn: "ton",
  },
  Titanium: {
    currency: "USD",
    measuredIn: "kg",
  },
  "HRC Steel": {
    currency: "USD",
    measuredIn: "ton",
  },
  Bitumen: {
    currency: "USD",
    measuredIn: "ton",
  },
  Cobalt: {
    currency: "USD",
    measuredIn: "ton",
  },
  Lead: {
    currency: "USD",
    measuredIn: "ton",
  },
  Aluminum: {
    currency: "USD",
    measuredIn: "ton",
  },
  Tin: {
    currency: "USD",
    measuredIn: "ton",
  },
  Zinc: {
    currency: "USD",
    measuredIn: "ton",
  },
  Nickel: {
    currency: "USD",
    measuredIn: "ton",
  },
  Molybdenum: {
    currency: "USD",
    measuredIn: "kg",
  },
  Palladium: {
    currency: "USD",
    measuredIn: "ton",
  },
  Rhodium: {
    currency: "USD",
    measuredIn: "ton",
  },
  Polyethylene: {
    currency: "USD",
    measuredIn: "ton",
  },
  Polyvinyl: {
    currency: "USD",
    measuredIn: "ton",
  },
  Polypropylene: {
    currency: "USD",
    measuredIn: "ton",
  },
  "Soda Ash": {
    currency: "USD",
    measuredIn: "ton",
  },
  Neodymium: {
    currency: "USD",
    measuredIn: "ton",
  },
  Tellurium: {
    currency: "USD",
    measuredIn: "ton",
  },
  "Di-ammonium": {
    currency: "USD",
    measuredIn: "ton",
  },
  Magnesium: {
    currency: "USD",
    measuredIn: "ton",
  },
  llium: {
    currency: "USD",
    measuredIn: "ton",
  },
  Germanium: {
    currency: "USD",
    measuredIn: "ton",
  },
  Manganese: {
    currency: "USD",
    measuredIn: "ton",
  },
  "Iron Ore 62% fe": {
    currency: "USD",
    measuredIn: "ton",
  },
  Gallium: {
    currency: "USD",
    measuredIn: "ton",
  },
  Indium: {
    currency: "USD",
    measuredIn: "ton",
  },
  "Solar Energy Index": {
    currency: "USD",
    measuredIn: "",
  },
  "EU Carbon Permits": {
    currency: "USD",
    measuredIn: "",
  },
  "Wind Energy Index": {
    currency: "USD",
    measuredIn: "",
  },
  "Kraft Pulp": {
    currency: "USD",
    measuredIn: "ton",
  },
  Rubber: {
    currency: "USD",
    measuredIn: "ton",
  },
  //
} as const;

export function assertIsExhaustive() {
  for (const mName of RAW_MATEIRALS_NAME_LIST) {
    if (!MaterialUnits[mName]) {
      console.error(`Missing key ${mName} in MaterialUnits`);
    }
  }
}
