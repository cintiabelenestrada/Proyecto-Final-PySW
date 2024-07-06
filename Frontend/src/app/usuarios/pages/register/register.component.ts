import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
export class RegisterComponent implements OnInit {
  registerForm = this.formBuilder.group({
    _id: [''],
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
  modo: 'editar' | 'crear' = 'crear';

  constructor(
    private formBuilder: FormBuilder,
    private authService: UsuariosService,
    private toastService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      if (id) {
        this.authService.getById(id).subscribe({
          next: (user) => {
            this.registerForm.patchValue(user);
            this.modo = 'editar';
          },
          error: () => {
            this.toastService.error('Error al cargar el usuario');
          },
        });
      }
    });
  }

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
    if (this.modo === 'crear') {
      const { _id: _, ...usuarioSinId } = user;
      this.register(usuarioSinId);
    } else {
      this.update(user);
    }
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

  update(user: UsuarioPost): void {
    this.status = 'loading';
    this.authService.put(user._id!, user).subscribe({
      next: () => {
        this.toastService.success('Usuario actualizado correctamente');
        this.status = 'success';
      },
      error: () => {
        this.toastService.error('Error al actualizar el usuario');
        this.status = 'error';
      },
    });
  }
}
