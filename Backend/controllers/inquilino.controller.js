const Inquilino = require('../models/Inquilino');
const inquilinoCtrl = {};

inquilinoCtrl.getInquilinos = async (req, res) => {
    const inquilinos = await Inquilino.find();
    res.json(inquilinos);
};

inquilinoCtrl.getInquilinoById = async (req, res) => {
    const id = req.params.id;
    try {
        const inquilino = await Inquilino.findById(id);
        res.status(200).json(inquilino);
    } catch (error) {
        console.error(error);
        res.status(404).json({
            message: 'Inquilino no encontrado',
        })
    }
}

inquilinoCtrl.createInquilino = async (req, res) => {
    const inquilino = new (req.body);
    try {
        await inquilino.save();
        res.status(200).json({
            'status': '0',
            'message': 'Inquilino creado con exito'
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            'status': '1',
            'message': 'No se pudo crear el inquilino'
        });
    }
}

inquilinoCtrl.updateInquilino = async (req, res) => {
    const id = req.params.id;
    const inquilino = req.body;
    try {
        await Inquilino.findByIdAndUpdate(id, inquilino);
        res.status(200).json({
            'status': '0',
            'message': 'Inquilino actualizado correctamente'
        });
    } catch (error) {
        res.status(400).json({
            'status': '1',
            'message': 'Error al actualizar Inquilino'
        });
    }
}

inquilinoCtrl.deleteInquilino = async (req, res) => {
    try {
        await Inquilino.findByIdAndDelete(req.params.id);
        res.status(200).json({
            'status': '0',
            'message': 'Inquilino eliminado correctamente'
        });
    } catch (error) {
        res.status(400).json({
            'status': '1',
            'message': 'Error al eliminar Inquilino'
        });
    }
}

module.exports = inquilinoCtrl;