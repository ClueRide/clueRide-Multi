import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {Subscription} from 'rxjs';
import {Course,} from 'cr-lib';

@Component({
  selector: 'app-course',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss'],
})
export class CoursePage implements OnInit {

  /* Element to be edited. */
  public course: Course;

  private subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    console.log("Course Page initializing");
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (params) => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.course = this.router.getCurrentNavigation().extras.state.course;
        }
      },
      (error) => {
        console.log("Failed to retrieve extras", error);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
