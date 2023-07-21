import { TSubRegion } from "models/subRegion";
import { TSupplierModel } from "models/supplier";

export enum BadgeType {
  top = "top",
  major = "major",
  risingStar = "risingStar",
}

export function mapBadgeTypeToString(badge: BadgeType) {
  switch (badge) {
    case BadgeType.top:
      return "Top";
    case BadgeType.major:
      return "Major";
    case BadgeType.risingStar:
      return "Rising Star";
    default:
      return "";
  }
}

export interface ITableData {
  id: number;
  logo: string;
  name: string;
  isInnovation?: boolean;
  headquarter: string;
  hqCode: string;
  globalFootprint: string[];
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
  allSubRegions: TSubRegion[]
): ITableData {
  const matchedLocation = allSubRegions.find(
    (x) => x.id === supplier.headquarterId
  );
  const badges = Object.keys(supplier.flags || {}).filter(
    (x) => supplier.flags[x as keyof typeof supplier.flags]
  );
  // use key map to avoid duplicate
  const globalFootprint = {} as { [key: number]: string };
  supplier.locationId?.forEach((lid: number) => {
    const foundRegions = allSubRegions.find((x) => x.id === lid);
    if (foundRegions) {
      globalFootprint[lid] = foundRegions.name;
    }
    console.error(`Location ${lid} not found`);
    return "";
  });
  return {
    id: supplier.id || idx,
    logo: supplier.logo || noImageUrl,
    name: supplier.name || "",
    isInnovation: false, // TODO: add this field
    headquarter: matchedLocation?.name || "",
    hqCode: matchedLocation?.code || "",
    globalFootprint: Object.values(globalFootprint),
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
