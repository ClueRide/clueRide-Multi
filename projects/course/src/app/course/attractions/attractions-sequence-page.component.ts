import {
  Component,
  OnInit
} from '@angular/core';
import {EditedCourseService} from '../edited-course.service';
import {Subscription} from 'rxjs';
import {
  Attraction,
  AttractionByPathService,
  Course,
  LinkPath,
  LoaderService
} from 'cr-lib';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-attractions',
  templateUrl: './attractions-sequence-page.component.html',
  styleUrls: ['./attractions-sequence-page.component.scss'],
})
export class AttractionsSequencePage implements OnInit {

  /* The instance being edited. */
  public course: Course | any = {};

  public linkPaths: LinkPath[] = [];
  public attractions: Attraction[] = [];

  private courseId: number;

  private subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private attractionByPathService: AttractionByPathService,
    private editedCourseService: EditedCourseService,
    private loaderService: LoaderService,
    private navController: NavController,
  ) {
    console.log("Attractions Seq Page constructed");
  }

  ngOnInit() {
    console.log("Attractions Seq Page initialized");
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.courseId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
        this.course = this.editedCourseService.getCourseToEdit(this.courseId);
        this.linkPaths = this.attractionByPathService.linkPaths;
        this.attractions = this.attractionByPathService.getAttractions();
      },
      (error) => console.log('DetailsPage: Unable to pick up query parans', error)
    );
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

  deleteRow(index: number) {
    console.log('Deleting', this.attractions[index].name, 'from course');
    // this.attractions.splice(index, 1);
    // this.linkPaths.splice(index, 1);
    this.attractionByPathService.removeAttractionFromCourse(
      index,
      this.course
    );
    this.linkPaths = this.attractionByPathService.linkPaths;
    this.attractions = this.attractionByPathService.getAttractions();
  }

}
