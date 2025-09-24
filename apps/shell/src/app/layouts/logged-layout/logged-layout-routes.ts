import { Route } from '@angular/router';
import { LoggedLayoutComponent } from './logged-layout';

export const loggedLayoutRoutes: Route[] = [
  {
    path: '',
    component: LoggedLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./../../routes/dashboard/dashboard')
            .then(m => m.DashboardComponent),
      },
      {
        path: 'monitoring',
        loadChildren: () =>
          import('monitoring/Routes').then(m => m.remoteRoutes),
      },
      {
        path: 'authorizations',
        loadChildren: () =>
          import('authorizations/Routes').then(m => m.remoteRoutes),
      },
      {
        path: 'debugger',
        loadChildren: () =>
          import('debugger/Routes').then(m => m.remoteRoutes),
      },
    ]
  }
];
