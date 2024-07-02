import { Routes } from '@angular/router';
import { LoginComponent } from './usuarios/pages/login/login.component';
import { RegisterComponent } from './usuarios/pages/register/register.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { ListadoComponent } from './usuarios/pages/listado/listado.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'registrar',
        component: RegisterComponent,
      },
      {
        path: 'registrar/:id',
        component: RegisterComponent,
      },
      {
        path: 'lista',
        component: ListadoComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
