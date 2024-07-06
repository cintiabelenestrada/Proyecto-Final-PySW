import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropietarioService } from '../service/propietario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-propietario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './form-propietario.component.html',
  styleUrl: './form-propietario.component.css'
})
export class FormPropietarioComponent implements OnInit {

  accion: string = 'add';
  nuevos!: any;
  id: any;

  constructor(private fb: FormBuilder, private propietarioService: PropietarioService,
    private router: Router, private activateRoute: ActivatedRoute,
    private toastr: ToastrService) { }
  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      if (params['id'] == "") {
        this.accion = "add";
      } else {
        this.accion = "edit";
        this.getPropietarioById(params['id']);
        this.id = params['id'];
      }
    });

    // Suscripcion a los cambios en el formGroup para tomar los valores actualizados
    this.propietarioForm.valueChanges.subscribe((nuevosValores) => {
      this.nuevos = nuevosValores;
      console.log('Nuevos valores:', nuevosValores);
    });

  }


  propietarioForm = this.fb.group({
    nombre: ["", [Validators.required]],
    apellido: ["", [Validators.required]],
    dni: ["", [Validators.required]],
    email: ["", [Validators.required]],
    telefono: ["", [Validators.required]],
  });

  guardarPropietario() {
    this.propietarioService.createPropietario(this.propietarioForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigateByUrl("/propietario");
      },
      error: err => {
        console.log(err);
      }
    })
  }

  actualizarPropietario() {

    this.propietarioService.updatePropietario(this.id, this.nuevos).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigateByUrl("/propietario");
        this.toastr.success("Actualizo el propietario " + this.propietarioForm.controls.nombre.getRawValue(),"Exitoso");
      },
      error: err => {
        console.log(err);
        this.toastr.error("No se pudo actualizar el propietario " + this.propietarioForm.controls.nombre.getRawValue(),"Error");
      }
    });
  }

  getPropietarioById(id: string) {
    this.propietarioService.getPropietarioById(id).subscribe({
      next: (response) => {
        // console.log(response); 
        this.propietarioForm.patchValue(response);
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
