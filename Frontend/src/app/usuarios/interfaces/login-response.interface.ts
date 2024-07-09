import { UsuarioGet } from './usuario-get.interface';

export interface LoginResponse {
  token: string;
  usuario: UsuarioGet;
}
