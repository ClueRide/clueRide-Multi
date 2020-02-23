import {
  Component,
  OnInit
} from '@angular/core';
import {
  Category,
  CategoryService,
  Course,
  CourseService
} from 'cr-lib';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  public courses: Course[];
  public categories: Category[];

  constructor(
    private courseService: CourseService,
    private categoryService: CategoryService,
  ) {
    this.categories = [];
  }

  ngOnInit() {
    this.courseService.getAllCourses().subscribe(
      (courses) => {
        this.courses = courses;
      }
    );
    this.categoryService.getAllCategories().subscribe(
      (category) => {
        this.categories.push(category);
      }
    );
  }

}
