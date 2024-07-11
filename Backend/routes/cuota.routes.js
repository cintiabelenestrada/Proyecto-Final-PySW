const express = require('express');
const router = express.Router();

const cuotaCtrl = require('../controllers/cuota.controller');


router.get('/', cuotaCtrl.obtenerCuotas);
router.get ('/:id', cuotaCtrl.obtenerCuota);
router.get ('/:id/pagos/', cuotaCtrl.obtenerPagosPorIdCuota);
router.get ('/usuario/:id', cuotaCtrl.obtenerCuotasPorIdUsuario);

module.exports = router;