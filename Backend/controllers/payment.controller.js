const express = require('express');
const router = express.Router();
const PaymentsService = require('../services/PaymentsService');

const paymentCtrl = {};

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
        if(payment.topic !== 'payment'){
            return res.json({
                status: '1',
                msg : 'Notificación manejada correctamente',
            });
        }
        const response = await PaymentsService.manejarNotificacionPago(payment.resource);
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