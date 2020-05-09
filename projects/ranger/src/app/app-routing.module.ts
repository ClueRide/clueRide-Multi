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
  /* This is this lazy loading of the EditPage Module -- which includes its parent-child routing. */
  { path: 'edit', loadChildren: './edit/edit.module#EditPageModule' },
  /* Lazy loading for the Images Edit; wasn't able to make this a child of the Place Tab. */
  { path: 'images/:id', loadChildren: './images/images.module#ImagesPageModule' },
  { path: 'image-capture', loadChildren: './image-capture/image-capture.module#ImageCapturePageModule' },
  { path: 'puzzle-modal', loadChildren: './puzzle/modal/puzzle-modal.module#PuzzleModalPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'filter', loadChildren: './filter/page/filter-page.module#FilterPageModule' },
  { path: 'flag', loadChildren: './flag/flag.module#FlagPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
        preloadingStrategy: PreloadAllModules,
        // enableTracing: true  // <-- debugging purposes only
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
