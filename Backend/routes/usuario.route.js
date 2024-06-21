const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuario.controller');

router.get('/', usuarioController.find);
router.get('/:id', usuarioController.findOne);
router.post('/', usuarioController.create);
router.post('/login', usuarioController.login);
router.put('/:id', usuarioController.update);
router.delete('/:id', usuarioController.delete);

module.exports = router;
