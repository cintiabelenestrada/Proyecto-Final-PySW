import { Component } from '@angular/core';
import { CuotaService } from '../../services/cuota.service';
import { CuotaGet } from '../../interfaces/cuota-get';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../usuarios/services/auth.service';
import { UsuarioGet } from '../../../usuarios/interfaces/usuario-get.interface';

@Component({
  selector: 'app-listado-cuotas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado-cuotas.component.html',
  styleUrls: ['./listado-cuotas.component.css', '../../../app.component.css']
})
export class ListadoCuotasComponent {
  listadoCuotas! : CuotaGet[] ;
  status: "loading" | "ok" | "error" = "loading";  
  usuario!: UsuarioGet;


  constructor(private cuotaService: CuotaService,
              private router: Router,
              private authService: AuthService
            ) { }

  ngOnInit() {
    this.usuario = this.authService.currentUser()!;
    if (this.usuario.perfil === 'administrativo' || this.usuario.perfil === 'dueño') {
      this.obtenerCuotas();
    } else {
      this.obtenerCuotasPorUsuario();
    }
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
    this.router.navigate([`/dashboard/cuotas/${id}`]);
  }

  obtenerCuotasPorUsuario() {
    this.cuotaService.obtenerCuotasPorUsuario(this.usuario._id!).subscribe({
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

}
