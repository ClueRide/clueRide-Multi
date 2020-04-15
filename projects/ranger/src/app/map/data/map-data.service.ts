import {Injectable} from '@angular/core';
import {
  Attraction,
  AttractionLayerService,
  Category,
  CategoryAttractionService,
  CategoryService,
  Filter,
  FilterService,
  LocTypeService
} from 'cr-lib';
import {
  from,
  Observable,
  Subject,
  Subscription
} from 'rxjs';
import * as L from 'leaflet';
import {
  filter,
  flatMap,
  tap
} from 'rxjs/operators';

/**
 * Maintains the life-cycle for Attraction-related Map data -- leaflet and the
 * Attractions we place on the attractionLayerGroup.
 *
 * Responsible for
 * <ul>
 *   <li> Initializing data caches -- after initial location is known.
 *   <li> Responding to Filter changes and invoking the Attraction Layer changes.
 *   <li> Updates to individual Attractions are handled ??
 * </ul>
 *
 * Collaborates with:
 * <ul>
 *   <li> MapPositionService - for position knowledge and responses.
 *   <li> Map's Attraction Layer to turn on and off layers.
 *   <li> Updates to individual Attractions are handled ??
 * </ul>
 */
@Injectable({
  providedIn: 'root'
})
export class MapDataService {

  private attractionByIdCache = [];
  private attractionToAdd: Subject<Attraction> = new Subject<Attraction>();
  private attractionToUpdate: Subject<Attraction> = new Subject<Attraction>();

  /* The attractionLayerGroup which we place Attraction Groups upon. */
  private attractionLayerGroup: L.LayerGroup;

  constructor(
    private attractionLayerService: AttractionLayerService,
    private categoryAttractionService: CategoryAttractionService,
    private categoryService: CategoryService,
    private filterService: FilterService,
    public locationTypeService: LocTypeService,
  ) {
    console.log('Hello MapDataService Provider');
    this.subscribeToFilterChanges();
  }

  /**
   * Begin paying attention to changes to the Filter.
   */
  private subscribeToFilterChanges() {
    this.filterService.getFilterObservable().subscribe(
      (newFilter: Filter) => {
        if (this.attractionLayerGroup) {
          this.attractionLayerService.showFilteredAttractions(newFilter, this.attractionLayerGroup);
        } else {
          console.log('Responding to Filter Change without a attractionLayerGroup to put it on');
        }
      }
    );
  }

  /**
   * Sequences the population of the required caches, and then returns true when the
   * loading is complete.
   *
   * This can be used to guard against working with Attractions prior to the data
   * being ready.
   *
   * Each individual cache has a loadSync function which will assure the loads are
   * performed in the proper sequence.
   */
  initializeCaches(): Observable<boolean> {
    const mapDataIsReady: Subject<boolean> = new Subject<boolean>();

    /* The sequence: */
    this.categoryService.load().pipe(
      tap(() => console.log('About to load Location Types')),
      flatMap((categories: Category[]) => this.locationTypeService.load(categories)),
      tap(() => console.log('About to load Category Attractions')),
      flatMap(() => this.categoryAttractionService.loadAllAttractions()),
      flatMap(() => this.attractionLayerService.loadAttractionLayers()),
    ).subscribe(
      () => mapDataIsReady.next(true)
    );
    return mapDataIsReady.asObservable();
  }

  /**
   * The attractionLayerGroup will register itself with us so we can put layers on it.
   *
   * FilterService provides the filter itself.
   *
   * @param attractionLayerGroup where to put the filtered layers.
   */
  registerAttractionLayerGroup(attractionLayerGroup: L.LayerGroup): void {
    console.log('MapDataService.registerMap()');
    this.attractionLayerGroup = attractionLayerGroup;
    this.attractionLayerService.showFilteredAttractions(
      this.filterService.getCurrentFilter(),
      this.attractionLayerGroup
    );
  }

  /**
   * Allows a Map Data client to be told whenever there is a new Attraction
   * to be added to the attractionLayerGroup. Since we've setup the subscription for a new client,
   * we can populate that client by resending all the locations.
   *
   * @param addAttractionFunction accepts an Attraction.
  public sendMeNewAttractions(addAttractionFunction): Subscription {
    const subscription = this.attractionToAdd.subscribe(
      addAttractionFunction,
      this.logError
    );

    if (this.filterService.isFilterShown()) {
      // TODO: Turn `true` into a real filter.
      this.sendFilteredAttractions(true);
    } else {
      this.resendAllLocations();
    }
    return subscription;
  }
   */

  /**
   * Allows a Map Data client to be told whenever this is an updated Attraction
   * to be added to the attractionLayerGroup.
   *
   * @param updateAttractionFunction accepts an Attraction.
   */
  public sendMeUpdatedAttractions(updateAttractionFunction): Subscription {
    return this.attractionToUpdate.subscribe((updateAttractionFunction));
  }

  /**
   * Given a position, retrieve the locations nearest that position.
   * @param position to center the search for Attractions.
  loadNearestLocations(position) {
    this.locationService.nearest(
      this.latLonService.toLatLon(position)
    ).subscribe(
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
   */

  /**
   * There are multiple pieces of data that build up a Attraction; this puts
   * them all together.
   *
   * @param attraction partially assembled instance from LocationService.
   */
  assembleAttraction = (attraction: Attraction) => {
    const locationType = this.locationTypeService.getById(attraction.locationTypeId);
    attraction.locationTypeIconName = locationType.icon;

    /* Both adds new and replaces existing attractions in the cache. */
    this.attractionByIdCache[attraction.id] = attraction;
    return attraction;
  }

  assembleAndAddAttraction = (attraction: Attraction) => {
    /* Push to attraction stream. */
    this.attractionToAdd.next(this.assembleAttraction(attraction));
  }

  updateAttraction(updatedAttraction: Attraction) {
    console.log('MapDataService: updateAttraction', updatedAttraction.id);
    this.attractionToUpdate.next(this.assembleAttraction(updatedAttraction));
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
    console.log('MapDataService: Resending all Locations');
    /* `from()` requires an instance that implements iterable. */
    from(this.attractionByIdCache).pipe(
      filter((item) => !!item)
    ).subscribe(
      (attraction) => {this.attractionToAdd.next(attraction); }
    );
  }
  /**
   * Notification that we're ready to change to another filter for the Attractions.
   *
   * @param attractionFilter currently just a boolean, but expect that there will be details
   * about the filter being applied so this service can retrieve the right set of records.
  public changeAttractionFilter(attractionFilter: any): void {
    if (this.respondToClearMap) {
      this.respondToClearMap();
    } else {
      console.log('No response setup for clearing the attractionLayerGroup');
    }

    if (attractionFilter) {
      this.sendFilteredAttractions(attractionFilter);
    } else {
      this.resendAllLocations();
    }
  }
   */

  /**
   * Given the filter, ask back-end for a list of matching attractions and send each one to the attraction subject.
   * @param attractionFilter - TODO: Turn this into an actual filter.
  private sendFilteredAttractions(attractionFilter) {
    this.locationService.getFilteredAttractions(attractionFilter).subscribe(
      (attractions: Attraction[]) => {
        from(attractions).subscribe(
          (attraction: Attraction) => {
            this.assembleAndAddAttraction(attraction);
          }
        );
      }
    );
  }
   */

  /**
   * Assigns the function to call when the attractionLayerGroup needs to be cleared.
   *
   * @param clearMap function supplied by caller to perform the attractionLayerGroup clearing.
  onMapClear(clearMap: any) {
    this.respondToClearMap = clearMap;
  }
   */

}
