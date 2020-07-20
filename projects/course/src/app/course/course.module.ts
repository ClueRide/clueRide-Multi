import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {CoursePage} from './course.page';
import {CourseStartComponent} from './start/course-start.component';
import {DetailsPage} from './details/details.page';
import {AttractionsSequencePage} from './attractions/attractions-sequence-page.component';
import {AttractionsPageModule} from './attractions/attractions.module';
import {DetailsPageModule} from './details/details.module';

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
        component: AttractionsSequencePage
      }
    ]
  }
];

@NgModule({
  exports: [
    CourseStartComponent,
    RouterModule
  ],
  imports: [
    AttractionsPageModule,
    CommonModule,
    DetailsPageModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [
    CoursePage,
    CourseStartComponent,
  ]
})
export class CoursePageModule {}
