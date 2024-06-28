import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsuarioPost } from '../../interfaces/usuario-post.interface';
import { ToastrService } from 'ngx-toastr';
import { RequestStatus } from '../../types/request-status.type';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    usuario: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    activo: [true],
    perfil: [
      '',
      [
        Validators.pattern(/^(propietario|administrativo)$/),
        Validators.required,
      ],
    ],
  });
  status: RequestStatus = 'idle';

  constructor(
    private formBuilder: FormBuilder,
    private authService: UsuariosService,
    private toastService: ToastrService
  ) {}

  get email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get usuario(): FormControl {
    return this.registerForm.get('usuario') as FormControl;
  }

  get password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  get perfil(): FormControl {
    return this.registerForm.get('perfil') as FormControl;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.toastService.error('Formulario incorrecto');
      this.registerForm.markAllAsTouched();
      return;
    }

    const user = this.registerForm.value as UsuarioPost;
    this.register(user);
  }

  register(user: UsuarioPost): void {
    this.status = 'loading';
    this.authService.post(user).subscribe({
      next: () => {
        this.toastService.success('Usuario creado correctamente');
        this.status = 'success';
      },
      error: () => {
        this.toastService.error('Error al crear el usuario');
        this.status = 'error';
      },
    });
  }
}
