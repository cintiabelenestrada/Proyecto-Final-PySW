import { Local } from "../../local/models/local";
import { Inquilino } from "../../propietario/models/inquilino";
import { UsuarioGet } from "../../usuarios/interfaces/usuario-get.interface";

export class Alquiler {
    _id!: string;
    inquilino!: UsuarioGet;
    local!: Local;
    plazoMes!: number;
    costoAlquiler!: number;
    fechaAlquiler!: Date;
    interesAnual!: number;
    activo!: boolean;
}