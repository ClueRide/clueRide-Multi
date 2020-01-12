import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {OutingPage} from './outing.page';

// import {SummaryComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    OutingPage,
  ],
  imports: [
    // SummaryComponentsModule
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: OutingPage
      }
    ]),
  ],
})
export class OutingPageModule {}
