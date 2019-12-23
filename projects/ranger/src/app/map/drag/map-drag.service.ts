import {Injectable} from '@angular/core';
import {Geoposition} from '@ionic-native/geolocation';
import {LatLon} from 'cr-lib';
import {Subject} from 'rxjs';
import {MapDataService} from '../data/map-data.service';

// TODO: CI-37 - part of the transformation of Geoposition and LatLon.
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

/**
 * This responds to map drag events and is a source of new position info which is pushed
 * to the MapDataService.
 */
@Injectable({
  providedIn: 'root'
})
export class MapDragService {

  /** Set to true if the center of the map should follow either Device or Tether instead of Drag. */
  private autoCenterFlag = true;
  private mapInstance: any;
  private centerSubject: Subject<Geoposition>;
  private dragInProgress = false;

  constructor(
    private mapDataService: MapDataService
  ) {
    // TODO: Not clear that I need this
    this.centerSubject = mapDataService.getReportedPosition();
  }

  public isAutoCenter(): boolean {
    return this.autoCenterFlag;
  }

  setAutoCenter(autoCenter: boolean) {
    console.log('AutoCenter set to ' + autoCenter);
    this.autoCenterFlag = autoCenter;
  }

  useMap(
    map: any
  ) {
    this.mapInstance = map;

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
    // TODO: Not clear that I need to propagate this
    this.centerSubject.next(
      buildGeoPositionFromLatLon(
        latLon
      )
    );
  }

}
