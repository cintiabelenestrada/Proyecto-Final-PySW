export interface PaymentGet {
    status: string;
    msg: string;
    data: string | PaymentData; // data puede ser un string o un objeto de tipo PaymentData
}

export interface PaymentData {
    usuario: string;
    montoPago: number;
    montoInteres: number;
    status: string;
    preference: string;
    tipo: string;
    cuota: string;
    _id: string;
    fechaCreacion: string;
    fechaActualizacion: string;
}