import { Component, OnInit } from '@angular/core';
import { PagoGet } from '../../interfaces/pago-get';
import { PagoService } from '../../services/pago.service';
import { CommonModule } from '@angular/common';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { ChartData, ChartOptions } from 'chart.js';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-listado-pagos',
  standalone: true,
  imports: [CommonModule, ChartjsModule],
  templateUrl: './listado-pagos.component.html',
  styleUrls: ['./listado-pagos.component.css']
})
export class ListadoPagosComponent implements OnInit {
  pagos: PagoGet[] = [];
  status: "loading" | "ok" | "error" = "loading";
  chartData: ChartData = {
    labels: [],
    datasets: [{
      label: 'Ingresos por día',
      data: [],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      fill: false, // Para no llenar el área debajo de la línea
      tension: 0.1 // Para suavizar la línea
    }]
  };
  chartOptions: ChartOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  constructor(
    private pagoService: PagoService,
    private cdr: ChangeDetectorRef
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
          this.prepararDatosGrafico();
        }, 1000); 
      },
      error: (error) => {
        setTimeout(() => { 
          this.status = "error";
        }, 1000); 
      }
    });
  }

  prepararDatosGrafico() {
    const ingresosPorDia: { [fecha: string]: number } = {};

    // Ordenar los pagos por fecha de actualización
    this.pagos.sort((a, b) => new Date(a.fechaActualizacion).getTime() - new Date(b.fechaActualizacion).getTime());

    this.pagos.forEach(pago => {
      if (pago.status == 'success'){
        const fechaFormateada = this.formatearFecha(new Date(pago.fechaActualizacion));
      if (ingresosPorDia[fechaFormateada]) {
        ingresosPorDia[fechaFormateada] += pago.montoPago;
      } else {
        ingresosPorDia[fechaFormateada] = pago.montoPago;
      }
      }
      
    });

    const labels = Object.keys(ingresosPorDia);
    const data = Object.values(ingresosPorDia);

    this.chartData = {
      labels: labels,
      datasets: [{
        label: 'Ingresos por día',
        data: data,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        fill: false,
        tension: 0.1
      }]
    };

    this.cdr.detectChanges(); // Forzar la detección de cambios
  }

  formatearFecha(fecha: Date): string {
    let dia = fecha.getDate().toString().padStart(2, '0');
    let mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // getMonth() devuelve un índice basado en cero, por lo tanto, se suma 1.
    let año = fecha.getFullYear().toString().substr(-2); // Obtiene los últimos 2 dígitos del año
  
    return `${dia}/${mes}/${año}`;
  }
}
