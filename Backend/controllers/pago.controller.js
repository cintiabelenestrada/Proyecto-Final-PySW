const pagoService = require('../services/PagoService');

const pagoCtrl = {};

pagoCtrl.crearPago = async (req, res) => {
    try {
        const pago = await pagoService.registrarPago(req.body);
        res.json({
            status: '1',
            msg: 'Pago creado correctamente ',
            data: pago
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al crear el pago ' + error
        });
    }
}

pagoCtrl.obtenerPagos = async (req, res) => {
    try {
        const pagos = await pagoService.obtenerPagos();
        res.json({
            status: '1',
            msg: 'Pagos obtenidos correctamente ',
            data: pagos
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al obtener los pagos ' + error
        });
    }
}

pagoCtrl.obtenerPagoPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const pago = await pagoService.obtenerPagoPorId(id);
        res.json({
            status: '1',
            msg: 'Pago obtenido correctamente ',
            data: pago
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al obtener el pago ' + error
        });
    }
}

pagoCtrl.obtenerPagosPorInquilino = async (req, res) => {
    try {
        const idInquilino = req.params.idInquilino;
        const pagos = await pagoService.buscarPagosPorInquilino(idInquilino);
        res.json({
            status: '1',
            msg: 'Pagos obtenidos correctamente ',
            data: pagos
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al obtener los pagos ' + error
        });
    }
}

module.exports = pagoCtrl;
