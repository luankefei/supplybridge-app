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
  onMarkerClick: (
    name: EnumRegionAndSubRegion,
    coordinates: [number, number]
  ) => void;
}

export default function MapCircleMarker({
  marker,
  count,
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
      >
        <circle cx="12" cy="10" r={r} />
      </g>
      <text textAnchor="middle" y={-20} style={{ fill: "white" }}>
        {name}
      </text>
      <text textAnchor="middle" y={10} style={{ fill: "white" }}>
        {count}
      </text>
    </Marker>
  );
}
