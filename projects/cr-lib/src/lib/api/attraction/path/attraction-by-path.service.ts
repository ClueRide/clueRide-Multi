import {Injectable} from '@angular/core';
import {AttractionService} from '../attraction.service';
import {Attraction} from '../attraction';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Course} from '../../course/course';

@Injectable({
  providedIn: 'root'
})
export class AttractionByPathService {

  public attractionList: Attraction[];

  private course: Course;

  constructor(
    private attractionService: AttractionService,
  ) { }

  /**
   * Invoked when the Course Edit page is instantiated; this is when
   * we learn which Course is being worked upon.
   */
  public loadCourse(course: Course): Observable<Attraction> {
    this.course = course;
    this.course.locationIds = [];
    this.attractionList = [];
    return this.attractionService.getAllAttractionsForCourse(course.id)
      .pipe(
        map((attraction: Attraction) => {
          this.attractionList.push(attraction);
          this.course.locationIds.push(attraction.id);
          return attraction;
        })
      );
  }

  public getAttractions(): Attraction[] {
    return this.attractionList;
  }

  addAttractionToCourse(attraction: Attraction, course: Course) {
    if (this.course && this.course.id == course.id) {
      console.log("Updating", course.name);
      this.attractionList.push(attraction);
      this.course.locationIds.push(attraction.id);
    }
  }

}
