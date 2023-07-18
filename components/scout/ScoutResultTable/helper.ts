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

export interface SubRegion {
  id: string;
  regionId: string;
  code: string;
  name: string;
}

export interface ITableData {
  id: string;
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
  supplier: any,
  idx: number,
  allSubRegions: any[]
): ITableData {
  const matchedLocation = allSubRegions.find(
    (x) => x.id === supplier.headquarterId
  );
  const badges = Object.keys(supplier.flags || {}).filter(
    (x) => supplier.flags[x]
  );
  return {
    id: supplier.id || idx,
    logo: supplier.logo || noImageUrl,
    name: supplier.name || supplier.longName,
    isInnovation: supplier.isInnovation,
    headquarter: matchedLocation?.name,
    hqCode: matchedLocation?.code,
    globalFootprint: [],
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
