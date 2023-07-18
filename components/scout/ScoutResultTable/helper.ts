export enum BadgeType {
  top = "top",
  major = "major",
  risingStar = "risingStar",
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
  badge: Record<BadgeType, boolean>;
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
  return {
    id: supplier.id || idx,
    logo: supplier.logo || noImageUrl,
    name: supplier.name || supplier.longName,
    isInnovation: supplier.isInnovation,
    headquarter: matchedLocation?.name,
    hqCode: matchedLocation?.code,
    globalFootprint: [],
    badge: {
      [BadgeType.major]: supplier.flags?.maj ?? false,
      [BadgeType.top]: supplier.flags?.top ?? false,
      [BadgeType.risingStar]: supplier.flags?.str ?? false,
    },
  };
}
