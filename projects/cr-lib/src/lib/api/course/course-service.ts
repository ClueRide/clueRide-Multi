import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map, share} from 'rxjs/operators';
import {AuthHeaderService, BASE_URL} from '../../auth/header/auth-header.service';
import {Course} from './course';

/**
 * Caching service for the Course associated with the current session.
 * This data is static for the duration of the session.
 */
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  /* Defined once we have received valid data and we haven't been asked to refresh. */
  private cachedCourse: Course;
  /* Defined only during the async window after request and before response. */
  private observable: Observable<any>;

  constructor(
    public http: HttpClient,
    private httpService: AuthHeaderService,
  ) {
    console.log('Hello CourseService');
  }

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

}
