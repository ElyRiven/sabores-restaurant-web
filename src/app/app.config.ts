import {
  ApplicationConfig,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withHashLocation,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import localEs from '@angular/common/locales/es';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localEs, 'es');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withHashLocation(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withViewTransitions()
    ),
    provideAnimations(),
    {
      provide: LOCALE_ID,
      useValue: 'es',
    },
  ],
};
