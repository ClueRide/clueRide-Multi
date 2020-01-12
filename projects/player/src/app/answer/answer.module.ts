import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {IonicModule} from '@ionic/angular';
import {DepartModule} from '../depart/depart.module';

import {AnswerPage} from './answer.page';

const routes: Routes = [
  {
    path: ':id',
    component: AnswerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepartModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AnswerPage]
})
export class AnswerPageModule {}