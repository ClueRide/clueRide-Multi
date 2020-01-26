import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {
  ConnectionStateModule,
  MemberChipComponentModule
} from 'cr-lib';
import {SummaryComponentsModule} from '../components.module';
import {ShowGameModule} from '../show-game/show-game.module';
import {HomeGuard} from './home.guard';

import {HomePage} from './home.page';

@NgModule({
  imports: [
    CommonModule,
    ConnectionStateModule,
    FormsModule,
    IonicModule,
    ShowGameModule,
    MemberChipComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        canActivate: [HomeGuard]
      }
    ]),
    SummaryComponentsModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
