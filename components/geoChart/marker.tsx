import { Marker } from "react-simple-maps";

export interface IMarker {
  name: string;
  coordinates: [number, number];
  r: number;
  subMarkers?: IMarker[];
}

interface IMapMarker {
  marker: IMarker;
  onMarkerClick: (name: string, coordinates: [number, number]) => void;
}

export default function MapMarker({ marker, onMarkerClick }: IMapMarker) {
  const { name, coordinates, r } = marker;
  return (
    <Marker
      key={name}
      coordinates={coordinates}
      onClick={() => onMarkerClick(name, coordinates)}
    >
      <g
        fill="rgba(139, 137, 185, 0.40)"
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
    </Marker>
  );
}
