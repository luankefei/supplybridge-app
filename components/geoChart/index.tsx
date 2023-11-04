import { Box, IconButton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { Tooltip as ReactToolTip } from "react-tooltip";
import {
  EnumRegionAndSubRegion,
  MapColors,
  MapRegionToColor,
  MapRegionToMarkerColor,
  MapSubRegionToRegion,
  getGeoJsonAndProjectConfig,
  isRegion,
  legendKeyMap,
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
import { EnumRegion, EnumSubRegion } from "./types";

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
  const [selectedRegion, setSelectedRegion] = useState<
    EnumRegionAndSubRegion | "world"
  >("world");
  const [zoom, setZoom] = useState<number>(1);

  // This is content for chart mouseover tooltip
  const [tooltipContent, setToolTipContent] = useState<string>("");
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

  const reset = () => {
    setSelectedRegion("world");
  };

  const zoomOut = () => {
    if (selectedRegion === "world") return;
    if (isRegion(selectedRegion)) {
      setSelectedRegion("world");
      return;
    }
    setSelectedRegion(MapSubRegionToRegion[selectedRegion as EnumSubRegion]);
  };

  /****************
   *  Data Controls
   * **************
   */
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
    const zoomLevelEnough = true;

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
        strokeWidth: 0,
        outline: "none",
      },
      hover: {
        outline: "none",
        fill: fill,
        stroke: stroke,
        strokeWidth: 1,
      },
      pressed: { outline: "none" },
    };
  };

  const renderTotalCount = () => {
    let counts: [string, number][] = [];
    const a = supplierCountByMap[EnumRegion.Americas];
    const emea = supplierCountByMap[EnumRegion.EMEA];
    const apac = supplierCountByMap[EnumRegion.APAC];
    const Total = a + emea + apac;

    switch (selectedRegion) {
      case "world":
        counts = Object.entries({
          [EnumRegion.Americas]: a,
          [EnumRegion.EMEA]: emea,
          [EnumRegion.APAC]: apac,
          Total,
        });
        break;
      case EnumRegion.Americas:
        counts = Object.entries({
          [EnumSubRegion.NorthNCentralAmerica]:
            supplierCountByMap[EnumSubRegion.NorthNCentralAmerica],
          [EnumSubRegion.SouthAmerica]:
            supplierCountByMap[EnumSubRegion.SouthAmerica],
          Total: a,
        });
        break;
      case EnumRegion.EMEA:
        counts = Object.entries({
          [EnumSubRegion.Europe]: supplierCountByMap[EnumSubRegion.Europe],
          [EnumSubRegion.Africa]: supplierCountByMap[EnumSubRegion.Africa],
          [EnumSubRegion.MiddleEast]:
            supplierCountByMap[EnumSubRegion.MiddleEast],
          Total: emea,
        });
        break;
      case EnumRegion.APAC:
        counts = Object.entries({
          [EnumSubRegion.Asia]: supplierCountByMap[EnumSubRegion.Asia],
          [EnumSubRegion.Oceania]: supplierCountByMap[EnumSubRegion.Oceania],
          Total: apac,
        });
        break;
      case EnumSubRegion.NorthNCentralAmerica:
      case EnumSubRegion.SouthAmerica:
      case EnumSubRegion.Europe:
      case EnumSubRegion.Africa:
      case EnumSubRegion.Asia:
      case EnumSubRegion.MiddleEast:
      case EnumSubRegion.Oceania:
        counts = Object.entries({
          ...supplierCountByCountryMap,
          Total: supplierCountByMap[selectedRegion],
        }).filter(
          (item) =>
            CountryToSubRegionMap[item[0]] === selectedRegion ||
            item[0] === "Total"
        );
        break;
      default:
        counts = Object.entries({ ...supplierCountByCountryMap, Total });
        break;
    }
    return (
      <Legend
        counts={counts}
        onBack={selectedRegion !== "world" ? zoomOut : undefined}
        onClick={(key) => {
          const srk = legendKeyMap[key];
          srk && setSelectedRegion(srk as EnumRegionAndSubRegion);
        }}
      />
    );
  };
  // @ts-ignore
  const { geoJson, projectConfig } = getGeoJsonAndProjectConfig(selectedRegion);
  return (
    <>
      <ReactToolTip
        id="chart-tooltip"
        content={tooltipContent}
        place="bottom"
      />
      <Box
        position={"relative"}
        width={"80%"}
        margin={"auto"}
        height={"50vh"}
        display={"flex"}
        justifyContent={"center"}
        border={"1px solid #E5E7EB"}
        borderRadius={"24px"}
      >
        <ComposableMap
          width={window.screen.width}
          style={{
            borderRadius: "24px",
          }}
          projection="geoMercator"
          projectionConfig={projectConfig as any}
          data-tooltip-id="chart-tooltip"
        >
          <Geographies geography={geoJson}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const geographiesStyle = styleCalucator(geo);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={geographiesStyle}
                    onMouseEnter={() => setToolTipContent(geo.properties.name)}
                    // onMouseLeave={() => setToolTipContent("")}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
        <Stack
          sx={{
            position: "absolute",
            bottom: 24,
            right: -88,
            backgroundColor: "#F3F4F6",
            borderRadius: "8px",
            padding: "8px",
            overflow: "scroll",
          }}
        >
          {renderTotalCount()}
        </Stack>
      </Box>
    </>
  );
}
