import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {LoaderComponent} from './loader';

@NgModule({
  declarations: [
    LoaderComponent,
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    LoaderComponent
  ],
})
export class LoaderComponentModule {}
