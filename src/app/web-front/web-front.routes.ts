import { Routes } from '@angular/router';
import WebFrontLayoutComponent from './layouts/web-front-layout/web-front-layout.component';
import { PlaceholderComponent } from './components/placeholder.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { ReservationsPageComponent } from './pages/reservations-page/reservations-page.component';

export const WebFrontRoutes: Routes = [
  {
    path: '',
    component: WebFrontLayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'menu',
        component: MenuPageComponent,
      },
      {
        path: 'reservations',
        component: ReservationsPageComponent,
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
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export default WebFrontRoutes;
