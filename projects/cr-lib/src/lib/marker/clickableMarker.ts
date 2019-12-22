import {
  Marker,
  MarkerOptions
} from 'leaflet';
import {Attraction} from '../api/attraction/attraction';

/**
 * Extends the Leaflet Marker with a ClueRide.Location ID so any marker events will carry the ID of
 * the location the marker represents.
 */
export class ClickableMarker extends Marker {
  attractionId: number;

  constructor(
    attraction: Attraction,
    options: MarkerOptions,
  ) {
    super(attraction.latLon, options);
    this.attractionId = attraction.id;
  }

}
