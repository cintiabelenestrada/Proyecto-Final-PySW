import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../services/local.service';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Locales } from '../../interfaces/locales.interface';

@Component({
  selector: 'app-localedit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './localedit.component.html',
  styleUrls: ['./localedit.component.css','../../../app.component.css']
})
export class LocaleditComponent implements OnInit {
  accion: string = 'add';
  nuevos!: any;
  id: any;
  datoslocales!: Locales;

  constructor(
    private fb: FormBuilder,
    private localService: LocalService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    // this.datoslocales = new LocalInterface();
    // this.datoslocales.nombre='local Editado';
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      if (params['id'] == '') {
        this.accion = 'add';
      } else {
        this.accion = 'edit';
        this.LocalById(params['id']);
        this.id = params['id'];
      }
    });

    this.localesForm.valueChanges.subscribe((nuevosValores) => {
      this.nuevos = nuevosValores;
      // console.log('Nuevos valores:', nuevosValores);
    });
  }

  localesForm = this.fb.group({
    nombre: ["", [Validators.required]],
    direccion: ["", [Validators.required]],
    descripcion: ["", [Validators.required]],
    superficie: [0, [Validators.required, Validators.min(1)]],
    habilitado: [false, [Validators.required]],
    customers: [0, [Validators.required, Validators.min(1)]],
    alquilado: [false, [Validators.required]],
    pathimagen: ["", [Validators.required]],
  });

  guardarAltaLocal() {
    const local: Partial<Locales> = {
      nombre: this.localesForm.controls.nombre.value!,
      direccion: this.localesForm.controls.direccion.value!,
      descripcion: this.localesForm.controls.descripcion.value!,
      superficie: this.localesForm.controls.superficie.value!,
      habilitado: this.localesForm.controls.habilitado.value!,
      customers: this.localesForm.controls.customers.value!,
      alquilado: this.localesForm.controls.alquilado.value!,
      pathimagen: this.localesForm.controls.pathimagen.value!,
    };

    this.localService.postCreateLocal(local)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/dashboard/locales');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  actualizarLocal() {
    this.localService.putUpdateLocal(this.id, this.nuevos).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigateByUrl('/dashboard/locales');
        this.toastr.success(
          'Actualizo el local ' +
          this.localesForm.controls.nombre.getRawValue(),
          'Exitoso'
        );
        return this.router.navigate(['/dashboard/locales']);
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(
          'No se pudo actualizar el locales ' +
          this.localesForm.controls.nombre.getRawValue(),
          'Error'
        );
      },
    });
  }
/*
  eliminarLocal(){
    this.localService.deleteLocal(this.id).subscribe({
      next: (response) => {
        console.log(response);
        this.toastr.success(
          'Elimino el local'+ this.localesForm.controls.nombre.getRawValue(),
          'Exitoso'
        );
        return this.router.navigate(['/dashboard/locales']);
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(
          'No se pudo eliminar el local'+ this.localesForm.controls.nombre.getRawValue(),
          'Error'
        );
      },
    });
  } */

  LocalById(id: string): void {
    this.localService.getObtenerLocalById(id).subscribe({
      next: (response) => {
        // console.log(response);
        this.localesForm.patchValue(response);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // LocalById(localedit: any): void {
  //   const id = localedit._id;
  //   this.localService.getObtenerLocalById(this.id).subscribe(
  //     (data:any) => {
  //       this.localesForm.patchValue(data);
  //       console.log('data ',JSON.stringify(data));
  //     },
  //     (error:any) => {
  //       console.log(error);
  //     }
  //   )
  // }
  // EditarLocal(localedit: any): void {
  //   const id = localedit._id;
  //   this.localService.putUpdateLocal(id, this.datoslocales).subscribe(
  //     (data: any) => {
  //       this.datoslocales = data;
  //       console.log('datoslocales data:', JSON.stringify(this.datoslocales));
  //     },
  //     (error: any) => {
  //       console.log(error);
  //     }
  //   );
  // }
}
