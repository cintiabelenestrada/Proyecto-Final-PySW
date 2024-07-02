import { NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import {
  AvatarComponent,
  BadgeComponent,
  BreadcrumbRouterComponent,
  ContainerComponent,
  DropdownComponent,
  DropdownDividerDirective,
  DropdownHeaderDirective,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  HeaderNavComponent,
  HeaderTogglerDirective,
  NavItemComponent,
  NavLinkDirective,
  ProgressBarDirective,
  ProgressComponent,
  SidebarToggleDirective,
  TextColorDirective,
  ThemeDirective,
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { AuthService } from '../../usuarios/services/auth.service';
import { UsuariosService } from '../../usuarios/services/usuarios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [
    ContainerComponent,
    HeaderTogglerDirective,
    SidebarToggleDirective,
    IconDirective,
    HeaderNavComponent,
    NavItemComponent,
    NavLinkDirective,
    RouterLink,
    RouterLinkActive,
    NgTemplateOutlet,
    BreadcrumbRouterComponent,
    ThemeDirective,
    DropdownComponent,
    DropdownToggleDirective,
    TextColorDirective,
    AvatarComponent,
    DropdownMenuDirective,
    DropdownHeaderDirective,
    DropdownItemDirective,
    BadgeComponent,
    DropdownDividerDirective,
    ProgressBarDirective,
    ProgressComponent,
    NgStyle,
  ],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.css',
})
export class DashboardHeaderComponent {
  @Input() sidebarId: string = 'sidebar1';

  constructor(
    private authService: AuthService,
    private router: Router,
    private usuarioService: UsuariosService,
    private toastService: ToastrService
  ) {}

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.toastService.success('Sesión cerrada correctamente');
  }

  eliminarCuenta(): void {
    this.usuarioService.delete(this.authService.currentUser()!._id!).subscribe({
      next: () => {
        this.authService.logout();
        this.router.navigate(['/login']);
        this.toastService.success('Cuenta eliminada correctamente');
      },
      error: (error) => {
        console.error(error);
        this.toastService.error('Error al eliminar la cuenta');
      },
    });
  }
}
