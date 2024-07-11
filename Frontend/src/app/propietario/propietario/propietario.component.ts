import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PropietarioService } from '../service/propietario.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-propietario',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './propietario.component.html',
  styleUrl: './propietario.component.css',
})
export class PropietarioComponent implements OnInit {
  auxiliar!: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propietarioService: PropietarioService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getPropietarios();
  }

  crearPropietario(): void {
    this.router.navigate(['/dashboard/form-propietario', '']);
  }
  getPropietarios() {
    this.propietarioService.getPropietarios().subscribe({
      next: (response) => {
        this.auxiliar = response;
        console.log(this.auxiliar);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editarPropietario(id: string): void {
    this.router.navigate(['/dashboard/form-propietario', id]);
  }

  eliminarPropietario(id: string): void {
    this.propietarioService.deletePropietario(id).subscribe({
      next: (response) => {
        this.getPropietarios();
        this.toastr.warning('Propietario Eliminado con Exito', 'Información');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
