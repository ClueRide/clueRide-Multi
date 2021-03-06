import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {IonicModule} from '@ionic/angular';
import {
  ConnectionStateModule,
  LoadStateGuard
} from 'cr-lib';
import {DepartModule} from '../depart/depart.module';

import {PuzzlePage} from './puzzle.page';

const routes: Routes = [
  {
    path: ':id',
    component: PuzzlePage,
    canActivate: [LoadStateGuard]
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
  declarations: [PuzzlePage]
})
export class PuzzlePageModule {}
