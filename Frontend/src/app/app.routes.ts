import { Routes } from '@angular/router';
import { PropietarioComponent } from './propietario/propietario/propietario.component';
import { FormPropietarioComponent } from './propietario/form-propietario/form-propietario.component';
import { LocalComponent } from './locales/pages/altalocal/local.component';
import { LocalesComponent } from './locales/pages/locales/locales.component';
import { LocaleshabilitadosComponent } from './locales/pages/localeshabilitados/localeshabilitados.component';
import { LocaleditComponent } from './locales/pages/localedit/localedit.component';

export const routes: Routes = [

{ path: 'propietario', component: PropietarioComponent},
{ path: 'form-propietario/:id', component: FormPropietarioComponent},
{ path: 'local', component: LocalComponent},
{ path: 'locales', component: LocalesComponent},
{ path: 'locales/habilitados', component: LocaleshabilitadosComponent},
{ path: 'locales/edit/:id', component: LocaleditComponent}
];
