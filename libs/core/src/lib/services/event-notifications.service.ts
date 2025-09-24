import { computed, Injectable, Signal, signal } from '@angular/core';
import { EventNotification, EventNotificationCode } from '@balanz-backoffice/shared';

@Injectable({ providedIn: 'root' })
export class EventNotificationsService {

  private _notificationsSignal = signal<EventNotification<unknown> | null>(null);

  /**
   * Retorna la señal encargado de informar los nuevos eventos.
   * *Ejemplo de implementacion:*
   * ``` typescript
   * export class myClass {
   *   private _eventNotifService = inject(EventNotificationsService);
   *   effect(() => {
   *     const newNotif = this._eventNotifService.onEvent;
   *     console.log('Nueva notif: ', newNotif);
   *   });
   * }
   * ```
   */
  get listenNotifs(): Signal<EventNotification<unknown> | null> {
    return this._notificationsSignal.asReadonly();
  }

  /**
   * Retorna la señal encargado de informar los nuevos eventos,
   * que coincidan con el codigo pasado por parametro.
   */
  listenNotifsByCode<T>(code: EventNotificationCode): Signal<T | null> {
    return computed<T | null>(() => {
      const newNotif = this._notificationsSignal();
      return newNotif && newNotif.code === code ? newNotif.meta as T : null;
    });
  }

  /**
   * Emitir un nuevo evento.
   */
  notify<T>(evt: EventNotification<T>): void {
    this._notificationsSignal.set(evt);
  }

}
