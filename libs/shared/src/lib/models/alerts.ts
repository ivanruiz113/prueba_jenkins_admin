export type AlertType = 'success' | 'warning' | 'info' | 'error';

export interface AlertEventConfig {
  /** Propiedades para el alerta. */
  props?: any;
  /** Accion a realizar al clickear el alerta. */
  action?: () => void;
  /** Milisegundos que tomará el alerta hasta cerrarse. */
  closeDelay?: number;
  /** True si se desea cerrar al clickear. */
  closeOnClick?: boolean;
}

export interface AlertEvent {
  /** Mensaje del alerta. */
  message: string;
  /** Tipo del alerta. */
  type: AlertType;
  /** Configuracion (opcional) de la alerta. */
  config?: AlertEventConfig;
}
