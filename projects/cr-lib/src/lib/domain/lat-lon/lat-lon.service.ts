import {Injectable} from '@angular/core';
import {Geoposition} from '@ionic-native/geolocation';
import * as L from 'leaflet';
import {isArray} from 'util';
import {LatLon} from './lat-lon';

/**
 * Performs conversions between the various representations of an Attraction's position:.
 *
 * These are the position representations:
 * <ul>
 *     <li>`Geoposition` - The browser and/or device supplies Latitude and Longitude information within
 *     the `coords` attribute of its object.
 *     <li> `LatLng` - Leaflet represents a point using a simple ordered pair of values and allows a variety
 *     of ways to specify that pair.
 *     <li> `LatLon` - Back-end representation which also carries an ID which allows recognizing
 *     a specific Lat/Lon pair as a distinct node from another node that is arbitrarily close. It is
 *     also possible for two distinct LatLon instances to have exactly the same values for
 *     latitude and longitude.
 * </ul>
 *
 */
@Injectable({
  providedIn: 'root'
})
export class LatLonService {
  constructor() {}

  static staticToLatLng(latLon: LatLon) {
    return new L.LatLng(
      (latLon as LatLon).lat,
      (latLon as LatLon).lon
    );
  }

  /**
   * Accepts either LatLon or LatLng and turns it into Geoposition.
   *
   * This translation sets `coords.accuracy` to zero and all other values to null.
   *
   * @param position - either a LatLon or LatLng.
   * @return Geoposition - matching the inbound LatLon or LatLng.
   */
  toGeoPosition(position:  number[] | LatLon | L.LatLng ): Geoposition {
    let lat;
    let lon;

    if (position.hasOwnProperty('id')) {
      lat = (<LatLon>position).lat;
      lon = (<LatLon>position).lon;
    } else {
      if (isArray(position)) {
        lat = position[0];
        lon = position[1];
      } else {
        lat = (<L.LatLng>position).lat;
        lon = (<L.LatLng>position).lng;
      }
    }
    return {
      coords: {
        latitude: lat,
        longitude: lon,
        accuracy: 0.0,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null
      },
      timestamp: null
    };
  }

  /**
   * Accepts either browser's Geoposition or LatLon from back-end,
   * and returns Leaflet's LatLng.
   *
   * Altitude is set to zero in all cases.
   *
   * @param geoPosition from browser or LatLon from back-end.
   * @return Leaflet's LatLng point that matches.
   */
  toLatLng(geoPosition: Geoposition | LatLon): L.LatLng {
    if (geoPosition.hasOwnProperty('id')) {
      return new L.LatLng(
        (geoPosition as LatLon).lat,
        (geoPosition as LatLon).lon
      );
    } else {
      return new L.LatLng(
        (geoPosition as Geoposition).coords.latitude,
        (geoPosition as Geoposition).coords.longitude
      );
    }
  }


  /**
   * Accepts either browser's Geoposition or LatLon from back-end,
   * and returns Leaflet's LatLng -- with the decimal values fixed
   * at 6 digits. This is intended for display.
   *
   * Altitude is set to zero in all cases.
   *
   * @param geoPosition from browser or LatLon from back-end.
   * @return Leaflet's LatLng point that matches.
   */
  toFixedLatLng(geoPosition: Geoposition | LatLon): string {
    let point = this.toLatLng(geoPosition);

    return '('
      + point.lat.toFixed(6) + ','
      + point.lng.toFixed(6)
      + ')';
  }


  /**
   * Accepts Geoposition and turns it into a value that can be submitted to the back-end.
   *
   * Until the back-end responds, this instance won't carry its unique identifier since this
   * is assigned by the back-end.
   *
   * @param geoPosition from the browser or device.
   * @return LatLon suitable for sending to the back-end.
   */
  toLatLon(geoPosition: Geoposition): LatLon {
    return {
      id: null,
      lat: geoPosition.coords.latitude,
      lon: geoPosition.coords.longitude,
    };
  }

}
