import {Injectable} from '@angular/core';
import {
  from,
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
  private attractionSubject: Subject<boolean>;
  private attractionsPerCategory: AttractionsByCategory = {};
  private attractionMap: AttractionMap = {};

  constructor(
    private commonAttractionService: AttractionService,
    private locationService: LocationService,
    private locTypeService: LocTypeService,
  ) {
    this.attractionSubject = new Subject<boolean>();
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
        this.attractionSubject.next(true);
      }
    );
    return this.attractionSubject.asObservable();
  }

  buildCategoryMap(allAttractions: Attraction[]): void {
    from(allAttractions).subscribe(
      (attraction) => {
        attraction.locationType = this.locTypeService.getById((attraction.locationTypeId));

        /* Account for the possibility that our Attraction hasn't been assigned to a location type or category. */
        const categoryId = attraction.locationType &&
          attraction.locationType.category &&
          attraction.locationType.category.id || 0;

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

  // TODO: Comes from MapDataService; will propagate through Layer stuff soon.
  updateAttraction(updatedAttraction: Attraction) {

  }
}
