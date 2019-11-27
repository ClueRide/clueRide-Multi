/**
 * How we place this on the Map.
 */
export class LatLon {
  id: number;
  // TODO: Resolve the confusion over both lon and lng accessors.
  // May want one of the geographical types understood by leaflet
  lat: number;
  lon: number;
  lng: number;
}
