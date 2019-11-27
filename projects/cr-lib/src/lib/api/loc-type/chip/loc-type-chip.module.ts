import {NgModule} from '@angular/core';
import {LocTypeChipComponent} from './loc-type-chip.component';
// import {IonicPageModule} from '';

@NgModule({
  declarations: [
    LocTypeChipComponent,
  ] ,
  imports: [
    // IonicPageModule.forChild(LocTypeChipComponent),
  ],
  exports: [
    LocTypeChipComponent
  ]
})
export class LocTypeChipModule {}
