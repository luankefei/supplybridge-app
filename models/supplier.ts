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
  headquarterId: number;
  locationId: number[];
  category: string[];
  logo: string;
  name: string;
};
