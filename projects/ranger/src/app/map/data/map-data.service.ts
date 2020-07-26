import {Injectable} from '@angular/core';
import {
  Attraction,
  AttractionLayerService,
  AttractionService,
  BoundsService,
  Category,
  CategoryAttractionService,
  CategoryService,
  CourseAttractionService,
  Filter,
  FilterService,
  LocTypeService
} from 'cr-lib';
import {
  Observable,
  Subject
} from 'rxjs';
import * as L from 'leaflet';
import {
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

  private attractionToAdd: Subject<Attraction> = new Subject<Attraction>();
  private attractionToUpdate: Subject<Attraction> = new Subject<Attraction>();

  /* The Leaflet LayerGroup where Categories of Attraction Markers are added; each layer holds a Category of Markers. */
  private categoryLayerGroup: L.LayerGroup;

  /* The Leaflet LayerGroup where Course Markers are added to the map; each layer is a Course Marker. */
  private courseLayerGroup: L.LayerGroup;

  constructor(
    private attractionLayerService: AttractionLayerService,
    private attractionService: AttractionService,
    private boundsService: BoundsService,
    private categoryAttractionService: CategoryAttractionService,
    private categoryService: CategoryService,
    private courseAttractionService: CourseAttractionService,
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
        if (this.categoryLayerGroup) {
          this.attractionLayerService.showFilteredAttractions(newFilter, this.categoryLayerGroup);
          this.courseAttractionService.showFilteredAttractions(newFilter, this.courseLayerGroup);
        } else {
          console.log('Responding to Filter Change without a attractionLayerGroup to put it on');
        }
      }
    );
  }

  /**
   * Surface for Bounds Changes.
   */
  getBoundsChangeSubject(): Subject<L.LatLngBounds> {
    return this.boundsService.getBoundsChangeSubject();
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
    console.log('MapDataService.registerCategoryGroup()');
    this.categoryLayerGroup = attractionLayerGroup;
    this.attractionLayerService.showFilteredAttractions(
      this.filterService.getCurrentFilter(),
      this.categoryLayerGroup
    );
  }

  registerCourseLayerGroup(courseLayerGroup: L.LayerGroup) {
    console.log('MapDataService.registerCourseGroup()');
    this.courseLayerGroup = courseLayerGroup;
  }

  /**
   * There are multiple pieces of data that build up a Attraction; this puts
   * them all together.
   *
   * @param attraction partially assembled instance from LocationService.
   */
  assembleAttraction(attraction: Attraction) {
    const locationType = this.locationTypeService.getById(attraction.locationTypeId);
    attraction.locationType = locationType;
    attraction.locationTypeIconName = locationType.icon;
    return attraction;
  }

  assembleAndAddAttraction(attraction: Attraction) {
    console.log('MapDataService.assembleAndAddAttraction()');
    const newAttraction: Attraction = this.assembleAttraction(attraction);
    /* Push to attraction stream. */
    this.attractionToAdd.next(newAttraction);

    /* Direct calls to dependent services. */
    this.attractionLayerService.addNewAttraction(newAttraction);
    this.categoryAttractionService.addNewAttraction(newAttraction);
  }

  updateAttraction(attractionToUpdate: Attraction) {
    console.log('MapDataService: updateAttraction', attractionToUpdate.id);
    const originalAttraction: Attraction = this.categoryAttractionService.getAttraction(attractionToUpdate.id);
    const updatedAttraction: Attraction = this.assembleAttraction(attractionToUpdate);

    this.categoryAttractionService.updateAttraction(updatedAttraction);
    this.attractionLayerService.deleteAttraction(originalAttraction);
    this.attractionLayerService.updateAttraction(updatedAttraction);

    this.attractionToUpdate.next(updatedAttraction);
  }

  deleteAttraction(attraction: Attraction) {
    this.attractionLayerService.deleteAttraction(attraction);
  }

  /** Given the Attraction ID, retrieve the cached copy of
   * the Attraction loaded from backend.
   *
   * TODO: Currently mocked by several spies, but it may make sense to use the CategoryAttractionService itself directly.
   *
   * @param attractionId unique identifier for the Attraction.
   */
  getAttractionById(attractionId: number): Attraction {
    return this.categoryAttractionService.getAttraction(attractionId);
  }
}
