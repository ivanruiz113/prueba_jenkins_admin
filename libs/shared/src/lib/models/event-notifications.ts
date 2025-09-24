export enum EventNotificationCode {
  UNAUTHORIZED = 'UNAUTHORIZED',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  NO_CONNECTION = 'NO_CONNECTION',
  ALERT = 'ALERT',
  // MODAL_OPEN = 'MODAL_OPEN',
  // MODAL_CLOSE = 'MODAL_CLOSE',
  // TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR',
  // SIDEBAR_ACTION = 'SIDEBAR_ACTION',
  // TOGGLE_SUBHEADER = 'TOGGLE_SUBHEADER',
  // MARKET_TOGGLE_WATCHLIST_SECTION = 'MARKET_TOGGLE_WATCHLIST_SECTION',
  // MARKET_FILTERS_CHANGE = 'MARKET_FILTERS_CHANGE',
}

export interface EventNotification<T> {
  /** Identificador de la notificacion. */
  code: EventNotificationCode;
  /** Data adicional para agregar. */
  meta?: T;
}
