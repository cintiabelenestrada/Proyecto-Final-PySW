const express = require('express');
const router = express.Router();
const pagoCtrl = require('../controllers/pago.controller');

// Ruta para crear un nuevo pago
router.post('/', pagoCtrl.crearPago);

// Ruta para obtener todos los pagos
router.get('/', pagoCtrl.obtenerPagos);

// Ruta para obtener un pago por su ID
router.get('/:id', pagoCtrl.obtenerPagoPorId);

module.exports = router;