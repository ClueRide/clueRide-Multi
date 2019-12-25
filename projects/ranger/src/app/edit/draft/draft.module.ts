import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {IonicModule} from '@ionic/angular';
import {
  ConnectionStateComponentModule,
  LocTypeChipModule
} from 'cr-lib';

import {DraftPage} from './draft.page';

const routes: Routes = [
  {
    path: '',
    component: DraftPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ConnectionStateComponentModule,
    FormsModule,
    IonicModule,
    LocTypeChipModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DraftPage]
})
export class DraftPageModule {}
