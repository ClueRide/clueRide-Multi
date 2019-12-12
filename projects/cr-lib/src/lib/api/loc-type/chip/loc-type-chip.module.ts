import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {LocTypeChipComponent} from './loc-type-chip.component';

@NgModule({
  declarations: [
    LocTypeChipComponent,
  ] ,
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    LocTypeChipComponent
  ]
})
export class LocTypeChipModule {}
