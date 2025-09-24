import { bootstrapApplication } from '@angular/platform-browser';
import {
  ApplicationConfig,
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withViewTransitions } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import NORA_THEME from '@primeuix/themes/nora';
import {
  httpInterceptor, errorInterceptor, logsInterceptor,
} from '@balanz-backoffice/core';
import { App } from './app/app';
import { appRoutes } from './app/app-routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withViewTransitions()),
    provideAnimationsAsync(),
    /** configuracion http. */
    provideHttpClient(
      withInterceptors([
        httpInterceptor,
        errorInterceptor,
        logsInterceptor,
      ],
      ),
    ),
    /** NgPrime configurations */
    providePrimeNG({
      theme: {
        preset: NORA_THEME,
        options: { ripple: true },
      }
    }),
    /** Configuracion locale. */
    { provide: LOCALE_ID, useValue: 'es-AR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: '$' },
    { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { timezone: 'America/Argentina/Buenos_Aires' } },
  ],
};

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
