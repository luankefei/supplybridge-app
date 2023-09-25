import { Box, IconButton, Stack } from "@mui/material";
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
  MapColors,
  MapRegionToColor,
  MapRegionToMarkerColor,
} from "./geoUtils";
import {
  CountryToRegionMap,
  CountryToSubRegionMap,
  CountryToTwoLetterCodeMap,
  TwoLetterCodeToCounryCoordinatesMap,
  TwoLetterCodeToCountryCodeMap,
} from "./geoIdMap";
import { usePersistentStore, useStore } from "hooks/useStore";
import { IMarker } from "./marker";
import { addToDict } from "utils/dict";
import { Add, Remove, Replay } from "@mui/icons-material";
import { SpacingVertical } from "components/ui-components/spacer";
import { Legend } from "./legend";

//#region map Constants
const RADIUS_SIZE = [155, 100, 50, 60];
const SCALE_SIZE = 200;
const INITIAL_ZOOM = 1;
const INITIAL_CENTER: [number, number] = [1.96, 47.224];
// These numbers are tied to the scale of the map
// i have no idea how to translate them, this is tried out by hand
const preDefinedMarkers: IMarker[] = [
  {
    name: EnumRegion.Americas,
    coordinates: [-108, 34],
    r: RADIUS_SIZE[0],
    color: MapRegionToMarkerColor[EnumRegion.Americas],
    subMarkers: [
      {
        name: EnumSubRegion.NorthNCentralAmerica,
        coordinates: [-108, 34],
        color: MapRegionToMarkerColor[EnumRegion.Americas],
        r: RADIUS_SIZE[0],
      },
      {
        name: EnumSubRegion.SouthAmerica,
        coordinates: [-65, -25],
        r: RADIUS_SIZE[1],
        color: MapRegionToMarkerColor[EnumRegion.Americas],
      },
    ],
  },
  {
    name: EnumRegion.EMEA,
    coordinates: [18, 10],
    r: RADIUS_SIZE[1],
    color: MapRegionToMarkerColor[EnumRegion.EMEA],
    subMarkers: [
      {
        name: EnumSubRegion.Europe,
        coordinates: [10, 45],
        r: RADIUS_SIZE[2],
        color: MapRegionToMarkerColor[EnumRegion.EMEA],
      },
      {
        name: EnumSubRegion.Africa,
        coordinates: [15, -3],
        r: RADIUS_SIZE[1],
        color: MapRegionToMarkerColor[EnumRegion.EMEA],
      },
      {
        name: EnumSubRegion.MiddleEast,
        coordinates: [45, 26],
        r: RADIUS_SIZE[2],
        color: MapRegionToMarkerColor[EnumRegion.APAC],
      },
    ],
  },
  {
    name: EnumRegion.APAC,
    coordinates: [108, 34],
    r: RADIUS_SIZE[1],
    color: MapRegionToMarkerColor[EnumRegion.APAC],
    subMarkers: [
      {
        name: EnumSubRegion.Asia,
        coordinates: [102, 36],
        r: RADIUS_SIZE[1],
        color: MapRegionToMarkerColor[EnumRegion.APAC],
      },
      {
        name: EnumSubRegion.Oceania,
        coordinates: [140, -30],
        r: RADIUS_SIZE[3],
        color: MapRegionToMarkerColor[EnumRegion.APAC],
      },
    ],
  },
];
const preDefinedProjectionConfig = {
  rotate: [0, 0, 0],
  center: [0, 35],
  scale: SCALE_SIZE,
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
  parentTriggeredReset: boolean;
  selectedCountry?: string;
  onSelectCountryFilter: (threeLetterCode?: string, count?: number) => void;
}
/**
 * This is the map chart component. It's mostly self-contained
 *
 * @param selectedCountry - the selected country, this is passed in because we want to highlight the selected country, use this country as a filter, so we use its parent to control this state
 * @param onSelectCountryFilter - callback to select a country
 */
