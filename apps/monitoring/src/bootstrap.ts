import { bootstrapApplication } from '@angular/platform-browser';
import { Route, provideRouter } from '@angular/router';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { MonitoringRootComponent } from './app/monitoring-root';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./app/monitoring-root-routes').then((m) => m.remoteRoutes),
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
  ],
};

bootstrapApplication(MonitoringRootComponent, appConfig)
  .catch((err) => console.error(err));
