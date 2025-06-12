import { Routes } from '@angular/router';
import WebFrontLayoutComponent from './layouts/web-front-layout/web-front-layout.component';
import { PlaceholderComponent } from './components/placeholder.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const WebFrontRoutes: Routes = [
  {
    path: '',
    component: WebFrontLayoutComponent,
    children: [
      {
        path: '',
        // TODO: Create components for each route
        component: HomePageComponent,
      },
      {
        path: 'menu',
        // TODO: Create components for each route
        component: PlaceholderComponent,
      },
      {
        path: 'reservations',
        // TODO: Create components for each route
        component: PlaceholderComponent,
      },
      {
        path: 'events',
        // TODO: Create components for each route
        component: PlaceholderComponent,
      },
      {
        path: 'about',
        // TODO: Create components for each route
        component: PlaceholderComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export default WebFrontRoutes;
