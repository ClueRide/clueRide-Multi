import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {Camera} from '@ionic-native/camera/ngx';

import {IonicModule} from '@ionic/angular';
import {ConnectionStateModule} from 'cr-lib';

import {ImageCapturePage} from './image-capture.page';

const routes: Routes = [
  {
    path: '',
    component: ImageCapturePage
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
  declarations: [ImageCapturePage],
  providers: [Camera]
})
export class ImageCapturePageModule {}
