import { computed, Injectable, Signal, signal } from '@angular/core';
import { Breakpoint, BREAKPOINTS } from '@balanz-backoffice/shared';

@Injectable({ providedIn: 'root' })
export class ResponsiveService {
  private _breakpoint = signal<Breakpoint>(this._getCurrentBreakpoint());

  constructor() {
    window.addEventListener('resize', this._onResize);
  }

  get breakpoint(): Signal<Breakpoint> {
    return this._breakpoint.asReadonly();
  }

  is(breakpoints: Breakpoint | Breakpoint[]): Signal<boolean> {
    return computed(() => typeof breakpoints === 'string' ?
      breakpoints === this._breakpoint() :
      breakpoints.includes(this._breakpoint())
    );
  }

  private _onResize = (): void => {
    this._breakpoint.set(this._getCurrentBreakpoint());
  };

  private _getCurrentBreakpoint(): Breakpoint {
    const width = window.innerWidth;
    if (width >= BREAKPOINTS.xl) return 'xl';
    if (width >= BREAKPOINTS.lg) return 'lg';
    if (width >= BREAKPOINTS.md) return 'md';
    if (width >= BREAKPOINTS.sm) return 'sm';
    if (width >= BREAKPOINTS.sm) return 'xs';
    return 'xxs';
  }
}
