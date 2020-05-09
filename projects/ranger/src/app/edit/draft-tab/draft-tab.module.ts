import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {
  ConnectionStateModule,
  LocTypeChipModule
} from 'cr-lib';

import {DraftTabPageComponent} from './draft-tab.page';
import {FlagButtonModule} from '../../flag/button/flag-button.module';

@NgModule({
  imports: [
    CommonModule,
    ConnectionStateModule,
    FlagButtonModule,
    FormsModule,
    IonicModule,
    LocTypeChipModule,
  ],
  declarations: [DraftTabPageComponent]
})
export class DraftTabModule {}

