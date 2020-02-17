import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {AppVersion} from '@ionic-native/app-version/ngx';

import {IonicModule} from '@ionic/angular';
import {
  ConnectionStateModule,
  ProfileSummaryModule
} from 'cr-lib';

import {AboutPage} from './about.page';

const routes: Routes = [
  {
    path: '',
    component: AboutPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ConnectionStateModule,
    FormsModule,
    IonicModule,
    ProfileSummaryModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AboutPage],
  providers: [AppVersion]
})
export class AboutPageModule {}
