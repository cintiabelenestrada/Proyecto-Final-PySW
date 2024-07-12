export interface CuotaGet {
    _id:              string;
    alquiler:         string;
    montoTotal:       number;
    montoRestante:    number;
    estado:           string;
    fecha:            Date;
    fechaVencimiento: Date;
}
