import { Component } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Locales } from '../../interfaces/locales.interface';

@Component({
  selector: 'app-locales',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './locales.component.html',
  styleUrl: './locales.component.css'
})
export class LocalesComponent {
  datoslocales!: Locales[];

  constructor(private route: ActivatedRoute, private router: Router,
    private localService: LocalService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.MostrarLocales();
  }

  MostrarLocales() {
    this.localService.getAllLocales().subscribe({
      next: (data: any) => {
        this.datoslocales = data;
        console.log('data ', JSON.stringify(data));
      },
      error: (error: any) => {
        console.log(error);
      }
    });

  }
  MostrarLocalesHabilitados() {
    this.localService.getObtenerLocalesHabilitados().subscribe({
      next: (data: any) => {
        this.datoslocales = data;
        console.log('data ', JSON.stringify(this.datoslocales));
      },
      error: (error: any) => {
        console.log(error);
      }
    });

  }
  MostrarLocalesInHabilitados() {
    this.localService.getObtenerLocalesInhabilitados().subscribe({
      next: (data: any) => {
        this.datoslocales = data;       
        console.log('data ', JSON.stringify(this.datoslocales));;
      },
      error: (error: any) => {
        console.log(error);
      }
    });

  }
  EliminarLocal(id: string) {
    this.localService.deleteLocal(id).subscribe({
      next: (data: any) => {
        this.datoslocales = data;       
        console.log('data ', JSON.stringify(this.datoslocales));
        this.toastr.info("Local eliminado  correctamente","Información");
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error("Hubo un error al eliminar el local","Error");
      }
    });

  }

  capturarInfoLocal(localedit: any) {
    console.log(localedit);
  }
  crearLocal(localedit: any): void {
    const id = localedit._id;
    console.log(id);
    this.router.navigate(['/dashboard/locales/edit/', localedit]);
  }
  editarLocal(localedit: any): void {
    const id = localedit._id;
    console.log(id);
    this.router.navigate(['/dashboard/locales/edit/', id]);
  }

  publicarEnFaceebook(id: string) {
    this.localService.createPublishToFacebook(id).subscribe({
      next: (response) => {
        console.log(response);
        this.toastr.success("Se realizó la Publicacion correctamente", "Exito");
      },
      error: (error) => {
        console.log(error);
        this.toastr.error("Hubo un error al realizar la Publicación", "Error");
      }
    })
  }

  
}