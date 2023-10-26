import {
  CountryToRegionMap,
  TwoLetterCodeToCountryCodeMap,
} from "components/geoChart/geoIdMap";
import { EnumRegionAndSubRegion } from "components/geoChart/geoUtils";
import { BadgeType } from "components/ui-components/supBadge";
import { TSubRegion } from "models/subRegion";
import { TSupplierModel } from "models/supplier";

export interface ITableData {
  id: number;
  logo: string;
  name: string;
  isInnovation?: boolean;
  headquarter: string;
  hqCode: string;
  /**
   * Global footprint of the supplier, in a list of string (name of country)
   */
  globalFootprint: string[];
  /**
   * Add on field to help with geoChart filtering,
   * Not used by table's filter
   */
  globalFootprintIds: string[];
  /**
   * Alternative to globalFootprint, a list of EnumRegionAndSubRegion
   **/
  globalFootprintRegion: Set<EnumRegionAndSubRegion>;
  badges: BadgeType[];
  category?: string[];
}

const noImageUrl = "https://cdn-stage.supplybridge.com/images/logos/no.png";
/**
 * Converts supplier to [ITableData]
 *
 * @param supplier A supplier model
 * @param idx Index of the supplier in the list
 * @param allSubRegions A map of all subregions
 *
 */
export function supplierModelToTableData(
  supplier: TSupplierModel,
  idx: number,
  allSubRegions: Record<number, TSubRegion>
): ITableData {
  let hqLocation;
  if (supplier.headquarterId === undefined) {
    hqLocation = {};
  } else {
    hqLocation = allSubRegions[supplier.headquarterId];
  }
  const badges = Object.keys(supplier.flags || {}).filter(
    (x) => supplier.flags[x as keyof typeof supplier.flags]
  );
  // use key map to avoid duplicate
  const globalFootprint = {} as { [key: number]: string };
  const globalFootprintSubRegion: Set<EnumRegionAndSubRegion> = new Set();
  Array.isArray(supplier.locationId) &&
    supplier.locationId.forEach((lid: number) => {
      const foundRegions = allSubRegions[lid];
      if (foundRegions) {
        globalFootprint[lid] = foundRegions.name;
        const twoLc = foundRegions.code;
        const threeLc = TwoLetterCodeToCountryCodeMap[twoLc];
        const region = CountryToRegionMap[threeLc];
        globalFootprintSubRegion.add(region);
      } else {
        console.error(
          `Location ${lid} not found in allSubregions`,
          allSubRegions
        );
      }
      return "";
    });
  return {
    id: supplier.id || idx,
    logo: supplier.logo || noImageUrl,
    name: supplier.name || "",
    isInnovation: false, // TODO: add this field
    headquarter: hqLocation?.name || "N/A",
    hqCode: hqLocation?.code || "",
    globalFootprint: Object.values(globalFootprint),
    globalFootprintIds: Object.keys(globalFootprint),
    globalFootprintRegion: globalFootprintSubRegion,
    badges: badges.map((x) => {
      switch (x) {
        case "top":
          return BadgeType.top;
        case "maj":
          return BadgeType.major;
        case "str":
          return BadgeType.risingStar;
        default:
          return BadgeType.top;
      }
    }),
    category: supplier.category,
  };
}
