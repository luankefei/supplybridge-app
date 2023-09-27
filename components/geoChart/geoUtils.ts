import geo from "./features.json";
import { CountryToRegionMap, CountryToSubRegionMap } from "./geoIdMap";
export enum EnumRegion {
  Americas = "Americas",
  APAC = "APAC",
  EMEA = "EMEA",
}
export const MapRegionToColor: Record<EnumRegion, string> = {
  [EnumRegion.Americas]: "#8B89B9",
  [EnumRegion.APAC]: "#636464",
  [EnumRegion.EMEA]: "#B5A6C9",
};

export const MapColors: Record<string, string> = {
  hoveredBg: "rgba(255, 218, 68, 0.30)",
  selectedBg: "#F7DE74",
  strokeColor: "#FFDA44",
  textColor: "#434343",
  textShadowColor: "rgba(229, 231, 235, 0.8)",
  greyColor: "#E5E7EB",
};

export enum EnumSubRegion {
  NorthNCentralAmerica = "North America & Central America",
  SouthAmerica = "South America",
  Asia = "Asia",
  Oceania = "Oceania",
  Europe = "Europe",
  MiddleEast = "Middle East",
  Africa = "Africa",
}

export const MapRegionToMarkerColor: Record<EnumRegion, string> = {
  [EnumRegion.Americas]: "rgba(139, 137, 185, 0.40)",
  [EnumRegion.APAC]: "rgba(99, 100, 100, 0.40)",
  [EnumRegion.EMEA]: "rgba(110, 75, 157, 0.40)",
};

export type EnumRegionAndSubRegion = EnumRegion | EnumSubRegion;

export const isRegion = (region: EnumRegionAndSubRegion): boolean => {
  return (
    region === EnumRegion.Americas ||
    region === EnumRegion.APAC ||
    region === EnumRegion.EMEA
  );
};

export const isSubRegion = (region: EnumRegionAndSubRegion): boolean => {
  return !isRegion(region);
};

export const MapRegionToSubRegion: Record<EnumRegion, EnumSubRegion[]> = {
  [EnumRegion.Americas]: [
    EnumSubRegion.NorthNCentralAmerica,
    EnumSubRegion.SouthAmerica,
  ],
  [EnumRegion.APAC]: [
    EnumSubRegion.Asia,
    EnumSubRegion.Oceania,
    EnumSubRegion.MiddleEast,
  ],
  [EnumRegion.EMEA]: [EnumSubRegion.Europe, EnumSubRegion.Africa],
};

const preDefinedProjectionConfig: Record<
  EnumRegionAndSubRegion | "world",
  any
> = {
  world: {
    rotate: [0, 0, 0],
    center: [0, 35],
    scale: 180,
  },
  [EnumRegion.Americas]: {
    rotate: [0, 0, 0],
    center: [-100, 35],
    scale: 250,
  },
  [EnumRegion.APAC]: {
    rotate: [0, 0, 0],
    center: [100, 35],
    scale: 250,
  },
  [EnumRegion.EMEA]: {
    rotate: [0, 0, 0],
    center: [0, 35],
    scale: 250,
  },
  [EnumSubRegion.NorthNCentralAmerica]: {
    rotate: [0, 0, 0],
    center: [-110, 50],
    scale: 400,
  },
  [EnumSubRegion.SouthAmerica]: {
    rotate: [0, 0, 0],
    center: [-60, -10],
    scale: 400,
  },
  [EnumSubRegion.Asia]: {
    rotate: [0, 0, 0],
    center: [100, 35],
    scale: 400,
  },

  [EnumSubRegion.Oceania]: {
    rotate: [0, 0, 0],
    center: [140, -20],
    scale: 400,
  },
  [EnumSubRegion.Europe]: {
    rotate: [0, 0, 0],
    center: [20, 50],
    scale: 400,
  },
  [EnumSubRegion.MiddleEast]: {
    rotate: [0, 0, 0],
    center: [40, 35],
    scale: 400,
  },
  [EnumSubRegion.Africa]: {
    rotate: [0, 0, 0],
    center: [20, 0],
    scale: 400,
  },
};

// use this to cache the geojson and project config
const geoCache: Partial<
  Record<
    EnumRegionAndSubRegion | "world",
    {
      geoJson: any;
      projectConfig: any;
    }
  >
> = {
  world: {
    geoJson: geo,
    projectConfig: preDefinedProjectionConfig["world"],
  },
};
/**
 * Given a region, calculate on the fly the geojson and project config
 *
 * @param region the region or subregion
 */
export function getGeoJsonAndProjectConfig(
  region: EnumRegionAndSubRegion | "world"
) {
  if (geoCache[region]) {
    return geoCache[region];
  }
  const geometries: any = [];
  const RegionTopologies: any = {};
  geo.objects.world.geometries.forEach((g) => {
    const foundRegion = CountryToRegionMap[g.id];
    const foundSubregion = CountryToSubRegionMap[g.id];
    if (foundRegion === region) {
      geometries.push(g);
    } else if (foundSubregion === region) {
      geometries.push(g);
    }
  });
  RegionTopologies[region] = {
    type: "Topology",
    objects: {
      region: {
        type: "GeometryCollection",
        geometries: geometries,
      },
    },
    arcs: geo.arcs,
    bbox: geo.bbox,
  };
  geoCache[region] = {
    geoJson: RegionTopologies[region],
    projectConfig: preDefinedProjectionConfig[region],
  };
  return geoCache[region];
}

export { geo };

export const legendKeyMap: Record<string, any> = {
  Total: "world",
  Americas: EnumRegion.Americas,
  APAC: EnumRegion.APAC,
  EMEA: EnumRegion.EMEA,
  "North America & Central America": EnumSubRegion.NorthNCentralAmerica,
  "South America": EnumSubRegion.SouthAmerica,
  Asia: EnumSubRegion.Asia,
  Oceania: EnumSubRegion.Oceania,
  Europe: EnumSubRegion.Europe,
  "Middle East": EnumSubRegion.MiddleEast,
  Africa: EnumSubRegion.Africa,
};
