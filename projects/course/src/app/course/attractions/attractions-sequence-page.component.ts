import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {EditedCourseService} from '../edited-course.service';
import {Subscription} from 'rxjs';
import {
  Attraction,
  AttractionByPathService,
  Course,
  EdgeService,
  LoaderService,
  PathMeta
} from 'cr-lib';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {EdgeComponent} from '../../edge/edge.component';

@Component({
  selector: 'app-attractions',
  templateUrl: './attractions-sequence-page.component.html',
  styleUrls: ['./attractions-sequence-page.component.scss'],
})
export class AttractionsSequencePage implements OnInit {

  /* The instance being edited. */
  public course: Course | any = {};

  public pathMetaList: PathMeta[] = [];
  public attractions: Attraction[] = [];

  private courseId: number;

  private subscription: Subscription;

  @ViewChild(EdgeComponent, {static: false}) edgeComponent: EdgeComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private attractionByPathService: AttractionByPathService,
    private edgeService: EdgeService,
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
        this.pathMetaList = this.attractionByPathService.linkPaths;
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
    this.attractionByPathService.removeAttractionFromCourse(
      index,
      this.course
    );
    this.pathMetaList = this.attractionByPathService.linkPaths;
    this.attractions = this.attractionByPathService.getAttractions();
  }

  moveDown(index: number) {
    this.attractionByPathService.swapAdjacentAttractionPair(index, this.course);
  }

  moveUp(index: number) {
    this.attractionByPathService.swapAdjacentAttractionPair(index-1, this.course);
  }

  viewEdge(event: any): void {
    console.log("Viewing Link Path for", event);
  }

  addEdge(pathMeta: PathMeta): void {
    this.edgeService.setLinkPath(pathMeta);
    this.edgeComponent.presentPopover(pathMeta).then(
      () => {
        console.log("Dialog is now closed after async wait");
        this.attractionByPathService.updateLinkPaths();
      }
    );
  }

}
