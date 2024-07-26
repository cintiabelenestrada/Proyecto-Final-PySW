import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NovedadesInterface } from '../../interfaces/novedades.interface';
import { NovedadesService } from '../../service/novedades.service';
import { AuthService } from '../../../usuarios/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-novedades',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-novedades.component.html',
  styleUrls: ['./form-novedades.component.css']
})
export class FormNovedadesComponent {
  novedad: NovedadesInterface = {
    Usuario: '',
    Texto: '',
    titulo: '',
    imagen: '',
    estado: false
  };
  files: { base64: string, safeurl: SafeUrl }[] = [];

  constructor(private sant: DomSanitizer, private novedadesService: NovedadesService, private authService: AuthService, private toastService: ToastrService) {}

  AltaNovedad() {
    const currentUser = this.authService.currentUser();
    if (currentUser && currentUser._id) {
      this.novedad.Usuario = currentUser._id;
      if(this.files[0] != null) {
        this.novedad.imagen = this.files[0].base64;
      }
      console.log(JSON.stringify(this.novedad))
      this.novedadesService.postCreateNovedad(this.novedad).subscribe(
        (data: any) => {
          this.novedad = data;
          console.log('novedad data:', JSON.stringify(this.novedad));
          this.files=[]
          this.toastService.success('Novedad creada con éxito');
        },
        (error: any) => {
          console.log(error);
          this.toastService.error('Error al crear la novedad');
        }
      );
    }
  }

  onSelectNewFile(event: any): void {
    this.files = [];
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        let base64 = reader.result as string;
        let safeurl: SafeUrl = this.sant.bypassSecurityTrustUrl(base64);
        this.files.push({ 'base64': base64, 'safeurl': safeurl });
      };
      reader.readAsDataURL(file);
    }
  }
}
