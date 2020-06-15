import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {FlagsPage} from './flags.page';
import {FlagRowModule} from 'cr-lib';

const routes: Routes = [
  {
    path: ':id',
    component: FlagsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FlagRowModule
  ],
  declarations: [FlagsPage]
})
export class FlagsPageModule {}
