import { Component, OnInit } from '@angular/core';
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
import { NavbarComponent } from '../../../home/components/navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink,NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    '../../../shared/styles/custom-colors.css',
  ],
})
export class LoginComponent implements OnInit {
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

  ngOnInit(): void {
    this.recuperarSession();
  }

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
    this.authService.login(credenciales).subscribe({
      next: () => {
        this.toastService.success('Sesión iniciada correctamente');
        this.status = 'success';
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.toastService.error('Error al iniciar sesión');
        this.status = 'error';
      },
    });
  }

  recuperarSession(): void {
    this.authService.checkAuthStatus().subscribe({
      next: (res) => {
        if (!res) return;
        this.toastService.success('Sesión recuperada correctamente');
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.toastService.error(
          'Tu sesión ha expirado, por favor inicia sesión nuevamente'
        );
      },
    });
  }
}
