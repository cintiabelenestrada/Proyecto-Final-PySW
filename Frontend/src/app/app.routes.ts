import { Routes } from '@angular/router';
import { LoginComponent } from './usuarios/pages/login/login.component';
import { RegisterComponent } from './usuarios/pages/register/register.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];
