const express = require('express');
const router = express.Router();
const PaymentsService = require('../services/payment.service');

paymentCtrl.createPayment = async (req, res) => {
    try {
        const payment = req.body;
        const newPayment = await PaymentsService.createPayment(payment);
        res.json({
            status: '1',
            msg: 'Pago creado correctamente',
            data: newPayment
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al crear el pago' + error 
        });
    }
}

paymentCtrl.manejarNotificacion = async (req, res) => {
    try {
        const payment = req.body;
        console.log("Notificación recibida");
        const response = await PaymentsService.manejarNotificacionPago(payment.preference_id);
        if (response.status === 'approved') {
            console.log("Pago aprobado");
        } else if (response.status === 'pending') {
            console.log("Pago pendiente");
        } else {
            console.log("Pago rechazado");
        }
        res.json({
            status: '1',
            msg: 'Notificación manejada correctamente',
            data: response
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al manejar la notificación' + error 
        });
    }
}

module.exports = paymentCtrl