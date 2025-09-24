import { Route } from '@angular/router';
import { loggedLayoutRoutes } from './layouts/logged-layout/logged-layout-routes';

/**
 * Ruteo principal de la aplicaición. En este se agregaran las
 * rutas de los layouts principales. No agregar rutas hijas
 * de los layouts aquí, sino en sus respectivos archivos. Tomar
 * como ejemplo el layout "logged-layout".
 */
export const appRoutes: Route[] = [
  {
    path: '',
    children: loggedLayoutRoutes,
  },
];

// import { Routes } from '@angular/router'
// import { UnloggedLayoutGuard, LoggedLayoutGuard } from '@balanz-backoffice/core';

// export const appRoutes: Routes = [
//   { path: '', redirectTo: 'unlogged', pathMatch: 'full' },
//   {
//     path: 'unlogged',
//     canActivate: [UnloggedLayoutGuard],
//     loadChildren: () =>
//       import('./layouts/unlogged-layout/unlogged-layout-routes')
//         .then(c => c.unloggedLayoutRoutes),

//   },
//   {
//     path: 'logged',
//     canActivate: [LoggedLayoutGuard],
//     loadChildren: () =>
//       import('./layouts/logged-layout/logged-layout-routes')
//         .then(c => c.loggedLayoutRoutes),
//   },
//   { path: '**', redirectTo: 'unlogged', pathMatch: 'full' }
// ];
