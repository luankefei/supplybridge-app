import { Box, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import geo from "./features.json";
import {
  EnumRegion,
  EnumRegionAndSubRegion,
  EnumSubRegion,
  MapRegionToColor,
  isSubRegion,
} from "./geoUtils";
import {
  CountryToRegionMap,
  CountryToSubRegionMap,
  CountryToTwoLetterCodeMap,
  TwoLetterCodeToCountryCodeMap,
} from "./geoIdMap";
import { useStore } from "hooks/useStore";
import MapMarker, { IMarker } from "./marker";

//#region map Constants
const RADIUS_SIZE = [180, 120, 80];
// These numbers are tied to the scale of the map
// i have no idea how to translate them, this is tried out by hand
const preDefinedMarkers: IMarker[] = [
  {
    name: EnumRegion.Americas,
    coordinates: [-108, 34],
    r: RADIUS_SIZE[0],
    subMarkers: [
      {
        name: EnumSubRegion.NorthNCentralAmerica,
        coordinates: [-108, 34],
        r: RADIUS_SIZE[2],
      },
      {
        name: EnumSubRegion.SouthAmerica,
        coordinates: [-65, -14],
        r: RADIUS_SIZE[2],
      },
    ],
  },
  {
    name: EnumRegion.EMEA,
    coordinates: [18, 10],
    r: RADIUS_SIZE[1],
    subMarkers: [
      {
        name: EnumSubRegion.Europe,
        coordinates: [18, 45],
        r: RADIUS_SIZE[2],
      },
      {
        name: EnumSubRegion.Africa,
        coordinates: [18, 0],
        r: RADIUS_SIZE[2],
      },
    ],
  },
  {
    name: EnumRegion.APAC,
    coordinates: [108, 34],
    r: RADIUS_SIZE[1],
    subMarkers: [
      {
        name: EnumSubRegion.Asia,
        coordinates: [110, 34],
        r: RADIUS_SIZE[2],
      },
      {
        name: EnumSubRegion.MiddleEast,
        coordinates: [70, 34],
        r: RADIUS_SIZE[2],
      },
      {
        name: EnumSubRegion.Oceania,
        coordinates: [140, -24],
        r: RADIUS_SIZE[2],
      },
    ],
  },
];
const preDefinedProjectionConfig = {
  rotate: [0, 0, 0],
  center: [0, 35],
  scale: 250,
};
//#endregion

type TSupplierCountByMap = {
  [key in EnumRegionAndSubRegion]: number;
};

const initialSupplierCountByMap: TSupplierCountByMap = {
  [EnumRegion.Americas]: 0,
  [EnumRegion.EMEA]: 0,
  [EnumRegion.APAC]: 0,
  [EnumSubRegion.NorthNCentralAmerica]: 0,
  [EnumSubRegion.SouthAmerica]: 0,
  [EnumSubRegion.Europe]: 0,
  [EnumSubRegion.Africa]: 0,
  [EnumSubRegion.Asia]: 0,
  [EnumSubRegion.MiddleEast]: 0,
  [EnumSubRegion.Oceania]: 0,
};

interface IMapChart {
  onSelectCountryFilter: (countryCode: string) => void;
}
export default function MapChart({ onSelectCountryFilter }: IMapChart) {
  const [center, setCenter] = useState<[number, number]>([0, 0]); // [longitude, latitude
  const [zoom, setZoom] = useState<number>(1);
  const [markers, setMarkers] = useState<IMarker[]>(preDefinedMarkers);
  const [selectedRegion, setSelectedRegion] =
    useState<EnumRegionAndSubRegion | null>(null);

  const [supplierCountByMap, setSupplierCountByMap] =
    useState<TSupplierCountByMap>({ ...initialSupplierCountByMap });
  const [supplierCountByCountryMap, setSupplierCountByCountryMap] = useState<
    Record<string, number>
  >({});

  const {
    suppliers,
    stats,
    allCountries,
    setAllCountries,
    setSelectedRegions,
    setSelectedCountries,
    selectedCountries,
    filterData,
    setFilterData,
    allSubRegions,
    flags,
  } = useStore();

  /*** ***************
   * Component lifecycle
   * *****************
   */

  useEffect(() => {
    const newMap = { ...initialSupplierCountByMap };
    const newSupplierCountByCountryMap: Record<string, number> = {};
    const keys = Object.keys(allSubRegions);
    for (let i = 0; i < keys.length; i++) {
      const item = allSubRegions[keys[i] as any];
      const threeLetterCode = TwoLetterCodeToCountryCodeMap[item.code];
      if (!threeLetterCode) {
        console.log("no threeLetterCode for", item);
        continue;
      }
      const region = CountryToRegionMap[threeLetterCode];
      const subRegion = CountryToSubRegionMap[threeLetterCode];
      if (!region || !subRegion) {
        console.log("no region or subRegion for", threeLetterCode);
        continue;
      }
      newMap[region] += item.countSuppliersInLocation;
      newMap[subRegion] += item.countSuppliersInLocation;
      newSupplierCountByCountryMap[threeLetterCode] =
        item.countSuppliersInLocation;
    }
    console.log("newMap", newMap);
    console.log("newSupplierCountByCountryMap", newSupplierCountByCountryMap);
    setSupplierCountByMap(newMap);
    setSupplierCountByCountryMap(newSupplierCountByCountryMap);
  }, [allSubRegions]);

  /****************
   *  Map Controls
   * **************
   */
  const zoomToRegion = (
    name: EnumRegionAndSubRegion,
    coordinates: [number, number]
  ) => {
    setSelectedRegion(name);
    setCenter(coordinates);
    setZoom(zoom + 0.5);
    console.log(name, coordinates, zoom);
    const regionMarker = preDefinedMarkers.find((x) => x.name === name);
    if (regionMarker?.subMarkers !== undefined) {
      setMarkers(regionMarker.subMarkers);
    } else {
      setMarkers([]);
    }
  };

  const reset = () => {
    setZoom(1);
    setMarkers(preDefinedMarkers);
    setCenter([0, 0]);
  };

  const onMoveEnd = (position: {
    coordinates: [number, number];
    zoom: number;
  }) => {
    if (position.zoom <= 1) {
      // reset
      reset();
    }
  };

  /****************
   *  Data Controls
   * **************
   */

  const getNumberOfSuppliers = (countryCode: string) => {
    const region = Object.values(allSubRegions).find(
      (s: any) => s.code === countryCode
    );
    if (!region) return 0;
    if (!stats || !stats.locationId || !flags.q)
      return region.countSuppliersInLocation || 0;
    return stats?.locationId?.[region.id] || 0;
  };

  //Get Number of suppliers for country
  const getNumberOfSuppliersByRegion = (countryCode: string) => {
    const region = Object.values(allSubRegions).find(
      (s: any) => s.code === countryCode
    );
    if (!region) return 0;
    console.log("region", stats[region?.id]);
    console.log("region", region?.id);
    if (region) console.log("stats", stats?.locationId?.[region?.id]);
    if (!flags.q) return region.countSuppliersInLocation || 0;
    return region ? stats?.locationId?.[region?.id] : 0;
  };

  const checkZoomLevelEnough = () => {
    return selectedRegion !== null && isSubRegion(selectedRegion);
  };

  const selectCountry = (countryCode: string) => {
    if (checkZoomLevelEnough()) {
      onSelectCountryFilter(countryCode);
    }
  };

  const styleCalucator = (geo: {
    // got this from debug console. prob form features.json
    id: string; // 3 letter code
    geometry: { type: "Polygon" | "MultiPolygon"; coordinates: number[][][] };
    properties: { name: string };
    rsmKey: string;
  }) => {
    let fill = MapRegionToColor[CountryToRegionMap[geo.id]];
    let hoverFill = MapRegionToColor[CountryToRegionMap[geo.id]];
    let stroke = "none";
    const zoomLevelEnough = checkZoomLevelEnough();
    if (zoomLevelEnough) {
      stroke = "#FFDA44";
    }
    return {
      geographiesStyle: {
        default: {
          fill: fill,
          outline: "none",
        },
        hover: {
          outline: "none",
          fill: hoverFill,
          stroke: stroke,
          strokeWidth: 1,
        },
        pressed: { outline: "none" },
      },
      tooltip: zoomLevelEnough
        ? geo.properties.name + supplierCountByCountryMap[geo.id]
        : "",
    };
  };
  return (
    <Box
      width={"100%"}
      height={"38vh"}
      display={"flex"}
      justifyContent={"center"}
    >
      <ComposableMap
        width={window.screen.width * 0.6}
        projection="geoMercator"
        projectionConfig={preDefinedProjectionConfig as any}
      >
        <ZoomableGroup zoom={zoom} center={center} onMoveEnd={onMoveEnd}>
          <Geographies geography={geo}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const { geographiesStyle, tooltip } = styleCalucator(geo);
                return (
                  <Tooltip key={geo.rsmKey} title={tooltip} followCursor>
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => {
                        selectCountry(geo.id);
                      }}
                      style={geographiesStyle}
                    />
                  </Tooltip>
                );
              })
            }
          </Geographies>

          {markers.map((e) => (
            <MapMarker
              key={e.name}
              marker={e}
              onMarkerClick={zoomToRegion}
              count={supplierCountByMap[e.name]}
            />
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </Box>
  );
}
