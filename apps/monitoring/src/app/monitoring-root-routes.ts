import { Route } from '@angular/router';
import { MonitoringRootComponent } from './monitoring-root';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: MonitoringRootComponent,
    children: [
      { path: '', redirectTo: 'alerts', pathMatch: 'full', },
      {
        path: 'alerts',
        // outlet: 'monitoring-outlet',
        loadComponent: () => import('./routes/user-alerts/user-alerts')
          .then(c => c.UserAlertsComponent),
      },
      {
        path: 'people',
        // outlet: 'monitoring-outlet',
        loadComponent: () => import('./routes/people/people')
          .then(c => c.PeopleComponent),
      },
    ]
  },
];
