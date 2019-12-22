import {Injectable} from '@angular/core';
import {Geoposition} from '@ionic-native/geolocation';
import {LatLon} from 'cr-lib';
import {BehaviorSubject} from 'rxjs';

function buildGeoPositionFromLatLon(latLon: LatLon): Geoposition {
  return {
    coords: {
      latitude: latLon.lat,
      longitude: latLon.lng || latLon.lon,
      accuracy: 0.0,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null
    },
    timestamp: null
  };
}

@Injectable({
  providedIn: 'root'
})
export class MapDragService {

  /** Set to true if the center of the map should follow either Device or Tether instead of Drag. */
  private autoCenterFlag = true;
  private mapInstance: any;
  private centerSubject: BehaviorSubject<Geoposition>;
  private dragInProgress = false;

  constructor(
    /* Currently no dependencies. */
  ) {
  }

  public isAutoCenter(): boolean {
    return this.autoCenterFlag;
  }

  setAutoCenter(autoCenter: boolean) {
    console.log('AutoCenter set to ' + autoCenter);
    this.autoCenterFlag = autoCenter;
  }

  useMap(
    map: any,
    centerSubject: BehaviorSubject<Geoposition>
  ) {
    this.mapInstance = map;
    this.centerSubject = centerSubject;

    map.on('movestart', () => {
      this.dragInProgress = true;
      this.setAutoCenter(false);
    });

    map.on('moveend', () => {
      this.sendDragEndLocation(map.getCenter());
      this.dragInProgress = false;
    });

  }

  isDragInProgress(): boolean {
    return this.dragInProgress;
  }

  sendDragEndLocation(latLon: LatLon) {
    console.log('Setting new map center from Map Drag');
    this.centerSubject.next(
      buildGeoPositionFromLatLon(
        latLon
      )
    );
  }

}
