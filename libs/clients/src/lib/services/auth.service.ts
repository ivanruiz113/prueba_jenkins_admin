import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { UserService, EnvironmentService, StorageService } from '@balanz-backoffice/core';
import { PreLoginData, User, getBrowserInfo } from '@balanz-backoffice/shared';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private _userService = inject(UserService);
  private _http = inject(HttpClient);
  private _envService = inject(EnvironmentService);
  private _storageService = inject(StorageService);

  private _source: string = this._envService.env.clientsConfig.source;
  private _basePath: string = this._envService.env.clientsConfig.apiBasePath;

  /**
   * Funcion encargarda de realizar el pre inicio de
   * sesion del usuario.
   */
  preLogIn(user: string): Observable<PreLoginData> {
    return this._http.post<PreLoginData>(
      `${this._basePath}/auth/init`,
      { user, source: this._source },
      { params: { avoidAuthRedirect: true }, },
    );
  }

  /**
   * Funcion encargarda de realizar el inicio de
   * sesion del usuario y guardarlo en el storage
   * mas en el userService.
   */
  logIn(user: string, pass: string, nonce: string): Observable<User> {
    return this._http.post<any>(
      `${this._basePath}/auth/login`,
      { user, pass, nonce, source: this._source, ...getBrowserInfo },
      { params: { avoidAuthRedirect: true } },
    ).pipe(
      tap((response) => {
        this._userService.setUser(response);
      }),
    );
  }

  /**
   * Funcion encargarda de realizar el deslogueo de
   * sesion del usuario.
   */
  logOut(): Observable<null> {
    return of(null)
      .pipe(tap(() => {
        this._userService.clearUser();
      }));
  }

  /**
   * Funcion encargarda de realizar el inicio de
   * sesion del usuario sso y guardarlo en el storage
   * mas en el userService.
   */
  logInSSO(user: string, nonce: string): Observable<any> {
    const browserInfo = getBrowserInfo(this._storageService);
    return this._http.post<any>(
      `${this._basePath}/auth/login`,
      { user, nonce, source: this._source, ...browserInfo },
      { params: { avoidAuthRedirect: true }, },
    ).pipe(
      tap((response) => {
        this._userService.setUser(response);
        return response;
      })
    );
  }

}
