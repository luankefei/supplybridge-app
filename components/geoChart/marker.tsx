import { Marker } from "react-simple-maps";
import { EnumRegionAndSubRegion } from "./geoUtils";

export interface IMarker {
  name: EnumRegionAndSubRegion;
  coordinates: [number, number];
  color: string;
  r: number;
  subMarkers?: IMarker[];
}

interface IMapMarker {
  marker: IMarker;
  count?: number;
  fontSize?: number;
  onMarkerClick: (
    name: EnumRegionAndSubRegion,
    coordinates: [number, number]
  ) => void;
}
/**
 * MapCircleMarker
 * -- draws a circle marker on the map
 *
 * @param marker -- the marker to be rendered, need name, coordinates, color, r (radius)
 * @param count -- count, will be rendered as second line of text
 */
export default function MapCircleMarker({
  marker,
  count,
  fontSize,
  onMarkerClick,
}: IMapMarker) {
  const { name, coordinates, r, color } = marker;
  if (!count) {
    return null;
  }
  return (
    <Marker
      key={name}
      coordinates={coordinates}
      onClick={() => onMarkerClick(name, coordinates)}
    >
      <g
        fill={color}
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(-12, -24)"
        style={{ cursor: "pointer" }}
      >
        <circle cx="12" cy="10" r={r} />
      </g>
      <text
        fontSize={fontSize || 12}
        textAnchor="middle"
        y={-20}
        style={{ fill: "white", cursor: "pointer" }}
      >
        {name}
      </text>
      <text
        fontSize={fontSize || 12}
        textAnchor="middle"
        y={10}
        style={{ fill: "white", cursor: "pointer" }}
      >
        {count}
      </text>
    </Marker>
  );
}
