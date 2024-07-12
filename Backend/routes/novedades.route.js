const express = require('express');
const router = express.Router();
const novedadesCtrl = require('../controllers/novedades.controller');

router.get('/', novedadesCtrl.getNovedades);
router.get('/all', novedadesCtrl.getAllNovedades);
router.get('/:id', novedadesCtrl.getNovedad);
router.get('/usuario/:usuarioId', novedadesCtrl.getNovedadesByUsuario);
router.post('/', novedadesCtrl.createNovedad);
router.put('/:id', novedadesCtrl.editNovedad);
router.delete('/:id', novedadesCtrl.deleteNovedad);


module.exports = router;
