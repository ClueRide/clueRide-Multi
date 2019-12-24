import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {DraftPageModule} from './draft/draft.module';
import {EditPageRoutingModule} from './edit-routing.module';

import {EditPage} from './edit.page';
import {ImagesPageModule} from './images/images.module';
import {PuzzlePageModule} from './puzzle/puzzle.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DraftPageModule,
    ImagesPageModule,
    PuzzlePageModule,
    /* TODO: CI-49 this is one of the pieces; when removed, this is breaking. */
    EditPageRoutingModule
  ],
  declarations: [
    EditPage
  ]
})
export class EditPageModule {}
