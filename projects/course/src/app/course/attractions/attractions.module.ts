import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {AttractionsSequencePage} from './attractions-sequence-page.component';
import {AttractionSuggestComponent} from '../attraction-suggest/attraction-suggest.component';

const routes: Routes = [
  {
    path: '',
    component: AttractionsSequencePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AttractionsSequencePage,
    AttractionSuggestComponent
  ]
})
export class AttractionsPageModule {}
