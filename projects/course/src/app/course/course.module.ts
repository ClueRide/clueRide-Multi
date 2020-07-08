import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {CoursePage} from './course.page';
import {CourseThemeComponent} from './theme/course-theme.component';
import {CourseStartComponent} from './start/course-start.component';
import {DetailsPage} from './details/details.page';
import {AttractionsPage} from './attractions/attractions.page';

const routes: Routes = [
  {
    path: '',
    component: CoursePage,
    children: [
      {
        path: ':id/details',
        component: DetailsPage
      },
      {
        path: ':id/attractions',
        component: AttractionsPage
      }
    ]
  }
];

@NgModule({
  exports: [
    CourseStartComponent,
    CourseThemeComponent,
    RouterModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AttractionsPage,
    CoursePage,
    CourseStartComponent,
    CourseThemeComponent,
    DetailsPage,
  ]
})
export class CoursePageModule {}
