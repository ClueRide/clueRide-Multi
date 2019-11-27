/**
 * Currently matches the GeoJson produced by the path/geojson REST endpoint.
 */
export class Path {
  type: string;
  features: [{
    type: string;
    geometry: string;
    // properties: {}
  }];
}
