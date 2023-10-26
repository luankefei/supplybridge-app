import { ICertification } from "models/certification";
import { IPatent } from "models/patent";
import { TSupplierModel } from "models/supplier";

export interface IGeneral {
  description: string;
  headquarterName?: string;
  headquarterId: number;
  globalFootprintNames: string[];
  globalFootprints: number[];
  foundedYear: number;
  employeeCount: number;
  /**
   * Revenue of this company in string format e.g. "EURO 100M", "USD $100B"
   */
  revenue: string;
  /**
   * website of this company, in URL format
   */
  website: string;
  /**
   * A list of highlights, in string format
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
  rndPersonnelPercentage: string;
  /**
   * the number of R&D investment
   */
  rndInvestment: string;
  rndInvestmentYear: string;
  rndInvestmentPercentage: string;
  /**
   * IDK what this is
   */
  buildToSpec: boolean;
  buildToPrint: boolean;
  patentsCount: number;
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
