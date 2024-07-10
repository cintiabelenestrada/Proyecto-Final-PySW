import { Local } from "../../local/models/local";
import { Inquilino } from "../../propietario/models/inquilino";

export class Alquiler {
    _id?: string;
    inquilino!: Inquilino;
    local!: Local;
    plazoMes!: number;
    costoAlquiler!: number;
    interesAnual!: number;
    activo!: boolean;
}