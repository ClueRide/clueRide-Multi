import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {MemberChipComponent} from './member-chip';

@NgModule({
  declarations: [
    MemberChipComponent,
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    MemberChipComponent
  ],
})
export class MemberChipComponentModule {}
