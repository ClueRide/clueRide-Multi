import {Injectable} from '@angular/core';
import {AttractionService} from '../attraction.service';
import {Attraction} from '../attraction';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Course} from '../../course/course';
import {LinkPathService} from './link-path.service';
import {LinkPath} from './link-path';

@Injectable({
  providedIn: 'root'
})
export class AttractionByPathService {

  public attractionList: Attraction[];

  public linkPaths: LinkPath[] = [];

  private course: Course;

  constructor(
    private attractionService: AttractionService,
    private linkPathService: LinkPathService,
  ) { }

  /**
   * Invoked when the Course Edit page is instantiated; this is when
   * we learn which Course is being worked upon.
   */
  public loadCourse(course: Course): Observable<Attraction> {
    let attractionStream: Observable<Attraction>;

    this.course = course;
    this.course.locationIds = [];
    this.attractionList = [];

    attractionStream = this.attractionService.getAllAttractionsForCourse(course.id);

    /* Waits for all attractions to have been streamed. */
    attractionStream.toPromise()
      .then(() => this.updateLinkPaths());

    /* Allows caller to respond to each individual Attraction in the stream. */
    return attractionStream.pipe(
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

  /**
   * Updates Link Paths based on Attraction IDs.
   */
  public updateLinkPaths(): void {
    this.linkPathService.linkAttractions(this.course).subscribe(
      (linkPaths: LinkPath[]) => {
        this.linkPaths = linkPaths;
      }
    );
  }

  addAttractionToCourse(attraction: Attraction, course: Course) {
    if (this.course && this.course.id == course.id) {
      console.log("Updating", course.name);
      this.attractionList.push(attraction);
      this.course.locationIds.push(attraction.id);
      this.updateLinkPaths();
    }
  }

  removeAttractionFromCourse(attractionIndex: number, course: Course) {
    if (this.course && this.course.id === course.id) {
      let attractionToRemove = this.attractionList[attractionIndex];
      console.log('Removing', attractionToRemove.name, 'from', course.name);
      this.attractionList.splice(attractionIndex, 1);
      this.course.locationIds.splice(attractionIndex, 1);
      this.updateLinkPaths();
    }
  }

  /**
   * Takes the given attraction index and swaps the order with the next Attraction in the list.
   * @param attractionIndex for the first of the two adjacent Attractions.
   * @param course whose attraction is being swapped.
   */
  swapAdjacentAttractionPair(attractionIndex: number, course: Course) {
    if (this.course && this.course.id === course.id) {
      let temp: Attraction = this.attractionList[attractionIndex];
      this.attractionList[attractionIndex] = this.attractionList[attractionIndex+1];
      this.attractionList[attractionIndex+1] = temp;
      this.course.locationIds[attractionIndex] = this.course.locationIds[attractionIndex+1];
      this.course.locationIds[attractionIndex+1] = temp.id;
      this.updateLinkPaths();
    }
  }
}
