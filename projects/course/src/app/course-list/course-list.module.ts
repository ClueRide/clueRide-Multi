import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {CourseListPage} from './course-list.page';
import {CourseItemModule} from '../course-item/course-item.module';

const routes: Routes = [
  {
    path: '',
    component: CourseListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    CourseItemModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CourseListPage]
})
export class CourseListPageModule {}
