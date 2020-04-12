import {
  Marker,
  MarkerOptions
} from 'leaflet';
import {Attraction} from '../api/attraction/attraction';
import {LatLonService} from '../domain/lat-lon/lat-lon.service';

/**
 * Extends the Leaflet Marker with a ClueRide.Attraction so any marker events will carry the ID of
 * the Attraction the marker represents.
 */
export class ClickableMarker extends Marker {
  attractionId: number;

  /**
   * Builds extended Marker which allows carrying the associated Attraction ID.
   *
   * The Options allow setting a hover name and the Icon to use for the Marker.
   *
   * @param attraction represented by the marker.
   * @param options provide an opportunity to set the options on the Marker.
   */
  constructor(
    attraction: Attraction,
    options: MarkerOptions,
  ) {
    super(LatLonService.staticToLatLng(attraction.latLon), options);
    this.attractionId = attraction.id;
  }

}
