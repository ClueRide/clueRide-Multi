import {Injectable} from '@angular/core';
import {Geoposition} from '@ionic-native/geolocation';
import {
  BehaviorSubject,
  ReplaySubject,
  Subject
} from 'rxjs';
import {GeoLocService} from 'cr-lib';
import {MapDragService} from '../drag/map-drag.service';

/**
 * Responsible for:
 * <ul>
 *   <li>Obtaining suitable position sources (GPS/Device or Tether and via MapDrag).
 *   <li>Able to send trigger once that position is known/settled (can involve asking permission to use GPS, for example).
 *   <li>Maintains the map center, sometimes specifying the map's center and sometimes using the map's center.
 *   <li>Serves to provide GeoPosition we tell the back-end so it can recommend nearby geometry elements (usually attractions).
 * </ul>
 *
 * Collaborates with:
 *
 */
@Injectable({
  providedIn: 'root'
})
export class MapPositionService {
  /* Where we are regardless of how we display it. */
  private currentPosition: Geoposition;
  private currentPositionSubject: Subject<Geoposition> = new ReplaySubject<Geoposition>(1);

  /* Our current Center of the map; can be different from GPS or Tether reported position when we drag the map. */
  private mapCenterSubject: BehaviorSubject<Geoposition>;

  /* Provides a new position whenever we want to move the map to our current position (Auto-center). */
  readonly moveMapSubject: Subject<Geoposition>;

  private positionSourceKnownFlag: boolean;

  constructor(
    private geoLocService: GeoLocService,
    private mapDragService: MapDragService,
  ) {
    this.positionSourceKnownFlag = false;
    this.moveMapSubject = new Subject<Geoposition>();
  }

  /**
   * Kicks off finding source of where the device is located, not necessarily the center of the map.
   */
  public findOurPosition(): void {
    /* Only subscribe once. */
    if (this.positionSourceKnownFlag) {
      console.log('Position subscription has been established; no need to try again');
      return;
    }

    console.log('MapPositionService: findOurPosition()');
    this.geoLocService.getPositionWatch().subscribe(
      (geoPosition: Geoposition) => {
        this.positionSourceKnownFlag = true;
        this.currentPositionSubject.next(geoPosition);

        // TODO CI-149: Have this guy subscribe to the MapDataService or other appropriate source.
        // this.heading.updateLocation(geoPosition.coords);

        this.maybeMoveMap(geoPosition);
      }
    );
  }

  /**
   * Tell this service which Subject will be broadcasting the result of Map Drag events.
   *
   * @param dragEndSubject subject that is updated when a Map Drag event has ended.
   */
  public setDragEndSubject(dragEndSubject: BehaviorSubject<Geoposition>): void {
    this.mapCenterSubject = dragEndSubject;
  }

  /** Subject published when center of map is moved. */
  public getMapCenterPositionSubject(): Subject<Geoposition> {
    return this.mapCenterSubject;
  }

  /** Geoposition published when center of map is moved. */
  public getMapCenterPosition(): Geoposition {
    return (this.mapCenterSubject as BehaviorSubject<Geoposition>).getValue();
  }

  public getCurrentPosition(): Geoposition {
    return this.currentPosition;
  }

  public getCurrentPositionSubject(): Subject<Geoposition> {
    return this.currentPositionSubject;
  }

  /**
   * Provides events when we want to move the map center to the supplied position.
   */
  public getMapMoveSubject(): Subject<Geoposition> {
    return this.moveMapSubject;
  }

  /**
   * Upon a "Move Map" event carrying a new Geoposition, check if it is a good time
   * to change the center of the map.
   *
   * This contains the logic for determining when we have a position that should be
   * used to center the map at that new position.
   *
   * @param geoPosition device or tether position update.
   */
  private maybeMoveMap(geoPosition: Geoposition) {
    console.log('MaybeMoveMap:', geoPosition.coords);
    /* Ignore new position updates until the drag completes. */
    if (this.mapDragService.isDragInProgress()) {
      return;
    }

    /* Move map so current location is centered. */
    if (this.mapDragService.isAutoCenter()) {
      this.moveMapSubject.next(geoPosition);
    }
  }

}
