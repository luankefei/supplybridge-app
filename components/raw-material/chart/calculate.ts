export type Unit = {
  /**
   * The currency of the price
   */
  currency: string;
  /**
   * The unit in which the price is measured
   * @example "ton"
   */
  measuredIn: string;
};
const weightMeasures = ["g", "kg", "ton", "kiloton", "megaton", "gigaton"];
export const initialWeightUnit: Unit = {
  currency: "USD",
  measuredIn: "ton",
};
/**
 * Given a price and currency, return the unit and a function that converts a price to a
 * smaller unit if it is too large or to a larger unit if it is too small
 * @param price The price to convert
 * @param currency NOT USED for now, but will be used in the future, coverts price
 */
function getPriceConverter(
  price: number,
  currency: string = "USD"
): { unit: Unit; converter: (price: number) => number } {
  const unit = { ...initialWeightUnit };
  let converter = (p: number) => p;
  let tonIdx = weightMeasures.indexOf(unit.measuredIn);
  let idx = tonIdx;
  if (price >= 10 ** 6) {
    while (price > 1000 && idx > 0) {
      price /= 1000;
      idx--;
    }
    converter = (p: number) => p / 1000 ** (tonIdx - idx);
  } else if (price * 1000 <= 1) {
    while (price * 1000 < 1 && idx < weightMeasures.length) {
      price *= 1000;
      idx++;
    }
    converter = (p: number) => p * 1000 ** (idx - tonIdx);
  }
  unit.measuredIn = weightMeasures[idx];
  return { unit, converter };
}

export { getPriceConverter };
