import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

/**
 * Interceptor encargado de administrar los headers de los requests.
 */
export function httpInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const _userService = inject(UserService);
  let reqWithHeader = req.clone({
    setHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  if (_userService.isLoggedIn) {
    reqWithHeader = reqWithHeader.clone({
      setHeaders: {
        Authorization: _userService.currentUser()?.AccessToken as string,
      },
    });
  }
  return next(reqWithHeader);
}
