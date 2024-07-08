import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./layouts/nav/nav.component";
import { PropietarioComponent } from './propietario/propietario/propietario.component';
import { FormPropietarioComponent } from './propietario/form-propietario/form-propietario.component';
import { LocalComponent } from './locales/pages/local/local.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NavComponent,PropietarioComponent,FormPropietarioComponent, LocalComponent]
})
export class AppComponent {
  title = 'Frontend';
}
