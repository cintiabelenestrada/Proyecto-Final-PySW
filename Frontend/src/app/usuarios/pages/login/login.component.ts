import { Component } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Credenciales } from '../../interfaces/credenciales.interface';
import { ToastrService } from 'ngx-toastr';
import { RequestStatus } from '../../types/request-status.type';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup = this.fb.group({
    usuario: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  status: RequestStatus = 'idle';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastrService,
    private router: Router
  ) {}

  get usuario(): FormControl {
    return this.loginForm.get('usuario') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.toastService.error('Formulario inválido');
      this.loginForm.markAllAsTouched();
      return;
    }

    const credenciales = this.loginForm.value as Credenciales;
    this.login(credenciales);
  }

  login(credenciales: Credenciales): void {
    this.status = 'loading';
    this.toastService.info('Iniciando sesión...');
    this.authService.login(credenciales).subscribe({
      next: () => {
        this.toastService.success('Sesión iniciada correctamente');
        this.status = 'success';
        this.router.navigate(['/dashboard'])
      },
      error: () => {
        this.toastService.error('Error al iniciar sesión');
        this.status = 'error';
      },
    });
  }
}
