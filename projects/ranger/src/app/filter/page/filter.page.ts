import {
  Component,
  OnInit
} from '@angular/core';
import {
  Category,
  CategoryService,
  Course,
  CourseService,
  Filter,
  FilterService
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
    private filterService: FilterService,
  ) {
    this.categories = [];
    this.filter = filterService.getCurrentFilter();
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
    this.filter.isEmpty = this.checkIfFilterEmpty();
    this.filterService.changeFilter(this.filter);
  }

  // TODO CI-182: Add Course changes here too.

  checkIfFilterEmpty(): boolean {
    return (
      this.filter.categoriesToIncludeById.length === 0 &&
      this.filter.outingToInclude != null
    );
  }

}
