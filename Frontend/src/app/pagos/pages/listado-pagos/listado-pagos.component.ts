import { Component } from '@angular/core';
import { PagoGet } from '../../interfaces/pago-get';
import { PagoService } from '../../services/pago.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listado-pagos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado-pagos.component.html',
  styleUrl: './listado-pagos.component.css'
})
export class ListadoPagosComponent {
  pagos: PagoGet[] = [];
  status: "loading" | "ok" | "error" = "loading";  

  constructor(
              private pagoService: PagoService
              ) { }

  ngOnInit() {
    this.obtenerPagos();
  }

  obtenerPagos() {
    this.pagoService.getPagos().subscribe({
      next: (pagos) => {
        setTimeout(() => { 
          this.pagos = pagos;
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
}
