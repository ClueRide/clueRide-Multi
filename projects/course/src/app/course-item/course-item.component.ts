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
import {SelectService} from '../course/select/select.service';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
})
export class CourseItemComponent implements OnInit {

  @Input() course: Course;

  constructor(
    private selectService: SelectService,
    private router: Router,
  ) {
  }

  ngOnInit() {
  }

  public show(): void {
    console.log("Navigating to Course Page for", this.course.name);
    let navigationExtras: NavigationExtras = {
      state: {
        course: this.course
      }
    };
    this.router.navigate(
      ['course/' + this.course.id + '/attractions'],
      navigationExtras
    ).then(() => console.log('Successful launch of Course Page')
    ).catch( (error) => console.log('Failed to launch Course Page', error)
    );
  }

  public makeDefault(course: Course) {
    this.selectService.select(course);
  }

  public reset(course: Course) {
    this.selectService.reset(course);
  }

  public isSelected(course: Course):boolean {
    return this.selectService.isSelected(course);
  }

}
