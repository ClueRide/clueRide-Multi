import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {ShowGameComponent} from './show/show-game.component';


@NgModule({
  declarations: [
    ShowGameComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ShowGameComponent
  ]
})
export class GameModule { }
