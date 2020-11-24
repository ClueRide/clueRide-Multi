import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EdgeComponent} from './edge.component';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';


@NgModule({
  declarations: [EdgeComponent],
  exports: [
    EdgeComponent
  ],
  entryComponents: [
    EdgeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ]
})
export class EdgeModule { }
