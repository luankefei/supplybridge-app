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
  globalFootprint: string[];
  /**
   * Add on field to help with geoChart filtering,
   * Not used by table's filter
   */
  globalFootprintIds: string[];
  badges: BadgeType[];
}

const noImageUrl = "https://cdn-stage.supplybridge.com/images/logos/no.png";
/**
 * Converts supplier to [ITableData]
 * @param supplier A supplier model
 */
export function supplierModelToTableData(
  supplier: TSupplierModel,
  idx: number,
  allSubRegions: Record<number, TSubRegion>
): ITableData {
  const hqLocation = allSubRegions[supplier.headquarterId];
  const badges = Object.keys(supplier.flags || {}).filter(
    (x) => supplier.flags[x as keyof typeof supplier.flags]
  );
  // use key map to avoid duplicate
  const globalFootprint = {} as { [key: number]: string };
  Array.isArray(supplier.locationId) &&
    supplier.locationId.forEach((lid: number) => {
      const foundRegions = allSubRegions[lid];
      if (foundRegions) {
        globalFootprint[lid] = foundRegions.name;
      } else {
        console.error(`Location ${lid} not found`, allSubRegions);
      }
      return "";
    });
  return {
    id: supplier.id || idx,
    logo: supplier.logo || noImageUrl,
    name: supplier.name || "",
    isInnovation: false, // TODO: add this field
    headquarter: hqLocation?.name || "",
    hqCode: hqLocation?.code || "",
    globalFootprint: Object.values(globalFootprint),
    globalFootprintIds: Object.keys(globalFootprint),
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
  };
}
