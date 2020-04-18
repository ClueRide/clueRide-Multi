import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {
  ConnectionStateModule,
  LocTypeChipModule
} from 'cr-lib';

import {DraftTabPageComponent} from './draft-tab.page';

@NgModule({
  imports: [
    CommonModule,
    ConnectionStateModule,
    FormsModule,
    IonicModule,
    LocTypeChipModule,
  ],
  declarations: [DraftTabPageComponent]
})
export class DraftTabModule {}

