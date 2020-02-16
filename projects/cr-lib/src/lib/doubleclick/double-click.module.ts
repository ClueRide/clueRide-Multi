import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PreventDoubleClickDirective} from './prevent-double-click.directive';

@NgModule({
  declarations: [
    PreventDoubleClickDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PreventDoubleClickDirective
  ]
})
export class DoubleClickModule { }
