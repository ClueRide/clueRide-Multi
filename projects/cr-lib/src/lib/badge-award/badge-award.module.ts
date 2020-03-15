import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BadgeAwardComponent} from "./badge-award.component";
import {IonicModule} from "@ionic/angular";

@NgModule({
  declarations: [BadgeAwardComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class BadgeAwardModule { }
