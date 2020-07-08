import {Injectable} from '@angular/core';
import {
  Observable,
  ReplaySubject
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditedCourseService {

  private editedCourseSubject: ReplaySubject<number>;

  constructor() {
    this.editedCourseSubject = new ReplaySubject<number>(1);
  }

  public setEditedCourseId(courseId: number) {
    this.editedCourseSubject.next(courseId);
  }

  public getEditedCourseId(): Observable<number> {
    return this.editedCourseSubject.asObservable();
  }

}