export default function MapChart({
  parentTriggeredReset,
  selectedCountry,
  onSelectCountryFilter,
}: IMapChart) {
  const [center, setCenter] = useState<[number, number]>(INITIAL_CENTER); // [longitude, latitude
  const [zoom, setZoom] = useState<number>(INITIAL_ZOOM);
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

  // Key = 3 letter code, value = number of suppliers
  // This is not used for now, but we might need it later.
  const [supplierCountByCountryMap, setSupplierCountByCountryMap] = useState<
    Record<string, number>
  >({});
  // Key = 2 letter code, value = number of suppliers
  const [labels, setLabels] = useState<Record<string, number>>({});

  const { suppliers } = useStore();
  const { allSubRegions } = usePersistentStore();
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
       * When a user does some query, we have suppliers in our store.
       * The object itself is a list of suppliers, and each supplier
       * has a headquarterId, locationId. And locationId is a list of
       * all of its locations. So here we aggregate the data by suppliers.
       */
      for (let i = 0; i < suppliers.length; i++) {
        const supplier = suppliers[i];
        if (Array.isArray(supplier.locationId)) {
          supplier.locationId.forEach((lid) => {
            const twoLetterCode = allSubRegions[lid];
            if (!twoLetterCode) {
              console.error("no twoLetterCode for", lid);
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

    console.debug("newMap", newMap);
    console.debug("newSupplierCountByCountryMap", newSupplierCountByCountryMap);
    console.debug("newLabels", newLabels);
    setSupplierCountByMap(newMap);
    setSupplierCountByCountryMap(newSupplierCountByCountryMap);
    setLabels(newLabels);
  }, [suppliers, allSubRegions]);

  useEffect(() => {
    reset();
  }, [parentTriggeredReset]);

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
    const regionMarker = preDefinedMarkers.find((x) => x.name === name);
    if (regionMarker?.subMarkers !== undefined) {
      setMarkers(regionMarker.subMarkers);
    } else {
      setMarkers([]);
    }
  };

  const reset = () => {
    setZoom(INITIAL_ZOOM);
    setMarkers(preDefinedMarkers);
    setCenter(INITIAL_CENTER);
    setSelectedRegion(null);
    setHoveredCountry(null);
    onSelectCountryFilter(undefined, undefined);
  };

  const onMoveEnd = (position: {
    coordinates: [number, number];
    zoom: number;
  }) => {
    if (position.zoom <= 1) {
      // reset
      reset();
    }
    setCenter(position.coordinates);
    setZoom(position.zoom);
  };
  const resetZoom = () => {
    setZoom(INITIAL_ZOOM);
    setCenter(INITIAL_CENTER);
  };
  const zoomIn = () => {
    if (zoom < 10) {
      setZoom(zoom * 1.1);
    }
  };
  const zoomOut = () => {
    if (zoom > 1) {
      setZoom(Math.max(zoom * 0.9, 1));
    }
  };

  /****************
   *  Data Controls
   * **************
   */
  const checkZoomLevelEnough = () => {
    // return selectedRegion !== null && isSubRegion(selectedRegion);
    return true;
  };

  const selectCountry = (threeLetterCode: string) => {
    const tlc = CountryToTwoLetterCodeMap[threeLetterCode];
    if (
      checkZoomLevelEnough() &&
      labels[tlc] !== undefined &&
      labels[tlc] > 0
    ) {
      onSelectCountryFilter(threeLetterCode, labels[tlc]);
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
      stroke = MapColors.strokeColor;
      hoverFill = MapColors.hoveredBg;
      const tlc = CountryToTwoLetterCodeMap[geo.id];
      if (labels[tlc] === undefined || labels[tlc] === 0) {
        fill = MapColors.greyColor;
        hoverFill = MapColors.greyColor;
      }
    }
    if (geo.id === selectedCountry) {
      fill = MapColors.selectedBg;
      hoverFill = MapColors.selectedBg;
    }

    return {
      default: {
        fill: fill,
        stroke: stroke,
        strokeWidth: 0.75,
        outline: "none",
      },
      hover: {
        outline: "none",
        fill: fill,
        stroke: stroke,
        strokeWidth: 1,
        cursor: "pointer",
      },
      pressed: { outline: "none" },
    };
  };
  const renderMarkerSelectedCountry = () => {
    if (!checkZoomLevelEnough() || !selectedCountry) {
      return null;
    }
    const tlc = CountryToTwoLetterCodeMap[selectedCountry];
    const coor = TwoLetterCodeToCounryCoordinatesMap[tlc];
    const label = labels[tlc];
    return _renderMarker(
      coor.longitude,
      coor.latitude,
      selectedCountry,
      label.toString()
    );
  };
  const renderMarkerHoveredCountry = () => {
    if (!checkZoomLevelEnough() || !hoveredCountry) {
      return null;
    }
    const tlc = CountryToTwoLetterCodeMap[hoveredCountry];
    const coor = TwoLetterCodeToCounryCoordinatesMap[tlc];
    const threeL = TwoLetterCodeToCountryCodeMap[tlc];
    // const subRegion = CountryToSubRegionMap[threeL];
    const label = labels[tlc];
    // Why do we need 2 ifs?
    // becuase I want to distinguish between no coor and no label
    if (!coor) {
      console.log("no coor for", hoveredCountry);
      return null;
    }
    if (!label) {
      console.log("no label/count data for", hoveredCountry);
      return null;
    }
    // if (subRegion !== selectedRegion) {
    //   return null;
    // }
    return _renderMarker(
      coor.longitude,
      coor.latitude,
      hoveredCountry,
      label.toString()
    );
  };
  const _renderMarker = (
    longitude: number,
    latitude: number,
    line1: string,
    line2: string
  ) => {
    return (
      <Marker coordinates={[longitude, latitude]}>
        <text
          fontSize={12}
          textAnchor="middle"
          x={0.5}
          y={0.5}
          alignmentBaseline="middle"
          fill={MapColors.textShadowColor}
          pointerEvents="none"
        >
          {line1}
        </text>
        <text
          fontSize={12}
          textAnchor="middle"
          alignmentBaseline="middle"
          fill={MapColors.textColor}
          pointerEvents="none"
        >
          {line1}
        </text>

        <text
          fontSize={12}
          textAnchor="middle"
          x={0.5}
          y={10.5}
          alignmentBaseline="middle"
          fill={MapColors.textShadowColor}
          pointerEvents="none"
        >
          {line2}
        </text>
        <text
          fontSize={12}
          textAnchor="middle"
          y={10}
          alignmentBaseline="middle"
          fill={MapColors.textColor}
          pointerEvents="none"
        >
          {line2}
        </text>
      </Marker>
    );
  };
  const renderTotalCount = () => {
    let counts: [string, number][] = [];
    const a = supplierCountByMap[EnumRegion.Americas];
    const emea = supplierCountByMap[EnumRegion.EMEA];
    const apac = supplierCountByMap[EnumRegion.APAC];
    const Total = a + emea + apac;
    if (zoom < 2) {
      counts = Object.entries({
        [EnumRegion.Americas]: a,
        [EnumRegion.EMEA]: emea,
        [EnumRegion.APAC]: apac,
        Total,
      });
    } else if (zoom < 6) {
      counts = Object.entries({
        [EnumSubRegion.NorthNCentralAmerica]:
          supplierCountByMap[EnumSubRegion.NorthNCentralAmerica],
        [EnumSubRegion.SouthAmerica]:
          supplierCountByMap[EnumSubRegion.SouthAmerica],
        [EnumSubRegion.Europe]: supplierCountByMap[EnumSubRegion.Europe],
        [EnumSubRegion.Africa]: supplierCountByMap[EnumSubRegion.Africa],
        [EnumSubRegion.MiddleEast]:
          supplierCountByMap[EnumSubRegion.MiddleEast],
        [EnumSubRegion.Asia]: supplierCountByMap[EnumSubRegion.Asia],
        [EnumSubRegion.Oceania]: supplierCountByMap[EnumSubRegion.Oceania],
        Total,
      });
    } else {
      counts = Object.entries({ ...supplierCountByCountryMap, Total });
    }
    return <Legend counts={counts} />;
  };
  return (
    <Box
      position={"relative"}
      width={"80%"}
      margin={"auto"}
      height={"50vh"}
      display={"flex"}
      justifyContent={"center"}
    >
      <ComposableMap
        width={window.screen.width}
        style={{
          borderRadius: "24px",
        }}
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
                    style={geographiesStyle}
                  />
                );
              })
            }
          </Geographies>
          {renderMarkerHoveredCountry()}
          {renderMarkerSelectedCountry()}
        </ZoomableGroup>
      </ComposableMap>
      <Stack
        sx={{
          position: "absolute",
          bottom: 24,
          right: -88,
          backgroundColor: "#ecf0f1",
          borderRadius: "8px",
          padding: "8px",
          overflow: "scroll",
        }}
      >
        {renderTotalCount()}
      </Stack>
      <Stack
        sx={{
          position: "absolute",
          bottom: 24,
          left: 24,
        }}
      >
        <IconButton onClick={resetZoom} sx={{ bgcolor: "white" }}>
          <Replay />
        </IconButton>
        <SpacingVertical space="8px" />
        <IconButton
          onClick={zoomIn}
          sx={{
            bgcolor: "white",
          }}
        >
          <Add />
        </IconButton>
        <SpacingVertical space="8px" />
        <IconButton
          onClick={zoomOut}
          sx={{
            bgcolor: "white",
          }}
        >
          <Remove />
        </IconButton>
      </Stack>
    </Box>
  );
}
