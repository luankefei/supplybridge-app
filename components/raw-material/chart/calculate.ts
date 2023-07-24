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

interface ITimedAverage {
  timeStr: string;
  averagePrice: number;
}

const calculateMonthlyAverages = (
  data: {
    value: number;
    time: Date;
  }[],
  timePeriod: FrequencyEnum
): ITimedAverage[] => {
  let keyFn = (ts: Date) => {
    return ts.toISOString().split("T")[0];
  };
  if (timePeriod === FrequencyEnum.Month) {
    keyFn = (ts: Date) => {
      return `${ts.getMonth() + 1}/${ts.getFullYear()}`;
    };
  } else if (timePeriod === FrequencyEnum.Year) {
    keyFn = (ts: Date) => {
      return `${ts.getFullYear()}`;
    };
  }
  const averages: ITimedAverage[] = [];

  // Create a dictionary to hold the total price and count of data points for each month
  const aggregateDate: {
    [key: string]: { totalPrice: number; count: number };
  } = {};

  // Iterate through the data and aggregate the total price and count for each month
  for (const { value: price, time: ts } of data) {
    const key = keyFn(ts);

    if (!aggregateDate[key]) {
      aggregateDate[key] = { totalPrice: 0, count: 0 };
    }

    aggregateDate[key].totalPrice += price;
    aggregateDate[key].count++;
  }

  // Calculate the average price for each month
  for (const key in aggregateDate) {
    const { totalPrice, count } = aggregateDate[key];
    const averagePrice = totalPrice / count;
    averages.push({ timeStr: key, averagePrice });
  }

  return averages;
};

export { getPriceConverter, calculateDayRange, calculateMonthlyAverages };
