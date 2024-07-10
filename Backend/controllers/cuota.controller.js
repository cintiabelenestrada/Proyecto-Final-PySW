const cuotaService = require('../services/CuotaService');

const cuotaCtrl = {};



cuotaCtrl.obtenerCuotaPorIdAlquiler = async (req, res) => {
    try {
        const id = req.params.id;
        const cuota = await cuotaService.getCuotasByIdAlquiler(id);
        res.json({
            status: '1',
            msg: 'Cuota obtenida correctamente',
            data: cuota
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al obtener la cuota' + error 
        });
    }
}

cuotaCtrl.obtenerCuotas = async (req, res) => {
    try {
        const cuotas = await cuotaService.getCuotas();
        res.json({
            status: '1',
            msg: 'Cuotas obtenidas correctamente',
            data: cuotas
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al obtener las cuotas' + error
        });
    }
}

cuotaCtrl.obtenerCuota = async (req, res) => {
    try {
        const id = req.params.id;
        const cuota = await cuotaService.getCuotaById(id);
        res.json({
            status: '1',
            msg: 'Cuota obtenida correctamente',
            data: cuota
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al obtener la cuota' + error
        });
    }
}

cuotaCtrl.obtenerPagosPorIdCuota = async (req, res) => {
    try {
        const id = req.params.id;
        const pagos = await cuotaService.obtenerPagosPorIdCuota(id);
        res.json({
            status: '1',
            msg: 'Pagos obtenidos correctamente',
            data: pagos
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al obtener los pagos' + error
        });
    }
}





module.exports = cuotaCtrl;