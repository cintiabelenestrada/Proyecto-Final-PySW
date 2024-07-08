const cuotaService = require('../services/cuota.service');

const cuotaCtrl = {};



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