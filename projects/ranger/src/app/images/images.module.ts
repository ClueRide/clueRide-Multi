import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {IonicModule} from '@ionic/angular';
import {ConnectionStateModule} from 'cr-lib';

import {ImagesPage} from './images.page';

const routes: Routes = [
  {
    path: '',
    component: ImagesPage
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
  declarations: [ImagesPage]
})
export class ImagesPageModule {}
