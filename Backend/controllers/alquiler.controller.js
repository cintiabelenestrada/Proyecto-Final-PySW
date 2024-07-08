const Alquiler = require('../models/Alquiler'); 
const alquilerService = require('../services/alquiler.service');
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

alquilerCtrl.deleteAlquiler = async (req, res)=>{ 
    try { 
        await Alquiler.deleteOne({_id: req.params.id}); 
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
};

module.exports = alquilerCtrl; 