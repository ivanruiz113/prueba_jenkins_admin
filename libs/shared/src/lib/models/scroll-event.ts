import { ElementRef } from '@angular/core';

/** Posibles direcciones de scroll. */
export type ScrollDirection = 'mixed' | 'vertical' | 'horizontal' | null;

/** Informacion del evento de scroll. */
export interface ScrollEvent {
  /** Identificador del elemento. */
  id: string;
  /** True en caso de haber llegado arriba de todo. */
  onTop: boolean;
  /** True en caso de haber llegado abajo de todo. */
  onBottom: boolean;
  /** True en caso de haber llegado a la izquierda del todo. */
  onLeft: boolean;
  /** True en caso de haber llegado a la derecha del todo. */
  onRight: boolean;
  /** Elemento desde donde se implementó la directiva. */
  element: ElementRef<HTMLElement>;
  /** Direccion hacia donde se mueve el scroll. */
  direction: ScrollDirection;
}

/** Identificador/es que debe escuchar la directiva. */
export type scrollableId = string | string[] | undefined;
