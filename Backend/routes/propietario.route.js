//defino controlador para el manejo de CRUD
const propietarioCtrl = require('./../controllers/propietario.controller');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de agente
router.get('/', propietarioCtrl.getPropietarios);
router.get('/:id', propietarioCtrl.getPropietarioById);
router.post('/nuevo', propietarioCtrl.createPropietario);
router.put('/:id', propietarioCtrl.updatePropietario);
router.delete('/:id', propietarioCtrl.deletePropietario);

//exportamos el modulo de rutas
module.exports = router;