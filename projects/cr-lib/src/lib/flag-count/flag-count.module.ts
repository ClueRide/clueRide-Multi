import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlagCountChipComponent} from './flag-count-chip.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [
    FlagCountChipComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    FlagCountChipComponent
  ],
})
export class FlagCountModule { }
