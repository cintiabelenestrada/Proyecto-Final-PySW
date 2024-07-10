const Alquiler = require('../models/Alquiler');
require('../routes/alquiler.route');
//const cuotaService = require('../services/CuotaService');
const alquilerCtrl = {}

alquilerCtrl.getAlquileres = async (req, res) => {
    try {
        const alquileres = await Alquiler.find().populate('local').populate('propietario');
        res.json(alquileres);
    } catch (error) {
        res.status(500).json({
            status: '0',
            msg: 'Error obteniendo los alquileres',
            error: error.message
        });
    }
};

alquilerCtrl.getAlquilerById = async (req, res) => {
    try {
        const alquiler = await Alquiler.findById(req.params.id).populate('local').populate('propietario');
        if (!alquiler) {
            return res.status(404).json({
                status: '0',
                msg: 'Alquiler no encontrado'
            });
        }
        res.json(alquiler);
    } catch (error) {
        res.status(500).json({
            status: '0',
            msg: 'Error obteniendo el alquiler',
            error: error.message
        });
    }
};

alquilerCtrl.createAlquiler = async (req, res) => {
    const alquiler = new Alquiler(req.body);
    try {
        await alquiler.save();
        res.json({
            'status': '1',
            'msg': 'Alquiler guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error guardando el alquiler.'
        })
    }
}

alquilerCtrl.updateAlquiler = async (req, res) => {
    try {
        await Alquiler.findByIdAndUpdate(req.params.id, req.body);
        res.json({
            status: '1',
            msg: 'Alquiler actualizado'
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error actualizando el alquiler',
            error: error.message
        });
    }
};

alquilerCtrl.deleteAlquiler = async (req, res) => {
    try {
        await Alquiler.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Alquiler eliminado'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error eliminando el alquler'
        })
    }
}

module.exports = alquilerCtrl;
alquilerCtrl.deleteAlquiler = async (req, res) => {
    try {
        await Alquiler.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Alquiler eliminado'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error eliminando el alquler'
        })
    }
}
// Generar cuotas para todos los alquileres, metodo reservado para el cron
alquilerCtrl.generarCuotas = async (req, res) => {
    try {
        const alquileres = await Alquiler.find();
        await Promise.all(alquileres.map(async alquiler => {
            const cuota = {
                alquiler: alquiler._id,
                montoTotal: alquiler.costoAlquiler,
            };
            await cuotaService.createCuota(cuota);
        }));
        res.json({
            status: '1',
            msg: 'Cuotas generadas correctamente'
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error generando las cuotas',
            error: error.message
        });
    }

}

alquilerCtrl.obtenerCuotasPorIdAlquiler = async (req, res) => {
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



module.exports = alquilerCtrl;

/*
    const CuotaSchema = new Schema({
    alquiler: { type: Schema.Types.ObjectId, ref: 'Alquiler', required: true },
    montoTotal: { type: Number, required: true },
    montoRestante: { type: Number, required: true },
    fecha: { type: Date, default: Date.now },
    fechaVencimiento: { 
        type: Date, 
        default: () => new Date(new Date().getTime() + (10 * 24 * 60 * 60 * 1000)) // Agrega 30 días a la fecha actual
    },
    estado: { 
        type: String, 
        enum: ['Pendiente', 'Pagada'],
        default: 'Pendiente'
    },
    pagos: [{ type: Schema.Types.ObjectId, ref: 'Pago'}]
});
*/

