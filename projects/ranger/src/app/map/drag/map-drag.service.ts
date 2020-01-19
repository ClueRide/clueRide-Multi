import {Injectable} from '@angular/core';
import {Geoposition} from '@ionic-native/geolocation';
import {
  LatLon,
  LatLonService
} from 'cr-lib';
import {Subject} from 'rxjs';
import {MapDataService} from '../data/map-data.service';

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
    private latLonService: LatLonService,
    private mapDataService: MapDataService
  ) {
    this.centerSubject = mapDataService.getReportedPositionSubject();
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
      // TODO CI-64: Not clear that I need to propagate this
      // this.sendDragEndLocation(map.getCenter());
      this.dragInProgress = false;
    });

  }

  isDragInProgress(): boolean {
    return this.dragInProgress;
  }

  sendDragEndLocation(latLon: LatLon) {
    console.log('Setting new map center from Map Drag');
    this.centerSubject.next(
      this.latLonService.toGeoposition(
        latLon
      )
    );
  }

}
