import {Injectable} from '@angular/core';
import {Geoposition} from '@ionic-native/geolocation';
import {
  LatLon,
  LatLonService
} from 'cr-lib';
import {Subject} from 'rxjs';
import {MapPositionService} from '../position/map-position.service';

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
    private mapPositionService: MapPositionService
  ) {
    this.centerSubject = mapPositionService.getReportedPositionSubject();
  }

  public isAutoCenter(): boolean {
    return this.autoCenterFlag;
  }

  setAutoCenter(autoCenter: boolean) {
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

  /**
   * This sends notification to listeners paying attention to where
   * the map is centered, typically components that want to create
   * an object at the map's current center.
   *
   * @param latLon LatLon representation of the current position.
   */
  sendDragEndLocation(latLon: LatLon) {
    this.centerSubject.next(
      this.latLonService.toGeoPosition(
        latLon
      )
    );
  }

}
