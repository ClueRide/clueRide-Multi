import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import {SharedComponentsModule} from '../../../../shared/src/projects';
import {SummaryComponentsModule} from '../components.module';

import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // SharedComponentsModule,
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
