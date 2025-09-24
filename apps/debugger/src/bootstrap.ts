import { bootstrapApplication } from '@angular/platform-browser';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, Route } from '@angular/router';
import { DebuggerRootComponent } from './app/debugger-root';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./app/debugger-root-routes').then((m) => m.remoteRoutes),
  },
];


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
  ],
};


bootstrapApplication(DebuggerRootComponent, appConfig).catch((err) => console.error(err));
