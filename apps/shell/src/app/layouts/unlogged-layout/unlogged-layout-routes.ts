import { Routes } from '@angular/router'
import { UnloggedLayoutComponent } from './unlogged-layout';

export const unloggedLayoutRoutes: Routes = [
  {
    path: '',
    component: UnloggedLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadChildren: () =>
          import('../../routes/login/login-routes')
            .then(c => c.loginRoutes),
      },
    ]
  }
];
