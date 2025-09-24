import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { User, UserPermission, UserPermissions } from '@balanz-backoffice/shared';
import { StorageService } from './storage.service';

const STORAGE_USER_KEY = 'user';

@Injectable({ providedIn: 'root' })
export class UserService {

  private _storageService = inject(StorageService);

  private _userSignal = signal<User | null>(null);
  private _permissions = computed<UserPermissions>(() => {
    const userPermissions = this._userSignal()?.Permisos;
    if (!userPermissions) {
      return [];
    }
    const founded = userPermissions.find((p: UserPermission) => p.id === 'transaccional');
    if (!founded || !founded.menu) {
      return [];
    }
    return founded.menu
      .reduce((acc: any, el: any) => acc.concat(el.menu), [])
      .filter((el: any) => el)
      .map((el: UserPermission) => ({
        id: el.id,
        texto: el.texto,
        path: el.path,
        opciones: el.opciones,
      }));
  });

  /** Obtener el usuario actual (señal). */
  get currentUser(): Signal<User | null> {
    return this._userSignal.asReadonly();
  }

  /** Obtener el menu de permisos del usuario (señal). */
  get permissions(): Signal<UserPermissions> {
    return this._permissions;
  }

  /** Retornará true en caso de que exista un usuario logueado. */
  get isLoggedIn(): boolean {
    return this._userSignal()?.AccessToken !== undefined;
  }

  constructor() {
    const prevUser = this._storageService.get(STORAGE_USER_KEY);
    if (prevUser) {
      this._userSignal.set(prevUser);
    }
  }

  setUser(user: User): void {
    this._userSignal.set(user);
    this._storageService.set(STORAGE_USER_KEY, user);
  }

  clearUser(): void {
    this._userSignal.set(null);
    this._storageService.remove(STORAGE_USER_KEY);
  }

}
