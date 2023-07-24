import { getPriceConverter } from "components/raw-material/chart/calculate";

describe("testGetPriceConverter", () => {
  it("1mil/ton => 1000 usd/kg", () => {
    const price = 1000000; // original price is 1,000,000 USD / ton
    // I want output to be 1,000 USD / kg
    const expectedUnit = {
      currency: "USD",
      measuredIn: "kg",
    };
    const { unit, converter } = getPriceConverter(price);
    expect(unit).toEqual(expectedUnit);
    let convertedPrice = converter(price);
    expect(convertedPrice).toEqual(1000);
  });
  it("98mil/ton => 98 usd/g", () => {
    const price = 98000000; // original price is 98,000,000 USD / ton
    // I want output to be 98,000 USD / kg
    const expectedUnit = {
      currency: "USD",
      measuredIn: "g",
    };
    const { unit, converter } = getPriceConverter(price);
    expect(unit).toEqual(expectedUnit);
    let convertedPrice = converter(price);
    expect(convertedPrice).toEqual(98);
  });
  it("1 usd/ton => 1 usd/ton", () => {
    const price = 1;
    const expectedUnit = {
      currency: "USD",
      measuredIn: "ton",
    };
    const { unit, converter } = getPriceConverter(price);
    expect(unit).toEqual(expectedUnit);
    let convertedPrice = converter(price);
    expect(convertedPrice).toEqual(1);
  });

  it("1000/ton => 1000/ton", () => {
    const price = 1000;
    const expectedUnit = {
      currency: "USD",
      measuredIn: "ton",
    };
    const { unit, converter } = getPriceConverter(price);
    expect(unit).toEqual(expectedUnit);
    let convertedPrice = converter(price);
    expect(convertedPrice).toEqual(1000);
  });

  it("100mil/ton => 100 usd/g", () => {
    const price = 100 * 10 ** 6;
    const expectedUnit = {
      currency: "USD",
      measuredIn: "g",
    };
    const { unit, converter } = getPriceConverter(price);
    expect(unit).toEqual(expectedUnit);
    let convertedPrice = converter(price);
    expect(convertedPrice).toEqual(100);
  });

  it("0.001 usd/ton => 0.001 usd/ton", () => {
    const price = 0.001;
    const expectedUnit = {
      currency: "USD",
      measuredIn: "ton",
    };
    const { unit, converter } = getPriceConverter(price);
    expect(unit).toEqual(expectedUnit);
    let convertedPrice = converter(price);
    expect(convertedPrice).toEqual(0.001);
  });

  it("0.0001 usd/ton => 0.1 usd/kiloton", () => {
    const price = 0.0001;
    const expectedUnit = {
      currency: "USD",
      measuredIn: "kiloton",
    };
    const { unit, converter } = getPriceConverter(price);
    expect(unit).toEqual(expectedUnit);
    let convertedPrice = converter(price);
    expect(convertedPrice).toEqual(0.1);
  });

  it("0.00051 usd/ton => 0.51 usd/kiloton", () => {
    const price = 0.00051;
    const expectedUnit = {
      currency: "USD",
      measuredIn: "kiloton",
    };
    const { unit, converter } = getPriceConverter(price);
    expect(unit).toEqual(expectedUnit);
    let convertedPrice = converter(price);
    expect(convertedPrice).toEqual(0.51);
  });

  it("0.00000051 usd/ton => 0.51 usd/megaton", () => {
    const price = 0.00000051;
    const expectedUnit = {
      currency: "USD",
      measuredIn: "megaton",
    };
    const { unit, converter } = getPriceConverter(price);
    expect(unit).toEqual(expectedUnit);
    let convertedPrice = converter(price);
    expect(convertedPrice).toEqual(0.51);
  });
});
