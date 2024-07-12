const express = require('express');
const router = express.Router();

const roomGeneratorCtrl = require('../controllers/roomGenerator.controller');

router.post('/predictions', roomGeneratorCtrl.startPrediction);
router.get('/predictions/:id', roomGeneratorCtrl.getPredictionStatus);

module.exports = router;