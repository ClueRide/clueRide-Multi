import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ConnectionExplainPage} from './connection-explain.page';

const routes: Routes = [
  {
    path: '',
    component: ConnectionExplainPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConnectionExplainPage]
})

export class ConnectionExplainPageModule {}
