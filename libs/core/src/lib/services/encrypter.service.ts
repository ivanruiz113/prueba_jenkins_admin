import { inject, Injectable } from '@angular/core';
import { EnvironmentService } from './environments.service';
import * as cryptojs from 'crypto-js';

@Injectable({ providedIn: 'root' })
export class EncrypterService {

  private _envService = inject(EnvironmentService);

  private _secret = this._envService.env.ecnrypterConfig.secret;

  /** Realiza la encriptacion del texto pasado. */
  encrypt(text: string): string {
    if (!text) {
      return '';
    }
    return cryptojs.AES.encrypt(text, this._secret).toString();
  }

  /** Realiza la desencryptacion del texto encriptado pasado. */
  decrypt(encrypted: string): string {
    if (!encrypted) {
      return '';
    }
    const bytes = cryptojs.AES.decrypt(encrypted, this._secret);
    const value = bytes.toString(cryptojs.enc.Utf8);
    return this._getValueOrJSON(value);
  }

  /** Valida si el item es un JSON o no. */
  private _getValueOrJSON(text: any): any {
    try {
      const parsed = JSON.parse(text);
      return parsed;
    } catch (_: unknown) {
      return text;
    }
  }

}
