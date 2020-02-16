import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {DoubleClickModule} from 'cr-lib';
import {DepartComponent} from './depart.component';

@NgModule({
  declarations: [
    DepartComponent
  ],
  imports: [
    CommonModule,
    DoubleClickModule,
    IonicModule
  ],
  exports: [
    DepartComponent
  ]
})
export class DepartModule { }
