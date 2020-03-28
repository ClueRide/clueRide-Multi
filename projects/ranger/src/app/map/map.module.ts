import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {
  DoubleClickModule,
  FilterPopoverComponent,
  FilterPopoverModule,
  HeadingModule
} from 'cr-lib';
import {MapActionComponent} from './action/map-action.component';
import {AddLocButtonComponent} from './add-loc-button/add-loc-button';
import {MapComponent} from './map';
import {FilterActionComponent} from './filter-action/filter-action.component';

@NgModule({
  declarations: [
    MapComponent,
    AddLocButtonComponent,
    FilterActionComponent,
    MapActionComponent
  ],
  imports: [
    CommonModule,
    DoubleClickModule,
    FilterPopoverModule,
    IonicModule,
    HeadingModule,
  ],
  exports: [
    MapComponent,
  ],
  entryComponents: [
    FilterPopoverComponent
  ],
  providers: [
    MapComponent
  ]

})
export class MapModule {}
