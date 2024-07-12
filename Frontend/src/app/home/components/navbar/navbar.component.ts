import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'home-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: [
    './navbar.component.css',
    '../../../shared/styles/custom-colors.css',
  ],
})
export class NavbarComponent {
  menuItems = [
    { label: 'Home', path: '/home' },
    { label: 'Locales disponibles', path: '/lista-de-locales' },
  ];
}
