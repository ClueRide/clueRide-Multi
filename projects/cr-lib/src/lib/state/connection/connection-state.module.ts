import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {ConnectionStateComponent} from './connection-state';

@NgModule({
  declarations: [
    ConnectionStateComponent,
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    ConnectionStateComponent
  ],
})
export class ConnectionStateModule {}
