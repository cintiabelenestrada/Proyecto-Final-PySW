const Novedades = require('../models/Novedades');
const novedadesCtrl = {};

novedadesCtrl.getNovedades = async (req, res) => {
    try {
        const novedades = await Novedades.find().populate('Usuario');
        res.json(novedades);
    } catch (error) {
        res.status(500).json({
            status: '0',
            msg: 'Error obteniendo las novedades',
            error: error.message
        });
    }
};

novedadesCtrl.getNovedad = async (req, res) => {
    try {
        const novedad = await Novedades.findById(req.params.id).populate('Usuario');
        if (!novedad) {
            return res.status(404).json({
                status: '0',
                msg: 'Novedad no encontrada'
            });
        }
        res.json(novedad);
    } catch (error) {
        res.status(500).json({
            status: '0',
            msg: 'Error obteniendo la novedad',
            error: error.message
        });
    }
};

novedadesCtrl.createNovedad = async (req, res) => {
    try {
        var novedad = new Novedades(req.body);
        await novedad.save();
        res.json({
            status: '1',
            msg: 'Novedad guardada exitosamente'
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error guardando la novedad',
            error: error.message
        });
    }
};

novedadesCtrl.editNovedad = async (req, res) => {
    try {
        await Novedades.findByIdAndUpdate(req.params.id, req.body);
        res.json({
            status: '1',
            msg: 'Novedad actualizada'
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error actualizando la novedad',
            error: error.message
        });
    }
};

novedadesCtrl.deleteNovedad = async (req, res) => {
    try {
        await Novedades.findByIdAndDelete(req.params.id);
        res.json({
            status: '1',
            msg: 'Novedad eliminada'
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error eliminando la novedad',
            error: error.message
        });
    }
};

module.exports = novedadesCtrl;