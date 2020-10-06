import {
    Component,
    OnInit
} from '@angular/core';
import {
    Course,
    CourseService,
    LoaderService
} from 'cr-lib';
import {Router} from '@angular/router';
import {EditedCourseService} from '../course/edited-course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.page.html',
  styleUrls: ['./course-list.page.scss'],
})
export class CourseListPage implements OnInit {

  public courses: Course[];

  constructor(
    private courseService: CourseService,
    private editedCourseService: EditedCourseService,
    private loaderService: LoaderService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.refreshCourseList();
  }

  public addNew(): void {
    console.log("Adding new Course");
    let newCourse = new Course();

    this.editedCourseService.createCourse(newCourse).subscribe(
        (newCourse: Course) => {
          this.editedCourseService.setEditedCourse(newCourse);
          this.router.navigate(
              ['course/' + newCourse.id + '/details']
          ).then(() => console.log('Successful launch of Course Page')
          ).catch( (error) => console.log('Failed to launch Course Page. How come?', error)
          );
        }
    );
  }

  refreshCourseList(): void {
    // TODO: CI-227 Loader broken
    // this.loaderService.showLoader("Retrieving Course List");
    this.editedCourseService.refreshCourseList().subscribe(
      (courses: Course[]) => {
        this.courses = courses;
        // this.loaderService.hideLoader();
      },
      (error) => {
        console.log("Failed to retrieve Courses", error);
        // this.loaderService.hideLoader();
      }
    );
  }

}
