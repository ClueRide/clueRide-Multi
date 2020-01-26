import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ConfirmPageRoutingModule} from './confirm-routing.module';

import {ConfirmPage} from './confirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmPageRoutingModule
  ],
  declarations: [ConfirmPage]
})
export class ConfirmPageModule {}
