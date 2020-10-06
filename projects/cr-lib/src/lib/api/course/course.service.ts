import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
  Observable,
  of,
  ReplaySubject
} from 'rxjs';
import {
  map,
  share
} from 'rxjs/operators';
import {
  AuthHeaderService,
  BASE_URL
} from '../../auth/header/auth-header.service';
import {Course} from './course';

/**
 * Service for maintaining Courses.
 * <ul>
 * <li> Caching service for the Course associated with the current session;
 *     this data is static for the duration of the session.
 * <li> Saving a New Course.
 * <li> Providing list of all Courses.
 * </ul>
 */
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  /* Defined once we have received valid data and we haven't been asked to refresh. */
  private cachedCourse: Course;
  /* Defined only during the async window after request and before response. */
  private observable: Observable<any>;
  /* Full list of Courses for selecting out of the list. */
  private allCoursesSubject: ReplaySubject<Course[]>;

  constructor(
    public http: HttpClient,
    private httpService: AuthHeaderService,
  ) {
    console.log('Hello CourseService');
    this.allCoursesSubject = new ReplaySubject(1);
    this.loadAllCourses();
  }

  /**
   * Obtains the active Course for the given Session's Outing.
   *
   * TODO CI-236: Consider moving this to the ReplaySubject pattern.
   */
  public getSessionCourse(): Observable<Course> {
    if (this.cachedCourse) {
      return of(this.cachedCourse);
    } else if (this.observable) {
      return this.observable;
    } else {
      this.observable = this.http.get(
        BASE_URL + 'course/active',
        {
          headers: this.httpService.getAuthHeaders(),
          observe: 'response'
        }
      ).pipe(
        map(response => {
          /* Reset this to indicate response is received. */
          this.observable = null;
          if (response.status === 200) {
            this.cachedCourse = response.body as Course;
            return this.cachedCourse;
          } else {
            return 'Request failed with status ' + response.status;
          }
        }),
        share()
      );
      return this.observable;
    }
  }

  /**
   * Hits the Cached copy to retrieve list of Courses.
   */
  public getAllCourses(): Observable<Course[]> {
    return this.allCoursesSubject.asObservable();
  }

  /**
   * Loads the cache of all Courses.
   */
  public loadAllCourses(): void {
    this.http.get<Course[]>(
      BASE_URL + 'course',
      {
        headers: this.httpService.getAuthHeaders()
      }
    ).subscribe(
      (allCourses: Course[]) => this.allCoursesSubject.next(allCourses)
    );
  }

  /**
   * Updates an existing course to the back-end.
   *
   * @param course with an ID assigned by the API.
   */
  public updateCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(
      BASE_URL + 'course',
      course,
      {
        headers: this.httpService.getAuthHeaders()
      }
    )
  }

  /**
   * Puts a new course to the back-end.
   *
   * @param newCourse - instance without an ID yet.
   */
  public createCourse(newCourse: Course): Observable<Course> {
    return this.http.put<Course>(
      BASE_URL + 'course',
      newCourse,
      {
        headers: this.httpService.getAuthHeaders()
      }
    )
  }


}
