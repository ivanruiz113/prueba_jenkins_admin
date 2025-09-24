import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '@balanz-backoffice/clients';
import { VERSION_INFO } from '@balanz-backoffice/shared';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { PopoverModule } from 'primeng/popover';
import { DateTime } from 'luxon';
import { filter } from 'rxjs';
import { NgClass } from '@angular/common';

interface DrawerOption {
  icon?: string;
  label: string;
  route?: string;
  href?: string;
  isV1?: boolean;
  children?: DrawerOption[];
}

@Component({
  selector: 'app-logged-layout',
  templateUrl: './logged-layout.html',
  styleUrl: './logged-layout.scss',
  standalone: true,
  imports: [
    RouterLink, RouterOutlet, ButtonModule, ChipModule,
    MenubarModule, BadgeModule, AvatarModule, MenuModule,
    AvatarModule, PopoverModule, ButtonModule,
    NgClass,
  ],
})
export class LoggedLayoutComponent implements OnInit {

  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);
  private _authService = inject(AuthService);

  protected currentUser: any = {}; // TODO: Cambiar a servicio de UserService
  protected currentUrl = signal<string>('/dashboard');
  protected drawerOptions: DrawerOption[] = [
    { icon: 'pi-th-large', label: 'Dashboard', route: '/dashboard' },
    { icon: 'pi-id-card', label: 'Authorizations', route: '/authorizations' },
    {
      icon: 'pi-microchip-ai', label: 'Monitoring', route: '/monitoring',
      children: [
        { icon: 'pi-microchip-ai', label: 'Personas', route: '/monitoring/people', },
        { icon: 'pi-microchip-ai', label: 'Alertas', route: '/monitoring/alerts', },
      ]
    },
    { icon: '', label: 'Debugger', route: '/debugger' },
    { icon: 'pi-calculator', label: 'Calculadora de bonos', href: 'http://localhost:4200/admin/v1/CalculadoraBonos', isV1: true },
  ];
  protected version = VERSION_INFO;
  protected currentYear = DateTime.now().year;

  ngOnInit(): void {
    const userData = localStorage.getItem('Data');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe((event: NavigationEnd) => {
        this.currentUrl.set(event.url === '/' ? '/dashboard' : event.url);
      });
  }

  doLogOut(): void {
    this._authService.logOut().subscribe(() => {
      this._router.navigate(['/']);
      // this._router.navigate(['/unlogged']);
    });
  }

}
