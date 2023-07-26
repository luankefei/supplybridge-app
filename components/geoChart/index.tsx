import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
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
  TwoLetterCodeToCounryCoordinatesMap,
  TwoLetterCodeToCountryCodeMap,
} from "./geoIdMap";
import { useStore } from "hooks/useStore";
import MapCircleMarker, { IMarker } from "./marker";
import styled from "styled-components";
import { debounce } from "utils/util";
import { addToDict } from "utils/dict";

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
  onSelectCountryFilter: (threeLetterCode: string) => void;
}
/**
 * This is the map chart component
 */
export default function MapChart({ onSelectCountryFilter }: IMapChart) {
  const [center, setCenter] = useState<[number, number]>([0, 0]); // [longitude, latitude
  const [zoom, setZoom] = useState<number>(1);
  const [markers, setMarkers] = useState<IMarker[]>(preDefinedMarkers);
  const [selectedRegion, setSelectedRegion] =
    useState<EnumRegionAndSubRegion | null>(null);

  // threeLetterCodes are used when we get data from features.json
  // twoLetterCodes are used when we get data from backend.
  // there's 2 maps to convert between them
  // this uses 3 LetterCodes
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  /**
   * One time data for the map
   */
  const [supplierCountByMap, setSupplierCountByMap] =
    useState<TSupplierCountByMap>({ ...initialSupplierCountByMap });
  const [supplierCountByCountryMap, setSupplierCountByCountryMap] = useState<
    Record<string, number>
  >({});
  // Key = 2 letter code, value = number of suppliers
  const [labels, setLabels] = useState<Record<string, number>>({});

  const { suppliers, stats, allSubRegions, flags } = useStore();

  /*** ***************
   * Component lifecycle
   * *****************
   */

  useEffect(() => {
    // Initiallize with empty data.
    const newMap = { ...initialSupplierCountByMap };
    const newSupplierCountByCountryMap: Record<string, number> = {};
    const newLabels: Record<string, number> = {};

    if (suppliers.length === 0) {
      /**
       * This logic sets default data when there's no suppliers
       * allSubRegions contains all the regional counts, so
       * all we need to do is aggregate this data
       */
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
        newLabels[item.code] = item.countSuppliersInLocation;
      }
    } else {
      /**
       * When users does some query, we have suppliers in our store.
       * The object itself is a list of suppliers, and each supplier
       * has a headquarter locationId. And locationId as a list of
       * all of its locations. So here we aggregate the data by suppliers.
       */
      for (let i = 0; i < suppliers.length; i++) {
        const supplier = suppliers[i];
        if (Array.isArray(supplier.locationId)) {
          supplier.locationId.forEach((lid) => {
            const twoLetterCode = allSubRegions[lid];
            if (!twoLetterCode) {
              console.log("no twoLetterCode for", lid);
              return;
            }
            const threeLetterCode =
              TwoLetterCodeToCountryCodeMap[twoLetterCode.code];
            const region = CountryToRegionMap[threeLetterCode];
            const subRegion = CountryToSubRegionMap[threeLetterCode];

            newMap[region] += 1;
            newMap[subRegion] += 1;
            addToDict(newSupplierCountByCountryMap, threeLetterCode, 1);
            addToDict(newLabels, twoLetterCode.code, 1);
          });
        }
      }
    }

    console.log("newMap", newMap);
    console.log("newSupplierCountByCountryMap", newSupplierCountByCountryMap);
    console.log("newLabels", newLabels);
    setSupplierCountByMap(newMap);
    setSupplierCountByCountryMap(newSupplierCountByCountryMap);
    setLabels(newLabels);
  }, [suppliers, allSubRegions]);

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
    console.log("zooming into", name, coordinates, zoom);
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
    setSelectedRegion(null);
    setHoveredCountry(null);
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
  const checkZoomLevelEnough = () => {
    return selectedRegion !== null && isSubRegion(selectedRegion);
  };

  const selectCountry = (threeLetterCode: string) => {
    if (checkZoomLevelEnough()) {
      onSelectCountryFilter(threeLetterCode);
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
    };
  };

  const renderHoveredCountry = () => {
    if (!checkZoomLevelEnough() || !hoveredCountry) {
      return null;
    }
    const tlc = CountryToTwoLetterCodeMap[hoveredCountry];
    const coor = TwoLetterCodeToCounryCoordinatesMap[tlc];
    const label = labels[tlc];
    // Why do we need 2 ifs?
    // becuase I want to distinguish between no coor and no label
    if (!coor) {
      console.log("no coor for", hoveredCountry);
      return null;
    }
    if (!label) {
      console.log("no data for", hoveredCountry);
      return null;
    }
    return (
      <Marker coordinates={[coor.longitude, coor.latitude]}>
        <text
          fontSize={8}
          textAnchor="middle"
          alignmentBaseline="middle"
          fill="white"
        >
          {hoveredCountry}
        </text>
        <text
          fontSize={8}
          textAnchor="middle"
          y={10}
          alignmentBaseline="middle"
          fill="white"
        >
          {label}
        </text>
      </Marker>
    );
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
                const geographiesStyle = styleCalucator(geo);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      setHoveredCountry(geo.id);
                    }}
                    onMouseLeave={() => {}}
                    onClick={() => {
                      selectCountry(geo.id);
                    }}
                    style={geographiesStyle}
                  />
                );
              })
            }
          </Geographies>
          {renderHoveredCountry()}
          {markers.map((e) => (
            <MapCircleMarker
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
