import { HttpClient } from '@angular/common/http';
import { signal, computed, Injectable } from '@angular/core';
import { EstadoAutenticacion } from '../enums/estado-autenticacion.enum';
import { UsuarioGet } from '../interfaces/usuario-get.interface';
import { Observable, map, tap } from 'rxjs';
import { Credenciales } from '../interfaces/credenciales.interface';
import { UsuarioResponse } from '../interfaces/usuario-response.interface';
import { CookieService } from 'ngx-cookie-service';
import { LoginResponse } from '../interfaces/login-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:3000/api/auth';
  private _currentUser = signal<UsuarioGet | null>(null);
  private _estadoAutenticacion = signal<EstadoAutenticacion>(
    EstadoAutenticacion.NoAutenticado
  );

  public currentUser = computed(() => this._currentUser());
  public estadoAutenticacion = computed(() => this._estadoAutenticacion());

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  private setAutenticacion(
    estado: EstadoAutenticacion,
    usuario: UsuarioGet | null
  ): void {
    this._estadoAutenticacion.set(estado);
    this._currentUser.set(usuario);
  }

  private saveToken(token: string): void {
    this.cookieService.set('token', token);
  }

  private getToken(): string {
    return this.cookieService.get('token');
  }

  /**
   * Inicia sesión con un usuario
   * @param usuario Credenciales del usuario
   * @returns Datos del usuario autenticado
   */
  login(usuario: Credenciales): Observable<UsuarioGet> {
    const url = `${this.baseUrl}/login`;

    return this.http.post<UsuarioResponse<LoginResponse>>(url, usuario).pipe(
      map((res) => res.data),
      tap((res) => {
        this.setAutenticacion(EstadoAutenticacion.Autenticado, res.usuario);
        this.saveToken(res.token);
      }),
      map((res) => res.usuario)
    );
  }

  /**
   * Cierra la sesión del usuario
   */
  logout(): void {
    this.setAutenticacion(EstadoAutenticacion.NoAutenticado, null);
    this.cookieService.delete('token');
  }
}
