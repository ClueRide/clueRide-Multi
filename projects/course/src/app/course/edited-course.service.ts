import {Injectable} from '@angular/core';
import {
  Observable,
  ReplaySubject
} from 'rxjs';
import {
  Course,
  CourseService
} from 'cr-lib';
import {tap} from 'rxjs/operators';

interface CourseMap {
  [index: number]: Course;
}

@Injectable({
  providedIn: 'root'
})
export class EditedCourseService {

  private editedCourseSubject: ReplaySubject<Course>;

  private courseMap: CourseMap = {};

  constructor(
    private courseService: CourseService,
  ) {
    this.editedCourseSubject = new ReplaySubject<Course>(1);
  }

  public setEditedCourse(course: Course) {
    this.editedCourseSubject.next(course);
  }

  public getEditedCourse(): Observable<Course> {
    return this.editedCourseSubject.asObservable();
  }

  public createCourse(newCourse: Course): Observable<Course> {
    return this.courseService.createCourse(newCourse)
      .pipe(
        tap((updatedCourse: Course) => {
          this.editedCourseSubject.next(updatedCourse);
          this.courseMap[updatedCourse.id] = updatedCourse;
        })
      );
  }

  public updateCourse(course: Course): Observable<Course> {
    return this.courseService.updateCourse(course)
      .pipe(
        tap((updatedCourse: Course) => this.editedCourseSubject.next(updatedCourse))
      );

  }

  public getCourseToEdit(courseId: number) {
    return this.courseMap[courseId];
  }

  public refreshCourseList(): Observable<Course[]> {
    return this.courseService.getAllCourses().pipe(
      tap(
        (courses: Course[]) => {
          courses.forEach(
            (course: Course) => {
              this.courseMap[course.id] = course;
            }
          );
        }
      )
    );
  }
}
