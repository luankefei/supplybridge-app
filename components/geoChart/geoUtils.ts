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

export const MapRegionToSubRegion: Record<EnumRegion, EnumSubRegion[]> = {
  [EnumRegion.Americas]: [
    EnumSubRegion.NorthNCentralAmerica,
    EnumSubRegion.SouthAmerica,
  ],
  [EnumRegion.APAC]: [EnumSubRegion.Asia, EnumSubRegion.Oceania],
  [EnumRegion.EMEA]: [
    EnumSubRegion.Europe,
    EnumSubRegion.MiddleEast,
    EnumSubRegion.Africa,
  ],
};
