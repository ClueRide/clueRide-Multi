import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {OutingSummaryComponent} from './outing-summary';

@NgModule({
  declarations: [
    OutingSummaryComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    OutingSummaryComponent,
  ]
})
export class OutingSummaryModule { }
