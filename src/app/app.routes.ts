import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  {
    path: 'posts',
    loadComponent: () => import('./pages/post-list/post-list.component').then(m => m.PostListComponent),
    title: 'PostManager — Todos los Posts',
  },
  {
    path: 'posts/new',
    loadComponent: () => import('./pages/post-create/post-create.component').then(m => m.PostCreateComponent),
    title: 'Crear Nuevo Post',
  },
  {
    path: 'posts/:id',
    loadComponent: () => import('./pages/post-detail/post-detail.component').then(m => m.PostDetailComponent),
    title: 'Detalle del Post',
  },
  {
    path: 'posts/:id/edit',
    loadComponent: () => import('./pages/post-edit/post-edit.component').then(m => m.PostEditComponent),
    title: 'Editar Post',
  },
  { path: '**', redirectTo: 'posts' },
];