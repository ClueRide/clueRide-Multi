import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {PuzzleListComponent} from './list/puzzle-list.component';
import {PuzzleModalPageModule} from './modal/puzzle-modal.module';


@NgModule({
  declarations: [
    PuzzleListComponent,
  ],
  imports: [
    CommonModule,
    PuzzleModalPageModule,
    IonicModule.forRoot()
  ],
  exports: [
    PuzzleListComponent,
  ]
})
export class PuzzleModule { }
