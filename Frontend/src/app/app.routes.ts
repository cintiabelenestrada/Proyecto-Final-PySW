import { Routes } from '@angular/router';
import { PropietarioComponent } from './propietario/propietario/propietario.component';
import { FormPropietarioComponent } from './propietario/form-propietario/form-propietario.component';
import { ListadoAlquilerComponent } from './alquiler/pages/listado-alquiler/listado-alquiler.component';
import { FormularioAlquilerComponent } from './alquiler/pages/formulario-alquiler/formulario-alquiler.component';

export const routes: Routes = [
    { 
        path: 'propietario',
        component: PropietarioComponent
    },
    { 
        path: 'form-propietario/:id',
        component: FormPropietarioComponent
    },
    { 
        path: 'listado-alquiler',
        title: 'Listado Alquiler',
        component: ListadoAlquilerComponent
    },
    { 
        path: 'formulario-alquiler',
        title: 'Formulario Alquiler',
        component: FormularioAlquilerComponent
    },
    { 
        path: 'formulario-alquiler/:id',
        title: 'Formulario Alquiler',
        component: FormularioAlquilerComponent
    }
];
