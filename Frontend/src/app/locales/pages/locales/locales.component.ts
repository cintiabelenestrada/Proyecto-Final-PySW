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
  capturarInfoLocal(localedit: any) {
    console.log(localedit);
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