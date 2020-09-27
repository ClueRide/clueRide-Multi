import {
  Component,
  OnInit
} from '@angular/core';
import {Filter} from '../filter';
import {Category} from '../../api/category/category';
import {FilterService} from '../filter.service';
import {CategoryService} from '../../api/category/category.service';
import {Course} from '../../api/course/course';
import {CourseService} from '../../api/course/course.service';

/**
 * Responsible for populating the values that show up in the pull-downs
 * on the Filter Popover.
 */
@Component({
  selector: 'app-filter-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class FilterPopoverComponent implements OnInit {

  readonly filter: Filter;
  public courses: Course[];
  public categories: Category[];

  readonly noCourseSelected: Course = {
    id: 0,
    name: 'No Course',
    courseTypeId: null,
    description: 'No Course Selected',
    departure: '',
    destination: '',
    pathIds: [],
    url: ''
  };

  /* Passing CSS to the popover; exposed to the HTML template. */
  public categoryAlertOptions: any = {
    cssClass: 'category-alert'
  };

  constructor(
    private filterService: FilterService,
    private categoryService: CategoryService,
    private courseService: CourseService,
  ) {
    console.log('Filter Popover constructed');
    this.filter = filterService.getCurrentFilter();
    this.categories = this.categoryService.getAllCategories();
    this.courseService.getAllCourses().subscribe(
      (courses) => {
        this.courses = courses;
        this.courses.push(this.noCourseSelected);
      }
    );
  }

  ngOnInit() {
    console.log('Filter Popover initialized');
  }

  /**
   * Invoked when Course selection is made.
   *
   * @param event details of the Course changes.
   */
  courseHasChanged(event: CustomEvent) {
    const courseId = event.detail.value;
    if (courseId === 0 || courseId === '') {
      this.filter.courseToInclude = null;
    } else {
      this.filter.courseToInclude = courseId;
    }
    this.filter.isEmpty = this.checkIfFilterEmpty();
    this.filterService.changeFilter(this.filter);
  }

  /**
   * Invoked when Category selection is made.
   *
   * @param event details of the changes.
   */
  categoryHasChanged(event: CustomEvent) {
    this.filter.categoriesToIncludeById = event.detail.value;
    this.filter.isEmpty = this.checkIfFilterEmpty();
    this.filterService.changeFilter(this.filter);
  }

  checkIfFilterEmpty(): boolean {
    return (
      this.filter.categoriesToIncludeById.length === 0 &&
      this.filter.courseToInclude === null
    );
  }

}
