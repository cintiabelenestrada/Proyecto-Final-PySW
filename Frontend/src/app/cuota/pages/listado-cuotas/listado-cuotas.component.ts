import { Component } from '@angular/core';
import { CuotaService } from '../../services/cuota.service';
import { CuotaGet } from '../../interfaces/cuota-get';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-cuotas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado-cuotas.component.html',
  styleUrl: './listado-cuotas.component.css'
})
export class ListadoCuotasComponent {
  listadoCuotas! : CuotaGet[] ;
  status: "loading" | "ok" | "error" = "loading";  
  rol: string = 'admin';


  constructor(private cuotaService: CuotaService,
              private router: Router
            ) { }

  ngOnInit() {
    this.obtenerCuotas();
  }

  obtenerCuotas() {
    this.cuotaService.getCuotas().subscribe({
      next: (cuotas) => {
        setTimeout(() => { 
          this.listadoCuotas = cuotas;
          this.status = "ok";
        }, 1000); 
      },
      error: (error) => {
        setTimeout(() => { 
          this.status = "error";
        }, 1000); 
      }
    });
  }

  detallesCuota(id: string) {
    this.router.navigate([`/cuotas/${id}`]);
  }

}
