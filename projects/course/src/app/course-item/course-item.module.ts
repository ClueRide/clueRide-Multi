import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CourseItemComponent} from './course-item.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    CourseItemComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    CourseItemComponent
  ]
})
export class CourseItemModule { }
