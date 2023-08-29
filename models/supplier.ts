import {
  IGeneral,
  IInnovations,
  IPortfolio,
} from "components/scout/scoutByIndex/detailPanel/type";
import { ICertification } from "./certification";

/**
 * components:
 *  schemas:
 *   SupplierModel:
 *   type: object
 *
 */
export type TSupplierModel = {
  id: number;
  flags: {
    top: boolean;
    maj: boolean;
    str: boolean;
  };
  headquarterId?: number;
  locationId: number[];
  category: string[];
  logo: string;
  name: string;
  general?: IGeneral;
  portfolio?: IPortfolio;
  innovation?: IInnovations;
  certifications?: ICertification[];
  similarCompanies?: TSupplierModel[];
};
