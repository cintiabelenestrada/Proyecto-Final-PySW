const Alquiler = require('../models/Alquiler'); 
const cuotaService = require('../services/CuotaService');
const pagoService = require('../services/PagoService');
const Local = require('../models/Local');
const alquilerService = require('../services/alquiler.service');
const alquilerCtrl = {} 

alquilerCtrl.getAlquileres = async (req, res) => {
    try {
        const alquileres = await Alquiler.find().populate('local').populate('inquilino');
        res.status(200).json(alquileres);
    } catch (error) {
        res.status(500).json({
            status: '0',
            msg: 'Error obteniendo los alquileres',
            error: error.message
        });
    }
};

alquilerCtrl.getAlquileresActivos = async (req, res) => {
    try {
        const alquileres = await Alquiler.find().populate('local').populate('inquilino');
        const alquileresActivos = alquileres.filter(alquiler => alquiler.activo);
        res.status(200).json(alquileresActivos);
    } catch (error) {
        res.status(500).json({
            status: '0',
            msg: 'Error obteniendo los alquileres activos',
            error: error.message
        });
    }
};

alquilerCtrl.getAlquilerById = async (req, res) => {
    try {
        const alquiler = await Alquiler.findById(req.params.id).populate('local').populate('inquilino');
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
    try { 
        const alquiler = await alquilerService.createAlquiler(req.body);
        await cuotaService.createCuota({
            alquiler: alquiler._id,
            montoTotal: alquiler.costoAlquiler
        });
        res.json({ 
            'status': '1', 
            'msg': 'Alquiler guardado.'}) 
    } catch (error) { 
        console.error('Error guardando el alquiler:', error);
        res.status(400).json({ 
            'status': '0', 
            'msg': 'Error guardando el alquiler.'}) 
    } 
};

alquilerCtrl.updateAlquiler = async (req, res) => {
    try {
        // Verificar si hay otros alquileres activos para el mismo local antes de actualizar
        if (req.body.activo === true) {
            const alquiler = await Alquiler.findById(req.params.id);
            if (!alquiler) {
                return res.status(404).json({ status: '0', msg: 'Alquiler no encontrado' });
            }
            const alquileresActivos = await Alquiler.find({ local: alquiler.local, activo: true, _id: { $ne: req.params.id } });
            if (alquileresActivos.length > 0) {
                return res.status(400).json({ status: '0', msg: 'Ya existe un alquiler activo para este local' });
            }
        }

        const alquiler = await Alquiler.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!alquiler) {
            return res.status(404).json({ status: '0', msg: 'Alquiler no encontrado' });
        }

        // Actualizar el estado de 'alquilado' del local si se cambia el atributo 'activo'
        if (req.body.activo !== undefined) {
            await Local.findByIdAndUpdate(alquiler.local, { alquilado: req.body.activo }, { new: true });
        }

        res.json({
            status: '1',
            msg: 'Alquiler actualizado'
        });
    } catch (error) {
        console.error('Error actualizando el alquiler:', error);
        res.status(400).json({
            status: '0',
            msg: 'Error actualizando el alquiler',
            error: error.message
        });
    }
};

alquilerCtrl.deleteAlquiler = async (req, res) => { 
    try {
        // Buscar el alquiler antes de eliminar
        const alquiler = await Alquiler.findById(req.params.id);
        if (!alquiler) {
            console.error('Alquiler no encontrado');
            return res.status(404).json({ 
                status: '0', 
                msg: 'Alquiler no encontrado' 
            });
        }
    
        await Alquiler.deleteOne({_id: req.params.id}); 
    
        // Verificar si el local está alquilado
        const local = await Local.findById(alquiler.local._id);
        if (local.alquilado) {
            await Local.updateOne({ _id: alquiler.local._id }, { $set: { alquilado: false } });
        }
    
        res.json({ 
            status: '1', 
            msg: 'Alquiler eliminado y Local habilitado' 
        });    
    } catch (error) { 
        res.status(400).json({ 

            'status': '0', 
            'msg': 'Error eliminando el alquler' 
        })   
    } 
},
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

},

alquilerCtrl.obtenerCuotasPorIdAlquiler = async (req, res) => {
    try {
        const idAlquiler = req.params.id;
        const cuotas = await cuotaService.getCuotasByIdAlquiler(idAlquiler);
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
},

alquilerCtrl.obtenerPagosPorIdAlquiler = async (req, res) => {
    try{
        const idAlquiler = req.params.id;
        const pagos = await pagoService.obtenerPagosPorIdAlquiler (idAlquiler);
        res.json({
            status: '1',
            msg: 'Pagos obtenidos correctamente',
            data: pagos
        });
    }catch(error){
        res.status(400).json({
            'status': '0',
            'msg': 'Error al obtener los pagos' + error
        });
    }
},

module.exports = alquilerCtrl; 
