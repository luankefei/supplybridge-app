import { Unit } from "../units";

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

export enum FrequencyEnum {
  Day = "Day",
  Month = "Month",
  Year = "Year",
}

/**
 * Given a frequency,
 * day => today as ed, today - 30 as st
 * month => today as ed, today - 12 months as st
 * year => today as ed, today - 10 years as st
 * @param frequency
 * @returns {
 *  st: Date,
 *  ed: Date,
 * }
 */
const calculateDayRange = (frequency: FrequencyEnum) => {
  const ed = new Date();
  let st = new Date();
  switch (frequency) {
    case FrequencyEnum.Day:
      st.setDate(ed.getDate() - 30);
      break;
    case FrequencyEnum.Month:
      st.setMonth(ed.getMonth() - 12);
      break;
    case FrequencyEnum.Year:
      st.setFullYear(ed.getFullYear() - 10);
      break;
  }
  return { st, ed };
};

export { getPriceConverter, calculateDayRange };
