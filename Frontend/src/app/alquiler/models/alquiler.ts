
import { UsuarioGet } from "../../usuarios/interfaces/usuario-get.interface";

export class Alquiler {
    _id!: string;
    inquilino!: UsuarioGet;
    local!: any;
    plazoMes!: number;
    costoAlquiler!: number;
    fechaAlquiler!: Date;
    interesAnual!: number;
    activo!: boolean;
}