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
import {PuzzleGuard} from './puzzle.guard';

import {PuzzlePage} from './puzzle.page';

const routes: Routes = [
  {
    path: ':id',
    component: PuzzlePage,
    canActivate: [PuzzleGuard]
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
