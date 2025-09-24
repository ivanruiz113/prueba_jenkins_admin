import { bootstrapApplication } from '@angular/platform-browser';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { Route, provideRouter } from '@angular/router';
import { AuthorizationsRootComponent } from './app/authorizations-root';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./app/authorizations-root-routes').then((m) => m.remoteRoutes),
  },
];


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
  ],
};


bootstrapApplication(AuthorizationsRootComponent, appConfig).catch((err) => console.error(err));
