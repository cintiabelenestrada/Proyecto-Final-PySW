import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface MenuItem {
  label: string;
  link?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Usuarios',
      children: [
        {
          label: 'Agregar',
          link: '/dashboard/register',
        },
        {
          label: 'Listar',
          link: '/dashboard/lista',
        },
        {
          label: 'Editar',
          link: '/dashboard/edit',
        },
      ],
    },
    {
      label: 'Productos',
      children: [
        {
          label: 'Agregar',
          link: '/dashboard/add',
        },
        {
          label: 'Listar',
          link: '/dashboard/list',
        },
        {
          label: 'Editar',
          link: '/dashboard/edit',
        },
      ],
    },
  ];
}
