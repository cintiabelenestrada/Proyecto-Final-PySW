import { Component } from '@angular/core';
import { AuthService } from '../../usuarios/services/auth.service';
import { UsuarioGet } from '../../usuarios/interfaces/usuario-get.interface';

@Component({
  selector: 'app-dashboard-default-page',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-default-page.component.html',
  styleUrls: [
    './dashboard-default-page.component.css',
    '../../shared/styles/custom-colors.css',
  ],
})
export class DashboardDefaultPageComponent {
  usuario: UsuarioGet;
  constructor(private authService: AuthService) {
    this.usuario = this.authService.currentUser()!;
  }
}
