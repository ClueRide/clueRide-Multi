import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {HeadingModule} from 'cr-lib';
import {AddLocButtonComponent} from './add-loc-button/add-loc-button';
import {MapComponent} from './map';

@NgModule({
  declarations: [
    MapComponent,
    AddLocButtonComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    HeadingModule,
  ],
  exports: [
    MapComponent
  ],
  providers: [
    MapComponent
  ]
})
export class MapModule {}
