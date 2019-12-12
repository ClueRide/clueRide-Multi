import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {BadgesPerLevelComponent} from './badges-per-level';

@NgModule({
  declarations: [
    BadgesPerLevelComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    BadgesPerLevelComponent
  ]
})
export class BadgesPerLevelModule {}
