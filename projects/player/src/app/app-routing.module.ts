import {NgModule} from '@angular/core';
import {
  PreloadAllModules,
  RouterModule,
  Routes
} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'rolling', loadChildren: './rolling/rolling.module#RollingPageModule' },
  { path: 'puzzle', loadChildren: './puzzle/puzzle.module#PuzzlePageModule' },
  { path: 'team', loadChildren: './team/team.module#TeamPageModule' },
  { path: 'answer', loadChildren: './answer/answer.module#AnswerPageModule' },
  { path: 'attraction', loadChildren: './attraction/attraction.module#AttractionPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'game-complete', loadChildren: './game-complete/game-complete.module#GameCompletePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
