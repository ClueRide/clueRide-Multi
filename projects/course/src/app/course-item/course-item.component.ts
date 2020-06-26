import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {Course} from 'cr-lib';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
})
export class CourseItemComponent implements OnInit {

  @Input() course: Course;

  constructor() { }

  ngOnInit() {}

  public show(): void {
    console.log("Navigating to Course Page for", this.course.name);
    // TODO: Link this to the Course Page CI-211
  }

}
