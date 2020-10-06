import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {EditedCourseService} from '../edited-course.service';
import {Subscription} from 'rxjs';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  Course,
  LoaderService
} from 'cr-lib';
import {
  IonInput,
  NavController
} from '@ionic/angular';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, OnDestroy {

  /* The instance being edited. */
  public course: Course | any = {};

  @ViewChild('courseName', {static: false}) courseNameElement: IonInput;

  private courseId: number;

  private subscription: Subscription;

  private detailsGroup: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private editedCourseService: EditedCourseService,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private router: Router,
    private navController: NavController,
  ) {
    this.detailsGroup = this.formBuilder.group(
      {
        courseName: new FormControl('', Validators.required)
      }
    );
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.courseId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
        this.course = this.editedCourseService.getCourseToEdit(this.courseId);
        console.log('Found course ID', this.course.id);
      },
      (error) => console.log('DetailsPage: Unable to pick up query params', error)
    );
  }

  ngAfterViewInit() {
    setTimeout(() => {
      // this.detailsGroup.controls.courseName.setFocus();
      this.courseNameElement.setFocus();
    }, 400);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  save() {
    this.loaderService.showLoader('Saving Course');
    this.editedCourseService.updateCourse(this.course).subscribe(
      (updatedCourse: Course) => {
        this.loaderService.hideLoader();
      },
      (error) => {
        console.log('Unable to save', error);
        this.loaderService.hideLoader();
      },
      () =>
      {
        this.navController.navigateRoot('/list');
      }
    );
  }

  cancel() {
    this.navController.navigateRoot('/list');
  }

}
