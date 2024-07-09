import { Routes } from '@angular/router';
import { PropietarioComponent } from './propietario/propietario/propietario.component';
import { FormPropietarioComponent } from './propietario/form-propietario/form-propietario.component';
import { ListadoCuotasComponent } from './cuota/pages/listado-cuotas/listado-cuotas.component';

export const routes: Routes = [

{ path: 'propietario', component: PropietarioComponent},
{ path: 'form-propietario/:id', component: FormPropietarioComponent},
{ path: "cuotas", component: ListadoCuotasComponent },
];
