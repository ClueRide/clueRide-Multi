import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {PuzzleModalPage} from './puzzle-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PuzzleModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PuzzleModalPage]
})
export class PuzzleModalPageModule {}
