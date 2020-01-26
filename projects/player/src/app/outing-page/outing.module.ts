import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {PinnedMapModule} from '../pinned-map/pinned-map.module';
import {ShowGameModule} from '../show-game/show-game.module';
import {OutingPage} from './outing.page';

@NgModule({
  declarations: [
    OutingPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    PinnedMapModule,
    ShowGameModule,
    RouterModule.forChild([
      {
        path: 'outing',
        component: OutingPage
      }
    ]),
  ],
})
export class OutingPageModule {}
