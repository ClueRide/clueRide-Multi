import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {Subscription} from 'rxjs';
import {
  Attraction,
  AttractionByPathService,
  Course,
  LinkPathService,
} from 'cr-lib';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-course',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss'],
})
export class CoursePage implements OnInit {

  /* Element to be edited. */
  public course: Course;

  private subscription: Subscription;
  public attractions: Attraction[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private attractionByPathService: AttractionByPathService,
    private linkPathService: LinkPathService,
    private router: Router,
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit() {
    console.log("Course Page initializing");
    this.subscription.add(
      this.activatedRoute.queryParams.subscribe(
        (params) => {
          if (this.router.getCurrentNavigation().extras.state) {
            this.course = this.router.getCurrentNavigation().extras.state.course;
            this.attractions = [];
            this.attractionByPathService.loadCourse(this.course).pipe(
              map(
                (attraction: Attraction) => {
                  this.attractions.push(attraction);
                }
              )
            ).toPromise()
              .then(() => this.attractionByPathService.updateLinkPaths());
          }
        },
        (error) => {
          console.log("Failed to retrieve extras", error);
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
