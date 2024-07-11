import { Component } from '@angular/core';
import { NovedadesService } from '../../service/novedades.service';
import { CommonModule } from '@angular/common';
import { NovedadesInterface } from '../../interfaces/novedades.interface';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../usuarios/services/auth.service';

@Component({
  selector: 'app-novedades',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './novedades.component.html',
  styleUrl: './novedades.component.css'
})
export class NovedadesComponent {
  novedades: Array<any> = [];
  novedad: NovedadesInterface = {
    Usuario: '',
    Texto: '',
    titulo: '',
    imagen: '',
    estado: false
  };


  constructor(private novedadesService: NovedadesService, private router: Router) {

  }

  ngOnInit() {
    this.obtenerNovedadesPublicadas()
  }

  obtenerNovedadesPublicadas() {
    this.novedadesService.getAllNovedades().subscribe(
      (data: any) => {
        this.novedades = data;
      },
      (error: any) => {
        console.log(error);
      }
    )

  }

  seleccionarNovedad(novedad: NovedadesInterface) {
    this.novedad = novedad;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log(novedad.Usuario);
  }


  agregarNovedades() {
    this.router.navigate(['/dashboard/novedad']);
  }

  verMisNovedades() {
    this.router.navigate(['/dashboard/novedades/usuario']);
  }
}
