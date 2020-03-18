import {
  Component,
  OnInit
} from '@angular/core';
import {
  AttractionLayerService,
  Category,
  CategoryService,
  Course,
  CourseService,
  Filter
} from 'cr-lib';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  public courses: Course[];
  public categories: Category[];

  /* Passing CSS to the popover. */
  public categoryAlertOptions: any = {
    cssClass: "category-alert"
  };

  private readonly filter: Filter;

  constructor(
    private courseService: CourseService,
    private categoryService: CategoryService,
    private attractionLayerService: AttractionLayerService,
  ) {
    this.categories = [];
    this.filter = new Filter();
  }

  ngOnInit() {
    this.courseService.getAllCourses().subscribe(
      (courses) => {
        this.courses = courses;
      }
    );

    this.categories = this.categoryService.getAllCategories();
  }

  categoryHasChanged(event: CustomEvent) {
    console.log(event);
    this.filter.categoriesToIncludeById = event.detail.value;
    this.attractionLayerService.showFilteredAttractions(this.filter);
  }

}
