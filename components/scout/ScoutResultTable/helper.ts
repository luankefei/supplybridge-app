export enum BadgeType {
  top,
  major,
  risingStar,
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
  longName?: string;
  headquarter: string;
  location: string;
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
  return {
    id: supplier.id || idx,
    logo: supplier.logo || noImageUrl,
    name: supplier.name && supplier.name.toUpperCase(),
    // longName: supplier.longName,
    // isInnovation: supplier.isInnovation,
    headquarter: allSubRegions.find((x) => x.id === supplier.headquarterId)
      ?.name,
    location: allSubRegions.find((x) => x.id === supplier.locationId)?.name,
    badge: {
      [BadgeType.major]: supplier.flags.maj ?? false,
      [BadgeType.top]: supplier.flags.top ?? false,
      [BadgeType.risingStar]: supplier.flags.str ?? false,
    },
  };
}
