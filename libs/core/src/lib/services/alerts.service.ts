import { computed, inject, Injectable, Signal } from '@angular/core';
import { AlertEvent, AlertEventConfig, AlertType, EventNotificationCode } from '@balanz-backoffice/shared';
import { EnvironmentService } from './environments.service';
import { EventNotificationsService } from './event-notifications.service';

@Injectable({ providedIn: 'root' })
export class AlertsService {

  private _envNotifService = inject(EventNotificationsService);
  private _envService = inject(EnvironmentService);

  private _defaultCloseDelay = this._envService.env.alertsConfig.closeDelay;

  /**
   * Retorna la señal que informa de nuevas alertas.
   */
  get onAlerts(): Signal<AlertEvent | null> {
    return computed<AlertEvent | null>(() => {
      const event = this._envNotifService
        .listenNotifsByCode<AlertEvent>(EventNotificationCode.ALERT);
      return event();
    })
  }

  /**
   * Shortcut para notificar una nueva alerta de
   * tipo success.
   */
  success(message: string, config?: AlertEventConfig): void {
    this._notify(message, 'success', config);
  }

  /**
   * Shortcut para notificar una nueva alerta de
   * tipo warning.
   */
  warn(message: string, config?: AlertEventConfig): void {
    this._notify(message, 'warning', config);
  }

  /**
   * Shortcut para notificar una nueva alerta de
   * tipo info.
   */
  info(message: string, config?: AlertEventConfig): void {
    this._notify(message, 'info', config);
  }

  /**
   * Shortcut para notificar una nueva alerta de
   * tipo error.
   */
  error(message: string, config?: AlertEventConfig): void {
    this._notify(message, 'error', config);
  }

  private _notify(
    message: string,
    type: AlertType,
    config?: AlertEventConfig): void {
    const defaultConfig: AlertEventConfig = {
      closeDelay: this._defaultCloseDelay,
    };
    this._envNotifService.notify<AlertEvent>({
      code: EventNotificationCode.ALERT,
      meta: {
        message,
        type,
        config: config ?
          { ...defaultConfig, ...config } : defaultConfig,
      },
    });
  }

}
