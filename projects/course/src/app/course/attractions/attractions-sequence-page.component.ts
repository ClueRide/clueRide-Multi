import {
  Component,
  OnDestroy,
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
export class AttractionsSequencePage implements OnInit, OnDestroy {

  /* The instance being edited. */
  public course: Course | any = {};

  public pathMetaList: PathMeta[] = [];
  public attractions: Attraction[] = [];

  private courseId: number;

  private routeSubscription: Subscription;
  private linkPathsSubscription: Subscription;

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
    this.routeSubscription = this.activatedRoute.queryParams.subscribe(
      () => {
        this.courseId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
        this.course = this.editedCourseService.getCourseToEdit(this.courseId);
        this.attractions = this.attractionByPathService.getAttractions();
        this.linkPathsSubscription = this.attractionByPathService.getLinkPaths().subscribe(
          (linkPaths) => {
            this.pathMetaList = linkPaths;
          }
        );
      },
      (error) => console.log('DetailsPage: Unable to pick up query params', error)
    );
  }

  ngOnDestroy() {
    console.log("Attractions Seq Page closed");
    this.linkPathsSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  save() {
    this.loaderService.showLoader('Saving Course');
    this.editedCourseService.updateCourse(this.course).subscribe(
      () => {
        this.loaderService.hideLoader();
      },
      (error) => {
        console.log('Unable to save', error);
        this.loaderService.hideLoader();
      },
      () =>
      {
        this.navController.navigateRoot('/list')
          .then();
      }
    );
  }

  cancel() {
    this.navController.navigateRoot('/list')
      .then();
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
