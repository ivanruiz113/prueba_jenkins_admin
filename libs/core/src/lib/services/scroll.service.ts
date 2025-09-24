import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, filter } from 'rxjs';
import { ScrollEvent, scrollableId } from '@balanz-backoffice/shared';

@Injectable({ providedIn: 'root' })
export class ScrollService implements OnDestroy {

  private _scrolled = new Subject<ScrollEvent>();

  ngOnDestroy(): void {
    this._scrolled.unsubscribe();
  }

  /**
   * Suscribirse a eventos de scroll.
   * @param id Identificador del evento, pasar si se quiere
   * filtrar por id.
   */
  scrolled(id: scrollableId = undefined): Observable<ScrollEvent> {
    return this._scrolled.asObservable()
      .pipe(
        filter((event: ScrollEvent) => {
          return id === undefined
            || typeof id === 'string' && event.id === id
            || id.includes(event.id);
        }));
  }

  /**
   * Suscribirse a eventos de scroll solo cuando llega al top del elemento.
   * @param id Identificador del evento, pasar si se quiere filtrar por id.
   */
  scrolledToTop(id: scrollableId = undefined): Observable<ScrollEvent> {
    return this._scrolled.asObservable()
      .pipe(
        filter((event: ScrollEvent) => {
          return (event.direction === 'vertical')
            && event.onTop && (id === undefined
              || typeof id === 'string' && event.id === id
              || id.includes(event.id));
        })
      );
  }

  /**
   * Suscribirse a eventos de scroll solo cuando llega al bottom del elemento.
   * @param id Identificador del evento, pasar si se quiere filtrar por id.
   */
  scrolledToBottom(id: scrollableId = undefined): Observable<ScrollEvent> {
    return this._scrolled.asObservable()
      .pipe(
        filter((event: ScrollEvent) => {
          return (event.direction === 'vertical')
            && event.onBottom
            && (id === undefined
              || typeof id === 'string' && event.id === id
              || id.includes(event.id));
        })
      );
  }

  /**
   * Suscribirse a eventos de scroll solo cuando llega a la izquierda del todo
   * del elemento.
   * @param id Identificador del evento, pasar si se quiere filtrar por id.
   */
  scrolledToLeft(id: scrollableId = undefined): Observable<ScrollEvent> {
    return this._scrolled.asObservable()
      .pipe(
        filter((event: ScrollEvent) => {
          return (event.direction === 'horizontal')
            && event.onLeft
            && (id === undefined
              || typeof id === 'string' && event.id === id
              || id.includes(event.id));
        })
      );
  }

  /**
   * Suscribirse a eventos de scroll solo cuando llega a la derecha del todo
   * del elemento.
   * @param id Identificador del evento, pasar si se quiere filtrar por id.
   */
  scrolledToRight(id: scrollableId = undefined): Observable<ScrollEvent> {
    return this._scrolled.asObservable()
      .pipe(
        filter((event: ScrollEvent) => {
          return (event.direction === 'horizontal')
            && event.onRight
            && (id === undefined
              || typeof id === 'string' && event.id === id
              || id.includes(event.id));
        })
      );
  }

  /**
   * Funcion utilizada por la directiva scrollable para informar de
   * un scroll, no utilizar.
   */
  registerScroll(event: ScrollEvent): void {
    this._scrolled.next(event);
  }

}
