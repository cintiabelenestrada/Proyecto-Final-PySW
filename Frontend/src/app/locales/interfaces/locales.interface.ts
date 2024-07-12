export class LocalInterface {
  nombre: string;
  direccion: string;
  descripcion: string;
  superficie: number;
  habilitado: boolean;
  customers: number;
  pathimagen: string;
  alquilado: boolean;
  constructor(
  ){
    this.nombre = '';
    this.direccion = '';
    this.descripcion = '';
    this.superficie = 0;
    this.customers = 0;
    this.pathimagen = '';
    this.habilitado = false;
    this.alquilado = false;
  };
}
