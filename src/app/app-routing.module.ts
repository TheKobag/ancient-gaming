import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  {
    path: 'posts',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./posts/ui/containers/posts/posts.component').then(
            (mod) => mod.PostsComponent
          ),
      },
      {
        path: 'add',
        loadComponent: () =>
          import('./posts/ui/containers/add/add.component').then(
            (mod) => mod.AddComponent
          ),
      },
      {
        path: 'update',
        loadComponent: () =>
          import('./posts/ui/containers/posts/posts.component').then(
            (mod) => mod.PostsComponent
          ),
      },
      {
        path: 'delete',
        loadComponent: () =>
          import('./posts/ui/containers/posts/posts.component').then(
            (mod) => mod.PostsComponent
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
