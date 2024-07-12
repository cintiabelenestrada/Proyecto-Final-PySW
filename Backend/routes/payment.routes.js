const express = require('express');
const router = express.Router();

const paymentCtrl = require('../controllers/payment.controller');


router.post('/', paymentCtrl.createPayment);
router.post('/notifications', paymentCtrl.manejarNotificacion);

module.exports = router;