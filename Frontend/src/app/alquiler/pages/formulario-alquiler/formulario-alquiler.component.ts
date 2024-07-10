import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlquilerService } from '../../services/alquiler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Alquiler } from '../../models/alquiler';
import { Local } from '../../../local/models/local';
import { UsuarioGet } from '../../../usuarios/interfaces/usuario-get.interface';

@Component({
  selector: 'app-formulario-alquiler',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulario-alquiler.component.html',
  styleUrl: './formulario-alquiler.component.css'
})
export class FormularioAlquilerComponent {
  formularioAlquiler: FormGroup
  alquiler!: Alquiler;
  locales: Local[] = [];
  inquilinos: any[] = [];
  nuevo: boolean = false;

  constructor(
    private form: FormBuilder,
    private alquilerService: AlquilerService,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {
    this.formularioAlquiler = this.form.group({
      inquilinoSeleccionado: ['', Validators.required],
      localSeleccionado: ['', Validators.required],
      plazoMes: ['', [Validators.required, Validators.min(1)]],
      costoAlquiler: ['', [Validators.required, Validators.min(1)]],
      interesAnual: ['', [Validators.required, Validators.min(0)]],
      activo: [''],
      _id: ['']
    })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['id'] == "0" || params['id'] == undefined || params['id'] == '') {
        this.nuevo = true;
        this.iniciarVariables();
      } else {
        this.nuevo = false;
        this.iniciarVariables();
        this.getAlquilerById(params['id']);
      }
    });
  }

  registrarAlquiler() {
    const localSeleccionado = this.formularioAlquiler.get('localSeleccionado')?.value;

    if (this.esLocalAlquilado(localSeleccionado)) {
      this.toastr.error("El local seleccionado ya está alquilado", "Error");
      return;
    }
    if (!this.esLocalHabilitado(localSeleccionado) && localSeleccionado != '') {
        this.toastr.error("El local seleccionado no está habilitado", "Error");
        return;
    }

    if(this.formularioAlquiler.valid) {
      const alquiler = this.convertirFormularioEnAlquiler();
      this.alquilerService.createAlquiler(alquiler).subscribe(
        result => {
          if(result.status == 1) {
            this.router.navigate(['listado-alquiler']);
            this.toastr.success("Alquiler registrado con éxito", "Información");
          }
        },
        error => {
          this.toastr.error("Error al registrar el alquiler", "Error");
          console.log(error);
        }
      )
    }
    else {
      if (this.formularioAlquiler.controls['plazoMes'].hasError('min')) {
        this.toastr.warning("El plazo en meses debe ser mayor a 0", "Información");
      } else if (this.formularioAlquiler.controls['costoAlquiler'].hasError('min')) {
        this.toastr.warning("El costo debe ser mayor que 0", "Información");
      } else if (this.formularioAlquiler.controls['interesAnual'].hasError('min')) {
        this.toastr.warning("El interés anual no puede ser negativo", "Información");
      } else {
        this.toastr.warning("Por favor, complete todos los campos del formulario", "Información");
      }
    }
  }

  private esLocalAlquilado(localId: string): boolean {
      return this.locales.some(local => local._id === localId && local.alquilado);
  }

  private esLocalHabilitado(localId: string): boolean {
      return this.locales.some(local => local._id === localId && local.habilitado);
  }

  modificarAlquiler() {
    if(this.formularioAlquiler.valid) {
      const alquiler = this.convertirFormularioEnAlquiler();
      this.alquilerService.updateAlquiler(alquiler).subscribe(
        result => {
          if(result.status == 1) {
            this.router.navigate(['listado-alquiler']);
            this.toastr.success("Alquiler modificado con éxito", "Información");
          }
        },
        error => {
          this.toastr.error("Error al modificar el alquiler", "Error");
          console.log(error);
        }
      )
    }
    else {
      if (this.formularioAlquiler.controls['plazoMes'].hasError('min')) {
        this.toastr.warning("El plazo en meses debe ser mayor a 0", "Información");
      } else if (this.formularioAlquiler.controls['costoAlquiler'].hasError('min')) {
        this.toastr.warning("El costo debe ser mayor que 0", "Información");
      } else if (this.formularioAlquiler.controls['interesAnual'].hasError('min')) {
        this.toastr.warning("El interés anual no puede ser negativo", "Información");
      } else {
        this.toastr.warning("Por favor, complete todos los campos del formulario", "Información");
      }
    }
  }

  getAlquilerById(id: string) {
    this.alquilerService.getAlquilerById(id).subscribe(
      result => {
        const alquiler = new Alquiler();
        Object.assign(alquiler, result);
        this.convertirAlquilerEnFormulario(alquiler);
      },
      error => {
        this.toastr.error("Error al obtener alquiler", "Error");
        console.log(error);
      }
    )
}

  private convertirAlquilerEnFormulario(alquiler: Alquiler) {
    this.formularioAlquiler.patchValue({
      _id: alquiler._id,
      inquilinoSeleccionado: alquiler.inquilino._id,
      localSeleccionado: alquiler.local._id,
      plazoMes: alquiler.plazoMes,
      costoAlquiler: alquiler.costoAlquiler,
      interesAnual: alquiler.interesAnual,
      activo: alquiler.activo
    });    
  }

  private convertirFormularioEnAlquiler(): Alquiler {
    //desestructuracion
    const { _id, inquilinoSeleccionado, localSeleccionado, costoAlquiler, plazoMes, interesAnual, activo } = this.formularioAlquiler.value;
    const nuevoAlquiler = new Alquiler();

    // Asignar _id solo si está presente
    if (_id) {
        nuevoAlquiler._id = _id;
    }
    if (activo !== undefined && !this.nuevo) {
      nuevoAlquiler.activo = activo;
    }
    nuevoAlquiler.inquilino = inquilinoSeleccionado;
    nuevoAlquiler.local = localSeleccionado;
    nuevoAlquiler.costoAlquiler = costoAlquiler;
    nuevoAlquiler.plazoMes = plazoMes;
    nuevoAlquiler.interesAnual = interesAnual;
    return nuevoAlquiler;
  }

  hasErrors(controlName: string, errorType: string) {
    return this.formularioAlquiler.get(controlName)?.hasError(errorType) && this.formularioAlquiler.get(controlName)?.touched;
  }

  iniciarVariables() {
    this.alquiler = new Alquiler();
    this.getLocales();
    this.getInquilinos();
  }

  getLocales() {
    this.alquilerService.getLocales().subscribe(
      result => {
        this.locales = result;        
      }
    )
  }

  getInquilinos() {    
    this.alquilerService.getInquilinos().subscribe(
      result => {
        this.inquilinos = result.data;        
      }
    )
  }
}
