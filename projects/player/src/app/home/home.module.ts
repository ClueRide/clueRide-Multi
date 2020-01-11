import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {MemberChipComponentModule} from 'cr-lib';
import {SummaryComponentsModule} from '../components.module';
import {ShowGameModule} from '../show-game/show-game.module';

import {HomePage} from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowGameModule,
    MemberChipComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    SummaryComponentsModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
