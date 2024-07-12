export interface PagoGet {
    _id:                string;
    usuario:            string;
    montoPago:          number;
    montoInteres:       number;
    status:             string;
    preference:         string;
    tipo:               string;
    cuota:              string;
    fechaCreacion:      Date;
    fechaActualizacion: Date;
}
