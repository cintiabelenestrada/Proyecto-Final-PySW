import { Component } from '@angular/core';
import { NovedadesService } from '../../service/novedades.service';
import { AuthService } from '../../../usuarios/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-novedadesusuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './novedadesusuario.component.html',
  styleUrl: './novedadesusuario.component.css'
})
export class NovedadesUsuarioComponent {
  novedades: Array<any> = []
  perfil!: any;
  constructor(private novedadesService: NovedadesService, private authService: AuthService) {
    this.perfil = authService.currentUser()?.perfil || '';
  }


  ngOnInit(): void {
    this.obtenerNovedadesPorUsuario();
  }
  obtenerNovedadesPorUsuario() {
    const currentUser = this.authService.currentUser();
    var id;
    if (currentUser && currentUser._id) {
      id = currentUser._id;
    if (this.perfil != 'admin' && this.perfil != 'dueño' ) {
      
        this.novedadesService.getNovedadesPorUsuario(id).subscribe(
          (data: any) => {
            this.novedades = data;
            console.log(this.novedades);
          }, (error: any) => {
            console.log(error);
          });
      
    }
    else {
      this.novedadesService.getNovedades().subscribe(
        (data: any) => {
          this.novedades = data;
        },
        (error: any) => {
          console.log(error);
        }
      )
    }
  }
  }

  eliminarNovedad(id: string) {
    this.novedadesService.deleteNovedad(id).subscribe(
      (data: any) => {
        console.log("Novedad eliminada correctamente");
        this.obtenerNovedadesPorUsuario();
      },
      (error: any) => {
        console.log(error);
      }
    )
  }
}
