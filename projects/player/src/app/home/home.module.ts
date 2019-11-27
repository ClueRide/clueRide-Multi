import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import {MemberChipComponentModule} from 'cr-lib';
import {SummaryComponentsModule} from '../components.module';

import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
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
