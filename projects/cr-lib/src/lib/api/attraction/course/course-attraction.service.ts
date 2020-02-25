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
} from '../../../auth/header/auth-header.service';
import {Attraction} from '../attraction';
import {AttractionMap} from '../attraction-map';
import {AttractionService} from '../attraction.service';

@Injectable({
  providedIn: 'root'
})
export class CourseAttractionService {

  /* Returns 'true' once a requested load has been completed. */
  private attractionLoadingCompleteSubject: Subject<boolean>;

  /* The Course's Attractions in order. */
  private cachedCourseAttractions: Attraction[];

  /* Holds Map from Attraction ID to the Attraction instance. */
  private attractionMap: AttractionMap = {};

  constructor(
    private http: HttpClient,
    private httpService: AuthHeaderService,
    private commonAttractionService: AttractionService,
  ) {
    this.attractionLoadingCompleteSubject = new Subject<boolean>();
  }

  /**
   * Kicks off loading and caching of Attractions for the current session -- a specific Course.
   *
   * This is expected to be called only once per run of the application by the load state controller for the app.
   *
   * The Attractions are in a fixed order determined by the Course.
   * @returns Observable which provides 'true' once the attractions are fully loaded.
   */
  public loadCourseAttractions(): Observable<boolean> {
    this.http.get(
      BASE_URL + 'location/active',
      {headers: this.httpService.getAuthHeaders()}
    ).subscribe(
      (response) => {
        this.cachedCourseAttractions = response as Attraction[];
        this.attractionMap = this.commonAttractionService.buildAttractionMap(this.cachedCourseAttractions);
        this.attractionLoadingCompleteSubject.next(true);
      }
    );
    return this.attractionLoadingCompleteSubject.asObservable();
  }

  /**
   * Return a list of the Attractions we have unlocked or are about to arrive at next.
   *
   * This also sets flags on the attractions that indicate which is the current attraction
   * and which is the next attraction.
   */
  public getOutingPresentableSubset(lastAttractionIndex: number): Attraction[] {
    const subset = this.cachedCourseAttractions.slice(0, lastAttractionIndex + 2);
    return this.classifyPresentableSubset(subset);
  }

  private classifyPresentableSubset(presentableSubset: Attraction[]): Attraction[] {
    /* Clear (and define) classification for each element of this subset. */
    from(presentableSubset)
      .subscribe(
        (attraction: Attraction) => {
          attraction.isCurrent = false;
          attraction.isLast = false;
        }
      );

    const elementCount: number = presentableSubset.length;
    if (elementCount === 1) {
      presentableSubset[0].isCurrent = true;
    } else {
      presentableSubset[elementCount - 1].isLast = true;
      presentableSubset[elementCount - 2].isCurrent = true;
    }

    return presentableSubset;
  }

  /**
   * All Attractions for the session's Course.
   * These attractions are cached at the beginning of the session.
   */
  public getAllCourseAttractions(): Attraction[] {
    return this.cachedCourseAttractions;
  }

  /**
   * Gets the Attraction matching the given Attraction ID.
   * @param attractionId unique identifier for the Attraction.
   */
  public getAttraction(attractionId: number): Attraction {
    return this.attractionMap[attractionId];
  }

}
