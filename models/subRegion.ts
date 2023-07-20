/**
 * SubRegion model
 */
export type TSubRegion = {
  area: string;
  callingCode: string;
  code: string;
  id: number;
  isActive: boolean;
  regionId: string;
  name: string;
};

/**
 * SubRegion model with count
 * api response from /sub_regions
 */
export type TSubRegionWithCount = TSubRegion & {
  countSuppliersInHeadquarter: number;
  countSuppliersInLocation: number;
};
