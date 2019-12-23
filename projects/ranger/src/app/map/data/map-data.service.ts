import {Injectable} from '@angular/core';
import {Geoposition} from '@ionic-native/geolocation';
import {
  Attraction,
  GeoLocService,
  Location,
  LocationService,
  LocTypeService
} from 'cr-lib';
import {
  BehaviorSubject,
  from,
  Observable,
  ReplaySubject,
  Subject
} from 'rxjs';
import {filter} from 'rxjs/operators';

/**
 * Maintains the life-cycle for all Map data -- leaflet and the
 * Locations we place on the map.
 */
@Injectable({
  providedIn: 'root'
})
export class MapDataService {

  private attractionByIdCache = [];
  private locationToAdd$: Subject<Location> = new Subject<Location>();
  private currentPosition: Geoposition;
  private currentPositionSubject: Subject<Geoposition> = new ReplaySubject<Geoposition>();

  /* Our current Center of the map. */
  readonly reportedPosition: BehaviorSubject<Geoposition>;

  constructor(
    public locationService: LocationService,
    public locationTypeService: LocTypeService,
    public geoLoc: GeoLocService,
  ) {
    console.log('Hello MapDataService Provider');

    /* Set an Atlanta position if we don't have any other value yet. */
    this.reportedPosition = new BehaviorSubject({
      coords: {
        latitude: 33.75,
        longitude: -84.75,
        accuracy: 0.0,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null
      },
      timestamp: null
    });
  }

  /** Subject published when center of map is moved. */
  public getReportedPositionSubject(): BehaviorSubject<Geoposition> {
    return this.reportedPosition;
  }

  /** Geoposition published when center of map is moved. */
  public getReportedPosition(): Geoposition {
    return this.reportedPosition.getValue();
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

  /**
   * Allows a Map Data client to be told whenever there is a new Attraction
   * to be added to the map.
   *
   * @param addAttractionFunction accepts an Attraction.
   */
  public sendMeNewAttractions(addAttractionFunction) {
    this.locationToAdd$.subscribe(addAttractionFunction);
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
      (attractions) => {
        this.attractionByIdCache = [];
        attractions.forEach(
          (attraction) => {
            this.assembleAndAddAttraction(attraction);
          }
        );
      }
    );
  }

  /**
   * There are multiple pieces of data that build up a Attraction; this puts
   * them all together.
   * @param attraction partially assembled instance from LocationService.
   */
  assembleAndAddAttraction = (attraction: Attraction) => {
    const locationType = this.locationTypeService.getById(attraction.locationTypeId);
    // console.log(attraction.id + ': ' + attraction.name);
    attraction.locationTypeIconName = locationType.icon;

    this.attractionByIdCache[attraction.id] = attraction;

    /* Push to attraction stream. */
    this.locationToAdd$.next(attraction);
  }

  /** Given the Attraction ID, retrieve the cached copy of
   * the Attraction loaded from backend.
   *
   * @param attractionId unique identifier for the Attraction.
   */
  getAttractionById(attractionId: number): Attraction {
    return this.attractionByIdCache[attractionId];
  }

  /**
   * Request that all currently cached locations be sent to the subscribers.
   *
   * NOTE: This does not refresh the cache from the back-end.
   */
  resendAllLocations() {
    /* `from()` requires an instance that implements iterable. */
    from(this.attractionByIdCache).pipe(
      filter((item) => !!item)
    ).subscribe(
      (attraction) => {this.locationToAdd$.next(attraction); }
    );
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
    const positionObservable = this.geoLoc.getPositionWatch();
    positionObservable.subscribe(
      (position) => {
        setNewCenterForMap(position);
      }
    );
    return positionObservable;
  }

  public releaseWatch(): void {
    this.geoLoc.clearWatch();
  }

}
