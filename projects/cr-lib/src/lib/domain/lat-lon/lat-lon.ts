/**
 * Position information as tracked within the back-end.
 *
 * This may have an empty or undefined id if it is has not yet been sent
 * to the back-end for assigning an ID.
 */
export class LatLon {
  id: number;
  lat: number;
  lon: number;
}
