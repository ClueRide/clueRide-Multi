import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {Course} from 'cr-lib';
import {
  NavigationExtras,
  Router
} from '@angular/router';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
})
export class CourseItemComponent implements OnInit {

  @Input() course: Course;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}

  public show(): void {
    console.log("Navigating to Course Page for", this.course.name);
    let navigationExtras: NavigationExtras = {
      state: {
        course: this.course
      }
    };
    this.router.navigate(
      ['course/' + this.course.id + '/details'],
      navigationExtras
    ).then(() => console.log('Successful launch of Course Page')
    ).catch( (error) => console.log('Failed to launch Course Page', error)
    );
  }

}
