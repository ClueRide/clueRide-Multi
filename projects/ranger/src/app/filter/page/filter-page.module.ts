import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {IonicModule} from '@ionic/angular';
import {ConnectionStateModule} from 'cr-lib';

import {FilterPageComponent} from './filter.page';

const routes: Routes = [
  {
    path: '',
    component: FilterPageComponent
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
  declarations: [
    FilterPageComponent,
  ]
})
export class FilterPageModule {}
