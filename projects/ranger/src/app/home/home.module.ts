import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {ConnectionStateModule} from 'cr-lib';
import {MapModule} from '../map/map.module';

import {HomePage} from './home.page';
import {HomeGuard} from './home.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConnectionStateModule,
    MapModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        canActivate: [HomeGuard]
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
