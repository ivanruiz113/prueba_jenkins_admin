import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-people',
  templateUrl: 'people.html',
  imports: [ButtonModule,],
  standalone: true,
})
export class PeopleComponent { }
