import { Component } from '@angular/core';
import { LocalService } from '../../../locales/services/local.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';

interface Local {
  nombre: string;
  direccion: string;
  descripcion: string;
  superficie: string;
  habilitado: boolean;
  customers: number;
  pathimagen: string;
  alquilado: boolean;
}

@Component({
  selector: 'app-locales-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './locales-page.component.html',
  styleUrls: [
    './locales-page.component.css',
    '../../../shared/styles/custom-colors.css',
  ],
})
export class LocalesPageComponent {
  locales: Local[] = [];

  constructor(private localesService: LocalService) {}

  ngOnInit(): void {
    this.obtenerLocales();
  }

  obtenerLocales() {
    this.localesService.getAllLocales().subscribe((data) => {
      this.locales = data;
    });
  }
}
