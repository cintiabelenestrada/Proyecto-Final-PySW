import { Routes } from '@angular/router';
import { LoginComponent } from './usuarios/pages/login/login.component';
import { RegisterComponent } from './usuarios/pages/register/register.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { ListadoComponent } from './usuarios/pages/listado/listado.component';
import { isAuthenticatedGuard } from './shared/guards/is-authenticated.guard';
import { hasRoleGuard } from './shared/guards/has-role.guard';
import { DashboardDefaultPageComponent } from './layouts/dashboard-default-page/dashboard-default-page.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Inicio de sesión | Piedra Inmobiliaria',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [isAuthenticatedGuard],
    children: [
      {
        path: 'home',
        component: DashboardDefaultPageComponent,
        title: 'Inicio | Piedra Inmobiliaria',
      },
      {
        path: 'usuarios/registrar',
        component: RegisterComponent,
        canActivate: [hasRoleGuard(['administrativo', 'dueño'])],
        title: 'Registrar usuario | Piedra Inmobiliaria',
      },
      {
        path: 'usuarios/editar/:id',
        component: RegisterComponent,
        canActivate: [hasRoleGuard(['administrativo', 'dueño'])],
        title: 'Editar usuario | Piedra Inmobiliaria',
      },
      {
        path: 'usuarios/lista',
        component: ListadoComponent,
        canActivate: [hasRoleGuard(['administrativo', 'dueño'])],
        title: 'Listado de usuarios | Piedra Inmobiliaria',
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
