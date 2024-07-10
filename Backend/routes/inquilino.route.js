//defino controlador para el manejo de CRUD
const inquilinoCtrl = require('../controllers/inquilino.controller');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de agente
router.get('/', inquilinoCtrl.getInquilinos);
router.get('/:id', inquilinoCtrl.getInquilinoById);
router.post('/nuevo', inquilinoCtrl.createInquilino);
router.put('/:id', inquilinoCtrl.updateInquilino);
router.delete('/:id', inquilinoCtrl.deleteInquilino);

//exportamos el modulo de rutas
module.exports = router;