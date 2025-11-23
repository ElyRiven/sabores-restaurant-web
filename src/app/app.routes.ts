import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./web-front/web-front.routes'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
