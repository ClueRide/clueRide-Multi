import {Injectable} from '@angular/core';
import {Geoposition} from '@ionic-native/geolocation';
import {Location, LocationService, LocTypeService} from 'cr-lib';
import {from, Observable, ReplaySubject, Subject} from 'rxjs';
import {filter} from 'rxjs/operators';

/**
 * Maintains the life-cycle for all Map data -- leaflet and the
 * Locations we place on the map.
 */
@Injectable({
  providedIn: 'root'
})
export class MapDataService {

  locationMap = [];
  locationToAdd$: Subject<Location> = new Subject<Location>();
  private currentPosition: Geoposition;
  private currentPositionSubject: Subject<Geoposition> = new ReplaySubject<Geoposition>();

  constructor(
    public locationService: LocationService,
    public locationTypeService: LocTypeService,
) {
    console.log('Hello MapDataService Provider');
  }

  public postInitialPosition(position: Geoposition): void {
    console.log('4. Proceeding with Map initialization');
    this.currentPosition = position;
    this.currentPositionSubject.next(position);
    this.loadNearestLocations(position);
  }

  public getCurrentPosition(): Geoposition {
    return this.currentPosition;
  }

  public getCurrentPositionSubject(): Subject<Geoposition> {
    return this.currentPositionSubject;
  }

  initializeCaches(): Observable<boolean> {
    return this.locationTypeService.initializeCache();
    /* Other caches here? */
  }

  public sendMeNewLocations(addLocationFunction) {
    this.locationToAdd$.subscribe(addLocationFunction);
  }

  /**
   * Given a position, retrieve the locations nearest that position.
   * @param position to center the search for Attractions.
   */
  loadNearestLocations(position) {
    this.locationService.nearest({
      id: null,
      lat: position.coords.latitude,
      lon: position.coords.longitude,
      lng: position.coords.longitude,
    }).subscribe(
      (locations) => {
        this.locationMap = [];
        locations.forEach(
          (location) => {
            this.assembleAndAddLocation(location);
          }
        );
      }
    );
  }

  /**
   * There are multiple pieces of data that build up a Location; this puts
   * them all together.
   * @param location partially built instance.
   */
  assembleAndAddLocation = (location: Location) => {
    const locationType = this.locationTypeService.getById(location.locationTypeId);
    // console.log(location.id + ': ' + location.name);
    location.locationTypeIconName = locationType.icon;
    this.locationMap[location.id] = location;
    /* Push to location stream. */
    this.locationToAdd$.next(location);
  }

  /**
   * Request that all currently cached locations be sent to the subscribers.
   */
  resendAllLocations() {
    from(this.locationMap).pipe(
      filter((item) => !!item)
    ).subscribe(
      (loc) => {this.locationToAdd$.next(loc); }
    );
  }

  /**
   * Propagate this newly updated Location to listeners.
   * @param location with updated properties.
   */
  updateLocation(location: Location) {
    this.assembleAndAddLocation(location);
  }

}
