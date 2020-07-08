import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {EditedCourseService} from '../edited-course.service';
import {Subscription} from 'rxjs';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {Course} from 'cr-lib';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, OnDestroy {

  /* Exposed to allow the tabs to pass along which Course is being worked. */
  public courseId: number;

  /* The instance being edited. */
  public course: Course;

  private subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private editedCourseService: EditedCourseService,
    private router: Router,
    private navController: NavController,
  ) { }

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (params) => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.course = this.router.getCurrentNavigation().extras.state.course;
        }
      });

    // this.subscription = this.editedCourseService.getEditedCourseId()
    //   .subscribe(
    //     (id) => {
    //       this.courseId = id;
    //       console.log('Edit Page receiving courseId', this.courseId);
    //     }
    //   );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  save() {
    this.navController.back();
  }

  cancel() {
    this.navController.back();
  }

}
