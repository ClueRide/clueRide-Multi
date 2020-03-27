import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterPopoverComponent} from './popover.component';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [FilterPopoverComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    FilterPopoverComponent
  ],
  entryComponents: [
    FilterPopoverComponent
  ]
})
export class FilterPopoverModule { }
