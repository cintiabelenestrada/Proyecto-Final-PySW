import { Routes } from '@angular/router';
import { PropietarioComponent } from './propietario/propietario/propietario.component';
import { FormPropietarioComponent } from './propietario/form-propietario/form-propietario.component';
import { LocalComponent } from './locales/pages/local/local.component';

export const routes: Routes = [

{ path: 'propietario', component: PropietarioComponent},
{ path: 'form-propietario/:id', component: FormPropietarioComponent},
{ path: 'local', component: LocalComponent},
];
