import {Injectable} from '@angular/core';
import {
  AuthHeaderService,
  BASE_URL,
  Course
} from 'cr-lib';
import {HttpClient} from '@angular/common/http';

/**
 * Provides services for choosing the back-end's "default" Course.
 */
@Injectable({
  providedIn: 'root'
})
export class SelectService {

  /* Holds our current selection. */
  selectedCourse: Course = null;

  constructor(
    public http: HttpClient,
    private httpService: AuthHeaderService,
  ) { }

  public isSelected(course: Course): boolean {
    if (this.selectedCourse) {
      return course.id === this.selectedCourse.id;
    } else {
      return false;
    }
  }

  public select(course: Course) {
    console.log("Making", course.name, "the default Course");
    this.selectedCourse = course;
    this.setDefaultCourse(course).subscribe();
  }

  public reset(course: Course) {
    this.setDefaultCourse(course).subscribe();
  }

  public setDefaultCourse(course: Course) {
    return this.http.post<Course>(
      BASE_URL + 'game-state/default-course',
      course,
      {
        headers: this.httpService.getAuthHeaders()
      }
    )
  }

}
