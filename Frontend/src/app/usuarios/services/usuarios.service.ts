import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UsuarioResponse } from '../interfaces/usuario-response.interface';
import { UsuarioGet } from '../interfaces/usuario-get.interface';
import { UsuarioPost } from '../interfaces/usuario-post.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private readonly baseUrl = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los usuarios
   * @returns Lista de usuarios
   */
  get(): Observable<UsuarioGet[]> {
    const url = `${this.baseUrl}`;

    return this.http
      .get<UsuarioResponse<UsuarioGet[]>>(url)
      .pipe(map((res) => res.data));
  }

  /**
   * Obtiene un usuario por su ID
   * @param id ID del usuario a obtener
   * @returns Datos del usuario
   */
  getById(id: string): Observable<UsuarioGet> {
    const url = `${this.baseUrl}/${id}`;

    return this.http
      .get<UsuarioResponse<UsuarioGet>>(url)
      .pipe(map((res) => res.data));
  }

  /**
   * Crea un nuevo usuario
   * @param usuario Usuario a crear
   * @returns Datos del usuario creado
   */
  post(usuario: UsuarioPost): Observable<UsuarioGet> {
    const url = `${this.baseUrl}`;

    return this.http
      .post<UsuarioResponse<UsuarioGet>>(url, usuario)
      .pipe(map((res) => res.data));
  }

  /**
   * Actualiza un usuario
   * @param id
   * @param usuario
   * @returns Datos del usuario actualizado
   */
  put(id: string, usuario: UsuarioPost): Observable<UsuarioGet> {
    const url = `${this.baseUrl}/${id}`;

    return this.http
      .put<UsuarioResponse<UsuarioGet>>(url, usuario)
      .pipe(map((res) => res.data));
  }

  /**
   * Elimina un usuario
   * @param id ID del usuario a eliminar
   * @returns True si se elimina correctamente, false en caso contrario
   */
  delete(id: string): Observable<boolean> {
    const url = `${this.baseUrl}/${id}`;

    return this.http
      .delete<UsuarioResponse<boolean>>(url)
      .pipe(map((res) => res.data));
  }
}
