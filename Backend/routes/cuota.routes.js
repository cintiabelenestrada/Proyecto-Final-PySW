const express = require('express');
const router = express.Router();

const cuotaCtrl = require('../controllers/cuota.controller');


router.get('/', cuotaCtrl.obtenerCuotas);
router.get('/:id', cuotaCtrl.obtenerCuotaPorIdAlquiler);

module.exports = router;