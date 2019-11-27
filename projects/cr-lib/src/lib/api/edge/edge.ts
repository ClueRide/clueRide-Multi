/**
 * Currently matches the GeoJSON produced by the edge/geojson REST endpoint.
 */
export class Edge {
  type: string;
  geometry: string;
  properties: {
    id: number;
    name: string;
    track_reference: string;
  };
}
