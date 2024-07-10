import { Component } from '@angular/core';
import { CuotaGet } from '../../interfaces/cuota-get';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CuotaService } from '../../services/cuota.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PagoGet } from '../../../pagos/interfaces/pago-get';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cuota',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cuota.component.html',
  styleUrl: './cuota.component.css'
})
export class CuotaComponent {
  cuota! : CuotaGet ;
  pagos!: PagoGet[];
  statusCuota: "loading" | "ok" | "error" = "loading"; 
  statusPagos: "loading" | "ok" | "error" = "loading"; 

  constructor(private activatedRoute: ActivatedRoute,
              private cuotaService: CuotaService,
              private toastr: ToastrService,
              private router: Router
              ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id, status }) => {
      this.obtenerCuota(id);
      this.obtenerPagosPorCuotaId(id);
      if (status === 'success') {
        this.toastr.success('Pago realizado con éxito');
      }
    });
    
  }

  obtenerCuota(id: string) {
    this.cuotaService.getCuotaById(id).subscribe({
      next: (cuota) => {
        this.cuota = cuota;
        this.statusCuota = "ok";
      },
      error: (error) => {
        console.error(error);
        this.statusCuota = "error";
      }
    });
  }

  obtenerPagosPorCuotaId(id: string) {
    this.cuotaService.obtenerPagosPorCuotaId(id).subscribe({
      next: (pagos) => {
        this.pagos = pagos;
        console.log (pagos);
        this.statusPagos = "ok";
      },
      error: (error) => {
        console.error(error);
        this.statusPagos = "error";
      }
    });
  }

  pagarCuota(id:string){
    this.router.navigate([`/cuotas/${id}/pago`]);
  }

  
}
