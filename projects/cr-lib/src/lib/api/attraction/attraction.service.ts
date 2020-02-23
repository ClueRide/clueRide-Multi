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

interface AttractionMap {
  [index: number]: Attraction;
}

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
  /* Session specific. */
  private currentAttractionId = -1;

  constructor(
    public http: HttpClient,
    public httpService: AuthHeaderService,
    private outingService: OutingService,
    private locationService: LocationService
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
   * Retrieves the list of fully-populated attractions for the
   * session. This includes both GeoJSON and form data.
   */
  public loadSessionAttractions(): Observable<boolean> {
    /* Perhaps questionable: coupling with the timing of the OutingService. */
    this.currentAttractionId = this.outingService.getStartingLocationId();
    this.http.get(
      BASE_URL + 'location/active',
      {headers: this.httpService.getAuthHeaders()}
    ).subscribe(
      (response) => {
        this.cachedSessionAttractions = response as Attraction[];
        this.loadSessionAttractionMap();
        this.attractionSubject.next(true);
      }
    );
    return this.attractionSubject.asObservable();
  }

  private loadSessionAttractionMap(): any {
    for (const cachedAttraction of this.cachedSessionAttractions) {
      const attraction = cachedAttraction;
      const id = attraction.id;
      this.attractionMap[id] = attraction;
    }
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
   * Return a list of the Attractions we have unlocked or are about to arrive at next.
   *
   * This also sets flags on the attractions that indicate which is the current attraction
   * and which is the next attraction.
   */
  public getOutingVisibleAttractions(lastAttractionIndex: number): Attraction[] {
    const currentIndex = lastAttractionIndex + 1;
    this.currentAttractionId = this.cachedSessionAttractions[currentIndex].id;

    return this.classifyOutingVisibleAttractions(
      /* 2 is added to a) adjust to one-based index and b) show the end of the path, not just the start. */
      this.cachedSessionAttractions.slice(0, lastAttractionIndex + 2)
    );

  }

  public classifyOutingVisibleAttractions(visibleAttractions: Attraction[]): Attraction[] {
    const lastAttractionIndex: number = visibleAttractions.length;
    from(visibleAttractions)
      .subscribe(
        (attraction: Attraction) => {
          attraction.isCurrent = false;
          attraction.isLast = false;
        }
      );

    if (lastAttractionIndex === 1) {
      visibleAttractions[0].isCurrent = true;
    } else {
      visibleAttractions[lastAttractionIndex - 1].isLast = true;
      visibleAttractions[lastAttractionIndex - 2].isCurrent = true;
    }

    return visibleAttractions;
  }

  /**
   * All Attractions for the session's Course.
   * These attractions are cached at the beginning of the session.
   */
  getAttractions() {
    return this.cachedSessionAttractions;
  }

  /**
   * This knows where we are based on the requests for the Visible Attractions.
   * TODO: Consider making this more independent.
   */
  getCurrentAttractionId(): number {
    return this.currentAttractionId;
  }

  getAttraction(id: number) {
    return this.attractionMap[id];
  }

}
