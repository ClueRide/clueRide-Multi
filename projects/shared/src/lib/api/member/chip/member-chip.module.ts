import {NgModule} from '@angular/core';
// import {IonicPageModule} from 'ionic-angular';
import {MemberChipComponent} from './member-chip';

@NgModule({
  declarations: [
    MemberChipComponent,
  ],
  imports: [
    // IonicPageModule.forChild(MemberChipComponent),
  ],
  exports: [
    MemberChipComponent
  ],
})
export class MemberChipComponentModule {}
