import { Route } from '@angular/router';
import { AuthorizationsRootComponent } from './authorizations-root';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: AuthorizationsRootComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: 'alerts',
      //   pathMatch: 'full',
      // },
      // {
      //   path: 'alerts',
      //   loadComponent: () => import('./routes/user-alerts/user-alerts')
      //     .then(c => c.UserAlertsComponent),
      // },
      // {
      //   path: 'people',
      //   loadComponent: () => import('./routes/people/people')
      //     .then(c => c.PeopleComponent),
      // },
    ]
  },
];
