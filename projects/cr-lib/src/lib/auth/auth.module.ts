import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';
import {ConfirmPageRoutingModule} from './confirm/confirm-routing.module';

import {ConfirmPage} from './confirm/confirm.page';
import {RegistrationPageRoutingModule} from './registration/registration-routing.module';
import {RegistrationPage} from './registration/registration.page';

const routes: Routes = [
  {
    path: 'reg-register',
    component: RegistrationPage
  },

  {
    path: 'reg-confirm',
    component: ConfirmPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmPageRoutingModule,
    RegistrationPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ConfirmPage,
    RegistrationPage
  ]
})
export class AuthModule {}
