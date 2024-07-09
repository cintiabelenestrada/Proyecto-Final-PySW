import { Component } from '@angular/core';
import { CuotaService } from '../../services/cuota.service';
import { CuotaGet } from '../../interfaces/cuota-get';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listado-cuotas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado-cuotas.component.html',
  styleUrl: './listado-cuotas.component.css'
})
export class ListadoCuotasComponent {
  listadoCuotas! : CuotaGet[] ;

  constructor(private cuotaService: CuotaService) { }

  ngOnInit() {
    this.obtenerCuotas();
  }

  obtenerCuotas() {
    this.cuotaService.getCuotas().subscribe((cuotas) => {
      this.listadoCuotas = cuotas;
    });
  }
}
