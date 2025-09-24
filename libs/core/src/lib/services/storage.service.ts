import { inject, Injectable } from '@angular/core';
import { EncrypterService } from './encrypter.service';
import { EnvironmentService } from './environments.service';
import { StorageType } from '@balanz-backoffice/shared';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private _sessionStorage: Storage = sessionStorage;
  private _localStorage: Storage = localStorage;
  private _envService = inject(EnvironmentService);
  private _encrypterService = inject(EncrypterService);

  private _appName = this._envService.env.storageConfig.prefix;
  private _needEncrypt = this._envService.env.storageConfig.encrypt;

  /**
   * Obtiene el valor de la key guardada en el storage.
   *
   * @param key clave a ser obtenida en el storage.
   * @param useLocalStorage (default: false) true si se desea utilizar localStorage en vez de sessionStorage.
   */
  get(key: string, storage: StorageType = 'session', bypassPrefix: boolean = false): any {
    const perAppKey = bypassPrefix ? key : `${this._appName}_${key}`;
    const value = storage === 'local' ? this._localStorage.getItem(perAppKey) : this._sessionStorage.getItem(perAppKey);
    if (!value) {
      return null;
    }
    return this._needEncrypt ? this._encrypterService.decrypt(value) : this._getValueOrJSON(value);
  }

  /**
   * Guarda la key en el storage.
   *
   * @param key clave a ser guardada en el storage.
   * @param value valor de la clave a ser guardada en el storage.
   * @param useLocalStorage (default: false) true si se desea utilizar localStorage en vez de sessionStorage.
   */
  set(key: string, value: any, storage: StorageType = 'session', bypassPrefix: boolean = false): void {
    const perAppKey = bypassPrefix ? key : `${this._appName}_${key}`;
    const auxValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
    const encrypted = this._needEncrypt ? this._encrypterService.encrypt(auxValue) : JSON.stringify(value);
    if (storage === 'local') {
      this._localStorage.setItem(perAppKey, encrypted);
    } else {
      this._sessionStorage.setItem(perAppKey, encrypted);
    }
  }

  /**
   * Elimina la key del storage.
   *
   * @param key clave a ser removida del storage.
   * @param useLocalStorage (default: false) true si se desea utilizar localStorage en vez de sessionStorage.
   */
  remove(key: string, storage: StorageType = 'session', bypassPrefix: boolean = false): void {
    const perAppKey = bypassPrefix ? key : `${this._appName}_${key}`;
    if (storage === 'local') {
      this._localStorage.removeItem(perAppKey);
    } else {
      this._sessionStorage.removeItem(perAppKey);
    }
  }

  /**
   * ELimina todas las keys del storage.
   *
   * @param keys listado de claves a ser removidas del storage.
   * @param useLocalStorage (default: false) true si se desea utilizar localStorage en vez de sessionStorage.
   */
  removeList(keys: string[], storage: StorageType = 'session'): void {
    keys.forEach(key => {
      this.remove(key, storage);
    });
  }

  /**
   * Limpia el storage completamente.
   *
   * @param useLocalStorage (default: false) true si se desea utilizar localStorage en vez de sessionStorage.
   */
  clear(storage: StorageType = 'session'): void {
    storage === 'local' ? this._localStorage.clear() : this._sessionStorage.clear();
  }

  /** Valida si el item es un JSON o no. */
  private _getValueOrJSON(text: any): any {
    try {
      const parsed = JSON.parse(text);
      return parsed;
    } catch (_) {
      return text;
    }
  }
}
