import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="w-full h-full overflow-hidden">
      <router-outlet />
    </div>
  `,
})
export class App implements OnInit {

  private _router = inject(Router);

  ngOnInit(): void {
    if (!localStorage.getItem('Data')) {
      localStorage.setItem('forwardingUrl', this._router.url);
      window.location.href = 'http://localhost:4200/admin/v1/';
    } else {
      if (localStorage.getItem('Data')) {
        this._router
          .navigateByUrl(localStorage.getItem('forwardingUrl') || '/');
      }
      console.log('User is logged in');
    }
  }

  doLogout(): void {
    if (localStorage.getItem('Data')) {
      localStorage.removeItem('Data');
    }
    window.location.href = 'http://localhost:4200/admin/v1/';
  }

}
