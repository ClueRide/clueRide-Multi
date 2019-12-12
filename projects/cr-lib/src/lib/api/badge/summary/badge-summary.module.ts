import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {ProgressChipModule} from '../../progress-chip/progress-chip.module';
import {BadgeSummaryComponent} from './badge-summary';

@NgModule({
  declarations: [
    BadgeSummaryComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    ProgressChipModule
  ],
  exports: [
    BadgeSummaryComponent
  ]
})
export class BadgeSummaryModule {}
