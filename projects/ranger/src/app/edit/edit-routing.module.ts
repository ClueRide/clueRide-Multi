import {NgModule} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {DraftPage} from './draft/draft.page';
import {EditPage} from './edit.page';
import {ImagesPage} from './images/images.page';
import {PuzzlePage} from './puzzle/puzzle.page';

const routes: Routes = [
  {
    path: '',
    component: EditPage,
    children: [
      {
        path: ':id/draft',
        component: DraftPage
      },
      {
        path: ':id/images',
        component: ImagesPage
      },
      {
        path: ':id/puzzle',
        component: PuzzlePage
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditPageRoutingModule {}
