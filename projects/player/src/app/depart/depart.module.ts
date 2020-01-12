import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {DepartComponent} from './depart.component';

@NgModule({
  declarations: [
    DepartComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    DepartComponent
  ]
})
export class DepartModule { }
