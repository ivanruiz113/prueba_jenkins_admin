import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-user-alerts',
  templateUrl: 'user-alerts.html',
  standalone: true,
  imports: [ButtonModule,],
})
export class UserAlertsComponent { }
