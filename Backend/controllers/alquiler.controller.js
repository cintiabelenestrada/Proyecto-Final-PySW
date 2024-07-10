const Alquiler = require('../models/Alquiler'); 
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
        res.json({
            'status': '1',
            'msg': 'Alquiler guardado.',
            'data': alquiler
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': error.message
        });
    }
};

alquilerCtrl.updateAlquiler = async (req, res) => {
    try {
        const alquiler = await Alquiler.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!alquiler) {
            return res.status(404).json({
                status: '0',
                msg: 'Alquiler no encontrado'
            });
        }

        // Verificar si el atributo 'activo' se ha cambiado a 'false'
        if (req.body.activo === false) {
            const localActualizado = await Local.findByIdAndUpdate(alquiler.local, { alquilado: false }, { new: true });
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
    
        // Verificar si el local está habilitado
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
            status: '0', 
            msg: 'Error eliminando el alquiler o habilitando el local',
            error: error.message
        });   
    }
};

module.exports = alquilerCtrl; 