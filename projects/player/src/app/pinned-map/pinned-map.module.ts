import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {PinnedMapComponent} from './pinned-map.component';

@NgModule({
  declarations: [
    PinnedMapComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    PinnedMapComponent
  ]
})
export class PinnedMapModule { }
