import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {HeadingComponent} from './heading.component';

@NgModule({
  declarations: [
    HeadingComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    HeadingComponent
  ],
  providers: [
    HeadingComponent,
  ]
})
export class HeadingModule {}
