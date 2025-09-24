import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interceptor encargado de administrar el logueo de los requests.
*/
export function logsInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  // TODO: Implementar.
  // const token = request.headers.get('authorization') || '';
  // const url = request.url;
  // const params = request.params.toString();
  // if (url.includes(`${this._envService.env.loggerConfig.BaseUrlLoggerService}/logger-event`)) {
  //   throw new Error(error.error);
  // }
  // this._loggerService.registrarEvento({
  //   type: 'http',
  //   description: error.message,
  //   token,
  //   url,
  //   status: error.status,
  //   method: request.method,
  //   module: 'HttpClient',
  //   detail: `(${error.error?.CodigoError}) ${error.error?.Descripcion}`,
  //   extra: { params },
  //   version: VERSION.version + ' ' + VERSION.hash
  // });
  return next(req);
}
