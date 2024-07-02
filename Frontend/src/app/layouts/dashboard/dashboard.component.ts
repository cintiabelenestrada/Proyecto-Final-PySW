import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
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
    },
    {
      name: 'Registrar',
      url: '/dashboard/registrar',
      iconComponent: { name: 'cil-user-plus' },
    },
    {
      name: 'Listado',
      url: '/dashboard/lista',
      iconComponent: { name: 'cil-list-rich' },
    },
    {
      title: true,
      name: 'LOCALES',
    },
    {
      name: 'Registrar',
      url: '/dashboard/usuarios',
      iconComponent: { name: 'cil-building' },
    },
    {
      name: 'Listado',
      url: '/dashboard/usuarios',
      iconComponent: { name: 'cil-list' },
    },
    {
      title: true,
      name: 'FINANCIACIÓN',
    },
    {
      name: 'Pagos',
      url: '/dashboard/usuarios',
      iconComponent: { name: 'cil-dollar' },
    },
    {
      name: 'Cuotas',
      url: '/dashboard/usuarios',
      iconComponent: { name: 'cil-chart-pie' },
    },
    {
      title: true,
      name: 'BLOG',
    },
    {
      name: 'Novedades',
      url: '/dashboard/usuarios',
      iconComponent: { name: 'cil-newspaper' },
    },
  ];
}
