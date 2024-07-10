import { Routes } from '@angular/router';
import { PropietarioComponent } from './propietario/propietario/propietario.component';
import { FormPropietarioComponent } from './propietario/form-propietario/form-propietario.component';
import { ListadoCuotasComponent } from './cuota/pages/listado-cuotas/listado-cuotas.component';
import { CuotaComponent } from './cuota/pages/cuota/cuota.component';
import { ListadoPagosComponent } from './pagos/pages/listado-pagos/listado-pagos.component';

export const routes: Routes = [

{ path: 'propietario', component: PropietarioComponent},
{ path: 'form-propietario/:id', component: FormPropietarioComponent},
{ path: "cuotas", component: ListadoCuotasComponent , title: 'Listado de Cuotas'},
{path: 'cuotas/:id', component: CuotaComponent, title: 'Detalle de una Cuota'},
{path: 'pagos', component: ListadoPagosComponent, title: 'Listado de Pagos'}
];
