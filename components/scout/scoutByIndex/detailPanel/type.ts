import { ICertification } from "models/certification";
import { Money } from "models/money";
import { IPatent } from "models/patent";
import { TSupplierModel } from "models/supplier";

export interface IGeneral {
  /**
   * The name of this company's headquarter location
   **/
  headquarterName: string;
  /**
   * The name of this company's locationIds
   */
  globalFootprints: string[];
  /**
   * where this company is located, in regions
   */
  regions: string[];
  /**
   * total count of employees
   */
  employeeCount: number;
  /**
   * Revenue of this company
   */
  revenue: Money;
  /**
   * The year of revenue
   */
  revenueYear: number;
  /**
   * website of this company, in URL format
   */
  website: string;
  /**
   * A list of highlights
   */
  highlights: string[];
}

export interface IPortfolio {
  /**
   * Key partners for this company
   */
  keyPartners: string[];
  /**
   * Their corresponding logos
   */
  keyPartnersLogos: string[];
  /**
   * Not sure what this is, but the examples are:
   * - NCM523
   * - NCM622
   * - NCM-Cobalt Free
   * ... etc,
   */
  productLines: string[];
}

export interface IInnovations {
  /**
   * the number of R&D personnel
   */
  rndPersonnel: number;
  /**
   * the number of R&D investment
   */
  rndInvestment: Money;
  rndInvestmentYear: number;
  /**
   * IDK what this is
   */
  buildToSpec: boolean;
  buildToPrint: boolean;

  patents: IPatent[];
}

export interface ICertifications {
  /**
   * A list of certifications
   * e.g.
   * ISO 9001:2015
   */
  certifications: ICertification[];
}

export interface IRatings {
  /**
   * Overall rating
   * e.g. 4.5
   * @min 0
   * @max 5
   **/
  overall: number;
  /**
   * Cost / Performance Rating
   */
  costPerformance: number;
  /**
   * Flexibility, Agility & Speed Rating
   */
  flexibility: number;
  /**
   * Growth Potential Rating
   */
  growthPotential: number;
  /**
   * Innovation Rating
   */
  innovation: number;
  /**
   * ESG & Sustainability Rating
   */
  esgSustainability: number;
  /**
   * compatibility rating
   */
  compatibility: number;
}

export interface ISimilarCompanies {
  /**
   * A list of similar companies
   */
  similarCompanies: TSupplierModel[];
}
