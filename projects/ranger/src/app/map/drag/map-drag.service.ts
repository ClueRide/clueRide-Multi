import {Injectable} from '@angular/core';
import {Geoposition} from '@ionic-native/geolocation';
import * as L from 'leaflet';
import {LatLonService} from 'cr-lib';
import {
  BehaviorSubject,
  Subject
} from 'rxjs';

/**
 * This responds to map drag events and is a source of new position info which is pushed
 * to subscribers of the MapCenterSubject.
 *
 * Also exposes a function which will turn on/off the auto-centering that allows the map
 * to track a separate source of GPS position for the center of the map.
 */
@Injectable({
  providedIn: 'root'
})
export class MapDragService {

  /** The Subject that broadcasts changes to the map's center at the end of a Drag Event. */
  private readonly centerSubject: BehaviorSubject<Geoposition>;

  /** Set to true if the center of the map should follow either Device or Tether instead of Drag. */
  private autoCenterFlag = true;
  private mapInstance: L.Map;
  private dragInProgress = false;

  constructor(
    private latLonService: LatLonService,
  ) {
    this.centerSubject = new BehaviorSubject<Geoposition>(
      this.latLonService.toGeoPosition([0, 0])
    );
  }

  public getCenterSubject(): Subject<Geoposition> {
    return this.centerSubject;
  }

  public isAutoCenter(): boolean {
    return this.autoCenterFlag;
  }

  setAutoCenter(autoCenter: boolean) {
    this.autoCenterFlag = autoCenter;
  }

  /**
   * Provides the instance of L.Map whose drag events we're watching.
   *
   * @param map instance whose drag events to watch.
   * @returns Subject<Geoposition> representing the center of the map at the end of a drag event.
   */
  registerMap(
    map: L.Map
  ): BehaviorSubject<Geoposition> {
    this.mapInstance = map;

    map.on('movestart', () => {
      this.dragInProgress = true;
      this.setAutoCenter(false);
    });

    map.on('moveend', () => {
      this.sendDragEndLocation(
        this.latLonService.toGeoPosition(
          map.getCenter()
        )
      );
      this.dragInProgress = false;
    });

    return this.centerSubject;
  }

  isDragInProgress(): boolean {
    return this.dragInProgress;
  }

  /**
   * This sends notification to listeners paying attention to where
   * the map is centered, typically components that want to create
   * an object at the map's current center.
   *
   * @param geoPosition representation of the center of the map at
   * the end of a drag event.
   */
  sendDragEndLocation(geoPosition: Geoposition) {
    this.centerSubject.next(
      geoPosition
    );
  }

}
