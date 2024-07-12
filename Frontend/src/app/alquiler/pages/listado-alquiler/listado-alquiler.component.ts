import { Component } from '@angular/core';
import { AlquilerService } from '../../services/alquiler.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Alquiler } from '../../models/alquiler';

@Component({
  selector: 'app-listado-alquiler',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado-alquiler.component.html',
  styleUrl: './listado-alquiler.component.css'
})
export class ListadoAlquilerComponent {
  alquileres: Alquiler[] = [];
  mostrarActivos: boolean = true;

  constructor(
    private alquilerService: AlquilerService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAlquileresActivos();
  }

  getAlquileres():void {
    this.alquilerService.getAlquileres().subscribe(
      result => {
        this.alquileres = result;
        this.alquileres = result.map((element: any) => {
          let valquiler: Alquiler = new Alquiler();
          Object.assign(valquiler, element);
          return valquiler;
        });
        this.mostrarActivos = false;
      }
    )
  }

  getAlquileresActivos():void {
    this.alquilerService.getAlquileresActivos().subscribe(
      result => {
        this.alquileres = result.map((element: any) => {
          let valquiler: Alquiler = new Alquiler();
          Object.assign(valquiler, element);
          return valquiler;
        });
        this.mostrarActivos = true;
      }
    )
  }

  getAlquileresPorInquilino(inquilinoId: string):void {
    this.alquilerService.getAlquileresPorInquilino(inquilinoId).subscribe(
      result => {
        this.alquileres = result.map((element: any) => {
          let valquiler: Alquiler = new Alquiler();
          Object.assign(valquiler, element);
          return valquiler;
        });
        this.mostrarActivos = true;
      }
    )
  }

  registrarAlquiler() {
    this.router.navigate(['/dashboard/formulario-alquiler', '0']);
  }

  modificarAlquiler(alquilerId: string) {
    this.router.navigate(['/dashboard/formulario-alquiler', alquilerId]);
  }

  eliminarAlquiler(alquilerId: string): void {
    this.alquilerService.deleteAlquiler(alquilerId).subscribe(
      result => {
        if(result.status == 1) {
          this.mostrarActivos ? this.getAlquileresActivos() : this.getAlquileres();
          this.toastr.warning("Alquiler eliminado con éxito", "Información");
        }
      },
      error => {
        this.toastr.error('Error al eliminar el alquiler');
        console.log(error);
      }
    )
  }

  alternarAlquileres() {
    this.mostrarActivos = !this.mostrarActivos;
    this.mostrarActivos ? this.getAlquileresActivos() : this.getAlquileres();
  }
}
