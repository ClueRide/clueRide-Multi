import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AttractionIconComponent} from './attraction-icon.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [AttractionIconComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [AttractionIconComponent]
})
export class AttractionIconModule { }
