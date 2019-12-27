import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {IonicModule} from '@ionic/angular';
import {ConnectionStateModule} from 'cr-lib';
import {DraftTabModule} from './draft-tab/draft-tab.module';
import {DraftTabPage} from './draft-tab/draft-tab.page';

import {EditPage} from './edit.page';
import {PlaceTabModule} from './place-tab/place-tab.module';
import {PlaceTabPage} from './place-tab/place-tab.page';
import {PuzzleTabModule} from './puzzle-tab/puzzle-tab.module';
import {PuzzleTabPage} from './puzzle-tab/puzzle-tab.page';

const routes: Routes = [
  {
    path: '',
    component: EditPage,
    children: [
      {
        path: ':id/draft',
        component: DraftTabPage
      },
      {
        path: ':id/images',
        component: PlaceTabPage
      },
      {
        path: ':id/puzzle',
        component: PuzzleTabPage
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
    DraftTabModule,
    PlaceTabModule,
    PuzzleTabModule,
  ],
  declarations: [
    EditPage
  ],
  exports: [RouterModule]
})
export class EditPageModule {}
