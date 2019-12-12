import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {BadgesPage} from './badges.page';

@NgModule({
  declarations: [
    BadgesPage,
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    BadgesPage
  ]
})
export class BadgesPageModule {}
