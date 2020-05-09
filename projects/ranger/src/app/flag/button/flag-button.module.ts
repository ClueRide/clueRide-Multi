import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlagButtonComponent} from './flag-button.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [FlagButtonComponent],
  exports: [
    FlagButtonComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class FlagButtonModule { }
