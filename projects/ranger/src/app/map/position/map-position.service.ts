import {Injectable} from '@angular/core';
import {Geoposition} from '@ionic-native/geolocation';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject
} from 'rxjs';
import {GeoLocService} from 'cr-lib';

/**
 * Responsible for:
 * <ul>
 *   <li>Obtaining suitable position sources (GPS/Device or Tether and via MapDrag).
 *   <li>Able to send trigger once that position is known/settled (can involve asking permission to use GPS, for example).
 *   <li>Maintains the map center, sometimes specifying the map's center and sometimes using the map's center.
 *   <li>Serves to provide value for back-end know where we are so it can recommend appropriate geometry elements (mainly attractions).
 * </ul>
 *
 * Collaborates with:
 *
 */
@Injectable({
  providedIn: 'root'
})
export class MapPositionService {
  /* Where we are */
  private currentPosition: Geoposition;
  private currentPositionSubject: Subject<Geoposition> = new ReplaySubject<Geoposition>(1);

  /* Our current Center of the map; can be different from GPS or Tether reported position when we drag the map. */
  readonly reportedPosition: BehaviorSubject<Geoposition>;

  private positionSourceKnownFlag: boolean;

  constructor(
    private geoLocService: GeoLocService
  ) {
    /* Set an Atlanta position if we don't have any other value yet. */
    this.reportedPosition = new BehaviorSubject(GeoLocService.ATLANTA_GEOPOSITION);
    this.positionSourceKnownFlag = false;
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

    console.log("MapPositionService: findOurPosition()");
    this.geoLocService.getPositionWatch().subscribe(
      (geoPosition: Geoposition) => {
        this.positionSourceKnownFlag = true;
        this.currentPositionSubject.next(geoPosition)
      }
    );
  }

  /** Subject published when center of map is moved. */
  public getReportedPositionSubject(): BehaviorSubject<Geoposition> {
    return this.reportedPosition;
  }

  /** Geoposition published when center of map is moved. */
  public getReportedPosition(): Geoposition {
    return this.reportedPosition.getValue();
  }

  public getCurrentPosition(): Geoposition {
    return this.currentPosition;
  }

  public getCurrentPositionSubject(): Subject<Geoposition> {
    return this.currentPositionSubject;
  }

  /**
   * Pays attention to the GeoLoc service to provide new positions and passes them along to
   * the function which handles that new position.
   *
   * @param setNewCenterForMap function which is expected to respond to a new position.
   */
  public setWatch(
    setNewCenterForMap: (position: Geoposition) => void
  ): Observable<Geoposition> {
    const positionObservable = this.geoLocService.getPositionWatch();
    positionObservable.subscribe(
      (position) => {
        setNewCenterForMap(position);
      }
    );
    return positionObservable;
  }

  public releaseWatch(): void {
    this.geoLocService.clearWatch();
  }

}
