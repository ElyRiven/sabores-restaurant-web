import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    // TODO: Create components for each route
    loadChildren: () => import('./web-front/web-front.routes'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
