import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlagRowComponent} from './flag-row.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [FlagRowComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    FlagRowComponent
  ]
})
export class FlagRowModule { }
