const PagoService = require('./PagoService');
const CuotaService = require('../services/CuotaService');
const axios = require('axios');


const hostBack = 'https://analysts-wealth-ski-sd.trycloudflare.com';
const hostFront = 'http://localhost:4200';

class PaymentsService {
    async createPayment(payment) {
        try {
            // Verificar si se puede pagar la cuota
            await CuotaService.sePuedePagar(payment.cuota, payment.unit_price);
            console.log ("idcuota: " + payment.cuota);
            // Registrar el pago con estado "pending" sin el ID de preferencia
            const pago = {
                usuario: payment.usuario,
                montoPago: payment.unit_price,
                montoInteres: await CuotaService.calcularInteres(payment.cuota, payment.unit_price),
                tipo: payment.tipo,
                cuota: payment.cuota,
                preference : ""
            };

            if (payment.tipo != 'MercadoPago') {
                pago.status = 'success';
                const newPago = await PagoService.registrarPago(pago);
                await CuotaService.actualizarEstadoCuota(newPago._id);
                return newPago;
            }

            const newPago = await PagoService.registrarPago(pago);
            
            
            const url = 'https://api.mercadopago.com/checkout/preferences';
    
            const body = {
                items: [
                    {
                        title: payment.title,
                        unit_price: payment.unit_price,
                        quantity: 1,
                        description: "Pago de la cuota " + pago.cuota + " se pagan " + pago.montoPago + " de la cuota y " + pago.montoInteres + " de intereses."
                    }
                ],
                back_urls: {
                    success: `${hostFront}/dashboard/cuotas/${payment.cuota}/pago/success`,
                    failure: `${hostFront}/dashboard/cuotas/${payment.cuota}/pago/failure`,
                    pending: `${hostFront}/dashboard/cuotas/${payment.cuota}/pago/pending`
                },
                notification_url: `${hostBack}/api/payments/notifications`,
                external_reference: newPago.id,
                payment_methods: {
                    installments: 1
                }
            };
            
            const paymentResponse = await axios.post(url, body, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`
                }
            });
            
            // Actualizar el registro del pago con el ID de preferencia de MercadoPago
            await PagoService.actualizarPagoConPreference(newPago.id, paymentResponse.data.id);
    
            return paymentResponse.data.init_point;
    
        } catch (error) {
            console.error("Error al crear el pago: ", error);
            throw new Error("Error al crear el pago: " + error.message);
        }
    }

    async manejarNotificacionPago(resource) {
        try {
            const link = resource;
            const partes = link.split("/");
            const id = partes[partes.length - 1];
            const url = "https://api.mercadolibre.com/collections/notifications/"+id;
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`
                }
            });
            
            const cuotaId = response.data.collection.external_reference;
            const paymentStatus = response.data.collection.status;
            console.log ("Actualizando estado de pago:" + cuotaId + " " + paymentStatus);
            if (paymentStatus === 'approved') {
                await PagoService.actualizarEstadoPago(cuotaId, 'success');
                await CuotaService.actualizarEstadoCuota(cuotaId);
            } else if (paymentStatus === 'pending') {
                await PagoService.actualizarEstadoPago(cuotaId, 'pending');
            } else {
                await PagoService.actualizarEstadoPago(cuotaId, 'failure');
            }
    
            return response.data;
    
        } catch (error) {
            console.error("Error al manejar la notificación del pago: ", error);
            throw new Error("Error al manejar la notificación del pago: " + error.message);
        }
    }
}


module.exports = new PaymentsService();