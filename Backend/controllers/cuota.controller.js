const cuotaService = require('../services/cuota.service');

const cuotaCtrl = {};

cuotaCtrl.createCuota = async (req, res) => {
    try {
        const cuota = req.body;
        const newCuota = await cuotaService.createCuota(cuota);
        res.json({
            status: '1',
            msg: 'Cuota creada correctamente',
            data: newCuota
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al crear la cuota' + error 
        });
    }
}

cuotaCtrl.obtenerCuotasPorIdAlquiler = async (req, res) => {
    try {
        const idAlquiler = req.params.id;
        const cuotas = await cuotaService.getCuotasById(idAlquiler);
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

cuotaCtrl.obtenerCuotaPorId = async (req, res) => {
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



module.exports = cuotaCtrl;