import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DateTime } from 'luxon';
import { VERSION_INFO } from '@balanz-backoffice/shared';

@Component({
  selector: 'app-unlogged-layout',
  templateUrl: 'unlogged-layout.html',
  styleUrl: 'unlogged-layout.scss',
  standalone: true,
  imports: [RouterOutlet]
})
export class UnloggedLayoutComponent {
  protected version = VERSION_INFO;
  protected currentYear = DateTime.now().year;
}
