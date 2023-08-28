/**
 * Woulda use geoChart/index.tsx
 * but the way its written, it's not reusable
 * so just copy and paste the code here
 */
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import geo from "./features.json";
import { MapRegionToColor } from "./geoUtils";
import {
  CountryToRegionMap,
  TwoLetterCodeToCounryCoordinatesMap,
} from "./geoIdMap";
import { usePersistentStore } from "hooks/useStore";

const SCALE_SIZE = 50;
const preDefinedProjectionConfig = {
  rotate: [0, 0, 0],
  center: [0, 35],
  scale: SCALE_SIZE,
};

interface IDetailMapChart {
  dimensions: {
    width: number;
    height: number;
  };
  locationIds: number[];
}
/**
 * By default, shows green dots on the map
 * localtionIds is an array of location ids
 * green dots will be at those locations' center coordinates
 *
 * By default the map has no width and height constraints, use
 * parent component to control the size
 */
export default function DetailMapChart({
  dimensions,
  locationIds,
}: IDetailMapChart) {
  const { allSubRegions } = usePersistentStore();

  const _renderMarker = (coordinates: [number, number]) => {
    return (
      <Marker coordinates={coordinates}>
        <g fill={"#00C48C"} stroke="white" strokeWidth="0.25">
          <circle cx="6" cy="6" r={5.5} fill="#08979C" />
        </g>
      </Marker>
    );
  };
  const renderDots = (locationIds: number[]) => {
    const results = [];
    for (let lid of locationIds) {
      const twoLetterCode = allSubRegions[lid];
      const tlc = twoLetterCode.code;
      const coor = TwoLetterCodeToCounryCoordinatesMap[tlc];
      results.push(_renderMarker([coor.longitude, coor.latitude]));
    }
    return results;
  };
  return (
    <ComposableMap
      width={dimensions.width}
      height={dimensions.height}
      style={{
        borderRadius: "24px",
      }}
      projection="geoMercator"
      projectionConfig={preDefinedProjectionConfig as any}
    >
      <Geographies geography={geo}>
        {({ geographies }) =>
          geographies.map((geo) => {
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: "#E5E7EB",
                    stroke: "#868686",
                    strokeWidth: 0.25,
                    outline: "none",
                  },
                  hover: {
                    fill: "#E5E7EB",
                    stroke: "#868686",
                    strokeWidth: 0.25,
                    outline: "none",
                  },
                  pressed: {
                    outline: "none",
                  },
                }}
              />
            );
          })
        }
      </Geographies>
      {renderDots(locationIds)}
    </ComposableMap>
  );
}
