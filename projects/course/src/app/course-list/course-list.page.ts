import {
  Component,
  OnInit
} from '@angular/core';
import {
  Course,
  CourseService
} from 'cr-lib';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.page.html',
  styleUrls: ['./course-list.page.scss'],
})
export class CourseListPage implements OnInit {

  public courses: Course[];

  constructor(
    private courseService: CourseService,
  ) { }

  ngOnInit() {
    this.courseService.getAllCourses().subscribe(
      (courses: Course[]) => this.courses = courses
    );
  }

  public addNew(): void {
    console.log("Adding new Course");
    // TODO: Navigate to Course Page (CI-211)
  }

}
