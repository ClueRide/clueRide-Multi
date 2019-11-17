import {NgModule} from '@angular/core';
// import {IonicPageModule} from 'ionic-angular';
import {ConnectionStateComponent} from './connection-state';

@NgModule({
  declarations: [
    ConnectionStateComponent,
  ],
  imports: [
    // IonicPageModule.forChild(ConnectionStateComponent),
  ],
  exports: [
    ConnectionStateComponent
  ],
})
export class ConnectionStateComponentModule {}
