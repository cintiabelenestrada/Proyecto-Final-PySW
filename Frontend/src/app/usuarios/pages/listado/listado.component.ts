import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuarioGet } from '../../interfaces/usuario-get.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css',
})
export class ListadoComponent {
  usuarios: UsuarioGet[] = [];

  constructor(
    private usuariosService: UsuariosService,
    private toastService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.usuariosService.get().subscribe({
      next: (usuarios: UsuarioGet[]) => {
        this.usuarios = usuarios;
      },
      error: () => {
        this.toastService.error('Error al cargar los usuarios');
      },
    });
  }

  eliminarUsuario(id: string): void {
    this.usuariosService.delete(id).subscribe({
      next: () => {
        this.toastService.success('Usuario eliminado correctamente');
        this.obtenerUsuarios();
      },
      error: () => {
        this.toastService.error('Error al eliminar el usuario');
      },
    });
  }

  editarUsuario(id: string): void {
    // TODO implementar redireccionamiento
    this.router.navigate(['/dashboard/editar', id]);
  }
}
