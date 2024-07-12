const cron = require('node-cron');
const alquierCtrl = require('../controllers/alquiler.controller');
const cuotasService = require('../services/cuotas.service');

// Tarea para generar cuotas el primer día de cada mes a las 00:00 horas
cron.schedule('0 0 1 * *', () => {
    console.log('Generando cuotas para todos los alquileres...');
    alquierCtrl.generarCuotas();
});

// Tarea para enviar correos de vencimiento todos los días a las 08:00 horas
cron.schedule('0 8 * * *', () => {
    console.log('Enviando correos de vencimiento...');
    cuotasService.enviarCorreosVencimiento();
});

// Tarea para borrar los pagos con estado failure todos los días a las 00:00 horas
cron.schedule('0 0 * * *', () => {
    console.log('Borrando pagos failure...');
    cuotasService.borrarPagosFailure();
});