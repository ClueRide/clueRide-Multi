import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {GameCompletePage} from './game-complete.page';
import {ConnectionStateModule} from "cr-lib";

const routes: Routes = [
  {
    path: '',
    component: GameCompletePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ConnectionStateModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
    declarations: [GameCompletePage]
})
export class GameCompletePageModule {}
