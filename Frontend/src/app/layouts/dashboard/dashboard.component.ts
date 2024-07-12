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
    {
      name: 'ALQUILERES',
      title: true,
      class: this.showForRoles(['administrativo', 'dueño']),
    },
    {
      name: 'Registrar',
      url: '/dashboard/formulario-alquiler',
      iconComponent: { name: 'cil-user-plus' },
      class: this.showForRoles(['administrativo', 'dueño']),
    },
    {
      name: 'Listado',
      url: '/dashboard/listado-alquiler',
      iconComponent: { name: 'cil-list-rich' },
      class: this.showForRoles(['administrativo', 'dueño']),
    },
    {
      name: 'CUOTAS',
      title: true,
    },
    {
      name: 'Cuotas',
      url: '/dashboard/cuotas',
      iconComponent: { name: 'cilSpreadsheet' },
      class: this.showForRoles(['administrativo', 'dueño']),
    },
    {
      name: 'Mis Cuotas',
      url: '/dashboard/cuotas',
      iconComponent: { name: 'cilSpreadsheet' },
      class: this.showForRoles(['inquilino']),
    },
    {
      name: 'PAGOS',
      title: true,
    },
    {
      name: 'Mis Pagos',
      url: '/dashboard/pagos',
      iconComponent: { name: 'cil-cash' },
      class: this.showForRoles(['inquilino']),
    },
    {
      name: 'Pagos',
      url: '/dashboard/pagos',
      iconComponent: { name: 'cil-cash' },
      class: this.showForRoles(['administrativo', 'dueño']),
    },
    {name: 'NOVEDADES',
      title: true,
    },
    {
      name: 'Ver novedades',
      url: '/dashboard/novedades',
      iconComponent: { name: 'cil-newspaper' },
      
    }
  ];

  showForRoles(roles: string[]): string {
    const authService = inject(AuthService);
    if (!roles.includes(authService.currentUser()!.perfil)) return 'd-none';

    return '';
  }
}
