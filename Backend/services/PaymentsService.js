const PagoService = require('./PagoService');
const CuotaService = require('../services/CuotaService');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid'); // Asegúrate de tener instalado el paquete 'uuid'

const hostBack = 'https://pyswapi.loca.lt';
const hostFront = 'http://localhost:4200';

class PaymentsService {
    async createPayment(payment) {
        try {
            // Verificar si se puede pagar la cuota
            await CuotaService.sePuedePagar(payment.cuota, payment.unit_price);
    
            // Registrar el pago con estado "pending" sin el ID de preferencia
            const pago = {
                usuario: payment.usuario,
                monto: payment.unit_price,
                cuota: payment.cuota,
                preference : ""
            };
            const newPago = await PagoService.registrarPago(pago);
    
            const url = 'https://api.mercadopago.com/checkout/preferences';
    
            const body = {
                items: [
                    {
                        title: payment.title,
                        unit_price: payment.unit_price,
                        quantity: payment.quantity
                    }
                ],
                back_urls: {
                    success: `${hostFront}/pagos/success/${newPago.id}`,
                    failure: `${hostFront}/pagos/failure/${newPago.id}`,
                    pending: `${hostFront}/pagos/pending/${newPago.id}`
                },
                notification_url: `${hostBack}/api/payments/notifications`,
            };
    
            const paymentResponse = await axios.post(url, body, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`
                }
            });
    
            // Actualizar el registro del pago con el ID de preferencia de MercadoPago
            await PagoService.actualizarPagoConPreference(newPago.id, paymentResponse.data.id);
    
            console.log(paymentResponse.data);
            return paymentResponse.data;
    
        } catch (error) {
            console.error("Error al crear el pago: ", error);
            throw new Error("Error al crear el pago: " + error.message);
        }
    }

    async manejarNotificacionPago(preferenceId) {
        try {
            const url = `https://api.mercadopago.com/checkout/preferences/${preferenceId}`;
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`
                }
            });
    
            const paymentId = response.data.external_reference;
            const paymentStatus = response.data.status;
    
            if (paymentStatus === 'approved') {
                await PagoService.actualizarEstadoPago(paymentId, 'success');
                await CuotaService.actualizarEstadoCuota(paymentId);
            } else if (paymentStatus === 'pending') {
                await PagoService.actualizarEstadoPago(paymentId, 'pending');
            } else {
                await PagoService.actualizarEstadoPago(paymentId, 'failure');
            }
    
            return response.data;
    
        } catch (error) {
            console.error("Error al manejar la notificación del pago: ", error);
            throw new Error("Error al manejar la notificación del pago: " + error.message);
        }
    }
}


module.exports = new PaymentsService();