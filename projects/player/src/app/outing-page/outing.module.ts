import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {
  ConnectionStateModule,
  LoadStateGuard
} from 'cr-lib';
import {PinnedMapModule} from '../pinned-map/pinned-map.module';
import {ShowGameModule} from '../show-game/show-game.module';
import {OutingPage} from './outing.page';

@NgModule({
  declarations: [
    OutingPage,
  ],
  imports: [
    CommonModule,
    ConnectionStateModule,
    IonicModule,
    PinnedMapModule,
    ShowGameModule,
    RouterModule.forChild([
      {
        path: 'outing',
        component: OutingPage,
        // canActivate: [LoadStateGuard, SeekerSessionGuard]
        canActivate: [LoadStateGuard]
        // canActivate: [SeekerSessionGuard]
      }
    ]),
  ],
})
export class OutingPageModule {}
