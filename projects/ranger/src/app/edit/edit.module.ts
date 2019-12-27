import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {IonicModule} from '@ionic/angular';
import {ConnectionStateModule} from 'cr-lib';
import {DraftPageModule} from './draft/draft.module';
import {DraftPage} from './draft/draft.page';

import {EditPage} from './edit.page';
import {ImagesPageModule} from './images/images.module';
import {ImagesPage} from './images/images.page';
import {PuzzlePageModule} from './puzzle/puzzle.module';
import {PuzzlePage} from './puzzle/puzzle.page';

const routes: Routes = [
  {
    path: '',
    component: EditPage,
    children: [
      {
        path: ':id/draft',
        component: DraftPage
      },
      {
        path: ':id/images',
        component: ImagesPage
      },
      {
        path: ':id/puzzle',
        component: PuzzlePage
      }
    ]
  }

];

@NgModule({
  imports: [
    CommonModule,
    ConnectionStateModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    DraftPageModule,
    ImagesPageModule,
    PuzzlePageModule,
  ],
  declarations: [
    EditPage
  ],
  exports: [RouterModule]
})
export class EditPageModule {}
