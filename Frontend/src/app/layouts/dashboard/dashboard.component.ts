import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  INavData,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective,
} from '@coreui/angular';
import { NgScrollbar } from 'ngx-scrollbar';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { AuthService } from '../../usuarios/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    RouterLink,
    IconDirective,
    NgScrollbar,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    ShadowOnScrollDirective,
    ContainerComponent,
    RouterOutlet,
    DashboardHeaderComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  navItems: INavData[] = [
    {
      name: 'Inicio',
      url: '/dashboard/home',
      iconComponent: { name: 'cil-home' },
    },
    {
      name: 'Gráficos',
      url: '/dashboard/graficos',
      iconComponent: { name: 'cil-chart-line' },
      badge: {
        color: 'info',
        text: 'NEW',
      },
    },
    {
      title: true,
      name: 'USUARIOS',
      class: this.showForRoles(['administrativo', 'dueño']),
    },
    {
      name: 'Registrar',
      url: '/dashboard/usuarios/registrar',
      iconComponent: { name: 'cil-user-plus' },
      class: this.showForRoles(['administrativo', 'dueño']),
    },
    {
      name: 'Listado',
      url: '/dashboard/usuarios/lista',
      iconComponent: { name: 'cil-list-rich' },
      class: this.showForRoles(['administrativo', 'dueño']),
    },
    {
      name: 'PROPIETARIOS',
      title: true,
    },
    {
      name: 'Registrar',
      url: ['/dashboard/form-propietario', ''],
      iconComponent: { name: 'cil-user-plus' },
    },
    {
      name: 'Listado',
      url: '/dashboard/propietario',
      iconComponent: { name: 'cil-list-rich' },
    },
    {
      name: 'LOCALES',
      title: true,
    },
    {
      name: 'Listado',
      url: '/dashboard/locales',
      iconComponent: { name: 'cil-location-pin' },
    },
    {
      name: 'Registrar',
      url: '/dashboard/local',
      iconComponent: { name: 'cil-building' },
    },
  ];

  showForRoles(roles: string[]): string {
    const authService = inject(AuthService);
    if (!roles.includes(authService.currentUser()!.perfil)) return 'd-none';

    return '';
  }
}
