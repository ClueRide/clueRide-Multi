import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
  from,
  Observable,
  Subject
} from 'rxjs';
import {
  AuthHeaderService,
  BASE_URL
} from '../../auth/header/auth-header.service';
import {LatLon} from '../../domain/lat-lon/lat-lon';
import {LocationService} from '../location/location.service';
import {OutingService} from '../outing/outing.service';
import {Attraction} from './attraction';
import {AttractionMap} from './attraction-map';
import {
  map,
  mergeAll
} from 'rxjs/operators';
import {LocTypeService} from '../loc-type/loc-type.service';

/**
 * This provides for the Attractions which can be sequenced into a Course.
 * Separate from the Location Service (which handles the broader sense of Location for editing).
 * This is being kept in the FEC project since it may be shared with the
 * front-end client that assembles Courses.
 *
 * This caches the Attractions for a given session since it remains static
 * for the duration of the session.
 *
 * All data is retrieved from server upon instantiation of the service.
 * There are two types of data:
 * <ul>
 * <li>GeoJSON data for placement on the map.
 * <li>Human readable information to populate the Location/Attraction page
 * with images and links.
 * </ul>
 *
 * Puzzles are associated with an Attraction and are retrieved
 * by asking the PuzzleService passing the Attraction ID.
 */
@Injectable({
  providedIn: 'root'
})
export class AttractionService {
  private attractionSubject: Subject<boolean>;
  /* This is an ordered list. */
  private cachedSessionAttractions: Attraction[] = [];
  /* This is not an ordered list. */
  private allCachedAttractions: Attraction[];

  private attractionMap: AttractionMap = {};

  constructor(
    public http: HttpClient,
    public httpService: AuthHeaderService,
    private outingService: OutingService,
    private locationService: LocationService,
    private locTypeService: LocTypeService,
  ) {
    if (this.cachedSessionAttractions.length === 0) {
      console.log('Hello AttractionService - Session Cache Empty');
    } else {
      console.log('Hello AttractionService - Session Cache Filled');
    }

    this.attractionSubject = new Subject();
    this.allCachedAttractions = [];
  }

  /**
   * Retrieves entire list of fully-populated Attractions.
   *
   * This may become cumbersome at some point in the future, and we need to drop back to geographically narrowing
   * the scope.
   */
  public loadAllAttractions(): Observable<boolean> {
    const latLon: LatLon = new LatLon();
    latLon.id = 0;
    latLon.lat = 0.0;
    latLon.lon = 0.0;

    this.locationService.nearest(latLon).subscribe(
      (allAttractions: Attraction[]) => {
        this.allCachedAttractions = allAttractions;
        this.loadAllAttractionsMap();
        this.attractionSubject.next(true);
      }
    );
    return this.attractionSubject.asObservable();
  }

  private loadAllAttractionsMap(): void {
    from(this.allCachedAttractions).subscribe(
      (attraction) => {
        this.attractionMap[attraction.id] = attraction;
      }
    );
  }

  /**
   * All Attractions for the session's Course.
   * These attractions are cached at the beginning of the session.
   */
  getAttractions() {
    return this.cachedSessionAttractions;
  }

  getAttraction(id: number) {
    return this.attractionMap[id];
  }

  /**
   * For the given courseId, retrieve all Attractions.
   *
   * Attractions returned by this service will have the Location Type populated.
   *
   * @param courseId unique identifier for the Course.
   */
  public getAllAttractionsForCourse(courseId: number): Observable<Attraction> {
    return this.http.get<Attraction[]>(
      BASE_URL + 'location/' + courseId + '/course',
      {headers: this.httpService.getAuthHeaders()}
    ).pipe(
      mergeAll(),   /* Generates event for each element of the array. */
      map((attraction) => {
        attraction.locationType = this.locTypeService.getById(attraction.locationTypeId);
        return attraction;
      })
    );
  }

  /**
   * Shared function that turns an array of Attractions into an indexed map.
   *
   * @param attractionsToMap the list of Attractions we want to map.
   */
  buildAttractionMap(attractionsToMap: Attraction[]): AttractionMap {
    const attractionMap: AttractionMap = {};
    from(attractionsToMap).subscribe(
      (attraction) => {
        attractionMap[attraction.id] = attraction;
      }
    );
    return attractionMap;
  }

}
