import {Injectable} from '@angular/core';
import {
  Observable,
  Subject
} from 'rxjs';
import {isUndefined} from 'util';
import {LatLon} from '../../../domain/lat-lon/lat-lon';
import {LocTypeService} from '../../loc-type/loc-type.service';
import {LocationService} from '../../location/location.service';
import {Attraction} from '../attraction';
import {AttractionMap} from '../attraction-map';
import {AttractionService} from '../attraction.service';
import {AttractionsByCategory} from './attractions-by-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryAttractionService {
  /* Sends true event when attractions have loaded. */
  private attractionsLoadedSubject: Subject<boolean>;
  /* Records an array of attractions for each Category which has been assigned. */
  private attractionsPerCategory: AttractionsByCategory = {};
  private attractionMap: AttractionMap = {};

  constructor(
    private commonAttractionService: AttractionService,
    private locationService: LocationService,
    private locTypeService: LocTypeService,
  ) {
    this.attractionsLoadedSubject = new Subject<boolean>();
  }

  /**
   * Invoking this function tells the service it is time to ask the back-end for a full list of
   * all Attractions in the database.
   *
   * This list is split into Categories and mapped by index into a cache for ease of retrieval.
   */
  loadAllAttractions(): Observable<boolean> {
    const latLon: LatLon = new LatLon();
    latLon.id = 0;
    latLon.lat = 0.0;
    latLon.lon = 0.0;

    this.locationService.nearest(latLon).subscribe(
      (allAttractions: Attraction[]) => {
        this.attractionMap = this.commonAttractionService.buildAttractionMap(allAttractions);
        this.buildCategoryMap(allAttractions);
        this.attractionsLoadedSubject.next(true);
      }
    );
    return this.attractionsLoadedSubject.asObservable();
  }

  buildCategoryMap(allAttractions: Attraction[]): void {
    /* This should be synchronous to make sure we've built everything before returning. */
    allAttractions.forEach(
      (attraction) => {
        attraction.locationType = this.locTypeService.getById((attraction.locationTypeId));

        const categoryId = this.getCategoryIdForAttraction(attraction);

        /* define empty array if we haven't seen this category yet. */
        if (isUndefined(this.attractionsPerCategory[categoryId])) {
          this.attractionsPerCategory[categoryId] = [];
        }
        this.attractionsPerCategory[categoryId].push(attraction);
      }
    );
  }

  /**
   * Retrieves a specific Attraction based on its ID.
   */
  getAttraction(attractionId: number): Attraction {
    return this.attractionMap[attractionId];
  }

  getAttractionsByCategory(categoryId: number): Attraction[] {
    return this.attractionsPerCategory[categoryId];
  }

  /**
   * Provides the entire map of Attractions by Category.
   */
  getAttractionMap(): AttractionsByCategory {
    return this.attractionsPerCategory;
  }

  /**
   * Given an Attraction, tell us what the assigned Category ID would be.
   *
   * Returns the UNCATEGORIZED ID of 0 if there isn't an assignment.
   *
   * @param attraction which may or may not carry an assigned Category.
   */
  public getCategoryIdForAttraction(attraction: Attraction): number {
    /* Account for the possibility that our Attraction hasn't been assigned to a location type or category. */
    return attraction.locationType &&
      attraction.locationType.category &&
      attraction.locationType.category.id || 0;
  }

  addNewAttraction(newAttraction: Attraction) {
    this.attractionMap[newAttraction.id] = newAttraction;
    this.attractionsPerCategory[this.getCategoryIdForAttraction(newAttraction)].push(newAttraction);
  }

  // TODO: Comes from MapDataService; will propagate through Layer stuff soon.
  updateAttraction(updatedAttraction: Attraction) {

  }
}
