import {
  ApplicationConfig,
  inject,
  Injector,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { initDatabase } from './local-first/services/db.service';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app.routes';
// import { initDB } from './local-first/services/db.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(initDatabase),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideIonicAngular({}),
  ],
};
