import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AlertsService } from '../services/alerts.service';
import { checkNoNetworkConnection } from '@balanz-backoffice/shared';
import { UserService } from '../services/user.service';

/**
 * Interceptor encargado de administrar los errores de los requests.
*/
export function errorInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {

  const _router = inject(Router);
  const _alertsService = inject(AlertsService);
  const _userService = inject(UserService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMsg = 'Ha ocurrido un error. Volvé a intentarlo en unos minutos.';
      if (checkNoNetworkConnection(error)) {
        errorMsg = 'Sin conexion a internet. Compruebe su conexión y vuelva a intentarlo.';
      } else {
        const avoidAuthRedirect = (/true/i).test(req.params.get('avoidAuthRedirect') || '');
        if ([401, 403].includes(error.status)) {
          errorMsg = error.error.Descripcion || 'Sesion vencida. Ingrese nuevamente.';
          if (!avoidAuthRedirect) {
            _userService.clearUser();
            _router.navigate(['/unlogged']);
          }
        }
      }
      _alertsService.error(errorMsg);
      return throwError(() => error);
    }),
  );
}
