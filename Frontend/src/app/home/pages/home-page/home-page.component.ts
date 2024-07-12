import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocalService } from '../../../locales/services/local.service';
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
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule, CommonModule, NavbarComponent],
  templateUrl: './home-page.component.html',
  styleUrls: [
    './home-page.component.css',
    '../../../shared/styles/custom-colors.css',
  ],
})
export class HomePageComponent implements OnInit {
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
