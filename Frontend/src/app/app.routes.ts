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
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [isAuthenticatedGuard],
    children: [
      {
        path: 'home',
        component: DashboardDefaultPageComponent,
      },
      {
        path: 'usuarios/registrar',
        component: RegisterComponent,
        canActivate: [hasRoleGuard(['administrativo', 'dueño'])],
      },
      {
        path: 'usuarios/editar/:id',
        component: RegisterComponent,
        canActivate: [hasRoleGuard(['administrativo', 'dueño'])],
      },
      {
        path: 'usuarios/lista',
        component: ListadoComponent,
        canActivate: [hasRoleGuard(['administrativo', 'dueño'])],
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
