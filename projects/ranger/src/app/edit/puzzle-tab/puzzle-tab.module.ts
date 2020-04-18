import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {ConnectionStateModule} from 'cr-lib';
import {PuzzleModule} from '../../puzzle/puzzle.module';

import {PuzzleTabPageComponent} from './puzzle-tab.page';

@NgModule({
  imports: [
    CommonModule,
    ConnectionStateModule,
    FormsModule,
    IonicModule,
    PuzzleModule,
  ],
  declarations: [PuzzleTabPageComponent]
})
export class PuzzleTabModule {}
