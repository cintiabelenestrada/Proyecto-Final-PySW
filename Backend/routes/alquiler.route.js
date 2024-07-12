const alquilerCtrl = require('../controllers/alquiler.controller');

const express = require('express');
const router = express.Router();

router.get('/', alquilerCtrl.getAlquileres);
router.get('/activos', alquilerCtrl.getAlquileresActivos);
router.get('/:id', alquilerCtrl.getAlquilerById);
router.post('/', alquilerCtrl.createAlquiler);
router.put('/:id', alquilerCtrl.updateAlquiler);
router.delete('/:id', alquilerCtrl.deleteAlquiler);
router.get ('/:id/cuotas', alquilerCtrl.obtenerCuotasPorIdAlquiler);
router.get('/:id/pagos', alquilerCtrl.obtenerPagosPorIdAlquiler);

module.exports = router;