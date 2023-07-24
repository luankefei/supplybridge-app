export type Money = {
  /**
   * The amount of this money, in the smallest unit
   */
  amount: number;
  /**
   * ISO 3 letter Currency code,
   * e.g. USD, EUR, etc.
   */
  currency: string;
  /**
   * The percision of this money,
   * e.g. 2 for USD, 0 for JPY
   */
  percision: number;
  /**
   * The symbol of this currency,
   * e.g. $ for USD, € for EUR, etc.
   */
  currencySymbol: string;
};
