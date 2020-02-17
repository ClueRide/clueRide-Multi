import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {ProfileSummaryComponent} from './profile-summary';

@NgModule({
  declarations: [
    ProfileSummaryComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    ProfileSummaryComponent
  ],
})
export class ProfileSummaryModule {}
