import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {IonicModule} from '@ionic/angular';
import {
  ConnectionStateModule,
  DoubleClickModule,
  MemberChipComponentModule
} from 'cr-lib';

import {TeamPage} from './team.page';

const routes: Routes = [
  {
    path: '',
    component: TeamPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ConnectionStateModule,
    DoubleClickModule,
    FormsModule,
    IonicModule,
    MemberChipComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TeamPage]
})
export class TeamPageModule {}
