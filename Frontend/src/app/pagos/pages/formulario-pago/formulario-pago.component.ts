import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MercadoPagoService } from '../../services/mercado-pago.service';
import { CuotaService } from '../../../cuota/services/cuota.service';
import { CuotaGet } from '../../../cuota/interfaces/cuota-get';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { PaymentPost } from '../../interfaces/payment-post';
import { AuthService } from '../../../usuarios/services/auth.service';
import { UsuarioGet } from '../../../usuarios/interfaces/usuario-get.interface';

@Component({
  selector: 'app-formulario-pago',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './formulario-pago.component.html',
  styleUrl: './formulario-pago.component.css'
})
export class FormularioPagoComponent {
  cuotaEncontrada!: CuotaGet;
  status: "loading" | "ok" | "error" = "loading";
  montoMaximo: number = 1;
  diasDeAtraso: number = 0;
  usuario!: UsuarioGet;

  paymentForm = this.fb.group({
    title : ['' , Validators.required],
    unit_price : [null as number | null, [Validators.required, Validators.max(this.montoMaximo), Validators.min(0)]],
    cuotaId: ['', Validators.required],
    tipo: ['', Validators.required],
  });


  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private mercadoPagoService: MercadoPagoService,
              private cuotaService : CuotaService,
              private ngxToastrService: ToastrService,
              private routeNavigate: Router,
              private authService: AuthService              
  ) { }

  get unit_price() { return this.paymentForm.get('unit_price'); }
  get title() { return this.paymentForm.get('title'); }
  get cuotaId() { return this.paymentForm.get('cuota'); }
  get tipo() { return this.paymentForm.get('tipo'); }

  ngOnInit() {
    this.route.params.subscribe(({ id }) => {
      this.obtenerCuota(id);
    });
    this.usuario = this.authService.currentUser()!;
    console.log(this.usuario);
  }

  obtenerCuota(id: string) {
    this.cuotaService.getCuotaById(id).subscribe({
      next: (cuota) => {
        console.log(cuota);
        this.cuotaEncontrada = cuota;
        this.paymentForm.patchValue({
          title: "Pago Correspondiente al periodo de " + cuota.fecha + "del Alquiler con numero: " + cuota.alquiler + ".",
          cuotaId: this.cuotaEncontrada._id,
          tipo: "MercadoPago"
        });
        
        this.montoMaximo = this.cuotaEncontrada.montoRestante + this.calcularInteres();
        this.unit_price?.setValidators([Validators.required, Validators.max(this.montoMaximo), Validators.min(1)]);
        this.unit_price?.updateValueAndValidity();
        if(this.cuotaEncontrada.montoRestante === 0){
          this.status = "error";
          this.ngxToastrService.error("La cuota ya fue abonada en su totalidad");
        }else{
          this.status = "ok";
        }
      },
      error: (error) => {
        this.status = "error";
        console.log (error);
      }
    })
  }

  onSubmit() {
    if (this.paymentForm.invalid) {
      return;
    }
    const payment: PaymentPost = {
      title: this.paymentForm.value.title!,
      unit_price: this.paymentForm.value.unit_price!,
      cuota: this.paymentForm.value.cuotaId!,
      usuario: this.usuario._id!,
      tipo: this.paymentForm.value.tipo!
    }


    this.mercadoPagoService.createPayment(payment).subscribe({
      next: (response) => {
        console.log(response);
        
        if (typeof response.data === 'string') {
          this.ngxToastrService.success("Redirigiendote a MercadoPago para completar el pago.");
          window.location.href = response.data;
        } else if (response.data && response.data.status === "success") {
          this.routeNavigate.navigate([`/dashboard/cuotas/${response.data.cuota}/pago/success`]);
          
        } else {
          this.ngxToastrService.error("Hubo un error al procesar el pago.");
        }
        
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  /**
   * FIXME: el interes anual viene del service de alquiler, como no lo tengo lo dejo fijo 
   */
  calcularInteres() {
    if (this.cuotaEncontrada.fechaVencimiento) {
      const interesAnual = 7; // Tasa de interés anual
      const tasaInteresDiaria = interesAnual / 365 / 100; 
      const fechaActual = new Date();
      const fechaVencimiento = new Date(this.cuotaEncontrada.fechaVencimiento);
      this.diasDeAtraso = Math.ceil((fechaActual.getTime() - fechaVencimiento.getTime()) / (1000 * 60 * 60 * 24)); 
      console.log (this.diasDeAtraso);
      if (this.diasDeAtraso > 0) {
        const montoCuota = this.cuotaEncontrada.montoRestante; 
        const interes = montoCuota * tasaInteresDiaria * this.diasDeAtraso; 
  
        return interes; 
      }
    }
    return 0; 
  }

}

