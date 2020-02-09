import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {IonicModule} from '@ionic/angular';
import {ConnectionStateModule} from 'cr-lib';
import {DepartModule} from '../depart/depart.module';
import {AnswerGuard} from './answer.guard';

import {AnswerPage} from './answer.page';

const routes: Routes = [
  {
    path: ':id',
    component: AnswerPage,
    canActivate: [AnswerGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ConnectionStateModule,
    FormsModule,
    IonicModule,
    DepartModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AnswerPage]
})
export class AnswerPageModule {}
