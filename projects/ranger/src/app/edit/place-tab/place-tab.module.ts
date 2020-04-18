import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {ConnectionStateModule} from 'cr-lib';

import {PlaceTabPageComponent} from './place-tab.page';

@NgModule({
  imports: [
    CommonModule,
    ConnectionStateModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [PlaceTabPageComponent]
})
export class PlaceTabModule {}
