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
  DoubleClickModule
} from 'cr-lib';
import {RollingGuard} from './rolling.guard';

import {RollingPage} from './rolling.page';

const routes: Routes = [
  {
    path: '',
    component: RollingPage,
    canActivate: [RollingGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ConnectionStateModule,
    DoubleClickModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RollingPage]
})
export class RollingPageModule {}
