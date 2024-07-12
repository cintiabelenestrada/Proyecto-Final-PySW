//defino controlador para el manejo de CRUD
const localCtrl = require('../controllers/local.controller');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de local
router.post('/', localCtrl.createLocal);
router.post('/publicacion', localCtrl.publish);
router.get('/', localCtrl.getLocales);
router.get('/habilitados', localCtrl.getLocalesHabilitados);
router.get('/inhabilitados', localCtrl.getLocalesInhabilitados);
router.get('/:id', localCtrl.getLocalID);
router.put('/:id', localCtrl.editLocal);
router.delete('/:id', localCtrl.deleteLocal);
router.delete('/publicacion/:id', localCtrl.deletePublish);


//exportamos el modulo de rutas
module.exports = router;