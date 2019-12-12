import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {ProgressChipComponent} from './progress-chip';

@NgModule({
  declarations: [
    ProgressChipComponent,
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    ProgressChipComponent,
  ],
})
export class ProgressChipModule {}
