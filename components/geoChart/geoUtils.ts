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
