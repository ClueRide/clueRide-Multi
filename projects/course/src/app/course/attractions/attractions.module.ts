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
import {EdgeModule} from '../../edge/edge.module';
import {AttractionIconModule} from 'cr-lib';

const routes: Routes = [
  {
    path: '',
    component: AttractionsSequencePage
  }
];

@NgModule({
  imports: [
    AttractionIconModule,
    CommonModule,
    EdgeModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    AttractionsSequencePage,
    AttractionSuggestComponent
  ]
})
export class AttractionsPageModule {}
