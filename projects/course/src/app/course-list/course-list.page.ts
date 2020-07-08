import {
  Component,
  OnInit
} from '@angular/core';
import {
  Course,
  CourseService
} from 'cr-lib';
import {
  NavigationExtras,
  Router
} from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.page.html',
  styleUrls: ['./course-list.page.scss'],
})
export class CourseListPage implements OnInit {

  public courses: Course[];

  constructor(
    private courseService: CourseService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.courseService.getAllCourses().subscribe(
      (courses: Course[]) => this.courses = courses
    );
  }

  public addNew(): void {
    console.log("Adding new Course");
    let navigationExtras: NavigationExtras = {
      state: {
        course: new Course()
      }
    };

    this.router.navigate(
      ['course'],
      navigationExtras
    ).then(() => console.log('Successful launch of Course Page')
    ).catch( (error) => console.log('Failed to launch Course Page. How come?', error)
    );
  }

}
