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
import {DraftTabPageComponent} from './draft-tab/draft-tab.page';

import {EditPage} from './edit.page';
import {PlaceTabModule} from './place-tab/place-tab.module';
import {PlaceTabPageComponent} from './place-tab/place-tab.page';
import {PuzzleTabModule} from './puzzle-tab/puzzle-tab.module';
import {PuzzleTabPageComponent} from './puzzle-tab/puzzle-tab.page';

const routes: Routes = [
  {
    path: '',
    component: EditPage,
    children: [
      {
        path: ':id/draft',
        component: DraftTabPageComponent
      },
      {
        path: ':id/place',
        component: PlaceTabPageComponent
      },
      {
        path: ':id/puzzle',
        component: PuzzleTabPageComponent
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
